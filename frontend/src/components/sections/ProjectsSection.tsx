"use client";

import React, { useState } from "react";
import TiltCard from "@/components/ui/TiltCard";
import ProjectModal, { ProjectData } from "@/components/ui/ProjectModal";
import projectsData from "@/data/projects.json";
import { Sparkles, ExternalLink, ArrowUpRight, Cpu } from "lucide-react";

export default function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);
  const [filter, setFilter] = useState<string>("All");

  const categories = ["All", "Generative AI & RAG", "Computer Vision & Deep Learning", "Full-Stack Backend & Cloud"];

  const filteredProjects = filter === "All"
    ? projectsData
    : projectsData.filter((p) => p.category === filter);

  return (
    <section id="projects" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
      {/* Background Accent glow */}
      <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-96 h-96 bg-cyan-500/10 blur-[120px] rounded-full pointer-events-none" />

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-950/30 text-xs font-mono text-cyan-400 mb-4">
          <Sparkles className="w-3.5 h-3.5" />
          <span>PRODUCTION-GRADE AI & BACKEND SYSTEMS</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
          Featured Engineering Projects
        </h2>
        <p className="text-sm sm:text-base text-gray-400">
          Interactive 3D tilt cards. Hover to inspect 3D tilt and glare; click any card to inspect the full architecture, system metrics, and implementation details.
        </p>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-2 mt-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-1.5 rounded-full text-xs font-mono transition-all cursor-pointer ${
                filter === cat
                  ? "bg-cyan-500/20 text-cyan-300 border border-cyan-400/50 shadow-glow-cyan"
                  : "bg-white/[0.03] text-gray-400 border border-white/5 hover:border-white/20 hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* 3D Tilt Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
        {filteredProjects.map((project) => (
          <TiltCard
            key={project.id}
            accentColor={project.accentColor}
            onClick={() => setSelectedProject(project as ProjectData)}
            className="group flex flex-col justify-between"
          >
            <div>
              {/* Category & Year */}
              <div className="flex items-center justify-between mb-4">
                <span
                  className="text-[11px] font-mono px-2.5 py-1 rounded-full uppercase tracking-wider font-semibold"
                  style={{
                    backgroundColor: `${project.accentColor}15`,
                    color: project.accentColor,
                    border: `1px solid ${project.accentColor}30`,
                  }}
                >
                  {project.category}
                </span>
                <span className="text-xs font-mono text-gray-400">
                  {project.period}
                </span>
              </div>

              {/* Title & Subtitle */}
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors flex items-center justify-between">
                <span>{project.title}</span>
                <ArrowUpRight className="w-5 h-5 text-gray-500 group-hover:text-cyan-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </h3>
              <p className="text-xs text-gray-400 mb-4 line-clamp-2">
                {project.subtitle}
              </p>

              {/* Metrics Pills */}
              <div className="grid grid-cols-2 gap-2 my-4">
                {project.metrics.slice(0, 2).map((m, idx) => (
                  <div
                    key={idx}
                    className="p-2.5 rounded-lg bg-black/40 border border-white/5"
                  >
                    <div
                      className="text-xs sm:text-sm font-bold font-mono"
                      style={{ color: project.accentColor }}
                    >
                      {m.value}
                    </div>
                    <div className="text-[10px] text-gray-400 uppercase tracking-wide">
                      {m.label}
                    </div>
                  </div>
                ))}
              </div>

              {/* Highlights snippet */}
              <p className="text-xs text-gray-300 line-clamp-3 mb-6 leading-relaxed">
                {project.description}
              </p>
            </div>

            {/* Card Footer: Tech Stack */}
            <div className="pt-4 border-t border-white/5 flex flex-wrap gap-1.5 items-center justify-between">
              <div className="flex flex-wrap gap-1.5">
                {project.tech.slice(0, 4).map((t) => (
                  <span
                    key={t}
                    className="px-2 py-0.5 text-[11px] rounded bg-white/[0.04] text-gray-300 font-mono border border-white/5"
                  >
                    {t}
                  </span>
                ))}
                {project.tech.length > 4 && (
                  <span className="px-1.5 py-0.5 text-[11px] text-gray-500 font-mono">
                    +{project.tech.length - 4}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 opacity-90 group-hover:opacity-100">
                <span>Inspect Architecture</span>
              </div>
            </div>
          </TiltCard>
        ))}
      </div>

      {/* Project Full Screen Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}
