'use client';
import React, { useState, useRef } from "react";
import { getToolById } from "@/data/tools";
import { 
  Plus, 
  Download, 
  Trash2, 
  Image as ImageIcon, 
  Sparkles,
  Monitor,
  Smartphone,
  CheckCircle2,
  MoveHorizontal,
  AlertCircle,
  Zap,
  Eye,
  RefreshCw
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { removeBackground } from "@imgly/background-removal";


// --- Before/After Slider Component ---
function BeforeAfterSlider({ before, after }) {
  const [position, setPosition] = useState(50);
  const containerRef = useRef(null);

  const handleMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX || (e.touches && e.touches[0].clientX);
    if (!x) return;
    const scrollX = x - rect.left;
    const newPos = (scrollX / rect.width) * 100;
    setPosition(Math.min(Math.max(newPos, 0), 100));
  };

  return (
    <div 
      ref={containerRef}
      className="relative w-full aspect-video rounded-[2.5rem] overflow-hidden border-2 border-border-light cursor-col-resize select-none bg-white shadow-2xl"
      onMouseMove={handleMove}
      onTouchMove={handleMove}
    >
      {/* After Image (Background) */}
      <div 
        className="absolute inset-0 w-full h-full"
        style={{ background: "repeating-conic-gradient(#f0f0f0 0% 25%, #fff 25% 50%) 0 0 / 20px 20px" }}
      >
        <img src={after} alt="After" className="w-full h-full object-contain pointer-events-none" />
      </div>

      {/* Before Image (Foreground with Clip) */}
      <div 
        className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none"
        style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
      >
        <img src={before} alt="Before" className="w-full h-full object-contain pointer-events-none" />
      </div>

      {/* Slider Line & Handle */}
      <div 
        className="absolute inset-y-0 w-1 bg-white shadow-[0_0_10px_rgba(0,0,0,0.2)] flex items-center justify-center"
        style={{ left: `${position}%`, transform: "translateX(-50%)" }}
      >
        <div className="w-10 h-10 bg-white rounded-full shadow-xl border-4 border-accent flex items-center justify-center">
          <MoveHorizontal size={20} className="text-secondary" />
        </div>
      </div>

      {/* Labels */}
      <div className="absolute top-4 left-4 bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest text-secondary shadow-sm pointer-events-none border border-white">
        Original
      </div>
      <div className="absolute top-4 right-4 bg-accent/90 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest text-white shadow-sm pointer-events-none">
        Background Removed
      </div>
    </div>
  );
}

