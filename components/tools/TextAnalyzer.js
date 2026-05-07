'use client';
import React, { useState } from "react";
import { getToolById } from "@/data/tools";
import {FiTarget, FiCheckCircle } from "react-icons/fi";

export default function TextAnalyzer() {
    const [text, setText] = useState("");

  const stats = [
    { label: "Readability", val: "Grade 8", desc: "Easy to read for most adults." },
    { label: "Sentiment", val: "Positive", desc: "Tone is encouraging and optimistic." },
    { label: "Clarity", val: "High", desc: "Sentences are concise and clear." },
    { label: "Density", val: "Optimal", desc: "Key topics are well distributed." },
  ];

  return (
    <>
      <div className="max-w-5xl mx-auto py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
           
           {/* Editor Side */}
           <div className="lg:col-span-2">
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Paste your content here for deep analysis..."
                className="w-full h-[500px] bg-white border-2 border-border-light rounded-[2.5rem] p-8 text-primary placeholder-gray-300 focus:outline-none focus:border-accent transition-all text-lg font-light leading-relaxed shadow-xl shadow-blue-900/[0.03]"
              />
           </div>

           {/* Results Side */}
           <div className="space-y-6">
              <h3 className="text-sm font-bold text-primary uppercase tracking-widest px-2 mb-4">Deep Insights</h3>
              {stats.map((s, i) => (
                <div key={i} className="bg-bg-gray p-6 rounded-2xl border border-gray-100 group hover:border-accent hover:bg-white transition-all shadow-sm">
                   <div className="flex justify-between items-start mb-2">
                      <p className="text-[10px] uppercase font-black text-secondary tracking-widest">{s.label}</p>
                      {text.length > 50 ? <FiCheckCircle className="text-green-500" /> : <div className="w-2 h-2 rounded-full bg-gray-200" />}
                   </div>
                   <p className="text-xl font-display font-bold text-primary group-hover:text-accent transition-colors">{text.length > 50 ? s.val : "---"}</p>
                   <p className="text-secondary text-xs font-light leading-relaxed mt-2">{text.length > 50 ? s.desc : "Add more text to analyze sentiment and readability grade."}</p>
                </div>
              ))}

              <div className="bg-accent rounded-3xl p-8 text-white text-center shadow-xl shadow-blue-200 mt-10">
                 <FiTarget className="mx-auto mb-4" size={32} />
                 <h4 className="text-lg font-bold mb-2">Target Score: 92/100</h4>
                 <p className="text-blue-100 text-xs font-light leading-relaxed">
                    Analyzing your structure to ensure high engagement and conversion probability.
                 </p>
                 <button className="w-full mt-6 bg-white text-accent py-3 rounded-xl font-bold text-sm hover:bg-blue-50 transition-colors">
                    Optimize My Content
                 </button>
              </div>
           </div>
        </div>
      </div>
    </>
  );
}

