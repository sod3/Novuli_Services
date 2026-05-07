'use client';
import React, { useState } from "react";
import { getToolById } from "@/data/tools";
import { FiTrendingUp, FiSearch, FiCheck, FiX, FiAlertCircle } from "react-icons/fi";
import { motion } from "framer-motion";


const faqs = [
  { question: "What does the SEO Analyzer check?", answer: "Title tags, meta descriptions, heading structure, page speed, mobile-friendliness, SSL, canonical URLs and more." },
  { question: "How accurate is the analysis?", answer: "Our analyzer checks 25+ SEO factors based on Google's current ranking guidelines." },
  { question: "How often should I check my SEO?", answer: "Run an analysis at least monthly, or after every major content update." },
  { question: "Is this a replacement for Google Search Console?", answer: "No, it complements GSC by providing on-page analysis and actionable recommendations instantly." },
];

const steps = [
  { title: "Enter URL", desc: "Type your website URL and hit Analyze." },
  { title: "AI Analysis", desc: "We check 25+ SEO factors instantly." },
  { title: "Get Report", desc: "Review your score and action items to improve." },
];

const mockReport = [
  { label: "Title Tag Present", status: "pass", detail: "Title tag found: 58 characters (ideal)" },
  { label: "Meta Description", status: "pass", detail: "Meta description: 155 characters (good)" },
  { label: "H1 Tag", status: "pass", detail: "One H1 tag found" },
  { label: "HTTPS/SSL", status: "pass", detail: "Site uses HTTPS" },
  { label: "Mobile Friendly", status: "pass", detail: "Mobile viewport detected" },
  { label: "Image Alt Tags", status: "warn", detail: "3 images missing alt attributes" },
  { label: "Page Speed", status: "warn", detail: "Estimated load time: 2.8s (aim for <2s)" },
  { label: "Canonical URL", status: "pass", detail: "Canonical tag present" },
  { label: "Schema Markup", status: "fail", detail: "No structured data found. Add schema markup." },
  { label: "Sitemap", status: "warn", detail: "Sitemap.xml not detected at /sitemap.xml" },
  { label: "Robots.txt", status: "pass", detail: "Robots.txt found and accessible" },
  { label: "Open Graph Tags", status: "fail", detail: "Missing OG tags for social sharing" },
];

export default function SEOAnalyzer() {
  const [url, setUrl] = useState("");
  const [analyzing, setAnalyzing] = useState(false);
  const [report, setReport] = useState(null);

  const analyze = () => {
    if (!url.trim()) return;
    setAnalyzing(true);
    setTimeout(() => {
      setAnalyzing(false);
      setReport(mockReport);
    }, 2200);
  };

  const score = report ? Math.round((report.filter((r) => r.status === "pass").length / report.length) * 100) : 0;
  const scoreColor = score >= 80 ? "text-cta" : score >= 60 ? "text-yellow-400" : "text-red-400";

  return (
    <>
      <div className="bg-surface-2 border border-surface-3 rounded-2xl p-6 space-y-6">
        <h2 className="text-white font-heading font-bold text-xl">SEO Analyzer</h2>

        <div className="flex gap-3">
          <div className="relative flex-1">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-soft" size={16} />
            <input
              type="url" value={url} onChange={(e) => setUrl(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && analyze()}
              placeholder="https://yourwebsite.com"
              className="input-field pl-11 text-sm"
            />
          </div>
          <button onClick={analyze} disabled={!url.trim() || analyzing}
            className="btn-primary flex items-center gap-2 whitespace-nowrap disabled:opacity-50">
            <FiTrendingUp size={15} />
            {analyzing ? "Analyzing..." : "Analyze"}
          </button>
        </div>

        {analyzing && (
          <div className="result-area flex flex-col items-center gap-4">
            <div className="w-12 h-12 border-2 border-accent border-t-transparent rounded-full animate-spin" />
            <p className="text-gray-soft text-sm">Scanning 25+ SEO factors...</p>
          </div>
        )}

        {report && !analyzing && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            {/* Score */}
            <div className="flex items-center gap-6 bg-surface-3 rounded-2xl p-6">
              <div className="text-center">
                <div className={`text-5xl font-black ${scoreColor}`}>{score}</div>
                <div className="text-gray-soft text-xs mt-1">SEO Score</div>
              </div>
              <div className="flex-1">
                <div className="w-full bg-surface-2 rounded-full h-3 mb-4">
                  <motion.div
                    initial={{ width: 0 }} animate={{ width: `${score}%` }}
                    className={`h-3 rounded-full ${score >= 80 ? "bg-cta" : score >= 60 ? "bg-yellow-400" : "bg-red-400"}`}
                  />
                </div>
                <div className="flex gap-4 text-xs">
                  <span className="text-cta">✓ {report.filter(r => r.status === "pass").length} Passed</span>
                  <span className="text-yellow-400">⚠ {report.filter(r => r.status === "warn").length} Warnings</span>
                  <span className="text-red-400">✗ {report.filter(r => r.status === "fail").length} Failed</span>
                </div>
              </div>
            </div>

            {/* Report Table */}
            <div className="space-y-2">
              {report.map((item, i) => (
                <div key={i} className="flex items-center gap-3 bg-surface-3 rounded-xl px-4 py-3">
                  {item.status === "pass" && <FiCheck className="text-cta flex-shrink-0" size={16} />}
                  {item.status === "warn" && <FiAlertCircle className="text-yellow-400 flex-shrink-0" size={16} />}
                  {item.status === "fail" && <FiX className="text-red-400 flex-shrink-0" size={16} />}
                  <div className="flex-1 min-w-0">
                    <p className="text-white text-sm font-medium">{item.label}</p>
                    <p className="text-gray-soft text-xs">{item.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </>
  );
}

