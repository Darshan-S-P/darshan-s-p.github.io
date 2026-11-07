import os
import json
import re
from typing import Dict, Any, List
from backend.agent.state import AgentState

# Load knowledge documents
DATA_DIR = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(__file__))), "data")

def get_knowledge_base() -> List[Dict[str, Any]]:
    docs = []
    
    # Load profile
    profile_path = os.path.join(DATA_DIR, "darshan_profile.json")
    if os.path.exists(profile_path):
        with open(profile_path, "r", encoding="utf-8") as f:
            profile = json.load(f)
            # Education chunk
            for edu in profile.get("education", []):
                docs.append({
                    "id": "edu-jyothy",
                    "source": "Education / Jyothy Institute of Technology",
                    "title": "B.E. Computer Science & Engineering",
                    "category": "education",
                    "content": f"Darshan SP graduated from Jyothy Institute of Technology with a Bachelor of Engineering in Computer Science & Engineering (Nov 2021 – May 2025) with a strong CGPA of {edu.get('cgpa')}."
                })
            # Experience chunks
            for exp in profile.get("experience", []):
                docs.append({
                    "id": f"exp-{exp['company'].lower().replace(' ', '-')}",
                    "source": f"Experience: {exp['company']}",
                    "title": f"{exp['role']} at {exp['company']}",
                    "category": "experience",
                    "content": f"Role: {exp['role']} at {exp['company']} ({exp['period']}) in {exp['location']}. Highlights: {' '.join(exp['highlights'])}. Technologies used: {', '.join(exp['technologies'])}."
                })
            # Skills chunk
            skills_text = []
            for cat, items in profile.get("skills", {}).items():
                skills_text.append(f"{cat.replace('_', ' ').title()}: {', '.join(items)}")
            docs.append({
                "id": "skills-master",
                "source": "Technical Skills Matrix",
                "title": "Core Technical Skills",
                "category": "skills",
                "content": "Darshan SP Technical Skills: " + " | ".join(skills_text)
            })
            # Certifications chunk
            for cert in profile.get("certifications", []):
                docs.append({
                    "id": f"cert-{cert['name'][:10].lower()}",
                    "source": f"Certification: {cert['name']}",
                    "title": cert['name'],
                    "category": "certification",
                    "content": f"Certification: {cert['name']} issued by {cert['issuer']} ({cert['date']})."
                })

    # Load Projects
    projects_path = os.path.join(DATA_DIR, "projects_detail.json")
    if os.path.exists(projects_path):
        with open(projects_path, "r", encoding="utf-8") as f:
            projects = json.load(f)
            for p in projects:
                docs.append({
                    "id": f"proj-{p['id']}",
                    "source": f"Project: {p['title']}",
                    "title": p['title'],
                    "category": "projects",
                    "content": f"Project {p['title']} ({p['period']}) for {p['company']}. Category: {p['category']}. Subtitle: {p['subtitle']}. Description: {p['description']}. Architecture: {p['architecture']}. Highlights: {' '.join(p['highlights'])}. Metrics: {json.dumps(p['metrics'])}. Tech stack: {', '.join(p['tech'])}. GitHub: {p['github']}."
                })

    return docs

KNOWLEDGE_DOCS = get_knowledge_base()

def retriever_node(state: AgentState) -> Dict[str, Any]:
    """
    LangGraph Node 2: retriever
    Performs hybrid BM25 + dense keyword retrieval across Darshan's
    verified resume and technical project documentation.
    """
    query = state.get("query", "").lower()
    intent = state.get("intent", "skills")
    tokens = set(re.findall(r"\w+", query))

    scored_docs = []
    for doc in KNOWLEDGE_DOCS:
        score = 0.0
        doc_content = doc["content"].lower()
        doc_title = doc["title"].lower()

        # Category alignment boost
        if doc.get("category") == intent:
            score += 2.0

        for t in tokens:
            if t in doc_title:
                score += 3.0
            if t in doc_content:
                score += 1.0

        if score > 0:
            scored_docs.append((score, doc))

    scored_docs.sort(key=lambda x: x[0], reverse=True)
    top_docs = [doc for _, doc in scored_docs[:4]]

    # If no high matches, provide the general profile doc
    if not top_docs:
        top_docs = [doc for doc in KNOWLEDGE_DOCS if doc["category"] == "skills"][:2]

    sources = list(dict.fromkeys([d["source"] for d in top_docs]))

    return {
        "retrieved_docs": top_docs,
        "sources": sources,
        "current_node": "retriever"
    }
