import React, { useMemo } from 'react';
import * as THREE from 'three';
import { GATES } from './CarStore';

export default function NeonHighway() {
  const HIGHWAY_LENGTH = 420;
  const HIGHWAY_START = 30;
  const HIGHWAY_END = -390;
  const ROAD_WIDTH = 10.5;

  // Generate lane dash positions
  const laneDashes = useMemo(() => {
    const dashes = [];
    for (let z = HIGHWAY_START; z > HIGHWAY_END; z -= 6) {
      dashes.push(z);
    }
    return dashes;
  }, [HIGHWAY_START, HIGHWAY_END]);

  return (
    <group position={[0, -0.01, 0]}>
      {/* ================= ASPHALT HIGHWAY SURFACE ================= */}
      <mesh position={[0, 0, (HIGHWAY_START + HIGHWAY_END) / 2]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[ROAD_WIDTH, HIGHWAY_LENGTH]} />
        <meshStandardMaterial
          color="#080a10"
          roughness={0.18}
          metalness={0.85}
        />
      </mesh>

      {/* ================= CENTER DASHED LANE LINES (Yellow/Cyan Glowing) ================= */}
      {laneDashes.map((z, idx) => (
        <mesh key={idx} position={[0, 0.015, z]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[0.25, 2.5]} />
          <meshStandardMaterial
            color="#00f2fe"
            emissive="#00f2fe"
            emissiveIntensity={1.4}
            roughness={0.2}
          />
        </mesh>
      ))}

      {/* ================= LEFT GUARDRAIL & NEON TUBE (Cyan) ================= */}
      <group position={[-ROAD_WIDTH / 2 - 0.2, 0, (HIGHWAY_START + HIGHWAY_END) / 2]}>
        {/* Concrete barrier base */}
        <mesh position={[0, 0.35, 0]}>
          <boxGeometry args={[0.4, 0.7, HIGHWAY_LENGTH]} />
          <meshStandardMaterial color="#12151e" roughness={0.7} />
        </mesh>
        {/* Glowing Neon Light Tube */}
        <mesh position={[0.2, 0.65, 0]}>
          <boxGeometry args={[0.08, 0.08, HIGHWAY_LENGTH]} />
          <meshStandardMaterial
            color="#00f2fe"
            emissive="#00f2fe"
            emissiveIntensity={2.5}
            roughness={0.1}
          />
        </mesh>
      </group>

      {/* ================= RIGHT GUARDRAIL & NEON TUBE (Magenta) ================= */}
      <group position={[ROAD_WIDTH / 2 + 0.2, 0, (HIGHWAY_START + HIGHWAY_END) / 2]}>
        {/* Concrete barrier base */}
        <mesh position={[0, 0.35, 0]}>
          <boxGeometry args={[0.4, 0.7, HIGHWAY_LENGTH]} />
          <meshStandardMaterial color="#12151e" roughness={0.7} />
        </mesh>
        {/* Glowing Neon Light Tube */}
        <mesh position={[-0.2, 0.65, 0]}>
          <boxGeometry args={[0.08, 0.08, HIGHWAY_LENGTH]} />
          <meshStandardMaterial
            color="#ff007f"
            emissive="#ff007f"
            emissiveIntensity={2.5}
            roughness={0.1}
          />
        </mesh>
      </group>

      {/* ================= 3D OVERHEAD DESTINATION GATES ================= */}
      {GATES.map((gate) => (
        <group key={gate.id} position={[0, 0, gate.z]}>
          {/* Left Pillar */}
          <mesh position={[-ROAD_WIDTH / 2 - 0.5, 3.2, 0]}>
            <boxGeometry args={[0.6, 6.4, 0.6]} />
            <meshStandardMaterial color="#0c0e18" metalness={0.8} />
          </mesh>
          {/* Right Pillar */}
          <mesh position={[ROAD_WIDTH / 2 + 0.5, 3.2, 0]}>
            <boxGeometry args={[0.6, 6.4, 0.6]} />
            <meshStandardMaterial color="#0c0e18" metalness={0.8} />
          </mesh>
          {/* Overhead Truss Beam */}
          <mesh position={[0, 6.2, 0]}>
            <boxGeometry args={[ROAD_WIDTH + 1.8, 0.8, 0.6]} />
            <meshStandardMaterial color="#0a0c14" metalness={0.9} />
          </mesh>

          {/* Glowing Arch Neon Border */}
          <mesh position={[0, 5.75, 0]}>
            <boxGeometry args={[ROAD_WIDTH + 1.4, 0.1, 0.65]} />
            <meshStandardMaterial
              color={gate.color}
              emissive={gate.color}
              emissiveIntensity={3.2}
            />
          </mesh>

          {/* Floating Neon Signboard Over Highway */}
          <group position={[0, 4.8, 0]}>
            {/* Dark glass backing */}
            <mesh>
              <boxGeometry args={[5.2, 1.4, 0.15]} />
              <meshStandardMaterial color="#040609" roughness={0.2} metalness={0.8} />
            </mesh>
            {/* Glowing Neon Border Frame */}
            <mesh>
              <boxGeometry args={[5.35, 1.55, 0.05]} />
              <meshStandardMaterial
                color={gate.color}
                emissive={gate.color}
                emissiveIntensity={2.8}
              />
            </mesh>
            {/* Point Light Casting Gate Color Onto Road Below */}
            <pointLight position={[0, 0, 0.5]} color={gate.color} intensity={4.5} distance={14} />
          </group>
        </group>
      ))}
    </group>
  );
}
