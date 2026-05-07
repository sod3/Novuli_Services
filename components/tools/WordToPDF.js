'use client';
import React, { useState, useRef } from "react";
import { getToolById } from "@/data/tools";
import { 
  FileText, 
  Upload, 
  Download, 
  CheckCircle2, 
  AlertCircle, 
  Loader2,
  FileCode,
  ShieldCheck,
  Type,
  Layout as LayoutIcon,
  Zap
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import * as docx from "docx-preview";
import { jsPDF } from "jspdf";


export default function WordToPDF() {
  const [file, setFile] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState("");
  const [error, setError] = useState(null);
  const [downloadUrl, setDownloadUrl] = useState(null);
  
  const fileInputRef = useRef(null);
  const renderContainerRef = useRef(null);

  const handleFileSelect = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && (selectedFile.name.endsWith(".docx") || selectedFile.name.endsWith(".doc"))) {
      if (selectedFile.name.endsWith(".doc")) {
          setError("Old .doc format has limited support. Please use .docx for best results.");
      } else {
          setError(null);
      }
      setFile(selectedFile);
      setDownloadUrl(null);
    } else {
      setError("Please upload a valid Word document (.docx).");
    }
  };

  const reset = () => {
    setFile(null);
    setDownloadUrl(null);
    setProgress(0);
    setStatus("");
    setError(null);
  };

  const convertToPDF = async () => {
    if (!file) return;

    setIsProcessing(true);
    setProgress(10);
    setStatus("Reading document hierarchy...");
    setError(null);

    try {
      const arrayBuffer = await file.arrayBuffer();
      
      // Step 1: Render DOCX to hidden HTML container
      setStatus("Rendering document layers...");
      setProgress(30);
      
      const container = renderContainerRef.current;
      container.innerHTML = ""; // Clear previous
      
      await docx.renderAsync(arrayBuffer, container, null, {
        className: "docx-preview",
        inWrapper: false,
        ignoreLastRenderedPageBreak: false,
      });

      // Step 2: Capture HTML to PDF
      setStatus("Capturing visual layout...");
      setProgress(60);

      // We wait a bit for images to load in the rendered HTML if any
      await new Promise(r => setTimeout(r, 1000));

      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "pt",
        format: "a4",
        compress: true
      });

      // Using jspdf .html() method which uses html2canvas internally
      // We set width to standard A4 width in points (595.28)
      await pdf.html(container, {
        callback: function (doc) {
          setProgress(100);
          setStatus("PDF Ready!");
          const blob = doc.output("blob");
          const url = URL.createObjectURL(blob);
          setDownloadUrl(url);
          setIsProcessing(false);
        },
        x: 0,
        y: 0,
        width: 595.28, // A4 width
        windowWidth: 595.28 * 1.5, // Buffer for better rendering resolution
        html2canvas: {
          scale: 2, // Higher quality
          useCORS: true,
          logging: false,
          letterRendering: true
        }
      });

    } catch (err) {
      console.error(err);
      setError("Failed to convert document. Please ensure it's a valid .docx file.");
      setIsProcessing(false);
    }
  };

  const download = () => {
    if (!downloadUrl) return;
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = `NovuliServices_${file.name.replace(/\.[^/.]+$/, "")}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      <div className="flex flex-col gap-10">
        
        {/* Render Container (Hidden) */}
        <div 
          ref={renderContainerRef} 
          style={{ 
            position: "absolute", 
            left: "-9999px", 
            top: 0, 
            width: "595.28pt", // Standard A4 points
            background: "white" 
          }} 
        />

        {/* Progress Tracker */}
        {isProcessing && (
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="bg-primary/5 rounded-[2rem] p-8 border border-accent/10">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm">
                  <Loader2 className="text-accent animate-spin" size={24} />
                </div>
                <div>
                  <h4 className="text-primary font-bold text-lg leading-tight">{status}</h4>
                  <p className="text-secondary text-sm font-light">Optimizing {file?.name}</p>
                </div>
              </div>
              <div className="text-right font-display font-black text-3xl text-primary">{progress}%</div>
            </div>
            <div className="w-full h-3 bg-white rounded-full overflow-hidden border border-border-light text-primary">
              <motion.div 
                className="h-full bg-accent" 
                initial={{ width: 0 }} 
                animate={{ width: `${progress}%` }} 
                transition={{ duration: 0.5 }}
              />
            </div>
          </motion.div>
        )}

        {/* Main Interface */}
        {!file ? (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center border-4 border-dashed border-border-light rounded-[3rem] p-16 md:p-32 bg-bg-gray/20 hover:bg-white hover:border-accent/40 transition-all cursor-pointer group"
            onClick={() => fileInputRef.current?.click()}
          >
            <input 
              type="file" 
              className="hidden" 
              ref={fileInputRef} 
              onChange={handleFileSelect}
              accept=".docx,.doc"
            />
            <div className="w-24 h-24 bg-white rounded-[2.5rem] shadow-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-700">
              <FileCode size={42} className="text-accent" />
            </div>
            <h3 className="text-3xl md:text-4xl font-display font-bold text-primary mb-6 text-center">
               Convert Word to PDF
            </h3>
            <p className="text-secondary text-xl font-light text-center max-w-md mx-auto mb-10">
              High-fidelity conversion that preserves tables, images, and formatting exactly.
            </p>
            <button className="bg-primary text-white px-10 py-5 rounded-2xl font-bold text-lg flex items-center gap-3 hover:bg-accent shadow-xl">
              <Upload size={22} /> Select Word File
            </button>
          </motion.div>
        ) : (
          <AnimatePresence mode="wait">
            {!downloadUrl ? (
              <motion.div 
                key="preview"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white border-2 border-border-light rounded-[3rem] p-10 md:p-16 shadow-2xl text-center text-primary"
              >
                <div className="w-20 h-24 bg-blue-50 rounded-xl flex flex-col items-center justify-end p-2 mx-auto mb-8 border-2 border-blue-100 shadow-sm">
                  <FileText className="text-blue-500 mb-2" size={32} />
                  <span className="text-[10px] font-black text-blue-500 uppercase tracking-widest leading-none">DOCX</span>
                </div>
                <h3 className="text-2xl font-display font-bold text-primary mb-2 max-w-sm mx-auto whitespace-normal break-all">
                  {file.name}
                </h3>
                <p className="text-secondary text-sm font-light mb-12">
                  {(file.size / 1024 / 1024).toFixed(2)} MB • Ready to transform
                </p>

                {error && (
                  <div className="bg-orange-50 text-orange-700 p-4 rounded-xl mb-8 flex items-center justify-center gap-2 font-medium border border-orange-100 text-sm">
                    <AlertCircle size={16} /> {error}
                  </div>
                )}

                <div className="flex flex-col md:flex-row gap-4 justify-center">
                  <button 
                    onClick={convertToPDF}
                    disabled={isProcessing}
                    className="bg-accent text-white px-12 py-5 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 hover:bg-blue-600 shadow-xl shadow-blue-200 active:scale-95 transition-all disabled:opacity-50"
                  >
                    {isProcessing ? (
                      <>
                        <Loader2 className="animate-spin" size={20} />
                        Processing...
                      </>
                    ) : (
                      <>
                        <Zap size={20} />
                        Convert to PDF
                      </>
                    )}
                  </button>
                  <button 
                    onClick={reset}
                    disabled={isProcessing}
                    className="bg-bg-gray text-primary px-12 py-5 rounded-2xl font-bold text-lg hover:bg-gray-200 transition-all disabled:opacity-50 font-display"
                  >
                    Cancel
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.div 
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white border-2 border-green-100 rounded-[3rem] p-10 md:p-16 shadow-2xl text-center text-primary"
              >
                <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-10 text-green-500 border-4 border-green-100">
                  <CheckCircle2 size={48} />
                </div>
                <h3 className="text-3xl font-display font-bold text-primary mb-4">PDF Generated Successfully!</h3>
                <p className="text-secondary text-lg font-light mb-12">
                  Your document has been transformed with perfect formatting.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-xl mx-auto">
                   <button 
                    onClick={download}
                    className="bg-accent text-white h-16 rounded-2xl font-bold flex items-center justify-center gap-3 hover:scale-105 transition-all shadow-xl shadow-blue-200"
                  >
                    <Download size={20} /> Download PDF File
                  </button>
                  <button 
                    onClick={reset}
                    className="bg-bg-gray text-primary h-16 rounded-2xl font-bold hover:bg-gray-200 transition-all font-display"
                  >
                    Another File
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        )}

        {/* Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-primary">
          {[
            { icon: LayoutIcon, title: "Fidelity Core", desc: "Preserves nested tables, complex margins, and indentation." },
            { icon: ShieldCheck, title: "Secure Rendering", desc: "100% in-browser processing via high-performance engines." },
            { icon: Type, title: "Font Intelligence", desc: "Maps standard and custom fonts to high-quality PDF paths." }
          ].map((feature, i) => (
            <div key={i} className="bg-white p-8 rounded-[2rem] border border-border-light shadow-sm">
              <feature.icon className="text-accent mb-4" size={24} />
              <h4 className="text-primary font-bold mb-2">{feature.title}</h4>
              <p className="text-secondary text-sm font-light leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>

      </div>
    </>
  );
}

