import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TechnicalSkills from './components/TechnicalSkills';
import Experience from './components/Experience';
import Projects from './components/Projects';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';
import { MotionProvider } from './components/Motion';
import { AnalyticsConsent, AnalyticsProvider, useAnalytics } from './components/AnalyticsConsent';
import { fetchPortfolioData } from './services/api';

function SectionAnalytics({ enabled }) {
  const { trackEvent } = useAnalytics();

  useEffect(() => {
    if (!enabled || !('IntersectionObserver' in window)) return undefined;
    const seen = new Set();
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting || seen.has(entry.target.id)) return;
        seen.add(entry.target.id);
        trackEvent('section_view', { section_name: entry.target.id });
      });
    }, { threshold: 0.25 });
    ['hero', 'projects', 'skills', 'experience', 'contact'].forEach(id => {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    });
    return () => observer.disconnect();
  }, [enabled, trackEvent]);

  return null;
}

function Portfolio({ portfolioData, activeSection }) {
  const { consent } = useAnalytics();
  return (
    <MotionProvider>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <SectionAnalytics enabled={consent === 'accepted'} />
      <Navbar activeSection={activeSection} />
      <main id="main-content" tabIndex={-1}>
        <Hero personalInfo={portfolioData.personalInfo} />
        <Projects projectsData={portfolioData.projects} personalInfo={portfolioData.personalInfo} />
        <TechnicalSkills skillsData={portfolioData.technicalSkills} summary={portfolioData.summary} />
        <Experience experienceData={portfolioData.professionalExperience} />
        <ContactForm personalInfo={portfolioData.personalInfo} />
      </main>
      <Footer personalInfo={portfolioData.personalInfo} />
      <AnalyticsConsent />
    </MotionProvider>
  );
}

export default function App() {
  const [portfolioData, setPortfolioData] = useState(null);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    let mounted = true;
    fetchPortfolioData().then(({ data }) => {
      if (mounted) setPortfolioData(data);
    });
    return () => { mounted = false; };
  }, []);

  useEffect(() => {
    if (!portfolioData) return;
    let frame;
    const updateSection = () => {
      const sections = ['hero', 'projects', 'skills', 'experience', 'contact'];
      const current = sections.filter(id => document.getElementById(id)?.getBoundingClientRect().top <= 180);
      setActiveSection(current.at(-1) || 'hero');
    };
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(updateSection);
    };
    updateSection();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
    };
  }, [portfolioData]);

  if (!portfolioData) {
    return <div className="loading-screen" role="status">Opening Sharath's portfolio<span>One moment.</span></div>;
  }

  return <AnalyticsProvider><Portfolio portfolioData={portfolioData} activeSection={activeSection} /></AnalyticsProvider>;
}
