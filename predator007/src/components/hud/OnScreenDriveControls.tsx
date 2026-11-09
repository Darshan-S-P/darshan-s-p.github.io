import React, { useState, useEffect } from 'react';
import { ArrowUp, ArrowDown, ArrowLeft, ArrowRight, Disc } from 'lucide-react';
import { carState } from '../3d/CarStore';

export default function OnScreenDriveControls() {
  const [keys, setKeys] = useState({ forward: false, backward: false, left: false, right: false, brake: false });

  useEffect(() => {
    return carState.subscribe(() => {
      setKeys({ ...carState.keys });
    });
  }, []);

  const handlePress = (key: 'forward' | 'backward' | 'left' | 'right' | 'brake', isDown: boolean) => {
    carState.keys[key] = isDown;
    carState.notify();
  };

  return (
    <div className="hidden sm:flex absolute bottom-24 right-4 sm:right-6 z-20 pointer-events-auto select-none items-center gap-2">
      {/* Steering controls */}
      <div className="flex gap-1.5">
        <button
          onMouseDown={() => handlePress('left', true)}
          onMouseUp={() => handlePress('left', false)}
          onTouchStart={() => handlePress('left', true)}
          onTouchEnd={() => handlePress('left', false)}
          className={`p-2.5 rounded-xl border font-mono transition-all cursor-pointer ${
            keys.left
              ? 'bg-cyan-500 text-black border-cyan-300 shadow-neon-cyan scale-95'
              : 'cyber-glass-cyan text-cyan-300 border-cyan-500/40 hover:border-cyan-300'
          }`}
          title="Steer Left (A)"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>

        <button
          onMouseDown={() => handlePress('right', true)}
          onMouseUp={() => handlePress('right', false)}
          onTouchStart={() => handlePress('right', true)}
          onTouchEnd={() => handlePress('right', false)}
          className={`p-2.5 rounded-xl border font-mono transition-all cursor-pointer ${
            keys.right
              ? 'bg-cyan-500 text-black border-cyan-300 shadow-neon-cyan scale-95'
              : 'cyber-glass-cyan text-cyan-300 border-cyan-500/40 hover:border-cyan-300'
          }`}
          title="Steer Right (D)"
        >
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Throttle & Reverse */}
      <div className="flex flex-col gap-1.5">
        <button
          onMouseDown={() => handlePress('forward', true)}
          onMouseUp={() => handlePress('forward', false)}
          onTouchStart={() => handlePress('forward', true)}
          onTouchEnd={() => handlePress('forward', false)}
          className={`p-2.5 rounded-xl border font-mono transition-all cursor-pointer ${
            keys.forward
              ? 'bg-cyan-500 text-black border-cyan-300 shadow-neon-cyan scale-95'
              : 'cyber-glass-cyan text-cyan-300 border-cyan-500/40 hover:border-cyan-300'
          }`}
          title="Drive Forward (W)"
        >
          <ArrowUp className="w-4 h-4" />
        </button>

        <button
          onMouseDown={() => handlePress('backward', true)}
          onMouseUp={() => handlePress('backward', false)}
          onTouchStart={() => handlePress('backward', true)}
          onTouchEnd={() => handlePress('backward', false)}
          className={`p-2.5 rounded-xl border font-mono transition-all cursor-pointer ${
            keys.backward
              ? 'bg-red-500 text-white border-red-300 shadow-[0_0_15px_#ff0033] scale-95'
              : 'cyber-glass-cyan text-red-400 border-red-500/40 hover:border-red-300'
          }`}
          title="Brake / Reverse (S)"
        >
          <ArrowDown className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
