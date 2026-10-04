/**
 * API service for AI Engineer Portfolio.
 * Provides local static dataset and Formspree contact submission.
 */

// Primary dataset matching AI Engineer portfolio structure
const PORTFOLIO_DATA = {
  personalInfo: {
    name: "Prodduturi Sharath Chandra",
    title: "AI Engineer | Generative AI | LLM & Multi-Agent Systems | RAG Pipelines",
    phone: "+91 9642730647",
    email: "sharathchandraprodduturi@gmail.com",
    linkedin: "https://linkedin.com/in/prodduturisharath",
    github: "https://github.com/ProdduturiSharath",
    portfolio: "https://prodduturisharath.github.io/portfolio/",
    location: "Bangalore, India"
  },
  summary: "AI Engineer with experience in architecting and deploying Generative AI ecosystems, specializing in multi-agent orchestration, advanced RAG pipelines, and instruction fine-tuning for Small Language Models (SLMs). Proficient in building highly scalable, fault-tolerant AI backend infrastructure using Python, LangChain, FastAPI, and vector databases. Strong focus on bridging robust full-stack engineering with LLM capabilities to deliver low-latency enterprise applications.",
  technicalSkills: {
    generativeAi: [
      "RAG Architecture",
      "Multi-Agent Systems",
      "LangChain",
      "LlamaIndex",
      "Prompt Engineering",
      "Function/Tool Calling",
      "Fine Tuning (QLoRA)",
      "Gemini / Llama Integration"
    ],
    mlDataStorage: [
      "PyTorch",
      "HuggingFace",
      "Pinecone (Vector DB)",
      "Hybrid Search (Dense + Sparse, BM25)",
      "PostgreSQL (Relational & JSONB)",
      "MongoDB"
    ],
    languages: [
      "Python",
      "JavaScript / TypeScript",
      "Java",
      "SQL"
    ],
    backendAndInfrastructure: [
      "FastAPI",
      "Node.js",
      "Express.js",
      "React.js",
      "GraphQL",
      "Docker",
      "vLLM",
      "Unsloth",
      "Git",
      "Cursor",
      "GitHub Copilot"
    ]
  },
  professionalExperience: [
    {
      id: "ltimindtree-ai-se",
      company: "LTIMindtree",
      location: "Bangalore, India",
      period: "June 2025 – Present",
      role: "Software Engineer",
      isCurrent: true,
      techStack: [
        "React",
        "Node.js",
        "Express",
        "SQL",
        "LLM Tool Calling",
        "FastAPI",
        "Cursor",
        "GitHub Copilot"
      ],
      impactMetrics: [
        { label: "Manual Provisioning Time", value: "-70%", detail: "Automated multi-step API transactions" },
        { label: "Conversational Agent", value: "Real-time", detail: "Dynamic intent recognition & tool calling" },
        { label: "Enterprise Platform", value: "Self-Service", detail: "Central hub for internal data orchestration" }
      ],
      highlights: [
        "Collaborated in developing full-stack enterprise Self-Service Portal (SSP) using React, Node.js, Express, and SQL, serving as the centralized hub for internal automation and enterprise data orchestration.",
        "Integrated an LLM-driven conversational agent into the portal, implementing dynamic intent recognition and function/tool calling to parse natural-language user requests in real time.",
        "Engineered the backend to translate parsed intents into strictly validated, structured JSON API payloads, integrating seamlessly with distributed enterprise systems.",
        "Developed automated data pipelines to orchestrate complex, multi-step API transactions spanning authentication, dynamic rate querying, and secure tokenization, reducing manual data provisioning time by 70%.",
        "Accelerated the platform development lifecycle by leveraging AI-assisted programming tools (Cursor, Copilot) for rapid full-stack development."
      ]
    },
    {
      id: "hcl-tech-intern",
      company: "HCL Technologies",
      location: "Chennai, India",
      period: "Feb 2024 – May 2024",
      role: "Software Engineering Intern",
      isCurrent: false,
      techStack: [
        "Full-Stack Web Dev",
        "RESTful APIs",
        "Agile / Scrum"
      ],
      impactMetrics: [
        { label: "Architecture", value: "RESTful", detail: "Scalable service architectures" },
        { label: "Environment", value: "Agile", detail: "Sprint delivery and SDLC execution" },
        { label: "Application Scope", value: "Full-Stack", detail: "Enterprise web application features" }
      ],
      highlights: [
        "Contributed to the development of full-stack web applications & scalable RESTful architectures within an Agile environment."
      ]
    }
  ],
  projects: [
    {
      id: "enterprise-multi-agent-platform",
      title: "Enterprise Multi-Agent AI Orchestration Platform",
      category: "Multi-Agent & LLM",
      technologies: ["Python", "LangChain", "FastAPI", "React", "PostgreSQL", "Docker"],
      description: "Engineered an asynchronous multi-agent orchestration engine that translates natural-language queries into parallelized DAGs, reducing overall task execution latency by 40%.",
      highlights: [
        "Engineered an asynchronous multi-agent orchestration engine that translates natural-language queries into parallelized DAGs, reducing overall task execution latency by 40%.",
        "Designed an intelligent LLM routing dispatcher that enforces strict schema validation, guaranteeing deterministic, structured outputs and eliminating malformed API payloads.",
        "Implemented a self-healing LLM invocation pipeline featuring cross-provider fallback routing and exponential backoff, achieving 100% system uptime against external API rate limits.",
        "Parallelized sub-task execution using Python's asyncio, backed by a hybrid PostgreSQL state management system to persist complex, unpredictable LLM workflows."
      ],
      keyInnovations: [
        "Dynamic DAG Query-to-Workflow Compiler reducing latency by 40%",
        "Zero-Malformed Output Schema Validation Dispatcher",
        "Cross-Provider Self-Healing Fallback Pipeline with Exponential Backoff"
      ],
      architecture: {
        overview: "Natural language becomes a validated, parallel workflow, backed by resilient model calls and persistent execution state.",
        flowLabel: "Request execution",
        steps: [
          {
            id: "query",
            title: "User query",
            description: "A natural-language request enters the orchestration service.",
            technology: "React · FastAPI"
          },
          {
            id: "router",
            title: "Intent routing",
            description: "The LLM dispatcher interprets intent and validates structured task payloads.",
            technology: "LangChain · Schema validation"
          },
          {
            id: "execution",
            title: "Parallel execution",
            description: "Independent tasks run concurrently within a directed acyclic graph.",
            technology: "Python · asyncio"
          }
        ],
        supportLabel: "Reliability & state",
        supports: [
          {
            id: "resilience",
            relationship: "Supports LLM routing",
            title: "Provider resilience",
            description: "Cross-provider fallbacks and exponential backoff handle failed or rate-limited model calls.",
            technology: "Fallback routing · Retry pipeline"
          },
          {
            id: "state",
            relationship: "Persists workflow execution",
            title: "Workflow state",
            description: "Task state and execution history are stored for complex, long-running LLM workflows.",
            technology: "PostgreSQL · JSONB"
          }
        ]
      }
    },
    {
      id: "slm-instruction-fine-tuning",
      title: "SLM Instruction Fine-Tuning",
      category: "Fine-Tuning & SLM",
      technologies: ["Python", "PyTorch", "Unsloth", "QLoRA", "HuggingFace TRL", "vLLM"],
      description: "Fine-tuned an open-weights Llama 3 (8B) model using Unsloth and QLoRA, optimizing the model to extract strictly typed JSON payloads from unstructured enterprise support tickets.",
      highlights: [
        "Fine-tuned an open-weights Llama 3 (8B) model using Unsloth and QLoRA, optimizing the model to extract strictly typed JSON payloads (issue severity, component, intent) from unstructured enterprise support tickets.",
        "Curated a synthetic training dataset of 5,000+ support interactions and evaluated model performance based on JSON Schema Validation Pass Rate, achieving a 98% perfectly parsable output rate.",
        "Implemented Parameter-Efficient Fine-Tuning (PEFT) to update <2% of total model parameters, drastically reducing VRAM requirements for training while preventing catastrophic forgetting."
      ],
      keyInnovations: [
        "Unsloth 2x Faster QLoRA Parameter-Efficient Tuning (<2% parameters)",
        "98% JSON Schema Validation Pass Rate on Enterprise Tickets",
        "High-Throughput Low-Latency Serving with vLLM"
      ],
      architecture: {
        overview: "A focused training pipeline adapts an open-weights model to extract structured data from enterprise support tickets.",
        flowLabel: "Instruction fine-tuning",
        steps: [
          {
            id: "dataset",
            title: "Support dataset",
            description: "5,000+ synthetic support interactions form the instruction dataset.",
            technology: "Enterprise support tickets"
          },
          {
            id: "training",
            title: "Efficient training",
            description: "QLoRA updates fewer than 2% of model parameters to reduce training memory needs.",
            technology: "Unsloth · QLoRA · TRL"
          },
          {
            id: "model",
            title: "Adapted model",
            description: "Llama 3 extracts typed JSON fields for severity, component, and intent.",
            technology: "Llama 3 · 8B parameters"
          }
        ],
        supportLabel: "Evaluation & serving",
        supports: [
          {
            id: "evaluation",
            relationship: "Validates model output",
            title: "Schema evaluation",
            description: "A synthetic evaluation suite checks JSON schema compliance, achieving a 98% pass rate.",
            technology: "JSON Schema validation"
          },
          {
            id: "serving",
            relationship: "Serves the adapted model",
            title: "Inference serving",
            description: "The fine-tuned model is served through vLLM for high-throughput, low-latency inference.",
            technology: "vLLM"
          }
        ]
      }
    },
    {
      id: "enterprise-rag-document-intelligence",
      title: "Enterprise RAG Document Intelligence Pipeline",
      category: "RAG & Vector Search",
      technologies: ["Python", "LangChain", "FastAPI", "Pinecone", "Hybrid Search (BM25)"],
      description: "Engineered a scalable Retrieval-Augmented Generation (RAG) pipeline to ingest, chunk, and embed large-scale proprietary text datasets into a Pinecone vector database for low-latency retrieval.",
      highlights: [
        "Engineered a scalable Retrieval-Augmented Generation (RAG) pipeline to ingest, chunk, and embed large-scale proprietary text datasets into a Pinecone vector database for low-latency retrieval.",
        "Implemented a hybrid search architecture fusing dense vector embeddings with sparse keyword search (BM25), improving context retrieval accuracy by 35%.",
        "Designed asynchronous FastAPI endpoints to orchestrate contextual querying via LangChain, dynamically injecting retrieved vector chunks to reduce model hallucinations by over 85%."
      ],
      keyInnovations: [
        "Dense + Sparse Hybrid Search (Pinecone Vector DB + BM25)",
        ">85% Hallucination Reduction via Dynamic Context Injection",
        "Asynchronous FastAPI Ingestion and Retrieval Orchestration"
      ],
      architecture: {
        overview: "Enterprise documents are indexed for retrieval, then relevant passages ground the model's responses at query time.",
        flowLabel: "Document ingestion",
        steps: [
          {
            id: "documents",
            title: "Knowledge sources",
            description: "Proprietary enterprise documents enter the ingestion pipeline.",
            technology: "Documents · Knowledge base"
          },
          {
            id: "indexing",
            title: "Chunk & embed",
            description: "Text is split into chunks, embedded, and prepared for dense and sparse search.",
            technology: "LangChain · Embeddings"
          },
          {
            id: "storage",
            title: "Vector storage",
            description: "Document embeddings are indexed for low-latency semantic retrieval.",
            technology: "Pinecone"
          }
        ],
        supportLabel: "At query time",
        supports: [
          {
            id: "retrieval",
            relationship: "Queries the indexed knowledge",
            title: "Hybrid retrieval",
            description: "Asynchronous endpoints combine dense vector search with BM25 to find relevant context.",
            technology: "FastAPI · Dense + sparse search"
          },
          {
            id: "generation",
            relationship: "Uses the retrieved context",
            title: "Grounded generation",
            description: "Retrieved passages are injected into the prompt, reducing model hallucinations by over 85%.",
            technology: "LangChain · Context injection"
          }
        ]
      }
    }
  ],
  education: [
    {
      id: "sathyabama-be-cs",
      institution: "Sathyabama Institute of Science and Technology",
      location: "Chennai, Tamil Nadu",
      period: "2021 – 2025",
      degree: "Bachelor of Engineering in Computer Science",
      cgpa: "8.13 / 10.0",
      publication: "Diagnosis of Neurodegenerative Diseases Using Deep Learning Methods — Research Presented at ICRETM 2025"
    }
  ]
};

