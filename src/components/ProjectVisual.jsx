import React, { useId } from 'react';

function Chip({ x, y, label, primary = false }) {
  return (
    <g transform={`translate(${x} ${y})`} className={primary ? 'diagram-chip primary-chip' : 'diagram-chip'}>
      <path d="M-49 0 0 25 49 0V12L0 37-49 12Z" fill={primary ? '#544a38' : '#262d29'} stroke="currentColor" strokeWidth="0.7" />
      <path d="M-49 0 0-25 49 0 0 25Z" fill={primary ? '#b8a27e' : '#354039'} stroke="currentColor" strokeWidth="0.7" />
      <path d="m-29 0 29-15 29 15-29 15Z" fill="none" stroke={primary ? '#e4d3b2' : '#738778'} strokeWidth="0.7" />
      <path d="M0 25V37" stroke="currentColor" strokeWidth="0.7" />
      <circle cy="0" r="3" fill={primary ? '#f3e4c5' : '#a9bbab'} />
      <text y="61" textAnchor="middle">{label}</text>
    </g>
  );
}

export default function ProjectVisual({ type = 'agents' }) {
  const id = useId().replace(/:/g, '');
  return (
    <div className={`project-visual visual-${type}`} aria-hidden="true">
      <div className="visual-grid" />
      <svg viewBox="0 0 600 340" fill="none" className="architecture-art">
        <defs>
          <linearGradient id={`plate-${id}`} x1="170" y1="100" x2="390" y2="240" gradientUnits="userSpaceOnUse">
            <stop stopColor="#a2b5a4" /><stop offset="1" stopColor="#3a5146" />
          </linearGradient>
        </defs>
        {type === 'agents' && <>
          <g className="diagram-connections" stroke="#778476" strokeWidth="1">
            <path d="M300 82V138M300 150 154 222M300 150 446 222M300 175V266" />
            <path d="M154 235 300 305 446 235" strokeDasharray="3 6" opacity="0.35" />
            <circle cx="300" cy="105" r="3" fill="#bba883" /><circle cx="211" cy="194" r="3" fill="#bba883" /><circle cx="389" cy="194" r="3" fill="#bba883" />
          </g>
          <text x="300" y="52" textAnchor="middle" className="diagram-small-label">NATURAL LANGUAGE QUERY</text>
          <Chip x={300} y={140} label="ORCHESTRATOR" primary />
          <Chip x={154} y={222} label="RESEARCH" />
          <Chip x={446} y={222} label="EXECUTION" />
          <circle cx="300" cy="275" r="5" fill="#a5b8a4" />
          <circle cx="300" cy="275" r="11" stroke="#738778" opacity="0.4" />
        </>}
        {type === 'tuning' && <>
          {[74, 37, 0].map((offset, i) => <g key={offset} transform={`translate(0 ${offset})`}>
            <path d="m168 139 132-67 132 67v12l-132 67-132-67Z" fill="#28352f" stroke="#768e7d" strokeWidth="0.7" />
            <path d="m168 139 132-67 132 67-132 67Z" fill={i === 2 ? `url(#plate-${id})` : '#35493e'} stroke="#94a893" strokeWidth="0.7" />
            {Array.from({ length: 5 }, (_, line) => <path key={line} d={`M${194 + line * 23} ${126 - line * 11.5}l106 54`} stroke="#b4c7b4" strokeWidth="0.6" opacity="0.35" />)}
            <path d="m218 139 82-41 82 41-82 41Z" fill="none" stroke="#bed0b8" opacity="0.5" />
          </g>)}
          <text x="300" y="143" textAnchor="middle" className="model-label">8B</text>
          <path d="M438 141h38v76h-36M163 215h-39v-76h36" stroke="#8c9f8a" strokeDasharray="3 5" />
          <text x="300" y="311" textAnchor="middle" className="diagram-small-label">LLAMA 3 + QLORA · PRECISE BY DESIGN</text>
        </>}
        {type === 'retrieval' && <>
          <g transform="translate(105 145)">
            {[18, 9, 0].map(offset => <g key={offset} transform={`translate(${offset} ${-offset})`}>
              <path d="m0 0 62-32 45 23v78l-62 32-45-23Z" fill="#30382f" stroke="#8c9980" strokeWidth="0.8" />
              <path d="m16 10 45-23M16 25l59-30M16 40l59-30M16 55l38-19" stroke="#89977d" opacity="0.65" />
            </g>)}
          </g>
          <path d="m232 167 58-28 62 30M352 169l64 31" stroke="#b6a47f" strokeWidth="1" />
          <circle cx="267" cy="150" r="3" fill="#c8b58b" />
          <g transform="translate(305 131)">
            <path d="m-39 1 39-21 39 21v61L0 83-39 62Z" fill="#3d4232" stroke="#b6ae88" strokeWidth="0.8" />
            <path d="m-39 1 39 22L39 1M0 23v60" stroke="#b6ae88" strokeWidth="0.8" />
            {[0, 1, 2].map(i => <path key={i} d={`m-30 ${20 + i * 15} 22 12m16 0 22-12`} stroke="#aeaa7e" strokeWidth="1.5" />)}
          </g>
          <Chip x={452} y={205} label="GROUNDED ANSWER" primary />
          <text x="160" y="276" textAnchor="middle" className="diagram-small-label">KNOWLEDGE</text>
          <text x="305" y="251" textAnchor="middle" className="diagram-small-label">HYBRID SEARCH</text>
        </>}
      </svg>
      <span className="visual-corner top-left" /><span className="visual-corner bottom-right" />
      <span className="visual-annotation mono">{type === 'agents' ? '01 / DISTRIBUTED INTELLIGENCE' : type === 'tuning' ? '02 / PARAMETER-EFFICIENT LEARNING' : '03 / CONTEXT-AWARE RETRIEVAL'}</span>
    </div>
  );
}
