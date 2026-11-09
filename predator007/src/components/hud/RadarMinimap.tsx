import React, { useState, useEffect } from 'react';
import { Navigation } from 'lucide-react';
import { carState, GATES } from '../3d/CarStore';
import type { SectionId } from '../../types';

interface RadarProps {
  onQuickTravel?: (id: SectionId) => void;
}

export default function RadarMinimap({ onQuickTravel }: RadarProps) {
  const [carZ, setCarZ] = useState(10);
  const [carX, setCarX] = useState(0);

  useEffect(() => {
    return carState.subscribe(() => {
      setCarZ(carState.position.z);
      setCarX(carState.position.x);
    });
  }, []);

  // Map real Z coordinate (-340 to +20) to SVG path percent (0 to 100)
  const zProgress = Math.min(100, Math.max(0, ((20 - carZ) / 360) * 100));
  // Interpolate along the curve: start at bottom-left (15, 90), end at top-right (85, 12)
  const blipX = 15 + (zProgress / 100) * 70 + (carX / 5) * 5;
  const blipY = 90 - (zProgress / 100) * 78;

  return (
    <div className="absolute bottom-4 left-4 sm:left-6 z-20 pointer-events-auto select-none">
      <div className="cyber-glass-cyan rounded-xl p-2.5 sm:p-3 w-40 sm:w-48 border border-cyan-500/40 shadow-neon-cyan backdrop-blur-md">
        {/* Radar Screen Area */}
        <div className="relative w-full h-24 sm:h-28 rounded-lg bg-[#04090e]/95 border border-cyan-500/30 overflow-hidden flex items-center justify-center">
          {/* Radar Sweep Grid Lines */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(0,242,254,0.18)_0%,_transparent_70%)]" />
          <div className="absolute inset-x-0 top-1/2 h-[1px] bg-cyan-500/20" />
          <div className="absolute inset-y-0 left-1/2 w-[1px] bg-cyan-500/20" />

          {/* Curved Highway Map Vector */}
          <svg className="absolute inset-0 w-full h-full text-cyan-400/40" viewBox="0 0 100 100">
            <path
              d="M 15 90 Q 40 60 50 45 T 85 12"
              fill="none"
              stroke="currentColor"
              strokeWidth="3.5"
              strokeDasharray="4 2"
              className="text-cyan-500/60"
            />

            {/* Checkpoint Destination Nodes along the curve */}
            {GATES.map((gate, i) => {
              const gateProgress = ((20 - gate.z) / 360);
              const gx = 15 + gateProgress * 70;
              const gy = 90 - gateProgress * 78;
              return (
                <g key={gate.id} className="cursor-pointer" onClick={() => onQuickTravel && onQuickTravel(gate.id)}>
                  <circle cx={gx} cy={gy} r="3" fill={gate.color} opacity="0.8" />
                  <circle cx={gx} cy={gy} r="1.5" fill="#ffffff" />
                </g>
              );
            })}

            {/* Dynamic Car Pointer on Radar */}
            <circle cx={blipX} cy={blipY} r="5" fill="#00f2fe" opacity="0.4" className="animate-ping" />
            <circle cx={blipX} cy={blipY} r="3" fill="#00f2fe" />
          </svg>

          {/* Car GPS Icon Indicator */}
          <div
            style={{
              position: 'absolute',
              left: `${blipX}%`,
              top: `${blipY}%`,
              transform: 'translate(-50%, -50%)',
            }}
            className="pointer-events-none transition-all duration-75"
          >
            <Navigation className="w-3.5 h-3.5 text-white filter drop-shadow-[0_0_6px_#00f2fe] transform -rotate-45" />
          </div>
        </div>

        {/* Radar Label Footer */}
        <div className="flex items-center justify-between mt-1.5 font-mono text-[10px] text-cyan-300/80 px-1">
          <span className="font-bold tracking-wider">PORTFOLIO WORLD</span>
          <span className="text-gray-400">GPS LIVE</span>
        </div>
      </div>
    </div>
  );
}
