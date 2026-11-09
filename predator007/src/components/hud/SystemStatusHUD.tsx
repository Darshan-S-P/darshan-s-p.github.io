import React from 'react';
import { PERSONAL_INFO } from '../../data/portfolioData';

export default function SystemStatusHUD() {
  return (
    <div className="absolute top-4 right-4 sm:right-6 z-20 pointer-events-auto select-none">
      <div className="cyber-glass-cyan rounded-xl p-3.5 sm:p-4 min-w-[240px] sm:min-w-[280px] font-mono text-xs border border-cyan-500/40 shadow-neon-cyan backdrop-blur-md">
        {/* Status Header with Pulsing Green Indicator */}
        <div className="flex items-center justify-between pb-2 mb-2 border-b border-cyan-500/30">
          <span className="font-bold tracking-widest text-cyan-300 flex items-center gap-2">
            SYSTEM STATUS
          </span>
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500 shadow-neon-green"></span>
          </span>
        </div>

        {/* Telemetry Metrics */}
        <div className="space-y-1.5 text-[11px] sm:text-xs">
          <div className="flex justify-between items-center">
            <span className="text-gray-400">Experience :</span>
            <span className="text-pink-400 font-bold glow-text-pink">{PERSONAL_INFO.experienceYears}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-400">Projects   :</span>
            <span className="text-emerald-400 font-bold glow-text-green">{PERSONAL_INFO.projectsCount}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-400">Skills     :</span>
            <span className="text-cyan-300 font-medium">Python, FastAPI, AI/ML</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-400">Location   :</span>
            <span className="text-cyan-300 font-medium">{PERSONAL_INFO.location}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
