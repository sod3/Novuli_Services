'use client';
import React, { useState, useRef } from "react";
import { getToolById } from "@/data/tools";
import { 
  FileImage, 
  Plus, 
  Trash2, 
  Download, 
  GripVertical, 
  FileText, 
  Settings, 
  Layout, 
  Maximize, 
  Layers,
  Loader2,
  CheckCircle2
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { jsPDF } from "jspdf";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  rectSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { restrictToWindowEdges } from "@dnd-kit/modifiers";


const PAGE_SIZES = {
  a4: { name: "A4", width: 210, height: 297 },
  letter: { name: "Letter", width: 215.9, height: 279.4 },
  auto: { name: "Auto (Fit Content)", width: null, height: null },
};

const MARGINS = {
  none: { name: "No Margin", value: 0 },
  small: { name: "Small", value: 5 },
  medium: { name: "Medium", value: 12 },
  large: { name: "Large", value: 25 },
};

// --- Sortable Item Component ---
function SortableImage({ fileItem, onRemove }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id: fileItem.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 50 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`group relative aspect-[3/4] bg-bg-gray rounded-2xl border-2 transition-all duration-300 overflow-hidden ${
        isDragging ? "border-accent shadow-2xl scale-105" : "border-border-light hover:border-accent/40"
      }`}
    >
      <img
        src={fileItem.preview}
        alt="preview"
        className="w-full h-full object-cover select-none"
      />
      
      {/* Drag Handle Overlay */}
      <div 
        {...attributes} 
        {...listeners}
        className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors cursor-grab active:cursor-grabbing flex items-start justify-end p-2"
      >
        <div className="bg-white/90 backdrop-blur-sm p-1.5 rounded-lg shadow-sm opacity-0 group-hover:opacity-100 transition-opacity">
          <GripVertical size={16} className="text-secondary" />
        </div>
      </div>

      {/* Remove Button */}
      <button
        onClick={() => onRemove(fileItem.id)}
        className="absolute bottom-2 right-2 bg-red-500 hover:bg-red-600 text-white p-2 rounded-xl shadow-lg opacity-0 group-hover:opacity-100 transition-all hover:scale-110 active:scale-95"
      >
        <Trash2 size={14} />
      </button>

      {/* File Info */}
      <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/60 to-transparent pointer-events-none">
        <p className="text-[10px] text-white font-medium truncate">{fileItem.name}</p>
      </div>
    </div>
  );
}

