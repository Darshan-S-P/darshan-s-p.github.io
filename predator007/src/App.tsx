import React, { useState, useEffect } from 'react';
import CyberScene from './components/3d/CyberScene';
import TopHeader from './components/hud/TopHeader';
import SystemStatusHUD from './components/hud/SystemStatusHUD';
import TerminalWindow from './components/hud/TerminalWindow';
import NeonSignposts from './components/hud/NeonSignposts';
import AnimeBillboard from './components/hud/AnimeBillboard';
import RadarMinimap from './components/hud/RadarMinimap';
import SpeedometerHUD from './components/hud/SpeedometerHUD';
import DestinationModal from './components/modals/DestinationModal';
import type { SectionId } from './types';

export default function App() {
  const [terminalOpen, setTerminalOpen] = useState(true);
  const [activeDestination, setActiveDestination] = useState<SectionId | null>(null);
  const [speed, setSpeed] = useState(87);

  // Global Keyboard Navigation (TAB to toggle terminal, ESC to close modal, WASD driving simulation)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // TAB: Toggle Linux Terminal
      if (e.key === 'Tab') {
        e.preventDefault();
        setTerminalOpen((prev) => !prev);
      }
      // ESC: Close Modal
      if (e.key === 'Escape') {
        setActiveDestination(null);
      }
      // W key: Accelerate simulation
      if (e.key.toLowerCase() === 'w') {
        setSpeed((prev) => Math.min(185, prev + 6));
      }
      // S key: Decelerate simulation
      if (e.key.toLowerCase() === 's') {
        setSpeed((prev) => Math.max(0, prev - 8));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-[#06070c] crt-overlay">
      {/* ================= SEPARATE 3D SCENE & CANVAS ================= */}
      <CyberScene speed={speed} />

      {/* ================= 2D CYBERPUNK HUD OVERLAYS ================= */}
      {/* Top Center: Glitch Typography & Callsign */}
      <TopHeader />

      {/* Top Right: System Status Telemetry */}
      <SystemStatusHUD />

      {/* Top Left: Linux Terminal Window */}
      <TerminalWindow
        isOpen={terminalOpen}
        onToggle={() => setTerminalOpen(!terminalOpen)}
        onSelectSection={(sec) => setActiveDestination(sec)}
      />

      {/* Center: Floating Neon Signposts Along Highway */}
      <NeonSignposts
        onSelectDestination={(id) => setActiveDestination(id)}
        activeDestination={activeDestination}
      />

      {/* Lower Left: Anime DJ Girl Billboard */}
      <AnimeBillboard />

      {/* Lower Left: GPS Radar Minimap */}
      <RadarMinimap />

      {/* Lower Right: Digital Speedometer & Control Hints */}
      <SpeedometerHUD speed={speed} />

      {/* ================= DESTINATION DETAIL MODAL ================= */}
      <DestinationModal
        destination={activeDestination}
        onClose={() => setActiveDestination(null)}
      />
    </div>
  );
}
