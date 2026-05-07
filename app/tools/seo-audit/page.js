'use client';
import React, { useState } from "react";
import { FiGlobe, FiSearch, FiCheckCircle, FiXCircle, FiActivity, FiMail, FiZap, FiLayout, FiShield, FiTrendingUp, FiLock } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

import Breadcrumbs from "@/components/Breadcrumbs";

export default function SEOAudit() {
  const [url, setUrl] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState(null);
  const [email, setEmail] = useState("");

  const runAudit = (e) => {
    e.preventDefault();
    if (!url) return;
    setIsAnalyzing(true);
    // Simulate SEO Audit
    setTimeout(() => {
      setResults({
        score: 74,
        metrics: [
          { label: "Title Tag", status: "pass", value: "Verified", desc: "Title tag is present and optimized." },
          { label: "Meta Description", status: "pass", value: "Found", desc: "Meta description is within length limits." },
          { label: "H1 Header", status: "fail", value: "Missing", desc: "No H1 tag detected on the homepage." },
          { label: "SSL Certificate", status: "pass", value: "Secure", desc: "HTTPS is correctly configured." },
          { label: "Mobile Friendly", status: "pass", value: "Yes", desc: "Page is responsive and mobile-friendly." },
          { label: "Robots.txt", status: "pass", value: "Found", desc: "Search engines can access your crawl instructions." },
          { label: "Sitemap", status: "fail", value: "Not Found", desc: "No XML sitemap detected in the root directory." },
          { label: "Load Speed", status: "warn", value: "2.4s", desc: "Page load time is slightly above the 2s target." }
        ]
      });
      setIsAnalyzing(false);
    }, 2500);
  };

  const breadcrumbItems = [
    { label: "Tools", path: "/tools" },
    { label: "SEO Audit", path: "/tools/seo-audit" }
  ];

  const plans = [
    {
      name: "Single Detailed Report",
      price: "$9",
      desc: "One-time deep dive audit for one website.",
      features: ["Keyword opportunities", "Competitor gaps", "Backlink analysis", "Technical errors"],
      cta: "Get Detailed Report",
      highlight: false
    },
    {
      name: "Monthly SEO Monitoring",
      price: "$29",
      period: "/mo",
      desc: "Stay on top of your rankings and technical health.",
      features: ["Everything in Single", "Weekly auto-audits", "Rank tracking", "Content recommendations"],
      cta: "Start 7-Day Free Trial",
      highlight: true
    },
    {
      name: "Agency Pack",
      price: "$99",
      period: "/mo",
      desc: "For SEO professionals and growing agencies.",
      features: ["Everything in Monthly", "White-label reports", "10 projects included", "API access"],
      cta: "Start Scaling",
      highlight: false
    }
  ];

  return (
    <>
      

      <main className="bg-white pt-32 pb-20">
        <div className="max-w-6xl mx-auto px-4">
          <Breadcrumbs items={breadcrumbItems} />

          {/* Hero */}
          <section className="text-center mb-16">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <span className="badge mb-4 font-bold uppercase tracking-widest text-[10px]">Rank Boost Engine</span>
              <h1 className="text-5xl md:text-7xl font-display font-bold text-primary mb-6 tracking-tight">
                Free <span className="text-accent underline decoration-blue-50 underline-offset-8">SEO Audit</span> Tool
              </h1>
              <p className="text-secondary text-xl font-light leading-relaxed max-w-2xl mx-auto mb-10">
                Analyze your website instantly and discover SEO opportunities that your competitors are missing. 
              </p>

              <form onSubmit={runAudit} className="max-w-2xl mx-auto flex flex-col md:flex-row gap-4">
                <div className="flex-grow relative group">
                  <FiGlobe className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-accent transition-colors" size={20} />
                  <input
                    type="url"
                    required
                    placeholder="https://yourwebsite.com"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    className="w-full bg-bg-gray border-2 border-transparent text-primary placeholder-gray-400 rounded-2xl pl-14 pr-6 py-4.5 focus:outline-none focus:border-accent focus:bg-white shadow-sm transition-all text-lg font-light"
                  />
                </div>
                <button 
                  type="submit" 
                  disabled={isAnalyzing}
                  className="btn-primary px-10 py-4.5 rounded-2xl flex items-center justify-center gap-3 active:scale-[0.98] transition-all whitespace-nowrap min-w-[200px]"
                >
                  {isAnalyzing ? (
                    <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  ) : (
                    <>Run Free Audit <FiSearch size={20} /></>
                  )}
                </button>
              </form>
            </motion.div>
          </section>

          <AnimatePresence>
            {results && (
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-12">
                
                {/* Score Section */}
                <div className="bg-bg-gray rounded-[2.5rem] p-10 md:p-16 border border-border-light shadow-2xl shadow-blue-900/[0.03]">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div className="text-center md:text-left">
                      <h2 className="text-3xl font-display font-bold text-primary mb-4">Your SEO Score</h2>
                      <p className="text-secondary text-lg font-light mb-8">
                        We've analyzed <span className="font-bold text-primary">{url}</span>. Here is your initial health snapshot.
                      </p>
                      <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                        <div className="bg-green-50 text-green-700 px-6 py-2 rounded-full text-sm font-bold border border-green-100 flex items-center gap-2">
                          <FiCheckCircle /> 5 Passed
                        </div>
                        <div className="bg-red-50 text-red-700 px-6 py-2 rounded-full text-sm font-bold border border-red-100 flex items-center gap-2">
                          <FiXCircle /> 2 Failed
                        </div>
                        <div className="bg-blue-50 text-blue-700 px-6 py-2 rounded-full text-sm font-bold border border-blue-100 flex items-center gap-2">
                          <FiActivity /> 1 Warn
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-center">
                      <div className="relative w-48 h-48">
                        <svg className="w-full h-full transform -rotate-90">
                          <circle cx="96" cy="96" r="88" stroke="currentColor" strokeWidth="12" fill="transparent" className="text-gray-200" />
                          <circle cx="96" cy="96" r="88" stroke="currentColor" strokeWidth="12" fill="transparent" strokeDasharray={552.92} strokeDashoffset={552.92 * (1 - results.score / 100)} className="text-accent transition-all duration-1000 ease-out" strokeLinecap="round" />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                          <span className="text-6xl font-display font-bold text-primary">{results.score}</span>
                          <span className="text-secondary text-sm font-bold uppercase tracking-widest">Score</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Audit Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {results.metrics.map((m, i) => (
                    <div key={i} className="bg-white border border-border-light p-6 rounded-2xl hover:border-accent transition-all group">
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="font-bold text-primary">{m.label}</h3>
                        {m.status === 'pass' ? <FiCheckCircle className="text-green-500" /> : m.status === 'warn' ? <FiActivity className="text-blue-500" /> : <FiXCircle className="text-red-500" />}
                      </div>
                      <div className={`text-lg font-bold mb-2 ${m.status === 'pass' ? 'text-green-600' : m.status === 'warn' ? 'text-blue-600' : 'text-red-600'}`}>{m.value}</div>
                      <p className="text-secondary text-xs font-light leading-relaxed">{m.desc}</p>
                    </div>
                  ))}
                </div>

                {/* Lead Collection */}
                <div className="bg-accent rounded-[2.5rem] p-10 md:p-16 text-white text-center">
                  <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 tracking-tight">Send this report to your email</h2>
                  <p className="text-blue-100 text-lg mb-10 max-w-xl mx-auto">
                    We've generated a full summary. Enter your work email and we'll send the PDF results instantly.
                  </p>
                  <form className="max-w-xl mx-auto flex flex-col sm:flex-row gap-4">
                    <input 
                      type="email" 
                      required
                      placeholder="work@company.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="flex-grow bg-white/10 border border-white/20 rounded-2xl px-6 py-4 placeholder:text-blue-200 text-white focus:outline-none focus:bg-white/20"
                    />
                    <button type="submit" className="bg-white text-accent px-8 py-4 rounded-2xl font-bold hover:bg-blue-50 transition-colors flex items-center justify-center gap-2">
                       Send Report <FiMail />
                    </button>
                  </form>
                </div>

                {/* Premium Funnel Upsell */}
                <section className="py-12">
                   <div className="text-center mb-16">
                     <h2 className="text-4xl font-display font-bold text-primary mb-4">Want a full professional SEO report?</h2>
                     <p className="text-secondary text-xl font-light max-w-2xl mx-auto">
                       Unlock deep insights that go beyond the basics. Our premium reports provide a full growth roadmap for your business.
                     </p>
                   </div>

                   <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                      {plans.map((plan, i) => (
                        <div key={i} className={`bg-white border-2 rounded-[2.5rem] p-10 transition-all ${plan.highlight ? 'border-accent shadow-2xl shadow-blue-900/10 scale-105 relative z-10' : 'border-border-light hover:border-accent shadow-sm'}`}>
                          {plan.highlight && <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-accent text-white text-[10px] font-bold px-6 py-2 rounded-full uppercase tracking-widest">Most Popular</div>}
                          <h3 className="text-xl font-bold text-primary mb-2">{plan.name}</h3>
                          <div className="flex items-baseline gap-1 mb-6">
                            <span className="text-4xl font-display font-bold text-primary">{plan.price}</span>
                            <span className="text-secondary text-sm font-medium">{plan.period || ''}</span>
                          </div>
                          <p className="text-secondary text-sm font-light mb-8">{plan.desc}</p>
                          <ul className="space-y-4 mb-10">
                            {plan.features.map((f, j) => (
                              <li key={j} className="flex items-center gap-3 text-sm text-primary">
                                <FiCheckCircle className="text-accent flex-shrink-0" />
                                <span className="font-medium">{f}</span>
                              </li>
                            ))}
                          </ul>
                          <button className={`w-full py-4 rounded-xl font-bold transition-all ${plan.highlight ? 'bg-accent text-white hover:bg-blue-600 shadow-lg shadow-blue-200' : 'bg-bg-gray text-primary hover:bg-gray-200'}`}>
                            {plan.cta}
                          </button>
                        </div>
                      ))}
                   </div>
                </section>

                {/* Premium Blocks */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-10">
                  {[
                    { icon: FiTrendingUp, title: "Keyword Opportunities", desc: "Discover high-intent keywords that your domain can realistically rank for based on current authority." },
                    { icon: FiShield, title: "Technical Security", desc: "Deep crawl detects header issues, mixed content, and SSL vulnerabilities that hurt performance." },
                    { icon: FiLayout, title: "Schema Opportunities", desc: "Automatically identify where you can add JSON-LD to get rich snippets and higher CTR." },
                    { icon: FiZap, title: "Core Web Vitals", desc: "Granular breakdown of LCP, FID, and CLS with specific file-by-file optimization guides." }
                  ].map((block, i) => (
                    <div key={i} className="flex gap-6 p-8 rounded-3xl border border-gray-100 hover:bg-gray-50 transition-colors">
                      <div className="w-14 h-14 bg-white rounded-2xl shadow-sm flex items-center justify-center text-accent shrink-0 border border-gray-100">
                        <block.icon size={26} />
                      </div>
                      <div>
                        <h4 className="text-xl font-bold text-primary mb-2">{block.title}</h4>
                        <p className="text-secondary text-sm font-light leading-relaxed">{block.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="text-center py-12 border-t border-border-light">
                   <div className="inline-flex items-center gap-2 bg-blue-50 text-accent font-bold px-6 py-2 rounded-full text-xs uppercase tracking-widest mb-6 border border-blue-100">
                     <FiLock /> Enterprise Grade Security
                   </div>
                   <p className="text-secondary text-sm font-light">
                     All audit data is encrypted. We do not store your results unless you request an emailed report.
                   </p>
                </div>

              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </>
  );
}
