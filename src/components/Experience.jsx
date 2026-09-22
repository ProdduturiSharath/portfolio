import React, { useState } from 'react';
import { Briefcase, Calendar, MapPin, ChevronDown, ChevronUp, CheckCircle2, Cpu, Sparkles } from 'lucide-react';

export default function Experience({ experienceData }) {
  const [expandedId, setExpandedId] = useState('ltimindtree-ai-se');

  const defaultList = [
    {
      id: 'ltimindtree-ai-se',
      company: 'LTIMindtree',
      location: 'Bangalore, India',
      period: 'June 2025 – Present',
      role: 'Software Engineer',
      isCurrent: true,
      techStack: [
        'React', 'Node.js', 'Express', 'SQL', 'LLM Tool Calling', 'FastAPI', 'Cursor', 'GitHub Copilot'
      ],
      impactMetrics: [
        { label: 'Manual Provisioning Time', value: '-70%', detail: 'Automated multi-step API transactions' },
        { label: 'Conversational Agent', value: 'Real-time', detail: 'Dynamic intent recognition & tool calling' },
        { label: 'Enterprise Platform', value: 'Self-Service', detail: 'Central hub for internal data orchestration' }
      ],
      highlights: [
        'Collaborated in developing full-stack enterprise Self-Service Portal (SSP) using React, Node.js, Express, and SQL, serving as the centralized hub for internal automation and enterprise data orchestration.',
        'Integrated an LLM-driven conversational agent into the portal, implementing dynamic intent recognition and function/tool calling to parse natural-language user requests in real time.',
        'Engineered the backend to translate parsed intents into strictly validated, structured JSON API payloads, integrating seamlessly with distributed enterprise systems.',
        'Developed automated data pipelines to orchestrate complex, multi-step API transactions spanning authentication, dynamic rate querying, and secure tokenization, reducing manual data provisioning time by 70%.',
        'Accelerated the platform development lifecycle by leveraging AI-assisted programming tools (Cursor, Copilot) for rapid full-stack development.'
      ]
    },
    {
      id: 'hcl-tech-intern',
      company: 'HCL Technologies',
      location: 'Chennai, India',
      period: 'Feb 2024 – May 2024',
      role: 'Software Engineering Intern',
      isCurrent: false,
      techStack: [
        'Full-Stack Web Dev', 'RESTful APIs', 'Agile / Scrum'
      ],
      impactMetrics: [
        { label: 'Architecture', value: 'RESTful', detail: 'Scalable service architectures' },
        { label: 'Environment', value: 'Agile', detail: 'Sprint delivery and SDLC execution' },
        { label: 'Application Scope', value: 'Full-Stack', detail: 'Enterprise web application features' }
      ],
      highlights: [
        'Contributed to the development of full-stack web applications & scalable RESTful architectures within an Agile environment.'
      ]
    }
  ];

  const list = (experienceData && experienceData.length > 0)
    ? experienceData
    : defaultList;

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
            Track record of shipping enterprise software, conversational AI agents, automated data pipelines, and full-stack solutions at scale.
          </p>
        </div>

        {/* Interactive Vertical Timeline */}
        <div className="max-w-4xl mx-auto relative">
          
          {/* Vertical Line */}
          <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-0.5 bg-[#1e293b] -translate-x-1/2 hidden sm:block"></div>

          {list.map((exp) => {
            const isExpanded = expandedId === exp.id;
            const cardMetrics = exp.impactMetrics || [
              { label: 'Architecture', value: 'RESTful', detail: 'Production enterprise systems' }
            ];
            const cardStack = exp.techStack || ['Full-Stack', 'REST APIs', 'Agile'];
            const isCurrentRole = Boolean(exp.isCurrent || (exp.period && exp.period.includes('Present')));

            return (
              <div key={exp.id} className="relative mb-12 last:mb-0">

                {/* Timeline Dot */}
                <div className="absolute left-4 sm:left-1/2 -translate-x-1/2 top-6 w-8 h-8 rounded-full bg-[#111827] border-2 border-sky-400 flex items-center justify-center z-10 shadow-sm hidden sm:flex">
                  <div className={`w-2.5 h-2.5 rounded-full ${isCurrentRole ? 'bg-emerald-400' : 'bg-sky-400'}`}></div>
                </div>

                {/* Card Container */}
                <div className="bg-[#111827] border border-[#1e293b] rounded-xl p-6 sm:p-8 hover:border-[#374151] transition-all duration-200 shadow-sm relative z-0">
                  
                  {/* Card Header Info */}
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#1e293b] pb-5">
                    <div>
                      {isCurrentRole && (
                        <div className="flex items-center space-x-2 text-xs font-mono text-emerald-400 mb-1">
                          <Sparkles className="w-3.5 h-3.5" />
                          <span>Current Role</span>
                        </div>
                      )}
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
                  <div className={`grid grid-cols-1 sm:grid-cols-${Math.min(cardMetrics.length, 3)} gap-3 my-6`}>
                    {cardMetrics.map((metric, idx) => (
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
                    {cardStack.map((tech) => (
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
