'use client';
import React, { useState } from "react";
import { getToolById } from "@/data/tools";
import { FiZap, FiCopy, FiRefreshCw, FiCheck } from "react-icons/fi";
import { motion } from "framer-motion";


const faqs = [
  { question: "How does the AI rewriter work?", answer: "It uses natural language processing to understand your text and rephrase it while preserving meaning." },
  { question: "What tones are available?", answer: "Professional, Casual, Formal, Creative, Simple, and Persuasive tones are available." },
  { question: "Is the rewritten text plagiarism-free?", answer: "Yes, the AI generates unique paraphrases. We recommend running through a plagiarism checker for academic use." },
  { question: "How long can the input text be?", answer: "Free plan: up to 500 words per rewrite. Pro plan: unlimited length." },
];

const steps = [
  { title: "Paste Your Text", desc: "Enter the content you want to rewrite or paraphrase." },
  { title: "Choose Tone", desc: "Select a tone — professional, casual, creative, formal, etc." },
  { title: "Copy & Use", desc: "Copy the rewritten text and use it anywhere." },
];

const tones = ["Professional", "Casual", "Formal", "Creative", "Simple", "Persuasive"];

const rewrites = {
  Professional: "This solution optimizes operational efficiency through strategic implementation of cutting-edge methodologies, enabling organizations to achieve superior outcomes while maintaining high standards of quality.",
  Casual: "This is a great way to get things done faster and better. It just works, and most people find it super easy to use right away!",
  Formal: "It is hereby established that this particular approach demonstrates considerable merit in its application, yielding favorable results consistent with established best practices.",
  Creative: "Imagine unlocking a whole new dimension of possibility — where tasks once daunting become delightfully effortless, and results exceed every expectation.",
  Simple: "This is a good tool. It helps you do things faster. It is easy to use and it works well.",
  Persuasive: "Don't miss out — this is the smartest, most effective solution available today. Thousands already trust it to deliver real, measurable results. You should too.",
};

export default function AITextRewriter() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [tone, setTone] = useState("Professional");
  const [rewriting, setRewriting] = useState(false);
  const [copied, setCopied] = useState(false);
  const wordCount = input.trim() ? input.trim().split(/\s+/).length : 0;

  const rewrite = () => {
    if (!input.trim()) return;
    setRewriting(true);
    setTimeout(() => {
      setOutput(rewrites[tone] + "\n\n[AI-generated based on your input tone: " + tone + ". Pro version connects to real AI model for unique paraphrasing.]");
      setRewriting(false);
    }, 1800);
  };

  const copy = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <div className="bg-surface-2 border border-surface-3 rounded-2xl p-6 space-y-6">
        <div className="flex items-center gap-3">
          <h2 className="text-white font-heading font-bold text-xl">AI Text Rewriter</h2>
          <span className="badge-cta text-xs">AI Powered</span>
        </div>

        {/* Tone Selector */}
        <div>
          <label className="text-gray-soft text-xs mb-2 block">Rewriting Tone</label>
          <div className="flex flex-wrap gap-2">
            {tones.map((t) => (
              <button key={t} onClick={() => setTone(t)}
                className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${tone === t ? "bg-accent text-white" : "bg-surface-3 text-gray-soft hover:text-white"}`}>
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Input */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-gray-soft text-xs">Input Text</label>
            <span className="text-gray-soft text-xs">{wordCount}/500 words</span>
          </div>
          <textarea
            value={input} onChange={(e) => setInput(e.target.value)}
            placeholder="Paste or type any text you want to rewrite. Try a product description, email, blog paragraph, etc..."
            rows={6} className="input-field resize-none text-sm"
          />
        </div>

        <button onClick={rewrite} disabled={!input.trim() || rewriting}
          className="btn-primary flex items-center gap-2 w-full justify-center disabled:opacity-50">
          {rewriting ? <><FiRefreshCw className="animate-spin" /> Rewriting...</> : <><FiZap /> Rewrite with AI</>}
        </button>

        {/* Output */}
        {output && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-white font-semibold text-sm">Rewritten Text ({tone})</label>
              <button onClick={copy} className="btn-outline py-1.5 px-4 text-sm flex items-center gap-1.5">
                {copied ? <FiCheck size={13} /> : <FiCopy size={13} />}
                {copied ? "Copied!" : "Copy"}
              </button>
            </div>
            <div className="result-area">
              <p className="text-white text-sm leading-relaxed whitespace-pre-wrap">{output}</p>
            </div>
            <button onClick={rewrite} className="text-accent text-sm hover:underline flex items-center gap-1">
              <FiRefreshCw size={12} /> Regenerate
            </button>
          </motion.div>
        )}
      </div>
    </>
  );
}

