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
  FileSearch,
  Type,
  Layout as LayoutIcon,
  Table as TableIcon
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import * as pdfjs from "pdfjs-dist";
import { 
  Document, 
  Packer, 
  Paragraph, 
  TextRun, 
  Table, 
  TableRow, 
  TableCell, 
  WidthType,
  HeadingLevel
} from "docx";
import { saveAs } from "file-saver";

// Set PDF.js worker using unpkg (v5+ uses .mjs)
pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;


export default function PDFToWord() {
  const [file, setFile] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState("");
  const [error, setError] = useState(null);
  const [downloadBlob, setDownloadBlob] = useState(null);
  
  const fileInputRef = useRef(null);

  const handleFileSelect = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type === "application/pdf") {
      setFile(selectedFile);
      setError(null);
      setDownloadBlob(null);
    } else {
      setError("Please upload a valid PDF file.");
    }
  };

  const reset = () => {
    setFile(null);
    setDownloadBlob(null);
    setProgress(0);
    setStatus("");
    setError(null);
  };

  const convertToWord = async () => {
    if (!file) return;

    setIsProcessing(true);
    setProgress(10);
    setStatus("Reading PDF content...");
    setError(null);

    try {
      const arrayBuffer = await file.arrayBuffer();
      const loadingTask = pdfjs.getDocument({ data: arrayBuffer });
      const pdf = await loadingTask.promise;
      const numPages = pdf.numPages;
      
      const docSections = [];

      for (let i = 1; i <= numPages; i++) {
        setProgress(10 + Math.round((i / numPages) * 70));
        setStatus(`Analyzing Page ${i} of ${numPages}...`);
        
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        const items = textContent.items;

        if (items.length === 0) continue;

        // Group items into lines by Y-coordinate
        const lines = {};
        items.forEach(item => {
          const y = Math.round(item.transform[5]);
          if (!lines[y]) lines[y] = [];
          lines[y].push(item);
        });

        // Sort Y coordinates descending (top to bottom)
        const sortedY = Object.keys(lines).sort((a, b) => b - a);
        
        const pageParagraphs = [];
        let currentParagraphGroup = [];
        let lastY = null;

        for (const y of sortedY) {
          const lineItems = lines[y].sort((a, b) => a.transform[4] - b.transform[4]);
          
          // Heuristic: Check for tables (multiple segments with large gaps)
          const isTableLine = detectTableLine(lineItems);
          
          if (isTableLine) {
            if (currentParagraphGroup.length > 0) {
              pageParagraphs.push(createDocxParagraph(currentParagraphGroup));
              currentParagraphGroup = [];
            }
            pageParagraphs.push(createDocxTableFromLine(lineItems));
            lastY = null;
            continue;
          }

          const lineText = lineItems.map(item => item.str).join(" ");
          const fontSize = lineItems[0]?.height || 12;

          if (lastY !== null && Math.abs(lastY - y) > fontSize * 1.8) {
            if (currentParagraphGroup.length > 0) {
              pageParagraphs.push(createDocxParagraph(currentParagraphGroup));
              currentParagraphGroup = [];
            }
          }

          currentParagraphGroup.push({ text: lineText, size: fontSize });
          lastY = y;
        }

        if (currentParagraphGroup.length > 0) {
          pageParagraphs.push(createDocxParagraph(currentParagraphGroup));
        }

        docSections.push({
          children: pageParagraphs.flat(),
        });
      }

      setStatus("Polishing document...");
      setProgress(90);

      const doc = new Document({
        sections: docSections,
      });

      const blob = await Packer.toBlob(doc);
      setDownloadBlob(blob);
      setProgress(100);
      setStatus("Conversion Complete!");
    } catch (err) {
      console.error(err);
      setError("Failed to convert PDF. The file might be corrupted or protected.");
    } finally {
      setIsProcessing(false);
    }
  };

  const detectTableLine = (items) => {
    if (items.length < 2) return false;
    let gaps = 0;
    for (let i = 0; i < items.length - 1; i++) {
        const gap = items[i+1].transform[4] - (items[i].transform[4] + items[i].width);
        if (gap > 40) gaps++; 
    }
    return gaps >= 1;
  };

  const createDocxParagraph = (group) => {
    const avgSize = group.reduce((acc, curr) => acc + curr.size, 0) / group.length;
    let headingLevel = null;
    
    if (avgSize > 18) headingLevel = HeadingLevel.HEADING_1;
    else if (avgSize > 14) headingLevel = HeadingLevel.HEADING_2;

    return new Paragraph({
      heading: headingLevel,
      children: group.map(item => new TextRun({
        text: item.text + " ",
        size: Math.round(item.size * 2),
        bold: item.size > 13,
      })),
      spacing: { after: 200 },
    });
  };

  const createDocxTableFromLine = (items) => {
    return new Table({
      width: { size: 100, type: WidthType.PERCENTAGE },
      rows: [
        new TableRow({
          children: items.map(item => new TableCell({
            children: [new Paragraph({ text: item.str })],
          })),
        }),
      ],
    });
  };

  const download = () => {
    if (!downloadBlob) return;
    saveAs(downloadBlob, `NovuliServices_${file.name.replace(".pdf", "")}.docx`);
  };

  return (
    <>
      <div className="flex flex-col gap-10">
        
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
                  <p className="text-secondary text-sm font-light">Processing {file.name}</p>
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
              accept=".pdf"
            />
            <div className="w-24 h-24 bg-white rounded-[2.5rem] shadow-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-700">
              <Upload size={42} className="text-accent" />
            </div>
            <h3 className="text-3xl md:text-4xl font-display font-bold text-primary mb-6 text-center">
               Drop PDF to Convert
            </h3>
            <p className="text-secondary text-xl font-light text-center max-w-md mx-auto mb-10">
              Transform PDFs into fully editable Word documents instantly.
            </p>
            <button className="bg-primary text-white px-10 py-5 rounded-2xl font-bold text-lg flex items-center gap-3 hover:bg-accent hover:scale-105 active:scale-95 transition-all shadow-xl">
              <FileSearch size={22} /> Choose PDF File
            </button>
          </motion.div>
        ) : (
          <AnimatePresence mode="wait">
            {!downloadBlob ? (
              <motion.div 
                key="preview"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white border-2 border-border-light rounded-[3rem] p-10 md:p-16 shadow-2xl shadow-blue-900/[0.04] text-center"
              >
                <div className="w-20 h-24 bg-red-50 rounded-xl flex flex-col items-center justify-end p-2 mx-auto mb-8 border-2 border-red-100 shadow-sm text-primary">
                  <FileText className="text-red-500 mb-2" size={32} />
                  <span className="text-[10px] font-black text-red-500 uppercase tracking-widest">PDF</span>
                </div>
                <h3 className="text-2xl font-display font-bold text-primary mb-2 max-w-sm mx-auto whitespace-normal break-all">
                  {file.name}
                </h3>
                <p className="text-secondary text-sm font-light mb-12">
                  {(file.size / 1024 / 1024).toFixed(2)} MB • PDF Document
                </p>

                {error && (
                  <div className="bg-red-50 text-red-600 p-4 rounded-xl mb-8 flex items-center justify-center gap-2 font-medium">
                    <AlertCircle size={18} /> {error}
                  </div>
                )}

                <div className="flex flex-col md:flex-row gap-4 justify-center text-primary">
                  <button 
                    onClick={convertToWord}
                    disabled={isProcessing}
                    className="bg-accent text-white px-12 py-5 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 hover:bg-blue-600 shadow-xl shadow-blue-200 active:scale-95 transition-all disabled:opacity-50"
                  >
                    {isProcessing ? "Converting..." : "Start Conversion"}
                  </button>
                  <button 
                    onClick={reset}
                    disabled={isProcessing}
                    className="bg-bg-gray text-primary px-12 py-5 rounded-2xl font-bold text-lg hover:bg-gray-200 transition-all disabled:opacity-50"
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
                className="bg-white border-2 border-green-100 rounded-[3rem] p-10 md:p-16 shadow-2xl text-center"
              >
                <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-10 text-green-500 border-4 border-green-100">
                  <CheckCircle2 size={48} />
                </div>
                <h3 className="text-3xl font-display font-bold text-primary mb-4 text-primary">Ready for Download!</h3>
                <p className="text-secondary text-lg font-light mb-12">
                  Your document has been professionally converted to DOCX.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-xl mx-auto text-primary">
                   <button 
                    onClick={download}
                    className="bg-accent text-white h-16 rounded-2xl font-bold flex items-center justify-center gap-3 hover:scale-105 transition-all shadow-xl shadow-blue-200"
                  >
                    <Download size={20} /> Download Word File
                  </button>
                  <button 
                    onClick={reset}
                    className="bg-bg-gray text-primary h-16 rounded-2xl font-bold hover:bg-gray-200 transition-all"
                  >
                    New Conversion
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        )}

        {/* Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-primary">
          {[
            { icon: Type, title: "Editable Content", desc: "Extracts text as editable runs instead of static blocks." },
            { icon: LayoutIcon, title: "Spacing Logic", desc: "Reconstructs margins and alignment automatically." },
            { icon: TableIcon, title: "Smart Cells", desc: "Identifies column-based data and converts to tables." }
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

