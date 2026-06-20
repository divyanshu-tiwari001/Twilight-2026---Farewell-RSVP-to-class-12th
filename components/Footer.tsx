
import React from 'react';
import { motion } from 'framer-motion';

const Footer: React.FC = () => {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.8, duration: 1 }}
      className="text-center py-12 border-t border-white/5 max-w-4xl mx-auto"
    >
      <div className="flex flex-col items-center justify-center space-y-2">
        <p className="text-xs uppercase tracking-[0.2em] text-slate-500 font-sans font-medium">
          Twilight 2026 Committee • CSDAVPS
        </p>
        <p className="text-xs text-slate-400">
          Crafted with excellence by{' '}
          <a
            href="https://divyanshu-portfolio-01.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-brand-gold hover:text-yellow-400 hover:underline transition-all duration-300"
          >
            Divyanshu Tiwari
          </a>
        </p>
      </div>
    </motion.footer>
  );
};

export default Footer;
