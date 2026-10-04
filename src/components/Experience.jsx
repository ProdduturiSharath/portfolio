import React, { useState } from 'react';
import { ArrowUpRight, Minus, Plus } from 'lucide-react';
import { Reveal } from './Motion';

export default function Experience({ experienceData = [] }) {
  const [expandedId, setExpandedId] = useState(experienceData[0]?.id);

  return (
    <section id="experience" className="section experience-section" aria-labelledby="experience-title">
      <div className="container experience-layout">
        <Reveal className="experience-intro"><p className="eyebrow"><span className="section-number">03</span> THE JOURNEY</p><h2 id="experience-title">Learning.<br />Building.<br /><em>Delivering.</em></h2><p>Turning ideas into working systems, alongside teams that care about the details.</p><a className="text-link" href={`${import.meta.env.BASE_URL}Sharath_Chandra_AI_Engineer_Resume.pdf`} target="_blank" rel="noopener noreferrer">The full story, in my résumé <ArrowUpRight size={16} /></a></Reveal>
        <div className="experience-list">
          {experienceData.map((experience, index) => {
            const expanded = expandedId === experience.id;
            return <Reveal key={experience.id} delay={index * 70}><article className={`experience-item ${expanded ? 'is-expanded' : ''}`}>
              <div className="experience-date mono"><span>{experience.period}</span>{experience.isCurrent && <span className="current-role"><span className="status-dot" /> CURRENT</span>}</div>
              <h3><button className="experience-toggle" aria-expanded={expanded} aria-controls={`experience-${experience.id}`} onClick={() => setExpandedId(expanded ? null : experience.id)}><span>{experience.company}</span><span className="experience-toggle-icon">{expanded ? <Minus size={18} /> : <Plus size={18} />}</span></button></h3>
              <div className="experience-role">{experience.role}<span>{experience.location}</span></div>
              <div id={`experience-${experience.id}`} className="experience-details" hidden={!expanded}>
                {experience.isCurrent && experience.impactMetrics?.[0] && <div className="experience-impact"><strong>{experience.impactMetrics[0].value}</strong><div><span>{experience.impactMetrics[0].label}</span><p>{experience.impactMetrics[0].detail}</p></div></div>}
                <ul className="detail-list">{experience.highlights.map(highlight => <li key={highlight}>{highlight}</li>)}</ul>
                <div className="tag-list">{experience.techStack?.map(tech => <span key={tech}>{tech}</span>)}</div>
              </div>
            </article></Reveal>;
          })}
        </div>
      </div>
    </section>
  );
}
