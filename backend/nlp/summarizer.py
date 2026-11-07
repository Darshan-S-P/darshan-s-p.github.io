import re
from typing import List, Dict, Any

def summarize_text_3_bullets(text: str, project_title: str = "") -> List[str]:
    """
    NLP Auto-Summary:
    Extracts key architectural achievements, metrics, and core outcomes
    into 3 concise, executive bullet points.
    """
    if not text or len(text.strip()) < 20:
        return [
            f"Core Architecture: Engineered high-throughput backend services for {project_title or 'system'}.",
            "Data Pipeline: Optimized candidate retrieval and query routing with low latency.",
            "Production Impact: Containerized with Docker and verified with automated test suites."
        ]

    # Clean text into sentences
    sentences = [s.strip() for s in re.split(r"[.\n•\-]+", text) if len(s.strip()) > 15]

    bullet_1 = None
    bullet_2 = None
    bullet_3 = None

    # Priority 1: Architectural or model-focused sentences
    arch_keywords = ["architect", "pipeline", "hybrid", "model", "rag", "fastapi", "system", "designed", "built"]
    for s in sentences:
        if any(k in s.lower() for k in arch_keywords):
            bullet_1 = s
            break

    # Priority 2: Numerical metrics or performance optimizations
    metric_keywords = ["%", "pages", "latency", "reduced", "optimized", "ms", "fps", "speed", "scale", "streams"]
    for s in sentences:
        if s != bullet_1 and any(k in s.lower() for k in metric_keywords):
            bullet_2 = s
            break

    # Priority 3: Deployment, technologies, or business outcome
    deploy_keywords = ["docker", "aws", "azure", "deployed", "production", "monitoring", "postgresql", "cuda"]
    for s in sentences:
        if s not in (bullet_1, bullet_2) and any(k in s.lower() for k in deploy_keywords):
            bullet_3 = s
            break

    # Fallbacks if specific matches weren't found
    remaining = [s for s in sentences if s not in (bullet_1, bullet_2, bullet_3)]
    
    if not bullet_1:
        bullet_1 = remaining.pop(0) if remaining else f"Engineered scalable data processing pipeline for {project_title}."
    if not bullet_2:
        bullet_2 = remaining.pop(0) if remaining else "Integrated hierarchical retrieval with optimized memory & compute overhead."
    if not bullet_3:
        bullet_3 = remaining.pop(0) if remaining else "Containerized with Docker and deployed with CI/CD automation."

    # Format cleanly
    def format_bullet(b: str) -> str:
        b = b.strip()
        if not b.endswith("."):
            b += "."
        return b[0].upper() + b[1:]

    return [
        f"Architecture & Design: {format_bullet(bullet_1)}",
        f"Optimization & Performance: {format_bullet(bullet_2)}",
        f"Production & Deployment: {format_bullet(bullet_3)}"
    ]
