from typing import List, Dict, Any, Optional
from typing_extensions import TypedDict

class AgentState(TypedDict):
    """LangGraph state schema for Darshan SP Portfolio Agent."""
    session_id: str
    query: str
    intent: str
    is_safe: bool
    guardrail_reason: Optional[str]
    retrieved_docs: List[Dict[str, Any]]
    sources: List[str]
    answer: str
    current_node: str
    history: List[Dict[str, str]]
    confidence: float
