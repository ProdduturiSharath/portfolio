import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, ArrowUpRight, Maximize, X } from 'lucide-react';
import ProjectVisual from './ProjectVisual';
import ArchitectureDiagram from './ArchitectureDiagram';
import { Reveal, useMotion } from './Motion';

const presentation = {
  'enterprise-multi-agent-platform': { type: 'agents', title: 'Multi-agent orchestration', metric: '40%', metricLabel: 'lower execution latency', filter: 'Multi-agent', flow: ['Natural-language query', 'Validated intent routing', 'Parallel agent execution', 'Persistent workflow state'] },
  'slm-instruction-fine-tuning': { type: 'tuning', title: 'Instruction fine-tuning', metric: '98%', metricLabel: 'JSON schema pass rate', filter: 'Fine-tuning', flow: ['5,000+ support interactions', 'QLoRA + Unsloth training', 'Fine-tuned Llama 3 (8B)', 'Structured JSON output'] },
  'enterprise-rag-document-intelligence': { type: 'retrieval', title: 'Document intelligence', metric: '35%', metricLabel: 'better retrieval accuracy', filter: 'RAG pipelines', flow: ['Enterprise documents', 'Chunking + embeddings', 'Dense + BM25 hybrid search', 'Context-grounded response'] },
};

function ProjectCard({ project, index, onOpen, featured }) {
  const visualRef = useRef(null);
  const { motionEnabled } = useMotion();
  const view = presentation[project.id];
  const resetTilt = () => {
    visualRef.current?.style.setProperty('--tilt-x', '0deg');
    visualRef.current?.style.setProperty('--tilt-y', '0deg');
  };
  useEffect(() => { if (!motionEnabled) resetTilt(); }, [motionEnabled]);
  const onPointerMove = event => {
    if (!motionEnabled || event.pointerType !== 'mouse') return;
    const bounds = event.currentTarget.getBoundingClientRect();
    visualRef.current.style.setProperty('--tilt-x', `${-((event.clientY - bounds.top) / bounds.height - 0.5) * 5}deg`);
    visualRef.current.style.setProperty('--tilt-y', `${((event.clientX - bounds.left) / bounds.width - 0.5) * 5}deg`);
  };

  return (
    <Reveal className={featured ? 'featured-project' : ''} delay={featured ? 0 : index * 70}>
      <article className={`project-card ${featured ? 'project-featured' : ''}`} onPointerMove={onPointerMove} onPointerLeave={resetTilt}>
        <div className="project-art-frame"><div className="project-art-depth" ref={visualRef}><ProjectVisual type={view?.type} /></div></div>
        <div className="project-content">
          <div className="project-category mono"><span>{project.category}</span><span>0{index + 1}</span></div>
          <h3>{view?.title || project.title}</h3>
          <p>{project.description}</p>
          {view && <div className="project-metric"><strong>{view.metric}<span>{view.type === 'agents' ? '↘' : '↗'}</span></strong><span>{view.metricLabel}</span></div>}
          <div className="project-stack">{project.technologies.slice(0, 4).map(tech => <span key={tech}>{tech}</span>)}</div>
          <button
            type="button"
            className="project-open"
            aria-label={`View details: ${project.title}`}
            aria-haspopup="dialog"
            aria-controls="project-details-dialog"
            onClick={event => {
              event.currentTarget.focus({ preventScroll: true });
              onOpen(project);
            }}
          >
            View details <Maximize size={15} aria-hidden="true" />
          </button>
        </div>
      </article>
    </Reveal>
  );
}

export default function Projects({ projectsData = [], personalInfo }) {
  const [activeFilter, setActiveFilter] = useState('All work');
  const [selected, setSelected] = useState(null);
  const dialogRef = useRef(null);
  const filters = ['All work', ...new Set(projectsData.map(project => presentation[project.id]?.filter || project.category))];
  const filtered = projectsData.filter(project => activeFilter === 'All work' || (presentation[project.id]?.filter || project.category) === activeFilter);

  useEffect(() => {
    if (!selected) return;
    const dialog = dialogRef.current;
    const opener = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    dialog.showModal();
    document.body.style.overflow = 'hidden';
    return () => {
      dialog.close();
      document.body.style.overflow = previousOverflow;
      opener?.focus({ preventScroll: true });
    };
  }, [selected]);

  const selectedView = selected && presentation[selected.id];
  return (
    <section id="projects" className="section projects-section" aria-labelledby="projects-title">
      <div className="container">
        <Reveal className="section-heading">
          <div><p className="eyebrow"><span className="section-number">01</span> SELECTED WORK</p><h2 id="projects-title">Complex problems.<br /><em>Considered solutions.</em></h2></div>
          <p>A few things I've built to make AI more useful, more reliable, and ready for the real world.</p>
        </Reveal>
        <div className="project-toolbar">
          <div className="filter-list" role="group" aria-label="Filter projects">
            {filters.map(filter => <button key={filter} aria-pressed={filter === activeFilter} onClick={() => setActiveFilter(filter)}>{filter}{filter === 'All work' && <span>{String(projectsData.length).padStart(2, '0')}</span>}</button>)}
          </div>
          <span className="mono results-count" role="status">{String(filtered.length).padStart(2, '0')} PROJECTS</span>
        </div>
        <div className="projects-grid">
          {filtered.map(project => <ProjectCard key={project.id} project={project} index={projectsData.indexOf(project)} featured={filtered.length === 1 || projectsData.indexOf(project) === 0} onOpen={setSelected} />)}
        </div>
        <Reveal className="projects-footnote"><span>Built with curiosity. Grounded in engineering.</span><a className="text-link" href={personalInfo.github} target="_blank" rel="noopener noreferrer">More on GitHub <ArrowUpRight size={16} /></a></Reveal>
      </div>

      <dialog id="project-details-dialog" ref={dialogRef} className="project-dialog" aria-labelledby="project-dialog-title" onCancel={() => setSelected(null)} onClick={event => {
        if (event.target !== event.currentTarget) return;
        const bounds = event.currentTarget.getBoundingClientRect();
        if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) setSelected(null);
      }}>
        {selected && <>
          <div className="dialog-top"><span className="eyebrow">PROJECT NOTES / {selected.category}</span><button autoFocus className="icon-button" aria-label="Close project details" onClick={() => setSelected(null)}><X size={21} /></button></div>
          <div className="dialog-content">
            <h2 id="project-dialog-title">{selected.title}</h2>
            <p className="dialog-description">{selected.description}</p>
            <div className="tag-list">{selected.technologies.map(tech => <span key={tech}>{tech}</span>)}</div>
            <ProjectVisual type={selectedView?.type} />
            <h3>Inside the system</h3>
            {selectedView && <ol className="architecture-flow">{selectedView.flow.map((step, index) => <li key={step}><span className="mono">0{index + 1}</span>{step}{index < selectedView.flow.length - 1 && <ArrowRight size={15} aria-hidden="true" />}</li>)}</ol>}
            <h3>Engineering highlights</h3>
            <ul className="detail-list">{selected.highlights.map(highlight => <li key={highlight}>{highlight}</li>)}</ul>
            <h3>Key ideas</h3>
            <ul className="innovation-list">{selected.keyInnovations.map(innovation => <li key={innovation}>{innovation}</li>)}</ul>
            <ArchitectureDiagram key={selected.id} architecture={selected.architecture} projectTitle={selected.title} />
            <a className="button button-secondary" href="#contact" onClick={() => setSelected(null)}>Discuss this project <ArrowUpRight size={16} /></a>
          </div>
        </>}
      </dialog>
    </section>
  );
}
