"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, Layers, BarChart3, CheckCircle2 } from "lucide-react";
import { GithubIcon } from "@/components/ui/Icons";

export interface ProjectData {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  period: string;
  company: string;
  description: string;
  architecture: string;
  metrics: { label: string; value: string }[];
  highlights: string[];
  tech: string[];
  github: string;
  demo: string;
  accentColor: string;
}

interface ProjectModalProps {
  project: ProjectData | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (project) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          layoutId={`project-card-${project.id}`}
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl glass-panel border border-white/10 bg-[#0d0f17]/95 p-6 sm:p-8 z-10 shadow-2xl text-white"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full bg-white/5 hover:bg-white/15 text-gray-400 hover:text-white transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Category & Period */}
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span
              className="text-xs font-mono font-semibold px-3 py-1 rounded-full uppercase tracking-wider"
              style={{
                backgroundColor: `${project.accentColor}20`,
                color: project.accentColor,
                border: `1px solid ${project.accentColor}40`,
              }}
            >
              {project.category}
            </span>
            <span className="text-xs text-gray-400 font-mono">
              {project.company} • {project.period}
            </span>
          </div>

          {/* Title & Subtitle */}
          <h2 className="text-2xl sm:text-3xl font-bold mb-2 text-white">
            {project.title}
          </h2>
          <p className="text-sm sm:text-base text-gray-400 mb-6 font-light">
            {project.subtitle}
          </p>

          {/* Key Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
            {project.metrics.map((m, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl bg-white/[0.03] border border-white/5"
              >
                <div
                  className="text-base sm:text-lg font-bold font-mono"
                  style={{ color: project.accentColor }}
                >
                  {m.value}
                </div>
                <div className="text-[11px] text-gray-400 uppercase tracking-wide mt-0.5">
                  {m.label}
                </div>
              </div>
            ))}
          </div>

          {/* Overview */}
          <div className="mb-6">
            <h3 className="text-xs uppercase tracking-wider text-gray-400 font-mono mb-2">
              System Description
            </h3>
            <p className="text-sm text-gray-300 leading-relaxed">
              {project.description}
            </p>
          </div>

          {/* System Architecture Flow */}
          <div className="mb-6 p-4 rounded-xl bg-black/40 border border-white/5 font-mono text-xs">
            <div className="flex items-center gap-2 text-cyan-300 font-semibold mb-2">
              <Layers className="w-4 h-4" />
              <span>Pipeline Architecture:</span>
            </div>
            <p className="text-gray-300 leading-relaxed">
              {project.architecture}
            </p>
          </div>

          {/* Engineering Highlights */}
          <div className="mb-6">
            <h3 className="text-xs uppercase tracking-wider text-gray-400 font-mono mb-3 flex items-center gap-1.5">
              <BarChart3 className="w-3.5 h-3.5 text-cyan-400" />
              Key Engineering Highlights
            </h3>
            <ul className="space-y-2">
              {project.highlights.map((h, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-sm text-gray-300">
                  <CheckCircle2
                    className="w-4 h-4 shrink-0 mt-0.5"
                    style={{ color: project.accentColor }}
                  />
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Tech Stack Tags */}
          <div className="mb-8">
            <h3 className="text-xs uppercase tracking-wider text-gray-400 font-mono mb-2.5">
              Technologies & Infrastructure
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((t) => (
                <span
                  key={t}
                  className="px-2.5 py-1 text-xs rounded-lg bg-white/[0.04] border border-white/10 text-gray-300 font-mono"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Action Links */}
          <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-white/10">
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-xl font-medium text-xs sm:text-sm bg-white/10 hover:bg-white/20 text-white flex items-center gap-2 transition-colors"
            >
              <GithubIcon className="w-4 h-4" />
              <span>View GitHub Repository</span>
            </a>
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-xl font-medium text-xs sm:text-sm text-black flex items-center gap-2 transition-opacity"
              style={{ backgroundColor: project.accentColor }}
            >
              <ExternalLink className="w-4 h-4" />
              <span>Live Architecture Demo</span>
            </a>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
