"use client";

import React, { useState, useRef, useEffect } from "react";
import dynamic from "next/dynamic";
import { MessageSquare, X, Send, Bot, Sparkles, BookOpen, User, Minimize2 } from "lucide-react";
import { streamLangGraphChat, ChatStepEvent } from "@/lib/api";
import ChatNodeTracker from "./ChatNodeTracker";

const PulsingOrb = dynamic(() => import("@/components/3d/PulsingOrb"), {
  ssr: false,
  loading: () => <div className="w-12 h-12 rounded-full bg-cyan-500/20 animate-pulse" />,
});

interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  sources?: string[];
  nodeHistory?: string[];
}

const SUGGESTED_QUESTIONS = [
  "What did Darshan build at TechCrafter?",
  "Explain the HTS hybrid retrieval (BM25 + RRF)",
  "How did he use YOLOv8 & CUDA for crowd analytics?",
  "What are his core skills and B.E. CGPA?",
];

export default function AIChatWidget({
  isOpen,
  onClose,
  onOpen,
}: {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
}) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      role: "assistant",
      content:
        "Hello! I am Darshan SP's AI Agent powered by LangGraph, hybrid RAG, and ChromaDB. Ask me anything regarding Darshan's production GenAI pipelines, computer vision deployments, or backend engineering career!",
      sources: ["Portfolio Context"],
    },
  ]);
  const [inputVal, setInputVal] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [activeNode, setActiveNode] = useState<string | undefined>(undefined);
  const [nodeStatus, setNodeStatus] = useState<string | undefined>(undefined);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const sessionIdRef = useRef<string>(`session_${Math.random().toString(36).substring(7)}`);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen, activeNode]);

  const handleSend = async (queryText?: string) => {
    const text = (queryText || inputVal).trim();
    if (!text || isStreaming) return;

    setInputVal("");
    const userMsgId = `usr_${Date.now()}`;
    const assistantMsgId = `asst_${Date.now()}`;

    // Add user message
    setMessages((prev) => [
      ...prev,
      { id: userMsgId, role: "user", content: text },
      { id: assistantMsgId, role: "assistant", content: "", sources: [] },
    ]);

    setIsStreaming(true);
    setActiveNode("intent_classifier");
    setNodeStatus("Evaluating query intent...");

    let accumulatedContent = "";
    let finalSources: string[] = [];

    await streamLangGraphChat(text, sessionIdRef.current, (event: ChatStepEvent) => {
      if (event.event === "node_start") {
        setActiveNode(event.node);
        setNodeStatus(event.status);
      } else if (event.event === "node_complete") {
        if (event.sources) {
          finalSources = event.sources;
        }
      } else if (event.event === "token") {
        accumulatedContent += event.content || "";
        setMessages((prev) =>
          prev.map((m) =>
            m.id === assistantMsgId ? { ...m, content: accumulatedContent } : m
          )
        );
      } else if (event.event === "done") {
        if (event.sources && event.sources.length) {
          finalSources = event.sources;
        }
        setMessages((prev) =>
          prev.map((m) =>
            m.id === assistantMsgId
              ? { ...m, content: accumulatedContent, sources: finalSources }
              : m
          )
        );
        setIsStreaming(false);
        setActiveNode(undefined);
        setNodeStatus(undefined);
      }
    });

    setIsStreaming(false);
    setActiveNode(undefined);
    setNodeStatus(undefined);
  };

  return (
    <>
      {/* Floating Launcher Button */}
      {!isOpen && (
        <button
          onClick={onOpen}
          className="fixed bottom-6 right-6 z-40 p-3 sm:px-4 sm:py-3 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-black font-semibold shadow-glow-cyan hover:scale-105 active:scale-95 transition-all flex items-center gap-2.5 cursor-pointer group"
          aria-label="Open AI Assistant"
        >
          <Bot className="w-5 h-5 text-black" />
          <span className="hidden sm:inline text-xs font-mono tracking-wide font-bold">
            Ask Darshan SP (LangGraph)
          </span>
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-300 animate-ping" />
        </button>
      )}

      {/* Floating Glass Chat Drawer */}
      {isOpen && (
        <div className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 z-50 w-[94vw] sm:w-[440px] max-w-[440px] h-[640px] max-h-[85vh] rounded-3xl glass-panel border border-cyan-500/30 bg-[#0b0e17]/95 shadow-2xl flex flex-col overflow-hidden animate-fadeIn">
          {/* Header */}
          <div className="px-5 py-3.5 bg-gradient-to-r from-[#0e1424] to-[#121024] border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <PulsingOrb isThinking={isStreaming} />
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                  <span>Darshan SP Agent</span>
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                    LangGraph
                  </span>
                </h3>
                <div className="text-[11px] font-mono text-gray-400 flex items-center gap-1">
                  <span className={`w-1.5 h-1.5 rounded-full ${isStreaming ? "bg-cyan-400 animate-ping" : "bg-emerald-400"}`} />
                  <span>{isStreaming ? "Synthesizing answer..." : "Ready for questions"}</span>
                </div>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors cursor-pointer"
              aria-label="Close chat"
            >
              <Minimize2 className="w-4 h-4" />
            </button>
          </div>

          {/* Messages Scroll Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${
                  msg.role === "user" ? "items-end" : "items-start"
                }`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl p-3.5 text-xs sm:text-sm leading-relaxed ${
                    msg.role === "user"
                      ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-black font-medium rounded-br-none"
                      : "bg-white/[0.05] text-gray-200 border border-white/10 rounded-bl-none"
                  }`}
                >
                  <p className="whitespace-pre-wrap">{msg.content || (isStreaming && "Thinking...")}</p>

                  {/* Sources citation */}
                  {msg.sources && msg.sources.length > 0 && (
                    <div className="mt-2.5 pt-2 border-t border-white/10 flex items-center gap-1 text-[10px] font-mono text-cyan-300">
                      <BookOpen className="w-3 h-3 text-cyan-400" />
                      <span>Cited: {msg.sources.join(", ")}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}

            {/* Active LangGraph node tracker animation */}
            {isStreaming && (
              <ChatNodeTracker
                currentNode={activeNode}
                statusText={nodeStatus}
              />
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Suggested Quick Question Chips */}
          <div className="px-4 py-2 bg-black/20 border-t border-white/5 overflow-x-auto flex gap-1.5 no-scrollbar">
            {SUGGESTED_QUESTIONS.map((q, idx) => (
              <button
                key={idx}
                disabled={isStreaming}
                onClick={() => handleSend(q)}
                className="shrink-0 text-[11px] font-mono px-2.5 py-1 rounded-full bg-white/[0.03] hover:bg-cyan-950/40 text-gray-300 hover:text-cyan-300 border border-white/5 hover:border-cyan-500/30 transition-all cursor-pointer disabled:opacity-50"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Input Footer */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="p-3 bg-[#080a11] border-t border-white/10 flex items-center gap-2"
          >
            <input
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder="Ask about HTS tariff RAG, YOLOv8, or experience..."
              disabled={isStreaming}
              className="flex-1 bg-white/[0.04] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 transition-colors font-sans"
            />
            <button
              type="submit"
              disabled={isStreaming || !inputVal.trim()}
              className="p-2.5 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-black transition-colors disabled:opacity-40 cursor-pointer"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
