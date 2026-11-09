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
      <div className="absolute inset-0 bg-gradient-to-b from-[#05040a] via-[#070914] to-[#040508] pointer-events-none" />

      {/* 3D WebGL Driving Simulation Canvas */}
      <Canvas
        camera={{ position: [0, 2.4, 18], fov: 58 }}
        gl={{
          antialias: true,
          powerPreference: 'high-performance',
        }}
        className="w-full h-full"
      >
        {/* 3rd-Person Dynamic Chase Camera */}
        <ChaseCamera />

        {/* Cyberpunk Lighting */}
        <ambientLight intensity={0.4} color="#1c1838" />
        <directionalLight position={[0, 20, 10]} intensity={0.8} color="#00f2fe" />
        <pointLight position={[-15, 10, -50]} intensity={3.0} color="#ff007f" distance={45} />
        <pointLight position={[15, 10, -100]} intensity={3.0} color="#00f2fe" distance={45} />
        <pointLight position={[-15, 10, -150]} intensity={3.0} color="#d946ef" distance={45} />
        <pointLight position={[15, 10, -220]} intensity={3.0} color="#00f2fe" distance={45} />

        {/* Volumetric Fog */}
        <fog attach="fog" args={['#060810', 12, 160]} />

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
