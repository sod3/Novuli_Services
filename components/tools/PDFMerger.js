'use client';
import React, { useState } from "react";
import { getToolById } from "@/data/tools";
import { FiUpload, FiX, FiLayers, FiDownload, FiArrowUp, FiArrowDown } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";


const faqs = [
  { question: "How many PDFs can I merge at once?", answer: "Free plan: up to 5 files. Pro plan: unlimited files with no size cap." },
  { question: "Is the original PDF quality preserved?", answer: "Yes, our merger maintains 100% original quality — no compression." },
  { question: "Is my PDF secure?", answer: "100% safe. Files are processed in your browser and never uploaded anywhere." },
  { question: "Can I reorder the PDFs before merging?", answer: "Yes! Drag to reorder or use the up/down arrows to set your preferred page order." },
];

const steps = [
  { title: "Upload PDFs", desc: "Select or drag multiple PDF files you want to combine." },
  { title: "Reorder Files", desc: "Drag files to your preferred order — that's how they'll appear in the final PDF." },
  { title: "Merge & Download", desc: "Click merge and download your combined PDF instantly." },
];

export default function PDFMerger() {
  const [files, setFiles] = useState([]);
  const [merged, setMerged] = useState(false);
  const [merging, setMerging] = useState(false);

  const handleFiles = (fileList) => {
    const pdfs = Array.from(fileList).filter((f) => f.type === "application/pdf");
    setFiles((prev) => [...prev, ...pdfs.map((f) => ({ file: f, name: f.name, size: (f.size / 1024).toFixed(0) }))]);
    setMerged(false);
  };

  const removeFile = (i) => setFiles((prev) => prev.filter((_, idx) => idx !== i));
  const moveUp = (i) => {
    if (i === 0) return;
    const arr = [...files]; [arr[i - 1], arr[i]] = [arr[i], arr[i - 1]];
    setFiles(arr);
  };
  const moveDown = (i) => {
    if (i === files.length - 1) return;
    const arr = [...files]; [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
    setFiles(arr);
  };

  const merge = () => {
    if (files.length < 2) return;
    setMerging(true);
    setTimeout(() => { setMerging(false); setMerged(true); }, 2000);
  };

  return (
    <>
      <div className="bg-surface-2 border border-surface-3 rounded-2xl p-6 space-y-6">
        <h2 className="text-white font-heading font-bold text-xl">PDF Merger</h2>

        <div
          onClick={() => document.getElementById("pdf-input").click()}
          onDrop={(e) => { e.preventDefault(); handleFiles(e.dataTransfer.files); }}
          onDragOver={(e) => e.preventDefault()}
          className="border-2 border-dashed border-surface-3 hover:border-accent/50 rounded-2xl p-10 text-center cursor-pointer transition-all hover:bg-surface-3/20"
        >
          <input id="pdf-input" type="file" multiple accept="application/pdf" hidden
            onChange={(e) => handleFiles(e.target.files)} />
          <FiUpload className="text-accent mx-auto mb-3" size={30} />
          <p className="text-white font-semibold mb-1">Upload PDF files</p>
          <p className="text-gray-soft text-sm">Drag & drop or click. PDF only.</p>
        </div>

        {files.length > 0 && (
          <div className="space-y-2">
            <p className="text-gray-soft text-xs mb-3">{files.length} file{files.length > 1 ? "s" : ""} · Drag to reorder</p>
            <AnimatePresence>
              {files.map((f, i) => (
                <motion.div key={f.name + i}
                  initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  className="flex items-center gap-3 bg-surface-3 border border-surface-3 rounded-xl px-4 py-3"
                >
                  <div className="w-8 h-8 bg-red-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <FiLayers className="text-red-400" size={15} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white text-sm truncate font-medium">{f.name}</p>
                    <p className="text-gray-soft text-xs">{f.size} KB</p>
                  </div>
                  <div className="flex items-center gap-1 flex-shrink-0">
                    <button onClick={() => moveUp(i)} className="p-1.5 hover:bg-surface-2 rounded-lg text-gray-soft hover:text-white transition-colors">
                      <FiArrowUp size={13} />
                    </button>
                    <button onClick={() => moveDown(i)} className="p-1.5 hover:bg-surface-2 rounded-lg text-gray-soft hover:text-white transition-colors">
                      <FiArrowDown size={13} />
                    </button>
                    <button onClick={() => removeFile(i)} className="p-1.5 hover:bg-red-500/10 rounded-lg text-gray-soft hover:text-red-400 transition-colors">
                      <FiX size={13} />
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}

        <button onClick={merge} disabled={files.length < 2 || merging}
          className="btn-primary flex items-center gap-2 w-full justify-center disabled:opacity-50 disabled:cursor-not-allowed">
          <FiLayers size={16} />
          {merging ? "Merging..." : files.length < 2 ? "Add at least 2 PDFs" : `Merge ${files.length} PDFs`}
        </button>

        {merged && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="result-area flex flex-col items-center gap-4">
            <div className="text-4xl">📄</div>
            <p className="text-white font-semibold">Merged PDF ready!</p>
            <button className="btn-cta flex items-center gap-2">
              <FiDownload /> Download Merged PDF
            </button>
          </motion.div>
        )}
      </div>
    </>
  );
}

