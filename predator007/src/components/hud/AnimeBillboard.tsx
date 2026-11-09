import React from 'react';
import { Sparkles, Headphones } from 'lucide-react';

export default function AnimeBillboard() {
  return (
    <div className="hidden lg:flex absolute bottom-28 left-6 z-20 pointer-events-auto select-none items-center gap-3 p-3 rounded-2xl cyber-glass-purple border border-pink-500/40 shadow-neon-pink max-w-[260px]">
      {/* Billboard Graphic Area with Cyber Anime Avatar Art */}
      <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-gradient-to-tr from-purple-950 via-pink-900 to-indigo-950 border border-pink-400/50 flex flex-col items-center justify-center shrink-0">
        <Headphones className="w-8 h-8 text-pink-300 animate-pulse" />
        {/* Glowing Kanji Text: エンジニア (Engineer) */}
        <span className="text-[11px] font-bold text-pink-300 tracking-wider glow-text-pink mt-1">
          エンジニア
        </span>
        <div className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
      </div>

      {/* Tech Tags Stack on Billboard */}
      <div className="space-y-1 font-mono text-[11px]">
        {['AI/ML', 'Backend', 'Data', 'Systems'].map((tag) => (
          <div
            key={tag}
            className="px-2 py-0.5 rounded bg-black/40 border border-pink-500/30 text-pink-200/90 hover:text-white hover:border-cyan-400 transition-colors cursor-default"
          >
            {tag}
          </div>
        ))}
      </div>
    </div>
  );
}
