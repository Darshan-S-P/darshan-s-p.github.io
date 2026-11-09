import React, { useState, useEffect } from 'react';
import { Gauge } from 'lucide-react';
import { carState } from '../3d/CarStore';

export default function SpeedometerHUD() {
  const [speed, setSpeed] = useState(0);
  const [isBraking, setIsBraking] = useState(false);

  useEffect(() => {
    return carState.subscribe(() => {
      setSpeed(carState.displaySpeed);
      setIsBraking(carState.isBraking);
    });
  }, []);

  const formattedSpeed = String(speed).padStart(3, '0');
  const activeBars = Math.min(8, Math.ceil((speed / 140) * 8));

  return (
    <div className="absolute bottom-4 right-4 sm:right-6 z-20 pointer-events-auto select-none flex flex-col items-end gap-2">
      {/* Digital Speedometer Gauge Box */}
      <div className={`cyber-glass-cyan px-4 py-2.5 rounded-xl border transition-all duration-200 backdrop-blur-md flex flex-col items-end ${
        isBraking ? 'border-red-500/80 shadow-[0_0_20px_rgba(255,0,51,0.5)]' : 'border-cyan-500/40 shadow-neon-cyan'
      }`}>
        <div className="flex items-baseline gap-2 font-mono">
          <Gauge className={`w-4 h-4 self-center ${isBraking ? 'text-red-400' : 'text-cyan-400 animate-pulse'}`} />
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
              className={`w-2.5 h-1.5 rounded-sm transform -skew-x-12 transition-all duration-150 ${
                idx < activeBars
                  ? idx < 6
                    ? 'bg-cyan-400 shadow-[0_0_8px_#00f2fe]'
                    : 'bg-pink-500 shadow-[0_0_8px_#ff007f]'
                  : 'bg-gray-800/80'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Control Prompts */}
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
