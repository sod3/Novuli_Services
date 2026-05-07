'use client';
import React, { useState } from "react";
import { getToolById } from "@/data/tools";
import { FiSearch, FiTrendingUp} from "react-icons/fi";
import { motion } from "framer-motion";

export default function KeywordResearchTool() {
    const [keyword, setKeyword] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    setIsSearching(true);
    setTimeout(() => {
      setIsSearching(false);
      setShowResults(true);
    }, 1500);
  };

  return (
    <>
      <div className="max-w-2xl mx-auto py-10">
        <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4 mb-12">
          <div className="flex-grow relative">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary" />
            <input
              type="text"
              required
              placeholder="e.g. online marketing, best tools 2026"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              className="w-full bg-bg-gray border-2 border-transparent focus:border-accent focus:bg-white rounded-xl pl-12 pr-4 py-4 focus:outline-none transition-all shadow-sm"
            />
          </div>
          <button 
            type="submit" 
            disabled={isSearching}
            className="bg-accent text-white px-8 py-4 rounded-xl font-bold hover:bg-blue-600 transition-all active:scale-95 flex items-center justify-center gap-2"
          >
            {isSearching ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> : "Research"}
          </button>
        </form>

        {showResults && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <h3 className="text-xl font-bold text-primary mb-6 flex items-center gap-2">
              <FiTrendingUp className="text-accent" /> Results for "{keyword}"
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-bg-gray p-6 rounded-2xl border border-gray-100">
                <p className="text-secondary text-xs uppercase font-black mb-1">Search Volume</p>
                <p className="text-2xl font-display font-bold text-primary">12.5K/mo</p>
              </div>
              <div className="bg-bg-gray p-6 rounded-2xl border border-gray-100">
                <p className="text-secondary text-xs uppercase font-black mb-1">Difficulty</p>
                <div className="flex items-center gap-2">
                   <p className="text-2xl font-display font-bold text-primary">Easy</p>
                   <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                </div>
              </div>
              <div className="bg-bg-gray p-6 rounded-2xl border border-gray-100">
                <p className="text-secondary text-xs uppercase font-black mb-1">CPC</p>
                <p className="text-2xl font-display font-bold text-primary">$1.24</p>
              </div>
            </div>

            <div className="bg-white border-2 border-border-light rounded-2xl overflow-hidden mt-8">
              <div className="bg-bg-gray px-6 py-3 border-b border-border-light flex justify-between items-center text-xs font-bold text-secondary uppercase tracking-widest">
                <span>Keyword Idea</span>
                <div className="flex gap-10">
                   <span>Vol</span>
                   <span>KD</span>
                </div>
              </div>
              <div className="divide-y divide-gray-50">
                {[
                  { k: `${keyword} guide`, v: "2.4K", kd: "12%" },
                  { k: `best ${keyword} 2026`, v: "1.8K", kd: "15%" },
                  { k: `free ${keyword} tool`, v: "950", kd: "8%" },
                  { k: `${keyword} examples`, v: "420", kd: "5%" },
                ].map((row, i) => (
                  <div key={i} className="px-6 py-4 flex justify-between items-center hover:bg-blue-50 transition-colors cursor-pointer group">
                    <span className="text-primary font-medium group-hover:text-accent transition-colors">{row.k}</span>
                    <div className="flex gap-10">
                       <span className="text-secondary text-sm tabular-nums">{row.v}</span>
                       <span className="text-secondary text-sm tabular-nums w-8">{row.kd}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </>
  );
}

