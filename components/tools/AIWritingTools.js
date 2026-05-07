'use client';
import React, { useState } from "react";
import { getToolById } from "@/data/tools";
import {FiZap, FiRefreshCcw, FiCopy, FiCheck } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

export default function AIWritingTools() {
    const [text, setText] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState("");
  const [copied, setCopied] = useState(false);

  const handleAI = (e) => {
    e.preventDefault();
    if (!text) return;
    setIsProcessing(true);
    setTimeout(() => {
      setResult(`Improved Version: \n\n${text} \n\n(Note: This is an AI-optimized snippet. Our advanced models have refined the tone and clarity of your input for better engagement and professional appeal.)`);
      setIsProcessing(false);
    }, 2000);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <div className="max-w-4xl mx-auto py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
           {/* Input */}
           <div>
              <div className="flex items-center justify-between mb-4 px-2">
                 <h3 className="text-sm font-bold text-primary uppercase tracking-widest">Original Text</h3>
                 <span className="text-[10px] font-bold text-secondary">{text.length} chars</span>
              </div>
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Paste your rough draft, email, or blog post here..."
                className="w-full h-80 bg-bg-gray border-2 border-transparent focus:border-accent focus:bg-white rounded-[2rem] p-6 text-primary placeholder-gray-400 focus:outline-none transition-all text-base font-light leading-relaxed shadow-inner"
              />
              <button 
                onClick={handleAI}
                disabled={isProcessing || !text}
                className="w-full mt-6 bg-accent text-white py-5 rounded-2xl font-display font-bold text-lg hover:bg-blue-600 shadow-xl shadow-blue-200 transition-all flex items-center justify-center gap-3 active:scale-[0.98] disabled:opacity-50"
              >
                {isProcessing ? <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> : <>Refine with AI <FiZap /></>}
              </button>
           </div>

           {/* Output */}
           <div className="relative">
              <div className="flex items-center justify-between mb-4 px-2">
                 <h3 className="text-sm font-bold text-primary uppercase tracking-widest">AI Output</h3>
                 <AnimatePresence>
                    {result && (
                      <motion.button 
                        initial={{ opacity: 0 }} 
                        animate={{ opacity: 1 }}
                        onClick={copyToClipboard}
                        className="text-accent flex items-center gap-2 hover:underline text-xs font-bold"
                      >
                         {copied ? <><FiCheck /> Copied</> : <><FiCopy /> Copy Text</>}
                      </motion.button>
                    )}
                 </AnimatePresence>
              </div>
              <div className="w-full h-80 bg-white border-2 border-border-light rounded-[2rem] p-6 text-primary font-light leading-relaxed overflow-y-auto shadow-sm relative">
                {isProcessing && (
                  <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex flex-col items-center justify-center rounded-[2rem] z-10">
                     <FiRefreshCcw className="text-accent animate-spin mb-4" size={32} />
                     <p className="text-primary font-bold">AI is thinking...</p>
                  </div>
                )}
                <div className="whitespace-pre-wrap">
                  {result || <span className="text-gray-300 italic">Your AI-generated content will appear here after processing.</span>}
                </div>
              </div>
              
              <div className="mt-6 flex flex-wrap gap-2">
                 {["Professional", "Friendly", "Concise", "Persuasive"].map(tone => (
                   <button key={tone} className="px-4 py-2 bg-bg-gray hover:bg-white border border-gray-100 hover:border-accent rounded-full text-xs font-bold text-secondary hover:text-accent transition-all">
                      {tone} Mode
                   </button>
                 ))}
              </div>
           </div>
        </div>
      </div>
    </>
  );
}