// --- Main Tool Component ---
export default function BackgroundRemover() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState("");
  const [error, setError] = useState(null);

  const fileInputRef = useRef(null);

  const handleFileSelect = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type.startsWith("image/")) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
      setResult(null);
      setError(null);
    }
  };

  const processImage = async () => {
    if (!file) return;

    setIsProcessing(true);
    setProgress(0);
    setStatus("Initializing AI Models...");
    setError(null);

    try {
      // Configuration to use official CDN for WASM and model files
      // This resolves the "publicPath" and ONNX runtime mismatch errors
      const config = {
        progress: (p, s) => {
          setProgress(Math.round(p * 100));
          if (p < 0.3) setStatus("Downloading Neural Network...");
          else if (p < 0.7) setStatus("Analyzing Scene & Subject...");
          else setStatus("Refining Edges...");
        },
        // Use absolute URL for locally hosted assets and specify model type
        // to match the versions available in our local resources.json
        publicPath: window.location.origin + "/assets/background-removal/", 
        model: 'medium',
      };

      const resultBlob = await removeBackground(file, config);

      const url = URL.createObjectURL(resultBlob);
      setResult(url);
      setProgress(100);
      setStatus("Perfectly Removed!");
    } catch (err) {
      console.error(err);
      setError("AI processing failed. Please try a different image.");
    } finally {
      setIsProcessing(false);
    }
  };

  const download = () => {
    if (!result) return;
    const link = document.createElement("a");
    link.href = result;
    link.download = `NovuliServices_NoBG_${new Date().getTime()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const reset = () => {
    setFile(null);
    setPreview(null);
    setResult(null);
    setError(null);
    setProgress(0);
  };

  return (
    <>
      <div className="flex flex-col gap-10">
        
        {/* Step 1: Interface Overlay */}
        {isProcessing && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-primary/5 rounded-[3rem] p-10 border border-accent/10">
            <div className="flex flex-col items-center gap-6 text-center">
              <div className="relative">
                <div className="w-24 h-24 bg-white rounded-[2rem] shadow-xl flex items-center justify-center animate-pulse">
                  <Sparkles size={36} className="text-accent" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-accent text-white rounded-full flex items-center justify-center shadow-lg">
                  <RefreshCw size={14} className="animate-spin" />
                </div>
              </div>
              <div>
                <h4 className="text-2xl font-display font-bold text-primary mb-1">{status}</h4>
                <p className="text-secondary text-sm font-light">Precision AI is working its magic...</p>
              </div>
              <div className="w-full max-w-sm">
                <div className="flex justify-between items-end mb-2">
                   <span className="text-[10px] font-bold text-secondary uppercase tracking-widest">Confidence Score: High</span>
                   <span className="text-primary font-black text-xl">{progress}%</span>
                </div>
                <div className="w-full h-3 bg-white rounded-full overflow-hidden border border-border-light shadow-inner">
                  <motion.div 
                    className="h-full bg-accent" 
                    initial={{ width: 0 }} 
                    animate={{ width: `${progress}%` }} 
                    transition={{ duration: 0.5 }}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {!isProcessing && !result && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex flex-col items-center justify-center border-4 border-dashed border-border-light rounded-[3rem] transition-all cursor-pointer group ${
              preview ? "p-10" : "p-16 md:p-32 bg-bg-gray/20 hover:bg-white hover:border-accent/40"
            }`}
            onClick={() => !preview && fileInputRef.current?.click()}
          >
            <input 
              type="file" 
              className="hidden" 
              ref={fileInputRef} 
              onChange={handleFileSelect}
              accept="image/*"
            />
            
            {preview ? (
              <div className="w-full flex flex-col items-center gap-8">
                <div className="relative group/preview w-full max-w-xl aspect-video rounded-[2.5rem] overflow-hidden border-2 border-border-light shadow-2xl bg-white">
                  <img src={preview} alt="Preview" className="w-full h-full object-contain" />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover/preview:opacity-100 transition-all flex items-center justify-center gap-4">
                    <button 
                      onClick={(e) => { e.stopPropagation(); fileInputRef.current?.click(); }}
                      className="bg-white/90 backdrop-blur-sm p-4 rounded-2xl text-primary font-bold flex items-center gap-2 hover:scale-105 transition-all shadow-xl"
                    >
                      <RefreshCw size={18} /> Change Photo
                    </button>
                    <button 
                      onClick={(e) => { e.stopPropagation(); reset(); }}
                      className="bg-red-500/90 backdrop-blur-sm p-4 rounded-2xl text-white font-bold flex items-center gap-2 hover:scale-105 transition-all shadow-xl"
                    >
                      <Trash2 size={18} /> Remove
                    </button>
                  </div>
                </div>

                {error && (
                  <div className="bg-red-50 text-red-600 px-6 py-3 rounded-2xl border border-red-100 flex items-center gap-2 font-medium animate-shake">
                    <AlertCircle size={18} /> {error}
                  </div>
                )}

                <button 
                  onClick={processImage}
                  className="bg-primary text-white px-12 py-5 rounded-2xl font-bold text-lg flex items-center gap-4 hover:bg-accent hover:scale-110 active:scale-95 transition-all shadow-2xl shadow-blue-900/10"
                >
                  <Sparkles size={22} /> Remove Background Now
                </button>
              </div>
            ) : (
              <>
                <div className="w-24 h-24 bg-white rounded-[2.5rem] shadow-2xl flex items-center justify-center mb-10 group-hover:scale-110 transition-transform duration-700">
                  <Plus className="text-secondary opacity-20 absolute scale-150 rotate-45" size={64} />
                  <ImageIcon size={42} className="text-accent relative z-10" />
                </div>
                <h3 className="text-3xl md:text-4xl font-display font-bold text-primary mb-6 text-center">
                   World-Class AI Background Removal
                </h3>
                <p className="text-secondary text-xl font-light text-center max-w-lg mx-auto mb-10">
                  Automatic, pixel-perfect results for people, products, and objects in seconds.
                </p>
                <button className="bg-primary text-white px-10 py-5 rounded-2xl font-bold text-lg flex items-center gap-3 hover:bg-accent shadow-xl hover:scale-105 transition-all">
                   Select High-Res Image
                </button>
              </>
            )}
          </motion.div>
        )}

        {/* Result Area */}
        {result && (
          <AnimatePresence>
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center gap-10"
            >
              <div className="w-full max-w-4xl">
                 <BeforeAfterSlider before={preview} after={result} />
              </div>

              <div className="flex flex-col md:flex-row items-center justify-center gap-6 w-full">
                <button 
                  onClick={download}
                  className="bg-accent text-white h-18 px-12 rounded-2xl font-bold text-xl flex items-center justify-center gap-3 hover:scale-105 active:scale-95 transition-all shadow-2xl shadow-blue-300 w-full md:w-auto"
                >
                  <Download size={24} /> Download HD PNG
                </button>
                <button 
                  onClick={reset}
                  className="bg-white border-2 border-border-light text-primary h-18 px-12 rounded-2xl font-bold text-xl hover:bg-bg-gray transition-all w-full md:w-auto"
                >
                  <RefreshCw size={20} className="mr-2" /> Start New
                </button>
              </div>

              <div className="flex gap-8 opacity-40 grayscale pointer-events-none pt-4">
                 <div className="flex items-center gap-2 text-[10px] font-black tracking-[0.2em] uppercase">
                    <CheckCircle2 size={12} /> Pro Masking
                 </div>
                 <div className="flex items-center gap-2 text-[10px] font-black tracking-[0.2em] uppercase">
                    <CheckCircle2 size={12} /> 4K Output
                 </div>
                 <div className="flex items-center gap-2 text-[10px] font-black tracking-[0.2em] uppercase">
                    <CheckCircle2 size={12} /> Hair Precision
                 </div>
              </div>
            </motion.div>
          </AnimatePresence>
        )}

        {/* Features Comparison */}
        {!isProcessing && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { icon: Eye, title: "Hair Logic", desc: "Advanced masking for flyaway hair and soft edges." },
              { icon: Smartphone, title: "Object Detection", desc: "Perfect for products, cars, and complex jewelry." },
              { icon: Monitor, title: "Desktop Quality", desc: "Exports high DPI transparent PNGs instantly." },
              { icon: Zap, title: "Instant AI", desc: "Trained on millions of images for precise results." }
            ].map((f, i) => (
              <div key={i} className="bg-white p-6 rounded-[2.5rem] border border-border-light shadow-sm hover:shadow-lg transition-shadow">
                 <div className="w-10 h-10 bg-bg-gray rounded-xl flex items-center justify-center mb-4 text-accent">
                    <f.icon size={18} />
                 </div>
                 <h4 className="text-primary font-bold text-sm mb-2">{f.title}</h4>
                 <p className="text-secondary text-[11px] leading-relaxed font-light">{f.desc}</p>
              </div>
            ))}
          </div>
        )}

      </div>
    </>
  );
}

