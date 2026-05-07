import React from "react";
import Link from 'next/link';
import { FiZap, FiTarget, FiHeart, FiGlobe, FiArrowRight } from "react-icons/fi";
import TestimonialCard from "@/components/TestimonialCard";
import { testimonials } from "@/data/tools";

export const metadata = {
  title: 'About Us | NovuliServices Story & Mission',
  description: 'Learn about NovuliServices — the team behind professional-grade free online tools trusted by thousands worldwide.',
};

const values = [
  { icon: FiZap, title: "Speed First", desc: "Every tool is engineered for instant results. No waiting, no BS." },
  { icon: FiHeart, title: "Free Forever", desc: "Core tools will always be free. We believe productivity shouldn't have a paywall." },
  { icon: FiTarget, title: "No Clutter", desc: "We show you the tool you need, not 50 distractions." },
  { icon: FiGlobe, title: "Privacy-First", desc: "Files processed in your browser. Nothing uploaded. Nothing stored." },
];

export default function About() {
  return (
    <div className="pt-32 pb-20 bg-white">
      {/* Hero */}
      <section className="relative py-20 overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="inline-block">
            <span className="badge mb-6 font-bold uppercase tracking-widest text-[10px]">Our Mission</span>
            <h1 className="text-5xl md:text-7xl font-display font-bold text-primary mb-8 tracking-tight">
              Built for the <br />
              <span className="text-accent underline decoration-blue-100 underline-offset-8">Modern Professional</span>
            </h1>
            <p className="text-secondary text-xl font-light leading-relaxed max-w-2xl mx-auto">
              NovuliServices started with a simple belief: professional-grade tools should be fast, free, and accessible to everyone without friction.
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-24 bg-bg-gray border-y border-border-light">
        <div className="max-w-4xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-display font-bold text-primary mb-6">Why we started.</h2>
              <p className="text-secondary text-lg font-light leading-relaxed mb-6">
                Online tools are often bloated with ads, require credit cards for "free trials", or have complex interfaces that slow you down.
              </p>
              <p className="text-secondary text-lg font-light leading-relaxed">
                We built NovuliServices to provide a suite of clean, specialized utilities that do exactly what you need — nothing more, nothing less.
              </p>
            </div>
            <div className="bg-white p-8 rounded-3xl border border-border-light shadow-xl shadow-blue-900/[0.03]">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                <span className="text-xs font-bold uppercase tracking-widest text-primary">Live Stats</span>
              </div>
              <div className="space-y-6">
                {[["50K+", "Daily Professionals"], ["1.2M", "Results Generated"], ["100%", "Private & Secure"]].map(([v, l], i) => (
                  <div key={i} className="flex items-center justify-between border-b border-gray-50 pb-4 last:border-0 last:pb-0">
                    <span className="text-secondary font-medium">{l}</span>
                    <span className="text-2xl font-display font-bold text-primary">{v}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-4xl font-display font-bold text-center text-primary mb-16">The Core Values</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {values.map((v, i) => (
              <div key={i} className="bg-white border border-border-light p-8 rounded-2xl hover:border-accent transition-colors group">
                <div className="w-12 h-12 bg-bg-gray rounded-xl flex items-center justify-center text-secondary group-hover:text-accent group-hover:bg-blue-50 transition-all mb-6">
                  <v.icon size={24} />
                </div>
                <h3 className="text-xl font-bold text-primary mb-2">{v.title}</h3>
                <p className="text-secondary font-light leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-bg-gray border-t border-border-light">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-3xl font-display font-bold text-center text-primary mb-16">Loved globally by teams at</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {testimonials.slice(0, 3).map((t, i) => <TestimonialCard key={i} testimonial={t} index={i} />)}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-display font-bold text-primary mb-6">Ready to work faster?</h2>
          <p className="text-secondary text-xl font-light mb-10 leading-relaxed">
            Explore our full directory of professional tools and join 50,000+ others today.
          </p>
          <Link href="/tools" className="btn-primary px-10 py-4 text-lg rounded-2xl inline-flex items-center gap-3">
            Explore All Tools <FiArrowRight size={20} />
          </Link>
        </div>
      </section>
    </div>
  );
}
