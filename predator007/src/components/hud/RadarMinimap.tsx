import React from 'react';
import { Navigation } from 'lucide-react';

export default function RadarMinimap() {
  return (
    <div className="absolute bottom-4 left-4 sm:left-6 z-20 pointer-events-auto select-none">
      <div className="cyber-glass-cyan rounded-xl p-2.5 sm:p-3 w-40 sm:w-48 border border-cyan-500/40 shadow-neon-cyan backdrop-blur-md">
        {/* Radar Screen Area */}
        <div className="relative w-full h-24 sm:h-28 rounded-lg bg-[#04090e]/90 border border-cyan-500/30 overflow-hidden flex items-center justify-center">
          {/* Radar Sweep Grid Lines */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(0,242,254,0.15)_0%,_transparent_70%)]" />
          <div className="absolute inset-x-0 top-1/2 h-[1px] bg-cyan-500/20" />
          <div className="absolute inset-y-0 left-1/2 w-[1px] bg-cyan-500/20" />

          {/* Curved Glowing Highway Vectors */}
          <svg className="absolute inset-0 w-full h-full text-cyan-400/50" viewBox="0 0 100 100">
            <path
              d="M 15 90 Q 40 60 50 45 T 85 15"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeDasharray="4 2"
              className="text-cyan-400"
            />
            {/* Waypoint Blips */}
            <circle cx="85" cy="15" r="3" fill="#00f2fe" className="animate-ping" />
            <circle cx="85" cy="15" r="2.5" fill="#00f2fe" />
            <circle cx="65" cy="30" r="2" fill="#ff007f" />
            <circle cx="50" cy="45" r="2" fill="#00ff88" />
            <circle cx="35" cy="65" r="2" fill="#d946ef" />
          </svg>

          {/* Car GPS Pointer Icon */}
          <div className="relative z-10 p-1.5 rounded-full bg-cyan-500/30 border border-cyan-300 shadow-[0_0_12px_#00f2fe]">
            <Navigation className="w-3.5 h-3.5 text-cyan-300 transform -rotate-45" />
          </div>
        </div>

        {/* Radar Label Footer */}
        <div className="flex items-center justify-between mt-1.5 font-mono text-[10px] text-cyan-300/80 px-1">
          <span className="font-bold tracking-wider">PORTFOLIO WORLD</span>
          <span className="text-gray-400">v1.0</span>
        </div>
      </div>
    </div>
  );
}
