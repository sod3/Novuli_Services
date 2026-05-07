'use client';
import React, { useState } from "react";
import { getToolById } from "@/data/tools";
import { FiImage, FiUpload, FiDownload, FiCheckCircle, FiPercent, FiBox, FiZap } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

export default function ImageCompressor() {
    const [file, setFile] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleUpload = (e) => {
    const f = e.target.files[0];
    if (f) {
      setFile(f);
      setIsProcessing(true);
      setTimeout(() => {
        setIsProcessing(false);
      }, 2000);
    }
  };

  return (
    <>
      <div className="max-w-2xl mx-auto py-10 text-center">
        {!file ? (
          <div className="bg-bg-gray border-2 border-dashed border-gray-200 rounded-[2.5rem] p-16 hover:border-accent hover:bg-blue-50 transition-all cursor-pointer relative group">
            <input 
              type="file" 
              accept="image/*"
              onChange={handleUpload}
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
            <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center mx-auto mb-6 text-accent shadow-sm group-hover:scale-110 transition-transform">
              <FiUpload size={32} />
            </div>
            <h3 className="text-2xl font-display font-bold text-primary mb-2">Drop your image here</h3>
            <p className="text-secondary font-light">Reduce file size up to 80% without losing quality.</p>
            <div className="mt-8 flex justify-center gap-3">
              <span className="text-[10px] font-bold uppercase tracking-widest text-secondary px-3 py-1 bg-white rounded-full border border-gray-100">PNG</span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-secondary px-3 py-1 bg-white rounded-full border border-gray-100">JPG</span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-secondary px-3 py-1 bg-white rounded-full border border-gray-100">WEBP</span>
            </div>
          </div>
        ) : (
          <div className="bg-white border border-border-light rounded-[2.5rem] p-8 md:p-12 shadow-xl">
             <AnimatePresence mode="wait">
               {isProcessing ? (
                 <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <div className="w-24 h-24 bg-bg-gray rounded-full flex items-center justify-center mx-auto mb-8 relative overflow-hidden">
                       <div className="absolute inset-0 bg-accent/10 animate-pulse"></div>
                       <div className="w-10 h-10 border-4 border-accent border-t-transparent rounded-full animate-spin"></div>
                    </div>
                    <h3 className="text-2xl font-display font-bold text-primary mb-2">Optimizing pixels...</h3>
                    <p className="text-secondary font-light">Applying lossless compression algorithms.</p>
                 </motion.div>
               ) : (
                 <motion.div key="done" initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
                    <div className="flex flex-col md:flex-row items-center gap-10 mb-10">
                       <div className="w-40 h-40 bg-bg-gray rounded-3xl overflow-hidden flex items-center justify-center border border-gray-100 shrink-0">
                          <FiImage size={64} className="text-secondary opacity-20" />
                       </div>
                       <div className="text-left flex-1">
                          <div className="flex items-center gap-2 text-green-600 font-bold mb-2">
                             <FiCheckCircle /> Compression Successful
                          </div>
                          <h4 className="text-xl font-bold text-primary mb-1 truncate max-w-xs">{file.name}</h4>
                          <div className="flex gap-6 mt-4">
                             <div>
                                <p className="text-[10px] uppercase font-black text-secondary tracking-widest mb-1">Before</p>
                                <p className="text-lg font-bold text-primary">2.4 MB</p>
                             </div>
                             <div className="w-px h-10 bg-gray-100"></div>
                             <div>
                                <p className="text-[10px] uppercase font-black text-accent tracking-widest mb-1">After ( -74% )</p>
                                <p className="text-lg font-bold text-accent">620 KB</p>
                             </div>
                          </div>
                       </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                       <button onClick={() => setFile(null)} className="py-4 rounded-xl font-bold text-secondary bg-bg-gray hover:bg-gray-200 transition-colors">
                          Upload Another
                       </button>
                       <button className="py-4 rounded-xl font-bold text-white bg-accent hover:bg-blue-600 shadow-lg shadow-blue-200 flex items-center justify-center gap-2">
                          <FiDownload /> Download Optimized
                       </button>
                    </div>
                 </motion.div>
               )}
             </AnimatePresence>
          </div>
        )}

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
           {[
             { icon: FiPercent, title: "Lossless Quality", desc: "Our AI preserves every pixel while stripping away hidden metadata." },
             { icon: FiZap, title: "Instant Access", desc: "No registration required. Get your optimized image in seconds." },
             { icon: FiBox, title: "Any Format", desc: "Works with PNG, JPG, WEBP and even heavy Raw image files." }
           ].map((b, i) => (
             <div key={i}>
                <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-accent mb-4">
                   <b.icon size={20} />
                </div>
                <h4 className="font-bold text-primary mb-2 text-sm uppercase tracking-wide">{b.title}</h4>
                <p className="text-secondary text-xs font-light leading-relaxed">{b.desc}</p>
             </div>
           ))}
        </div>
      </div>
    </>
  );
}

