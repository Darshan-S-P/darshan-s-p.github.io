import os
import json
import asyncio
from typing import Optional, List, Dict, Any
from fastapi import FastAPI, HTTPException, Request, Response
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from pydantic import BaseModel, Field

from backend.agent.graph import agent, LangGraphAgent
from backend.nlp.jd_matcher import match_job_description
from backend.nlp.semantic_search import ProjectSearchEngine
from backend.nlp.summarizer import summarize_text_3_bullets
from backend.nlp.sentiment import analyze_message_tone_and_sentiment

# Initialize FastAPI App
app = FastAPI(
    title="Darshan SP Portfolio AI Engine & LangGraph Agent",
    description="Production-grade AI backend featuring LangGraph StateGraph agent and NLP suite.",
    version="2.0.0"
)

# CORS configuration for local dev and production
ALLOWED_ORIGINS = [
    "http://localhost:3000",
    "http://localhost:3001",
    "http://127.0.0.1:3000",
    "https://darshan-portfolio.vercel.app",
    "*"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Open during dev, restrict in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Data paths
BASE_DIR = os.path.dirname(__file__)
DATA_DIR = os.path.join(BASE_DIR, "data")
PROJECTS_FILE = os.path.join(DATA_DIR, "projects_detail.json")
PROFILE_FILE = os.path.join(DATA_DIR, "darshan_profile.json")

# Initialize Search Engine
search_engine = ProjectSearchEngine(PROJECTS_FILE)

# ----------------- Request / Response Schemas -----------------
class ChatRequest(BaseModel):
    query: str = Field(..., min_length=1, description="Visitor question for Darshan SP")
    session_id: Optional[str] = Field("default_session", description="Session identifier for checkpointer")

class JDMatchRequest(BaseModel):
    jd_text: str = Field(..., min_length=10, description="Recruiter Job Description text")

class SemanticSearchRequest(BaseModel):
    query: str = Field(..., min_length=1, description="Search term for projects")
    limit: Optional[int] = Field(5, ge=1, le=10)

class SummarizeRequest(BaseModel):
    text: str = Field(..., description="Project text or README content")
    title: Optional[str] = Field("", description="Optional project name")

class ContactSentimentRequest(BaseModel):
    message: str = Field(..., min_length=1, description="Visitor or recruiter message")
    name: Optional[str] = Field("", description="Sender name")
    email: Optional[str] = Field("", description="Sender email")

# ----------------- Root & Health -----------------
@app.get("/api/health")
async def health_check():
    return {
        "status": "healthy",
        "agent": "LangGraph Active",
        "nlp_services": ["JD Matcher", "Semantic Search", "Auto-Summarizer", "Sentiment Detector"],
        "candidate": "Darshan SP"
    }

# ----------------- Portfolio Data Endpoints -----------------
@app.get("/api/profile")
async def get_profile():
    if os.path.exists(PROFILE_FILE):
        with open(PROFILE_FILE, "r", encoding="utf-8") as f:
            return json.load(f)
    raise HTTPException(status_code=404, detail="Profile data not found")

@app.get("/api/projects")
async def get_projects():
    if os.path.exists(PROJECTS_FILE):
        with open(PROJECTS_FILE, "r", encoding="utf-8") as f:
            return json.load(f)
    raise HTTPException(status_code=404, detail="Projects data not found")

# ----------------- Prompt 5: LangGraph AI Agent -----------------
@app.post("/api/chat")
async def chat_endpoint(req: ChatRequest):
    """Synchronous LangGraph execution across the 5 nodes."""
    result = agent.run(req.query, req.session_id)
    return {
        "query": result["query"],
        "answer": result["answer"],
        "intent": result["intent"],
        "sources": result["sources"],
        "is_safe": result["is_safe"],
        "confidence": result["confidence"],
        "session_id": result["session_id"]
    }

@app.post("/api/chat/stream")
async def chat_stream_endpoint(req: ChatRequest):
    """
    Server-Sent Events (SSE) streaming endpoint.
    Emits real-time node transitions (intent -> retrieve -> generate) and streamed answer tokens.
    """
    async def event_generator():
        for step in agent.stream_steps(req.query, req.session_id):
            yield f"data: {json.dumps(step)}\n\n"
            await asyncio.sleep(0.01)

    return StreamingResponse(
        event_generator(),
        media_type="text/event-stream",
        headers={
            "Cache-Control": "no-cache",
            "Connection": "keep-alive",
            "X-Accel-Buffering": "no"
        }
    )

@app.get("/api/chat/graph")
async def get_graph_architecture():
    """Returns the visual Mermaid diagram of the LangGraph state machine."""
    return {
        "diagram": agent.get_graph_diagram(),
        "nodes": [
            {"id": "intent_classifier", "desc": "NLP node classifying query into projects/experience/skills/contact/smalltalk/out_of_scope"},
            {"id": "guardrail", "desc": "Rejects prompt injections and out-of-scope non-engineering queries"},
            {"id": "retriever", "desc": "LangChain RAG over Darshan's resume, HTS/CV project documentation"},
            {"id": "generator", "desc": "LLM response grounded strictly in retrieved context"},
            {"id": "memory", "desc": "Checkpointer maintaining session conversation history"}
        ]
    }

# ----------------- Prompt 6: NLP Suite Endpoints -----------------
@app.post("/api/nlp/jd-match")
async def jd_match_endpoint(req: JDMatchRequest):
    """
    NLP Feature 1: Recruiter JD Matcher.
    Extracts required skills from job description, matches against Darshan's profile,
    computes match score (0-100%), skill breakdown, and recruiter rationale.
    """
    return match_job_description(req.jd_text)

@app.post("/api/nlp/search")
async def semantic_search_endpoint(req: SemanticSearchRequest):
    """
    NLP Feature 2: Smart Semantic & Hybrid Search across projects.
    """
    results = search_engine.search(req.query, req.limit)
    return {"query": req.query, "results": results, "count": len(results)}

@app.post("/api/nlp/summarize")
async def summarize_endpoint(req: SummarizeRequest):
    """
    NLP Feature 3: Auto-summary of project README into 3 executive bullets.
    """
    bullets = summarize_text_3_bullets(req.text, req.title)
    return {"project": req.title, "bullets": bullets}

@app.post("/api/nlp/sentiment")
async def sentiment_endpoint(req: ContactSentimentRequest):
    """
    NLP Feature 4: Sentiment & tone detection on contact-form messages to prioritize recruiter inbox.
    """
    return analyze_message_tone_and_sentiment(req.message, req.name, req.email)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("backend.main:app", host="0.0.0.0", port=8000, reload=True)
