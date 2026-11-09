import React, { useState, useEffect } from 'react';
import CyberScene from './components/3d/CyberScene';
import TopHeader from './components/hud/TopHeader';
import SystemStatusHUD from './components/hud/SystemStatusHUD';
import TerminalWindow from './components/hud/TerminalWindow';
import NeonSignposts from './components/hud/NeonSignposts';
import AnimeBillboard from './components/hud/AnimeBillboard';
import RadarMinimap from './components/hud/RadarMinimap';
import SpeedometerHUD from './components/hud/SpeedometerHUD';
import DestinationPrompt from './components/hud/DestinationPrompt';
import OnScreenDriveControls from './components/hud/OnScreenDriveControls';
import DestinationModal from './components/modals/DestinationModal';
import { carState, GATES } from './components/3d/CarStore';
import type { SectionId } from './types';

export default function App() {
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [activeDestination, setActiveDestination] = useState<SectionId | null>(null);

  // Hook auto-arrival callback from CarStore
  useEffect(() => {
    carState.onArrival = (gate) => {
      setActiveDestination(gate.id);
    };
    return () => {
      carState.onArrival = undefined;
    };
  }, []);

  // Global Keyboard Navigation & Butter-Smooth Scroll Wheel Driving
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const isInputActive = ['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName);

      if (e.key === 'Tab') {
        e.preventDefault();
        setTerminalOpen((prev) => !prev);
        return;
      }

      if (e.key === 'Escape') {
        setActiveDestination(null);
        return;
      }

      // 'E' Key: Interact / Open Destination
      if ((e.key === 'e' || e.key === 'E') && !isInputActive) {
        if (carState.nearbyGate) {
          setActiveDestination(carState.nearbyGate.id);
        }
        return;
      }

      if (isInputActive) return;

      // WASD / Arrow Keys for Driving
      const key = e.key.toLowerCase();
      if (key === 'w' || e.key === 'ArrowUp') {
        carState.keys.forward = true;
        carState.targetGateZ = null; // cancel autopilot on manual input
      } else if (key === 's' || e.key === 'ArrowDown') {
        carState.keys.backward = true;
        carState.targetGateZ = null;
      } else if (key === 'a' || e.key === 'ArrowLeft') {
        carState.keys.left = true;
      } else if (key === 'd' || e.key === 'ArrowRight') {
        carState.keys.right = true;
      } else if (e.code === 'Space') {
        carState.keys.brake = true;
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      if (key === 'w' || e.key === 'ArrowUp') carState.keys.forward = false;
      if (key === 's' || e.key === 'ArrowDown') carState.keys.backward = false;
      if (key === 'a' || e.key === 'ArrowLeft') carState.keys.left = false;
      if (key === 'd' || e.key === 'ArrowRight') carState.keys.right = false;
      if (e.code === 'Space') carState.keys.brake = false;
    };

    // Butter-Smooth Scroll Wheel Driving Accumulator
    const handleWheel = (e: WheelEvent) => {
      // Allow natural document scrolling inside modal dialog or terminal logs
      const target = e.target as HTMLElement;
      if (target?.closest('.overflow-y-auto')) {
        return;
      }

      e.preventDefault();

      // Delta > 0 (scroll down) = drive forward (-Z)
      // Delta < 0 (scroll up) = reverse (+Z)
      const normalizedDelta = Math.sign(e.deltaY) * Math.min(Math.abs(e.deltaY), 80);
      carState.scrollVelocity += normalizedDelta * 0.36;
      carState.targetGateZ = null;
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    window.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      window.removeEventListener('wheel', handleWheel);
    };
  }, []);

  const handleSelectSection = (id: SectionId) => {
    const gate = GATES.find((g) => g.id === id);
    if (gate && Math.abs(carState.position.z - gate.z) < 14) {
      // Already at the gate: open details immediately
      setActiveDestination(id);
    } else {
      // Drive to the gate smoothly, arrival callback will open details
      carState.driveTo(id);
    }
  };

  const handleBackgroundClick = () => {
    // Blur any active input so WASD controls are always ready
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
  };

  return (
    <div
      onClick={handleBackgroundClick}
      className="relative w-screen h-screen overflow-hidden bg-[#06070c] crt-overlay select-none"
    >
      {/* ================= 3D CYBERPUNK DRIVING WORLD ================= */}
      <CyberScene />

      {/* ================= 2D HUD OVERLAYS ================= */}
      {/* Top Header: Glitch Typography */}
      <TopHeader />

      {/* Top Destinations Dock */}
      <NeonSignposts
        onSelectDestination={handleSelectSection}
        activeDestination={activeDestination}
      />

      {/* Top Right: Live Telemetry & Integrated Car Color Customizer */}
      <SystemStatusHUD />

      {/* Top Left: Linux Terminal Window */}
      <TerminalWindow
        isOpen={terminalOpen}
        onToggle={() => setTerminalOpen(!terminalOpen)}
        onSelectSection={handleSelectSection}
      />

      {/* Checkpoint Arrival Prompt (e.g. Press [E] or Click to Inspect Projects) */}
      <DestinationPrompt onOpenDestination={(id) => setActiveDestination(id)} />

      {/* Lower Left: Holographic Anime DJ Billboard */}
      <AnimeBillboard />

      {/* Lower Left: Dynamic GPS Radar Minimap */}
      <RadarMinimap onQuickTravel={handleSelectSection} />

      {/* Lower Right: Digital Speedometer HUD */}
      <SpeedometerHUD />

      {/* Lower Right: On-Screen Touch/Mouse Drive Controls */}
      <OnScreenDriveControls />

      {/* Bottom Center: Navigation Controls Hint Bar */}
      <div className="hidden md:flex absolute bottom-3 left-1/2 -translate-x-1/2 z-10 pointer-events-none items-center gap-3 px-4 py-1.5 rounded-full bg-black/60 border border-cyan-500/30 backdrop-blur-md text-[11px] font-mono text-cyan-200/80">
        <span className="text-pink-400 font-bold">[W][A][S][D] / Arrows</span>
        <span>or</span>
        <span className="text-cyan-400 font-bold">Scroll Wheel</span>
        <span>to Drive</span>
        <span className="text-gray-500">•</span>
        <span className="text-pink-400 font-bold">[E]</span>
        <span>to Inspect Checkpoint</span>
        <span className="text-gray-500">•</span>
        <span className="text-purple-400 font-bold">[TAB]</span>
        <span>Linux Terminal</span>
      </div>

      {/* Destination Content Detail Modal */}
      <DestinationModal
        destination={activeDestination}
        onClose={() => setActiveDestination(null)}
      />
    </div>
  );
}