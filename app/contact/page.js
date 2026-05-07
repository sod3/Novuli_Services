'use client';
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiMail, FiMessageSquare, FiSend, FiCheck, FiMapPin} from "react-icons/fi";

// Note: We use client component because of form state, but we can't export metadata from here.
// In Next.js, to have metadata in a client component page, we usually wrap it or just use it.
// Actually, metadata MUST be in a server component.
// I'll create a layout.js for contact to handle metadata.

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  const update = (k, v) => setForm((p) => ({ ...p, [k]: v }));

  const submit = (e) => {
    e.preventDefault();
    setSending(true);
    setTimeout(() => { setSending(false); setSent(true); }, 1500);
  };

  return (
    <div className="pt-32 pb-20 bg-white">
      <div className="max-w-5xl mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
          <span className="badge mb-6 font-bold uppercase tracking-widest text-[10px]">Get In Touch</span>
          <h1 className="text-5xl md:text-6xl font-display font-bold text-primary mb-6 tracking-tight">We're here to help.</h1>
          <p className="text-secondary text-xl font-light leading-relaxed max-w-2xl mx-auto">Questions about our tools, feedback, or partnership inquiries? Drop us a line.</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          {/* Info Side */}
          <div className="space-y-12">
            {[
              { icon: FiMail, title: "Email Support", value: "solutions@novuli.com", desc: "Replies within 24 hours" },
              { icon: FiMessageSquare, title: "Product Feedback", value: "Submit a Suggestion", desc: "We love hearing your ideas" },
              { icon: FiMapPin, title: "Company", value: "Remote-first", desc: "Team across 3 continents" },
            ].map((c, i) => (
              <div key={i} className="flex gap-5">
                <div className="w-12 h-12 bg-bg-gray rounded-2xl flex items-center justify-center text-accent flex-shrink-0 border border-border-light shadow-sm">
                  <c.icon size={22} />
                </div>
                <div>
                  <h3 className="text-primary font-bold mb-1">{c.title}</h3>
                  <p className="text-accent font-medium text-sm mb-1">{c.value}</p>
                  <p className="text-secondary text-xs font-light">{c.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Form Side */}
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              {sent ? (
                <motion.div key="success" initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                  className="bg-green-50 border border-green-100 rounded-[2.5rem] p-16 text-center shadow-xl shadow-green-900/[0.03]">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 text-green-600">
                    <FiCheck size={40} />
                  </div>
                  <h3 className="text-primary font-display font-bold text-3xl mb-4">Message Sent!</h3>
                  <p className="text-secondary font-light text-lg">We've received your inquiry and will get back to you shortly.</p>
                </motion.div>
              ) : (
                <motion.form key="form" onSubmit={submit} className="bg-white border-2 border-border-light rounded-[2.5rem] p-8 md:p-12 shadow-2xl shadow-blue-900/[0.03]">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div className="space-y-2">
                      <label className="text-secondary text-xs font-bold uppercase tracking-widest ml-1">Full Name</label>
                      <input 
                        value={form.name} 
                        onChange={(e) => update("name", e.target.value)} 
                        required
                        placeholder="John Doe" 
                        className="w-full bg-bg-gray border border-border-light rounded-xl px-5 py-4 focus:outline-none focus:border-accent text-primary transition-all font-light" 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-secondary text-xs font-bold uppercase tracking-widest ml-1">Work Email</label>
                      <input 
                        type="email" 
                        value={form.email} 
                        onChange={(e) => update("email", e.target.value)} 
                        required
                        placeholder="name@company.com" 
                        className="w-full bg-bg-gray border border-border-light rounded-xl px-5 py-4 focus:outline-none focus:border-accent text-primary transition-all font-light" 
                      />
                    </div>
                  </div>
                  <div className="space-y-2 mb-8">
                    <label className="text-secondary text-xs font-bold uppercase tracking-widest ml-1">Subject</label>
                    <div className="relative">
                      <select 
                        value={form.subject} 
                        onChange={(e) => update("subject", e.target.value)} 
                        className="w-full bg-bg-gray border border-border-light rounded-xl px-5 py-4 focus:outline-none focus:border-accent text-primary transition-all font-light appearance-none"
                      >
                        <option value="">Select an option...</option>
                        <option>General Support</option>
                        <option>Feature Request</option>
                        <option>Partnership Inquiry</option>
                        <option>Bug Report</option>
                      </select>
                      <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-secondary">
                        <FiCheck className="rotate-90" />
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2 mb-10">
                    <label className="text-secondary text-xs font-bold uppercase tracking-widest ml-1">Your Message</label>
                    <textarea 
                      value={form.message} 
                      onChange={(e) => update("message", e.target.value)} 
                      required
                      placeholder="How can we help you today?" 
                      rows={6}
                      className="w-full bg-bg-gray border border-border-light rounded-xl px-5 py-4 focus:outline-none focus:border-accent text-primary transition-all font-light resize-none" 
                    />
                  </div>
                  <button 
                    type="submit" 
                    disabled={sending}
                    className="btn-primary w-full py-5 text-xl rounded-2xl flex items-center justify-center gap-3 active:scale-[0.98] transition-transform"
                  >
                    {sending ? (
                      <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    ) : (
                      <>
                        Send Message <FiSend />
                      </>
                    )}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
