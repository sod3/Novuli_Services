'use client';
import React, { useState, useEffect } from "react";
import Link from 'next/link';
import { motion } from "framer-motion";
import {
  FiSearch, FiArrowRight, FiZap, FiShield,
  FiTrendingUp, FiCheckCircle, FiChevronRight, FiBox, FiActivity, FiSearch as FiSeo, FiFileText, FiImage, FiDownload
} from "react-icons/fi";
import ToolCard from "@/components/ToolCard";
import TestimonialCard from "@/components/TestimonialCard";

import { tools, featuredTools, searchTools } from "@/data/tools";
import { blogPosts } from "@/data/blog";

const stats = [
  { value: "Private", label: "Secure Storage" },
  { value: "Premium", label: "Professional Tools" },
  { value: "Instant", label: "Server Response" },
];

const categories = [
  { name: "SEO Tools", icon: FiSeo, count: 5, color: "#2563EB" },
  { name: "PDF Tools", icon: FiFileText, count: 3, color: "#7C3AED" },
  { name: "Image Tools", icon: FiImage, count: 3, color: "#EC4899" },
  { name: "Business", icon: FiBox, count: 2, color: "#D97706" },
];

const popularChips = [
  { label: "SEO Audit", slug: "/tools/seo-audit" },
  { label: "QR Generator", slug: "/tools/qr-code-generator" },
  { label: "Resume Maker", slug: "/tools/resume-builder" },
  { label: "BG Remover", slug: "/tools/background-remover" },
];

