'use client';
import React, { useState, useEffect } from "react";
import { FiSearch, FiZap, FiArrowRight, FiActivity } from "react-icons/fi";
import ToolCard from "@/components/ToolCard";

import Breadcrumbs from "@/components/Breadcrumbs";
import { tools, searchTools, featuredTools, categories as toolCategories } from "@/data/tools";
import { motion, AnimatePresence } from "framer-motion";

export default function Tools() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState(tools);
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    let filtered = searchTools(searchQuery);
    if (selectedCategory !== "All") {
      filtered = filtered.filter(t => t.category === selectedCategory);
    }
    setSearchResults(filtered);
  }, [searchQuery, selectedCategory]);

  const breadcrumbItems = [
    { label: "Tools", path: "/tools" }
  ];

  const pageStructuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "NovuliServices Tools Directory",
    "description": "Professional 17+ online tools for SEO, PDF, Branding, and Growth.",
    "url": "https://novulisurvices.com/tools"
  };

  return (
    <>
      

      <main className="bg-white min-h-screen pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4">
          <Breadcrumbs items={breadcrumbItems} />

          <header className="mb-16">
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }}
              className="max-w-3xl"
            >
              <h1 className="text-5xl md:text-6xl font-display font-bold text-primary mb-6 tracking-tight">
                Premium <span className="text-accent underline decoration-blue-100 decoration-8 underline-offset-8">Tools</span> Directory
              </h1>
              <p className="text-secondary text-xl font-light leading-relaxed mb-10">
                A curated suite of high-performance tools designed for the modern professional. Fast, secure, and always free.
              </p>
              
              <div className="relative max-w-2xl group">
                <FiSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-accent transition-colors" size={20} />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search 17+ professional tools..."
                  className="w-full bg-bg-gray border-2 border-transparent text-primary placeholder-gray-400 rounded-2xl pl-14 pr-6 py-4.5 focus:outline-none focus:border-accent focus:bg-white shadow-sm transition-all text-lg font-light"
                />
                {searchQuery && (
                   <span className="absolute right-5 top-1/2 -translate-y-1/2 text-xs font-bold text-accent uppercase tracking-widest">
                     {searchResults.length} Results
                   </span>
                )}
              </div>
            </motion.div>
          </header>

          {/* Featured/Popular Section (Only on initial view) */}
          {!searchQuery && selectedCategory === "All" && (
            <section className="mb-20">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-accent">
                  <FiActivity size={20} />
                </div>
                <h2 className="text-2xl font-display font-bold text-primary">Popular Right Now</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {featuredTools.slice(0, 4).map((tool, i) => (
                  <ToolCard key={tool.id} tool={tool} index={i} compact />
                ))}
              </div>
            </section>
          )}

          {/* Main Content Area */}
          <section className="flex flex-col lg:flex-row gap-12">
            {/* Sidebar Filters */}
            <aside className="w-full lg:w-64 flex-shrink-0">
              <div className="sticky top-32">
                <h3 className="text-sm font-bold text-primary uppercase tracking-widest mb-6 px-1">Categories</h3>
                <div className="flex flex-col gap-1">
                  {toolCategories.map(cat => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                        selectedCategory === cat
                          ? "bg-accent text-white shadow-xl shadow-blue-900/10"
                          : "text-secondary hover:bg-bg-gray"
                      }`}
                    >
                      {cat}
                      {selectedCategory === cat && <FiArrowRight />}
                    </button>
                  ))}
                </div>
              </div>
            </aside>

            {/* Grid */}
            <div className="flex-grow">
              <AnimatePresence mode="wait">
                {searchResults.length > 0 ? (
                  <motion.div 
                    key="results"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-8"
                  >
                    {searchResults.map((tool, i) => (
                      <ToolCard key={tool.id} tool={tool} index={i} />
                    ))}
                  </motion.div>
                ) : (
                  <motion.div 
                    key="empty"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-bg-gray rounded-[2.5rem] p-16 text-center border-2 border-dashed border-gray-200"
                  >
                    <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center mx-auto mb-6 text-accent shadow-sm">
                      <FiZap size={36} />
                    </div>
                    <h3 className="text-3xl font-display font-bold text-primary mb-2">No tools match your search</h3>
                    <p className="text-secondary text-lg font-light mb-8 max-w-sm mx-auto">
                      Don't worry, we're constantly adding new tools. Try a different keyword or check out these suggestions.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                      {featuredTools.slice(0, 3).map(tool => (
                        <button 
                          key={tool.id}
                          onClick={() => { setSearchQuery(tool.name); setSelectedCategory("All"); }}
                          className="bg-white px-6 py-2.5 rounded-xl text-sm font-bold shadow-sm hover:shadow-md transition-all border border-border-light"
                        >
                          {tool.name}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </section>

          {/* SEO CATEGORY DESCRIPTIONS SECTION */}
          <section className="mt-32 pt-24 border-t border-border-light prose prose-lg prose-blue text-secondary max-w-none">
             <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl font-bold text-primary mb-6">Explore Over 17 Premium Free Web Tools</h2>
                <p>
                  As the digital landscape evolves, professionals require rapid, highly secure access to web-based utilities. The <strong>NovuliServices Tools Directory</strong> is structured to eliminate the friction of downloading unknown software. Every tool listed in this repository executes locally in your browser, guaranteeing unparalleled speed and privacy. 
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-12">
                   <div>
                      <h3 className="text-2xl font-bold text-primary mb-4">PDF & Document Processing</h3>
                      <p className="text-base text-slate-600 leading-relaxed">
                         Whether you need to extract editable formatting via our accurately mapped <a href="/tools/pdf-to-word" className="text-accent underline font-medium">PDF to Word</a> converter or finalize a contract using the <a href="/tools/word-to-pdf" className="text-accent underline font-medium">Word to PDF</a> tool, our document processors guarantee 100% layout fidelity without restricting file size.
                      </p>
                   </div>
                   <div>
                      <h3 className="text-2xl font-bold text-primary mb-4">Image Manipulation & AI</h3>
                      <p className="text-base text-slate-600 leading-relaxed">
                         Bulky images slow down websites. Utilize our <a href="/tools/image-compressor" className="text-accent underline font-medium">Image Compressor</a> to optimize assets seamlessly, or extract transparent cut-outs instantly using our advanced machine-learning <a href="/tools/background-remover" className="text-accent underline font-medium">AI Background Remover</a>.
                      </p>
                   </div>
                   <div>
                      <h3 className="text-2xl font-bold text-primary mb-4">SEO & Core Web Analytics</h3>
                      <p className="text-base text-slate-600 leading-relaxed">
                         Stop guessing your Google rankings. Our analytical tools offer deep insights, ranging from the technical <a href="/tools/seo-audit" className="text-accent underline font-medium">Site SEO Audit</a>, semantic <a href="/tools/keyword-research-tool" className="text-accent underline font-medium">Keyword Research</a>, and critical Core Web Vitals diagnostics in our <a href="/tools/website-speed-checker" className="text-accent underline font-medium">Speed Checker</a>.
                      </p>
                   </div>
                   <div>
                      <h3 className="text-2xl font-bold text-primary mb-4">Business & Marketing Generators</h3>
                      <p className="text-base text-slate-600 leading-relaxed">
                         Automate tedious startup tasks. From generating an enterprise-standard <a href="/tools/qr-code-generator" className="text-accent underline font-medium">Custom QR Code</a> to building scalable <a href="/tools/invoice-generator" className="text-accent underline font-medium">Professional Invoices</a> and email signatures.
                      </p>
                   </div>
                </div>
             </div>
          </section>

        </div>
      </main>
    </>
  );
}
