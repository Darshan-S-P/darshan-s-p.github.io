import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import ChaseCamera from './ChaseCamera';
import CyberSportsCar from './CyberSportsCar';
import NeonHighway from './NeonHighway';
import CyberCity from './CyberCity';
import RainParticles from './RainParticles';

export default function CyberScene() {
  return (
    <div className="absolute inset-0 w-full h-full z-0 overflow-hidden pointer-events-none">
      {/* Deep Cyberpunk Space Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#040308] via-[#060814] to-[#030408] pointer-events-none" />

      {/* 3D WebGL Driving Simulation Canvas */}
      <Canvas
        camera={{ position: [0, 2.2, 15.4], fov: 58 }}
        gl={{
          antialias: true,
          powerPreference: 'high-performance',
        }}
        className="w-full h-full"
      >
        {/* 3rd-Person Dynamic Chase Camera Rig */}
        <ChaseCamera />

        {/* Cyberpunk Atmospheric Lighting */}
        <ambientLight intensity={0.65} color="#252b48" />
        <directionalLight position={[0, 25, 15]} intensity={1.2} color="#00f2fe" />
        <directionalLight position={[-15, 20, -60]} intensity={0.9} color="#ff007f" />
        
        {/* Highway Accent Spotlights */}
        <pointLight position={[-14, 12, -30]} intensity={4.0} color="#ff007f" distance={55} />
        <pointLight position={[14, 12, -90]} intensity={4.0} color="#00f2fe" distance={55} />
        <pointLight position={[-14, 12, -150]} intensity={4.0} color="#d946ef" distance={55} />
        <pointLight position={[14, 12, -210]} intensity={4.0} color="#00f2fe" distance={55} />
        <pointLight position={[-14, 12, -270]} intensity={4.0} color="#00ff88" distance={55} />

        {/* Tuned Volumetric Fog — maintains horizon visibility up to 400 units */}
        <fog attach="fog" args={['#050711', 25, 420]} />

        <Suspense fallback={null}>
          <CyberCity />
          <NeonHighway />
          <CyberSportsCar />
          <RainParticles />
        </Suspense>
      </Canvas>
    </div>
  );
}