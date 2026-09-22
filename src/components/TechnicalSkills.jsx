import React, { useState } from 'react';
import { Search, Cpu, Database, Server, Code, Terminal, Layers, ShieldCheck, Check } from 'lucide-react';

export default function TechnicalSkills({ skillsData }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = [
    {
      key: 'generativeAi',
      title: 'Generative AI',
      icon: Cpu,
      skills: [
        { name: 'RAG Architecture', level: 95, desc: 'Context Injection, Chunking, Retrieval Guardrails' },
        { name: 'Multi-Agent Systems', level: 92, desc: 'Parallelized DAGs, Supervisor & Worker Routing' },
        { name: 'LangChain', level: 90, desc: 'Chains, Memory, Agent Execution, Tool Integration' },
        { name: 'LlamaIndex', level: 88, desc: 'Vector Stores, Document Indices, Query Engines' },
        { name: 'Prompt Engineering', level: 94, desc: 'Few-Shot, CoT, System Prompting, Structured I/O' },
        { name: 'Function/Tool Calling', level: 92, desc: 'Dynamic Intent Parsing, Strict Schema Validation' },
        { name: 'Fine Tuning (QLoRA)', level: 88, desc: 'PEFT, Unsloth, HuggingFace TRL, VRAM Optimization' },
        { name: 'Gemini / Llama Integration', level: 90, desc: 'vLLM Serving, API Integrations, Open-Weights' },
      ]
    },
    {
      key: 'mlDataStorage',
      title: 'ML & Data & Storage',
      icon: Database,
      skills: [
        { name: 'PyTorch', level: 88, desc: 'Tensors, Model Evaluation, Loss Monitoring' },
        { name: 'HuggingFace', level: 90, desc: 'Transformers, Datasets, TRL, Model Hub' },
        { name: 'Pinecone (Vector DB)', level: 92, desc: 'Vector Indexing, Namespaces, Metadata Filtering' },
        { name: 'Hybrid Search (Dense + Sparse, BM25)', level: 90, desc: 'Fusing Reciprocal Rank & Keyword BM25' },
        { name: 'PostgreSQL (Relational & JSONB)', level: 88, desc: 'Hybrid Workflows, JSONB State Persistence' },
        { name: 'MongoDB', level: 85, desc: 'Document Storage, Flexible Schema Pipelines' },
      ]
    },
    {
      key: 'languages',
      title: 'Languages',
      icon: Code,
      skills: [
        { name: 'Python', level: 95, desc: 'Asyncio, PyTorch, LangChain, FastAPI Backend' },
        { name: 'JavaScript / TypeScript', level: 90, desc: 'ES6+, Type Safety, React, Node.js' },
        { name: 'Java', level: 85, desc: 'OOP Architecture, Enterprise Systems Integration' },
        { name: 'SQL', level: 88, desc: 'Complex Queries, Indexing, Schema Optimization' },
      ]
    },
    {
      key: 'backendAndInfrastructure',
      title: 'Backend & Infrastructure',
      icon: Server,
      skills: [
        { name: 'FastAPI', level: 92, desc: 'Asynchronous Endpoints, Pydantic Schema Validation' },
        { name: 'Node.js', level: 88, desc: 'Event Loop, Non-blocking I/O, Microservices' },
        { name: 'Express.js', level: 86, desc: 'REST APIs, Middleware, Service Integration' },
        { name: 'React.js', level: 90, desc: 'Modern UI, State Management, Custom Hooks' },
        { name: 'GraphQL', level: 85, desc: 'Dynamic Payloads, Schema Queries & Mutations' },
        { name: 'Docker', level: 88, desc: 'Containerization, Multi-stage Builds, Parity' },
        { name: 'vLLM', level: 88, desc: 'High-Throughput PagedAttention Serving' },
        { name: 'Unsloth', level: 90, desc: '2x Faster QLoRA Fine-Tuning Execution' },
        { name: 'Git', level: 92, desc: 'Branching, Collaboration, Version Control' },
        { name: 'Cursor & GitHub Copilot', level: 95, desc: 'AI-Assisted Engineering, Accelerated Dev' },
      ]
    }
  ];

  const categoryTabNames = ['All', ...categories.map(c => c.title)];

  const filteredCategories = categories.map(cat => {
    if (activeCategory !== 'All' && cat.title !== activeCategory) {
      return null;
    }

    const filteredSkills = cat.skills.filter(skill =>
      skill.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      skill.desc.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (filteredSkills.length === 0 && searchTerm) {
      return null;
    }

    return {
      ...cat,
      skills: filteredSkills
    };
  }).filter(Boolean);

  return (
    <section id="skills" className="py-20 relative bg-[#0b0f19]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-md bg-[#111827] border border-[#1e293b] text-xs font-mono text-sky-400 mb-3">
            <Cpu className="w-3.5 h-3.5" />
            <span>Technical Capabilities</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
            Interactive <span className="text-sky-400">Skill Matrix</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Comprehensive breakdown of core technical skills across Generative AI, machine learning, vector storage, and scalable backend infrastructure.
          </p>
        </div>

        {/* Controls: Search & Category Tabs */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">

          {/* Search Input */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search skill (e.g. LangChain, Pinecone, Python)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-[#111827] border border-[#1e293b] text-slate-100 placeholder-slate-500 focus:border-sky-400 focus:outline-none text-xs sm:text-sm"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white"
              >
                Clear
              </button>
            )}
          </div>

          {/* Category Tabs */}
          <div className="flex items-center space-x-1.5 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
            {categoryTabNames.map((catName) => (
              <button
                key={catName}
                onClick={() => setActiveCategory(catName)}
                className={`px-3 py-1.5 rounded-md text-xs font-medium whitespace-nowrap transition-colors ${
                  activeCategory === catName
                    ? 'bg-sky-400 text-[#0b0f19] font-bold'
                    : 'bg-[#111827] border border-[#1e293b] text-slate-300 hover:text-white hover:bg-[#1f2937]'
                }`}
              >
                {catName}
              </button>
            ))}
          </div>

        </div>

        {/* Skills Grid */}
        {filteredCategories.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCategories.map((cat) => {
              const Icon = cat.icon;
              return (
                <div
                  key={cat.key}
                  className="bg-[#111827] border border-[#1e293b] rounded-xl p-6 hover:border-[#374151] transition-all duration-200 shadow-sm flex flex-col justify-between"
                >
                  <div>
                    {/* Category Title */}
                    <div className="flex items-center space-x-3 mb-4 pb-3 border-b border-[#1e293b]">
                      <div className="p-2.5 rounded-lg bg-[#1f2937] border border-[#374151] text-sky-400">
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-100 text-base">{cat.title}</h3>
                        <span className="text-[11px] text-slate-400 font-mono">
                          {cat.skills.length} Technologies
                        </span>
                      </div>
                    </div>

                    {/* Skill Items */}
                    <div className="space-y-4">
                      {cat.skills.map((skill) => (
                        <div key={skill.name} className="space-y-1.5">
                          <div className="flex items-center justify-between text-xs">
                            <span className="font-semibold text-slate-200 flex items-center space-x-1.5">
                              <Check className="w-3.5 h-3.5 text-sky-400" />
                              <span>{skill.name}</span>
                            </span>
                            <span className="font-mono text-slate-400 text-[11px]">{skill.level}%</span>
                          </div>
                          
                          {/* Visualizer Progress Bar */}
                          <div className="h-1.5 w-full bg-[#1f2937] rounded-full overflow-hidden">
                            <div
                              className="h-full bg-sky-400 transition-all duration-300 rounded-full"
                              style={{ width: `${skill.level}%` }}
                            ></div>
                          </div>
                          <p className="text-[11px] text-slate-400 leading-tight">{skill.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-16 bg-[#111827] border border-[#1e293b] rounded-xl">
            <p className="text-slate-400 text-sm">No skills found matching "{searchTerm}".</p>
            <button
              onClick={() => { setSearchTerm(''); setActiveCategory('All'); }}
              className="mt-3 text-xs text-sky-400 underline hover:text-white"
            >
              Reset Filters
            </button>
          </div>
        )}

      </div>
    </section>
  );
}
