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
import { carState } from './components/3d/CarStore';
import type { SectionId } from './types';

export default function App() {
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [activeDestination, setActiveDestination] = useState<SectionId | null>(null);

  // Global Keyboard Navigation & Wheel Scroll Driving
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't intercept driving keys if user is actively typing in the terminal input
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

    // Scroll Wheel Driving (Scroll down = forward down highway, Scroll up = reverse)
    const handleWheel = (e: WheelEvent) => {
      // DeltaY > 0 is scroll down: move car forward
      if (e.deltaY > 0) {
        carState.speed = Math.max(-32, carState.speed - 2.8);
      } else {
        carState.speed = Math.min(12, carState.speed + 2.8);
      }
      carState.targetGateZ = null;
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    window.addEventListener('wheel', handleWheel, { passive: true });

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      window.removeEventListener('wheel', handleWheel);
    };
  }, []);

  const handleSelectSection = (id: SectionId) => {
    carState.driveTo(id);
    setActiveDestination(id);
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-[#06070c] crt-overlay select-none">
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

      {/* Top Right: Live Telemetry */}
      <SystemStatusHUD />

      {/* Top Left: Linux Terminal Window */}
      <TerminalWindow
        isOpen={terminalOpen}
        onToggle={() => setTerminalOpen(!terminalOpen)}
        onSelectSection={handleSelectSection}
      />

      {/* Checkpoint Arrival Prompt (e.g. Press [E] to Inspect Projects) */}
      <DestinationPrompt onOpenDestination={(id) => setActiveDestination(id)} />

      {/* Lower Left: Holographic Anime DJ Billboard */}
      <AnimeBillboard />

      {/* Lower Left: Dynamic GPS Radar Minimap */}
      <RadarMinimap onQuickTravel={handleSelectSection} />

      {/* Lower Right: Digital Speedometer HUD */}
      <SpeedometerHUD />

      {/* Lower Right: On-Screen Touch/Mouse Drive Controls */}
      <OnScreenDriveControls />

      {/* Destination Content Detail Modal */}
      <DestinationModal
        destination={activeDestination}
        onClose={() => setActiveDestination(null)}
      />
    </div>
  );
}
