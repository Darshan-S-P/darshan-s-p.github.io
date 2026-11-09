import React, { useMemo } from 'react';
import * as THREE from 'three';
import { GATES } from './CarStore';

// Helper to create a crisp glowing neon canvas texture for each gate sign
function createGateTexture(title: string, color: string): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 128;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    // Dark glass backing
    ctx.fillStyle = '#060912';
    ctx.fillRect(0, 0, 512, 128);

    // Neon glowing border
    ctx.strokeStyle = color;
    ctx.lineWidth = 8;
    ctx.strokeRect(6, 6, 500, 116);

    // Subtle inner corner accents
    ctx.fillStyle = color;
    ctx.fillRect(10, 10, 18, 18);
    ctx.fillRect(484, 10, 18, 18);
    ctx.fillRect(10, 100, 18, 18);
    ctx.fillRect(484, 100, 18, 18);

    // Gate Title Monospace Typography
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 36px "Share Tech Mono", monospace, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.shadowColor = color;
    ctx.shadowBlur = 18;
    ctx.fillText(`// ${title} //`, 256, 64);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

export default function NeonHighway() {
  const HIGHWAY_LENGTH = 440;
  const HIGHWAY_START = 30;
  const HIGHWAY_END = -410;
  const ROAD_WIDTH = 10.8;

  // Generate lane dash positions
  const laneDashes = useMemo(() => {
    const dashes = [];
    for (let z = HIGHWAY_START; z > HIGHWAY_END; z -= 6.5) {
      dashes.push(z);
    }
    return dashes;
  }, [HIGHWAY_START, HIGHWAY_END]);

  // Roadside street lamp posts
  const streetPoles = useMemo(() => {
    const poles = [];
    for (let z = 20; z > -370; z -= 28) {
      poles.push(z);
    }
    return poles;
  }, []);

  // Pre-generate textures for all 6 gates
  const gateTextures = useMemo(() => {
    const map = new Map<string, THREE.CanvasTexture>();
    GATES.forEach((g) => {
      map.set(g.id, createGateTexture(g.title, g.color));
    });
    return map;
  }, []);

  return (
    <group position={[0, -0.01, 0]}>
      {/* ================= ASPHALT HIGHWAY SURFACE ================= */}
      <mesh position={[0, 0, (HIGHWAY_START + HIGHWAY_END) / 2]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[ROAD_WIDTH, HIGHWAY_LENGTH]} />
        <meshStandardMaterial
          color="#0a0d16"
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>

      {/* ================= CENTER DASHED LANE LINES (Cyan Glowing) ================= */}
      {laneDashes.map((z, idx) => (
        <mesh key={idx} position={[0, 0.015, z]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[0.26, 2.6]} />
          <meshStandardMaterial
            color="#00f2fe"
            emissive="#00f2fe"
            emissiveIntensity={2.0}
            roughness={0.2}
          />
        </mesh>
      ))}

      {/* ================= LEFT GUARDRAIL & NEON TUBE (Cool Cyan) ================= */}
      <group position={[-ROAD_WIDTH / 2 - 0.2, 0, (HIGHWAY_START + HIGHWAY_END) / 2]}>
        {/* Modern barrier base */}
        <mesh position={[0, 0.35, 0]}>
          <boxGeometry args={[0.4, 0.7, HIGHWAY_LENGTH]} />
          <meshStandardMaterial color="#161a29" roughness={0.6} metalness={0.5} />
        </mesh>
        {/* Clean, balanced Cyan Neon Light Tube */}
        <mesh position={[0.2, 0.65, 0]}>
          <boxGeometry args={[0.08, 0.08, HIGHWAY_LENGTH]} />
          <meshStandardMaterial
            color="#00f2fe"
            emissive="#00f2fe"
            emissiveIntensity={1.8}
            roughness={0.2}
          />
        </mesh>
      </group>

      {/* ================= RIGHT GUARDRAIL & NEON TUBE (Balanced Cyan - No Pink Bleed!) ================= */}
      <group position={[ROAD_WIDTH / 2 + 0.2, 0, (HIGHWAY_START + HIGHWAY_END) / 2]}>
        {/* Modern barrier base */}
        <mesh position={[0, 0.35, 0]}>
          <boxGeometry args={[0.4, 0.7, HIGHWAY_LENGTH]} />
          <meshStandardMaterial color="#161a29" roughness={0.6} metalness={0.5} />
        </mesh>
        {/* Clean, balanced Cyan Neon Light Tube */}
        <mesh position={[-0.2, 0.65, 0]}>
          <boxGeometry args={[0.08, 0.08, HIGHWAY_LENGTH]} />
          <meshStandardMaterial
            color="#00f2fe"
            emissive="#00f2fe"
            emissiveIntensity={1.8}
            roughness={0.2}
          />
        </mesh>
      </group>

      {/* ================= ROADSIDE STREETLIGHT LAMPS (Clean Cyan Lighting) ================= */}
      {streetPoles.map((z, idx) => {
        const isLeft = idx % 2 === 0;
        const xPos = isLeft ? -ROAD_WIDTH / 2 - 0.8 : ROAD_WIDTH / 2 + 0.8;
        const color = '#00f2fe';
        const armDir = isLeft ? 1 : -1;

        return (
          <group key={z} position={[xPos, 0, z]}>
            {/* Vertical Pole */}
            <mesh position={[0, 3.2, 0]}>
              <cylinderGeometry args={[0.08, 0.12, 6.4, 8]} />
              <meshStandardMaterial color="#141828" metalness={0.8} />
            </mesh>
            {/* Overhanging Arm */}
            <mesh position={[armDir * 0.9, 6.2, 0]}>
              <boxGeometry args={[1.8, 0.08, 0.08]} />
              <meshStandardMaterial color="#141828" metalness={0.8} />
            </mesh>
            {/* Glowing Lamp Head */}
            <mesh position={[armDir * 1.7, 6.1, 0]}>
              <boxGeometry args={[0.5, 0.14, 0.3]} />
              <meshStandardMaterial color={color} emissive={color} emissiveIntensity={2.5} />
            </mesh>
            {/* Road Light Pool */}
            <pointLight position={[armDir * 1.7, 5.8, 0]} color={color} intensity={2.0} distance={14} />
          </group>
        );
      })}

      {/* ================= 3D OVERHEAD DESTINATION GATES ================= */}
      {GATES.map((gate) => {
        const texture = gateTextures.get(gate.id);

        return (
          <group key={gate.id} position={[0, 0, gate.z]}>
            {/* Left Truss Pillar */}
            <mesh position={[-ROAD_WIDTH / 2 - 0.6, 3.5, 0]}>
              <boxGeometry args={[0.7, 7.0, 0.7]} />
              <meshStandardMaterial color="#0c101c" metalness={0.9} />
            </mesh>
            {/* Right Truss Pillar */}
            <mesh position={[ROAD_WIDTH / 2 + 0.6, 3.5, 0]}>
              <boxGeometry args={[0.7, 7.0, 0.7]} />
              <meshStandardMaterial color="#0c101c" metalness={0.9} />
            </mesh>
            {/* Overhead Heavy Truss Beam */}
            <mesh position={[0, 6.6, 0]}>
              <boxGeometry args={[ROAD_WIDTH + 2.0, 0.9, 0.7]} />
              <meshStandardMaterial color="#0a0e18" metalness={0.9} />
            </mesh>

            {/* Glowing Arch Neon Border Strip */}
            <mesh position={[0, 6.1, 0]}>
              <boxGeometry args={[ROAD_WIDTH + 1.6, 0.12, 0.75]} />
              <meshStandardMaterial
                color={gate.color}
                emissive={gate.color}
                emissiveIntensity={3.5}
              />
            </mesh>

            {/* Floating High-Resolution Neon Signboard Over Highway */}
            <group position={[0, 5.0, 0]}>
              {/* Signboard Mesh with Texture (Front face facing +Z towards approaching car) */}
              <mesh position={[0, 0, 0.05]}>
                <planeGeometry args={[6.2, 1.55]} />
                {texture ? (
                  <meshBasicMaterial map={texture} transparent />
                ) : (
                  <meshStandardMaterial color={gate.color} emissive={gate.color} emissiveIntensity={2} />
                )}
              </mesh>
              {/* Back face facing -Z */}
              <mesh position={[0, 0, -0.05]} rotation={[0, Math.PI, 0]}>
                <planeGeometry args={[6.2, 1.55]} />
                {texture && <meshBasicMaterial map={texture} transparent />}
              </mesh>
              {/* Dark Backing Frame */}
              <mesh>
                <boxGeometry args={[6.35, 1.7, 0.12]} />
                <meshStandardMaterial color="#04060c" roughness={0.2} metalness={0.8} />
              </mesh>
              {/* Radiant Point Light illuminating the highway surface beneath the gate */}
              <pointLight position={[0, -0.2, 0.8]} color={gate.color} intensity={5.0} distance={18} />
            </group>
          </group>
        );
      })}
    </group>
  );
}