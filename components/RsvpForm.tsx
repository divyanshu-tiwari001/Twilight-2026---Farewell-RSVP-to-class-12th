
import React, { useState } from 'react';
import { RSVP } from '../types';
import { motion, AnimatePresence } from 'framer-motion';

interface RsvpFormProps {
  onSubmit: (rsvp: Omit<RSVP, 'id' | 'timestamp'>) => void;
  showSuccess: boolean;
}

const RsvpForm: React.FC<RsvpFormProps> = ({ onSubmit, showSuccess }) => {
  const [name, setName] = useState('');
  const [attending, setAttending] = useState<boolean | null>(null);
  const [selectedClass, setSelectedClass] = useState<'11th' | '12th' | null>(null);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isConfirming, setIsConfirming] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Please enter your full name.');
      return;
    }
    if (selectedClass === null) {
      setError('Please select your class.');
      return;
    }
    if (attending === null) {
      setError('Please select if you are attending or not.');
      return;
    }
    setError('');
    setIsConfirming(true);
  };

  const handleConfirmSubmit = () => {
    // The checks are already done, so we can assert they're not null.
    onSubmit({ name, attending: attending!, class: selectedClass!, message });
    setIsConfirming(false);
    setName('');
    setAttending(null);
    setSelectedClass(null);
    setMessage('');
  };

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const modalVariants = {
    hidden: { opacity: 0, y: -50, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', stiffness: 300, damping: 30 } },
    exit: { opacity: 0, y: 50, scale: 0.95, transition: { duration: 0.2 } },
  };

  const formContainerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const formItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <>
      <AnimatePresence mode="wait">
        {showSuccess ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
            className="relative max-w-xl mx-auto text-center p-8 bg-brand-purple/50 backdrop-blur-sm rounded-lg shadow-2xl overflow-hidden border border-brand-gold/50"
          >
            <motion.div 
              className="absolute inset-[-100%] animate-[spin_4s_linear_infinite]"
              style={{
                background: 'conic-gradient(from 90deg at 50% 50%, #fde047 0%, #2a2455 25%, #fde047 50%, #2a2455 75%, #fde047 100%)'
              }}
            />
            <div className="relative z-10">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-brand-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <motion.path
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h2 className="mt-4 text-3xl font-serif text-white">Thank You!</h2>
              <p className="mt-2 text-brand-light/80">Your RSVP has been recorded.</p>

              <div className="mt-6 border-t border-brand-gold/30 pt-6 text-lg space-y-3">
                <div className="flex justify-between items-center">
                    <span className="font-semibold text-brand-light/80">Venue:</span>
                    <span className="font-sans font-medium text-white text-right">Senior Wing, CSDAVPS</span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="font-semibold text-brand-light/80">Date:</span>
                    <span className="font-sans font-medium text-white">09 February 2026</span>
                </div>
              </div>

              <p className="mt-8 text-xs text-brand-light/60">
                Note: For any problems or queries contact +91 9852176407 or +91 9955888527.
              </p>
            </div>
          </motion.div>
        ) : (
          <motion.div
              key="form-container"
              className="max-w-xl mx-auto p-8 bg-brand-purple/50 backdrop-blur-sm border border-white/20 rounded-lg shadow-2xl"
          >
            <motion.h2 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl font-serif text-center text-white mb-6"
            >
              Join Us for a Day to Remember
            </motion.h2>
            <motion.form 
              onSubmit={handleSubmit} 
              noValidate
              variants={formContainerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.div className="mb-6" variants={formItemVariants}>
                <label htmlFor="name" className="block text-brand-light/80 mb-2 font-medium">Full Name</label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-brand-deep-blue/50 border border-white/30 rounded-md px-4 py-3 text-white placeholder-brand-light/50 focus:outline-none focus:ring-2 focus:ring-brand-gold transition-all"
                  placeholder="e.g., Aryan Kumar"
                  required
                />
              </motion.div>
              <motion.div className="mb-6" variants={formItemVariants}>
                <span className="block text-brand-light/80 mb-2 font-medium">Please select your class</span>
                <div className="flex space-x-4">
                  <motion.button
                    type="button"
                    onClick={() => setSelectedClass('11th')}
                    className={`w-full py-3 rounded-md font-semibold transition-colors duration-300 ${selectedClass === '11th' ? 'bg-brand-gold text-brand-deep-blue shadow-lg' : 'bg-brand-deep-blue/50 border border-white/30 text-white'}`}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    animate={{ scale: selectedClass === '11th' ? 1.05 : 1 }}
                  >
                    Class 11th
                  </motion.button>
                  <motion.button
                    type="button"
                    onClick={() => setSelectedClass('12th')}
                    className={`w-full py-3 rounded-md font-semibold transition-colors duration-300 ${selectedClass === '12th' ? 'bg-brand-gold text-brand-deep-blue shadow-lg' : 'bg-brand-deep-blue/50 border border-white/30 text-white'}`}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    animate={{ scale: selectedClass === '12th' ? 1.05 : 1 }}
                  >
                    Class 12th
                  </motion.button>
                </div>
              </motion.div>
              <motion.div className="mb-6" variants={formItemVariants}>
                <span className="block text-brand-light/80 mb-2 font-medium">Will you be attending?</span>
                <div className="flex space-x-4">
                  <motion.button
                    type="button"
                    onClick={() => setAttending(true)}
                    className={`w-full py-3 rounded-md font-semibold transition-colors duration-300 ${attending === true ? 'bg-brand-gold text-brand-deep-blue shadow-lg' : 'bg-brand-deep-blue/50 border border-white/30 text-white'}`}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    animate={{ scale: attending === true ? 1.05 : 1 }}
                  >
                    Yes, I'll be there!
                  </motion.button>
                  <motion.button
                    type="button"
                    onClick={() => setAttending(false)}
                    className={`w-full py-3 rounded-md font-semibold transition-colors duration-300 ${attending === false ? 'bg-red-400 text-white shadow-lg' : 'bg-brand-deep-blue/50 border border-white/30 text-white'}`}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    animate={{ scale: attending === false ? 1.05 : 1 }}
                  >
                    Sorry, can't make it
                  </motion.button>
                </div>
              </motion.div>
              <motion.div className="mb-8" variants={formItemVariants}>
                <label htmlFor="message" className="block text-brand-light/80 mb-2 font-medium">
                  Leave a message (optional)
                </label>
                <textarea
                  id="message"
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full bg-brand-deep-blue/50 border border-white/30 rounded-md px-4 py-3 text-white placeholder-brand-light/50 focus:outline-none focus:ring-2 focus:ring-brand-gold transition-all"
                  placeholder="Share a memory or a message..."
                ></textarea>
              </motion.div>
              {error && <p className="text-red-400 text-center mb-4">{error}</p>}
              <motion.div variants={formItemVariants}>
                <motion.button 
                  type="submit" 
                  className="w-full bg-brand-gold text-brand-deep-blue font-bold text-lg py-3 rounded-md hover:bg-yellow-300 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:ring-offset-2 focus:ring-offset-brand-purple"
                  whileHover={{ scale: 1.02, transition: { type: 'spring', stiffness: 400, damping: 10 } }}
                  whileTap={{ scale: 0.98 }}
                >
                  Submit RSVP
                </motion.button>
              </motion.div>
            </motion.form>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isConfirming && (
          <motion.div
            key="confirmation-backdrop"
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50"
          >
            <motion.div
              key="confirmation-modal"
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="w-full max-w-md bg-brand-purple border border-brand-gold/50 rounded-lg shadow-2xl p-8"
            >
              <h2 className="text-3xl font-serif text-center text-white mb-4">Confirm Your RSVP</h2>
              <p className="text-center text-brand-light/80 mb-6">Please review your details before submitting.</p>
              
              <div className="space-y-4 text-lg">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-brand-light/70">Name:</span>
                  <span className="font-semibold text-white">{name}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium text-brand-light/70">Class:</span>
                  <span className="font-semibold text-white">{selectedClass}</span>
                </div>
                 <div className="flex justify-between items-center">
                  <span className="font-medium text-brand-light/70">Status:</span>
                  <span className={`font-semibold px-3 py-1 text-sm rounded-full ${attending ? 'bg-green-400/20 text-green-300' : 'bg-red-400/20 text-red-300'}`}>
                    {attending ? "Attending" : "Not Attending"}
                  </span>
                </div>
                {message && (
                  <div>
                     <span className="font-medium text-brand-light/70 block mb-2">Message:</span>
                     <p className="text-brand-light/90 italic border-l-2 border-brand-gold/50 pl-3 text-base">"{message}"</p>
                  </div>
                )}
              </div>

              <div className="mt-8 flex space-x-4">
                <motion.button
                  type="button"
                  onClick={() => setIsConfirming(false)}
                  className="w-full py-3 rounded-md font-semibold transition-colors duration-300 bg-white/10 text-brand-light hover:bg-white/20"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Go Back
                </motion.button>
                <motion.button
                  type="button"
                  onClick={handleConfirmSubmit}
                  className="w-full bg-brand-gold text-brand-deep-blue font-bold py-3 rounded-md hover:bg-yellow-300 transition-colors duration-300"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Confirm & Submit
                </motion.button>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default RsvpForm;
