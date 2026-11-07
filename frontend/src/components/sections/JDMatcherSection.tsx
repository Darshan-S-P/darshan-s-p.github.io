"use client";

import React, { useState } from "react";
import { matchJD, JDMatchResult } from "@/lib/api";
import { Sparkles, CheckCircle2, AlertCircle, RefreshCw, ArrowRight, FileSearch } from "lucide-react";

const SAMPLE_JDS = [
  {
    title: "AI/ML Backend Engineer",
    text: "We are seeking a Python Backend & AI Engineer with expertise in FastAPI, PostgreSQL, and PyTorch. Experience with RAG pipelines, vector databases (ChromaDB), Docker containerization, and AWS is required. You will build high-throughput microservices for LLM inference.",
  },
  {
    title: "GenAI & RAG Specialist",
    text: "Looking for an engineer experienced in hybrid retrieval (BM25 + dense search), LangChain, LangGraph, prompt engineering, structured LLM outputs, and document chunking for complex hierarchical legal/domain datasets.",
  },
  {
    title: "Computer Vision & Edge Developer",
    text: "Required: Python, YOLOv8 object detection, OpenCV, PyTorch, NVIDIA CUDA GPU acceleration, RTSP stream ingestion, and REST API deployment on Azure Virtual Machines.",
  },
];

export default function JDMatcherSection() {
  const [jdText, setJdText] = useState(SAMPLE_JDS[0].text);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<JDMatchResult | null>(null);

  const handleMatch = async () => {
    if (!jdText.trim()) return;
    setIsLoading(true);
    try {
      const res = await matchJD(jdText);
      setResult(res);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="matcher" className="py-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto relative">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-950/30 text-xs font-mono text-cyan-400 mb-4">
          <FileSearch className="w-3.5 h-3.5" />
          <span>NLP RECRUITER SUITE</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
          Job Description Alignment Matcher
        </h2>
        <p className="text-sm sm:text-base text-gray-400">
          Paste your open Job Description below. Our spaCy entity parser and TF-IDF matcher will compute Darshan&apos;s candidate match score, verified skills overlap, and hiring rationale.
        </p>

        {/* Preset Sample JDs */}
        <div className="flex flex-wrap justify-center gap-2 mt-6">
          <span className="text-xs font-mono text-gray-500 py-1 mr-1">Load Preset:</span>
          {SAMPLE_JDS.map((preset) => (
            <button
              key={preset.title}
              onClick={() => {
                setJdText(preset.text);
                setResult(null);
              }}
              className="px-3 py-1 text-xs font-mono rounded-lg bg-white/[0.04] text-gray-300 hover:text-cyan-300 hover:bg-cyan-950/40 border border-white/5 transition-all cursor-pointer"
            >
              {preset.title}
            </button>
          ))}
        </div>
      </div>

      <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-white/10 bg-[#0d0f18]/90">
        <div className="mb-4">
          <label className="block text-xs font-mono text-gray-400 uppercase tracking-wider mb-2">
            Job Description / Requirements Text
          </label>
          <textarea
            rows={5}
            value={jdText}
            onChange={(e) => setJdText(e.target.value)}
            placeholder="Paste technical requirements or Job Description here..."
            className="w-full rounded-2xl bg-black/40 border border-white/10 p-4 text-xs sm:text-sm text-gray-200 placeholder-gray-600 focus:outline-none focus:border-cyan-500/50 transition-colors font-mono resize-none"
          />
        </div>

        <div className="flex justify-end">
          <button
            onClick={handleMatch}
            disabled={isLoading || !jdText.trim()}
            className="px-6 py-3 rounded-xl font-medium text-xs sm:text-sm text-black bg-gradient-to-r from-neonCyan to-neonBlue hover:opacity-95 shadow-glow-cyan transition-all flex items-center gap-2 disabled:opacity-50 cursor-pointer"
          >
            {isLoading ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Running spaCy Parser & Scorer...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Analyze Alignment Score</span>
              </>
            )}
          </button>
        </div>

        {/* Results Area */}
        {result && (
          <div className="mt-8 pt-8 border-t border-white/10 transition-all duration-500 animate-fadeIn">
            {/* Score & Verdict Banner */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6 p-6 rounded-2xl bg-cyan-950/20 border border-cyan-500/30 mb-6">
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 rounded-full border-4 border-cyan-400 flex items-center justify-center font-mono font-extrabold text-2xl text-cyan-300 shadow-[0_0_20px_rgba(0,242,254,0.3)]">
                  {result.score}%
                </div>
                <div>
                  <div className="text-xs font-mono text-cyan-400 uppercase tracking-wider">
                    Calculated Alignment Level
                  </div>
                  <div className="text-xl sm:text-2xl font-bold text-white">
                    {result.match_level}
                  </div>
                </div>
              </div>

              <div className="text-xs sm:text-sm text-gray-300 max-w-md leading-relaxed">
                {result.reasoning}
              </div>
            </div>

            {/* Matched vs Missing Skills */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Matched Skills */}
              <div className="p-5 rounded-2xl bg-black/40 border border-emerald-500/20">
                <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 uppercase tracking-wider mb-3">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Matched Core Competencies ({result.matched_skills.length})</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {result.matched_skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-2.5 py-1 text-xs rounded-lg bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 font-mono"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Missing or Out of Scope Skills */}
              <div className="p-5 rounded-2xl bg-black/40 border border-amber-500/20">
                <div className="flex items-center gap-2 text-xs font-mono text-amber-400 uppercase tracking-wider mb-3">
                  <AlertCircle className="w-4 h-4" />
                  <span>Adjacent or Unmatched Criteria ({result.missing_skills.length})</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {result.missing_skills.length > 0 ? (
                    result.missing_skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-2.5 py-1 text-xs rounded-lg bg-amber-500/10 text-amber-300 border border-amber-500/30 font-mono"
                      >
                        {skill}
                      </span>
                    ))
                  ) : (
                    <span className="text-xs text-gray-500 italic">
                      Zero gaps detected! Complete direct stack match.
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
