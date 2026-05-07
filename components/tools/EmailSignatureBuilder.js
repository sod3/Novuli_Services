'use client';
import React, { useState } from "react";
import { getToolById } from "@/data/tools";
import { FiCopy, FiCheck, FiUser, FiMail, FiPhone, FiGlobe, FiBriefcase, FiImage } from "react-icons/fi";


const faqs = [
  { question: "How do I add the signature to Gmail?", answer: "Copy the HTML, go to Gmail Settings → Signature → paste in the signature editor." },
  { question: "Does it work with Outlook?", answer: "Yes, our signature is compatible with Gmail, Outlook, Apple Mail, and most email clients." },
  { question: "Can I add a photo?", answer: "Yes, add your photo URL or headshot in the Image URL field." },
  { question: "Is my signature mobile responsive?", answer: "Yes, our signatures are tested and look great on both desktop and mobile email clients." },
];

const steps = [
  { title: "Enter Your Details", desc: "Add your name, title, contact info and social links." },
  { title: "Choose Template", desc: "Pick a style that matches your brand or company." },
  { title: "Copy & Paste", desc: "Copy the HTML and paste into your email client settings." },
];

const templates = ["Modern", "Classic", "Minimal", "Bold"];

export default function EmailSignatureBuilder() {
  const [form, setForm] = useState({
    name: "", title: "", company: "", email: "",
    phone: "", website: "", photo: "", color: "#2563EB",
  });
  const [template, setTemplate] = useState("Modern");
  const [copied, setCopied] = useState(false);

  const update = (k, v) => setForm((p) => ({ ...p, [k]: v }));

  const html = `<table style="font-family:Arial,sans-serif;font-size:13px;color:#374151;border-collapse:collapse;">
  <tr>
    ${form.photo ? `<td style="padding-right:16px;vertical-align:top;"><img src="${form.photo}" width="64" height="64" style="border-radius:50%;display:block;" /></td>` : ""}
    <td style="border-left:3px solid ${form.color};padding-left:16px;vertical-align:top;">
      <p style="margin:0;font-size:16px;font-weight:700;color:#111;">${form.name || "Your Name"}</p>
      <p style="margin:2px 0 0;color:${form.color};font-size:13px;">${form.title || "Your Title"}${form.company ? ` · ${form.company}` : ""}</p>
      <p style="margin:8px 0 0;font-size:12px;color:#6B7280;">
        ${form.email ? `📧 <a href="mailto:${form.email}" style="color:#6B7280;text-decoration:none;">${form.email}</a>` : ""}
        ${form.phone ? `&nbsp;|&nbsp; 📞 ${form.phone}` : ""}
        ${form.website ? `&nbsp;|&nbsp; 🌐 <a href="${form.website}" style="color:${form.color};text-decoration:none;">${form.website.replace("https://","")}</a>` : ""}
      </p>
    </td>
  </tr>
</table>`;

  const copy = () => {
    navigator.clipboard.writeText(html);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <div className="bg-surface-2 border border-surface-3 rounded-2xl p-6 space-y-6">
        <h2 className="text-white font-heading font-bold text-xl">Email Signature Builder</h2>

        {/* Template Selector */}
        <div className="flex gap-2 flex-wrap">
          {templates.map((t) => (
            <button key={t} onClick={() => setTemplate(t)}
              className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${template === t ? "bg-accent text-white" : "bg-surface-3 text-gray-soft hover:text-white"}`}>
              {t}
            </button>
          ))}
        </div>

        {/* Form */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { key: "name", label: "Full Name", icon: FiUser, placeholder: "Jane Doe" },
            { key: "title", label: "Job Title", icon: FiBriefcase, placeholder: "Senior Designer" },
            { key: "company", label: "Company", icon: FiBriefcase, placeholder: "Acme Inc." },
            { key: "email", label: "Email", icon: FiMail, placeholder: "jane@acme.com" },
            { key: "phone", label: "Phone", icon: FiPhone, placeholder: "+1 555-0000" },
            { key: "website", label: "Website", icon: FiGlobe, placeholder: "https://acme.com" },
            { key: "photo", label: "Photo URL", icon: FiImage, placeholder: "https://example.com/photo.jpg" },
          ].map(({ key, label, icon: Icon, placeholder }) => (
            <div key={key}>
              <label className="text-gray-soft text-xs mb-1.5 block flex items-center gap-1.5">
                <Icon size={11} /> {label}
              </label>
              <input value={form[key]} onChange={(e) => update(key, e.target.value)}
                placeholder={placeholder} className="input-field text-sm" />
            </div>
          ))}
          <div>
            <label className="text-gray-soft text-xs mb-1.5 block">Brand Color</label>
            <input type="color" value={form.color} onChange={(e) => update("color", e.target.value)}
              className="w-full h-10 rounded-xl border border-surface-3 cursor-pointer bg-surface-3" />
          </div>
        </div>

        {/* Preview */}
        <div>
          <p className="text-white font-semibold text-sm mb-3">Live Preview</p>
          <div className="bg-white rounded-xl p-6 shadow-card">
            <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
              {form.photo && (
                <img src={form.photo} alt="avatar" style={{ width: 64, height: 64, borderRadius: "50%", objectFit: "cover", flexShrink: 0 }} />
              )}
              <div style={{ borderLeft: `3px solid ${form.color}`, paddingLeft: "16px" }}>
                <p style={{ margin: 0, fontSize: "16px", fontWeight: "700", color: "#111" }}>{form.name || "Your Name"}</p>
                <p style={{ margin: "2px 0 0", color: form.color, fontSize: "13px" }}>
                  {form.title || "Your Title"}{form.company ? ` · ${form.company}` : ""}
                </p>
                <p style={{ margin: "8px 0 0", fontSize: "12px", color: "#6B7280" }}>
                  {[form.email, form.phone, form.website].filter(Boolean).join(" | ")}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Copy HTML */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-white font-semibold text-sm">HTML Code</p>
            <button onClick={copy} className="btn-outline py-1.5 px-4 text-sm flex items-center gap-1.5">
              {copied ? <FiCheck size={13} /> : <FiCopy size={13} />}
              {copied ? "Copied!" : "Copy HTML"}
            </button>
          </div>
          <pre className="bg-surface-3 rounded-xl p-4 text-xs text-gray-soft overflow-x-auto whitespace-pre-wrap break-all font-mono max-h-40 overflow-y-auto">
            {html}
          </pre>
        </div>
      </div>
    </>
  );
}

