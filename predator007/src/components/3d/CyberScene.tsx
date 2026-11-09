import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import CameraController from './CameraController';
import SportsCar from './SportsCar';
import WetRoad from './WetRoad';
import RainParticles from './RainParticles';

interface CyberSceneProps {
  speed?: number;
}

export default function CyberScene({ speed = 0 }: CyberSceneProps) {
  return (
    <div className="absolute inset-0 w-full h-full z-0 overflow-hidden pointer-events-none">
      {/* 2D Background City Art Layer (High Res Neon Artwork) */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-700 scale-[1.02]"
        style={{
          backgroundImage: `url('/cyberpunk-city.jpg')`,
          filter: 'brightness(0.92) contrast(1.08)',
        }}
      />

      {/* Vignette & Color Grading Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#040508] via-transparent to-[#040508]/60 pointer-events-none" />
      <div className="absolute inset-0 bg-radial-gradient from-transparent via-[#05060a]/30 to-[#040508]/80 pointer-events-none" />

      {/* 3D WebGL Canvas Layer */}
      <Canvas
        camera={{ position: [0, 1.2, 6.2], fov: 50 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        className="w-full h-full"
      >
        <CameraController />

        {/* Ambient & Cyberpunk Neon Lighting */}
        <ambientLight intensity={0.65} color="#18152e" />
        <directionalLight position={[0, 8, 5]} intensity={1.2} color="#00f2fe" />
        <pointLight position={[-6, 4, 0]} intensity={3.5} color="#ff007f" distance={15} />
        <pointLight position={[6, 4, 0]} intensity={3.5} color="#00f2fe" distance={15} />
        <pointLight position={[0, 2, -5]} intensity={2.8} color="#d946ef" distance={12} />

        {/* Scene Fog */}
        <fog attach="fog" args={['#06080e', 5, 24]} />

        <Suspense fallback={null}>
          <WetRoad />
          <SportsCar speed={speed} />
          <RainParticles />
        </Suspense>
      </Canvas>
    </div>
  );
}
