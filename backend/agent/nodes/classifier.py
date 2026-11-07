import re
from typing import Dict, Any
from backend.agent.state import AgentState

INTENT_RULES = {
    "projects": [
        "project", "built", "repo", "github", "hts", "tariff", "resichain",
        "crowd", "people count", "yolo", "solana", "irctc", "hackathon", "demo",
        "codebase", "portfolio", "architecture", "logistics"
    ],
    "experience": [
        "experience", "work", "job", "company", "companies", "techcrafter",
        "quation", "intern", "internship", "role", "full-time", "years", "duration",
        "responsibilities", "history", "career"
    ],
    "skills": [
        "skill", "skills", "tech stack", "languages", "python", "fastapi",
        "pytorch", "rag", "docker", "aws", "azure", "bm25", "cuda", "sql",
        "tools", "technologies", "what can he do", "certifications", "rhcsa"
    ],
    "contact": [
        "contact", "email", "phone", "reach", "hire", "interview", "location",
        "bengaluru", "linkedin", "message", "call", "touch", "connect"
    ],
    "smalltalk": [
        "hi", "hello", "hey", "who are you", "what is this", "greetings",
        "good morning", "good evening", "how are you", "who made you"
    ]
}

def classify_intent_node(state: AgentState) -> Dict[str, Any]:
    """
    LangGraph Node 1: intent_classifier
    Classifies the user query into:
    - projects
    - experience
    - skills
    - contact
    - smalltalk
    - out_of_scope
    """
    query_text = state.get("query", "").lower()
    
    # Check for direct out of scope prompts (e.g. recipe, weather, generic math, gaming cheat)
    out_of_scope_patterns = [
        "weather", "recipe", "cook", "bitcoin price", "crypto predict", "movie",
        "song", "president", "sports score", "joke", "cheat code"
    ]
    if any(p in query_text for p in out_of_scope_patterns) and not any(k in query_text for k in ["darshan", "project", "skill"]):
        return {
            "intent": "out_of_scope",
            "current_node": "intent_classifier",
            "confidence": 0.95
        }

    # Score intent categories based on token matches
    intent_scores = {k: 0 for k in INTENT_RULES}
    for intent, keywords in INTENT_RULES.items():
        for kw in keywords:
            if re.search(r"\b" + re.escape(kw) + r"\b", query_text):
                intent_scores[intent] += 2
            elif kw in query_text:
                intent_scores[intent] += 1

    best_intent, top_score = max(intent_scores.items(), key=lambda x: x[1])

    if top_score == 0:
        # Default to skills/experience if asking about Darshan broadly
        if "darshan" in query_text or "he" in query_text or "him" in query_text or "who" in query_text:
            best_intent = "experience"
            top_score = 1
        else:
            best_intent = "smalltalk" if len(query_text.split()) <= 3 else "skills"

    return {
        "intent": best_intent,
        "current_node": "intent_classifier",
        "confidence": min(1.0, 0.5 + (top_score * 0.15))
    }
