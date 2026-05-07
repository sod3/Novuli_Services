'use client';
import React, { useState } from "react";
import { getToolById } from "@/data/tools";
import { FiCopy, FiCheck } from "react-icons/fi";
import { motion } from "framer-motion";


const faqs = [
  { question: "What are meta tags?", answer: "Meta tags are HTML tags that provide search engines and social media platforms with information about your page." },
  { question: "Do meta tags still matter for SEO?", answer: "Yes! Title tags directly affect click-through rates and descriptions influence user behavior in search results." },
  { question: "What is the ideal title tag length?", answer: "50-60 characters is ideal. Longer titles will be truncated in search results." },
  { question: "What's the ideal meta description length?", answer: "120-160 characters. Keep it compelling with a clear call-to-action." },
];

const steps = [
  { title: "Fill Page Details", desc: "Enter your page title, description, and other details." },
  { title: "Customize OG/Twitter", desc: "Set social media preview details for maximum engagement." },
  { title: "Copy Code", desc: "Copy the generated HTML and paste it in your page's <head>." },
];

export default function MetaTagGenerator() {
  const [form, setForm] = useState({
    title: "", description: "", keywords: "", author: "",
    ogTitle: "", ogDesc: "", ogImage: "", twitterCard: "summary_large_image",
    robots: "index, follow", canonical: "",
  });
  const [copied, setCopied] = useState(false);

  const update = (k, v) => setForm((p) => ({ ...p, [k]: v }));

  const generated = `<!-- Primary Meta Tags -->
<title>${form.title || "Your Page Title"}</title>
<meta name="title" content="${form.title || "Your Page Title"}" />
<meta name="description" content="${form.description || "Your page description"}" />
${form.keywords ? `<meta name="keywords" content="${form.keywords}" />` : ""}
${form.author ? `<meta name="author" content="${form.author}" />` : ""}
<meta name="robots" content="${form.robots}" />
${form.canonical ? `<link rel="canonical" href="${form.canonical}" />` : ""}

<!-- Open Graph / Facebook -->
<meta property="og:type" content="website" />
<meta property="og:title" content="${form.ogTitle || form.title || "Your Page Title"}" />
<meta property="og:description" content="${form.ogDesc || form.description || "Your page description"}" />
${form.ogImage ? `<meta property="og:image" content="${form.ogImage}" />` : ""}
${form.canonical ? `<meta property="og:url" content="${form.canonical}" />` : ""}

<!-- Twitter -->
<meta property="twitter:card" content="${form.twitterCard}" />
<meta property="twitter:title" content="${form.ogTitle || form.title || "Your Page Title"}" />
<meta property="twitter:description" content="${form.ogDesc || form.description || "Your page description"}" />
${form.ogImage ? `<meta property="twitter:image" content="${form.ogImage}" />` : ""}`;

  const copy = () => {
    navigator.clipboard.writeText(generated);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <div className="bg-surface-2 border border-surface-3 rounded-2xl p-6 space-y-6">
        <h2 className="text-white font-heading font-bold text-xl">Meta Tag Generator</h2>

        <div className="grid grid-cols-1 gap-4">
          <div>
            <label className="text-gray-soft text-xs mb-1.5 block">Page Title <span className="text-red-400">*</span></label>
            <input value={form.title} onChange={(e) => update("title", e.target.value)}
              placeholder="Best Free Online Tools | NovuliServices" className="input-field text-sm" maxLength={70} />
            <p className="text-gray-soft text-xs mt-1">{form.title.length}/60 characters</p>
          </div>
          <div>
            <label className="text-gray-soft text-xs mb-1.5 block">Meta Description <span className="text-red-400">*</span></label>
            <textarea value={form.description} onChange={(e) => update("description", e.target.value)}
              placeholder="Use our free online tools for PDF, SEO, QR codes and more. No signup required." rows={2}
              className="input-field resize-none text-sm" maxLength={170} />
            <p className="text-gray-soft text-xs mt-1">{form.description.length}/160 characters</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-gray-soft text-xs mb-1.5 block">Keywords</label>
              <input value={form.keywords} onChange={(e) => update("keywords", e.target.value)}
                placeholder="free tools, pdf converter, qr code" className="input-field text-sm" />
            </div>
            <div>
              <label className="text-gray-soft text-xs mb-1.5 block">Author</label>
              <input value={form.author} onChange={(e) => update("author", e.target.value)}
                placeholder="NovuliServices" className="input-field text-sm" />
            </div>
            <div>
              <label className="text-gray-soft text-xs mb-1.5 block">Canonical URL</label>
              <input value={form.canonical} onChange={(e) => update("canonical", e.target.value)}
                placeholder="https://novulisurvices.com/page" className="input-field text-sm" />
            </div>
            <div>
              <label className="text-gray-soft text-xs mb-1.5 block">Robots</label>
              <select value={form.robots} onChange={(e) => update("robots", e.target.value)} className="input-field text-sm appearance-none">
                <option>index, follow</option>
                <option>noindex, follow</option>
                <option>index, nofollow</option>
                <option>noindex, nofollow</option>
              </select>
            </div>
          </div>

          <div className="border-t border-surface-3 pt-4">
            <p className="text-white font-semibold text-sm mb-3">Social Media (OG/Twitter)</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-gray-soft text-xs mb-1.5 block">OG Title</label>
                <input value={form.ogTitle} onChange={(e) => update("ogTitle", e.target.value)}
                  placeholder="Same as title (optional)" className="input-field text-sm" />
              </div>
              <div>
                <label className="text-gray-soft text-xs mb-1.5 block">OG Image URL</label>
                <input value={form.ogImage} onChange={(e) => update("ogImage", e.target.value)}
                  placeholder="https://example.com/image.jpg" className="input-field text-sm" />
              </div>
            </div>
          </div>
        </div>

        {/* Generated Code */}
        {form.title && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
            <div className="flex items-center justify-between">
              <p className="text-white font-semibold text-sm">Generated HTML</p>
              <button onClick={copy} className="btn-outline py-1.5 px-4 text-sm flex items-center gap-1.5">
                {copied ? <FiCheck size={13} /> : <FiCopy size={13} />}
                {copied ? "Copied!" : "Copy"}
              </button>
            </div>
            <pre className="bg-surface-3 rounded-xl p-4 text-xs text-gray-soft overflow-x-auto leading-relaxed whitespace-pre-wrap break-all font-mono max-h-64 overflow-y-auto">
              {generated}
            </pre>
          </motion.div>
        )}
      </div>
    </>
  );
}

