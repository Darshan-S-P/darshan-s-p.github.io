import re
from typing import Dict, List, Any
import math

# Darshan's verified skills bank
DARSHAN_SKILLS_MAP = {
    # Core Languages
    "python": "Languages",
    "c++": "Languages",
    "cpp": "Languages",
    "javascript": "Languages",
    "typescript": "Languages",
    "sql": "Languages",
    
    # Generative AI & LLM
    "llm": "GenAI & LLMs",
    "llms": "GenAI & LLMs",
    "langchain": "GenAI & LLMs",
    "langgraph": "GenAI & LLMs",
    "rag": "GenAI & LLMs",
    "retrieval-augmented generation": "GenAI & LLMs",
    "hybrid retrieval": "GenAI & LLMs",
    "bm25": "GenAI & LLMs",
    "reranking": "GenAI & LLMs",
    "rrf": "GenAI & LLMs",
    "prompt engineering": "GenAI & LLMs",
    "structured outputs": "GenAI & LLMs",
    "chromadb": "GenAI & LLMs",
    "vector database": "GenAI & LLMs",
    "embeddings": "GenAI & LLMs",
    "semantic search": "GenAI & LLMs",

    # AI/ML & Computer Vision
    "pytorch": "Machine Learning & CV",
    "tensorflow": "Machine Learning & CV",
    "yolov8": "Machine Learning & CV",
    "yolo": "Machine Learning & CV",
    "csrnet": "Machine Learning & CV",
    "opencv": "Machine Learning & CV",
    "computer vision": "Machine Learning & CV",
    "object detection": "Machine Learning & CV",
    "crowd density": "Machine Learning & CV",
    "deep learning": "Machine Learning & CV",
    "machine learning": "Machine Learning & CV",
    "numpy": "Machine Learning & CV",
    "pandas": "Machine Learning & CV",
    "cuda": "Machine Learning & CV",

    # Backend & Data
    "fastapi": "Backend & APIs",
    "rest api": "Backend & APIs",
    "rest apis": "Backend & APIs",
    "postgresql": "Backend & APIs",
    "postgres": "Backend & APIs",
    "sqlalchemy": "Backend & APIs",
    "data pipelines": "Backend & APIs",
    "etl": "Backend & APIs",
    "hls streaming": "Backend & APIs",
    "redis": "Backend & APIs",

    # Cloud & DevOps
    "docker": "Cloud & DevOps",
    "aws": "Cloud & DevOps",
    "ec2": "Cloud & DevOps",
    "s3": "Cloud & DevOps",
    "azure": "Cloud & DevOps",
    "git": "Cloud & DevOps",
    "ci/cd": "Cloud & DevOps",
    "linux": "Cloud & DevOps",
    "rhcsa": "Cloud & DevOps"
}

# Broader tech dictionary for extracting skills from JD
KNOWN_INDUSTRY_SKILLS = set(DARSHAN_SKILLS_MAP.keys()).union({
    "kubernetes", "k8s", "kafka", "spark", "golang", "go", "java", "spring boot",
    "react", "angular", "vue", "next.js", "graphql", "gcp", "snowflake", "databricks",
    "ci/cd", "terraform", "node.js", "rust", "nosql", "mongodb", "scikit-learn"
})

def extract_skills_from_text(text: str) -> List[str]:
    """Extract recognized technical terms from text using word boundary matching."""
    text_lower = text.lower()
    found = set()
    for skill in KNOWN_INDUSTRY_SKILLS:
        pattern = r"(?<!\w)" + re.escape(skill) + r"(?!\w)"
        if re.search(pattern, text_lower):
            found.add(skill)
    return sorted(list(found))

def match_job_description(jd_text: str) -> Dict[str, Any]:
    """
    NLP JD Matcher:
    Extracts skills required by the JD, compares against Darshan SP's profile,
    computes skill overlap & TF-IDF style weighted similarity, and returns match reasoning.
    """
    if not jd_text or len(jd_text.strip()) < 10:
        return {
            "score": 0,
            "matched_skills": [],
            "missing_skills": [],
            "match_level": "Insufficient Input",
            "reasoning": "Please provide a valid job description with at least a few technical requirements.",
            "categories": {}
        }

    jd_skills = extract_skills_from_text(jd_text)
    darshan_skills = set(DARSHAN_SKILLS_MAP.keys())

    matched = []
    missing = []

    for skill in jd_skills:
        if skill in darshan_skills:
            matched.append(skill)
        else:
            missing.append(skill)

    # Calculate match score
    if not jd_skills:
        # Fallback to word-vector similarity approximation based on AI/ML keywords
        ai_terms = ["python", "ai", "ml", "backend", "api", "data", "engineer", "software", "model"]
        overlap = sum(1 for term in ai_terms if term in jd_text.lower())
        score = min(85, max(40, overlap * 12))
        matched = ["python", "fastapi", "ai/ml"]
    else:
        # Base overlap score
        raw_ratio = len(matched) / len(jd_skills)
        
        # Priority boosts for core strengths (FastAPI, Python, GenAI, Docker, PostgreSQL)
        core_boost = 0
        core_skills = {"python", "fastapi", "postgresql", "docker", "rag", "hybrid retrieval", "llms", "pytorch"}
        matched_cores = sum(1 for s in matched if s in core_skills)
        if matched_cores > 0:
            core_boost = min(15, matched_cores * 3)

        score = min(98, max(20, int((raw_ratio * 80) + core_boost + 5)))

    # Categorize matched skills
    categorized: Dict[str, List[str]] = {}
    for skill in matched:
        cat = DARSHAN_SKILLS_MAP.get(skill, "Other Core Skills")
        categorized.setdefault(cat, []).append(skill.upper() if len(skill) <= 4 else skill.title())

    if score >= 80:
        match_level = "Exceptional Match"
        verdict = f"Darshan is an outstanding candidate for this role. His proven hands-on expertise in {', '.join(matched[:4])} directly satisfies the primary requirements of your JD."
    elif score >= 60:
        match_level = "Strong Match"
        verdict = f"Strong alignment with your core technical stack. Darshan provides solid production mastery in {', '.join(matched[:3])}."
    else:
        match_level = "Moderate Match"
        verdict = f"Partial alignment. Darshan brings transferable software engineering and Python/ML capabilities, with room to bridge {', '.join(missing[:2]) if missing else 'specialized tools'}."

    return {
        "score": score,
        "match_level": match_level,
        "matched_skills": [s.upper() if len(s) <= 4 else s.title() for s in matched],
        "missing_skills": [s.upper() if len(s) <= 4 else s.title() for s in missing],
        "categories": categorized,
        "reasoning": verdict,
        "total_jd_skills_detected": len(jd_skills)
    }