export default function Homepage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    setSearchResults(searchTools(searchQuery).slice(0, 6));
  }, [searchQuery]);

  const displayedTools = searchQuery ? searchResults : featuredTools.slice(0, 6);

  const homeStructuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": "https://novulisurvices.com/#website",
        "name": "NovuliSurvices",
        "url": "https://novulisurvices.com",
        "potentialAction": {
          "@type": "SearchAction",
          "target": "https://novulisurvices.com/tools?q={search_term_string}",
          "query-input": "required name=search_term_string"
        }
      },
      {
        "@type": "Organization",
        "@id": "https://novulisurvices.com/#organization",
        "name": "NovuliSurvices",
        "url": "https://novulisurvices.com",
        "logo": {
          "@type": "ImageObject",
          "url": "https://novulisurvices.com/novlogo.png"
        },
        "description": "Premium free online utility suite providing completely secure PDF conversion, image manipulation, and SEO analytical tools directly in the browser.",
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeStructuredData) }}
      />
      {/* HERO SECTION */}
      <section className="relative pt-36 pb-24 overflow-hidden bg-white">
        <div className="absolute top-0 left-0 w-full h-full opacity-[0.02] pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-600 rounded-full blur-[150px]"></div>
          <div className="absolute bottom-[20%] right-[-10%] w-[40%] h-[40%] bg-purple-500 rounded-full blur-[150px]"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="text-center max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <div className="inline-flex items-center gap-3 bg-blue-50 text-accent px-5 py-2 rounded-full text-xs font-bold uppercase tracking-[0.2em] mb-8 border border-blue-100 shadow-sm">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
                </span>
                The Web's Premium Utility Suite
              </div>

              <h1 className="text-6xl md:text-8xl font-display font-bold text-primary tracking-tight leading-[1.05] mb-8">
                Tools Built For <br className="hidden md:block" />
                <span className="text-accent underline decoration-blue-100 decoration-[16px] underline-offset-1 text-stroke text-transparent" style={{ WebkitTextStroke: "2px #2563EB", textDecorationColor: "rgba(37, 99, 235, 0.1)" }}>High-Growth</span> Teams
              </h1>

              <p className="text-secondary text-xl md:text-2xl font-light mb-12 max-w-3xl mx-auto leading-relaxed">
                Elite tools for <span className="text-primary font-medium">SEO audits</span>, <span className="text-primary font-medium">PDF processing</span>, and <span className="text-primary font-medium">business automation</span>. Instant, secure, and always free.
              </p>

              {/* Search Bar */}
              <div className="relative max-w-3xl mx-auto mb-10 group">
                <FiSearch className="absolute left-7 top-1/2 -translate-y-1/2 text-gray-400 text-2xl group-focus-within:text-accent transition-colors" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search professional tools..."
                  className="w-full bg-white border-2 border-border-light text-primary placeholder-gray-400 rounded-[2.5rem] pl-20 pr-8 py-6 text-xl focus:outline-none focus:border-accent focus:bg-white transition-all shadow-2xl shadow-blue-900/[0.05]"
                />
              </div>

              {/* Search Chips */}
              <div className="flex flex-wrap items-center justify-center gap-4 mb-14">
                <span className="text-xs font-bold text-secondary uppercase tracking-widest">Trending:</span>
                {popularChips.map((chip) => (
                  <Link
                    key={chip.label}
                    href={chip.slug}
                    className="px-6 py-2.5 bg-bg-gray hover:bg-white border border-transparent hover:border-accent rounded-xl text-sm text-secondary hover:text-accent transition-all font-bold hover:shadow-xl hover:shadow-blue-900/5"
                  >
                    {chip.label}
                  </Link>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                <Link href="/tools/seo-audit" className="bg-primary text-white px-12 py-5 text-lg font-bold rounded-2xl flex items-center gap-3 hover:scale-105 active:scale-95 transition-all shadow-xl shadow-gray-200">
                  <FiTrendingUp /> Run Free SEO Audit
                </Link>
                <a href="#tools" className="bg-bg-gray text-primary border border-border-light px-12 py-5 text-lg font-bold rounded-2xl flex items-center gap-3 hover:bg-white hover:border-accent hover:text-accent transition-all">
                  Browse Directory
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* STATS SECTION */}
      <section className="bg-white border-y border-border-light py-16 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            {stats.map((stat) => (
              <div key={stat.label} className="group">
                <div className="text-5xl font-display font-bold text-primary mb-2 group-hover:text-accent transition-colors">{stat.value}</div>
                <div className="text-xs font-bold text-secondary uppercase tracking-[0.2em]">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CATEGORIES SECTION */}
      <section className="py-24 bg-bg-gray/50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div className="max-w-2xl">
              <h2 className="text-4xl font-display font-bold text-primary mb-4">Professional Categories</h2>
              <p className="text-secondary text-lg font-light">Explore specialized toolkits built for specific professional needs.</p>
            </div>
            <Link href="/tools" className="text-accent font-bold flex items-center gap-2 hover:underline">
              View Entire Directory <FiArrowRight />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {categories.map((cat) => (
              <Link href="/tools" key={cat.name} className="bg-white p-8 rounded-[2.5rem] border border-border-light hover:border-accent hover:shadow-2xl hover:shadow-blue-900/5 transition-all group cursor-pointer block">
                <div className="w-14 h-14 bg-bg-gray rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-50 transition-colors">
                  <cat.icon size={26} style={{ color: cat.color }} />
                </div>
                <h3 className="text-xl font-bold text-primary mb-2">{cat.name}</h3>
                <p className="text-secondary text-sm mb-6 font-light">Specialized Utilities</p>
                <div className="w-10 h-10 rounded-full bg-bg-gray flex items-center justify-center text-secondary group-hover:bg-accent group-hover:text-white transition-all">
                  <FiChevronRight />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED TOOLS GRID */}
      <section id="tools" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-20">
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
              <span className="badge mb-4 font-bold uppercase tracking-widest text-[10px] text-accent">Curated Collection</span>
              <h2 className="text-4xl md:text-5xl font-display font-bold text-primary mb-6">Top Professional Utilities</h2>
              <p className="text-secondary text-xl font-light max-w-2xl mx-auto leading-relaxed">
                {searchQuery ? `Displaying ${searchResults.length} search results` : "The most used tools by high-growth startups and agencies."}
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {displayedTools.map((tool, i) => (
              <ToolCard key={tool.id} tool={tool} index={i} />
            ))}
          </div>

          {!searchQuery && (
            <div className="mt-20 text-center">
              <Link href="/tools" className="bg-bg-gray text-primary border-2 border-transparent hover:border-accent hover:text-accent font-display font-bold px-12 py-5 rounded-2xl inline-flex items-center gap-3 transition-all">
                Access All Tools <FiActivity />
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* WHY CHOOSE US / TRUST SECTION */}
      <section className="py-24 bg-primary text-white overflow-hidden relative">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M0 0 L100 100 M100 0 L0 100" stroke="white" strokeWidth="0.1" />
          </svg>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
              <h2 className="text-5xl font-display font-bold mb-10 leading-tight">
                Designed for teams who <span className="text-accent">move fast.</span>
              </h2>
              <div className="space-y-10">
                {[
                  { icon: FiShield, title: "Zero Trace Policy", desc: "All file conversions and SEO analyses happen in-browser. We never store your sensitive business data." },
                  { icon: FiZap, title: "Sub-Second Processing", desc: "Engineered for speed. No waiting in queues. No email lists to join. Get your result instantly." },
                  { icon: FiBox, title: "Agency-Grade Output", desc: "Every tool is built following industry standards (Google PageSpeed, PDF/A, W3C compliance)." }
                ].map((item, i) => (
                  <div key={i} className="flex gap-6 group">
                    <div className="w-16 h-16 bg-white/10 rounded-[1.5rem] flex items-center justify-center shrink-0 border border-white/5 group-hover:bg-accent transition-colors">
                      <item.icon size={26} />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold mb-2">{item.title}</h4>
                      <p className="text-blue-200 text-sm font-light leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
               <div className="bg-white/5 backdrop-blur-md rounded-[3rem] p-12 border border-white/10 shadow-2xl relative z-10">
                  <div className="flex items-center justify-between mb-12">
                     <div className="flex gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                        <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
                     </div>
                     <span className="text-[10px] font-bold uppercase tracking-[0.3em] opacity-40">System Dashboard</span>
                  </div>
                  <div className="space-y-8">
                     {[
                       { label: "SEO Health", score: "99%", color: "text-green-400" },
                       { label: "Process Velocity", score: "100%", color: "text-blue-400" },
                       { label: "Privacy Rating", score: "A+", color: "text-purple-400" }
                     ].map((row, i) => (
                       <div key={i} className="flex items-center justify-between border-b border-white/5 pb-4">
                          <span className="text-blue-100 font-light">{row.label}</span>
                          <span className={`text-xl font-display font-bold ${row.color}`}>{row.score}</span>
                       </div>
                     ))}
                  </div>
                  <div className="mt-12 h-32 bg-white/5 rounded-2xl flex items-center justify-center">
                    <FiActivity size={48} className="text-white/20 animate-pulse" />
                  </div>
               </div>
               <div className="absolute -top-10 -right-10 w-64 h-64 bg-accent/20 rounded-full blur-3xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* PROGRAMMATIC SEO RESOURCE LISTING */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-display font-bold text-primary mb-4">The Web's Largest Free Directory</h2>
            <p className="text-secondary text-lg font-light">Explore specialized utilities built for modern workflows.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {tools.map(t => (
              <Link 
                key={t.id} 
                href={t.slug} 
                className="p-4 bg-bg-gray/50 hover:bg-white border border-transparent hover:border-accent/10 rounded-2xl text-center group transition-all"
              >
                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center mx-auto mb-3 shadow-sm group-hover:scale-110 transition-transform">
                  <FiZap style={{ color: t.color }} size={18} />
                </div>
                <span className="text-[10px] font-bold text-primary hover:text-accent uppercase tracking-widest block truncate">{t.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-32 bg-white relative">
         <div className="max-w-4xl mx-auto px-4 text-center">
            <motion.div initial={{ scale: 0.9, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} viewport={{ once: true }}>
               <h2 className="text-5xl md:text-6xl font-display font-bold text-primary mb-8 tracking-tight">Stop overpaying for tools.</h2>
               <p className="text-secondary text-xl font-light mb-12 leading-relaxed">
                  Join professionals using NovuliSurvices daily to automate their business tasks and drive growth. No credit cards, no subscriptions.
               </p>
               <div className="flex flex-wrap justify-center gap-6">
                 <Link href="/tools" className="bg-accent text-white px-12 py-5 rounded-2x font-bold text-lg hover:bg-blue-600 shadow-xl shadow-blue-200 transition-all flex items-center gap-3">
                   Explore Tools Directory <FiArrowRight />
                 </Link>
                 <Link href="/tools/seo-audit" className="bg-primary text-white px-12 py-5 rounded-2x font-bold text-lg hover:bg-gray-800 shadow-xl shadow-gray-200 transition-all flex items-center gap-3">
                   Run SEO Audit <FiSeo />
                 </Link>
               </div>
               <div className="mt-12 flex items-center justify-center gap-6">
                  <div className="flex items-center gap-2 text-xs font-bold text-secondary uppercase tracking-[0.2em]"><FiShield /> 100% Secure Processing</div>
               </div>
            </motion.div>
         </div>
      </section>

      {/* BLOG PREVIEW SECTION */}
      <section className="py-24 bg-white border-t border-border-light">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div className="max-w-2xl">
              <span className="badge mb-4 font-bold uppercase tracking-widest text-[10px] text-accent block">From the Blog</span>
              <h2 className="text-4xl font-display font-bold text-primary mb-4">Expert Guides & Tutorials</h2>
              <p className="text-secondary text-lg font-light">Deep-dive articles on SEO, productivity, performance, and digital strategy.</p>
            </div>
            <Link href="/blog" className="text-accent font-bold flex items-center gap-2 hover:underline whitespace-nowrap">
              View All Articles <FiArrowRight />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.slice(0, 3).map((post, i) => (
              <Link
                key={post.id}
                href={post.slug}
                className="group block bg-white border border-border-light rounded-[2rem] overflow-hidden hover:shadow-2xl hover:shadow-blue-900/[0.05] hover:border-accent transition-all"
              >
                <div className="h-48 overflow-hidden relative">
                  <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-bold text-accent uppercase tracking-widest">
                    {post.category}
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-[10px] font-bold text-secondary uppercase tracking-widest mb-3">{post.date} · {post.readTime}</p>
                  <h3 className="text-lg font-bold text-primary mb-3 leading-snug group-hover:text-accent transition-colors line-clamp-2">{post.title}</h3>
                  <p className="text-secondary text-sm font-light leading-relaxed line-clamp-3">{post.excerpt}</p>
                  <div className="mt-4 flex items-center gap-2 text-accent text-sm font-bold group-hover:translate-x-1 transition-transform">
                    Read Article <FiArrowRight size={14} />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* SEO PILLAR CONTENT (Crucial for root domain indexation depth) */}
      <section className="py-24 bg-bg-gray/20 border-t border-border-light">
         <div className="max-w-5xl mx-auto px-4 prose prose-blue prose-lg text-secondary">
            <h2 className="text-3xl font-bold text-primary mb-6">Why We Built NovuliSurvices For You</h2>
            <p>
               Let's be real-downloading bulky offline software just to convert a PDF or compress an image is frustrating. We built NovuliSurvices because we were tired of tools that force you into expensive subscriptions or bombard you with ads just to get a simple job done. Whether you need a secure <strong>Image to PDF converter</strong>, an accurate <strong>Word to PDF lock</strong>, or an instant <strong>AI Background Remover</strong>, our platform executes it right in your browser.
            </p>
            <h3 className="text-2xl font-bold text-primary mt-8 mb-4">You Shouldn't Have To Trade Privacy For Convenience</h3>
            <p>
               We take your privacy seriously because we know how important it is. Unlike traditional cloud services that hoard your documents on their servers, NovuliSurvices is built on cutting-edge <strong>WASM (WebAssembly)</strong> technology. This means when you upload a sensitive contract or a private resume, the data never actually leaves your computer. We built it this way so you don't have to worry about third-party data tracking. What happens on your machine stays on your machine.
            </p>
            <h3 className="text-2xl font-bold text-primary mt-8 mb-4">Enterprise SEO Tools, Without The Enterprise Price Tag</h3>
            <p>
               We didn't just stop at file conversions. We wanted to build a true command center for digital marketers and developers. If you run our <strong>Free Technical SEO Audit Tool</strong>, you'll immediately see the ranking errors holding you back. Pair that with our <strong>Backlink Checker</strong> and <strong>Keyword Research Tool</strong>, and you've got the exact same analytical power as the expensive, enterprise-level subscriptions-except ours is totally free, built by a team that actually uses them.
            </p>
         </div>
      </section>
    </>
  );
}


