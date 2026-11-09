import React from 'react';
import { PERSONAL_INFO } from '../../data/portfolioData';

export default function TopHeader() {
  return (
    <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20 text-center pointer-events-none select-none">
      {/* Glitch-Style Typography Title */}
      <h1 className="glitch-title text-4xl sm:text-5xl md:text-6xl font-black tracking-widest text-white drop-shadow-[0_0_25px_rgba(0,242,254,0.6)]">
        {PERSONAL_INFO.name}
      </h1>

      {/* Cyber Callsign Line */}
      <div className="flex items-center justify-center gap-2 mt-1">
        <span className="text-cyan-400 font-mono text-sm tracking-widest opacity-80">// -------- {'{'}</span>
        <span className="text-pink-400 font-mono text-sm font-bold tracking-widest glow-text-pink">
          {PERSONAL_INFO.callsign}
        </span>
      </div>

      {/* Role / Tech Focus Subtitle */}
      <div className="mt-2 text-xs sm:text-sm font-mono tracking-wider text-cyan-200/90 flex items-center justify-center gap-2.5">
        <span className="font-semibold text-white">{PERSONAL_INFO.title}</span>
        <span className="text-pink-400">|</span>
        {PERSONAL_INFO.subtitles.map((sub, idx) => (
          <React.Fragment key={sub}>
            <span className="text-cyan-300">{sub}</span>
            {idx < PERSONAL_INFO.subtitles.length - 1 && <span className="text-pink-400">|</span>}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
