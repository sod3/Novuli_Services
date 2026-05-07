'use client';
import { useState } from 'react';
import Link from 'next/link';
import { FiMail, FiArrowRight, FiShield } from 'react-icons/fi';
import { tools } from '@/data/tools';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) { setSubscribed(true); setEmail(''); }
  };

  const topTools = tools.slice(0, 6);
  const resourceLinks = [
    { label: 'Tools Directory', href: '/tools' },
    { label: 'Blog & Guides', href: '/blog' },
    { label: 'About Us', href: '/about' },
    { label: 'Contact', href: '/contact' },
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
  ];

  return (
    <footer className="bg-white border-t border-border-light pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 mb-16">
          <div className="lg:col-span-5">
            <Link href="/" className="flex items-center gap-2 mb-6">
              <img src="/favicon.png" alt="NovuliServices" className="w-16 h-16 object-contain" />
            </Link>
            <h3 className="text-2xl font-display font-bold text-primary mb-4 max-w-sm">
              Premium utilities for <span className="text-accent">modern growth</span>.
            </h3>
            <p className="text-secondary text-sm font-light mb-8 max-w-md">
              Join 50,000+ professionals getting weekly templates, SEO secrets, and productivity boosts.
            </p>
            {subscribed ? (
              <div className="bg-green-50 text-green-700 p-4 rounded-2xl border border-green-100 flex items-center gap-3">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white">✓</div>
                <p className="font-bold text-sm">Subscribed! Welcome aboard.</p>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md">
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="name@company.com" className="flex-grow input-field" required />
                <button type="submit" className="bg-primary text-white font-bold py-3 px-6 rounded-xl hover:bg-accent transition-all flex items-center gap-2 whitespace-nowrap">
                  Join Free <FiArrowRight />
                </button>
              </form>
            )}
          </div>

          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8">
            <div>
              <h4 className="text-primary font-bold text-xs uppercase tracking-widest mb-6">Popular Tools</h4>
              <ul className="space-y-3">
                {topTools.map((tool) => (
                  <li key={tool.id}>
                    <Link href={tool.slug} className="text-secondary hover:text-accent transition-colors text-sm">{tool.name}</Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-primary font-bold text-xs uppercase tracking-widest mb-6">Resources</h4>
              <ul className="space-y-3">
                {resourceLinks.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-secondary hover:text-accent transition-colors text-sm">{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-primary font-bold text-xs uppercase tracking-widest mb-6">Contact Us</h4>
              <ul className="space-y-3 text-sm text-secondary">
                <li><a href="mailto:support@novuliservices.com" className="hover:text-accent transition-colors flex items-center gap-2"><FiMail size={14} /> support@novuliservices.com</a></li>
                <li className="font-light">Mon–Fri, 9am–6pm GMT</li>
                <li className="font-light">Response within 24 hours</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="border-t border-border-light pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-secondary text-xs font-bold uppercase tracking-widest">
          <div className="flex items-center gap-4">
            <p>© 2026 NovuliServices. All rights reserved.</p>
            <Link href="/privacy" className="hover:text-primary">Privacy</Link>
            <Link href="/terms" className="hover:text-primary">Terms</Link>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-bg-gray rounded-full border border-border-light">
            <FiShield className="text-accent" /> 256-bit SSL Secure
          </div>
        </div>
      </div>
    </footer>
  );
}
