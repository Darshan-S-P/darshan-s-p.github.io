"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { ArrowRight, Bot, Sparkles, Terminal, FileText, ChevronDown } from "lucide-react";

// Dynamic import of 3D Scene with ssr: false
const NeuralScene = dynamic(() => import("@/components/3d/NeuralScene"), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 bg-gradient-to-b from-[#0a0f1d] via-[#08090d] to-[#08090d] opacity-50" />
  ),
});

const CyberTerminalMonitor = dynamic(() => import("@/components/3d/CyberTerminalMonitor"), {
  ssr: false,
});

const roles = [
  "AI/ML Systems Engineer",
  "GenAI & RAG Pipeline Architect",
  "FastAPI & Python Microservices Developer",
  "Computer Vision & Edge Inference Engineer",
];

export default function HeroSection({ onOpenChat }: { onOpenChat: () => void }) {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayedRole, setDisplayedRole] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [showTerminal, setShowTerminal] = useState(false);

  // Typewriter effect
  useEffect(() => {
    const current = roles[roleIndex];
    let timeout: NodeJS.Timeout;

    if (!isDeleting && displayedRole.length < current.length) {
      timeout = setTimeout(() => {
        setDisplayedRole(current.slice(0, displayedRole.length + 1));
      }, 70);
    } else if (!isDeleting && displayedRole.length === current.length) {
      timeout = setTimeout(() => setIsDeleting(true), 1800);
    } else if (isDeleting && displayedRole.length > 0) {
      timeout = setTimeout(() => {
        setDisplayedRole(current.slice(0, displayedRole.length - 1));
      }, 40);
    } else if (isDeleting && displayedRole.length === 0) {
      setIsDeleting(false);
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }

    return () => clearTimeout(timeout);
  }, [displayedRole, isDeleting, roleIndex]);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-24 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* 3D Neural Scene Background */}
      <NeuralScene />

      {/* Cyber Grid & Radial Glow Overlay */}
      <div className="absolute inset-0 bg-mesh-pattern pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-cyan-500/10 to-purple-500/10 blur-[130px] rounded-full pointer-events-none" />

      {/* Foreground Content */}
      <div className="relative z-10 max-w-5xl mx-auto text-center flex flex-col items-center">
        {/* Availability Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-950/40 backdrop-blur-md mb-6 shadow-glow-cyan">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
          <span className="text-xs font-mono text-cyan-300 font-medium tracking-wide">
            AVAILABLE FOR AI/ML & BACKEND ROLES • BENGALURU
          </span>
        </div>

        {/* Hero Name */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white mb-4">
          Hi, I&apos;m{" "}
          <span className="bg-gradient-to-r from-neonCyan via-neonBlue to-neonPurple bg-clip-text text-transparent drop-shadow-[0_0_35px_rgba(0,242,254,0.3)]">
            Darshan SP
          </span>
        </h1>

        {/* Dynamic Typewriter Role */}
        <div className="h-10 sm:h-12 flex items-center justify-center mb-6">
          <span className="text-lg sm:text-2xl md:text-3xl font-mono text-gray-300 font-light">
            I build{" "}
            <span className="text-cyan-400 font-semibold border-b-2 border-cyan-400 pb-0.5">
              {displayedRole}
            </span>
            <span className="animate-pulse text-cyan-400">|</span>
          </span>
        </div>

        {/* Bio Subtitle */}
        <p className="max-w-2xl text-sm sm:text-base md:text-lg text-gray-400 mb-8 leading-relaxed">
          Specializing in production-grade <strong>GenAI & RAG pipelines</strong> (hybrid BM25 + dense retrieval, 4,500+ legal pages),
          real-time <strong>computer vision</strong> (YOLOv8 + CUDA), and high-concurrency <strong>FastAPI microservices</strong>.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
          <a
            href="#projects"
            className="px-6 py-3.5 rounded-xl font-medium text-sm text-black bg-gradient-to-r from-neonCyan to-neonBlue hover:opacity-95 shadow-glow-cyan transition-all flex items-center gap-2 group cursor-pointer"
          >
            <span>Explore Projects</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>

          <button
            onClick={onOpenChat}
            className="px-6 py-3.5 rounded-xl font-medium text-sm text-cyan-300 glass-panel border border-cyan-500/30 hover:border-cyan-400 hover:bg-cyan-950/30 transition-all flex items-center gap-2 cursor-pointer"
          >
            <Bot className="w-4 h-4 text-cyan-400" />
            <span>Ask My LangGraph Agent</span>
          </button>

          <button
            onClick={() => setShowTerminal(!showTerminal)}
            className="px-5 py-3.5 rounded-xl font-mono text-xs text-emerald-400 glass-panel border border-emerald-500/30 hover:border-emerald-400 hover:bg-emerald-950/30 transition-all flex items-center gap-2 cursor-pointer"
          >
            <Terminal className="w-4 h-4 text-emerald-400" />
            <span>{showTerminal ? "Hide 3D Terminal" : "Launch Unix Terminal"}</span>
          </button>

          <a
            href="#matcher"
            className="px-5 py-3.5 rounded-xl font-medium text-xs text-purple-300 glass-panel border border-purple-500/30 hover:border-purple-400 hover:bg-purple-950/30 transition-all flex items-center gap-2 cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
            <span>Recruiter JD Matcher</span>
          </a>
        </div>

        {/* Highlight Stats Pill Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-6 w-full max-w-3xl mb-8">
          <div className="p-3.5 rounded-xl glass-card border border-white/5 text-center">
            <div className="text-xl sm:text-2xl font-bold font-mono text-cyan-400">1+ Years</div>
            <div className="text-[11px] sm:text-xs text-gray-400 uppercase tracking-wider mt-0.5">Hands-On Exp</div>
          </div>
          <div className="p-3.5 rounded-xl glass-card border border-white/5 text-center">
            <div className="text-xl sm:text-2xl font-bold font-mono text-cyan-400">4,500+</div>
            <div className="text-[11px] sm:text-xs text-gray-400 uppercase tracking-wider mt-0.5">HTS Legal Pages RAG</div>
          </div>
          <div className="p-3.5 rounded-xl glass-card border border-white/5 text-center">
            <div className="text-xl sm:text-2xl font-bold font-mono text-cyan-400">8.7 / 10</div>
            <div className="text-[11px] sm:text-xs text-gray-400 uppercase tracking-wider mt-0.5">B.E. CGPA (CSE)</div>
          </div>
          <div className="p-3.5 rounded-xl glass-card border border-white/5 text-center">
            <div className="text-xl sm:text-2xl font-bold font-mono text-cyan-400">RHCSA</div>
            <div className="text-[11px] sm:text-xs text-gray-400 uppercase tracking-wider mt-0.5">Red Hat Certified</div>
          </div>
        </div>

        {/* Expandable 3D Cyber Terminal Monitor */}
        {showTerminal && (
          <div className="w-full mt-4 transition-all duration-500 animate-fadeIn">
            <CyberTerminalMonitor />
          </div>
        )}
      </div>

      {/* Down indicator */}
      <a
        href="#projects"
        className="absolute bottom-4 left-1/2 -translate-x-1/2 text-gray-500 hover:text-cyan-400 transition-colors animate-bounce p-2"
        aria-label="Scroll down"
      >
        <ChevronDown className="w-5 h-5" />
      </a>
    </section>
  );
}