const FALLBACK_PORTFOLIO_DATA = PORTFOLIO_DATA;

/**
 * Native portfolio data loader.
 * Returns portfolio dataset directly from local data without network HTTP fetch requests.
 */
export async function fetchPortfolioData() {
  return { data: PORTFOLIO_DATA, isFallback: false };
}

/**
 * Submit contact form to Formspree endpoint.
 * @param {Object} formData { name, email, message }
 */
export async function submitContactForm(formData) {
  const formIdOrUrl = import.meta.env?.VITE_FORMSPREE_FORM_ID || 'https://formspree.io/f/YOUR_FORM_ID';
  const endpoint = formIdOrUrl.startsWith('http')
    ? formIdOrUrl
    : `https://formspree.io/f/${formIdOrUrl}`;

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      return {
        success: true,
        message: 'Message sent successfully!',
      };
    }

    let errorMessage = 'Failed to submit form.';
    try {
      const result = await response.json();
      if (result.errors && Array.isArray(result.errors)) {
        errorMessage = result.errors
          .map((err) => (typeof err === 'object' ? err.message || err.field || JSON.stringify(err) : err))
          .join(' ');
      } else if (result.error) {
        errorMessage = typeof result.error === 'string' ? result.error : JSON.stringify(result.error);
      } else if (result.message) {
        errorMessage = result.message;
      }
    } catch (_) {
      // Ignore JSON parsing errors if body is not JSON
    }

    return {
      success: false,
      message: errorMessage,
      error: errorMessage,
    };
  } catch (error) {
    console.error('[API] contact submission error:', error);
    return {
      success: false,
      message: error.message || 'Network error. Could not connect to contact service.',
      error: error.message || 'Network error. Could not connect to contact service.',
    };
  }
}
