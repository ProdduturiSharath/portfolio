import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TechnicalSkills from './components/TechnicalSkills';
import Experience from './components/Experience';
import Projects from './components/Projects';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';
import { fetchPortfolioData } from './services/api';
import { Loader2, WifiOff } from 'lucide-react';

export default function App() {
  const [portfolioData, setPortfolioData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFallback, setIsFallback] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      const res = await fetchPortfolioData();
      setPortfolioData(res.data);
      setIsFallback(res.isFallback);
      setLoading(false);
    }
    loadData();
  }, []);

  // Scroll position tracker for active section in Navbar
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'skills', 'experience', 'projects', 'contact'];
      const scrollPosition = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const sectionEl = document.getElementById(sections[i]);
        if (sectionEl) {
          const top = sectionEl.offsetTop;
          if (scrollPosition >= top) {
            setActiveSection(sections[i]);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0b0f19] flex flex-col items-center justify-center text-white font-mono space-y-4">
        <Loader2 className="w-10 h-10 text-sky-400 animate-spin" />
        <div className="text-sm text-slate-300">Loading Prodduturi Sharath Chandra Portfolio...</div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-[#0b0f19] text-slate-100 selection:bg-sky-500/20 selection:text-sky-400">
      {/* API Connection Fallback Notice Pill if backend API is unreachable */}
      {isFallback && (
        <div className="fixed bottom-4 right-4 z-50 px-3.5 py-2 rounded-lg bg-[#111827] border border-amber-500/40 text-amber-300 text-xs font-mono flex items-center space-x-2 shadow-md">
          <WifiOff className="w-4 h-4 text-amber-400 shrink-0" />
          <span>Using Local Static Dataset (API Offline)</span>
        </div>
      )}

      {/* Navigation Header */}
      <Navbar activeSection={activeSection} />

      {/* Main Content Sections */}
      <main className="relative z-10 space-y-12">
        <Hero personalInfo={portfolioData?.personalInfo} />
        <TechnicalSkills skillsData={portfolioData?.technicalSkills} />
        <Experience experienceData={portfolioData?.professionalExperience} />
        <Projects projectsData={portfolioData?.projects} />
        <ContactForm personalInfo={portfolioData?.personalInfo} />
      </main>

      {/* Footer */}
      <Footer personalInfo={portfolioData?.personalInfo} />
    </div>
  );
}
