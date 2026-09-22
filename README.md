# Prodduturi Sharath Chandra - AI Engineer Portfolio

> **AI Engineer | Generative AI | LLM & Multi-Agent Systems | RAG Pipelines**

Welcome to the source code for my personal AI Engineer portfolio! 🚀

[![Status: Live](https://img.shields.io/badge/Status-Live-success?style=flat)](https://prodduturisharath.github.io/portfolio/)
![React](https://img.shields.io/badge/React-18-20232A?style=flat&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-5-B73BFE?style=flat&logo=vite&logoColor=FFD62E)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=flat&logo=tailwind-css&logoColor=white)
![LangChain](https://img.shields.io/badge/LangChain-Orchestration-1C3C3C?style=flat)
![FastAPI](https://img.shields.io/badge/FastAPI-Backend-009688?style=flat&logo=fastapi&logoColor=white)

**Live Demo:** [https://prodduturisharath.github.io/portfolio/](https://prodduturisharath.github.io/portfolio/)  
**GitHub:** [https://github.com/ProdduturiSharath](https://github.com/ProdduturiSharath)  
**LinkedIn:** [https://linkedin.com/in/prodduturisharath](https://linkedin.com/in/prodduturisharath)  
**Email:** [sharathchandraprodduturi@gmail.com](mailto:sharathchandraprodduturi@gmail.com)

---

## Overview

This is a modern, high-performance, single-page developer portfolio designed to showcase my experience and projects as an **AI Engineer**. I specialize in architecting and deploying Generative AI ecosystems, multi-agent orchestration, advanced RAG pipelines, and instruction fine-tuning for Small Language Models (SLMs).

The portfolio features a sleek enterprise dark-mode aesthetic with clean lines, solid slate accents, subtle micro-animations, interactive ASCII system architecture diagrams, and an interactive terminal bio. Built on a **100% React-only serverless architecture**, it statically bundles all resume data locally via `src/services/api.js` for instant global rendering with zero cold starts and zero backend hosting dependencies.

---

## Featured AI Engineering Projects

- **Enterprise Multi-Agent AI Orchestration Platform**  
  *Tech: Python, LangChain, FastAPI, React, PostgreSQL, Docker*  
  Engineered an asynchronous multi-agent orchestration engine that translates natural-language queries into parallelized DAGs, reducing overall task execution latency by 40%. Features strict schema validation routing and cross-provider self-healing fallbacks.

- **SLM Instruction Fine-Tuning**  
  *Tech: Python, PyTorch, Unsloth, QLoRA, HuggingFace TRL, vLLM*  
  Fine-tuned an open-weights Llama 3 (8B) model using Unsloth and QLoRA, optimizing parameter-efficient updates (<2% parameters) to extract strictly typed JSON payloads from unstructured enterprise support tickets with a 98% schema pass rate.

- **Enterprise RAG Document Intelligence Pipeline**  
  *Tech: Python, LangChain, FastAPI, Pinecone, Hybrid Search (BM25)*  
  Engineered a scalable Retrieval-Augmented Generation (RAG) pipeline fusing dense vector embeddings with sparse keyword search (BM25) in Pinecone, improving context retrieval accuracy by 35% and dropping hallucinations by >85%.

---

## Technical Skills

- **Generative AI:** RAG Architecture, Multi-Agent Systems, LangChain, LlamaIndex, Prompt Engineering, Function/Tool Calling, Fine-Tuning (QLoRA), Gemini / Llama Integration
- **ML & Data & Storage:** PyTorch, HuggingFace, Pinecone (Vector DB), Hybrid Search (Dense + Sparse, BM25), PostgreSQL (Relational & JSONB), MongoDB
- **Languages:** Python, JavaScript / TypeScript, Java, SQL
- **Backend & Infrastructure:** FastAPI, Node.js, Express.js, React.js, GraphQL, Docker, vLLM, Unsloth, Git, Cursor, GitHub Copilot

---

## Key Architecture & Features

- **Enterprise Dark-Mode UI:** Solid dark palette (`#0b0f19`, `#111827`, `#1f2937`) with slate borders (`#1e293b`), crisp typography (`Inter`, `JetBrains Mono`), and zero glossy glassmorphism.
- **ASCII Architecture Visualizations:** Interactive ASCII flowcharts illustrating intent routing, parallel DAG execution, and hybrid retrieval pipelines.
- **Interactive Terminal Hero:** Terminal-styled profile card toggling between `bio.json` and `stack.config` with real-time command line styling.
- **Serverless Contact Form:** Fully functional contact form integrated directly with [Formspree](https://formspree.io/) featuring client-side schema validation, asynchronous JSON dispatch, and error handling.
- **Native Static Data:** Resume data and project inventories are bundled locally for instant load times and complete decoupling from external database APIs.
- **Responsive Layout:** Optimized across mobile, tablet, and widescreen desktop displays.

---

## Local Development

If you would like to run or inspect this project locally:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/ProdduturiSharath/portfolio.git
   cd portfolio/frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables (Optional):**
   Create a `.env` file in the `frontend/` directory to configure Formspree:
   ```env
   VITE_FORMSPREE_FORM_ID=your_form_id_here
   ```

4. **Start the development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) (or the Vite dev server port shown in terminal) to view the application.

5. **Build for production:**
   ```bash
   npm run build
   ```

6. **Preview production build:**
   ```bash
   npm run preview
   ```

---

## Testing & Quality Assurance

The project includes an automated 4-tier end-to-end test suite verifying feature coverage, boundary conditions, architecture security, and distribution artifact integrity:

```bash
# Run from repository root:
npm test
# or
node e2e_tests/test_runner.js
```

---

## Deployment

Deploy the compiled distribution bundle to GitHub Pages:

```bash
npm run deploy
```

---

*Built with precision and passion by Prodduturi Sharath Chandra.*
