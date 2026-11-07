import re
from typing import Dict, Any
from backend.agent.state import AgentState

PROMPT_INJECTION_PATTERNS = [
    r"ignore (all )?previous instructions",
    r"you are now (an unrestricted|a new)",
    r"system override",
    r"bypass safety",
    r"leak (the )?system prompt",
    r"reveal (the )?prompt",
    r"dan mode",
    r"jailbreak"
]

def guardrail_node(state: AgentState) -> Dict[str, Any]:
    """
    LangGraph Node 4: guardrail
    Validates user query against prompt injection, malicious inputs,
    and out-of-scope queries.
    """
    query = state.get("query", "").strip()
    intent = state.get("intent", "skills")

    # 1. Prompt Injection & Malicious Pattern Check
    for pattern in PROMPT_INJECTION_PATTERNS:
        if re.search(pattern, query, re.IGNORECASE):
            return {
                "is_safe": False,
                "guardrail_reason": "Prompt injection pattern detected. Queries must stay focused on Darshan SP's engineering profile.",
                "answer": "I am Darshan SP's portfolio AI agent. I am strictly configured to answer questions regarding Darshan's engineering projects, technical skills, and professional experience.",
                "current_node": "guardrail"
            }

    # 2. Out of Scope Check
    if intent == "out_of_scope":
        return {
            "is_safe": False,
            "guardrail_reason": "Topic is outside the scope of Darshan's portfolio.",
            "answer": "This agent is dedicated to Darshan SP's software engineering portfolio, projects (such as HTS Tariff RAG, People Counting, and ResiChain), and career experience. Please feel free to ask about his backend, GenAI, or ML capabilities!",
            "current_node": "guardrail"
        }

    return {
        "is_safe": True,
        "guardrail_reason": None,
        "current_node": "guardrail"
    }
