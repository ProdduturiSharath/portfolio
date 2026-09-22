import React, { useState } from 'react';
import { Terminal, ArrowRight, Code, Cpu, Briefcase, MapPin, Mail, CheckCircle, Copy } from 'lucide-react';

export default function Hero({ personalInfo }) {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState('bio');

  const copyEmail = () => {
    const email = personalInfo?.email || "sharathchandraprodduturi@gmail.com";
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };



  return (
    <section id="hero" className="relative min-h-[90vh] pt-28 pb-16 flex items-center justify-center bg-[#0b0f19]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">

          {/* Left Column: Hero Main Info */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#111827] border border-[#1e293b] text-xs font-mono text-sky-400 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse"></span>
              <span>Available for AI Engineering Roles & LLM Systems</span>
            </div>

            <div className="space-y-3">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
                Hi, I'm <span className="text-sky-400">Prodduturi Sharath Chandra</span>
              </h1>
              <p className="text-xl sm:text-2xl font-semibold text-slate-300 font-mono">
                AI Engineer <span className="text-emerald-400">(Generative AI & LLM Systems)</span>
              </p>
            </div>

            <p className="text-slate-400 text-base sm:text-lg leading-relaxed max-w-2xl">
              Specializing in architecting and deploying <span className="text-slate-200 font-semibold">Generative AI ecosystems, multi-agent orchestration, advanced RAG pipelines, and instruction fine-tuning</span> for Small Language Models (SLMs). Building scalable, fault-tolerant AI backend infrastructure with Python, LangChain, FastAPI, and vector databases.
            </p>

            {/* Quick Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="#projects"
                className="px-5 py-2.5 rounded-lg bg-sky-400 hover:bg-sky-500 text-[#0b0f19] font-bold text-sm transition-colors shadow-sm flex items-center space-x-2"
              >
                <span>Explore Core Work</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="#contact"
                className="px-5 py-2.5 rounded-lg bg-[#1f2937] hover:bg-[#374151] border border-[#374151] text-slate-200 font-semibold text-sm transition-colors flex items-center space-x-2"
              >
                <Mail className="w-4 h-4 text-sky-400" />
                <span>Contact Me</span>
              </a>

              <button
                onClick={copyEmail}
                className="px-4 py-2.5 rounded-lg bg-[#111827] hover:bg-[#1f2937] border border-[#1e293b] hover:border-[#374151] text-slate-300 text-xs font-mono flex items-center space-x-2 transition-colors"
                title="Copy Email Address"
              >
                {copied ? (
                  <>
                    <CheckCircle className="w-4 h-4 text-emerald-400" />
                    <span className="text-emerald-400">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-slate-400" />
                    <span>{personalInfo?.email || 'sharathchandraprodduturi@gmail.com'}</span>
                  </>
                )}
              </button>
            </div>

            {/* Location & Quick Meta */}
            <div className="flex items-center space-x-6 text-xs text-slate-400 font-mono pt-4 border-t border-[#1e293b]">
              <div className="flex items-center space-x-1.5">
                <MapPin className="w-4 h-4 text-sky-400" />
                <span>Bangalore, India</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                <span>LTIMindtree AI / Full-Stack</span>
              </div>
            </div>
          </div>

          {/* Right Column: Terminal Bio Card */}
          <div className="lg:col-span-5">
            <div className="bg-[#111827] border border-[#1e293b] rounded-xl overflow-hidden shadow-lg">
              {/* Terminal Top Bar */}
              <div className="bg-[#1f2937] px-4 py-3 border-b border-[#374151] flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                  <span className="ml-2 font-mono text-xs text-slate-400">sharath@ai-workstation:~</span>
                </div>
                <div className="flex space-x-1">
                  <button
                    onClick={() => setActiveTab('bio')}
                    className={`px-2.5 py-1 rounded text-xs font-mono transition-colors ${
                      activeTab === 'bio' ? 'bg-sky-500/20 text-sky-400 border border-sky-500/40' : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    bio.json
                  </button>
                  <button
                    onClick={() => setActiveTab('stack')}
                    className={`px-2.5 py-1 rounded text-xs font-mono transition-colors ${
                      activeTab === 'stack' ? 'bg-sky-500/20 text-sky-400 border border-sky-500/40' : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    stack.config
                  </button>
                </div>
              </div>

              {/* Terminal Content Body */}
              <div className="p-5 font-mono text-xs sm:text-sm space-y-3 bg-[#0b0f19] min-h-[300px]">
                {activeTab === 'bio' ? (
                  <>
                    <div className="text-slate-400">
                      <span className="text-emerald-400">$</span> cat ai_engineer_profile.json
                    </div>
                    <div className="text-slate-300 leading-relaxed pl-2 border-l-2 border-sky-500/40">
                      <pre className="whitespace-pre-wrap text-slate-300 font-mono text-xs">
{`{
  "name": "Prodduturi Sharath Chandra",
  "role": "AI Engineer",
  "company": "LTIMindtree",
  "location": "Bangalore, India",
  "specialties": [
    "Multi-Agent Orchestration (DAGs)",
    "Advanced RAG Pipelines (BM25 Hybrid)",
    "SLM Fine-Tuning (QLoRA & Unsloth)",
    "LLM Function & Tool Calling"
  ],
  "status": "Available for High-Impact AI Engineering Roles"
}`}
                      </pre>
                    </div>
                    <div className="flex items-center text-slate-400 text-xs pt-2">
                      <span className="text-emerald-400 mr-2">$</span>
                      <span>systemctl status generative-ai-pipeline</span>
                      <span className="ml-2 w-2 h-4 bg-sky-400 animate-cursor-blink inline-block"></span>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="text-slate-400">
                      <span className="text-emerald-400">$</span> neofetch --ai-stack
                    </div>
                    <div className="space-y-2 text-xs">
                      <div className="flex justify-between border-b border-[#1e293b] pb-1.5">
                        <span className="text-sky-400">Gen AI:</span>
                        <span className="text-slate-300">LangChain, LlamaIndex, RAG, QLoRA</span>
                      </div>
                      <div className="flex justify-between border-b border-[#1e293b] pb-1.5">
                        <span className="text-emerald-400">ML / Storage:</span>
                        <span className="text-slate-300">PyTorch, Pinecone, BM25, Postgres</span>
                      </div>
                      <div className="flex justify-between border-b border-[#1e293b] pb-1.5">
                        <span className="text-indigo-400">Languages:</span>
                        <span className="text-slate-300">Python, TypeScript, JavaScript, SQL, Java</span>
                      </div>
                      <div className="flex justify-between border-b border-[#1e293b] pb-1.5">
                        <span className="text-amber-400">Backend / Infra:</span>
                        <span className="text-slate-300">FastAPI, Node.js, Docker, vLLM, Unsloth</span>
                      </div>
                    </div>
                    <div className="flex items-center text-slate-400 text-xs pt-2">
                      <span className="text-emerald-400 mr-2">$</span>
                      <span className="ml-2 w-2 h-4 bg-emerald-400 animate-cursor-blink inline-block"></span>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

        </div>



      </div>
    </section>
  );
}
