import React from 'react';
import { 
  Code2, 
  Briefcase, 
  Settings, 
  User, 
  GraduationCap, 
  Send 
} from 'lucide-react';
import { NAVIGATION_NODES } from '../../data/portfolioData';
import type { SectionId } from '../../types';

interface NeonSignpostsProps {
  onSelectDestination: (id: SectionId) => void;
  activeDestination?: SectionId | null;
}

const iconMap: Record<string, React.ReactNode> = {
  Code2: <Code2 className="w-4 h-4 text-cyan-400" />,
  Briefcase: <Briefcase className="w-4 h-4 text-cyan-400" />,
  Settings: <Settings className="w-4 h-4 text-cyan-400 animate-spin-slow" />,
  User: <User className="w-4 h-4 text-cyan-400" />,
  GraduationCap: <GraduationCap className="w-4 h-4 text-cyan-400" />,
  Send: <Send className="w-4 h-4 text-cyan-400" />,
};

export default function NeonSignposts({ onSelectDestination, activeDestination }: NeonSignpostsProps) {
  return (
    <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
      {NAVIGATION_NODES.map((node) => {
        const isSelected = activeDestination === node.id;

        return (
          <div
            key={node.id}
            style={{
              top: `${node.topPercent}%`,
              left: `${node.leftPercent}%`,
            }}
            className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-auto"
          >
            <button
              onClick={() => onSelectDestination(node.id)}
              className={`group relative flex items-center gap-2 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-lg font-mono text-xs sm:text-sm tracking-wider uppercase transition-all duration-300 cursor-pointer select-none ${
                isSelected
                  ? 'bg-cyan-500/30 text-white border-2 border-cyan-400 shadow-[0_0_25px_rgba(0,242,254,0.8)] scale-110'
                  : 'bg-[#09151c]/80 text-cyan-300 hover:text-white border border-cyan-500/50 hover:border-cyan-300 shadow-[0_0_15px_rgba(0,242,254,0.35)] hover:shadow-[0_0_25px_rgba(0,242,254,0.6)] hover:scale-105'
              } backdrop-blur-md`}
            >
              {/* Corner Tech Brackets */}
              <span className="absolute -top-1 -left-1 w-1.5 h-1.5 border-t border-l border-cyan-300" />
              <span className="absolute -bottom-1 -right-1 w-1.5 h-1.5 border-b border-r border-cyan-300" />

              {/* Icon */}
              <span className="group-hover:scale-110 transition-transform">
                {iconMap[node.icon]}
              </span>

              {/* Label */}
              <span className="font-bold glow-text-cyan">
                {node.label}
              </span>
            </button>
          </div>
        );
      })}
    </div>
  );
}
