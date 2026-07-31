/**
 * API service for SDE Portfolio.
 * Connects to backend endpoints with fallback to local static dataset.
 */

// Primary dataset matching portfolio structure
const PORTFOLIO_DATA = {
  personalInfo: {
    name: "Prodduturi Sharath Chandra",
    title: "Software Development Engineer (Backend / Full-Stack)",
    phone: "+91 9642730647",
    email: "sharathchandraprodduturi@gmail.com",
    linkedin: "https://linkedin.com/in/sharathchandraprodduturi",
    github: "https://github.com/sharathchandraprodduturi",
    location: "Bangalore, India"
  },
  summary: "Backend-leaning full-stack engineer who turns tangled business logic into systems that hold up under load — a distributed API gateway with a Redis-backed rate limiter, a DAG-driven task engine that parallelizes work with asyncio, an enterprise reservation portal now running in production. Comfortable owning a feature end to end: Java and Spring Boot on the backend, React.js on the front end, REST and GraphQL wiring it together. Most energized by problems where correctness, latency, and clean architecture all have to work at once.",
  technicalSkills: {
    languages: ["Java", "JavaScript", "TypeScript", "Python", "SQL", "Groovy"],
    backendAndFrameworks: ["Spring Boot", "Spring MVC", "Spring Data JPA", "Node.js", "Express.js", "FastAPI", "OOP & Design Patterns"],
    frontend: ["React.js", "Redux", "Context API", "HTML5", "CSS3", "Vite", "Zustand"],
    apisAndArchitecture: ["RESTful APIs", "GraphQL (Apollo)", "Microservices Architecture", "System Design", "Distributed Systems", "JSON/XML Data Exchange"],
    databasesAndCaching: ["PostgreSQL", "MongoDB", "MySQL", "Redis"],
    devOpsAndTools: ["Docker", "Docker Compose", "Git", "GitHub", "CI/CD Pipelines", "Postman", "ReadyAPI"],
    practices: ["Agile/Scrum", "SDLC", "Data Structures & Algorithms", "Code Reviews", "Unit & Integration Testing", "Technical Documentation"]
  },
  professionalExperience: [
    {
      id: "ltimindtree-se",
      company: "LTIMindtree",
      location: "Bangalore, India",
      period: "June 2025 – Present",
      role: "Software Engineer (Backend / Full-Stack)",
      highlights: [
        "Designed, developed, and deployed a full-stack enterprise portal (Java, React.js, Node.js, Express, SQL) to manage complex reservation and loyalty operations, replacing manual workflows for cross-functional teams.",
        "Built and integrated a natural-language chatbot service, parsing user commands into RESTful API requests to automate data retrieval and task execution across the platform.",
        "Engineered backend orchestration scripts in Groovy to handle multi-step business logic, including multi-channel authentication, dynamic rate querying, and secure payment tokenization.",
        "Integrated enterprise-level GraphQL services (Apollo/UXL), constructing dynamic payloads to ensure robust, low-latency data exchange for booking workflows.",
        "Designed programmatic interfaces to distributed enterprise systems (ACRS, MARSHA), enabling automated user profile creation and loyalty point allocation via REST endpoints.",
        "Collaborated with cross-functional and Agile teams throughout the SDLC — from requirements analysis to release — to deliver scalable, production-ready features."
      ]
    }
  ],
  projects: [
    {
      id: "distributed-api-rate-limiter",
      title: "Distributed API Rate Limiter and Gateway",
      technologies: ["Java", "Spring Boot", "Redis", "Docker", "PostgreSQL"],
      description: "Architected a distributed API Gateway in Java and Spring Boot to securely route traffic, manage payloads, and authenticate requests across multiple downstream microservices.",
      highlights: [
        "Architected a distributed API Gateway in Java and Spring Boot to securely route traffic, manage payloads, and authenticate requests across multiple downstream microservices.",
        "Engineered a low-latency Distributed Rate Limiter implementing the Token Bucket algorithm via Redis, preventing API abuse and ensuring high availability under simulated traffic spikes.",
        "Designed a centralized logging and monitoring interceptor to track real-time API latency and error rates, storing transaction metrics in an optimized PostgreSQL schema."
      ],
      architectureDiagram: `
┌─────────────────┐      ┌───────────────────────────┐      ┌─────────────────────────┐
│ Client Request  │ ───► │  Spring Boot Gateway      │ ───► │ Redis Token Bucket      │
└─────────────────┘      │  (JWT Auth & Routing)     │      │ (Rate Limit Check)      │
                         └─────────────┬─────────────┘      └─────────────────────────┘
                                       │
                                       ▼
                         ┌───────────────────────────┐
                         │ PostgreSQL Logging        │
                         │ (Latency & Metrics Audit) │
                         └───────────────────────────┘
      `
    },
    {
      id: "async-task-orchestration",
      title: "Asynchronous Task Orchestration Engine",
      technologies: ["Python", "FastAPI", "PostgreSQL", "React", "Docker"],
      description: "Developed a scalable backend engine that dynamically schedules and processes interdependent tasks within a Directed Acyclic Graph (DAG) architecture.",
      highlights: [
        "Developed a scalable backend engine that dynamically schedules and processes interdependent tasks within a Directed Acyclic Graph (DAG) architecture.",
        "Utilized Python's asyncio to evaluate and execute processes in parallel, reducing overall system latency versus synchronous processing.",
        "Containerized the multi-tier application (frontend, backend, database) using Docker to ensure environment parity and seamless deployment."
      ],
      architectureDiagram: `
┌─────────────────┐      ┌───────────────────────────┐      ┌─────────────────────────┐
│ DAG Workflows   │ ───► │ FastAPI Async Engine      │ ───► │ Python Asyncio Workers  │
│ Definition JSON │      │ (Dependency Resolver)     │      │ (Parallel Task Exec)    │
└─────────────────┘      └─────────────┬─────────────┘      └─────────────────────────┘
                                       │
                                       ▼
                         ┌───────────────────────────┐
                         │ PostgreSQL & Docker       │
                         │ (State & Artifact Storage)│
                         └───────────────────────────┘
      `
    },
    {
      id: "real-estate-property-management",
      title: "Real Estate Property Management Platform",
      technologies: ["Node.js", "Express.js", "MongoDB", "React", "EJS"],
      description: "Built a scalable property management web application using MVC architecture to deliver a responsive UI and secure RESTful APIs.",
      highlights: [
        "Built a scalable property management web application using MVC architecture to deliver a responsive UI and secure RESTful APIs.",
        "Enhanced backend security by implementing password hashing, role-based access control, and comprehensive payload validation."
      ],
      architectureDiagram: `
┌─────────────────┐      ┌───────────────────────────┐      ┌─────────────────────────┐
│ React Frontend  │ ───► │ Express.js REST API       │ ───► │ MongoDB Database        │
│ & EJS Templates │      │ (MVC & RBAC Controller)   │      │ (Property & User Docs)  │
└─────────────────┘      └───────────────────────────┘      └─────────────────────────┘
      `
    }
  ],
  education: [
    {
      id: "sathyabama-be-cs",
      institution: "Sathyabama Institute of Science and Technology",
      location: "Chennai, Tamil Nadu",
      period: "2021 – 2025",
      degree: "Bachelor of Engineering in Computer Science",
      cgpa: "8.13"
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
