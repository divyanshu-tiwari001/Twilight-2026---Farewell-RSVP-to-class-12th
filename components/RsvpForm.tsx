
import React, { useState } from 'react';
import { RSVP } from '../types';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Check, Users, ShieldAlert, Award, Calendar, MapPin, Contact, Ticket, QrCode } from 'lucide-react';

interface RsvpFormProps {
  onSubmit: (rsvp: Omit<RSVP, 'id' | 'timestamp'>) => void;
  showSuccess: boolean;
  onReset?: () => void;
}

const RsvpForm: React.FC<RsvpFormProps> = ({ onSubmit, showSuccess, onReset }) => {
  const [name, setName] = useState('');
  const [attending, setAttending] = useState<boolean | null>(null);
  const [selectedClass, setSelectedClass] = useState<'11th' | '12th' | null>(null);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isConfirming, setIsConfirming] = useState(false);

  const handleResetForm = () => {
    setName('');
    setAttending(null);
    setSelectedClass(null);
    setMessage('');
    setError('');
    if (onReset) onReset();
  };

  // Generate a mock ticket reservation number
  const [ticketNo] = useState(() => `TWL-${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(10 + Math.random() * 89)}`);

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
    onSubmit({ name, attending: attending!, class: selectedClass!, message });
    setIsConfirming(false);
    // Don't fully reset fields instantly to let the victory ticket load user names
  };

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const modalVariants = {
    hidden: { opacity: 0, y: -40, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', stiffness: 350, damping: 25 } },
    exit: { opacity: 0, y: 40, scale: 0.95, transition: { duration: 0.25 } },
  };

  const formContainerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.08, duration: 0.6 } },
  };

  const formItemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <>
      <AnimatePresence mode="wait">
        {showSuccess ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 200, damping: 22 }}
            className="max-w-2xl mx-auto rounded-2xl overflow-hidden shadow-[0_30px_80px_rgba(0,0,0,0.8)] border border-brand-gold/30 bg-[#080d1a] relative"
          >
            {/* Ambient gold glow glow */}
            <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-brand-gold to-transparent" />

            <div className="p-8 md:p-10 relative z-10">
              <div className="flex flex-col items-center text-center">
                <div className="h-16 w-16 bg-brand-gold/10 rounded-full border border-brand-gold/30 flex items-center justify-center text-brand-gold mb-4 shadow-lg">
                  <Check className="h-8 w-8 stroke-[2]" />
                </div>
                <h2 className="text-3xl font-serif text-white font-semibold">RSVP Appreciated</h2>
                <p className="mt-1.5 text-xs tracking-widest text-brand-gold/80 uppercase font-sans font-medium">Thank you for your confirmation</p>
              </div>

              {/* Gala Ticket Mock-up */}
              <div className="mt-8 border border-white/10 rounded-xl bg-slate-950/60 overflow-hidden shadow-2xl relative">
                {/* Simulated punched ticket sides */}
                <span className="absolute left-[-8px] top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-[#080d1a] border-r border-white/10" />
                <span className="absolute right-[-8px] top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-[#080d1a] border-l border-white/10" />

                {/* Top Half of Ticket */}
                <div className="p-6 md:p-8 space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-[10px] uppercase tracking-widest text-slate-400 font-medium font-sans block">GUEST DELEGATE</span>
                      <span className="text-lg font-semibold text-white tracking-wide block">{name || "Respected Attendee"}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] uppercase tracking-widest text-slate-400 font-medium block">TICKET ID</span>
                      <span className="text-sm font-semibold text-brand-gold font-mono tracking-wider block">{ticketNo}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/5">
                    <div>
                      <span className="text-[10px] uppercase tracking-widest text-slate-400 font-medium block">CONFERENCE CLASS</span>
                      <span className="text-sm font-medium text-slate-200">Class {selectedClass || "12th"} Grade</span>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase tracking-widest text-slate-400 font-medium block">STATUS DECLARED</span>
                      <span className="text-sm font-semibold text-green-400 flex items-center space-x-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                        <span>{attending === false ? "Excused" : "Attending Assembly"}</span>
                      </span>
                    </div>
                  </div>
                </div>

                {/* Dashboard-Ticket separator dashed line */}
                <div className="relative h-[2px] bg-white/5 border-t border-dashed border-white/20 select-none px-4" />

                {/* Bottom Ticket segment */}
                <div className="p-6 md:p-8 bg-slate-900/40 grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                  <div className="md:col-span-2 space-y-3">
                    <div className="flex items-center space-x-2 text-xs text-slate-300">
                      <MapPin className="h-4 w-4 text-brand-gold/80" />
                      <span className="font-light">Senior Wing Precinct, CSDAVPS</span>
                    </div>
                    <div className="flex items-center space-x-2 text-xs text-slate-300">
                      <Calendar className="h-4 w-4 text-brand-gold/80" />
                      <span className="font-light">09 February 2026, 09:00 AM AST</span>
                    </div>
                  </div>

                  <div className="flex flex-col items-center justify-center border-l md:border-l border-white/5 pl-0 md:pl-6">
                    <QrCode className="h-12 w-12 text-slate-400 opacity-80 mb-1 stroke-[1.25]" />
                    <span className="text-[9px] text-slate-500 font-mono tracking-widest">SECURE ENTRYPASS</span>
                  </div>
                </div>
              </div>

              {/* Corporate Contact Hotline Sheet */}
              <div className="mt-8 border-t border-white/5 pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
                <span className="text-slate-400 text-center md:text-left">
                  Any discrepancy or special hospitality requests?
                </span>
                <div className="flex flex-wrap gap-x-4 gap-y-2 justify-center text-slate-300">
                  <a href="tel:+919852176407" className="hover:text-brand-gold hover:underline transition-colors block">
                    📞 Support I: +91 9852176407
                  </a>
                  <a href="tel:+919955888527" className="hover:text-brand-gold hover:underline transition-colors block">
                    📞 Support II: +91 9955888527
                  </a>
                </div>
              </div>

              {/* Secure action button to register another pass */}
              <div className="mt-8 pt-4 flex justify-center border-t border-white/5">
                <button
                  type="button"
                  onClick={handleResetForm}
                  className="px-6 py-3 rounded-xl text-xs uppercase tracking-widest font-semibold border border-brand-gold/30 bg-brand-gold/10 text-brand-gold hover:bg-brand-gold/20 hover:scale-[1.01] transition-all duration-350"
                >
                  Register Another Delegate Pass
                </button>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="form-container"
            variants={formContainerVariants}
            initial="hidden"
            animate="visible"
            className="max-w-xl mx-auto rounded-2xl shadow-[0_30px_90px_rgba(0,0,0,0.7)] border border-white/10 bg-slate-950/40 backdrop-blur-xl relative overflow-hidden"
          >
            {/* Subtle light gold overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-brand-gold/[0.02] to-transparent pointer-events-none" />

            <div className="p-8 md:p-10 relative z-10 space-y-6">
              <div className="text-center space-y-1.5">
                <span className="text-[10px] tracking-[0.25em] text-brand-gold font-sans font-medium uppercase">Declaration Desk</span>
                <h2 className="text-3xl font-serif text-white tracking-wide">Join Us for a Day to Remember</h2>
                <p className="text-xs text-slate-400 font-light max-w-sm mx-auto">Please submit your attendee records to finalize the secure class registry seating protocol.</p>
              </div>

              <form onSubmit={handleSubmit} noValidate className="space-y-6">
                
                {/* Guest Full Name Group */}
                <div className="space-y-2">
                  <label htmlFor="name" className="text-xs tracking-wider uppercase font-sans font-medium text-slate-300 flex items-center space-x-1.5">
                    <User className="h-3.5 w-3.5 text-brand-gold" />
                    <span>Attendee Full Name</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-slate-900/60 border border-white/10 rounded-xl px-4 py-3.5 pl-5 text-white placeholder-slate-500 focus:placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-brand-gold/60 focus:border-brand-gold/60 transition-all font-sans text-sm tracking-wide"
                      placeholder="e.g. Aryan Kumar"
                      required
                    />
                  </div>
                </div>

                {/* Class Cohort Selection */}
                <div className="space-y-2">
                  <label className="text-xs tracking-wider uppercase font-sans font-medium text-slate-300 flex items-center space-x-1.5">
                    <Users className="h-3.5 w-3.5 text-brand-gold" />
                    <span>Select Class Cohort</span>
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      type="button"
                      onClick={() => setSelectedClass('11th')}
                      className={`py-3.5 rounded-xl font-medium text-xs tracking-wider uppercase border transition-all flex items-center justify-center space-x-2 ${
                        selectedClass === '11th' 
                          ? 'bg-brand-gold border-brand-gold text-black font-semibold shadow-lg shadow-brand-gold/15'
                          : 'bg-slate-900/40 border-white/10 text-slate-300 hover:border-white/20 hover:bg-slate-900/60'
                      }`}
                    >
                      <Check className={`h-4 w-4 transition-all ${selectedClass === '11th' ? 'scale-100 opacity-100' : 'scale-75 opacity-0'}`} />
                      <span>Class 11th</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setSelectedClass('12th')}
                      className={`py-3.5 rounded-xl font-medium text-xs tracking-wider uppercase border transition-all flex items-center justify-center space-x-2 ${
                        selectedClass === '12th' 
                          ? 'bg-brand-gold border-brand-gold text-black font-semibold shadow-lg shadow-brand-gold/15'
                          : 'bg-slate-900/40 border-white/10 text-slate-300 hover:border-white/20 hover:bg-slate-900/60'
                      }`}
                    >
                      <Check className={`h-4 w-4 transition-all ${selectedClass === '12th' ? 'scale-100 opacity-100' : 'scale-75 opacity-0'}`} />
                      <span>Class 12th</span>
                    </button>
                  </div>
                </div>

                {/* Attending Status Selector */}
                <div className="space-y-2">
                  <label className="text-xs tracking-wider uppercase font-sans font-medium text-slate-300 flex items-center space-x-1.5">
                    <Ticket className="h-3.5 w-3.5 text-brand-gold" />
                    <span>Seating Attendance Claim</span>
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      type="button"
                      onClick={() => setAttending(true)}
                      className={`py-3.5 rounded-xl font-medium text-xs tracking-wider uppercase border transition-all flex items-center justify-center space-x-2 ${
                        attending === true 
                          ? 'bg-gradient-to-r from-emerald-500 to-teal-500 border-emerald-500 text-white font-semibold shadow-lg shadow-emerald-500/15'
                          : 'bg-slate-900/40 border-white/10 text-slate-300 hover:border-white/20 hover:bg-slate-900/60'
                      }`}
                    >
                      <span>Yes, Attending</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setAttending(false)}
                      className={`py-3.5 rounded-xl font-medium text-xs tracking-wider uppercase border transition-all flex items-center justify-center space-x-2 ${
                        attending === false 
                          ? 'bg-red-950/40 border-red-500/40 text-red-300 font-semibold shadow-lg shadow-red-500/10'
                          : 'bg-slate-900/40 border-white/10 text-slate-300 hover:border-white/20 hover:bg-slate-900/60'
                      }`}
                    >
                      <span>Cannot Attend</span>
                    </button>
                  </div>
                </div>

                {/* Private Message Box */}
                <div className="space-y-2">
                  <label htmlFor="message" className="text-xs tracking-wider uppercase font-sans font-medium text-slate-300 flex items-center space-x-1.5">
                    <Contact className="h-3.5 w-3.5 text-brand-gold" />
                    <span>Memory or message for class registry (optional)</span>
                  </label>
                  <textarea
                    id="message"
                    rows={3}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full bg-slate-900/60 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-slate-505 focus:outline-none focus:ring-1 focus:ring-brand-gold/60 focus:border-brand-gold/60 transition-all font-sans text-sm tracking-wide"
                    placeholder="Share a sweet memory, high-school recall, or farewell blessings..."
                  ></textarea>
                </div>

                {/* Error Banner */}
                <AnimatePresence>
                  {error && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="bg-red-950/30 border border-red-500/20 rounded-xl p-3 flex items-center space-x-2.5 text-red-300 text-xs"
                    >
                      <ShieldAlert className="h-4 w-4 shrink-0" />
                      <span>{error}</span>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Submit Action Handle */}
                <button 
                  type="submit" 
                  className="w-full bg-brand-gold text-black font-semibold text-xs tracking-widest uppercase py-4 rounded-xl hover:bg-yellow-400 active:scale-[0.98] transition-all focus:outline-none focus:ring-2 focus:ring-brand-gold focus:ring-offset-2 focus:ring-offset-brand-purple shadow-xl shadow-brand-gold/10 flex items-center justify-center space-x-2"
                >
                  <span>Submit Seating Request</span>
                </button>

              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Confirmation Modal overlay dialog */}
      <AnimatePresence>
        {isConfirming && (
          <motion.div
            key="confirmation-backdrop"
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="fixed inset-0 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-fade-in"
          >
            <motion.div
              key="confirmation-modal"
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="w-full max-w-md bg-[#0a0f1d] border border-white/10 rounded-2xl shadow-[0_25px_60px_rgba(0,0,0,0.8)] overflow-hidden"
            >
              <div className="p-8 space-y-6">
                <div>
                  <h3 className="text-2xl font-serif text-white font-medium text-center">Receipt Verification</h3>
                  <p className="text-center text-xs text-slate-400 mt-1 uppercase font-semibold font-sans tracking-widest">Twilight Valedictory Seating Protocol</p>
                </div>
                
                <div className="space-y-3 p-4 bg-slate-900/60 rounded-xl border border-white/5 text-sm">
                  <div className="flex justify-between items-center py-2 border-b border-white/5">
                    <span className="text-slate-400">Representative Name:</span>
                    <span className="font-semibold text-white">{name}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-white/5">
                    <span className="text-slate-400">Academic Cohort:</span>
                    <span className="font-semibold text-white">Class {selectedClass}</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-slate-400">Attendance Claim:</span>
                    <span className={`font-semibold px-2.5 py-0.5 text-xs rounded-full ${attending ? 'bg-emerald-500/10 text-emerald-300' : 'bg-red-400/10 text-red-300'}`}>
                      {attending ? "Declaring Attendance" : "Declaring Departure"}
                    </span>
                  </div>
                  {message && (
                    <div className="pt-3 border-t border-white/5">
                      <span className="text-slate-400 block pb-1">Registry Message:</span>
                      <p className="text-slate-300 italic text-xs leading-relaxed bg-[#060a14] rounded p-2.5 border border-white/5">"{message}"</p>
                    </div>
                  )}
                </div>

                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => setIsConfirming(false)}
                    className="w-full py-3.5 rounded-xl font-medium text-xs uppercase tracking-wider transition-all bg-white/5 text-slate-300 border border-white/10 hover:bg-white/10"
                  >
                    Modify
                  </button>
                  <button
                    type="button"
                    onClick={handleConfirmSubmit}
                    className="w-full bg-brand-gold text-black font-semibold py-3.5 rounded-xl text-xs uppercase tracking-wider hover:bg-yellow-400 transition-all shadow-lg"
                  >
                    Affirm & Submit
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default RsvpForm;
