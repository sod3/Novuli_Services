'use client';
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiMail, FiArrowRight, FiCheckCircle, FiLock } from "react-icons/fi";

export default function LeadCaptureForm({ title, subtitle, buttonText = "Get My Result", onComplete }) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      if (onComplete) onComplete(email);
    }, 1500);
  };

  return (
    <div className="bg-white border border-border-light rounded-2xl p-8 shadow-xl max-w-xl mx-auto overflow-hidden relative">
      <AnimatePresence mode="wait">
        {!submitted ? (
          <motion.div
            key="form"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-accent">
                <FiMail size={32} />
              </div>
            </div>
            
            <h3 className="text-2xl font-display font-bold text-primary text-center mb-2">
              {title || "Your result is ready!"}
            </h3>
            <p className="text-secondary text-center mb-8 font-light">
              {subtitle || "Enter your work email to view and save your result."}
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="work-email" className="block text-xs font-bold uppercase tracking-widest text-secondary mb-2 ml-1">
                  Work Email
                </label>
                <input
                  id="work-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  className="w-full bg-bg-gray border border-border-light text-primary placeholder-gray-400 rounded-xl px-4 py-4 focus:outline-none focus:border-accent focus:ring-4 focus:ring-blue-50 transition-all text-lg"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full py-4 text-lg flex items-center justify-center gap-3 disabled:opacity-70"
              >
                {loading ? (
                  <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : (
                  <>
                    {buttonText}
                    <FiArrowRight size={20} />
                  </>
                )}
              </button>
            </form>

            <div className="mt-6 flex items-center justify-center gap-4 text-[10px] text-secondary font-bold uppercase tracking-wider">
              <span className="flex items-center gap-1"><FiLock /> 256-bit Encryption</span>
              <span className="flex items-center gap-1"><FiCheckCircle /> Spam-free Guarantee</span>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-8"
          >
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center text-green-500">
                <FiCheckCircle size={48} />
              </div>
            </div>
            <h3 className="text-2xl font-display font-bold text-primary mb-2">Check your inbox!</h3>
            <p className="text-secondary mb-0">We've sent the result to <strong>{email}</strong>.</p>
            <p className="text-secondary text-sm mt-2">You can also view it below now.</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
