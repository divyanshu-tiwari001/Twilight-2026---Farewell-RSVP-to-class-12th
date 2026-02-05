
import React, { useState, useEffect } from 'react';
import { RSVP } from './types';
import Header from './components/Header';
import RsvpForm from './components/RsvpForm';
import RsvpView from './components/AdminView';
import SplashScreen from './components/SplashScreen';
import Footer from './components/Footer';
import { AnimatePresence, motion } from 'framer-motion';

type View = 'form' | 'rsvp';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>('form');
  const [rsvps, setRsvps] = useState<RSVP[]>(() => {
    try {
      const savedRsvps = window.localStorage.getItem('twilight2026-rsvps');
      if (savedRsvps) {
        // Parse the stored JSON and convert timestamp strings back to Date objects
        return JSON.parse(savedRsvps).map((rsvp: RSVP) => ({
          ...rsvp,
          timestamp: new Date(rsvp.timestamp),
        }));
      }
      return [];
    } catch (error) {
      console.error("Failed to load RSVPs from local storage:", error);
      return [];
    }
  });
  const [showSuccess, setShowSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 3000); // Splash screen duration
    return () => clearTimeout(timer);
  }, []);

  // Effect to save RSVPs to localStorage whenever the list changes
  useEffect(() => {
    try {
      window.localStorage.setItem('twilight2026-rsvps', JSON.stringify(rsvps));
    } catch (error) {
      console.error("Failed to save RSVPs to local storage:", error);
    }
  }, [rsvps]);

  const handleRsvpSubmit = (newRsvp: Omit<RSVP, 'id' | 'timestamp'>) => {
    const rsvpWithId: RSVP = {
      ...newRsvp,
      id: new Date().toISOString() + Math.random(),
      timestamp: new Date(),
    };
    setRsvps(prevRsvps => [rsvpWithId, ...prevRsvps]);
    setShowSuccess(true);
    setTimeout(() => {
        setShowSuccess(false);
    }, 40000);
  };

  const StarryBackground: React.FC = () => (
    <motion.div 
      className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] z-[-1]"
      style={{
        backgroundImage: 'url(https://www.transparenttextures.com/patterns/stardust.png)',
        backgroundRepeat: 'repeat',
      }}
      animate={{
        x: [0, 100, 0, -100, 0],
        y: [0, 50, 100, 50, 0],
      }}
      transition={{
        duration: 300,
        ease: "linear",
        repeat: Infinity,
      }}
    />
  );
  
  const pageVariants = {
    initial: { opacity: 0, y: 30, scale: 0.98 },
    in: { opacity: 1, y: 0, scale: 1 },
    out: { opacity: 0, y: -30, scale: 1.02 },
  };

  const pageTransition = {
    type: "spring",
    stiffness: 260,
    damping: 20,
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      <StarryBackground />
      <AnimatePresence mode="wait">
        {isLoading ? (
          <SplashScreen key="splash" />
        ) : (
          <motion.div
            key="main"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="relative z-10 container mx-auto px-4 flex flex-col min-h-screen"
          >
            <div className="flex-grow py-8 md:py-16">
                <Header currentView={currentView} setCurrentView={setCurrentView} />
                <main className="mt-12">
                <AnimatePresence mode="wait">
                    {currentView === 'form' && (
                    <motion.div
                        key="form"
                        variants={pageVariants}
                        initial="initial"
                        animate="in"
                        exit="out"
                        transition={pageTransition}
                    >
                        <RsvpForm onSubmit={handleRsvpSubmit} showSuccess={showSuccess} />
                    </motion.div>
                    )}
                    {currentView === 'rsvp' && (
                    <motion.div
                        key="rsvp"
                        variants={pageVariants}
                        initial="initial"
                        animate="in"
                        exit="out"
                        transition={pageTransition}
                    >
                        <RsvpView rsvps={rsvps} />
                    </motion.div>
                    )}
                </AnimatePresence>
                </main>
            </div>
            <Footer />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;