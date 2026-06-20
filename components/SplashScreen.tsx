
import React from 'react';
import { motion } from 'framer-motion';
import { Award, Sparkles } from 'lucide-react';

const SplashScreen: React.FC = () => {
  const title = "Twilight 2026";
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.2,
      },
    },
  };

  const letterVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 15,
        stiffness: 120,
      },
    },
  };

  const frameVariants = {
    hidden: { scaleX: 0, opacity: 0 },
    visible: { 
      scaleX: 1, 
      opacity: 1, 
      transition: { 
        duration: 1.2, 
        ease: [0.16, 1, 0.3, 1] 
      } 
    }
  };

  const verticalLineVariants = {
    hidden: { scaleY: 0, opacity: 0 },
    visible: { 
      scaleY: 1, 
      opacity: 0.5, 
      transition: { 
        delay: 0.4,
        duration: 1.2, 
        ease: [0.16, 1, 0.3, 1] 
      } 
    }
  };

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.6, ease: "easeInOut" } }}
      className="absolute inset-0 flex flex-col items-center justify-center z-50 bg-[#04060b] px-4 overflow-hidden"
    >
      {/* Decorative ambient gold radial aura */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand-gold/5 blur-[120px] rounded-full pointer-events-none" />

      {/* Luxury Border Frame Container */}
      <div className="relative p-12 md:p-20 max-w-2xl w-full flex flex-col items-center justify-center">
        {/* Horizontal top border */}
        <motion.div 
          variants={frameVariants}
          initial="hidden"
          animate="visible"
          className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-brand-gold/60 to-transparent origin-center" 
        />
        
        {/* Horizontal bottom border */}
        <motion.div 
          variants={frameVariants}
          initial="hidden"
          animate="visible"
          className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-brand-gold/60 to-transparent origin-center animate-pulse" 
        />

        {/* Elegant top crown badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="mb-6 flex flex-col items-center"
        >
          <div className="p-3 bg-brand-gold/10 rounded-full border border-brand-gold/30 backdrop-blur-md">
            <Award className="h-8 w-8 text-brand-gold stroke-[1.25]" />
          </div>
          <div className="h-8 w-[1px] bg-gradient-to-b from-brand-gold/30 to-transparent mt-2" />
        </motion.div>

        {/* Classy Metadata Tag */}
        <motion.p
          initial={{ opacity: 0, letterSpacing: "0.1em" }}
          animate={{ opacity: 0.7, letterSpacing: "0.25em" }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-xs uppercase text-brand-gold font-sans font-medium tracking-[0.25em] mb-4 text-center"
        >
          Valedictory Assembly Invitation
        </motion.p>
        
        {/* Premium Title */}
        <motion.h1
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="font-serif text-5xl md:text-7xl font-semibold tracking-wider text-white flex flex-wrap justify-center overflow-hidden leading-tight text-center"
        >
          {title.split("").map((char, index) => (
            <motion.span key={index} variants={letterVariants} className={char === " " ? "w-4" : ""}>
              {char}
            </motion.span>
          ))}
        </motion.h1>

        {/* Dynamic golden line separator */}
        <motion.div 
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: "80px", opacity: 0.5 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="h-[1px] bg-brand-gold my-6"
        />

        {/* Elegant subtext description */}
        <motion.p 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 0.9, y: 0 }}
          transition={{ delay: 1.4, duration: 0.8 }}
          className="text-sm md:text-base text-slate-300 font-sans font-light tracking-wide text-center uppercase"
        >
          The Farewell Assemblage • Class of 2026
        </motion.p>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ delay: 1.7, duration: 0.8 }}
          className="mt-2 text-xs text-slate-400 font-medium tracking-widest text-center uppercase"
        >
          CS DAV Public School, Motihari
        </motion.p>

        {/* Loader Micro-Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.0 }}
          className="mt-12 flex items-center justify-center space-x-1.5"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-brand-gold animate-bounce" style={{ animationDelay: '0s' }} />
          <span className="w-1.5 h-1.5 rounded-full bg-brand-gold/70 animate-bounce" style={{ animationDelay: '0.15s' }} />
          <span className="w-1.5 h-1.5 rounded-full bg-brand-gold/40 animate-bounce" style={{ animationDelay: '0.3s' }} />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default SplashScreen;
