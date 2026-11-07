import json
import os
import re
import math
from typing import List, Dict, Any

class ProjectSearchEngine:
    """
    Semantic and hybrid BM25 search engine across Darshan's projects and experience.
    Works 100% locally with zero external API dependencies.
    """
    def __init__(self, projects_file: str):
        self.projects_file = projects_file
        self.projects = self._load_projects()

    def _load_projects(self) -> List[Dict[str, Any]]:
        if os.path.exists(self.projects_file):
            with open(self.projects_file, "r", encoding="utf-8") as f:
                return json.load(f)
        return []

    def _tokenize(self, text: str) -> List[str]:
        return re.findall(r"\w+", text.lower())

    def search(self, query: str, limit: int = 5) -> List[Dict[str, Any]]:
        query_tokens = set(self._tokenize(query))
        if not query_tokens:
            return self.projects[:limit]

        scored_results = []
        for project in self.projects:
            # Combine searchable text
            corpus = " ".join([
                project.get("title", ""),
                project.get("subtitle", ""),
                project.get("description", ""),
                project.get("category", ""),
                " ".join(project.get("tech", [])),
                " ".join(project.get("highlights", [])),
                project.get("architecture", "")
            ])
            corpus_tokens = self._tokenize(corpus)
            doc_len = len(corpus_tokens) or 1

            # Simple TF-IDF / BM25 style match score
            score = 0.0
            matched_terms = []
            for qt in query_tokens:
                count = corpus_tokens.count(qt)
                if count > 0:
                    tf = (count * 2.2) / (count + 1.2 * (0.25 + 0.75 * (doc_len / 150)))
                    score += tf
                    matched_terms.append(qt)

            # Boost if query matches title or tech stack
            title_lower = project.get("title", "").lower()
            for qt in query_tokens:
                if qt in title_lower:
                    score += 3.0
                if any(qt == t.lower() for t in project.get("tech", [])):
                    score += 2.5

            if score > 0:
                normalized_score = min(0.99, round(score / (score + 5.0), 3))
                scored_results.append({
                    **project,
                    "relevance_score": normalized_score,
                    "matched_terms": list(set(matched_terms))
                })

        scored_results.sort(key=lambda x: x["relevance_score"], reverse=True)
        return scored_results[:limit]
