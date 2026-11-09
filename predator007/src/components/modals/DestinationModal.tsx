import React from 'react';
import { X, ExternalLink, Github, Award, CheckCircle2, Mail, Phone, MapPin } from 'lucide-react';
import type { SectionId } from '../../types';
import { PROJECTS, EXPERIENCES, SKILL_CATEGORIES, PERSONAL_INFO } from '../../data/portfolioData';

interface ModalProps {
  destination: SectionId | null;
  onClose: () => void;
}

export default function DestinationModal({ destination, onClose }: ModalProps) {
  if (!destination) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-3xl max-h-[85vh] overflow-y-auto cyber-glass-cyan border border-cyan-400/50 shadow-neon-cyan rounded-2xl p-6 sm:p-8 text-white font-mono">
        {/* Modal Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-lg bg-black/40 hover:bg-cyan-500/20 text-gray-400 hover:text-white border border-cyan-500/30 transition-all cursor-pointer"
        >
          <X className="w-5 h-5 text-cyan-400" />
        </button>

        {/* -------------------- PROJECTS DESTINATION -------------------- */}
        {destination === 'projects' && (
          <div className="space-y-6">
            <div className="border-b border-cyan-500/30 pb-3">
              <span className="text-xs text-pink-400 font-bold uppercase tracking-widest">// DESTINATION:</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white glow-text-cyan mt-1">
                ENGINEERING PROJECTS
              </h2>
            </div>

            <div className="space-y-6">
              {PROJECTS.map((proj) => (
                <div key={proj.id} className="p-4 sm:p-5 rounded-xl bg-black/40 border border-cyan-500/30 space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <h3 className="text-lg font-bold text-cyan-300">{proj.title}</h3>
                    <span className="text-xs text-pink-400">{proj.period}</span>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                    {proj.description}
                  </p>
                  <ul className="space-y-1 text-xs text-gray-300">
                    {proj.highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-cyan-400 mt-0.5">▸</span>
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {proj.technologies.map((t) => (
                      <span key={t} className="px-2 py-0.5 rounded bg-cyan-950/60 border border-cyan-500/40 text-[10px] text-cyan-200">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* -------------------- EXPERIENCE DESTINATION -------------------- */}
        {destination === 'experience' && (
          <div className="space-y-6">
            <div className="border-b border-cyan-500/30 pb-3">
              <span className="text-xs text-pink-400 font-bold uppercase tracking-widest">// DESTINATION:</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white glow-text-cyan mt-1">
                CAREER TRAJECTORY
              </h2>
            </div>

            <div className="space-y-5">
              {EXPERIENCES.map((exp, idx) => (
                <div key={idx} className="p-4 sm:p-5 rounded-xl bg-black/40 border border-cyan-500/30 space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                    <div>
                      <h3 className="text-lg font-bold text-white">{exp.role}</h3>
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
                      <span key={t} className="px-2 py-0.5 rounded bg-purple-950/60 border border-purple-500/40 text-[10px] text-purple-200">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* -------------------- SKILLS DESTINATION -------------------- */}
        {destination === 'skills' && (
          <div className="space-y-6">
            <div className="border-b border-cyan-500/30 pb-3">
              <span className="text-xs text-pink-400 font-bold uppercase tracking-widest">// DESTINATION:</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white glow-text-cyan mt-1">
                TECHNICAL ARSENAL
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {SKILL_CATEGORIES.map((cat, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-black/40 border border-cyan-500/30 space-y-3">
                  <h3 className="text-sm font-bold text-pink-300 glow-text-pink border-b border-pink-500/20 pb-1.5">
                    {cat.title}
                  </h3>
                  <div className="flex flex-wrap gap-1.5">
                    {cat.skills.map((s) => (
                      <span key={s} className="px-2.5 py-1 rounded bg-cyan-950/40 border border-cyan-500/30 text-xs text-cyan-200">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* -------------------- ABOUT ME DESTINATION -------------------- */}
        {destination === 'about' && (
          <div className="space-y-6">
            <div className="border-b border-cyan-500/30 pb-3">
              <span className="text-xs text-pink-400 font-bold uppercase tracking-widest">// DESTINATION:</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white glow-text-cyan mt-1">
                ABOUT DARSHAN SP
              </h2>
            </div>

            <div className="p-5 rounded-xl bg-black/40 border border-cyan-500/30 space-y-4 text-xs sm:text-sm leading-relaxed text-gray-200">
              <p>
                Software Engineer with 1+ years of hands-on production experience designing, building, and deploying
                Python-based backend architectures, full-stack microservices, and AI/ML workflows.
              </p>
              <p>
                Specialized in hierarchical RAG systems (lexical BM25 + dense vector embeddings with RRF),
                high-throughput FastAPI microservices, and real-time computer vision inference (YOLOv8 + CSRNet) on NVIDIA CUDA GPU cloud infrastructure.
              </p>
              <div className="p-3.5 rounded-lg bg-cyan-950/40 border border-cyan-400/40 text-cyan-300">
                <span className="font-bold">Core Ethos:</span> Building real-world, scalable, latency-optimized systems that turn complex machine learning research into production software.
              </div>
            </div>
          </div>
        )}

        {/* -------------------- EDUCATION DESTINATION -------------------- */}
        {destination === 'education' && (
          <div className="space-y-6">
            <div className="border-b border-cyan-500/30 pb-3">
              <span className="text-xs text-pink-400 font-bold uppercase tracking-widest">// DESTINATION:</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white glow-text-cyan mt-1">
                ACADEMICS & CREDENTIALS
              </h2>
            </div>

            <div className="p-5 rounded-xl bg-black/40 border border-cyan-500/30 space-y-3">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-white">{PERSONAL_INFO.education.institution}</h3>
                  <div className="text-cyan-300 text-xs">{PERSONAL_INFO.education.degree}</div>
                  <div className="text-gray-400 text-xs">{PERSONAL_INFO.education.location} • {PERSONAL_INFO.education.duration}</div>
                </div>
                <div className="px-3 py-1 rounded bg-cyan-500/20 border border-cyan-400 text-cyan-300 font-bold text-sm">
                  CGPA: {PERSONAL_INFO.education.cgpa}
                </div>
              </div>
            </div>

            <div className="p-5 rounded-xl bg-black/40 border border-purple-500/30 space-y-3">
              <h4 className="text-xs text-purple-300 font-bold uppercase tracking-wider flex items-center gap-1.5">
                <Award className="w-4 h-4 text-purple-400" />
                Verified Industry Certifications
              </h4>
              <ul className="space-y-2 text-xs text-gray-300">
                {PERSONAL_INFO.certifications.map((cert, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                    <span>{cert}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* -------------------- CONTACT DESTINATION -------------------- */}
        {destination === 'contact' && (
          <div className="space-y-6">
            <div className="border-b border-cyan-500/30 pb-3">
              <span className="text-xs text-pink-400 font-bold uppercase tracking-widest">// DESTINATION:</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white glow-text-cyan mt-1">
                COMMUNICATION COORDINATES
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                className="p-4 rounded-xl bg-black/40 border border-cyan-500/30 hover:border-cyan-300 text-xs text-gray-200 hover:text-white flex items-center gap-3 transition-colors"
              >
                <Mail className="w-5 h-5 text-cyan-400" />
                <div>
                  <div className="text-[10px] text-gray-500 uppercase">Email</div>
                  <div>{PERSONAL_INFO.email}</div>
                </div>
              </a>

              <a
                href={`tel:${PERSONAL_INFO.phone}`}
                className="p-4 rounded-xl bg-black/40 border border-cyan-500/30 hover:border-cyan-300 text-xs text-gray-200 hover:text-white flex items-center gap-3 transition-colors"
              >
                <Phone className="w-5 h-5 text-cyan-400" />
                <div>
                  <div className="text-[10px] text-gray-500 uppercase">Phone</div>
                  <div>{PERSONAL_INFO.phone}</div>
                </div>
              </a>

              <div className="p-4 rounded-xl bg-black/40 border border-cyan-500/30 text-xs text-gray-200 flex items-center gap-3">
                <MapPin className="w-5 h-5 text-cyan-400" />
                <div>
                  <div className="text-[10px] text-gray-500 uppercase">Base Station</div>
                  <div>{PERSONAL_INFO.location}</div>
                </div>
              </div>

              <a
                href="https://github.com/Darshan-S-P"
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-xl bg-black/40 border border-cyan-500/30 hover:border-cyan-300 text-xs text-gray-200 hover:text-white flex items-center gap-3 transition-colors"
              >
                <Github className="w-5 h-5 text-cyan-400" />
                <div>
                  <div className="text-[10px] text-gray-500 uppercase">GitHub Profile</div>
                  <div>github.com/Darshan-S-P</div>
                </div>
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