// --- Main Tool Component ---
export default function ImageToPDF() {
  const [files, setFiles] = useState([]);
  const [settings, setSettings] = useState({
    pageSize: "a4",
    orientation: "portrait",
    margin: "medium",
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [downloadUrl, setDownloadUrl] = useState(null);
  
  const fileInputRef = useRef(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const handleFileSelect = (e) => {
    const selectedFiles = Array.from(e.target.files);
    addFiles(selectedFiles);
  };

  const addFiles = (newFiles) => {
    const validFiles = newFiles.filter(f => f.type.startsWith("image/"));
    const fileItems = validFiles.map(file => ({
      id: Math.random().toString(36).substr(2, 9),
      file,
      name: file.name,
      preview: URL.createObjectURL(file)
    }));
    setFiles(prev => [...prev, ...fileItems]);
    setDownloadUrl(null);
  };

  const removeFile = (id) => {
    setFiles(prev => {
      const removed = prev.find(f => f.id === id);
      if (removed) URL.revokeObjectURL(removed.preview);
      return prev.filter(f => f.id !== id);
    });
    setDownloadUrl(null);
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      setFiles((items) => {
        const oldIndex = items.findIndex((i) => i.id === active.id);
        const newIndex = items.findIndex((i) => i.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
      setDownloadUrl(null);
    }
  };

  const generatePDF = async () => {
    if (files.length === 0) return;
    
    setIsProcessing(true);
    setProgress(0);
    
    try {
      const { pageSize, orientation, margin } = settings;
      const marginVal = MARGINS[margin].value;
      const isAuto = pageSize === "auto";
      
      // Initialize PDF
      const doc = new jsPDF({
        orientation: orientation,
        unit: "mm",
        format: isAuto ? "a4" : pageSize // a4 placeholder for auto, will change per page
      });

      for (let i = 0; i < files.length; i++) {
        const fileItem = files[i];
        
        // Load image to get dimensions
        const img = await loadImage(fileItem.preview);
        const imgAspectRatio = img.width / img.height;
        
        let pageWidth, pageHeight;
        
        if (isAuto) {
          // In Auto mode, the page size is the image size + margins
          // We convert px to mm (roughly 0.264583 mm per px at 96 DPI, but jsPDF uses point-based logic sometimes)
          // For simplicity and quality, we scale to fit a reasonable "Auto" size or just use the px directly
          // Let's assume 300DPI for "High Quality" -> 1 px = 25.4/300 mm
          const pxToMm = 25.4 / 96; // Standard screen DPI
          pageWidth = (img.width * pxToMm) + (marginVal * 2);
          pageHeight = (img.height * pxToMm) + (marginVal * 2);
        } else {
          pageWidth = PAGE_SIZES[pageSize].width;
          pageHeight = PAGE_SIZES[pageSize].height;
          if (orientation === "landscape") {
            [pageWidth, pageHeight] = [pageHeight, pageWidth];
          }
        }

        if (i > 0) {
          doc.addPage([pageWidth, pageHeight], orientation);
        } else if (isAuto) {
          // Adjust first page for Auto
          doc.deletePage(1);
          doc.addPage([pageWidth, pageHeight], orientation);
        }

        const availableWidth = pageWidth - (marginVal * 2);
        const availableHeight = pageHeight - (marginVal * 2);
        
        let finalWidth, finalHeight;
        
        // Fit image within available space maintaining aspect ratio
        if (availableWidth / availableHeight > imgAspectRatio) {
          finalHeight = availableHeight;
          finalWidth = finalHeight * imgAspectRatio;
        } else {
          finalWidth = availableWidth;
          finalHeight = finalWidth / imgAspectRatio;
        }

        const x = (pageWidth - finalWidth) / 2;
        const y = (pageHeight - finalHeight) / 2;

        // Add image to PDF
        // Using 'JPEG' and high quality. We can also use Canvas to get better control if needed.
        doc.addImage(img, 'JPEG', x, y, finalWidth, finalHeight, undefined, 'FAST');
        
        setProgress(Math.round(((i + 1) / files.length) * 100));
      }

      const blob = doc.output('blob');
      const url = URL.createObjectURL(blob);
      setDownloadUrl(url);
    } catch (error) {
      console.error("PDF Generation failed:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  const loadImage = (src) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = src;
    });
  };

  const downloadPDF = () => {
    if (!downloadUrl) return;
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = `NovuliServices_Export_${new Date().getTime()}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      <div className="flex flex-col gap-8">
        
        {/* Step 1: Upload / Empty State */}
        {files.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center border-3 border-dashed border-border-light rounded-[3rem] p-16 md:p-24 bg-bg-gray/30 hover:bg-bg-gray/50 hover:border-accent/40 transition-all cursor-pointer group"
            onClick={() => fileInputRef.current?.click()}
          >
            <input 
              type="file" 
              multiple 
              className="hidden" 
              ref={fileInputRef} 
              onChange={handleFileSelect}
              accept="image/*"
            />
            <div className="w-24 h-24 bg-white rounded-[2rem] shadow-xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500">
              <FileImage size={42} className="text-accent" />
            </div>
            <h3 className="text-2xl md:text-3xl font-display font-bold text-primary mb-4 text-center">
              Drop images or click to upload
            </h3>
            <p className="text-secondary text-lg font-light text-center max-w-sm">
              Support JPG, PNG, and WEBP. High-resolution processing guaranteed.
            </p>
            <button className="mt-10 bg-primary text-white px-10 py-4 rounded-2xl font-bold flex items-center gap-3 hover:bg-accent transition-colors shadow-lg active:scale-95">
              <Plus size={20} /> Select Files
            </button>
          </motion.div>
        ) : (
          <div className="space-y-8">
            {/* Control Bar */}
            <div className="bg-white border-2 border-border-light rounded-3xl p-4 flex flex-wrap items-center justify-between gap-4 shadow-sm relative z-20">
              <div className="flex items-center gap-6">
                 <button 
                  onClick={() => fileInputRef.current?.click()}
                  className="flex items-center gap-2 text-sm font-bold text-accent hover:bg-accent/5 px-4 py-2 rounded-xl transition-all"
                >
                  <Plus size={16} /> Add More
                  <input type="file" multiple className="hidden" ref={fileInputRef} onChange={handleFileSelect} accept="image/*" />
                </button>
                <div className="h-6 w-px bg-border-light hidden md:block" />
                <span className="text-sm font-medium text-secondary hidden md:block">
                  {files.length} Image{files.length !== 1 ? "s" : ""}
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                {/* Page Size */}
                <div className="flex items-center gap-2 bg-bg-gray p-1 rounded-2xl border border-border-light">
                  <div className="p-2 text-secondary"><FileText size={16} /></div>
                  <select 
                    value={settings.pageSize}
                    onChange={(e) => { setSettings(s => ({...s, pageSize: e.target.value})); setDownloadUrl(null); }}
                    className="bg-transparent border-none text-sm font-bold text-primary focus:ring-0 pr-8 cursor-pointer"
                  >
                    {Object.entries(PAGE_SIZES).map(([id, meta]) => (
                      <option key={id} value={id}>{meta.name}</option>
                    ))}
                  </select>
                </div>

                {/* Orientation */}
                <div className="flex items-center gap-2 bg-bg-gray p-1 rounded-2xl border border-border-light">
                  <div className="p-2 text-secondary"><Layout size={16} /></div>
                  <select 
                    value={settings.orientation}
                    onChange={(e) => { setSettings(s => ({...s, orientation: e.target.value})); setDownloadUrl(null); }}
                    className="bg-transparent border-none text-sm font-bold text-primary focus:ring-0 pr-8 cursor-pointer"
                    disabled={settings.pageSize === "auto"}
                  >
                    <option value="portrait">Portrait</option>
                    <option value="landscape">Landscape</option>
                  </select>
                </div>

                {/* Margin */}
                <div className="flex items-center gap-2 bg-bg-gray p-1 rounded-2xl border border-border-light">
                  <div className="p-2 text-secondary"><Maximize size={16} /></div>
                  <select 
                    value={settings.margin}
                    onChange={(e) => { setSettings(s => ({...s, margin: e.target.value})); setDownloadUrl(null); }}
                    className="bg-transparent border-none text-sm font-bold text-primary focus:ring-0 pr-8 cursor-pointer"
                  >
                    {Object.entries(MARGINS).map(([id, meta]) => (
                      <option key={id} value={id}>{meta.name}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Grid Container */}
            <div className="bg-bg-gray/20 border-2 border-border-light rounded-[3rem] p-8 min-h-[400px]">
              <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
                modifiers={[restrictToWindowEdges]}
              >
                <SortableContext items={files.map(f => f.id)} strategy={rectSortingStrategy}>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    <AnimatePresence>
                      {files.map((fileItem) => (
                        <motion.div
                          key={fileItem.id}
                          layout
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                        >
                          <SortableImage 
                            fileItem={fileItem} 
                            onRemove={removeFile}
                          />
                        </motion.div>
                      ))}
                    </AnimatePresence>
                    
                    {/* Add Button in Grid */}
                    <button 
                      onClick={() => fileInputRef.current?.click()}
                      className="aspect-[3/4] rounded-2xl border-2 border-dashed border-border-light flex flex-col items-center justify-center gap-3 hover:border-accent group transition-all bg-white hover:bg-bg-gray/30"
                    >
                      <div className="w-12 h-12 rounded-full bg-bg-gray flex items-center justify-center group-hover:bg-accent group-hover:text-white transition-all duration-300">
                        <Plus size={24} />
                      </div>
                      <span className="text-xs font-bold text-secondary uppercase tracking-widest">Add Image</span>
                    </button>
                  </div>
                </SortableContext>
              </DndContext>
            </div>

            {/* Actions Bar */}
            <div className="flex flex-col md:flex-row items-center justify-center gap-6 pt-4">
              {downloadUrl ? (
                <div className="flex flex-col items-center gap-6 w-full max-w-xl">
                  <motion.div 
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="w-full bg-green-50 border border-green-200 rounded-3xl p-6 flex items-center gap-4 shadow-sm"
                  >
                    <div className="w-12 h-12 bg-green-500 text-white rounded-2xl flex items-center justify-center flex-shrink-0">
                      <CheckCircle2 size={24} />
                    </div>
                    <div>
                      <p className="text-green-800 font-bold">PDF Successfully Created!</p>
                      <p className="text-green-600/80 text-sm italic">High quality, ready for download.</p>
                    </div>
                  </motion.div>
                  
                  <div className="flex gap-4 w-full">
                    <button 
                      onClick={downloadPDF}
                      className="flex-1 bg-accent text-white h-16 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 shadow-xl hover:scale-105 active:scale-95 transition-all"
                    >
                      <Download size={24} /> Download PDF
                    </button>
                    <button 
                      onClick={() => setDownloadUrl(null)}
                      className="bg-white border-2 border-border-light text-primary px-8 rounded-2xl font-bold hover:bg-bg-gray transition-colors"
                    >
                      Reset
                    </button>
                  </div>
                </div>
              ) : (
                <button 
                  onClick={generatePDF}
                  disabled={isProcessing}
                  className="w-full max-w-md bg-primary text-white h-16 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 relative overflow-hidden group disabled:opacity-70 disabled:cursor-not-allowed transition-all"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 size={24} className="animate-spin" />
                      Processing {progress}%
                      <div className="absolute bottom-0 left-0 h-1 bg-accent transition-all duration-300" style={{ width: `${progress}%` }} />
                    </>
                  ) : (
                    <>
                      <Layers size={22} />
                      Generate Professional PDF
                    </>
                  )}
                  <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                </button>
              )}
            </div>
            
            {/* Extra Info */}
            <div className="flex flex-wrap items-center justify-center gap-8 py-6 opacity-60 grayscale hover:grayscale-0 transition-all">
               <div className="flex items-center gap-2 text-[10px] font-bold text-secondary uppercase tracking-[0.2em]">
                <Settings size={12} className="text-accent" /> 300 DPI Processing
              </div>
               <div className="flex items-center gap-2 text-[10px] font-bold text-secondary uppercase tracking-[0.2em]">
                <Layers size={12} className="text-blue-500" /> Multiple Formats
              </div>
              <div className="flex items-center gap-2 text-[10px] font-bold text-secondary uppercase tracking-[0.2em]">
                <Plus size={12} className="text-green-500" /> Auto-Fit System
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Global CSS for some refinements */}
      <style dangerouslySetInnerHTML={{ __html: `
        select {
          -webkit-appearance: none;
          -moz-appearance: none;
          appearance: none;
          background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
          background-repeat: no-repeat;
          background-position: right 0.75rem center;
          background-size: 1rem;
        }
      `}} />
    </>
  );
}

