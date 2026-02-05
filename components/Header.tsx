
import React from 'react';
import { motion } from 'framer-motion';

type View = 'form' | 'rsvp';

interface HeaderProps {
  currentView: View;
  setCurrentView: (view: View) => void;
}

const Header: React.FC<HeaderProps> = ({ currentView, setCurrentView }) => {
  const navButtonClasses = (view: View) => 
    `px-4 py-2 rounded-md text-sm font-medium transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-brand-gold focus:ring-offset-2 focus:ring-offset-brand-deep-blue ${
      currentView === view 
      ? 'bg-brand-gold text-brand-deep-blue shadow-lg' 
      : 'bg-white/10 text-brand-light hover:bg-white/20'
    }`;

  const headerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } },
  };

  return (
    <motion.header 
      className="text-center"
      variants={headerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.h1 
        variants={itemVariants}
        className="font-serif text-5xl md:text-7xl font-bold text-brand-gold tracking-wider animate-glow"
      >
        Twilight 2026
      </motion.h1>
      <motion.p 
        variants={itemVariants}
        className="mt-4 text-lg md:text-xl text-brand-light/80"
      >
        A Farewell for Class 12th
      </motion.p>
      <motion.p 
        variants={itemVariants}
        className="text-sm md:text-base text-brand-light/60"
      >
        CS DAV PUBLIC SCHOOL, MOTIHARI, BIHAR
      </motion.p>
      <motion.nav 
        variants={itemVariants}
        className="mt-8 flex justify-center space-x-4"
      >
        <motion.button 
            onClick={() => setCurrentView('form')} 
            className={navButtonClasses('form')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
        >
          RSVP
        </motion.button>
        <motion.button 
            onClick={() => setCurrentView('rsvp')} 
            className={navButtonClasses('rsvp')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
        >
          RSVP View
        </motion.button>
      </motion.nav>
    </motion.header>
  );
};

export default Header;
