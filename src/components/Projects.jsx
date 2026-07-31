import React, { useState } from 'react';
import { Terminal, CheckCircle2, FileText, ChevronDown, ChevronUp, Zap } from 'lucide-react';

export default function Projects({ projectsData }) {
  const [activeFilter, setActiveFilter] = useState('All');
  const [openDiagramId, setOpenDiagramId] = useState('distributed-api-rate-limiter');

  const defaultProjects = [
    {
      id: 'distributed-api-rate-limiter',
      title: 'Distributed API Rate Limiter and Gateway',
      category: 'Backend & Distributed',
      technologies: ['Java', 'Spring Boot', 'Redis', 'Docker', 'PostgreSQL'],
      description: 'Architected a distributed API Gateway in Java and Spring Boot to securely route traffic, manage payloads, and authenticate requests across multiple downstream microservices.',
      highlights: [
        'Architected a distributed API Gateway in Java and Spring Boot to securely route traffic, manage payloads, and authenticate requests across multiple downstream microservices.',
        'Engineered a low-latency Distributed Rate Limiter implementing the Token Bucket algorithm via Redis, preventing API abuse and ensuring high availability under simulated traffic spikes.',
        'Designed a centralized logging and monitoring interceptor to track real-time API latency and error rates, storing transaction metrics in an optimized PostgreSQL schema.'
      ],
      keyInnovations: [
        'Redis Token Bucket Algorithm with sub-millisecond check latency',
        'JWT Gateway Routing & Dynamic Payload Interception',
        'PostgreSQL Real-time Metrics Audit Interceptor'
      ],
      architectureDiagram: `
┌──────────────────┐      ┌─────────────────────────────┐      ┌───────────────────────────┐
│ Client Traffic   │ ───► │ Spring Boot API Gateway     │ ───► │ Redis Cluster             │
│ (HTTP/HTTPS)     │      │ (JWT Token & Route Filter)  │      │ (Token Bucket Rate Check) │
└──────────────────┘      └──────────────┬──────────────┘      └───────────────────────────┘
                                         │
                                         ▼
                          ┌─────────────────────────────┐
                          │ PostgreSQL Database         │
                          │ (Latency & Audit Logging)   │
                          └─────────────────────────────┘
      `
    },
    {
      id: 'async-task-orchestration',
      title: 'Asynchronous Task Orchestration Engine',
      category: 'Async & Python',
      technologies: ['Python', 'FastAPI', 'PostgreSQL', 'React', 'Docker'],
      description: 'Developed a scalable backend engine that dynamically schedules and processes interdependent tasks within a Directed Acyclic Graph (DAG) architecture.',
      highlights: [
        'Developed a scalable backend engine that dynamically schedules and processes interdependent tasks within a Directed Acyclic Graph (DAG) architecture.',
        'Utilized Python\'s asyncio to evaluate and execute processes in parallel, reducing overall system latency versus synchronous processing.',
        'Containerized the multi-tier application (frontend, backend, database) using Docker to ensure environment parity and seamless deployment.'
      ],
      keyInnovations: [
        'DAG Topological Dependency Resolver & Topological Ordering',
        'Non-blocking Asyncio Worker Threads for Parallel Execution',
        'Full Multi-tier Docker Containerization with Parity'
      ],
      architectureDiagram: `
┌──────────────────┐      ┌─────────────────────────────┐      ┌───────────────────────────┐
│ DAG Workflow     │ ───► │ FastAPI Async Engine        │ ───► │ Python Asyncio Workers    │
│ Specification    │      │ (Dependency Graph Resolver) │      │ (Parallel Task Exec Pool) │
└──────────────────┘      └──────────────┬──────────────┘      └───────────────────────────┘
                                         │
                                         ▼
                          ┌─────────────────────────────┐
                          │ PostgreSQL & Docker Engine  │
                          │ (State & Execution Audit)   │
                          └─────────────────────────────┘
      `
    },
    {
      id: 'real-estate-property-management',
      title: 'Real Estate Property Management Platform',
      category: 'Full-Stack Node.js',
      technologies: ['Node.js', 'Express.js', 'MongoDB', 'React', 'EJS'],
      description: 'Built a scalable property management web application using MVC architecture to deliver a responsive UI and secure RESTful APIs.',
      highlights: [
        'Built a scalable property management web application using MVC architecture to deliver a responsive UI and secure RESTful APIs.',
        'Enhanced backend security by implementing password hashing, role-based access control, and comprehensive payload validation.'
      ],
      keyInnovations: [
        'Role-Based Access Control (RBAC) & Bcrypt Password Hashing',
        'MVC Architecture separating React UI and Express APIs',
        'Mongo Aggregation Pipelines for Property Filters'
      ],
      architectureDiagram: `
┌──────────────────┐      ┌─────────────────────────────┐      ┌───────────────────────────┐
│ React UI / EJS   │ ───► │ Express.js Controller       │ ───► │ MongoDB Document Store    │
│ Frontend Layer   │      │ (RBAC & Payload Validator)  │      │ (Properties & User Auth)  │
└──────────────────┘      └─────────────────────────────┘      └───────────────────────────┘
      `
    }
  ];

  const projects = (projectsData && projectsData.length > 0) ? projectsData.map((p, index) => ({
    ...defaultProjects[index],
    ...p
  })) : defaultProjects;

  const filters = ['All', 'Backend & Distributed', 'Async & Python', 'Full-Stack Node.js'];

  const filteredProjects = activeFilter === 'All'
    ? projects
    : projects.filter(p => p.category === activeFilter || p.technologies.some(t => t.toLowerCase().includes(activeFilter.toLowerCase())));

  const toggleDiagram = (id) => {
    setOpenDiagramId(openDiagramId === id ? null : id);
  };

  return (
    <section id="projects" className="py-20 relative bg-[#0b0f19]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-md bg-[#111827] border border-[#1e293b] text-xs font-mono text-sky-400 mb-3">
            <Terminal className="w-3.5 h-3.5" />
            <span>Featured Engineering Work</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
            System Architecture & <span className="text-sky-400">Core Projects</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Deep dive into production-grade systems built for high availability, low latency, and clean modular architecture.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center justify-center space-x-2 mb-10 overflow-x-auto pb-2">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-2 rounded-md text-xs font-semibold whitespace-nowrap transition-colors ${
                activeFilter === filter
                  ? 'bg-sky-400 text-[#0b0f19] font-bold'
                  : 'bg-[#111827] border border-[#1e293b] text-slate-300 hover:text-white hover:bg-[#1f2937]'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Projects Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => {
            const isDiagramOpen = openDiagramId === project.id;
            return (
              <div
                key={project.id}
                className="bg-[#111827] border border-[#1e293b] rounded-xl p-6 flex flex-col justify-between hover:border-[#374151] transition-all duration-200 shadow-sm group"
              >
                <div>
                  {/* Top Badge */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-2.5 py-1 rounded-md bg-[#1f2937] border border-[#374151] text-[11px] font-mono text-sky-400">
                      {project.category || 'Core System'}
                    </span>
                    <span className="text-[11px] font-mono text-slate-400">
                      {project.technologies[0]} / {project.technologies[1]}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-sky-400 transition-colors leading-snug">
                    {project.title}
                  </h3>

                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-4">
                    {project.description}
                  </p>

                  {/* Highlights Bullet List */}
                  <div className="space-y-2 mb-5">
                    <h4 className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">Engineering Highlights:</h4>
                    {project.highlights.map((h, i) => (
                      <div key={i} className="flex items-start space-x-2 text-xs text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>

                  {/* Key Innovations */}
                  {project.keyInnovations && (
                    <div className="p-3.5 rounded-lg bg-[#1f2937] border border-[#374151] mb-5">
                      <div className="text-[11px] font-mono text-sky-400 flex items-center space-x-1.5 mb-1.5">
                        <Zap className="w-3.5 h-3.5" />
                        <span>Key Innovation Highlights</span>
                      </div>
                      <ul className="space-y-1">
                        {project.keyInnovations.map((inv, idx) => (
                          <li key={idx} className="text-[11px] text-slate-300 flex items-center space-x-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                            <span>{inv}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Architecture Diagram Toggle */}
                  <div className="mb-5">
                    <button
                      onClick={() => toggleDiagram(project.id)}
                      className="w-full flex items-center justify-between px-3 py-2 rounded-md bg-[#1f2937] border border-[#374151] text-xs font-mono text-slate-300 hover:text-white hover:border-sky-400 transition-colors"
                    >
                      <span className="flex items-center space-x-2">
                        <FileText className="w-3.5 h-3.5 text-sky-400" />
                        <span>System Architecture Flow</span>
                      </span>
                      {isDiagramOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>

                    {isDiagramOpen && project.architectureDiagram && (
                      <div className="mt-3 p-3 rounded-md bg-[#0b0f19] border border-[#1e293b] text-[10px] font-mono text-sky-400 overflow-x-auto">
                        <pre className="whitespace-pre">{project.architectureDiagram.trim()}</pre>
                      </div>
                    )}
                  </div>
                </div>

                {/* Tech Stack Badges */}
                <div className="pt-4 border-t border-[#1e293b] flex flex-wrap gap-1.5">
                  {project.technologies.map((t) => (
                    <span
                      key={t}
                      className="px-2 py-0.5 rounded-md bg-[#1f2937] border border-[#374151] text-[10px] font-mono text-slate-300"
                    >
                      {t}
                    </span>
                  ))}
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
