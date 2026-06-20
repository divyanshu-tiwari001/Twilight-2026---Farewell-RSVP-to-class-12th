
import React, { useState, useMemo, useEffect } from 'react';
import { RSVP } from '../types';
import { motion, useSpring, useTransform, animate, AnimatePresence } from 'framer-motion';
import { Users, Search, SlidersHorizontal, CheckCircle2, XCircle, Award, Calendar, BookOpen, Clock, Filter } from 'lucide-react';

interface RsvpViewProps {
  rsvps: RSVP[];
}

const RsvpCard: React.FC<{ rsvp: RSVP }> = ({ rsvp }) => {
    const cardVariants = {
        hidden: { opacity: 0, y: 15 },
        visible: { opacity: 1, y: 0 },
    };

    // Calculate avatar initials from the name
    const getInitials = (fullName: string) => {
      const parts = fullName.trim().replaceAll(/\s+/g, ' ').split(' ');
      if (parts.length === 0 || !parts[0]) return 'G';
      if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
      return (parts[0][0] + (parts[1]?.[0] || '')).toUpperCase();
    };

    const formattedDate = React.useMemo(() => {
      try {
        return rsvp.timestamp.toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        });
      } catch (e) {
        return 'Recently declared';
      }
    }, [rsvp.timestamp]);
    
    return (
        <motion.div 
            variants={cardVariants}
            transition={{ type: 'spring', stiffness: 350, damping: 20 }}
            whileHover={{ 
              y: -4,
              boxShadow: "0 20px 40px -15px rgba(0, 0, 0, 0.4)",
              borderColor: "rgba(212, 175, 55, 0.35)"
            }}
            className="group relative bg-[#0a0f1d]/50 backdrop-blur-md border border-white/5 hover:border-white/10 rounded-2xl p-6 transition-all duration-300 shadow-xl"
        >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center space-x-4">
                    {/* Exquisite Initial Medal Avatar */}
                    <div className="relative shrink-0 select-none">
                      <div className="h-12 w-12 rounded-xl bg-slate-900 border border-white/10 group-hover:border-brand-gold/40 flex items-center justify-center transition-colors duration-300">
                        <span className="text-sm font-sans font-semibold tracking-wider text-brand-gold">{getInitials(rsvp.name)}</span>
                      </div>
                      {/* Attendance Badge Dot */}
                      <span className={`absolute -bottom-1 -right-1 h-3.5 w-3.5 rounded-full border-2 border-[#03060c] ${
                        rsvp.attending ? 'bg-emerald-400' : 'bg-red-400'
                      }`} />
                    </div>

                    <div>
                        <h3 className="text-lg font-sans font-medium text-white group-hover:text-brand-gold transition-colors duration-300 tracking-wide">{rsvp.name}</h3>
                        <div className="flex flex-wrap items-center gap-2 mt-1">
                            <span className={`inline-flex items-center space-x-1 text-xs px-2.5 py-0.5 rounded-full font-medium ${
                              rsvp.attending 
                                ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/10' 
                                : 'bg-red-500/10 text-red-400 border border-red-500/10'
                            }`}>
                              {rsvp.attending ? <CheckCircle2 className="h-3 w-3" /> : <XCircle className="h-3 w-3" />}
                              <span>{rsvp.attending ? 'Attending' : 'Not Attending'}</span>
                            </span>
                            <span className="px-2.5 py-0.5 text-xs font-semibold rounded-full bg-white/5 text-slate-300 border border-white/5">
                                Class {rsvp.class}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="flex md:flex-col items-center md:items-end justify-between md:justify-center shrink-0 text-xs text-slate-400 gap-1 border-t md:border-t-0 border-white/5 pt-3 md:pt-0">
                    <span className="flex items-center space-x-1">
                      <Clock className="h-3.5 w-3.5 text-slate-500" />
                      <span>{formattedDate}</span>
                    </span>
                    <span className="text-[10px] uppercase tracking-wider font-mono text-slate-500">Registry Verified</span>
                </div>
            </div>

            {rsvp.message && (
              <div className="mt-4 pt-3 border-t border-white/5">
                <p className="text-slate-300 text-sm leading-relaxed font-light italic pl-4 border-l-2 border-brand-gold/40 bg-slate-900/20 py-2 rounded-r-lg">
                    "{rsvp.message}"
                </p>
              </div>
            )}
        </motion.div>
    );
};

const AnimatedStat: React.FC<{ value: number, className?: string }> = ({ value, className }) => {
    const count = useSpring(0, { duration: 1000 });
    const rounded = useTransform(count, latest => Math.round(latest));

    useEffect(() => {
        const controls = animate(count, value, {
            type: "spring",
            stiffness: 100,
            damping: 20
        });
        return controls.stop;
    }, [value, count]);

    return <motion.p className={className}>{rounded}</motion.p>;
};

