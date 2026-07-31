import React, { useState, useEffect } from 'react';
import { Terminal, Menu, X, Code, Briefcase, Cpu, Mail, Sparkles } from 'lucide-react';

export default function Navbar({ activeSection }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Overview', href: '#hero', icon: Code },
    { name: 'Skills', href: '#skills', icon: Cpu },
    { name: 'Experience', href: '#experience', icon: Briefcase },
    { name: 'Projects', href: '#projects', icon: Terminal },
    { name: 'Contact', href: '#contact', icon: Mail },
  ];

  const scrollToSection = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      const topOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - topOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        scrolled
          ? 'bg-[#0b0f19] border-b border-[#1e293b] py-3.5 shadow-md'
          : 'bg-[#0b0f19]/90 border-b border-[#1e293b]/50 py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <a
            href="#hero"
            onClick={(e) => scrollToSection(e, '#hero')}
            className="flex items-center space-x-2.5 group focus:outline-none"
          >
            <div className="w-9 h-9 rounded-lg bg-[#1f2937] border border-[#374151] flex items-center justify-center group-hover:border-sky-400 transition-colors">
              <Terminal className="w-4 h-4 text-sky-400" />
            </div>
            <span className="font-mono text-base font-bold text-slate-100 tracking-tight">
              &lt;<span className="text-sky-400">Sharath</span>.<span className="text-emerald-400">dev</span> /&gt;
            </span>
          </a>

          {/* System Online Status Pill */}
          <div className="hidden md:flex items-center space-x-2 px-3 py-1 rounded-md bg-[#111827] border border-[#1e293b] text-xs font-mono text-emerald-400">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span>System Online</span>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center space-x-1 bg-[#111827] border border-[#1e293b] px-3 py-1.5 rounded-lg">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = activeSection === link.href.replace('#', '');
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => scrollToSection(e, link.href)}
                  className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-150 ${
                    isActive
                      ? 'bg-[#1f2937] text-sky-400 border border-[#374151] font-semibold'
                      : 'text-slate-300 hover:text-white hover:bg-[#1f2937]/50'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{link.name}</span>
                </a>
              );
            })}
          </nav>

          {/* Right Action */}
          <div className="hidden md:flex items-center space-x-3">
            <a
              href="#contact"
              onClick={(e) => scrollToSection(e, '#contact')}
              className="px-4 py-2 text-xs font-bold rounded-lg bg-sky-400 hover:bg-sky-500 text-[#0b0f19] transition-colors flex items-center space-x-1.5 shadow-sm"
            >
              <Sparkles className="w-3.5 h-3.5 fill-current" />
              <span>Hire Me</span>
            </a>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="lg:hidden flex items-center space-x-2">
            <div className="flex items-center space-x-1.5 px-2.5 py-1 rounded-md bg-[#111827] border border-[#1e293b] text-[10px] font-mono text-emerald-400">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
              </span>
              <span>Online</span>
            </div>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-[#111827] border border-[#1e293b] text-slate-300 hover:text-white focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-sky-400" /> : <Menu className="w-5 h-5 text-slate-300" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[65px] bg-[#0b0f19] border-b border-[#1e293b] p-6 shadow-xl transition-all">
          <div className="flex flex-col space-y-2">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = activeSection === link.href.replace('#', '');
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => scrollToSection(e, link.href)}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg border text-xs font-medium transition-colors ${
                    isActive
                      ? 'bg-[#1f2937] text-sky-400 border-[#374151] font-semibold'
                      : 'bg-[#111827] border-[#1e293b] text-slate-300 hover:text-white'
                  }`}
                >
                  <Icon className="w-4 h-4 text-sky-400" />
                  <span>{link.name}</span>
                </a>
              );
            })}
            <a
              href="#contact"
              onClick={(e) => scrollToSection(e, '#contact')}
              className="flex items-center justify-center space-x-2 py-3 rounded-lg bg-sky-400 text-[#0b0f19] font-bold text-xs shadow-sm mt-2"
            >
              <Sparkles className="w-4 h-4 fill-current" />
              <span>Let's Connect</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
