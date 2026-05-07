'use client';
import React, { useState, useEffect } from "react";
import Link from 'next/link';
import { FiX, FiInfo } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

export default function CookieConsent() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("novuli_cookie_consent");
    if (!consent) {
      // Small delay so it's not instantly annoying
      const timer = setTimeout(() => setShow(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const accept = () => {
    localStorage.setItem("novuli_cookie_consent", "accepted");
    setShow(false);
  };

  const decline = () => {
    localStorage.setItem("novuli_cookie_consent", "declined");
    setShow(false);
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed bottom-0 left-0 right-0 z-[100] sm:p-4 pointer-events-none"
        >
          <div className="bg-slate-900 border-t border-slate-700 sm:border sm:rounded-2xl shadow-2xl overflow-hidden pointer-events-auto max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between p-6 gap-6 relative">
            <button 
              onClick={decline}
              className="absolute top-4 right-4 text-slate-400 hover:text-white sm:hidden"
            >
              <FiX size={20} />
            </button>

            <div className="flex items-start gap-4 flex-1">
              <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center shrink-0 text-blue-400">
                <FiInfo size={20} />
              </div>
              <div>
                <h3 className="text-white font-bold mb-1">Your Privacy & Cookies</h3>
                <p className="text-slate-300 text-sm leading-relaxed max-w-3xl">
                  We use cookies to personalize content, serve targeted advertisements (via Google AdSense), and analyze our traffic. By clicking "Accept All", you consent to our use of cookies in accordance with our <Link href="/privacy" className="text-blue-400 hover:underline">Privacy Policy</Link>.
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto shrink-0">
              <button 
                onClick={decline}
                className="px-6 py-2.5 rounded-xl border border-slate-700 text-slate-300 hover:bg-slate-800 transition-colors text-sm font-bold w-full sm:w-auto text-center"
              >
                Decline Optional
              </button>
              <button 
                onClick={accept}
                className="px-6 py-2.5 rounded-xl bg-blue-600 text-white hover:bg-blue-500 transition-colors text-sm font-bold w-full sm:w-auto text-center shadow-lg shadow-blue-900/20"
              >
                Accept All
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
