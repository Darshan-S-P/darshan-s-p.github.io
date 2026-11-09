import React, { useState, useEffect } from 'react';
import { carState, type DestinationGate } from '../3d/CarStore';
import { Sparkles, ArrowRight } from 'lucide-react';
import type { SectionId } from '../../types';

interface DestinationPromptProps {
  onOpenDestination: (id: SectionId) => void;
}

export default function DestinationPrompt({ onOpenDestination }: DestinationPromptProps) {
  const [nearby, setNearby] = useState<DestinationGate | null>(null);

  useEffect(() => {
    return carState.subscribe(() => {
      setNearby(carState.nearbyGate);
    });
  }, []);

  if (!nearby) return null;

  return (
    <div className="absolute bottom-24 left-1/2 -translate-x-1/2 z-30 pointer-events-auto animate-bounce select-none">
      <button
        onClick={() => onOpenDestination(nearby.id)}
        className="flex items-center gap-3 px-6 py-3 rounded-2xl cyber-glass-cyan border-2 border-cyan-400 shadow-[0_0_35px_rgba(0,242,254,0.7)] text-white font-mono hover:scale-105 active:scale-95 transition-all cursor-pointer backdrop-blur-xl"
      >
        <Sparkles className="w-5 h-5 text-cyan-400 animate-spin" />
        <div className="text-left">
          <div className="text-[10px] text-pink-400 font-bold uppercase tracking-widest">
            ARRIVED AT CHECKPOINT
          </div>
          <div className="text-base sm:text-lg font-extrabold tracking-wider glow-text-cyan">
            PRESS [E] OR CLICK TO OPEN {nearby.title}
          </div>
        </div>
        <ArrowRight className="w-5 h-5 text-cyan-400" />
      </button>
    </div>
  );
}
