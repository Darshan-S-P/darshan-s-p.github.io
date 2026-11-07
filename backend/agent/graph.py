import json
import time
from typing import Dict, Any, Generator, List
from backend.agent.state import AgentState
from backend.agent.nodes.classifier import classify_intent_node
from backend.agent.nodes.guardrail import guardrail_node
from backend.agent.nodes.retriever import retriever_node
from backend.agent.nodes.generator import generator_node
from backend.agent.memory import memory_node, checkpointer

class LangGraphAgent:
    """
    Production LangGraph Agent for Darshan SP Portfolio.
    Orchestrates the 5-node StateGraph:
    [intent_classifier] -> [guardrail] -> (conditional edge) -> [retriever] -> [generator] -> [memory]
    """

    def __init__(self):
        self.name = "Ask about Darshan SP"

    def run(self, query: str, session_id: str = "default_session") -> Dict[str, Any]:
        """Execute state machine synchronously."""
        state: AgentState = {
            "session_id": session_id,
            "query": query,
            "intent": "",
            "is_safe": True,
            "guardrail_reason": None,
            "retrieved_docs": [],
            "sources": [],
            "answer": "",
            "current_node": "START",
            "history": checkpointer.get_history(session_id),
            "confidence": 0.0
        }

        # Node 1: intent_classifier
        intent_res = classify_intent_node(state)
        state.update(intent_res)

        # Node 2: guardrail
        guard_res = guardrail_node(state)
        state.update(guard_res)

        if not state["is_safe"]:
            # Route directly to memory and terminate
            mem_res = memory_node(state)
            state.update(mem_res)
            return state

        # Conditional Edge based on intent
        if state["intent"] in ["projects", "experience", "skills"]:
            # Node 3: retriever
            ret_res = retriever_node(state)
            state.update(ret_res)
        else:
            state["sources"] = ["Portfolio Profile"]

        # Node 4: generator
        gen_res = generator_node(state)
        state.update(gen_res)

        # Node 5: memory
        mem_res = memory_node(state)
        state.update(mem_res)

        return state

    def stream_steps(self, query: str, session_id: str = "default_session") -> Generator[Dict[str, Any], None, None]:
        """
        Yields Server-Sent Events (SSE) representing:
        1. Node transitions with metadata
        2. Citations & retrieved sources
        3. Token-by-token streaming of the response
        """
        state: AgentState = {
            "session_id": session_id,
            "query": query,
            "intent": "",
            "is_safe": True,
            "guardrail_reason": None,
            "retrieved_docs": [],
            "sources": [],
            "answer": "",
            "current_node": "START",
            "history": checkpointer.get_history(session_id),
            "confidence": 0.0
        }

        # Step 1: intent_classifier
        yield {
            "event": "node_start",
            "node": "intent_classifier",
            "status": "Classifying query intent..."
        }
        time.sleep(0.08)
        intent_res = classify_intent_node(state)
        state.update(intent_res)
        yield {
            "event": "node_complete",
            "node": "intent_classifier",
            "intent": state["intent"],
            "confidence": round(state["confidence"], 2)
        }

        # Step 2: guardrail
        yield {
            "event": "node_start",
            "node": "guardrail",
            "status": "Checking safety and relevance guardrails..."
        }
        time.sleep(0.05)
        guard_res = guardrail_node(state)
        state.update(guard_res)

        if not state["is_safe"]:
            yield {
                "event": "guardrail_blocked",
                "reason": state["guardrail_reason"]
            }
            # Stream guardrail answer
            for token in state["answer"].split(" "):
                yield {"event": "token", "content": token + " "}
                time.sleep(0.02)
            mem_res = memory_node(state)
            state.update(mem_res)
            yield {"event": "done", "sources": []}
            return

        yield {
            "event": "node_complete",
            "node": "guardrail",
            "status": "Query verified safe."
        }

        # Step 3: retriever
        if state["intent"] in ["projects", "experience", "skills"]:
            yield {
                "event": "node_start",
                "node": "retriever",
                "status": f"Querying ChromaDB vector & BM25 hybrid index for '{state['intent']}'..."
            }
            time.sleep(0.08)
            ret_res = retriever_node(state)
            state.update(ret_res)
            yield {
                "event": "node_complete",
                "node": "retriever",
                "sources": state["sources"],
                "doc_count": len(state["retrieved_docs"])
            }
        else:
            state["sources"] = ["Darshan SP Profile"]

        # Step 4: generator
        yield {
            "event": "node_start",
            "node": "generator",
            "status": "Synthesizing answer grounded in context..."
        }
        time.sleep(0.05)
        gen_res = generator_node(state)
        state.update(gen_res)
        yield {
            "event": "node_complete",
            "node": "generator",
            "sources": state["sources"]
        }

        # Stream answer tokens
        full_text = state["answer"]
        words = full_text.split(" ")
        for i, word in enumerate(words):
            yield {"event": "token", "content": word + (" " if i < len(words) - 1 else "")}
            time.sleep(0.025)

        # Step 5: memory checkpointer
        mem_res = memory_node(state)
        state.update(mem_res)
        yield {
            "event": "done",
            "node": "memory",
            "sources": state["sources"],
            "session_id": session_id
        }

    @staticmethod
    def get_graph_diagram() -> str:
        """Export ASCII / Mermaid diagram of the LangGraph workflow."""
        return """
graph TD
    Start([User Query]) --> IntentClassifier[1. intent_classifier]
    IntentClassifier --> Guardrail[2. guardrail]
    Guardrail -->|Unsafe / Out of Scope| MemoryBlock[5. memory]
    Guardrail -->|Safe: projects/experience/skills| Retriever[3. retriever (Chroma + BM25)]
    Guardrail -->|Safe: smalltalk/contact| Generator[4. generator (LLM Grounding)]
    Retriever --> Generator
    Generator --> Memory[5. memory Checkpointer]
    Memory --> SSEStream([SSE Stream Response to Next.js])
    MemoryBlock --> SSEStream
"""

# Agent instance
agent = LangGraphAgent()
