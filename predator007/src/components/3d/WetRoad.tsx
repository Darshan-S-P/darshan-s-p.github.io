import React from 'react';
import * as THREE from 'three';

/**
 * Wet Asphalt Road with Neon Rain Reflections
 * High specular roughness map with glowing road edge stripes
 */
export default function WetRoad() {
  return (
    <group position={[0, -0.42, 0]}>
      {/* Main Wet Asphalt Surface */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[14, 28]} />
        <meshStandardMaterial
          color="#06080d"
          roughness={0.12}
          metalness={0.88}
        />
      </mesh>

      {/* Center Yellow Road Markings (Glowing Wet) */}
      {[-8, -4, 0, 4, 8].map((z, idx) => (
        <mesh key={idx} position={[0, 0.002, z]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[0.22, 1.8]} />
          <meshStandardMaterial
            color="#ffbb00"
            emissive="#ffbb00"
            emissiveIntensity={0.8}
            roughness={0.2}
          />
        </mesh>
      ))}

      {/* Left Cyan Edge Stripe */}
      <mesh position={[-4.5, 0.002, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[0.15, 28]} />
        <meshStandardMaterial
          color="#00f2fe"
          emissive="#00f2fe"
          emissiveIntensity={1.2}
          roughness={0.1}
        />
      </mesh>

      {/* Right Magenta Edge Stripe */}
      <mesh position={[4.5, 0.002, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[0.15, 28]} />
        <meshStandardMaterial
          color="#ff007f"
          emissive="#ff007f"
          emissiveIntensity={1.2}
          roughness={0.1}
        />
      </mesh>
    </group>
  );
}
