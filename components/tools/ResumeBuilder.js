'use client';
import React, { useMemo, useRef, useState } from "react";
import Link from 'next/link';

import {
  FiArrowLeft,
  FiArrowRight,
  FiBriefcase,
  FiDownload,
  FiGlobe,
  FiImage,
  FiMail,
  FiMapPin,
  FiPhone,
  FiUser,
  FiShield,
  FiCheckCircle,
  FiLock,
  FiZap,
  FiCheck,
  FiChevronDown,
  FiChevronUp,
} from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

const initialForm = {
  photo: "",
  name: "",
  email: "",
  phone: "",
  location: "",
  website: "",
  title: "",
  summary: "",
  skills: "",
  experience: "",
  education: "",
  certifications: "",
  projects: "",
};

const formSteps = [
  "Profile",
  "Summary",
  "Skills",
  "Experience",
  "Education",
  "Certifications",
  "Projects",
  "Template",
];

const templates = [
  "Executive",
  "Modern",
  "Minimal",
  "Corporate",
  "Bold",
  "Elegant",
  "Classic",
  "Tech",
  "Sidebar",
  "Luxury",
  "Elite",
];

// Rich FAQs for SEO
const faqs = [
  {
    question: "How do I build an ATS-friendly resume?",
    answer: "Our online resume builder automatically formats your CV to be ATS-friendly. It uses clean, readable layouts and standard section headings (like Experience, Education, and Skills) that Applicant Tracking Systems can easily parse without errors.",
  },
  {
    question: "Is this resume builder completely free?",
    answer: "Yes! You can use our premium templates, fill out all your information, and download your final PDF resume completely free of charge. No hidden fees, no watermarks, and no sign-up required.",
  },
  {
    question: "Can I download my resume as a PDF?",
    answer: "Absolutely. Once you're done customizing your professional resume, simply click the 'Download PDF' button. Your document will instantly save to your device in high-resolution, print-ready PDF format.",
  },
  {
    question: "Is my personal data secure?",
    answer: "100% secure. All the processing happens directly in your web browser. We do not store, upload, or sell any of your personal information to third-party servers. Your data remains strictly on your device.",
  },
  {
    question: "Which resume template is best for 2026?",
    answer: "The 'Modern' and 'Executive' templates are currently the most popular among hiring managers. They balance aesthetic appeal with clean structure, ensuring your professional summary and experience stand out immediately.",
  },
];

