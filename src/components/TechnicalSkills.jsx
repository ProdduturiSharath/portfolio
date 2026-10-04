import React, { useState } from 'react';
import { Braces, Cpu, Database, Search, Server, X } from 'lucide-react';
import { Reveal } from './Motion';

const categories = [
  { key: 'generativeAi', title: 'Generative AI', icon: Cpu, description: 'From context to capability.', filter: 'AI systems' },
  { key: 'mlDataStorage', title: 'ML, data & storage', icon: Database, description: 'The right knowledge, in the right place.', filter: 'ML & data' },
  { key: 'languages', title: 'Languages', icon: Braces, description: 'A versatile engineering foundation.', filter: 'Languages' },
  { key: 'backendAndInfrastructure', title: 'Backend & infrastructure', icon: Server, description: 'Built to run. Designed to scale.', filter: 'Infrastructure' },
];

export default function TechnicalSkills({ skillsData = {}, summary }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('All');
  const filtered = categories.filter(item => category === 'All' || item.key === category).map(item => ({
    ...item,
    skills: (skillsData[item.key] || []).filter(skill => `${skill} ${item.title}`.toLowerCase().includes(searchTerm.trim().toLowerCase())),
  })).filter(item => item.skills.length > 0);
  const count = filtered.reduce((sum, item) => sum + item.skills.length, 0);

  return (
    <section id="skills" className="section expertise-section" aria-labelledby="skills-title">
      <div className="container">
        <Reveal className="section-heading">
          <div><p className="eyebrow"><span className="section-number">02</span> THE TOOLKIT</p><h2 id="skills-title">AI thinking.<br /><em>Engineering depth.</em></h2></div>
          <div className="expertise-intro"><p>I connect intelligent models with the systems that make them work. From the first embedding to the production endpoint.</p><details className="profile-summary"><summary>More about my approach</summary><p>{summary}</p></details></div>
        </Reveal>
        <div className="skills-toolbar">
          <div className="filter-list" role="group" aria-label="Filter expertise">
            {[{ key: 'All', filter: 'All expertise' }, ...categories].map(item => <button key={item.key} aria-pressed={category === item.key} onClick={() => setCategory(item.key)}>{item.filter}</button>)}
          </div>
          <div className="skill-search"><Search size={15} aria-hidden="true" /><input type="search" aria-label="Search technologies" placeholder="Find a technology…" value={searchTerm} onChange={event => setSearchTerm(event.target.value)} />{searchTerm && <button className="icon-button" aria-label="Clear technology search" onClick={() => setSearchTerm('')}><X size={14} /></button>}</div>
        </div>
        <span className="sr-only" role="status">{count} technologies found</span>
        {filtered.length ? <div className="skills-grid">
          {filtered.map((item, index) => {
            const Icon = item.icon;
            return <Reveal key={item.key} delay={index * 60}><article className="skill-card"><div className="skill-card-top"><Icon size={24} strokeWidth={1.25} /><span className="mono">{String(categories.findIndex(category => category.key === item.key) + 1).padStart(2, '0')}</span></div><h3>{item.title}</h3><p>{item.description}</p><ul className="skill-tags">{item.skills.map(skill => <li key={skill}>{skill}</li>)}</ul></article></Reveal>;
          })}
        </div> : <div className="empty-state"><p>No technologies match “{searchTerm}” in this category.</p><button className="text-link" onClick={() => { setSearchTerm(''); setCategory('All'); }}>Reset filters <ArrowReset /></button></div>}
        <Reveal className="approach-note"><span className="note-mark" aria-hidden="true">✳</span><p>Good AI isn't just about the model.<br /><strong>It's about the system around it.</strong></p><span className="mono">CONTEXT → REASONING → IMPACT</span></Reveal>
      </div>
    </section>
  );
}

function ArrowReset() { return <span aria-hidden="true">↗</span>; }
