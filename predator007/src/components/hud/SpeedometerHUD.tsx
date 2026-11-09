import React from 'react';
import { Gauge } from 'lucide-react';

interface SpeedometerProps {
  speed?: number;
}

export default function SpeedometerHUD({ speed = 87 }: SpeedometerProps) {
  // Format speed to 3 digits (e.g. 087)
  const formattedSpeed = String(speed).padStart(3, '0');

  return (
    <div className="absolute bottom-4 right-4 sm:right-6 z-20 pointer-events-auto select-none flex flex-col items-end gap-2.5">
      {/* Digital Speedometer Gauge Box */}
      <div className="cyber-glass-cyan px-4 py-2.5 rounded-xl border border-cyan-500/40 shadow-neon-cyan backdrop-blur-md flex flex-col items-end">
        <div className="flex items-baseline gap-2 font-mono">
          <Gauge className="w-4 h-4 text-cyan-400 self-center animate-pulse" />
          <span className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white glow-text-cyan font-cyber">
            {formattedSpeed}
          </span>
          <span className="text-xs text-cyan-300/80 font-mono">km/h</span>
        </div>

        {/* Dynamic Tachometer Segment Bars */}
        <div className="flex gap-1 mt-1.5">
          {Array.from({ length: 8 }).map((_, idx) => (
            <div
              key={idx}
              className={`w-2.5 h-1.5 rounded-sm transform -skew-x-12 transition-all duration-300 ${
                idx < 6
                  ? 'bg-cyan-400 shadow-[0_0_8px_#00f2fe]'
                  : idx === 6
                  ? 'bg-pink-500 shadow-[0_0_8px_#ff007f]'
                  : 'bg-gray-800'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Control Prompts matching image */}
      <div className="flex items-center gap-3 font-mono text-[11px] text-gray-300 cyber-glass-cyan px-3 py-1.5 rounded-lg border border-cyan-500/30">
        <div className="flex items-center gap-1">
          <span className="px-1 py-0.5 rounded bg-cyan-950 border border-cyan-500/40 text-[10px] font-bold text-cyan-300">W</span>
          <span className="px-1 py-0.5 rounded bg-cyan-950 border border-cyan-500/40 text-[10px] font-bold text-cyan-300">A</span>
          <span className="px-1 py-0.5 rounded bg-cyan-950 border border-cyan-500/40 text-[10px] font-bold text-cyan-300">S</span>
          <span className="px-1 py-0.5 rounded bg-cyan-950 border border-cyan-500/40 text-[10px] font-bold text-cyan-300">D</span>
          <span className="ml-1 text-gray-400">Drive</span>
        </div>

        <div className="flex items-center gap-1">
          <span className="px-1.5 py-0.5 rounded bg-cyan-950 border border-cyan-500/40 text-[10px] font-bold text-cyan-300">E</span>
          <span className="text-gray-400">Enter</span>
        </div>

        <div className="flex items-center gap-1">
          <span className="px-1.5 py-0.5 rounded bg-cyan-950 border border-cyan-500/40 text-[10px] font-bold text-cyan-300">TAB</span>
          <span className="text-gray-400">Terminal</span>
        </div>
      </div>
    </div>
  );
}
