import React, { useState } from 'react';
import { Terminal, CheckCircle2, FileText, ChevronDown, ChevronUp, Zap } from 'lucide-react';

export default function Projects({ projectsData }) {
  const [activeFilter, setActiveFilter] = useState('All');
  const [openDiagramId, setOpenDiagramId] = useState('enterprise-multi-agent-platform');

  const defaultProjects = [
    {
      id: 'enterprise-multi-agent-platform',
      title: 'Enterprise Multi-Agent AI Orchestration Platform',
      category: 'Multi-Agent & LLM',
      technologies: ['Python', 'LangChain', 'FastAPI', 'React', 'PostgreSQL', 'Docker'],
      description: 'Engineered an asynchronous multi-agent orchestration engine that translates natural-language queries into parallelized DAGs, reducing overall task execution latency by 40%.',
      highlights: [
        'Engineered an asynchronous multi-agent orchestration engine that translates natural-language queries into parallelized DAGs, reducing overall task execution latency by 40%.',
        'Designed an intelligent LLM routing dispatcher that enforces strict schema validation, guaranteeing deterministic, structured outputs and eliminating malformed API payloads.',
        'Implemented a self-healing LLM invocation pipeline featuring cross-provider fallback routing and exponential backoff, achieving 100% system uptime against external API rate limits.',
        'Parallelized sub-task execution using Python\'s asyncio, backed by a hybrid PostgreSQL state management system to persist complex, unpredictable LLM workflows.'
      ],
      keyInnovations: [
        'Dynamic DAG Query-to-Workflow Compiler reducing latency by 40%',
        'Zero-Malformed Output Schema Validation Dispatcher',
        'Cross-Provider Self-Healing Fallback Pipeline with Exponential Backoff'
      ],
      architectureDiagram: `
┌──────────────────┐      ┌─────────────────────────────┐      ┌───────────────────────────┐
│ User Query (NL)  │ ───► │ Intent Router & Dispatcher  │ ───► │ Parallelized DAG Engine   │
│                  │      │ (Strict Schema Validation)  │      │ (Python Asyncio Workers)  │
└──────────────────┘      └──────────────┬──────────────┘      └─────────────┬─────────────┘
                                         │                                   │
                                         ▼                                   ▼
                          ┌─────────────────────────────┐      ┌───────────────────────────┐
                          │ Self-Healing LLM Pipeline   │      │ Hybrid PostgreSQL DB      │
                          │ (Cross-Provider Fallbacks)  │      │ (Workflow State History)  │
                          └─────────────────────────────┘      └───────────────────────────┘
      `
    },
    {
      id: 'slm-instruction-fine-tuning',
      title: 'SLM Instruction Fine-Tuning',
      category: 'Fine-Tuning & SLM',
      technologies: ['Python', 'PyTorch', 'Unsloth', 'QLoRA', 'HuggingFace TRL', 'vLLM'],
      description: 'Fine-tuned an open-weights Llama 3 (8B) model using Unsloth and QLoRA, optimizing the model to extract strictly typed JSON payloads from unstructured enterprise support tickets.',
      highlights: [
        'Fine-tuned an open-weights Llama 3 (8B) model using Unsloth and QLoRA, optimizing the model to extract strictly typed JSON payloads (issue severity, component, intent) from unstructured enterprise support tickets.',
        'Curated a synthetic training dataset of 5,000+ support interactions and evaluated model performance based on JSON Schema Validation Pass Rate, achieving a 98% perfectly parsable output rate.',
        'Implemented Parameter-Efficient Fine-Tuning (PEFT) to update <2% of total model parameters, drastically reducing VRAM requirements for training while preventing catastrophic forgetting.'
      ],
      keyInnovations: [
        'Unsloth 2x Faster QLoRA Parameter-Efficient Tuning (<2% parameters)',
        '98% JSON Schema Validation Pass Rate on Enterprise Tickets',
        'High-Throughput Low-Latency Serving with vLLM'
      ],
      architectureDiagram: `
┌──────────────────┐      ┌─────────────────────────────┐      ┌───────────────────────────┐
│ 5,000+ Tickets   │ ───► │ QLoRA & Unsloth Pipeline    │ ───► │ Fine-Tuned Llama 3 (8B)   │
│ (Unstructured)   │      │ (PEFT <2% Total Parameters) │      │ (Strict JSON Extraction)  │
└──────────────────┘      └──────────────┬──────────────┘      └─────────────┬─────────────┘
                                         │                                   │
                                         ▼                                   ▼
                          ┌─────────────────────────────┐      ┌───────────────────────────┐
                          │ Synthetic Evaluation Suite  │      │ High-Throughput vLLM      │
                          │ (98% Schema Pass Rate)      │      │ (Low-Latency Serving)     │
                          └─────────────────────────────┘      └───────────────────────────┘
      `
    },
    {
      id: 'enterprise-rag-document-intelligence',
      title: 'Enterprise RAG Document Intelligence Pipeline',
      category: 'RAG & Vector Search',
      technologies: ['Python', 'LangChain', 'FastAPI', 'Pinecone', 'Hybrid Search (BM25)'],
      description: 'Engineered a scalable Retrieval-Augmented Generation (RAG) pipeline to ingest, chunk, and embed large-scale proprietary text datasets into a Pinecone vector database for low-latency retrieval.',
      highlights: [
        'Engineered a scalable Retrieval-Augmented Generation (RAG) pipeline to ingest, chunk, and embed large-scale proprietary text datasets into a Pinecone vector database for low-latency retrieval.',
        'Implemented a hybrid search architecture fusing dense vector embeddings with sparse keyword search (BM25), improving context retrieval accuracy by 35%.',
        'Designed asynchronous FastAPI endpoints to orchestrate contextual querying via LangChain, dynamically injecting retrieved vector chunks to reduce model hallucinations by over 85%.'
      ],
      keyInnovations: [
        'Dense + Sparse Hybrid Search (Pinecone Vector DB + BM25)',
        '>85% Hallucination Reduction via Dynamic Context Injection',
        'Asynchronous FastAPI Ingestion and Retrieval Orchestration'
      ],
      architectureDiagram: `
┌──────────────────┐      ┌─────────────────────────────┐      ┌───────────────────────────┐
│ Enterprise Docs  │ ───► │ Chunking & Dense Embeddings │ ───► │ Pinecone Vector Database  │
│ & Knowledge Base │      │ + Sparse Inverted Index     │      │ (Dense + BM25 Sparse)     │
└──────────────────┘      └──────────────┬──────────────┘      └─────────────┬─────────────┘
                                         │                                   │
                                         ▼                                   ▼
                          ┌─────────────────────────────┐      ┌───────────────────────────┐
                          │ LangChain Async FastAPI     │ ───► │ Hallucination Guardrail   │
                          │ (Contextual Prompt Inj.)    │      │ (>85% Hallucination Drop) │
                          └─────────────────────────────┘      └───────────────────────────┘
      `
    }
  ];

  const projects = (projectsData && projectsData.length > 0) ? projectsData.map((p, index) => ({
    ...defaultProjects[index],
    ...p
  })) : defaultProjects;

  const filters = ['All', 'Multi-Agent & LLM', 'Fine-Tuning & SLM', 'RAG & Vector Search'];

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
            Deep dive into production-grade AI systems built for multi-agent DAG execution, parameter-efficient fine-tuning, and low-latency hybrid RAG retrieval.
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
