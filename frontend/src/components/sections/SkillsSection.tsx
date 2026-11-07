"use client";

import React, { useState } from "react";
import skillsData from "@/data/skills.json";
import { Cpu, Eye, Server, Cloud, Award, CheckCircle2, ShieldCheck } from "lucide-react";

export default function SkillsSection() {
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const iconMap: Record<string, React.ReactNode> = {
    Cpu: <Cpu className="w-5 h-5 text-cyan-400" />,
    Eye: <Eye className="w-5 h-5 text-purple-400" />,
    Server: <Server className="w-5 h-5 text-emerald-400" />,
    Cloud: <Cloud className="w-5 h-5 text-amber-400" />,
  };

  return (
    <section id="skills" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-950/30 text-xs font-mono text-cyan-400 mb-4">
          <Cpu className="w-3.5 h-3.5" />
          <span>PRODUCTION-PROVEN MASTERY</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
          Skills & Certifications
        </h2>
        <p className="text-sm sm:text-base text-gray-400">
          Core competencies spanning Generative AI pipelines, low-latency FastAPI architectures, computer vision, and Red Hat Linux administration.
        </p>
      </div>

      {/* Skill Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mb-16">
        {skillsData.categories.map((cat) => (
          <div
            key={cat.name}
            className="glass-panel rounded-2xl p-6 sm:p-7 border border-white/5 hover:border-cyan-500/30 transition-all duration-300"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-xl bg-white/[0.04] border border-white/10">
                {iconMap[cat.icon] || <Cpu className="w-5 h-5 text-cyan-400" />}
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-white">
                {cat.name}
              </h3>
            </div>

            <div className="space-y-4">
              {cat.skills.map((skill) => (
                <div key={skill.name}>
                  <div className="flex justify-between items-center text-xs font-mono mb-1.5">
                    <span className="text-gray-200">{skill.name}</span>
                    <span className="text-cyan-400">{skill.level}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-white/[0.06] rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full bg-gradient-to-r ${cat.color} transition-all duration-1000`}
                      style={{ width: `${skill.level}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Certifications & Badges */}
      <div className="mt-12 pt-12 border-t border-white/10">
        <div className="flex items-center gap-2 mb-8 justify-center">
          <Award className="w-5 h-5 text-amber-400" />
          <h3 className="text-xl sm:text-2xl font-bold text-white text-center">
            Verified Certifications & Honors
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {skillsData.certifications.map((cert, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl glass-card border border-white/5 hover:border-amber-500/30 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20 uppercase font-semibold">
                    {cert.badge}
                  </span>
                  <span className="text-[11px] font-mono text-gray-500">
                    {cert.date}
                  </span>
                </div>
                <h4 className="text-sm font-semibold text-white mb-1.5 leading-snug">
                  {cert.name}
                </h4>
                <div className="text-xs text-gray-400 font-mono">
                  {cert.issuer}
                </div>
              </div>
              <div className="mt-4 flex items-center gap-1.5 text-[11px] font-mono text-emerald-400">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Verified Credential</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
