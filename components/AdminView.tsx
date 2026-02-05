
import React, { useState, useMemo, useEffect } from 'react';
import { RSVP } from '../types';
import { motion, useSpring, useTransform, animate } from 'framer-motion';

interface RsvpViewProps {
  rsvps: RSVP[];
}

const RsvpCard: React.FC<{ rsvp: RSVP }> = ({ rsvp }) => {
    const cardVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
    };
    
    return (
        <motion.div 
            variants={cardVariants}
            transition={{ type: 'spring', stiffness: 400, damping: 17 }}
            whileHover={{ 
              scale: 1.03, 
              zIndex: 10, 
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.35)" 
            }}
            className="relative bg-brand-purple/50 backdrop-blur-sm border border-white/20 rounded-lg p-6 shadow-lg"
        >
            <div className="flex justify-between items-start">
                <div>
                    <h3 className="text-xl font-semibold text-white">{rsvp.name}</h3>
                    <div className="flex items-center space-x-2 mt-1">
                        <p className={`text-sm font-medium ${rsvp.attending ? 'text-green-400' : 'text-red-400'}`}>
                            {rsvp.attending ? 'Attending' : 'Not Attending'}
                        </p>
                        <span className="text-brand-light/50">·</span>
                        <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-brand-deep-blue/50 text-brand-light/80">
                            Class {rsvp.class}
                        </span>
                    </div>
                </div>
                <span className="text-xs text-brand-light/60 text-right">
                    {rsvp.timestamp.toLocaleString()}
                </span>
            </div>
            {rsvp.message && (
            <p className="mt-4 text-brand-light/80 border-l-2 border-brand-gold pl-4 italic">
                "{rsvp.message}"
            </p>
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
      className={`px-4 py-2 text-sm font-semibold rounded-md transition-colors duration-200 ${
        isActive
          ? 'bg-brand-gold text-brand-deep-blue shadow-md'
          : 'bg-brand-deep-blue/50 text-brand-light/80 hover:bg-brand-deep-blue'
      }`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {label}
    </motion.button>
  );
  
  const listContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.07,
      },
    },
  };
  
  const dashboardItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } },
  };

  return (
    <motion.div 
        className="max-w-4xl mx-auto"
        variants={listContainerVariants}
        initial="hidden"
        animate="visible"
    >
      <motion.div 
        variants={dashboardItemVariants}
        className="bg-brand-purple/50 backdrop-blur-sm border border-white/20 rounded-lg p-6 mb-8 shadow-2xl flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 md:space-x-8"
      >
        <h2 className="text-3xl font-serif text-white">Guest Dashboard</h2>
        <div className="flex space-x-6 text-center">
          <div>
            <AnimatedStat value={attendingCount} className="text-3xl font-bold text-green-400" />
            <p className="text-sm text-brand-light/70">Attending</p>
          </div>
          <div>
            <AnimatedStat value={notAttendingCount} className="text-3xl font-bold text-red-400" />
            <p className="text-sm text-brand-light/70">Not Attending</p>
          </div>
          <div>
            <AnimatedStat value={rsvps.length} className="text-3xl font-bold text-brand-gold" />
            <p className="text-sm text-brand-light/70">Total RSVPs</p>
          </div>
        </div>
      </motion.div>
      
      <motion.div 
        variants={dashboardItemVariants}
        className="bg-brand-purple/50 backdrop-blur-sm border border-white/20 rounded-lg p-4 mb-8 shadow-lg flex flex-col items-center gap-4"
      >
        <div className="relative w-full">
           <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 absolute left-3 top-1/2 -translate-y-1/2 text-brand-light/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-brand-deep-blue/50 border border-white/30 rounded-md pl-10 pr-4 py-2 text-white placeholder-brand-light/50 focus:outline-none focus:ring-2 focus:ring-brand-gold transition-all"
          />
        </div>
        <div className="w-full flex flex-col sm:flex-row gap-4 justify-between">
            <div className="flex items-center space-x-2">
                <span className="text-sm font-semibold text-brand-light/70">Status:</span>
                <FilterButton onClick={() => setFilterStatus('all')} isActive={filterStatus === 'all'} label="All" />
                <FilterButton onClick={() => setFilterStatus('attending')} isActive={filterStatus === 'attending'} label="Attending" />
                <FilterButton onClick={() => setFilterStatus('not-attending')} isActive={filterStatus === 'not-attending'} label="Not Attending" />
            </div>
            <div className="flex items-center space-x-2">
                <span className="text-sm font-semibold text-brand-light/70">Class:</span>
                <FilterButton onClick={() => setClassFilter('all')} isActive={classFilter === 'all'} label="All" />
                <FilterButton onClick={() => setClassFilter('11th')} isActive={classFilter === '11th'} label="11th" />
                <FilterButton onClick={() => setClassFilter('12th')} isActive={classFilter === '12th'} label="12th" />
            </div>
        </div>
      </motion.div>

      {filteredRsvps.length > 0 ? (
        <motion.div
          variants={listContainerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-4"
        >
          {filteredRsvps.map((rsvp) => (
            <RsvpCard key={rsvp.id} rsvp={rsvp} />
          ))}
        </motion.div>
      ) : (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-16 bg-brand-purple/50 backdrop-blur-sm border border-white/20 rounded-lg"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12 text-brand-light/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={rsvps.length === 0 ? "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" : "M9.75 17.655L14.25 12 9.75 6.345"} />
          </svg>
          <p className="mt-4 text-xl text-brand-light/80">
            {rsvps.length === 0 ? 'No RSVPs have been submitted yet.' : 'No attendees match your search or filter.'}
          </p>
        </motion.div>
      )}
    </motion.div>
  );
};

export default RsvpView;
    