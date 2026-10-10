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

The portfolio pairs warm charcoal, ivory, and bronze with editorial typography and a gently rotating 3D sculpture. Isometric project illustrations, focused case studies, and restrained scroll reveals keep the work at the center. Built on a **100% React-only serverless architecture**, it bundles resume data locally via `src/services/api.js`.

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

- **Editorial Dark-Mode UI:** Warm charcoal surfaces, ivory text, and bronze accents with Instrument Serif, Inter, and IBM Plex Mono. Design tokens live in `src/index.css`.
- **Lightweight 3D Hero:** A shaded, perspective-projected trefoil sculpture rendered with Canvas 2D from real 3D geometry. Subtle pointer response, capped pixel density, and a 30fps limit; no 3D runtime dependency or model downloads.
- **Purposeful Motion:** A visible pause control, operating-system reduced-motion support, and rendering suspended when the sculpture is off-screen or the tab is hidden.
- **Project Case Studies:** Original isometric SVG artwork, category filters, and keyboard-accessible native dialogs with engineering highlights and architecture details.
- **Responsive Architecture Diagrams:** Expandable processing flows and supporting-system cards, sourced from each project's `architecture` data. Steps stack vertically on phones without shrinking text or requiring sideways scrolling.
- **Data-Driven Expertise:** Searchable skill categories sourced directly from the portfolio dataset, with expandable professional experience.
- **Consent-Gated Analytics:** Optional GA4 loads only after a visitor explicitly chooses “Allow analytics.” Before consent, the site makes no Google Analytics requests. The event schema accepts only predefined project, section, résumé, contact-link, architecture, and successful-contact values; form names, emails, phone numbers, and messages are never sent to analytics.
- **Privacy Controls:** A small bottom preference control, footer “Analytics preferences” action, and `public/privacy.html` explain and manage the optional analytics choice. Preferences expire after 180 days; turning analytics off clears this portfolio's GA cookies and refreshes the page.
- **Serverless Contact Form:** Fully functional contact form integrated directly with [Formspree](https://formspree.io/) featuring client-side schema validation, asynchronous JSON dispatch, and error handling.
- **Native Static Data:** Resume data and project inventories are bundled locally for instant load times and complete decoupling from external database APIs.
- **Responsive Layout:** Optimized across mobile, tablet, and widescreen desktop displays.

---

## Local Development

If you would like to run or inspect this project locally:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/ProdduturiSharath/portfolio.git
   cd portfolio
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
   Open [http://localhost:3000/portfolio/](http://localhost:3000/portfolio/) (or the Vite dev server port shown in terminal) to view the application.

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

Seven browser regression scenarios cover responsive layouts (320–1440px), project dialog focus handling, detailed architecture diagrams, search/filter interactions, contact form validation and mocked responses, animation preferences, and automated WCAG accessibility checks:

```bash
# Run from the repository root:
npm install
npx playwright install chromium
npm test
```

On Linux, Playwright may also require `npx playwright install-deps chromium`. The browser suite starts its own Vite server on port 3100. Contact requests are intercepted; tests do not send real messages.

The browser suite also confirms that analytics is blocked before consent and that only allowlisted events are available after opt-in.

---

## Deployment

The live site is served from the `gh-pages` branch at **https://prodduturisharath.github.io/portfolio/**. The Vite base path is `/portfolio/`.

Set `VITE_FORMSPREE_FORM_ID` in your local `.env` before building so contact submissions use your configured form. Then deploy the compiled distribution bundle:

```bash
npm run deploy
```

The versions preceding the 3D redesign are preserved in these branches:

- [`backup/previous-portfolio`](https://github.com/ProdduturiSharath/portfolio/tree/backup/previous-portfolio): previous source code.
- [`backup/previous-deployment`](https://github.com/ProdduturiSharath/portfolio/tree/backup/previous-deployment): previous deployed build.

Before analytics was added, the source was preserved locally at commit `02d6f35` as `backup/pre-analytics`, and the analytics-free deployed build is preserved at commit `1136fc0` as `backup/pre-analytics-deployment`. These branches should be pushed before publishing the analytics update.

---

*Built with precision and passion by Prodduturi Sharath Chandra.*
