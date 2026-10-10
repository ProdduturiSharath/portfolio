import React from 'react';
import { ArrowRight, ChevronDown, GitBranch, Workflow } from 'lucide-react';
import { useAnalytics } from './AnalyticsConsent';

export default function ArchitectureDiagram({ architecture, projectTitle }) {
  if (!architecture?.steps?.length) return null;
  const { trackEvent } = useAnalytics();

  return (
    <details className="technical-diagram" onToggle={event => {
      if (event.currentTarget.open) trackEvent('architecture_expand', { project_id: projectTitle === 'Enterprise Multi-Agent AI Orchestration Platform' ? 'enterprise-multi-agent-platform' : projectTitle === 'SLM Instruction Fine-Tuning' ? 'slm-instruction-fine-tuning' : 'enterprise-rag-document-intelligence' });
    }}>
      <summary>
        <span className="architecture-summary-label">
          <Workflow size={18} aria-hidden="true" />
          Detailed architecture
        </span>
        <ChevronDown className="architecture-disclosure" size={17} aria-hidden="true" />
      </summary>

      <figure className="architecture-map" aria-label={`Detailed architecture for ${projectTitle}`}>
        <figcaption>{architecture.overview}</figcaption>
        <p className="architecture-flow-label">{architecture.flowLabel}</p>
        <ol className="architecture-stages" aria-label={architecture.flowLabel}>
          {architecture.steps.map((step, index) => (
            <li key={step.id} className="architecture-stage">
              <span className="architecture-stage-number mono" aria-hidden="true">
                {String(index + 1).padStart(2, '0')}
              </span>
              <strong>{step.title}</strong>
              <p>{step.description}</p>
              <span className="architecture-tech">{step.technology}</span>
              {index < architecture.steps.length - 1 && (
                <ArrowRight className="architecture-connector" size={18} aria-hidden="true" />
              )}
            </li>
          ))}
        </ol>

        {architecture.supports?.length > 0 && (
          <>
            <p className="architecture-support-label">{architecture.supportLabel}</p>
            <ul className="architecture-supports" aria-label={architecture.supportLabel}>
              {architecture.supports.map(system => (
                <li key={system.id}>
                  <span className="architecture-relationship">
                    <GitBranch size={14} aria-hidden="true" />
                    {system.relationship}
                  </span>
                  <strong>{system.title}</strong>
                  <p>{system.description}</p>
                  <span className="architecture-tech">{system.technology}</span>
                </li>
              ))}
            </ul>
          </>
        )}
      </figure>
    </details>
  );
}
