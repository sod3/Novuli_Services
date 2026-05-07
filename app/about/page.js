import React from "react";
import Link from "next/link";
import {
  FiZap,
  FiTarget,
  FiHeart,
  FiGlobe,
  FiArrowRight,
} from "react-icons/fi";

export const metadata = {
  title: "About Us | NovuliSurvices",
  description:
    "Learn more about NovuliSurvices and our approach to building fast, reliable, privacy-focused online tools designed for everyday work.",
};

const values = [
  {
    icon: FiZap,
    title: "Built for Efficiency",
    desc: "Our tools are designed to help you complete everyday tasks quickly without unnecessary steps, confusing layouts, or slow loading times.",
  },
  {
    icon: FiHeart,
    title: "Accessible to Everyone",
    desc: "We believe useful digital tools should be easy to access and simple to use, whether you're a student, freelancer, business owner, or remote team.",
  },
  {
    icon: FiTarget,
    title: "Focused User Experience",
    desc: "Every tool is built with a clear purpose. We prioritize usability, clarity, and practical features that solve real problems.",
  },
  {
    icon: FiGlobe,
    title: "Privacy & Trust",
    desc: "Whenever possible, processing happens directly in your browser to help protect your files and personal information.",
  },
];

export default function About() {
  return (
    <div className="pt-32 pb-20 bg-white">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <span className="badge mb-6 font-bold uppercase tracking-widest text-[10px] inline-block">
            About NovuliSurvices
          </span>

          <h1 className="text-5xl md:text-7xl font-display font-bold text-primary mb-8 tracking-tight leading-tight">
            Practical Online Tools <br />
            <span className="text-accent underline decoration-blue-100 underline-offset-8">
              Designed for Real Work
            </span>
          </h1>

          <p className="text-secondary text-xl leading-relaxed max-w-3xl mx-auto">
            NovuliSurvices was created to make useful online tools more
            accessible, reliable, and easier to use. We focus on building
            clean, professional utilities that help people complete everyday
            tasks without distractions, unnecessary complexity, or privacy
            concerns.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-24 bg-bg-gray border-y border-border-light">
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-display font-bold text-primary mb-6">
                Why We Built This Platform
              </h2>

              <p className="text-secondary text-lg leading-relaxed mb-6">
                Many online tools today are overloaded with intrusive ads,
                limited free access, unnecessary account requirements, or
                interfaces that make simple tasks harder than they need to be.
              </p>

              <p className="text-secondary text-lg leading-relaxed mb-6">
                We started NovuliSurvices to create a better alternative - a
                collection of focused tools that are straightforward, fast, and
                genuinely useful for everyday productivity.
              </p>

              <p className="text-secondary text-lg leading-relaxed">
                Whether you're editing files, converting formats, organizing
                information, or handling routine digital tasks, our goal is to
                provide tools that save time and work reliably across devices.
              </p>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-border-light shadow-xl shadow-blue-900/[0.03]">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                <span className="text-xs font-bold uppercase tracking-widest text-primary">
                  Platform Principles
                </span>
              </div>

              <div className="space-y-6">
                {[
                  ["Browser-Based Processing", "Designed with privacy in mind"],
                  ["Simple Interfaces", "Built for clarity and ease of use"],
                  ["Cross-Device Access", "Works across desktop and mobile"],
                ].map(([title, desc], i) => (
                  <div
                    key={i}
                    className="border-b border-gray-50 pb-4 last:border-0 last:pb-0"
                  >
                    <h3 className="text-lg font-semibold text-primary mb-1">
                      {title}
                    </h3>
                    <p className="text-secondary leading-relaxed">{desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-4xl font-display font-bold text-center text-primary mb-16">
            What Guides Our Work
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {values.map((v, i) => (
              <div
                key={i}
                className="bg-white border border-border-light p-8 rounded-2xl hover:border-accent transition-colors group"
              >
                <div className="w-12 h-12 bg-bg-gray rounded-xl flex items-center justify-center text-secondary group-hover:text-accent group-hover:bg-blue-50 transition-all mb-6">
                  <v.icon size={24} />
                </div>

                <h3 className="text-xl font-bold text-primary mb-3">
                  {v.title}
                </h3>

                <p className="text-secondary leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Closing Section */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-display font-bold text-primary mb-6">
            Explore Our Tools
          </h2>

          <p className="text-secondary text-xl mb-10 leading-relaxed">
            Discover a growing collection of online utilities built to simplify
            common digital tasks while maintaining a clean, reliable, and
            user-focused experience.
          </p>

          <Link
            href="/tools"
            className="btn-primary px-10 py-4 text-lg rounded-2xl inline-flex items-center gap-3"
          >
            Browse All Tools <FiArrowRight size={20} />
          </Link>
        </div>
      </section>
    </div>
  );
}