const RsvpView: React.FC<RsvpViewProps> = ({ rsvps }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'attending' | 'not-attending'>('all');
  const [classFilter, setClassFilter] = useState<'all' | '11th' | '12th'>('all');

  const filteredRsvps = useMemo(() => {
    return rsvps
      .filter(rsvp => {
        if (filterStatus === 'attending') return rsvp.attending;
        if (filterStatus === 'not-attending') return !rsvp.attending;
        return true;
      })
      .filter(rsvp => {
          if (classFilter === '11th') return rsvp.class === '11th';
          if (classFilter === '12th') return rsvp.class === '12th';
          return true;
      })
      .filter(rsvp =>
        rsvp.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
  }, [rsvps, searchTerm, filterStatus, classFilter]);

  const attendingCount = rsvps.filter(r => r.attending).length;
  const notAttendingCount = rsvps.filter(r => !r.attending).length;
  
  const FilterButton: React.FC<{ onClick: () => void, isActive: boolean, label: string }> = ({ onClick, isActive, label }) => (
    <motion.button
      onClick={onClick}
      className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded-lg transition-all flex items-center space-x-1.5 border ${
        isActive
          ? 'bg-brand-gold border-brand-gold text-black shadow-md shadow-brand-gold/10'
          : 'bg-slate-900/40 border-white/5 text-slate-400 hover:text-white hover:border-white/10'
      }`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${isActive ? 'bg-black' : 'bg-slate-500'}`} />
      <span>{label}</span>
    </motion.button>
  );
  
  const listContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };
  
  const dashboardItemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 120 } },
  };

  return (
    <motion.div 
        className="max-w-4xl mx-auto space-y-6 px-4"
        variants={listContainerVariants}
        initial="hidden"
        animate="visible"
    >
      {/* Executive Attendance Registry Summary Card */}
      <motion.div 
        variants={dashboardItemVariants}
        className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#080d19]/90 to-[#03060d]/95 border border-brand-gold/30 p-6 md:p-8 shadow-[0_25px_60px_rgba(0,0,0,0.8)]"
      >
        {/* Decorative Ambient Aura Backglows */}
        <div className="absolute -top-24 -right-24 w-80 h-80 bg-brand-gold/5 blur-[100px] rounded-full pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-emerald-500/[0.02] blur-[100px] rounded-full pointer-events-none" />

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center relative z-10">
          {/* Total Responses Section */}
          <div className="md:col-span-4 flex flex-col justify-center border-b md:border-b-0 md:border-r border-white/10 pb-6 md:pb-0 md:pr-6">
            <span className="text-[10px] tracking-[0.2em] text-brand-gold font-sans font-medium uppercase block mb-1">Central Directory Server</span>
            <span className="text-xs text-slate-400 font-light block mb-3">Live RSVP Claims Processed</span>
            <div className="flex items-baseline space-x-3">
              <AnimatedStat value={rsvps.length} className="text-5xl font-sans font-bold text-white tracking-tight" />
              <div className="text-slate-400">
                <span className="text-xs uppercase tracking-wider block font-semibold">Delegates</span>
                <span className="text-[10px] text-slate-500 block">Total RSVPs</span>
              </div>
            </div>
          </div>

          {/* Breakdown Section with Progress Indicators */}
          <div className="md:col-span-8 space-y-5">
            <div className="flex justify-between items-center">
              <h3 className="text-xs font-sans font-semibold uppercase tracking-widest text-slate-300">Attendance Distribution</h3>
              <span className="text-[10px] text-slate-500 uppercase font-mono">Live Sync</span>
            </div>

            {/* Premium segmented progress-flow metric */}
            <div className="space-y-2">
              <div className="h-3 w-full bg-slate-950/80 border border-white/5 rounded-full overflow-hidden flex">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${rsvps.length > 0 ? (attendingCount / rsvps.length) * 100 : 0}%` }}
                  transition={{ duration: 1.2, ease: "easeOut" }}
                  className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 shadow-[0_0_12px_rgba(16,185,129,0.3)]"
                />
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${rsvps.length > 0 ? (notAttendingCount / rsvps.length) * 100 : 0}%` }}
                  transition={{ duration: 1.2, ease: "easeOut" }}
                  className="h-full bg-gradient-to-r from-red-500 to-rose-600 shadow-[0_0_12px_rgba(239,68,68,0.3)]"
                />
              </div>
            </div>

            {/* Detailed interactive visual cards */}
            <div className="grid grid-cols-2 gap-4">
              {/* Confirmed block */}
              <div className="bg-slate-900/40 border border-white/5 rounded-xl p-3 flex items-center justify-between">
                <div className="space-y-1">
                  <span className="text-[9px] uppercase tracking-wider font-semibold text-slate-400 block">Attending (Yes)</span>
                  <div className="flex items-baseline space-x-1.5">
                    <AnimatedStat value={attendingCount} className="text-xl font-bold text-emerald-400" />
                    <span className="text-[9px] text-emerald-500/80 font-mono">
                      {rsvps.length > 0 ? Math.round((attendingCount / rsvps.length) * 100) : 0}%
                    </span>
                  </div>
                </div>
                <div className="h-8 w-8 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/15 flex items-center justify-center">
                  <CheckCircle2 className="h-4 w-4 stroke-[1.5]" />
                </div>
              </div>

              {/* Excused block */}
              <div className="bg-slate-900/40 border border-white/5 rounded-xl p-3 flex items-center justify-between">
                <div className="space-y-1">
                  <span className="text-[9px] uppercase tracking-wider font-semibold text-slate-400 block">Excused (No)</span>
                  <div className="flex items-baseline space-x-1.5">
                    <AnimatedStat value={notAttendingCount} className="text-xl font-bold text-red-400" />
                    <span className="text-[9px] text-red-500/80 font-mono">
                      {rsvps.length > 0 ? Math.round((notAttendingCount / rsvps.length) * 100) : 0}%
                    </span>
                  </div>
                </div>
                <div className="h-8 w-8 rounded-lg bg-red-500/10 text-red-400 border border-red-500/15 flex items-center justify-center">
                  <XCircle className="h-4 w-4 stroke-[1.5]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
      
      {/* Enterprise Filter Panel */}
      <motion.div 
        variants={dashboardItemVariants}
        className="bg-[#0a1120]/40 backdrop-blur-md border border-white/15 rounded-2xl p-5 shadow-2xl space-y-4"
      >
        {/* Search */}
        <div className="relative w-full">
           <Search className="h-4 w-4 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
           <input
             type="text"
             placeholder="Search guest registry by representative name..."
             value={searchTerm}
             onChange={(e) => setSearchTerm(e.target.value)}
             className="w-full bg-slate-900/60 border border-white/10 rounded-xl pl-12 pr-4 py-3.5 text-sm text-white placeholder-slate-505 focus:outline-none focus:ring-1 focus:ring-brand-gold focus:border-brand-gold transition-all"
           />
        </div>

        {/* Sliders / Buttons */}
        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between border-t border-white/5 pt-4">
            <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center space-x-1.5 mr-2">
                  <Filter className="h-3 w-3 text-brand-gold" />
                  <span>By Invitation:</span>
                </span>
                <FilterButton onClick={() => setFilterStatus('all')} isActive={filterStatus === 'all'} label="All Claims" />
                <FilterButton onClick={() => setFilterStatus('attending')} isActive={filterStatus === 'attending'} label="Attending" />
                <FilterButton onClick={() => setFilterStatus('not-attending')} isActive={filterStatus === 'not-attending'} label="Excused" />
            </div>
            <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center space-x-1.5 mr-2">
                  <SlidersHorizontal className="h-3 w-3 text-brand-gold" />
                  <span>By Cohort:</span>
                </span>
                <FilterButton onClick={() => setClassFilter('all')} isActive={classFilter === 'all'} label="Combined" />
                <FilterButton onClick={() => setClassFilter('11th')} isActive={classFilter === '11th'} label="11th Grade" />
                <FilterButton onClick={() => setClassFilter('12th')} isActive={classFilter === '12th'} label="12th Grade" />
            </div>
        </div>
      </motion.div>

      {/* Guest Card List Frame */}
      {filteredRsvps.length > 0 ? (
        <motion.div
          variants={listContainerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-4"
        >
          <div className="flex items-center justify-between px-2">
            <span className="text-xs uppercase tracking-widest font-mono text-slate-500">LISTING {filteredRsvps.length} REPRESENTATIVE RECORD{filteredRsvps.length === 1 ? '' : 'S'}</span>
            <span className="text-xs text-brand-gold/80 block font-light">Seating registry updated live</span>
          </div>
          <div className="grid grid-cols-1 gap-4">
            {filteredRsvps.map((rsvp) => (
              <RsvpCard key={rsvp.id} rsvp={rsvp} />
            ))}
          </div>
        </motion.div>
      ) : (
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-20 bg-slate-900/10 backdrop-blur-md border border-white/5 rounded-2xl shadow-xl flex flex-col items-center justify-center p-6"
        >
          <div className="p-4 bg-white/[0.02] rounded-full border border-white/5 mb-4 text-slate-500 shrink-0">
             <SlidersHorizontal className="h-10 w-10 stroke-[1.25]" />
          </div>
          <h3 className="text-xl font-serif text-slate-300 font-medium tracking-wide">No Entries Compiled</h3>
          <p className="mt-2 text-sm text-slate-400 max-w-sm mx-auto font-light leading-relaxed">
            {rsvps.length === 0 
              ? 'No RSVP declarations have been verified in the central directory database yet.' 
              : 'Our search in the local guest log yielded zero verified matches. Try a different search spell.'}
          </p>
        </motion.div>
      )}
    </motion.div>
  );
};

export default RsvpView;
    