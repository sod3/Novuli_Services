'use client';
import React from "react";
import { motion } from "framer-motion";
import Link from 'next/link';
import { FiHome, FiActivity } from "react-icons/fi";
import { tools } from "@/data/tools";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-bg-gray">
      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        className="text-center max-w-lg bg-white p-12 rounded-[3rem] border border-border-light shadow-2xl shadow-blue-900/[0.03]"
      >
        <div className="text-8xl mb-6 grayscale brightness-110">🛰️</div>
        <h1 className="text-6xl font-display font-black text-primary mb-4 tracking-tighter">404</h1>
        <p className="text-2xl font-bold text-primary mb-3">Houston, we have a problem.</p>
        <p className="text-secondary text-lg mb-10 font-light">The page you're looking for has drifted out of orbit. Let's get you back to safety.</p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Link href="/" className="btn-primary flex items-center gap-2 justify-center">
            <FiHome /> Back to Home
          </Link>
          <Link href="/tools" className="btn-secondary flex items-center gap-2 justify-center">
            <FiActivity /> Explore Tools
          </Link>
        </div>

        <div className="pt-8 border-t border-border-light">
          <p className="text-secondary text-xs font-bold uppercase tracking-[0.2em] mb-6">Popular Safety Zones</p>
          <div className="flex flex-wrap gap-2 justify-center">
            {tools.slice(0, 6).map((t) => (
              <Link key={t.id} href={t.slug}
                className="bg-bg-gray border border-border-light hover:border-accent/40 text-secondary hover:text-accent text-[10px] font-bold uppercase tracking-widest px-4 py-2 rounded-xl transition-all">
                {t.name}
              </Link>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
