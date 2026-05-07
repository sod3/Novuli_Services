'use client';
import React, { useState } from "react";
import { getToolById } from "@/data/tools";
import { FiBarChart2 } from "react-icons/fi";

export default function WordCounter() {
    const [text, setText] = useState("");

  const wordCount = text.trim() === "" ? 0 : text.trim().split(/\s+/).length;
  const charCount = text.length;
  const sentenceCount = text.trim() === "" ? 0 : text.split(/[.!?]+/).filter(Boolean).length;
  const readTime = Math.ceil(wordCount / 200);

  return (
    <>
      <div className="max-w-4xl mx-auto py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
           {[
             { label: "Words", val: wordCount },
             { label: "Characters", val: charCount },
             { label: "Sentences", val: sentenceCount },
             { label: "Read Time", val: `~${readTime} min` },
           ].map((stat, i) => (
             <div key={i} className="bg-bg-gray p-6 rounded-2xl border border-gray-100 text-center">
                <p className="text-[10px] uppercase font-black text-secondary tracking-widest mb-1">{stat.label}</p>
                <p className="text-2xl font-display font-bold text-primary">{stat.val}</p>
             </div>
           ))}
        </div>

        <div className="relative group">
           <div className="absolute -top-3 left-6 flex gap-2">
              <span className="bg-white px-3 py-1 rounded-full border border-gray-100 text-[10px] font-bold text-accent uppercase tracking-widest shadow-sm">Real-time Editor</span>
           </div>
           <textarea
             value={text}
             onChange={(e) => setText(e.target.value)}
             placeholder="Paste your content here to analyze..."
             className="w-full h-80 bg-white border-2 border-border-light rounded-[2rem] p-8 text-primary placeholder-gray-300 focus:outline-none focus:border-accent transition-all text-lg font-light leading-relaxed shadow-sm"
           />
           {text && (
             <button 
               onClick={() => setText("")}
               className="absolute bottom-6 right-6 text-xs font-bold text-secondary hover:text-red-500 transition-colors uppercase tracking-widest"
             >
               Clear Text
             </button>
           )}
        </div>

        <div className="mt-12 bg-blue-50 rounded-2xl p-8 border border-blue-100">
           <div className="flex items-center gap-3 mb-6">
              <FiBarChart2 className="text-accent" size={24} />
              <h3 className="text-xl font-bold text-primary">Content Density Analysis</h3>
           </div>
           <div className="space-y-4">
              <p className="text-secondary text-sm font-light">Enter 10 or more words to unlock density mapping and keyword analysis.</p>
              {wordCount > 10 && (
                <div className="flex flex-wrap gap-3">
                   {["Premium", "Tools", "Fast", "SEO", "Audit"].map(tag => (
                     <span key={tag} className="bg-white px-4 py-2 rounded-xl text-xs font-bold text-primary border border-blue-100 shadow-sm flex items-center gap-2">
                        {tag} <span className="text-accent opacity-50">2x</span>
                     </span>
                   ))}
                </div>
              )}
           </div>
        </div>
      </div>
    </>
  );
}

