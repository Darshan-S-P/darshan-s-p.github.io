"use client";

import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sphere, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

function AnimatedCore({ isThinking }: { isThinking: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      const speed = isThinking ? 3.5 : 1.2;
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.4 * speed;
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.6 * speed;
    }
  });

  return (
    <Sphere ref={meshRef} args={[1, 64, 64]} scale={isThinking ? 1.15 : 1.0}>
      <MeshDistortMaterial
        color={isThinking ? "#00f2fe" : "#9d4edd"}
        emissive={isThinking ? "#00f2fe" : "#7b2cbf"}
        emissiveIntensity={isThinking ? 1.6 : 0.8}
        roughness={0.15}
        metalness={0.9}
        distort={isThinking ? 0.65 : 0.35}
        speed={isThinking ? 4 : 1.5}
      />
    </Sphere>
  );
}

export default function PulsingOrb({ isThinking = false }: { isThinking?: boolean }) {
  return (
    <div className="w-14 h-14 relative flex items-center justify-center">
      <Canvas
        camera={{ position: [0, 0, 2.8] }}
        gl={{ alpha: true, antialias: true }}
        className="w-full h-full"
      >
        <ambientLight intensity={0.6} />
        <pointLight position={[5, 5, 5]} intensity={1.8} color="#00f2fe" />
        <pointLight position={[-5, -5, -2]} intensity={1.5} color="#9d4edd" />
        <AnimatedCore isThinking={isThinking} />
      </Canvas>
      {/* Outer glow ring */}
      <div
        className={`absolute inset-0 rounded-full blur-md transition-opacity duration-300 pointer-events-none ${
          isThinking ? "opacity-75 bg-cyan-400/40 animate-ping" : "opacity-30 bg-purple-500/30"
        }`}
      />
    </div>
  );
}
