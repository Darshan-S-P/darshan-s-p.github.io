# Darshan SP — Award-Level AI/ML Engineer 3D Portfolio & LangGraph Backend

[![CI/CD Pipeline](https://github.com/Darshan-S-P/portfolio/actions/workflows/ci.yml/badge.svg)](https://github.com/Darshan-S-P/portfolio/actions)
[![Next.js 14](https://img.shields.io/badge/Next.js-14.2-black?logo=next.js)](https://nextjs.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.110-009688?logo=fastapi)](https://fastapi.tiangolo.com/)
[![LangGraph](https://img.shields.io/badge/LangGraph-Agent_StateGraph-blue)](https://langchain-ai.github.io/langgraph/)
[![Three.js](https://img.shields.io/badge/Three.js-R3F-black?logo=three.js)](https://threejs.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A deployable personal portfolio engineered for **Darshan SP** (Bengaluru, India). Combines **React Three Fiber 3D scenes**, **interactive 3D Cyber Terminal monitor**, **Framer Motion shared layout modals**, **GSAP ScrollTrigger**, and an open-source **FastAPI + LangGraph agent backend** with full NLP suite (spaCy Recruiter JD Matcher, Semantic Project Search, 3-Bullet Auto-Summarizer, and Message Sentiment Detection).

---

## 🌟 Key Features

1. **3D Interactive Hero**:
   - Floating low-poly neural network nodes with glowing synaptic line segments reacting to cursor parallax.
   - Dynamic typewriter role rotator with cyberpunk neon styling.
2. **Interactive 3D Cyber Terminal Monitor**:
   - High-tech CRT monitor workstation running Unix commands (`whoami`, `cat resume`, `skills`, `projects`, `certs`, `contact`, `rag <question>`).
   - Phosphor scanline glow and instant interactive command chips.
3. **Projects Showcase (3D Tilt & Shared Layout Modal)**:
   - 3D cursor glare perspective tilt cards for Darshan's verified projects:
     - **HTS Tariff Classification & GenAI Pipeline** (BM25 + RRF hybrid retrieval over 4,500+ legal pages).
     - **Real-Time People Counting System** (YOLOv8 + CSRNet + CUDA on Azure GPU VMs).
     - **ResiChain Logistics Platform** (Angular + FastAPI + AWS EC2 + Docker).
     - **Solana Token Hub** (Web3 DApp).
     - **IRCTC AI Voice Assistant** (Smart India Hackathon inter-college finalist).
4. **Experience Timeline**:
   - 3D-feeling vertical timeline with glowing gradient progress bar and scroll-triggered lighting nodes.
5. **LangGraph AI Agent Backend ("Ask about Darshan")**:
   - 5-node StateGraph: `intent_classifier` → `guardrail` → `retriever` → `generator` → `memory`.
   - Streaming Server-Sent Events (SSE) with live node progress tracking in the floating glass drawer.
6. **Recruiter JD Matcher (NLP Suite)**:
   - Pastes job descriptions and extracts required skills via spaCy NER/TF-IDF.
   - Calculates candidate match score (0–100%), skill breakdown, and hiring rationale.
7. **Contact Form with Live Sentiment Analysis**:
   - Real-time message tone and priority classification (e.g. *Urgent Hiring / Immediate Opportunity*).

---

## 🚀 Quick Start (Local Development)

### 1. Run Backend (FastAPI + LangGraph)

```bash
cd backend

# (Optional) Create virtual environment
python -m venv venv
venv\Scripts\activate      # Windows
# source venv/bin/activate # Linux / macOS

# Install dependencies
pip install -r requirements.txt

# Ingest resume and project data
python ingest.py

# Run unit tests
python -m pytest tests -v

# Start FastAPI server
uvicorn backend.main:app --reload --port 8000
```

FastAPI Swagger Docs: `http://localhost:8000/docs`

### 2. Run Frontend (Next.js 14)

```bash
cd frontend

# Install dependencies
npm install --legacy-peer-deps

# Start development server
npm run dev
```

Open `http://localhost:3000` in your browser.

---

## 🐳 Docker 1-Command Launch

Run the entire full-stack application inside isolated containers:

```bash
docker compose up --build
```

- Frontend: `http://localhost:3000`
- Backend API: `http://localhost:8000`
