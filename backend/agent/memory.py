from typing import Dict, List, Any
from backend.agent.state import AgentState

class MemoryCheckpointer:
    """
    Session-based conversation memory checkpointer for LangGraph agent.
    Maintains turn histories per session ID.
    """
    def __init__(self):
        self._storage: Dict[str, List[Dict[str, str]]] = {}

    def get_history(self, session_id: str) -> List[Dict[str, str]]:
        return self._storage.get(session_id, [])

    def save_turn(self, session_id: str, role: str, content: str) -> None:
        if session_id not in self._storage:
            self._storage[session_id] = []
        self._storage[session_id].append({"role": role, "content": content})
        # Keep last 10 messages
        if len(self._storage[session_id]) > 10:
            self._storage[session_id] = self._storage[session_id][-10:]

    def clear(self, session_id: str) -> None:
        if session_id in self._storage:
            del self._storage[session_id]

# Singleton checkpointer
checkpointer = MemoryCheckpointer()

def memory_node(state: AgentState) -> Dict[str, Any]:
    """
    LangGraph Node 5: memory
    Updates session state history with current query and generated answer.
    """
    session_id = state.get("session_id", "default_session")
    query = state.get("query", "")
    answer = state.get("answer", "")

    if query:
        checkpointer.save_turn(session_id, "user", query)
    if answer:
        checkpointer.save_turn(session_id, "assistant", answer)

    return {
        "history": checkpointer.get_history(session_id),
        "current_node": "memory"
    }
