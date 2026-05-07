'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { FiShield, FiX, FiCheck } from 'react-icons/fi';

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has already made a choice
    const consent = localStorage.getItem('novuli_cookie_consent');
    if (!consent) {
      // Show immediately for confirmation
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('novuli_cookie_consent', 'accepted');
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem('novuli_cookie_consent', 'declined');
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className="fixed bottom-6 left-6 right-6 z-[9999] md:max-w-2xl md:left-auto"
        >
          <div className="bg-white rounded-[2rem] p-6 shadow-2xl shadow-blue-900/20 border border-border-light flex flex-col md:flex-row items-center gap-6 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1.5 h-full bg-accent" />
            
            <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center shrink-0 border border-blue-100">
              <FiShield className="text-blue-600" size={28} />
            </div>
            
            <div className="flex-grow">
              <h4 className="text-primary font-bold text-lg mb-1 flex items-center gap-2">
                Cookie Privacy Choice
              </h4>
              <p className="text-secondary text-sm font-light leading-relaxed">
                We use cookies to analyze traffic and optimize your experience. By clicking "Accept All", you agree to our <Link href="/privacy" className="text-accent underline font-medium">Privacy Policy</Link>.
              </p>
            </div>

            <div className="flex items-center gap-3 w-full md:w-auto">
              <button 
                onClick={handleDecline}
                className="flex-1 md:flex-none px-6 py-3 bg-bg-gray text-primary font-bold text-sm rounded-xl hover:bg-gray-200 transition-all border border-transparent whitespace-nowrap"
              >
                Decline
              </button>
              <button 
                onClick={handleAccept}
                className="flex-1 md:flex-none px-8 py-3 bg-primary text-white font-bold text-sm rounded-xl hover:bg-accent transition-all shadow-lg hover:shadow-blue-500/20 flex items-center justify-center gap-2 whitespace-nowrap"
              >
                <FiCheck size={16} /> Accept All
              </button>
            </div>

            <button 
              onClick={() => setIsVisible(false)}
              className="absolute top-4 right-4 text-gray-300 hover:text-primary transition-colors"
            >
              <FiX size={20} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
