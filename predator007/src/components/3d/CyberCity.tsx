import React, { useMemo } from 'react';
import * as THREE from 'three';

/**
 * 3D Cyberpunk City Skyline
 * Towering skyscrapers with glowing neon window strips, rooftop antennas, and neon horizon moon
 */
export default function CyberCity() {
  // Generate random building positions along the left and right sides of highway
  const buildings = useMemo(() => {
    const list = [];
    const countPerSide = 32;

    for (let i = 0; i < countPerSide; i++) {
      const z = 20 - i * 12;
      const width = 6 + Math.random() * 8;
      const depth = 8 + Math.random() * 10;
      const height = 18 + Math.random() * 38;

      // Left side buildings
      list.push({
        x: -12 - Math.random() * 10 - width / 2,
        y: height / 2 - 0.5,
        z,
        width,
        height,
        depth,
        color: i % 3 === 0 ? '#ff007f' : i % 3 === 1 ? '#00f2fe' : '#8b5cf6',
      });

      // Right side buildings
      list.push({
        x: 12 + Math.random() * 10 + width / 2,
        y: height / 2 - 0.5,
        z,
        width,
        height,
        depth,
        color: i % 3 === 0 ? '#00f2fe' : i % 3 === 1 ? '#d946ef' : '#ff007f',
      });
    }
    return list;
  }, []);

  return (
    <group>
      {/* ================= MASSIVE SYNTHWAVE HORIZON MOON ================= */}
      <group position={[0, 48, -420]}>
        <mesh>
          <circleGeometry args={[42, 64]} />
          <meshBasicMaterial color="#ff007f" />
        </mesh>
        {/* Glow halo */}
        <mesh position={[0, 0, -1]}>
          <circleGeometry args={[52, 64]} />
          <meshBasicMaterial color="#d946ef" transparent opacity={0.3} />
        </mesh>
      </group>

      {/* ================= CYBERPUNK SKYSCRAPERS ================= */}
      {buildings.map((b, idx) => (
        <group key={idx} position={[b.x, b.y, b.z]}>
          {/* Main Tower Mass */}
          <mesh>
            <boxGeometry args={[b.width, b.height, b.depth]} />
            <meshStandardMaterial
              color="#07080f"
              roughness={0.4}
              metalness={0.8}
            />
          </mesh>

          {/* Vertical Neon Edge Light Strip */}
          <mesh position={[b.x > 0 ? -b.width / 2 + 0.1 : b.width / 2 - 0.1, 0, b.depth / 2 + 0.05]}>
            <boxGeometry args={[0.15, b.height, 0.1]} />
            <meshStandardMaterial
              color={b.color}
              emissive={b.color}
              emissiveIntensity={2.5}
            />
          </mesh>

          {/* Rooftop Antenna Spire */}
          <mesh position={[0, b.height / 2 + 3, 0]}>
            <cylinderGeometry args={[0.08, 0.2, 6, 8]} />
            <meshStandardMaterial color="#1a1c29" metalness={0.9} />
          </mesh>
          {/* Blinking Warning Beacon */}
          <mesh position={[0, b.height / 2 + 6.1, 0]}>
            <sphereGeometry args={[0.2, 8, 8]} />
            <meshStandardMaterial color="#ff0033" emissive="#ff0033" emissiveIntensity={3} />
          </mesh>
        </group>
      ))}

      {/* City Fog Ground Plane */}
      <mesh position={[0, -0.6, -180]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[300, 500]} />
        <meshStandardMaterial color="#04050a" roughness={0.9} />
      </mesh>
    </group>
  );
}
