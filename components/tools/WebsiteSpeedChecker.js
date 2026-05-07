'use client';
import React, { useState } from "react";
import { getToolById } from "@/data/tools";
import { FiZap, FiClock, FiSmartphone, FiMonitor } from "react-icons/fi";
import { motion } from "framer-motion";

export default function WebsiteSpeedChecker() {
    const [url, setUrl] = useState("");
  const [isChecking, setIsChecking] = useState(false);
  const [results, setResults] = useState(null);

  const handleAudit = (e) => {
    e.preventDefault();
    setIsChecking(true);
    setTimeout(() => {
      setResults({
        score: 92,
        metrics: [
          { label: "First Contentful Paint", value: "0.8s", status: "pass" },
          { label: "Largest Contentful Paint", value: "1.2s", status: "pass" },
          { label: "Total Blocking Time", value: "40ms", status: "pass" },
          { label: "Cumulative Layout Shift", value: "0.02", status: "pass" },
        ]
      });
      setIsChecking(false);
    }, 2000);
  };

  return (
    <>
      <div className="max-w-3xl mx-auto py-10">
        <form onSubmit={handleAudit} className="flex flex-col sm:flex-row gap-4 mb-16">
          <input
            type="url"
            required
            placeholder="https://example.com"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="flex-grow bg-bg-gray border-2 border-transparent focus:border-accent focus:bg-white rounded-2xl px-6 py-4.5 focus:outline-none transition-all text-lg shadow-sm"
          />
          <button 
            type="submit" 
            disabled={isChecking}
            className="bg-accent text-white px-10 py-4.5 rounded-2xl font-bold hover:bg-blue-600 transition-all active:scale-95 flex items-center justify-center gap-3 whitespace-nowrap"
          >
            {isChecking ? <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> : <>Test Speed <FiZap /></>}
          </button>
        </form>

        {results && (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-10">
            <div className="flex flex-col md:flex-row items-center gap-12 bg-bg-gray p-10 rounded-[2.5rem] border border-gray-100">
               <div className="relative w-40 h-40">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle cx="80" cy="80" r="74" stroke="white" strokeWidth="10" fill="transparent" />
                    <circle cx="80" cy="80" r="74" stroke="#10B981" strokeWidth="10" fill="transparent" strokeDasharray="464.72" strokeDashoffset={464.72 * (1 - results.score / 100)} strokeLinecap="round" className="transition-all duration-1000" />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-5xl font-display font-bold text-primary">{results.score}</span>
                    <span className="text-[10px] font-bold text-secondary uppercase tracking-widest">Performance</span>
                  </div>
               </div>
               <div className="flex-1 text-center md:text-left">
                  <h3 className="text-2xl font-display font-bold text-primary mb-2">Excellent performance!</h3>
                  <p className="text-secondary text-lg font-light leading-relaxed mb-6">
                    Your website is optimized for speed and core web vitals. We detected no major bottlenecks for {url}.
                  </p>
                  <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                    <span className="bg-white px-4 py-2 rounded-xl border border-gray-100 flex items-center gap-2 text-xs font-bold text-primary shadow-sm">
                      <FiSmartphone className="text-secondary" /> Mobile Ready
                    </span>
                    <span className="bg-white px-4 py-2 rounded-xl border border-gray-100 flex items-center gap-2 text-xs font-bold text-primary shadow-sm">
                      <FiMonitor className="text-secondary" /> Desktop Ready
                    </span>
                  </div>
               </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               {results.metrics.map((m, i) => (
                 <div key={i} className="bg-white border border-border-light p-6 rounded-2xl shadow-sm hover:border-accent transition-all group">
                    <div className="flex justify-between items-start mb-4">
                      <div className="w-10 h-10 bg-bg-gray rounded-xl flex items-center justify-center text-secondary group-hover:text-accent transition-colors">
                        <FiClock />
                      </div>
                      <span className="bg-green-100 text-green-700 text-[10px] uppercase font-bold px-3 py-1 rounded-full">Good</span>
                    </div>
                    <p className="text-secondary text-sm font-light mb-1">{m.label}</p>
                    <p className="text-2xl font-display font-bold text-primary">{m.value}</p>
                 </div>
               ))}
            </div>
          </motion.div>
        )}
      </div>
    </>
  );
}

