"use client";

import React, { useState, useRef, useEffect } from "react";
import { Terminal, Send, Play, Sparkles, RefreshCw, Cpu, CheckCircle } from "lucide-react";

interface CommandLog {
  type: "input" | "output" | "system" | "rag";
  text: string;
}

export default function CyberTerminalMonitor() {
  const [inputVal, setInputVal] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const terminalEndRef = useRef<HTMLDivElement>(null);

  const [logs, setLogs] = useState<CommandLog[]>([
    {
      type: "system",
      text: "DARSHAN-OS v2.4 (x86_64-neural-linux-gnu)\nKernel: 6.8.0-rag-hybrid #1 SMP PREEMPT_DYNAMIC\nType 'help' or click quick commands below to explore Darshan SP's profile.",
    },
    {
      type: "output",
      text: "System Ready. 12 RAG knowledge chunks mounted to /mnt/darshan_brain.",
    },
  ]);

  const scrollToBottom = () => {
    terminalEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [logs]);

  const handleCommand = async (cmd: string) => {
    const trimmed = cmd.trim();
    if (!trimmed) return;

    // Add user input to log
    setLogs((prev) => [...prev, { type: "input", text: `darshan@system:~$ ${trimmed}` }]);
    setInputVal("");

    const lower = trimmed.toLowerCase();

    if (lower === "clear" || lower === "cls") {
      setLogs([]);
      return;
    }

    if (lower === "help") {
      setLogs((prev) => [
        ...prev,
        {
          type: "output",
          text:
            "AVAILABLE COMMANDS:\n" +
            "  whoami       - Display Darshan SP's professional overview & degree\n" +
            "  cat resume   - View work history (TechCrafter, Quation Solutions)\n" +
            "  skills       - Inspect verified technical skills matrix\n" +
            "  projects     - List production GenAI, CV & Backend projects\n" +
            "  certs        - Show certifications (Stanford ML, RHCSA EX200)\n" +
            "  contact      - Display verified contact channels & links\n" +
            "  rag <prompt> - Run neural RAG query through LangGraph\n" +
            "  clear        - Clear terminal display",
        },
      ]);
      return;
    }

    if (lower === "whoami") {
      setLogs((prev) => [
        ...prev,
        {
          type: "output",
          text:
            "NAME: Darshan SP\n" +
            "ROLE: Software Engineer & AI/ML Systems Specialist\n" +
            "LOCATION: Bengaluru, Karnataka, India\n" +
            "EDUCATION: B.E. Computer Science & Engineering, Jyothy Institute of Technology (CGPA: 8.7/10)\n" +
            "EXPERIENCE: 1+ year building Python backend, GenAI RAG, & real-time computer vision systems.",
        },
      ]);
      return;
    }

    if (lower.startsWith("cat resume") || lower === "experience") {
      setLogs((prev) => [
        ...prev,
        {
          type: "output",
          text:
            "WORK EXPERIENCE SUMMARY:\n" +
            "1. TechCrafter.cps Pvt Ltd. (Aug 2025 – Sep 2026)\n" +
            "   Role: Software Engineer\n" +
            "   • AI-assisted HTS tariff classification with hybrid BM25 + dense retrieval and RRF.\n" +
            "   • Hierarchical candidate traversal reducing redundant LLM calls by 68%.\n\n" +
            "2. TechCrafter.cps Pvt Ltd. (May 2025 – Aug 2025)\n" +
            "   Role: Software Engineering Intern\n" +
            "   • Python data ingestion pipelines, Docker, AWS EC2, and supply-chain platforms.\n\n" +
            "3. Quation Solutions Pvt Ltd. (Sep 2024 – Apr 2025)\n" +
            "   Role: Backend Developer Intern\n" +
            "   • YOLOv8, CSRNet, PyTorch real-time people counter over multiple RTSP feeds on Azure GPU VMs.",
        },
      ]);
      return;
    }

    if (lower === "skills") {
      setLogs((prev) => [
        ...prev,
        {
          type: "output",
          text:
            "VERIFIED TECHNICAL SKILLS:\n" +
            "• Languages: Python, C++, TypeScript, JavaScript, SQL\n" +
            "• GenAI / LLM: LangChain, LangGraph, Hybrid Retrieval (BM25 + Semantic), RRF, ChromaDB\n" +
            "• AI/ML & CV: PyTorch, TensorFlow, YOLOv8, CSRNet, OpenCV, CUDA\n" +
            "• Backend: FastAPI, PostgreSQL, SQLAlchemy, REST APIs, HLS Video Streaming\n" +
            "• Cloud & DevOps: AWS EC2/S3, Azure GPU VMs, Docker, Linux (RHCSA Certified)",
        },
      ]);
      return;
    }

    if (lower === "projects") {
      setLogs((prev) => [
        ...prev,
        {
          type: "output",
          text:
            "FEATURED REPOSITORIES:\n" +
            "1. HTS Tariff RAG Pipeline [GenAI/FastAPI] - 4,500+ legal pages, BM25+RRF hybrid search\n" +
            "2. Real-Time Crowd Counter [CV/CUDA] - Multi-RTSP camera analytics with YOLOv8 & CSRNet\n" +
            "3. ResiChain Logistics [Full-Stack] - Automated Excel manifest ingestion on AWS EC2\n" +
            "4. Solana Token Hub [Web3/Next.js] - Serverless on-chain token explorer & swaps\n" +
            "5. IRCTC Voice Assistant [NLP/Speech] - 3rd place Smart India Hackathon",
        },
      ]);
      return;
    }

    if (lower === "certs") {
      setLogs((prev) => [
        ...prev,
        {
          type: "output",
          text:
            "CERTIFICATIONS:\n" +
            "• Stanford Online (Coursera): Supervised Machine Learning (Aug 2025)\n" +
            "• Red Hat: RHCSA - EX200 System Administrator (Dec 2023)\n" +
            "• IBM: Introduction to Cybersecurity & Attacks (May 2023)\n" +
            "• Smart India Hackathon: 3rd Place out of 25 Teams (Oct 2023)",
        },
      ]);
      return;
    }

    if (lower === "contact") {
      setLogs((prev) => [
        ...prev,
        {
          type: "output",
          text:
            "CONTACT CHANNELS:\n" +
            "• Email: ddarshu260@gmail.com\n" +
            "• Phone: +91 8147769141\n" +
            "• LinkedIn: https://linkedin.com/in/darshan-sp\n" +
            "• GitHub: https://github.com/Darshan-S-P\n" +
            "• Location: Bengaluru, Karnataka, India",
        },
      ]);
      return;
    }

    // Default: Run through RAG agent simulation / query
    setIsProcessing(true);
    setLogs((prev) => [
      ...prev,
      {
        type: "rag",
        text: `[LangGraph: intent_classifier -> retriever -> generator]\nQuerying: "${trimmed}"...`,
      },
    ]);

    setTimeout(() => {
      let answer = "";
      if (lower.includes("cgpa") || lower.includes("grade") || lower.includes("college")) {
        answer = "Darshan SP completed BE in Computer Science & Engineering at Jyothy Institute of Technology with an 8.7 CGPA.";
      } else if (lower.includes("hts") || lower.includes("tariff")) {
        answer = "The HTS tariff system uses hybrid BM25 + vector search with Reciprocal Rank Fusion (RRF) and hierarchical candidate tree pruning to reduce redundant LLM calls by 68%.";
      } else if (lower.includes("yolo") || lower.includes("crowd")) {
        answer = "The computer vision crowd counter was built at Quation Solutions with YOLOv8 for detection and CSRNet for density estimation, achieving sub-18ms inference on Azure GPU VMs.";
      } else {
        answer = `Darshan SP has 1+ year of engineering experience specializing in FastAPI backends, LangGraph/LangChain RAG systems, and computer vision deployment with Docker & AWS/Azure.`;
      }

      setLogs((prev) => [
        ...prev,
        {
          type: "output",
          text: `[RAG Answer]: ${answer}\nSource: darshan_resume.md & projects_detail.json`,
        },
      ]);
      setIsProcessing(false);
    }, 450);
  };

  const quickCommands = ["whoami", "cat resume", "skills", "projects", "certs", "contact"];

  return (
    <div className="w-full max-w-4xl mx-auto my-6 rounded-2xl overflow-hidden shadow-2xl border border-emerald-500/30 bg-[#060d09]/95 backdrop-blur-xl relative group">
      {/* 3D Monitor Frame Bezel & Glare */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/[0.04] to-transparent pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-emerald-400/50 to-transparent" />

      {/* Monitor Header / CRT Bezel Bar */}
      <div className="flex items-center justify-between px-4 py-3 bg-[#0a1510] border-b border-emerald-500/20">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-red-500/80 border border-red-400" />
          <div className="w-3 h-3 rounded-full bg-amber-500/80 border border-amber-400" />
          <div className="w-3 h-3 rounded-full bg-emerald-500/80 border border-emerald-400" />
          <span className="ml-3 text-xs font-mono text-emerald-400/90 flex items-center gap-1.5">
            <Terminal className="w-3.5 h-3.5 text-emerald-400" />
            DARSHAN-SP-TERMINAL://root@ai-core
          </span>
        </div>
        <div className="flex items-center space-x-3 text-xs font-mono text-emerald-500/70">
          <span className="flex items-center gap-1">
            <Cpu className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
            RAG ONLINE
          </span>
          <span className="hidden sm:inline bg-emerald-950/60 border border-emerald-600/30 px-2 py-0.5 rounded text-[10px] text-emerald-300">
            TTY 1
          </span>
        </div>
      </div>

      {/* Screen Body with CRT Phosphor Scanline glow */}
      <div className="p-4 sm:p-6 h-80 sm:h-96 overflow-y-auto font-mono text-xs sm:text-sm text-emerald-400/95 space-y-3 relative cyber-terminal">
        {logs.map((log, index) => (
          <div key={index} className="leading-relaxed">
            {log.type === "system" && (
              <pre className="text-emerald-500/80 whitespace-pre-wrap font-sans text-xs bg-emerald-950/20 p-2.5 rounded-lg border border-emerald-500/20">
                {log.text}
              </pre>
            )}
            {log.type === "input" && (
              <div className="flex items-center text-cyan-300 font-semibold">
                <span>{log.text}</span>
              </div>
            )}
            {log.type === "output" && (
              <pre className="text-emerald-300/90 whitespace-pre-wrap pl-2 border-l border-emerald-500/30">
                {log.text}
              </pre>
            )}
            {log.type === "rag" && (
              <div className="text-amber-300/90 bg-amber-950/20 border border-amber-500/20 p-2 rounded text-xs">
                {log.text}
              </div>
            )}
          </div>
        ))}
        {isProcessing && (
          <div className="flex items-center space-x-2 text-cyan-400 animate-pulse text-xs">
            <RefreshCw className="w-3.5 h-3.5 animate-spin" />
            <span>Consulting LangGraph state machine & hybrid retrieval...</span>
          </div>
        )}
        <div ref={terminalEndRef} />
      </div>

      {/* Quick Interactive Command Badges */}
      <div className="px-4 py-2.5 bg-[#0a1510]/90 border-t border-emerald-500/20 flex flex-wrap gap-2 items-center">
        <span className="text-[11px] font-mono text-emerald-500/70 mr-1 flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-emerald-400" /> Quick Run:
        </span>
        {quickCommands.map((cmd) => (
          <button
            key={cmd}
            onClick={() => handleCommand(cmd)}
            className="px-2.5 py-1 text-xs font-mono rounded bg-emerald-950/50 hover:bg-emerald-800/40 text-emerald-300 border border-emerald-600/30 hover:border-emerald-400 transition-all cursor-pointer"
          >
            {cmd}
          </button>
        ))}
        <button
          onClick={() => handleCommand("clear")}
          className="ml-auto px-2 py-0.5 text-[11px] font-mono rounded text-emerald-500/60 hover:text-emerald-300 transition-colors"
        >
          clear
        </button>
      </div>

      {/* Command Input Form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleCommand(inputVal);
        }}
        className="flex items-center px-4 py-3 bg-[#060d09] border-t border-emerald-500/20 gap-2"
      >
        <span className="font-mono text-emerald-400 text-sm font-bold">darshan@system:~$</span>
        <input
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          placeholder="Type command or question (e.g. 'skills', 'cat resume', 'whoami')..."
          className="flex-1 bg-transparent border-none outline-none font-mono text-xs sm:text-sm text-emerald-300 placeholder-emerald-700/60"
        />
        <button
          type="submit"
          className="px-3 py-1.5 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 text-xs font-mono flex items-center gap-1 transition-colors"
        >
          <Send className="w-3 h-3" />
          <span>Execute</span>
        </button>
      </form>
    </div>
  );
}
