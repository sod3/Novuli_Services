'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FiSearch, FiMenu, FiX, FiZap, FiChevronRight, FiTrendingUp } from 'react-icons/fi';
import { searchTools } from '@/data/tools';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showSearch, setShowSearch] = useState(false);
  const searchRef = useRef(null);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setMobileOpen(false); setShowSearch(false); }, [pathname]);
  useEffect(() => { setSearchResults(searchTools(searchQuery).slice(0, 5)); }, [searchQuery]);
  useEffect(() => {
    const handler = (e) => { if (searchRef.current && !searchRef.current.contains(e.target)) setShowSearch(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const navLinks = [
    { label: 'Tools', href: '/tools' },
    { label: 'Blog', href: '/blog' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-md border-b border-border-light shadow-lg py-2' : 'bg-white border-b border-transparent py-4'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          <Link href="/" className="flex items-center gap-2 group flex-shrink-0">
            <div className="w-24 h-16 group-hover:scale-105 transition-all">
              <img src="/novlogo.png" alt="NovuliServices Logo" className="w-full h-full object-contain" />
            </div>
          </Link>

          {/* Desktop Search */}
          <div className="hidden lg:flex flex-1 max-w-md mx-8" ref={searchRef}>
            <div className="relative w-full group">
              <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-accent transition-colors" />
              <input
                type="text" value={searchQuery}
                onChange={(e) => { setSearchQuery(e.target.value); setShowSearch(true); }}
                onFocus={() => setShowSearch(true)}
                placeholder="Search 17+ tools..."
                className="w-full bg-bg-gray border-2 border-transparent text-primary placeholder-gray-400 rounded-2xl pl-12 pr-4 py-2.5 text-sm focus:outline-none focus:border-accent focus:bg-white transition-all"
              />
              {showSearch && searchResults.length > 0 && (
                <div className="absolute top-full mt-3 w-full bg-white border border-border-light rounded-2xl shadow-xl overflow-hidden z-50 p-2">
                  {searchResults.map((tool) => (
                    <Link key={tool.id} href={tool.slug} onClick={() => { setSearchQuery(''); setShowSearch(false); }}
                      className="flex items-center justify-between px-4 py-3 hover:bg-bg-gray rounded-xl transition-all">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
                          <FiZap style={{ color: tool.color }} />
                        </div>
                        <div>
                          <p className="text-primary text-sm font-bold">{tool.name}</p>
                          <p className="text-[10px] text-secondary uppercase tracking-widest">{tool.category}</p>
                        </div>
                      </div>
                      <FiChevronRight className="text-secondary" />
                    </Link>
                  ))}
                  <Link href="/tools" onClick={() => setShowSearch(false)} className="block text-center text-accent text-xs font-bold py-2 hover:bg-blue-50 rounded-lg mt-1">Browse All Tools</Link>
                </div>
              )}
            </div>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link key={link.label} href={link.href} className={`text-xs font-bold uppercase tracking-widest transition-colors ${pathname === link.href ? 'text-accent' : 'text-secondary hover:text-accent'}`}>
                {link.label}
              </Link>
            ))}
            <Link href="/tools/seo-audit" className="bg-primary text-white text-[10px] uppercase tracking-widest font-black py-3 px-6 rounded-xl hover:bg-accent transition-all flex items-center gap-2">
              <FiTrendingUp /> Free Audit
            </Link>
          </nav>

          {/* Mobile */}
          <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden text-primary w-10 h-10 flex items-center justify-center">
            {mobileOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="fixed inset-x-0 top-[60px] bg-white z-50 md:hidden p-8 border-t border-border-light shadow-xl">
          <div className="space-y-6">
            {navLinks.map((link) => (
              <Link key={link.label} href={link.href} className="block text-2xl font-bold text-primary hover:text-accent transition-colors">{link.label}</Link>
            ))}
            <Link href="/tools/seo-audit" className="bg-accent text-white block text-center text-base font-bold py-4 rounded-2xl mt-6">Run Free SEO Audit</Link>
          </div>
        </div>
      )}
    </header>
  );
}
