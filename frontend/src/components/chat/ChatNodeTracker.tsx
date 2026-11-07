"use client";

import React from "react";
import { Check, Loader2 } from "lucide-react";

interface NodeTrackerProps {
  currentNode?: string;
  statusText?: string;
}

const NODES = [
  { id: "intent_classifier", label: "Intent NLP" },
  { id: "guardrail", label: "Guardrail" },
  { id: "retriever", label: "Chroma RAG" },
  { id: "generator", label: "Synthesis" },
  { id: "memory", label: "Memory" },
];

export default function ChatNodeTracker({ currentNode, statusText }: NodeTrackerProps) {
  if (!currentNode) return null;

  const getStepIndex = (nodeId: string) => {
    return NODES.findIndex((n) => n.id === nodeId);
  };

  const currentIndex = getStepIndex(currentNode);

  return (
    <div className="p-3 my-2 rounded-xl bg-black/40 border border-cyan-500/20 font-mono text-[11px]">
      <div className="flex items-center justify-between text-cyan-400 mb-2 font-semibold">
        <span className="flex items-center gap-1.5">
          <Loader2 className="w-3.5 h-3.5 animate-spin" />
          LangGraph Workflow Executing:
        </span>
        <span className="text-[10px] text-gray-400 font-normal">StateGraph v2.0</span>
      </div>

      <div className="grid grid-cols-5 gap-1.5 mb-2">
        {NODES.map((node, idx) => {
          const isDone = idx < currentIndex;
          const isCurrent = idx === currentIndex;

          return (
            <div
              key={node.id}
              className={`p-1 text-center rounded border transition-all ${
                isDone
                  ? "bg-emerald-950/40 border-emerald-500/40 text-emerald-300"
                  : isCurrent
                  ? "bg-cyan-950/60 border-cyan-400 text-cyan-200 animate-pulse"
                  : "bg-white/[0.02] border-white/5 text-gray-600"
              }`}
            >
              <div className="truncate text-[9px] uppercase tracking-wider">{node.label}</div>
            </div>
          );
        })}
      </div>

      {statusText && (
        <div className="text-gray-400 text-[10px] italic truncate">
          &gt; {statusText}
        </div>
      )}
    </div>
  );
}
