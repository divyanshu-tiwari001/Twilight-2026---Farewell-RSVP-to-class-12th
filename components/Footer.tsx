
import React from 'react';
import { motion } from 'framer-motion';

const Footer: React.FC = () => {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5, duration: 1 }}
      className="text-center py-6"
    >
      <p className="text-sm text-brand-light/60">
        ©2026 Made with <span className="text-red-500">❤️</span> by{' '}
        <a
          href="https://divyanshu-portfolio-01.vercel.app"
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-brand-gold hover:underline transition-colors"
        >
          Divyanshu Tiwari
        </a>
      </p>
    </motion.footer>
  );
};

export default Footer;
