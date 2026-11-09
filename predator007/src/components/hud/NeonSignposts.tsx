import React, { useState, useEffect } from 'react';
import { 
  Code2, 
  Briefcase, 
  Settings, 
  User, 
  GraduationCap, 
  Send 
} from 'lucide-react';
import { GATES, carState } from '../3d/CarStore';
import type { SectionId } from '../../types';

interface NeonSignpostsProps {
  onSelectDestination: (id: SectionId) => void;
  activeDestination?: SectionId | null;
}

const iconMap: Record<string, React.ReactNode> = {
  Code2: <Code2 className="w-3.5 h-3.5" />,
  Briefcase: <Briefcase className="w-3.5 h-3.5" />,
  Settings: <Settings className="w-3.5 h-3.5" />,
  User: <User className="w-3.5 h-3.5" />,
  GraduationCap: <GraduationCap className="w-3.5 h-3.5" />,
  Send: <Send className="w-3.5 h-3.5" />,
};

export default function NeonSignposts({ onSelectDestination, activeDestination }: NeonSignpostsProps) {
  const [nearbyId, setNearbyId] = useState<string | null>(null);

  useEffect(() => {
    return carState.subscribe(() => {
      setNearbyId(carState.nearbyGate?.id || null);
    });
  }, []);

  const handleDriveTo = (id: SectionId) => {
    carState.driveTo(id);
    onSelectDestination(id);
  };

  return (
    <div className="absolute top-20 sm:top-24 left-1/2 -translate-x-1/2 z-20 pointer-events-auto select-none max-w-full px-2">
      <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2.5 p-1.5 sm:p-2 rounded-2xl cyber-glass-cyan border border-cyan-500/40 shadow-neon-cyan backdrop-blur-md">
        <span className="hidden md:inline font-mono text-[10px] text-cyan-400 font-bold uppercase tracking-wider px-2">
          DESTINATIONS:
        </span>
        {GATES.map((gate) => {
          const isAtGate = nearbyId === gate.id;
          const isSelected = activeDestination === gate.id;

          return (
            <button
              key={gate.id}
              onClick={() => handleDriveTo(gate.id)}
              className={`flex items-center gap-1.5 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-xl font-mono text-[10px] sm:text-xs font-bold tracking-wider uppercase transition-all duration-300 cursor-pointer ${
                isAtGate || isSelected
                  ? 'bg-cyan-500 text-black border-cyan-300 shadow-[0_0_15px_#00f2fe] scale-105'
                  : 'bg-black/50 text-cyan-300 hover:text-white hover:bg-cyan-950/60 border border-cyan-500/40 hover:border-cyan-300'
              }`}
            >
              <span>{iconMap[gate.icon]}</span>
              <span>{gate.title}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
