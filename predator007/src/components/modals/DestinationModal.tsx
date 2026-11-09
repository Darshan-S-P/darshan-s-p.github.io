import React, { useEffect } from 'react';
import { X, ExternalLink, Github, Award, CheckCircle2, Mail, Phone, MapPin, Sparkles, Terminal } from 'lucide-react';
import type { SectionId } from '../../types';
import { PROJECTS, EXPERIENCES, SKILL_CATEGORIES, PERSONAL_INFO } from '../../data/portfolioData';

interface ModalProps {
  destination: SectionId | null;
  onClose: () => void;
}

export default function DestinationModal({ destination, onClose }: ModalProps) {
  // Global Escape key listener to guarantee modal can always be closed
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!destination) return null;

  const getTitle = () => {
    switch (destination) {
      case 'about': return 'ABOUT THE ENGINEER';
      case 'projects': return 'ENGINEERING PROJECTS';
      case 'experience': return 'CAREER TRAJECTORY';
      case 'skills': return 'TECHNICAL ARSENAL';
      case 'education': return 'EDUCATION & CERTIFICATIONS';
      case 'contact': return 'COMMUNICATION COORDINATES';
      default: return 'SYSTEM ARCHIVES';
    }
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md cursor-pointer animate-fadeIn select-auto"
      style={{ pointerEvents: 'auto' }}
    >
      {/* Modal Dialog Window */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-3xl max-h-[90vh] flex flex-col cyber-glass-cyan border-2 border-cyan-400 shadow-[0_0_50px_rgba(0,242,254,0.45)] rounded-2xl text-white font-mono cursor-default overflow-hidden"
      >
        {/* ================= FIXED HEADER (Pinned at Top) ================= */}
        <div className="flex items-center justify-between px-5 sm:px-7 py-4 bg-[#0a0f18]/95 border-b border-cyan-500/40 shrink-0 z-20">
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
            <div>
              <span className="text-[10px] sm:text-xs text-pink-400 font-bold uppercase tracking-widest block">
                // CHECKPOINT // {destination.toUpperCase()}
              </span>
              <h2 className="text-lg sm:text-2xl font-black text-white glow-text-cyan leading-none mt-0.5">
                {getTitle()}
              </h2>
            </div>
          </div>

          {/* Prominent, Unmissable Close Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl bg-red-500/20 hover:bg-red-500 text-red-300 hover:text-white border border-red-500/60 hover:border-red-400 transition-all cursor-pointer font-bold text-xs uppercase shadow-[0_0_15px_rgba(239,68,68,0.4)] active:scale-95"
            title="Close this popup (ESC)"
          >
            <X className="w-4 h-4" />
            <span className="hidden sm:inline">CLOSE</span>
            <span className="text-[10px] text-red-300/80 font-normal">[ESC]</span>
          </button>
        </div>

        {/* ================= SCROLLABLE CONTENT BODY ================= */}
        <div className="p-5 sm:p-8 overflow-y-auto space-y-6 flex-1 text-sm leading-relaxed">
          {/* -------------------- ABOUT DESTINATION -------------------- */}
          {destination === 'about' && (
            <div className="space-y-6">
              <div className="p-5 rounded-xl bg-black/50 border border-cyan-500/30 space-y-3">
                <div className="flex items-center gap-2 text-cyan-300 font-bold text-base">
                  <Terminal className="w-4 h-4 text-pink-400" />
                  <span>DARSHAN SP // CALLSIGN: {PERSONAL_INFO.callsign}</span>
                </div>
                <p className="text-gray-300 leading-relaxed text-xs sm:text-sm">
                  {PERSONAL_INFO.bio}
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 text-xs">
                  <div className="p-2.5 rounded bg-cyan-950/40 border border-cyan-500/20">
                    <span className="text-gray-400 block text-[10px]">ROLE</span>
                    <span className="text-white font-bold">{PERSONAL_INFO.title}</span>
                  </div>
                  <div className="p-2.5 rounded bg-cyan-950/40 border border-cyan-500/20">
                    <span className="text-gray-400 block text-[10px]">LOCATION</span>
                    <span className="text-cyan-300 font-bold">{PERSONAL_INFO.location}</span>
                  </div>
                  <div className="p-2.5 rounded bg-cyan-950/40 border border-cyan-500/20">
                    <span className="text-gray-400 block text-[10px]">EDUCATION</span>
                    <span className="text-pink-300 font-bold">BE CSE (8.7 CGPA)</span>
                  </div>
                  <div className="p-2.5 rounded bg-cyan-950/40 border border-cyan-500/20">
                    <span className="text-gray-400 block text-[10px]">CERTIFICATION</span>
                    <span className="text-emerald-300 font-bold">RHCSA EX200</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xs font-bold text-pink-400 uppercase tracking-widest mb-3">
                  // CORE EXPERTISE & PHILOSOPHY
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3.5 rounded-lg bg-black/40 border border-cyan-500/20 space-y-1">
                    <span className="text-cyan-300 font-bold">Autonomous AI Agents</span>
                    <p className="text-gray-400">Production multi-node StateGraphs with LangGraph, cyclical routing, and guarded execution.</p>
                  </div>
                  <div className="p-3.5 rounded-lg bg-black/40 border border-cyan-500/20 space-y-1">
                    <span className="text-cyan-300 font-bold">Advanced RAG & Retrieval</span>
                    <p className="text-gray-400">Hybrid dense + sparse search (BM25 + Chroma), Reciprocal Rank Fusion, sub-200ms latency.</p>
                  </div>
                  <div className="p-3.5 rounded-lg bg-black/40 border border-cyan-500/20 space-y-1">
                    <span className="text-cyan-300 font-bold">High-Throughput Vision Systems</span>
                    <p className="text-gray-400">Real-time object detection and density estimation with YOLOv8 & CSRNet on Azure GPU clusters.</p>
                  </div>
                  <div className="p-3.5 rounded-lg bg-black/40 border border-cyan-500/20 space-y-1">
                    <span className="text-cyan-300 font-bold">Cloud & Linux Systems</span>
                    <p className="text-gray-400">Certified Red Hat RHCSA, Docker containerization, Azure VM deployment, Redis caching.</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* -------------------- PROJECTS DESTINATION -------------------- */}
          {destination === 'projects' && (
            <div className="space-y-6">
              {PROJECTS.map((proj) => (
                <div key={proj.id} className="p-4 sm:p-5 rounded-xl bg-black/50 border border-cyan-500/30 space-y-3 hover:border-cyan-400 transition-colors">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-cyan-400 shrink-0" />
                      <h3 className="text-base sm:text-lg font-bold text-cyan-300">{proj.title}</h3>
                    </div>
                    <span className="text-xs text-pink-400 font-mono">{proj.period}</span>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                    {proj.description}
                  </p>
                  <ul className="space-y-1.5 text-xs text-gray-300">
                    {proj.highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-cyan-400 mt-0.5">▸</span>
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {proj.technologies.map((t) => (
                      <span key={t} className="px-2.5 py-0.5 rounded bg-cyan-950/70 border border-cyan-500/40 text-[11px] text-cyan-200">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* -------------------- EXPERIENCE DESTINATION -------------------- */}
          {destination === 'experience' && (
            <div className="space-y-5">
              {EXPERIENCES.map((exp, idx) => (
                <div key={idx} className="p-4 sm:p-5 rounded-xl bg-black/50 border border-cyan-500/30 space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                    <div>
                      <h3 className="text-base sm:text-lg font-bold text-white">{exp.role}</h3>
                      <div className="text-cyan-400 text-xs font-semibold">{exp.company} • {exp.location}</div>
                    </div>
                    <span className="text-xs text-pink-400 font-mono mt-1 sm:mt-0">{exp.period}</span>
                  </div>
                  <ul className="space-y-1.5 text-xs text-gray-300">
                    {exp.achievements.map((a, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                        <span>{a}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {exp.technologies.map((t) => (
                      <span key={t} className="px-2 py-0.5 rounded bg-pink-950/40 border border-pink-500/30 text-[10px] text-pink-300">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* -------------------- SKILLS DESTINATION -------------------- */}
          {destination === 'skills' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {SKILL_CATEGORIES.map((cat) => (
                <div key={cat.title} className="p-4 rounded-xl bg-black/50 border border-cyan-500/30 space-y-2.5">
                  <h3 className="text-xs font-bold text-pink-400 uppercase tracking-wider">{cat.title}</h3>
                  <div className="flex flex-wrap gap-1.5">
                    {cat.skills.map((skill) => (
                      <span key={skill} className="px-2.5 py-1 rounded bg-cyan-950/60 border border-cyan-500/40 text-xs text-cyan-200">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* -------------------- EDUCATION DESTINATION -------------------- */}
          {destination === 'education' && (
            <div className="space-y-5">
              <div className="p-5 rounded-xl bg-black/50 border border-cyan-500/30 space-y-2">
                <div className="flex items-center gap-2 text-cyan-300 font-bold text-base">
                  <Award className="w-5 h-5 text-pink-400" />
                  <span>Jyothy Institute of Technology, Bengaluru</span>
                </div>
                <div className="text-xs text-gray-400">
                  Bachelor of Engineering in Computer Science & Engineering (2021 – 2025)
                </div>
                <div className="text-xs text-emerald-400 font-bold">
                  Cumulative GPA: 8.7 / 10.0
                </div>
              </div>

              <div className="p-5 rounded-xl bg-black/50 border border-cyan-500/30 space-y-3">
                <h3 className="text-xs font-bold text-pink-400 uppercase tracking-widest">// PROFESSIONAL CERTIFICATIONS</h3>
                <ul className="space-y-2 text-xs text-gray-300">
                  {PERSONAL_INFO.certifications.map((cert, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-cyan-400" />
                      <span>{cert}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* -------------------- CONTACT DESTINATION -------------------- */}
          {destination === 'contact' && (
            <div className="space-y-5">
              <p className="text-xs text-gray-300">
                Direct communication channels for AI/ML engineering roles, consulting, and collaboration:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <a
                  href={`mailto:${PERSONAL_INFO.email}`}
                  className="p-4 rounded-xl bg-black/50 border border-cyan-500/30 hover:border-cyan-300 text-xs text-gray-200 hover:text-white flex items-center gap-3 transition-colors group cursor-pointer"
                >
                  <Mail className="w-5 h-5 text-cyan-400 group-hover:scale-110 transition-transform" />
                  <div>
                    <div className="text-[10px] text-gray-400 uppercase">Email</div>
                    <div className="font-bold text-white">{PERSONAL_INFO.email}</div>
                  </div>
                </a>

                <a
                  href={`tel:${PERSONAL_INFO.phone}`}
                  className="p-4 rounded-xl bg-black/50 border border-cyan-500/30 hover:border-cyan-300 text-xs text-gray-200 hover:text-white flex items-center gap-3 transition-colors group cursor-pointer"
                >
                  <Phone className="w-5 h-5 text-cyan-400 group-hover:scale-110 transition-transform" />
                  <div>
                    <div className="text-[10px] text-gray-400 uppercase">Phone</div>
                    <div className="font-bold text-white">{PERSONAL_INFO.phone}</div>
                  </div>
                </a>

                <div className="p-4 rounded-xl bg-black/50 border border-cyan-500/30 text-xs text-gray-200 flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-cyan-400" />
                  <div>
                    <div className="text-[10px] text-gray-400 uppercase">Base Station</div>
                    <div className="font-bold text-white">{PERSONAL_INFO.location}</div>
                  </div>
                </div>

                <a
                  href="https://github.com/Darshan-S-P"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 rounded-xl bg-black/50 border border-cyan-500/30 hover:border-cyan-300 text-xs text-gray-200 hover:text-white flex items-center gap-3 transition-colors group cursor-pointer"
                >
                  <Github className="w-5 h-5 text-cyan-400 group-hover:scale-110 transition-transform" />
                  <div>
                    <div className="text-[10px] text-gray-400 uppercase">GitHub Profile</div>
                    <div className="font-bold text-white">github.com/Darshan-S-P</div>
                  </div>
                </a>
              </div>
            </div>
          )}
        </div>

        {/* ================= FIXED FOOTER (Pinned at Bottom) ================= */}
        <div className="px-5 sm:px-7 py-3 bg-[#0a0f18]/95 border-t border-cyan-500/30 flex justify-between items-center shrink-0 z-20">
          <span className="text-[11px] text-gray-400 hidden sm:inline">
            Press <kbd className="px-1.5 py-0.5 rounded bg-black/60 border border-gray-600 text-cyan-300 text-[10px]">ESC</kbd> or click Close to return to driving
          </span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            className="w-full sm:w-auto px-5 py-2 rounded-xl bg-cyan-950/80 hover:bg-cyan-500/30 text-cyan-300 hover:text-white border border-cyan-400/60 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer transition-all shadow-neon-cyan"
          >
            <X className="w-4 h-4" />
            <span>RETURN TO HIGHWAY</span>
          </button>
        </div>
      </div>
    </div>
  );
}