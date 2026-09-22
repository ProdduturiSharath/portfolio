import React from 'react';
import { Terminal, ArrowUp, Github, Linkedin, Mail } from 'lucide-react';

export default function Footer({ personalInfo }) {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="relative border-t border-[#1e293b] bg-[#0b0f19] py-8 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">

          {/* Brand */}
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#1f2937] border border-[#374151] flex items-center justify-center">
              <Terminal className="w-4 h-4 text-sky-400" />
            </div>
            <span className="font-mono text-xs sm:text-sm font-bold text-slate-200">
              Prodduturi Sharath Chandra <span className="text-sky-400">© 2026</span>
            </span>
          </div>

          {/* Social Links */}
          <div className="flex items-center space-x-3">
            <a
              href={personalInfo?.github || "https://github.com/ProdduturiSharath"}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-lg bg-[#111827] border border-[#1e293b] hover:border-[#374151] text-slate-300 hover:text-white transition-colors"
              aria-label="GitHub Profile"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href={personalInfo?.linkedin || "https://linkedin.com/in/prodduturisharath"}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-lg bg-[#111827] border border-[#1e293b] hover:border-[#374151] text-slate-300 hover:text-sky-400 transition-colors"
              aria-label="LinkedIn Profile"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href={`mailto:${personalInfo?.email || "sharathchandraprodduturi@gmail.com"}`}
              className="p-2.5 rounded-lg bg-[#111827] border border-[#1e293b] hover:border-[#374151] text-slate-300 hover:text-emerald-400 transition-colors"
              aria-label="Email Me"
            >
              <Mail className="w-4 h-4" />
            </a>
          </div>

          {/* Back to Top */}
          <button
            onClick={scrollToTop}
            className="flex items-center space-x-2 px-3.5 py-2 rounded-lg bg-[#111827] border border-[#1e293b] hover:border-[#374151] text-xs font-mono text-slate-300 hover:text-white transition-colors group"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-3.5 h-3.5 text-sky-400 group-hover:-translate-y-0.5 transition-transform" />
          </button>

        </div>
      </div>
    </footer>
  );
}
