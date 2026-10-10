import React from 'react';
import { ArrowDown, ArrowUpRight, Github, Linkedin, MapPin, Pause, Play } from 'lucide-react';
import NeuralSculpture from './NeuralSculpture';
import { useMotion } from './Motion';
import { useAnalytics } from './AnalyticsConsent';

export default function Hero({ personalInfo }) {
  const { motionEnabled, reducedMotion, toggleMotion } = useMotion();
  const { trackEvent } = useAnalytics();

  return (
    <section id="hero" className="hero-section" aria-labelledby="hero-title">
      <div className="container">
        <div className="hero-grid">
          <div className="hero-copy">
            <div className="eyebrow hero-eyebrow"><span className="status-dot" /> AI ENGINEER · BUILDER · PROBLEM SOLVER</div>
            <h1 id="hero-title">Intelligence,<br />engineered<br /><em>with purpose.</em></h1>
            <p className="hero-intro">I'm <strong>{personalInfo.name}</strong>.</p>
            <p className="hero-description">I turn the possibilities of AI into reliable, real-world systems. Working at the intersection of generative AI, thoughtful architecture, and human impact.</p>
            <div className="hero-actions">
              <a className="button button-primary" href="#projects">Explore my work <ArrowUpRight size={18} /></a>
              <a className="text-link" href={`${import.meta.env.BASE_URL}Sharath_Chandra_AI_Engineer_Resume.pdf`} target="_blank" rel="noopener noreferrer" onClick={() => trackEvent('resume_click', { button_location: 'hero' })}>View résumé <ArrowUpRight size={16} /></a>
            </div>
            <div className="hero-meta">
              <span><MapPin size={13} /> {personalInfo.location}</span>
              <span className="meta-divider" />
              <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub profile"><Github size={17} /></a>
              <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn profile"><Linkedin size={17} /></a>
            </div>
          </div>
          <div className="hero-art">
            <div className="art-topline mono"><span>FIG. 01 — CONNECTED INTELLIGENCE</span><span className="art-coordinate">[ 3D ]</span></div>
            <NeuralSculpture />
            <div className="art-caption">
              <span className="mono">Independent agents.<br /><span className="muted">One coherent system.</span></span>
              <button className="motion-toggle" onClick={toggleMotion} disabled={reducedMotion} aria-label={reducedMotion ? 'Animation disabled by reduced motion preference' : motionEnabled ? 'Pause animation' : 'Play animation'} aria-pressed={!motionEnabled}>
                {motionEnabled ? <Pause size={12} /> : <Play size={12} />}
                <span>{reducedMotion ? 'Reduced motion' : motionEnabled ? 'Pause motion' : 'Play motion'}</span>
              </button>
            </div>
          </div>
        </div>
        <div className="hero-baseline">
          <a href="#projects" className="scroll-link"><ArrowDown size={15} /><span>SCROLL TO EXPLORE</span></a>
          <div className="specialties"><span>Multi-agent systems</span><span>RAG pipelines</span><span>Model fine-tuning</span></div>
          <span className="hero-edition mono">PORTFOLIO / {new Date().getFullYear()}</span>
        </div>
      </div>
    </section>
  );
}