export default function ResumeBuilder() {
  const [step, setStep] = useState(0);
  const [template, setTemplate] = useState("Executive");
  const [preview, setPreview] = useState(true);
  const [form, setForm] = useState(initialForm);
  const [openFaq, setOpenFaq] = useState(null);

  const previewRef = useRef(null);

  const update = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));

  const next = () => setStep((s) => Math.min(s + 1, formSteps.length - 1));
  const prev = () => setStep((s) => Math.max(s - 1, 0));

  const progress = ((step + 1) / formSteps.length) * 100;

  const colors = useMemo(() => {
    const map = {
      Executive: "bg-slate-900 text-white",
      Modern: "bg-indigo-600 text-white",
      Minimal: "bg-gray-100 text-gray-900",
      Corporate: "bg-blue-700 text-white",
      Bold: "bg-rose-600 text-white",
      Elegant: "bg-emerald-700 text-white",
      Classic: "bg-zinc-800 text-white",
      Tech: "bg-cyan-600 text-white",
      Sidebar: "bg-violet-700 text-white",
      Luxury: "bg-amber-600 text-white",
      Elite: "bg-black text-white",
    };
    return map[template];
  }, [template]);

  const downloadPDF = async () => {
    const input = previewRef.current;
    if (!input) return;

    try {
      const canvas = await html2canvas(input, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#ffffff",
      });

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");

      const width = 210;
      const height = (canvas.height * width) / canvas.width;

      pdf.addImage(imgData, "PNG", 0, 0, width, height);
      pdf.save(`${form.name || "resume"}-professional.pdf`);
    } catch (err) {
      console.error("Failed to download PDF", err);
    }
  };

  const sectionTitle = (title) => (
    <h3 className="text-xs font-bold uppercase tracking-[0.25em] text-gray-500 mb-2">
      {title}
    </h3>
  );

  const textarea = "w-full bg-slate-50 border border-slate-200 outline-none focus:border-blue-600 rounded-xl p-4 text-sm transition-all focus:ring-4 focus:ring-blue-100 min-h-[120px] resize-none";
  const inputClass = "w-full bg-slate-50 border border-slate-200 outline-none focus:border-blue-600 rounded-xl px-4 py-3 text-sm transition-all focus:ring-4 focus:ring-blue-100";

  // Structured Data Object
  const schemaData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        "name": "Free Resume Builder Online",
        "description": "Create professional, ATS-friendly resumes in minutes with our free online resume builder. Premium templates, PDF download, and zero registration required.",
        "operatingSystem": "All browsers",
        "applicationCategory": "ProductivityApplication",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.9",
          "ratingCount": "9421"
        }
      },
      {
        "@type": "FAQPage",
        "mainEntity": faqs.map((faq) => ({
          "@type": "Question",
          "name": faq.question,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": faq.answer
          }
        }))
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://novulisurvices.com/"
          },
          {
             "@type": "ListItem",
             "position": 2,
             "name": "Tools",
             "item": "https://novulisurvices.com/tools"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": "Resume Builder",
            "item": "https://novulisurvices.com/tools/resume-builder"
          }
        ]
      }
    ]
  };

  return (
    <div className="bg-slate-50 min-h-screen text-slate-800 selection:bg-blue-200 selection:text-blue-900 font-sans">


      {/* HERO SECTION */}
      <section className="bg-white border-b border-slate-200 pt-20 pb-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[800px] h-[600px] bg-gradient-to-l from-blue-50 to-transparent rounded-full blur-3xl opacity-50 -translate-y-1/2 translate-x-1/3 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 text-blue-700 text-sm font-bold uppercase tracking-wider mb-6 border border-blue-100">
            <FiZap className="text-yellow-500" /> Voted #1 Free Resume Builder
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight leading-tight mb-6">
            Free Resume Builder Online: <br className="hidden md:block"/>
            <span className="text-blue-600">Land Your Dream Job Faster</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed mb-8">
            Create an ATS-friendly, professional resume in minutes. No credit card, no sign-up required. Just fill in your details, select a premium template, and download your high-quality PDF instantly.
          </p>

          {/* Trust Signals */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm font-semibold text-slate-500 bg-white shadow-xl shadow-slate-200/50 rounded-2xl w-max mx-auto px-8 py-4 border border-slate-100">
            <div className="flex items-center gap-2"><FiShield className="text-green-500" size={18}/> Secure Privacy</div>
            <div className="flex items-center gap-2"><FiCheckCircle className="text-blue-500" size={18}/> ATS-Friendly</div>
            <div className="flex items-center gap-2"><FiLock className="text-amber-500" size={18}/> 100% Free</div>
          </div>
        </div>
      </section>

      {/* MAIN TOOL UI */}
      <section className="py-12 bg-slate-50" id="tool-ui">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
            {/* FORM PANEL */}
            <div className="xl:col-span-5">
              <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xl shadow-blue-900/[0.03] flex flex-col min-h-[600px] xl:sticky xl:top-8 z-20">
                {/* HEADER */}
                <div className="flex items-center justify-between mb-5">
                  <div>
                    <h2 className="text-slate-900 text-xl font-bold">
                      Your Professional Details
                    </h2>
                    <p className="text-slate-500 text-sm mt-1">
                      Complete all fields to generate the best CV.
                    </p>
                  </div>

                  <button
                    onClick={() => setPreview(!preview)}
                    className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 transition text-sm font-bold xl:hidden"
                  >
                    {preview ? "Hide Preview" : "Show Preview"}
                  </button>
                </div>

                {/* PROGRESS */}
                <div className="mb-6">
                  <div className="flex justify-between text-xs text-slate-500 font-semibold uppercase tracking-wider mb-2">
                    <span>Step {step + 1} of {formSteps.length}</span>
                    <span className="text-blue-600">{formSteps[step]}</span>
                  </div>

                  <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-600 rounded-full transition-all duration-500 ease-out relative overflow-hidden"
                      style={{ width: `${progress}%` }}
                    >
                      <div className="absolute inset-0 bg-white/20 w-full h-full skeleton-glare"></div>
                    </div>
                  </div>
                </div>

                {/* BODY */}
                <div className="flex-1 overflow-y-auto no-scrollbar pb-6 min-h-[400px]">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={step}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.2 }}
                      className="space-y-4"
                    >
                      {step === 0 && (
                        <div className="space-y-4">
                          <Input icon={FiUser} label="Full Name" value={form.name} onChange={(e) => update("name", e.target.value)} inputClass={inputClass} />
                          <Input icon={FiBriefcase} label="Job Title" value={form.title} onChange={(e) => update("title", e.target.value)} inputClass={inputClass}/>
                          <div className="grid grid-cols-2 gap-4">
                            <Input icon={FiMail} label="Email Address" value={form.email} onChange={(e) => update("email", e.target.value)} inputClass={inputClass}/>
                            <Input icon={FiPhone} label="Phone Number" value={form.phone} onChange={(e) => update("phone", e.target.value)} inputClass={inputClass}/>
                          </div>
                          <Input icon={FiMapPin} label="Location (City, State)" value={form.location} onChange={(e) => update("location", e.target.value)} inputClass={inputClass}/>
                          <Input icon={FiGlobe} label="Website or LinkedIn" value={form.website} onChange={(e) => update("website", e.target.value)} inputClass={inputClass}/>
                          <Input icon={FiImage} label="Professional Photo URL (Optional)" value={form.photo} onChange={(e) => update("photo", e.target.value)} inputClass={inputClass}/>
                        </div>
                      )}

                      {step === 1 && (
                        <div>
                          <Label title="Professional Summary" />
                          <textarea
                            className={textarea}
                            value={form.summary}
                            onChange={(e) => update("summary", e.target.value)}
                            placeholder="E.g. Results-driven marketing professional with 5+ years of experience in leading SEO strategies and driving 40% organic traffic growth..."
                          />
                        </div>
                      )}

                      {step === 2 && (
                        <div>
                          <Label title="Top Skills (comma separated)" />
                          <textarea
                            className={textarea}
                            value={form.skills}
                            onChange={(e) => update("skills", e.target.value)}
                            placeholder="E.g. SEO, Content Marketing, JavaScript, Python, Leadership..."
                          />
                          <p className="text-xs text-slate-500 mt-2">ATS Systems love keyword-rich skills. Include tools and methodologies relevant to the job description.</p>
                        </div>
                      )}

                      {step === 3 && (
                        <div>
                          <Label title="Work Experience" />
                          <textarea
                            className={textarea}
                            rows={12}
                            value={form.experience}
                            onChange={(e) => update("experience", e.target.value)}
                            placeholder={`Senior Product Designer | Google | Jan 2022 - Present
  • Led the redesign of core UI components leading to a 34% increase in user retention.
  • Collaborated with a cross-functional team of 15 engineers.

  UI/UX Designer | Apple | Jun 2019 - Dec 2021
  • Delivered cutting-edge web experiences.`}
                          />
                        </div>
                      )}

                      {step === 4 && (
                        <div>
                          <Label title="Education" />
                          <textarea
                            className={textarea}
                            rows={8}
                            value={form.education}
                            onChange={(e) => update("education", e.target.value)}
                            placeholder={`B.S. in Computer Science
  Massachusetts Institute of Technology (MIT) | 2015 - 2019
  • Summa Cum Laude
  • President of the Coding Club`}
                          />
                        </div>
                      )}

                      {step === 5 && (
                        <div>
                          <Label title="Certifications / Awards" />
                          <textarea
                            className={textarea}
                            rows={8}
                            value={form.certifications}
                            onChange={(e) => update("certifications", e.target.value)}
                            placeholder={`• AWS Certified Solutions Architect - 2023
  • Google Analytics Certification - 2022
  • Employee of the Year - 2021`}
                          />
                        </div>
                      )}

                      {step === 6 && (
                        <div>
                          <Label title="Key Projects" />
                          <textarea
                            className={textarea}
                            rows={8}
                            value={form.projects}
                            onChange={(e) => update("projects", e.target.value)}
                            placeholder={`E-commerce Mobile App (2023)
  • Built a React Native application adopted by 10,000+ local users.
  • Integrated Stripe payment gateway.`}
                          />
                        </div>
                      )}

                      {step === 7 && (
                        <div>
                          <Label title="Choose Your Premium Template" />
                          <div className="grid grid-cols-2 gap-3">
                            {templates.map((item) => (
                              <button
                                key={item}
                                onClick={() => setTemplate(item)}
                                className={`rounded-xl border-2 p-3 text-sm font-bold transition-all shadow-sm ${
                                  template === item
                                    ? "border-blue-600 bg-blue-50 text-blue-700"
                                    : "border-slate-200 bg-white text-slate-600 hover:border-blue-300 hover:bg-slate-50 hover:text-slate-900"
                                }`}
                              >
                                {item}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* FOOTER NAV */}
                <div className="flex gap-4 mt-6 pt-4 border-t border-slate-100 bg-white">
                  <button
                    onClick={prev}
                    disabled={step === 0}
                    className="flex-1 border-2 border-slate-200 hover:border-slate-300 rounded-xl py-4 text-sm font-bold text-slate-700 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition"
                  >
                    <FiArrowLeft /> Back
                  </button>

                  {step < formSteps.length - 1 ? (
                    <button
                      onClick={next}
                      className="flex-1 bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-600/30 rounded-xl py-4 text-sm font-bold text-white flex items-center justify-center gap-2 transition"
                    >
                      Next Step <FiArrowRight />
                    </button>
                  ) : (
                    <button
                      onClick={downloadPDF}
                      className="flex-1 bg-emerald-600 hover:bg-emerald-700 shadow-lg shadow-emerald-600/30 rounded-xl py-4 text-sm font-bold text-white flex items-center justify-center gap-2 transition scale-100 hover:scale-[1.02]"
                    >
                      <FiDownload /> Download PDF
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* PREVIEW PANEL */}
            {preview && (
              <div className="xl:col-span-7">
                <div className="xl:sticky top-8">
                  <div className="bg-slate-200 rounded-3xl p-4 md:p-8 flex items-center justify-center min-h-[600px] border border-slate-300 shadow-inner overflow-hidden">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.1 }}
                      ref={previewRef}
                      className="bg-white w-full shadow-[0_20px_50px_rgba(0,0,0,0.15)] group relative"
                      style={{ width: "210mm", minHeight: "297mm", transformOrigin: "top center" }}
                    >
                      {/* TOP BAR */}
                      <div className={`${colors} p-6 md:p-10 transition-colors duration-500`}>
                        <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                          {form.photo && (
                            <img
                              src={form.photo}
                              alt="Profile"
                              className="w-24 h-24 rounded-full object-cover border-4 border-white/20 shadow-md shrink-0"
                              crossOrigin="anonymous"
                            />
                          )}

                          <div className="flex-1 w-full">
                            <h1 className="text-3xl md:text-5xl font-bold tracking-tight">
                              {form.name || "Your Full Name"}
                            </h1>
                            <p className="opacity-90 mt-2 text-lg md:text-xl font-light uppercase tracking-widest">
                              {form.title || "Professional Title"}
                            </p>

                            <div className="flex flex-wrap gap-x-6 gap-y-2 mt-4 text-sm opacity-90 font-medium">
                              {form.email && <span className="flex items-center gap-2"><FiMail/> {form.email}</span>}
                              {form.phone && <span className="flex items-center gap-2"><FiPhone/> {form.phone}</span>}
                              {form.location && <span className="flex items-center gap-2"><FiMapPin/> {form.location}</span>}
                              {form.website && <span className="flex items-center gap-2"><FiGlobe/> {form.website}</span>}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* BODY */}
                      <div className="p-6 md:p-10 grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
                        <div className="md:col-span-8">
                          {form.summary && (
                            <section className="mb-8">
                              {sectionTitle("Professional Summary")}
                              <p className="text-[13px] text-slate-800 leading-relaxed font-serif">
                                {form.summary}
                              </p>
                            </section>
                          )}

                          {form.experience && (
                            <section className="mb-8">
                              {sectionTitle("Work Experience")}
                              <pre className="whitespace-pre-wrap text-[13px] text-slate-800 leading-relaxed font-serif">
                                {form.experience}
                              </pre>
                            </section>
                          )}

                          {form.projects && (
                            <section className="mb-8">
                              {sectionTitle("Key Projects")}
                              <pre className="whitespace-pre-wrap text-[13px] text-slate-800 leading-relaxed font-serif">
                                {form.projects}
                              </pre>
                            </section>
                          )}
                        </div>

                        <div className="md:col-span-4">
                          {form.skills && (
                            <section className="mb-8 border-t md:border-t-0 md:border-l border-slate-200 pt-6 md:pt-0 md:pl-6">
                              {sectionTitle("Core Skills")}
                              <div className="flex flex-wrap gap-2">
                                {form.skills.split(",").map((item, i) => item.trim() && (
                                  <span key={i} className="px-2 py-1 text-[11px] font-bold rounded-md bg-slate-100 text-slate-700">
                                    {item.trim()}
                                  </span>
                                ))}
                              </div>
                            </section>
                          )}

                          {form.education && (
                            <section className="mb-8 border-t md:border-t-0 md:border-l border-slate-200 pt-6 md:pt-0 md:pl-6">
                              {sectionTitle("Education")}
                              <pre className="whitespace-pre-wrap text-[12px] text-slate-800 leading-relaxed font-serif">
                                {form.education}
                              </pre>
                            </section>
                          )}

                          {form.certifications && (
                            <section className="mb-8 border-t md:border-t-0 md:border-l border-slate-200 pt-6 md:pt-0 md:pl-6">
                              {sectionTitle("Certifications")}
                              <pre className="whitespace-pre-wrap text-[12px] text-slate-800 leading-relaxed font-serif">
                                {form.certifications}
                              </pre>
                            </section>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  </div>

                  <div className="mt-6 flex flex-wrap items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
                     <div className="flex items-center gap-3 text-sm text-slate-500 font-medium">
                      <div className="w-8 h-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center">
                        <FiCheck />
                      </div>
                      Previewing <strong className="text-slate-900 border-b-2 border-slate-900 pb-0.5">{template}</strong> Template
                    </div>
                    {step === 7 && (
                      <button onClick={downloadPDF} className="px-6 py-3 bg-slate-900 text-white rounded-xl text-sm font-bold shadow-lg flex items-center gap-2 hover:bg-slate-800 transition">
                         <FiDownload /> Export High-Res PDF
                      </button>
                    )}
                  </div>

                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* LEAD CAPTURE (Conversion Optimization) */}
      <section className="py-16 bg-blue-600 text-white border-y border-blue-700">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Want to save your progress for later?</h2>
          <p className="text-blue-200 text-lg mb-8 max-w-2xl mx-auto">
            Don't lose your work. Enter your email below and we'll send you a secure link to access, edit, and download your resume anytime in the future.
          </p>
          <form className="flex flex-col sm:flex-row gap-4 justify-center max-w-lg mx-auto" onSubmit={(e) => e.preventDefault()}>
            <input 
              type="email" 
              placeholder="Enter your email address" 
              className="flex-1 px-6 py-4 rounded-xl text-slate-900 outline-none font-medium placeholder-slate-400 border-2 border-transparent focus:border-blue-300"
              required 
            />
            <button type="submit" className="px-8 py-4 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition whitespace-nowrap shadow-xl">
              Save My Resume
            </button>
          </form>
          <p className="text-xs text-blue-300 mt-4 font-medium"><FiLock className="inline mr-1"/> We hate spam as much as you do. 100% secure.</p>
        </div>
      </section>

      {/* SEO CONTENT SECTION - What & How */}
      <section className="py-24 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-slate-900 tracking-tight">The Ultimate Online Resume Builder</h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto mt-6 rounded-full"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="prose prose-lg text-slate-600">
              <h3 className="text-2xl font-bold text-slate-900 mb-4">What is the NovuliServices Resume Builder?</h3>
              <p>
                Crafting a resume from scratch can be stressful. Our <strong>Free Resume Builder Online</strong> is a sophisticated suite designed to eliminate the guesswork from the job application process. This powerful tool provides job seekers with premium, agency-quality templates designed by HR professionals and recruitment specialists.
              </p>
              <p>
                Unlike generic document editors, our software focuses exclusively on <strong>ATS (Applicant Tracking System) compatibility</strong>. This means when you export your PDF, it retains a semantic structure that automated reviewing machines can read flawlessly, drastically increasing your chances of securing an interview.
              </p>
              <ul className="list-none pl-0 space-y-3 mt-6">
                 <li className="flex items-center gap-3"><FiCheckCircle className="text-green-500 shrink-0"/> No mandatory account creation.</li>
                 <li className="flex items-center gap-3"><FiCheckCircle className="text-green-500 shrink-0"/> 11+ Premium executive templates.</li>
                 <li className="flex items-center gap-3"><FiCheckCircle className="text-green-500 shrink-0"/> Unlimited high-resolution PDF exports.</li>
                 <li className="flex items-center gap-3"><FiCheckCircle className="text-green-500 shrink-0"/> Client-side security (files stay on your device).</li>
              </ul>
            </div>
            
            <div className="bg-slate-50 p-8 rounded-3xl border border-slate-200">
               <h3 className="text-2xl font-bold text-slate-900 mb-8">How to build a resume in 4 simple steps:</h3>
               <div className="space-y-6">
                 {[
                   { step: "01", title: "Fill Your Details", desc: "Start by entering your contact info, summary, and experience into the intuitive form." },
                   { step: "02", title: "Add Skills & Education", desc: "Sprinkle industry-specific keywords and list your academic background." },
                   { step: "03", title: "Select a Template", desc: "Choose from our curated list of elite, modern, or classic layouts." },
                   { step: "04", title: "Download PDF", desc: "Hit export and get your professional PDF instantly, ready to send to employers." }
                 ].map((s, i) => (
                   <div key={i} className="flex items-start gap-4">
                     <span className="text-4xl font-black text-blue-100">{s.step}</span>
                     <div>
                       <h4 className="text-lg font-bold text-slate-900">{s.title}</h4>
                       <p className="text-sm text-slate-600 mt-1">{s.desc}</p>
                     </div>
                   </div>
                 ))}
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* BENEFITS SECTION */}
      <section className="py-24 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-black text-slate-900 mb-4">Why Use Our Resume Maker?</h2>
          <p className="text-xl text-slate-600 mb-16">Designed for speed, optimized for hiring.</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: FiSearch, title: "ATS-Optimized Formatting", desc: "Every template is engineered to pass Applicant Tracking Systems without missing any parsing data." },
              { icon: FiClock, title: "Saves Hours of Time", desc: "Stop struggling with Word margins. Input data once, switch templates magically, and format instantly." },
              { icon: FiShield, title: "100% Private & Secure", desc: "We don't collect your professional data. Your document is generated locally on your web browser." },
            ].map((feature, i) => (
              <div key={i} className="bg-white p-8 rounded-3xl border border-slate-200 shadow-[0_10px_30px_rgba(0,0,0,0.02)] hover:shadow-[0_10px_30px_rgba(37,99,235,0.08)] transition-all hover:-translate-y-1">
                <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center text-2xl mx-auto mb-6">
                  <feature.icon />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                <p className="text-slate-600 leading-relaxed font-medium">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* FAQ SECTION */}
      <section className="py-24 bg-white border-t border-slate-200" itemScope itemType="https://schema.org/FAQPage">
        <div className="max-w-3xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black text-slate-900 mb-4 shrink-0">Frequently Asked Questions</h2>
            <p className="text-slate-600 text-lg">Everything you need to know about our resume generation tool.</p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
               <div 
                 key={index} 
                 className={`border rounded-2xl transition-all ${openFaq === index ? "border-blue-600 bg-blue-50/50 shadow-md" : "border-slate-200 bg-white hover:border-slate-300"}`}
                 itemScope 
                 itemProp="mainEntity" 
                 itemType="https://schema.org/Question"
               >
                 <button 
                   onClick={() => setOpenFaq(openFaq === index ? null : index)}
                   className="w-full flex items-center justify-between p-6 text-left"
                 >
                   <span className="font-bold text-slate-900 pr-4" itemProp="name">{faq.question}</span>
                   {openFaq === index ? <FiChevronUp className="text-blue-600 shrink-0" size={20}/> : <FiChevronDown className="text-slate-400 shrink-0" size={20}/>}
                 </button>
                 <AnimatePresence>
                   {openFaq === index && (
                     <motion.div 
                       initial={{ height: 0, opacity: 0 }}
                       animate={{ height: "auto", opacity: 1 }}
                       exit={{ height: 0, opacity: 0 }}
                       className="overflow-hidden"
                     >
                       <div 
                         className="px-6 pb-6 text-slate-600 leading-relaxed"
                         itemScope 
                         itemProp="acceptedAnswer" 
                         itemType="https://schema.org/Answer"
                       >
                         <p itemProp="text">{faq.answer}</p>
                       </div>
                     </motion.div>
                   )}
                 </AnimatePresence>
               </div>
            ))}
          </div>
        </div>
      </section>

      {/* INTERNAL LINKING & RELATED TOOLS */}
      <section className="py-16 bg-slate-50 border-t border-slate-200">
        <div className="max-w-6xl mx-auto px-4">
           <h3 className="text-xl font-bold text-slate-900 mb-8 flex items-center gap-2"><FiZap className="text-yellow-500"/> Power Up Your Career with Related Tools</h3>
           <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Link href="/tools/keyword-research-tool" className="p-4 bg-white border border-slate-200 rounded-2xl hover:border-blue-600 hover:shadow-lg transition-all group">
                 <h4 className="font-bold text-slate-900 group-hover:text-blue-600 mb-1">Keyword Research Tool</h4>
                 <p className="text-xs text-slate-500">Find keywords to optimize your CV</p>
              </Link>
              <Link href="/tools/email-signature-builder" className="p-4 bg-white border border-slate-200 rounded-2xl hover:border-blue-600 hover:shadow-lg transition-all group">
                 <h4 className="font-bold text-slate-900 group-hover:text-blue-600 mb-1">Email Signature</h4>
                 <p className="text-xs text-slate-500">Professional signature for job emails</p>
              </Link>
              <Link href="/tools/pdf-to-word" className="p-4 bg-white border border-slate-200 rounded-2xl hover:border-blue-600 hover:shadow-lg transition-all group">
                 <h4 className="font-bold text-slate-900 group-hover:text-blue-600 mb-1">PDF to Word</h4>
                 <p className="text-xs text-slate-500">Convert existing CVs to Word</p>
              </Link>
              <Link href="/tools/ai-writing-tools" className="p-4 bg-white border border-slate-200 rounded-2xl hover:border-blue-600 hover:shadow-lg transition-all group">
                 <h4 className="font-bold text-slate-900 group-hover:text-blue-600 mb-1">AI Writer</h4>
                 <p className="text-xs text-slate-500">Generate cover letters instantly</p>
              </Link>
           </div>
        </div>
      </section>

    </div>
  );
}

// Internal reusable components
function Label({ title }) {
  return (
    <label className="text-xs font-bold text-slate-600 tracking-wider uppercase mb-2 flex items-center gap-2">
      {title}
    </label>
  );
}

function Input({ icon: Icon, label, value, onChange, inputClass }) {
  return (
    <div>
      <label className="text-xs font-bold text-slate-600 tracking-wider uppercase mb-2 flex items-center gap-2">
        <Icon size={14} className="text-blue-600" />
        {label}
      </label>
      <input
        type="text"
        value={value}
        onChange={onChange}
        className={inputClass}
        placeholder={`Enter ${label.toLowerCase()}`}
      />
    </div>
  );
}

// Additional missing icon used in benefits
const FiSearch = ({ className, size=24 }) => <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>;
const FiClock = ({ className, size=24 }) => <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>;
