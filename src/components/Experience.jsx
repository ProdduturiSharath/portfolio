import React, { useState } from 'react';
import { Briefcase, Calendar, MapPin, ChevronDown, ChevronUp, CheckCircle2, Cpu, Sparkles } from 'lucide-react';

export default function Experience({ experienceData }) {
  const [expandedId, setExpandedId] = useState('ltimindtree-se');

  const list = (experienceData && experienceData.length > 0)
    ? experienceData
    : [
        {
          id: 'ltimindtree-se',
          company: 'LTIMindtree',
          location: 'Bangalore, India',
          period: 'June 2025 – Present',
          role: 'Software Engineer (Backend / Full-Stack)',
          highlights: [
            'Designed, developed, and deployed a full-stack enterprise portal (Java, React.js, Node.js, Express, SQL) to manage complex reservation and loyalty operations, replacing manual workflows for cross-functional teams.',
            'Built and integrated a natural-language chatbot service, parsing user commands into RESTful API requests to automate data retrieval and task execution across the platform.',
            'Engineered backend orchestration scripts in Groovy to handle multi-step business logic, including multi-channel authentication, dynamic rate querying, and secure payment tokenization.',
            'Integrated enterprise-level GraphQL services (Apollo/UXL), constructing dynamic payloads to ensure robust, low-latency data exchange for booking workflows.',
            'Designed programmatic interfaces to distributed enterprise systems (ACRS, MARSHA), enabling automated user profile creation and loyalty point allocation via REST endpoints.',
            'Collaborated with cross-functional and Agile teams throughout the SDLC — from requirements analysis to release — to deliver scalable, production-ready features.'
          ]
        }
      ];

  const techStack = [
    'Java', 'Spring Boot', 'React.js', 'Node.js', 'Express', 'SQL',
    'GraphQL (Apollo)', 'Groovy', 'ACRS & MARSHA APIs', 'REST APIs', 'Agile/SDLC'
  ];

  const impactMetrics = [
    { label: 'Manual Workflow Reduction', value: '100%', detail: 'Replaced manual ops with enterprise portal' },
    { label: 'Chatbot Automation', value: 'Natural Language', detail: 'Parses commands into REST API calls' },
    { label: 'Enterprise Systems Integration', value: 'ACRS & MARSHA', detail: 'Automated profile & loyalty allocation' },
  ];

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section id="experience" className="py-20 relative bg-[#0b0f19]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-md bg-[#111827] border border-[#1e293b] text-xs font-mono text-sky-400 mb-3">
            <Briefcase className="w-3.5 h-3.5" />
            <span>Professional Career</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
            Engineering <span className="text-sky-400">Experience</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Track record of shipping enterprise software, backend orchestrations, and full-stack solutions at scale.
          </p>
        </div>

        {/* Interactive Vertical Timeline */}
        <div className="max-w-4xl mx-auto relative">
          
          {/* Vertical Line */}
          <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-0.5 bg-[#1e293b] -translate-x-1/2 hidden sm:block"></div>

          {list.map((exp) => {
            const isExpanded = expandedId === exp.id;
            return (
              <div key={exp.id} className="relative mb-12 last:mb-0">

                {/* Timeline Dot */}
                <div className="absolute left-4 sm:left-1/2 -translate-x-1/2 top-6 w-8 h-8 rounded-full bg-[#111827] border-2 border-sky-400 flex items-center justify-center z-10 shadow-sm hidden sm:flex">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-400"></div>
                </div>

                {/* Card Container */}
                <div className="bg-[#111827] border border-[#1e293b] rounded-xl p-6 sm:p-8 hover:border-[#374151] transition-all duration-200 shadow-sm relative z-0">
                  
                  {/* Card Header Info */}
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#1e293b] pb-5">
                    <div>
                      <div className="flex items-center space-x-2 text-xs font-mono text-emerald-400 mb-1">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Current Role</span>
                      </div>
                      <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                        {exp.role}
                      </h3>
                      <div className="text-base font-semibold text-sky-400 flex items-center space-x-2 mt-1">
                        <span>{exp.company}</span>
                        <span className="text-slate-600">•</span>
                        <span className="text-slate-400 text-xs font-mono flex items-center">
                          <MapPin className="w-3.5 h-3.5 mr-1 text-slate-500" />
                          {exp.location}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <div className="px-3 py-1.5 rounded-md bg-[#1f2937] border border-[#374151] text-xs font-mono text-slate-300 flex items-center space-x-2">
                        <Calendar className="w-3.5 h-3.5 text-sky-400" />
                        <span>{exp.period}</span>
                      </div>

                      <button
                        onClick={() => toggleExpand(exp.id)}
                        className="p-2 rounded-md bg-[#1f2937] border border-[#374151] hover:bg-[#374151] text-slate-300 hover:text-white transition-colors focus:outline-none"
                        aria-label="Toggle Details"
                      >
                        {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>

                  {/* Impact Metrics Callouts Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-6">
                    {impactMetrics.map((metric, idx) => (
                      <div key={idx} className="p-3.5 rounded-lg bg-[#1f2937] border border-[#374151]">
                        <div className="text-xs text-slate-400 font-mono mb-1">{metric.label}</div>
                        <div className="text-lg font-bold text-sky-400 font-mono">{metric.value}</div>
                        <div className="text-[11px] text-slate-400 mt-0.5">{metric.detail}</div>
                      </div>
                    ))}
                  </div>

                  {/* Expandable Accomplishments List */}
                  {isExpanded && (
                    <div className="space-y-3 pt-2 border-t border-[#1e293b]">
                      <h4 className="text-xs font-mono font-semibold text-slate-400 uppercase tracking-wider">
                        Key Accomplishments & System Deliverables:
                      </h4>
                      <ul className="space-y-3">
                        {exp.highlights.map((item, idx) => (
                          <li key={idx} className="flex items-start space-x-3 text-xs sm:text-sm text-slate-300 leading-relaxed">
                            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Tech Stack Badges */}
                  <div className="mt-6 pt-4 border-t border-[#1e293b] flex flex-wrap items-center gap-2">
                    <span className="text-xs font-mono text-slate-400 mr-2 flex items-center">
                      <Cpu className="w-3.5 h-3.5 mr-1 text-sky-400" />
                      Stack:
                    </span>
                    {techStack.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 rounded-md bg-[#1f2937] border border-[#374151] text-[11px] font-mono text-slate-300 hover:border-sky-400 hover:text-sky-400 transition-colors"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                </div>

              </div>
            );
          })}

        </div>

      </div>
    </section>
  );
}
