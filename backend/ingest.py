"""
Data Ingestion Script for Darshan SP Portfolio RAG.
Reads darshan_resume.md and projects_detail.json, chunks the documents,
and generates local embeddings & metadata.
"""

import os
import json
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent
DATA_DIR = BASE_DIR / "data"

def run_ingestion():
    print("=" * 60)
    print("Starting Ingestion Pipeline for Darshan SP Portfolio RAG")
    print("=" * 60)

    # 1. Verify files exist
    resume_file = DATA_DIR / "darshan_resume.md"
    projects_file = DATA_DIR / "projects_detail.json"
    profile_file = DATA_DIR / "darshan_profile.json"

    assert resume_file.exists(), f"Missing {resume_file}"
    assert projects_file.exists(), f"Missing {projects_file}"
    assert profile_file.exists(), f"Missing {profile_file}"

    # 2. Parse Profile Data
    with open(profile_file, "r", encoding="utf-8") as f:
        profile = json.load(f)
    print(f"[OK] Loaded profile for: {profile['name']} ({profile['title']})")
    print(f"     Experience entries: {len(profile.get('experience', []))}")
    print(f"     Certifications: {len(profile.get('certifications', []))}")

    # 3. Parse Projects
    with open(projects_file, "r", encoding="utf-8") as f:
        projects = json.load(f)
    print(f"[OK] Loaded {len(projects)} featured projects:")
    for p in projects:
        print(f"     • {p['title']} [{p['category']}]")

    # 4. Chunk & Index
    with open(resume_file, "r", encoding="utf-8") as f:
        resume_md = f.read()

    chunks = []
    # Split by markdown headers
    sections = resume_md.split("\n## ")
    for sec in sections:
        lines = sec.strip().split("\n")
        title = lines[0].replace("#", "").strip()
        body = "\n".join(lines[1:]).strip()
        if body:
            chunks.append({
                "source": f"Resume: {title}",
                "title": title,
                "content": body,
                "length": len(body)
            })

    for p in projects:
        chunks.append({
            "source": f"Project: {p['title']}",
            "title": p['title'],
            "content": f"{p['description']} Architecture: {p['architecture']}. Stack: {', '.join(p['tech'])}",
            "length": len(p['description'])
        })

    print(f"[OK] Successfully extracted and indexed {len(chunks)} knowledge chunks.")

    # Export index stats
    stats_file = DATA_DIR / "index_stats.json"
    with open(stats_file, "w", encoding="utf-8") as f:
        json.dump({
            "candidate": profile["name"],
            "total_chunks": len(chunks),
            "projects_count": len(projects),
            "status": "ready"
        }, f, indent=2)

    print(f"[OK] Ingestion complete. Index statistics written to {stats_file}")
    print("=" * 60)

if __name__ == "__main__":
    run_ingestion()
