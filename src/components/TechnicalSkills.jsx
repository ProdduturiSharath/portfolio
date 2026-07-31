import React, { useState } from 'react';
import { Search, Cpu, Database, Server, Code, Terminal, Layers, ShieldCheck, Check } from 'lucide-react';

export default function TechnicalSkills({ skillsData }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = [
    {
      key: 'languages',
      title: 'Languages',
      icon: Code,
      skills: [
        { name: 'Java', level: 90, desc: 'Spring Boot, OOP, Microservices' },
        { name: 'JavaScript', level: 90, desc: 'ES6+, Async/Await, DOM' },
        { name: 'TypeScript', level: 85, desc: 'Strong Typing, Interfaces' },
        { name: 'Python', level: 85, desc: 'FastAPI, Asyncio, DAG' },
        { name: 'SQL', level: 88, desc: 'PostgreSQL, MySQL, Indexing' },
        { name: 'Groovy', level: 80, desc: 'Backend Logic & Auth Scripting' },
      ]
    },
    {
      key: 'backendAndFrameworks',
      title: 'Backend & Frameworks',
      icon: Server,
      skills: [
        { name: 'Spring Boot', level: 92, desc: 'REST, JPA, Security, Gateway' },
        { name: 'Spring MVC', level: 88, desc: 'Controllers, Filters, Interceptors' },
        { name: 'Spring Data JPA', level: 88, desc: 'Repositories, Entity Mapping' },
        { name: 'Node.js', level: 88, desc: 'Event Loop, Non-blocking I/O' },
        { name: 'Express.js', level: 85, desc: 'REST APIs, Middleware' },
        { name: 'FastAPI', level: 85, desc: 'Async Endpoints, OpenAPI' },
        { name: 'OOP & Design Patterns', level: 90, desc: 'Solid, Factory, Singleton, Strategy' },
      ]
    },
    {
      key: 'frontend',
      title: 'Frontend & UI',
      icon: Layers,
      skills: [
        { name: 'React.js', level: 90, desc: 'Hooks, Custom Components, SPA' },
        { name: 'Redux', level: 82, desc: 'State Management, Actions' },
        { name: 'Context API', level: 88, desc: 'Lightweight App State' },
        { name: 'HTML5 / CSS3', level: 92, desc: 'Flexbox, Grid, Animations' },
        { name: 'Vite', level: 90, desc: 'HMR, Fast Bundling' },
        { name: 'Zustand', level: 80, desc: 'Modern React State' },
      ]
    },
    {
      key: 'apisAndArchitecture',
      title: 'APIs & Architecture',
      icon: Cpu,
      skills: [
        { name: 'RESTful APIs', level: 95, desc: 'Clean Contract Design & HTTP Specs' },
        { name: 'GraphQL (Apollo)', level: 85, desc: 'Queries, Mutations, Schema Design' },
        { name: 'Microservices Architecture', level: 88, desc: 'Decoupled Systems, Service Discovery' },
        { name: 'System Design', level: 85, desc: 'Scalability, Load Balancing, Caching' },
        { name: 'Distributed Systems', level: 86, desc: 'Token Bucket, Rate Limiting, Fault Tolerance' },
        { name: 'JSON/XML Exchange', level: 90, desc: 'Payload Parsing & Serialisation' },
      ]
    },
    {
      key: 'databasesAndCaching',
      title: 'Databases & Caching',
      icon: Database,
      skills: [
        { name: 'PostgreSQL', level: 88, desc: 'Relational Schemas, Indexing' },
        { name: 'Redis', level: 90, desc: 'Caching, Rate Limiting, Key-Value' },
        { name: 'MongoDB', level: 85, desc: 'NoSQL Aggregation, Document Store' },
        { name: 'MySQL', level: 85, desc: 'Transactions, Joins, Queries' },
      ]
    },
    {
      key: 'devOpsAndTools',
      title: 'DevOps & Tools',
      icon: Terminal,
      skills: [
        { name: 'Docker', level: 88, desc: 'Containerization & Multi-stage Builds' },
        { name: 'Docker Compose', level: 86, desc: 'Multi-container Orchestration' },
        { name: 'Git & GitHub', level: 92, desc: 'Version Control & Branching Strategy' },
        { name: 'CI/CD Pipelines', level: 80, desc: 'Automated Testing & Build Automation' },
        { name: 'Postman / ReadyAPI', level: 90, desc: 'API Testing & Automation Suites' },
      ]
    },
    {
      key: 'practices',
      title: 'Practices & Methodologies',
      icon: ShieldCheck,
      skills: [
        { name: 'Agile / Scrum', level: 90, desc: 'Sprints, Standups, Retrospectives' },
        { name: 'Data Structures & Algo', level: 88, desc: 'Optimized Time/Space Complexity' },
        { name: 'Code Reviews', level: 90, desc: 'Clean Code, Standard Practices' },
        { name: 'Unit & Integration Testing', level: 86, desc: 'JUnit, Mockito, Integration Tests' },
        { name: 'Technical Documentation', level: 90, desc: 'System Specs, API Docs' },
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
            Comprehensive breakdown of 25+ technology skills across backend engineering, full-stack development, database optimization, and DevOps.
          </p>
        </div>

        {/* Controls: Search & Category Tabs */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">

          {/* Search Input */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search skill (e.g. Redis, Java)..."
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
