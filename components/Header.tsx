
import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Users, Send } from 'lucide-react';

type View = 'form' | 'rsvp';

interface HeaderProps {
  currentView: View;
  setCurrentView: (view: View) => void;
}

const Header: React.FC<HeaderProps> = ({ currentView, setCurrentView }) => {
  const headerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.15,
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1]
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } },
  };

  return (
    <motion.header 
      className="text-center relative max-w-4xl mx-auto"
      variants={headerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Decorative corporate top accent lines */}
      <motion.div 
        variants={itemVariants}
        className="flex items-center justify-center space-x-2 mb-6"
      >
        <span className="h-[1px] w-12 bg-gradient-to-r from-transparent to-brand-gold/50" />
        <span className="p-1 px-3 text-[10px] font-sans font-medium tracking-[0.25em] text-brand-gold bg-brand-gold/10 rounded-full border border-brand-gold/20 select-none uppercase">
          Official invitation
        </span>
        <span className="h-[1px] w-12 bg-gradient-to-l from-transparent to-brand-gold/50" />
      </motion.div>

      {/* Main Event Title */}
      <motion.h1 
        variants={itemVariants}
        className="font-serif text-5xl md:text-8xl font-semibold tracking-wider text-white mt-2 mb-4 drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)]"
      >
        Twilight <span className="text-brand-gold select-all font-serif">2026</span>
      </motion.h1>

      {/* Premium subtitle */}
      <motion.p 
        variants={itemVariants}
        className="text-base md:text-xl font-light text-slate-300 tracking-wide uppercase px-4 max-w-2xl mx-auto font-sans"
      >
        The Valedictory Assembly for class 12th
      </motion.p>

      {/* Corporate Metadata Board */}
      <motion.div 
        variants={itemVariants}
        className="mt-6 flex flex-wrap justify-center items-center gap-x-6 gap-y-3 px-6 py-3 rounded-full bg-slate-950/40 backdrop-blur-md border border-white/5 w-fit mx-auto shadow-inner"
      >
        <div className="flex items-center space-x-2 text-xs md:text-sm text-slate-300">
          <Users className="h-4 w-4 text-brand-gold/80 stroke-[1.5]" />
          <span className="font-medium">CS DAV Public School</span>
        </div>
        <span className="hidden md:inline text-white/20">•</span>
        <div className="flex items-center space-x-2 text-xs md:text-sm text-slate-300">
          <MapPin className="h-4 w-4 text-brand-gold/80 stroke-[1.5]" />
          <span className="font-light">Motihari, Bihar</span>
        </div>
        <span className="hidden md:inline text-white/20">•</span>
        <div className="flex items-center space-x-2 text-xs md:text-sm text-slate-300">
          <Calendar className="h-4 w-4 text-brand-gold/80 stroke-[1.5]" />
          <span className="font-light">09 February 2026</span>
        </div>
      </motion.div>

      {/* Corporate Sliding Pill Tab Selector */}
      <motion.div 
        variants={itemVariants}
        className="mt-10 flex justify-center"
      >
        <div className="relative p-1 bg-[#080d19]/80 backdrop-blur-lg rounded-full border border-white/10 flex items-center shadow-2xl">
          {/* Form RSVP Tab Button */}
          <button 
            onClick={() => setCurrentView('form')}
            className={`relative z-10 px-8 py-3 text-xs md:text-sm font-medium tracking-wider uppercase rounded-full transition-colors duration-500 focus:outline-none flex items-center space-x-2 ${
              currentView === 'form' ? 'text-black font-semibold' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Send className={`h-3.5 w-3.5 transition-transform ${currentView === 'form' ? 'scale-110' : 'opacity-60'}`} />
            <span>Submit RSVP</span>
          </button>

          {/* Admin RSVP Views Tab Button */}
          <button 
            onClick={() => setCurrentView('rsvp')}
            className={`relative z-10 px-8 py-3 text-xs md:text-sm font-medium tracking-wider uppercase rounded-full transition-colors duration-500 focus:outline-none flex items-center space-x-2 ${
              currentView === 'rsvp' ? 'text-black font-semibold' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Users className={`h-3.5 w-3.5 transition-transform ${currentView === 'rsvp' ? 'scale-110' : 'opacity-60'}`} />
            <span>Guest Directory</span>
          </button>

          {/* High profile Sliding Block */}
          <motion.div
            className="absolute top-1 bottom-1 rounded-full bg-brand-gold shadow-md"
            layoutId="activePillBlock"
            transition={{ type: 'spring', stiffness: 380, damping: 30 }}
            style={{
              left: currentView === 'form' ? '4px' : 'calc(50% + 2px)',
              width: 'calc(50% - 6px)',
            }}
          />
        </div>
      </motion.div>
    </motion.header>
  );
};

export default Header;
