
import React from 'react';
import { motion } from 'framer-motion';

const SplashScreen: React.FC = () => {
  const title = "Twilight 2026";
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const letterVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  };

  const subtitleVariants = {
      hidden: { opacity: 0 },
      visible: { opacity: 1, transition: { delay: 1.8, duration: 1 } }
  }

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.5 } }}
      className="absolute inset-0 flex flex-col items-center justify-center z-50 bg-brand-deep-blue"
    >
      <motion.h1
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="font-serif text-5xl md:text-8xl font-bold text-brand-gold tracking-wider flex overflow-hidden"
      >
        {title.split("").map((char, index) => (
          <motion.span key={index} variants={letterVariants} className={char === " " ? "w-4" : ""}>
            {char}
          </motion.span>
        ))}
      </motion.h1>
      <motion.p 
        variants={subtitleVariants}
        initial="hidden"
        animate="visible"
        className="mt-4 text-lg md:text-xl text-brand-light/80"
      >
        A Farewell for Class 12th
      </motion.p>
    </motion.div>
  );
};

export default SplashScreen;
