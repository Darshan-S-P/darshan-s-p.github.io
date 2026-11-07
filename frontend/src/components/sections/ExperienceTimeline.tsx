"use client";

import React, { useEffect, useRef, useState } from "react";
import experienceData from "@/data/experience.json";
import { Briefcase, Calendar, MapPin, CheckCircle, ChevronDown, ChevronUp, Terminal } from "lucide-react";

export default function ExperienceTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeNodes, setActiveNodes] = useState<number[]>([]);
  const [expandedNodes, setExpandedNodes] = useState<Record<string, boolean>>({
    "techcrafter-swe": true, // Default top one expanded
  });

  const toggleExpand = (id: string) => {
    setExpandedNodes((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  useEffect(() => {
    // Setup Intersection Observer for timeline nodes
    const nodeElements = document.querySelectorAll(".timeline-node");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = Number(entry.target.getAttribute("data-index"));
          if (entry.isIntersecting) {
            setActiveNodes((prev) => (prev.includes(index) ? prev : [...prev, index]));
          }
        });
      },
      { threshold: 0.3 }
    );

    nodeElements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="experience" ref={containerRef} className="py-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto relative">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-purple-500/30 bg-purple-950/30 text-xs font-mono text-purple-400 mb-4">
          <Briefcase className="w-3.5 h-3.5" />
          <span>CAREER TRAJECTORY & IMPACT</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
          Professional Experience
        </h2>
        <p className="text-sm sm:text-base text-gray-400">
          Scroll-reactive 3D timeline. Nodes activate dynamically as you scroll down.
        </p>
      </div>

      {/* Vertical Timeline Container */}
      <div className="relative pl-6 sm:pl-10 md:pl-12">
        {/* Glowing Gradient Progress Line */}
        <div className="absolute left-[11px] sm:left-[19px] md:left-[23px] top-3 bottom-8 w-[3px] bg-gradient-to-b from-cyan-400 via-blue-500 to-purple-600 shadow-[0_0_15px_rgba(0,242,254,0.5)] rounded-full" />

        <div className="space-y-12">
          {experienceData.map((exp, idx) => {
            const isActive = activeNodes.includes(idx);
            const isExpanded = !!expandedNodes[exp.id];

            return (
              <div
                key={exp.id}
                data-index={idx}
                className={`timeline-node relative transition-all duration-700 ${
                  isActive ? "opacity-100 translate-y-0" : "opacity-40 translate-y-6"
                }`}
              >
                {/* 3D Glowing Timeline Node */}
                <div
                  className={`absolute -left-[27px] sm:-left-[35px] md:-left-[39px] top-4 w-6 h-6 rounded-full flex items-center justify-center transition-all duration-500 ${
                    isActive
                      ? "bg-cyan-400 shadow-[0_0_20px_#00f2fe] scale-110"
                      : "bg-[#181b26] border border-white/20"
                  }`}
                >
                  <div className="w-2.5 h-2.5 rounded-full bg-[#08090d]" />
                </div>

                {/* Experience Card */}
                <div className="glass-panel rounded-2xl p-6 sm:p-7 border border-white/10 hover:border-cyan-500/30 transition-all duration-300">
                  {/* Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                    <div>
                      <span
                        className="text-[11px] font-mono font-semibold px-2.5 py-0.5 rounded-full uppercase tracking-wider mb-2 inline-block"
                        style={{
                          backgroundColor: `${exp.color}20`,
                          color: exp.color,
                          border: `1px solid ${exp.color}40`,
                        }}
                      >
                        {exp.type}
                      </span>
                      <h3 className="text-xl sm:text-2xl font-bold text-white">
                        {exp.role}
                      </h3>
                      <div className="text-sm font-medium text-cyan-400 mt-0.5">
                        {exp.company}
                      </div>
                    </div>

                    <div className="flex flex-col sm:items-end text-xs font-mono text-gray-400 gap-1">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-gray-500" />
                        {exp.period}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-gray-500" />
                        {exp.location}
                      </span>
                    </div>
                  </div>

                  {/* Summary */}
                  <p className="text-xs sm:text-sm text-gray-300 leading-relaxed mb-4">
                    {exp.summary}
                  </p>

                  {/* Expand/Collapse Toggle */}
                  <button
                    onClick={() => toggleExpand(exp.id)}
                    className="flex items-center gap-1.5 text-xs font-mono text-cyan-400 hover:text-cyan-300 transition-colors mb-4 cursor-pointer"
                  >
                    <span>{isExpanded ? "Collapse Key Achievements" : "Expand Key Achievements"}</span>
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>

                  {/* Expandable Achievements */}
                  {isExpanded && (
                    <div className="space-y-2.5 mb-5 pl-2 border-l border-cyan-500/20">
                      {exp.achievements.map((ach, aIdx) => (
                        <div key={aIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-300">
                          <CheckCircle className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                          <span>{ach}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Tech stack badges */}
                  <div className="flex flex-wrap gap-1.5 pt-4 border-t border-white/5">
                    {exp.skills.map((s) => (
                      <span
                        key={s}
                        className="px-2.5 py-1 text-xs rounded-lg bg-white/[0.04] text-gray-300 font-mono border border-white/5"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
