import React, { useState, useEffect } from 'react';
import { Palette } from 'lucide-react';
import { PERSONAL_INFO } from '../../data/portfolioData';
import { carState, CAR_COLORS, type CarColor } from '../3d/CarStore';

export default function SystemStatusHUD() {
  const [selectedColor, setSelectedColor] = useState<CarColor>(carState.carColor);

  useEffect(() => {
    return carState.subscribe(() => {
      setSelectedColor(carState.carColor);
    });
  }, []);

  const handleSelectColor = (colorKey: CarColor) => {
    carState.setColor(colorKey);
  };

  const colors: CarColor[] = ['white', 'cyan', 'gold', 'purple', 'red'];

  return (
    <div className="absolute top-4 right-4 sm:right-6 z-20 pointer-events-auto select-none">
      <div className="cyber-glass-cyan rounded-xl p-3 sm:p-3.5 min-w-[240px] sm:min-w-[270px] font-mono text-xs border border-cyan-500/40 shadow-neon-cyan backdrop-blur-md">
        {/* Status Header with Pulsing Green Indicator */}
        <div className="flex items-center justify-between pb-2 mb-2 border-b border-cyan-500/30">
          <span className="font-bold tracking-widest text-cyan-300 flex items-center gap-2 text-[11px] sm:text-xs">
            SYSTEM STATUS
          </span>
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500 shadow-neon-green"></span>
          </span>
        </div>

        {/* Telemetry Metrics */}
        <div className="space-y-1.5 text-[11px]">
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

        {/* Integrated Car Paint Customizer (Clean, no overlap) */}
        <div className="pt-2 mt-2 border-t border-cyan-500/30 flex items-center justify-between">
          <span className="text-gray-400 flex items-center gap-1.5 text-[10px] font-semibold">
            <Palette className="w-3 h-3 text-pink-400" />
            PAINT:
          </span>
          <div className="flex items-center gap-1.5">
            {colors.map((colorKey) => {
              const cfg = CAR_COLORS[colorKey];
              const isSelected = selectedColor === colorKey;

              return (
                <button
                  key={colorKey}
                  onClick={() => handleSelectColor(colorKey)}
                  title={cfg.name}
                  className={`relative w-4 h-4 sm:w-4.5 sm:h-4.5 rounded transition-all cursor-pointer border flex items-center justify-center ${
                    isSelected
                      ? 'scale-125 border-white shadow-[0_0_8px_rgba(255,255,255,0.9)] ring-1 ring-cyan-400'
                      : 'border-gray-600 hover:scale-110 opacity-75 hover:opacity-100'
                  }`}
                  style={{ backgroundColor: cfg.hex }}
                >
                  {isSelected && (
                    <span className="w-1 h-1 rounded-full bg-black shadow-sm" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}