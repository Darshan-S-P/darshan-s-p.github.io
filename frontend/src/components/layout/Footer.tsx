"use client";

import React from "react";
import { Mail, Heart, Cpu } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/Icons";

export default function Footer() {
  return (
    <footer className="border-t border-white/5 py-12 px-4 sm:px-6 lg:px-8 bg-[#06070a] text-gray-500 font-mono text-xs">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex flex-col sm:flex-row items-center gap-2">
          <span className="text-white font-bold tracking-tight">Darshan SP</span>
          <span className="hidden sm:inline text-gray-600">•</span>
          <span>Software Engineer & AI/ML Systems Specialist</span>
        </div>

        <div className="flex items-center gap-4 text-gray-400">
          <a
            href="https://github.com/Darshan-S-P"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-cyan-400 transition-colors"
            aria-label="GitHub"
          >
            <GithubIcon className="w-4 h-4" />
          </a>
          <a
            href="https://linkedin.com/in/darshan-sp"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-cyan-400 transition-colors"
            aria-label="LinkedIn"
          >
            <LinkedinIcon className="w-4 h-4" />
          </a>
          <a
            href="mailto:darshanspdarshu6172@gmail.com"
            className="hover:text-cyan-400 transition-colors"
            aria-label="Email"
          >
            <Mail className="w-4 h-4" />
          </a>
        </div>

        <div className="flex items-center gap-1.5 text-gray-600 text-[11px]">
          <Cpu className="w-3.5 h-3.5 text-cyan-500" />
          <span>Next.js 14 • R3F • FastAPI • LangGraph</span>
        </div>
      </div>
    </footer>
  );
}
