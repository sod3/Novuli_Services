'use client';
import React, { useState } from "react";
import { getToolById } from "@/data/tools";
import QRCode from "qrcode";
import { FiDownload, FiCopy, FiRefreshCw } from "react-icons/fi";
import { motion } from "framer-motion";


const faqs = [
  { question: "Is this QR code generator free?", answer: "Yes, 100% free with no limits. Generate as many QR codes as you need." },
  { question: "What types of QR codes can I create?", answer: "URL, plain text, email, phone, WiFi credentials, and vCard contact formats." },
  { question: "Will the QR code expire?", answer: "No. Static QR codes never expire. They work as long as the destination URL is live." },
  { question: "Can I customize the QR code color?", answer: "Yes, you can change foreground and background colors in Pro mode." },
];

const steps = [
  { title: "Enter Content", desc: "Type your URL, text, or any content into the input box." },
  { title: "Customize", desc: "Choose size, color and format options to match your brand." },
  { title: "Download", desc: "Click download to save your QR code as PNG or SVG." },
];

const qrTypes = ["URL", "Text", "Email", "Phone", "WiFi"];

export default function QRCodeGenerator() {
  const [input, setInput] = useState("https://novulisurvices.com");
  const [qrType, setQrType] = useState("URL");
  const [qrSrc, setQrSrc] = useState(null);
  const [generating, setGenerating] = useState(false);
  const [copied, setCopied] = useState(false);
  const [size, setSize] = useState(300);
  const [fgColor, setFgColor] = useState("#0F172A");
  const [bgColor, setBgColor] = useState("#FFFFFF");

  const generate = async () => {
    if (!input.trim()) return;
    setGenerating(true);
    try {
      const url = await QRCode.toDataURL(input, {
        width: size,
        margin: 2,
        color: { dark: fgColor, light: bgColor },
      });
      setQrSrc(url);
    } catch (e) {}
    setGenerating(false);
  };

  const download = () => {
    if (!qrSrc) return;
    const a = document.createElement("a");
    a.href = qrSrc;
    a.download = "qrcode-novuliservices.png";
    a.click();
  };

  const copy = async () => {
    if (!qrSrc) return;
    const blob = await (await fetch(qrSrc)).blob();
    await navigator.clipboard.write([new ClipboardItem({ "image/png": blob })]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <div className="bg-surface-2 border border-surface-3 rounded-2xl p-6 space-y-6">
        <h2 className="text-white font-heading font-bold text-xl">QR Code Generator</h2>

        {/* Type tabs */}
        <div className="flex flex-wrap gap-2">
          {qrTypes.map((type) => (
            <button
              key={type}
              onClick={() => setQrType(type)}
              className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${
                qrType === type ? "bg-accent text-white" : "bg-surface-3 text-gray-soft hover:text-white"
              }`}
            >
              {type}
            </button>
          ))}
        </div>

        {/* Input */}
        <div>
          <label className="text-gray-soft text-sm mb-2 block">
            {qrType === "URL" ? "Enter URL" : qrType === "Email" ? "Enter Email" : qrType === "Phone" ? "Enter Phone" : "Enter Content"}
          </label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={qrType === "URL" ? "https://example.com" : "Enter your content..."}
            rows={3}
            className="input-field resize-none"
          />
        </div>

        {/* Options */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          <div>
            <label className="text-gray-soft text-xs mb-1.5 block">Size: {size}px</label>
            <input type="range" min={150} max={500} value={size} onChange={(e) => setSize(+e.target.value)}
              className="w-full accent-accent" />
          </div>
          <div>
            <label className="text-gray-soft text-xs mb-1.5 block">Foreground</label>
            <input type="color" value={fgColor} onChange={(e) => setFgColor(e.target.value)}
              className="w-full h-9 rounded-lg border border-surface-3 cursor-pointer bg-surface-3" />
          </div>
          <div>
            <label className="text-gray-soft text-xs mb-1.5 block">Background</label>
            <input type="color" value={bgColor} onChange={(e) => setBgColor(e.target.value)}
              className="w-full h-9 rounded-lg border border-surface-3 cursor-pointer bg-surface-3" />
          </div>
        </div>

        <button onClick={generate} disabled={generating || !input.trim()}
          className="btn-primary flex items-center gap-2 w-full justify-center">
          {generating ? <FiRefreshCw className="animate-spin" /> : <FiRefreshCw />}
          {generating ? "Generating..." : "Generate QR Code"}
        </button>

        {/* QR Result */}
        {qrSrc && (
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
            className="result-area flex flex-col items-center gap-4">
            <img src={qrSrc} alt="Generated QR Code" className="rounded-xl shadow-card" style={{ maxWidth: "250px" }} />
            <div className="flex gap-3">
              <button onClick={download} className="btn-cta flex items-center gap-2 text-sm py-2.5 px-5">
                <FiDownload size={15} /> Download PNG
              </button>
              <button onClick={copy} className="btn-outline flex items-center gap-2 text-sm py-2.5 px-5">
                <FiCopy size={15} /> {copied ? "Copied!" : "Copy"}
              </button>
            </div>
            <p className="text-gray-soft text-xs">✅ No watermark · Free forever</p>
          </motion.div>
        )}
      </div>
    </>
  );
}

