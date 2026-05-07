'use client';
import React, { useState } from "react";
import { getToolById } from "@/data/tools";
import { FiLink, FiGlobe } from "react-icons/fi";
import { motion } from "framer-motion";
import Link from 'next/link';

export default function BacklinkChecker() {
    const [url, setUrl] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    setIsSearching(true);
    setTimeout(() => {
      setIsSearching(false);
      setShowResults(true);
    }, 1800);
  };

  return (
    <>
      <div className="max-w-3xl mx-auto py-10">
        <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4 mb-12">
          <div className="flex-grow relative">
            <FiGlobe className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary" />
            <input
              type="url"
              required
              placeholder="https://competitor.com"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="w-full bg-bg-gray border-2 border-transparent focus:border-accent focus:bg-white rounded-xl pl-12 pr-4 py-4 focus:outline-none transition-all shadow-sm"
            />
          </div>
          <button 
            type="submit" 
            disabled={isSearching}
            className="bg-accent text-white px-8 py-4 rounded-xl font-bold hover:bg-blue-600 transition-all active:scale-95 flex items-center justify-center gap-2 px-10"
          >
            {isSearching ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> : "Check Backlinks"}
          </button>
        </form>

        {showResults && (
          <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {[
                { label: "Domain Rating", val: "42", color: "text-accent" },
                { label: "Backlinks", val: "1.4K", color: "text-primary" },
                { label: "Ref. Domains", val: "284", color: "text-primary" },
                { label: "Toxic Links", val: "0", color: "text-green-500" },
              ].map((stat, i) => (
                <div key={i} className="bg-bg-gray p-6 rounded-2xl border border-gray-100 text-center">
                  <p className="text-[10px] uppercase font-black text-secondary tracking-widest mb-1">{stat.label}</p>
                  <p className={`text-2xl font-display font-bold ${stat.color}`}>{stat.val}</p>
                </div>
              ))}
            </div>

            <div className="bg-white border-2 border-border-light rounded-2xl overflow-hidden mt-8">
               <div className="bg-bg-gray px-6 py-4 border-b border-border-light flex justify-between items-center">
                  <h4 className="text-xs font-bold text-primary uppercase tracking-widest flex items-center gap-2">
                     <FiLink className="text-accent" /> Recent Linking Domains
                  </h4>
                  <span className="text-[10px] font-bold text-secondary uppercase tracking-widest">DR Score</span>
               </div>
               <div className="divide-y divide-gray-50">
                  {[
                    { d: "techcrunch.com", dr: 92, type: "Editorial" },
                    { d: "medium.com", dr: 94, type: "UGC" },
                    { d: "indiehackers.com", dr: 74, type: "Forum" },
                    { d: "producthunt.com", dr: 91, type: "Directory" },
                  ].map((row, i) => (
                    <div key={i} className="px-6 py-5 flex justify-between items-center hover:bg-blue-50 transition-colors cursor-pointer group">
                      <div className="flex items-center gap-3">
                         <div className="w-8 h-8 rounded-lg bg-bg-gray flex items-center justify-center text-secondary group-hover:bg-white transition-colors">
                            <FiGlobe size={14} />
                         </div>
                         <div>
                            <p className="text-primary font-bold text-sm leading-none mb-1 group-hover:text-accent transition-colors">{row.d}</p>
                            <p className="text-[10px] font-bold text-secondary uppercase tracking-[0.1em]">{row.type}</p>
                         </div>
                      </div>
                      <span className="text-primary font-display font-bold tabular-nums">{row.dr}</span>
                    </div>
                  ))}
               </div>
               <div className="p-6 bg-gray-50 border-t border-border-light text-center">
                  <p className="text-secondary text-xs font-light mb-4 text-center">Get the full CSV list with anchor text and spam scores by running a professional SEO audit.</p>
                  <Link href="/tools/seo-audit" className="bg-white border border-border-light text-accent px-6 py-2.5 rounded-xl font-bold text-xs hover:bg-accent hover:text-white transition-all shadow-sm">
                     Upgrade to Professional Report
                  </Link>
               </div>
            </div>
          </motion.div>
        )}
      </div>
    </>
  );
}

