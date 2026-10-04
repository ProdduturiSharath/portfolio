import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TechnicalSkills from './components/TechnicalSkills';
import Experience from './components/Experience';
import Projects from './components/Projects';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';
import { MotionProvider } from './components/Motion';
import { fetchPortfolioData } from './services/api';

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

  return (
    <MotionProvider>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <Navbar activeSection={activeSection} />
      <main id="main-content" tabIndex={-1}>
        <Hero personalInfo={portfolioData.personalInfo} />
        <Projects projectsData={portfolioData.projects} personalInfo={portfolioData.personalInfo} />
        <TechnicalSkills skillsData={portfolioData.technicalSkills} summary={portfolioData.summary} />
        <Experience experienceData={portfolioData.professionalExperience} />
        <ContactForm personalInfo={portfolioData.personalInfo} />
      </main>
      <Footer personalInfo={portfolioData.personalInfo} />
    </MotionProvider>
  );
}
