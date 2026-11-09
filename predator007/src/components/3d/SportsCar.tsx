import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * 3D Retro-Futuristic Cyber Sports Car "PREDATOR007"
 * Inspired by the Ferrari Testarossa & Cyberpunk Quadra Turbo-R.
 * Features glowing LED taillight strips, spoiler, license plate, and neon underglow.
 */
export default function SportsCar({ speed = 0 }: { speed?: number }) {
  const carGroup = useRef<THREE.Group>(null);
  const wheelsRef = useRef<THREE.Group[]>([]);

  useFrame((state) => {
    if (carGroup.current) {
      // Subtle engine idle rumbling vibration
      const t = state.clock.getElapsedTime();
      const idleIntensity = speed > 0 ? 0.03 : 0.008;
      carGroup.current.position.y = Math.sin(t * 18) * idleIntensity;
      carGroup.current.rotation.z = Math.sin(t * 12) * (idleIntensity * 0.4);
    }
  });

  return (
    <group ref={carGroup} position={[0, -0.4, 2.5]} rotation={[0, Math.PI, 0]} scale={[0.88, 0.88, 0.88]}>
      {/* ================= MAIN CHASSIS (Sleek Black Wedge Body) ================= */}
      <mesh position={[0, 0.45, 0]}>
        <boxGeometry args={[2.2, 0.45, 4.4]} />
        <meshStandardMaterial
          color="#0c0d12"
          roughness={0.15}
          metalness={0.92}
        />
      </mesh>

      {/* Front Nose Wedge Slope */}
      <mesh position={[0, 0.35, 2.1]} rotation={[0.22, 0, 0]}>
        <boxGeometry args={[2.16, 0.35, 1.2]} />
        <meshStandardMaterial
          color="#0a0a0f"
          roughness={0.15}
          metalness={0.92}
        />
      </mesh>

      {/* Cabin & Windshield */}
      <mesh position={[0, 0.85, -0.2]}>
        <boxGeometry args={[1.7, 0.45, 2.2]} />
        <meshStandardMaterial
          color="#08090e"
          roughness={0.08}
          metalness={0.95}
        />
      </mesh>

      {/* Tinted Rear Window */}
      <mesh position={[0, 0.82, -1.35]} rotation={[-0.45, 0, 0]}>
        <boxGeometry args={[1.5, 0.05, 0.9]} />
        <meshStandardMaterial
          color="#040608"
          roughness={0.05}
          metalness={0.98}
        />
      </mesh>

      {/* ================= AERODYNAMIC REAR WING / SPOILER ================= */}
      {/* Spoiler Main Blade */}
      <mesh position={[0, 1.15, -2.15]}>
        <boxGeometry args={[2.3, 0.08, 0.45]} />
        <meshStandardMaterial
          color="#0d0e14"
          roughness={0.2}
          metalness={0.85}
        />
      </mesh>
      {/* Left Strut */}
      <mesh position={[-0.85, 0.85, -2.05]}>
        <boxGeometry args={[0.08, 0.55, 0.25]} />
        <meshStandardMaterial color="#0c0d12" metalness={0.8} />
      </mesh>
      {/* Right Strut */}
      <mesh position={[0.85, 0.85, -2.05]}>
        <boxGeometry args={[0.08, 0.55, 0.25]} />
        <meshStandardMaterial color="#0c0d12" metalness={0.8} />
      </mesh>

      {/* ================= REAR TAILLIGHT BARS (Neon Red LED Glow) ================= */}
      {/* Upper Taillight Strip */}
      <mesh position={[0, 0.55, -2.22]}>
        <boxGeometry args={[2.05, 0.12, 0.06]} />
        <meshStandardMaterial
          color="#ff0033"
          emissive="#ff0033"
          emissiveIntensity={3.5}
          roughness={0.1}
        />
      </mesh>
      {/* Lower Taillight Segments */}
      <mesh position={[-0.65, 0.38, -2.22]}>
        <boxGeometry args={[0.65, 0.08, 0.06]} />
        <meshStandardMaterial
          color="#ff0033"
          emissive="#ff0033"
          emissiveIntensity={3.2}
          roughness={0.1}
        />
      </mesh>
      <mesh position={[0.65, 0.38, -2.22]}>
        <boxGeometry args={[0.65, 0.08, 0.06]} />
        <meshStandardMaterial
          color="#ff0033"
          emissive="#ff0033"
          emissiveIntensity={3.2}
          roughness={0.1}
        />
      </mesh>

      {/* Point light casting red taillight glow on wet ground */}
      <pointLight position={[0, 0.45, -2.5]} color="#ff0033" intensity={3.5} distance={5} />

      {/* ================= ILLUMINATED LICENSE PLATE: "PREDATOR007" ================= */}
      <group position={[0, 0.28, -2.23]}>
        {/* Plate Frame */}
        <mesh>
          <boxGeometry args={[0.65, 0.2, 0.04]} />
          <meshStandardMaterial color="#1a1c24" roughness={0.5} />
        </mesh>
        {/* Plate Face */}
        <mesh position={[0, 0, 0.025]}>
          <planeGeometry args={[0.6, 0.16]} />
          <meshStandardMaterial
            color="#ffffff"
            emissive="#ffffff"
            emissiveIntensity={0.65}
            roughness={0.3}
          />
        </mesh>
      </group>

      {/* ================= CHROME DUAL EXHAUST PIPES ================= */}
      <mesh position={[-0.45, 0.18, -2.24]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.07, 0.07, 0.12, 16]} />
        <meshStandardMaterial color="#333842" metalness={0.95} roughness={0.1} />
      </mesh>
      <mesh position={[-0.28, 0.18, -2.24]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.07, 0.07, 0.12, 16]} />
        <meshStandardMaterial color="#333842" metalness={0.95} roughness={0.1} />
      </mesh>
      <mesh position={[0.28, 0.18, -2.24]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.07, 0.07, 0.12, 16]} />
        <meshStandardMaterial color="#333842" metalness={0.95} roughness={0.1} />
      </mesh>
      <mesh position={[0.45, 0.18, -2.24]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.07, 0.07, 0.12, 16]} />
        <meshStandardMaterial color="#333842" metalness={0.95} roughness={0.1} />
      </mesh>

      {/* ================= ALLOY WHEELS & TIRES ================= */}
      {/* Rear Left */}
      <group position={[-1.12, 0.26, -1.3]} rotation={[0, 0, Math.PI / 2]}>
        <mesh>
          <cylinderGeometry args={[0.38, 0.38, 0.32, 24]} />
          <meshStandardMaterial color="#111215" roughness={0.8} />
        </mesh>
        <mesh position={[0, 0.14, 0]}>
          <cylinderGeometry args={[0.24, 0.24, 0.08, 16]} />
          <meshStandardMaterial color="#88909e" metalness={0.95} roughness={0.15} />
        </mesh>
      </group>

      {/* Rear Right */}
      <group position={[1.12, 0.26, -1.3]} rotation={[0, 0, Math.PI / 2]}>
        <mesh>
          <cylinderGeometry args={[0.38, 0.38, 0.32, 24]} />
          <meshStandardMaterial color="#111215" roughness={0.8} />
        </mesh>
        <mesh position={[0, -0.14, 0]}>
          <cylinderGeometry args={[0.24, 0.24, 0.08, 16]} />
          <meshStandardMaterial color="#88909e" metalness={0.95} roughness={0.15} />
        </mesh>
      </group>

      {/* Front Left */}
      <group position={[-1.12, 0.26, 1.4]} rotation={[0, 0, Math.PI / 2]}>
        <mesh>
          <cylinderGeometry args={[0.36, 0.36, 0.28, 24]} />
          <meshStandardMaterial color="#111215" roughness={0.8} />
        </mesh>
        <mesh position={[0, 0.12, 0]}>
          <cylinderGeometry args={[0.22, 0.22, 0.08, 16]} />
          <meshStandardMaterial color="#88909e" metalness={0.95} roughness={0.15} />
        </mesh>
      </group>

      {/* Front Right */}
      <group position={[1.12, 0.26, 1.4]} rotation={[0, 0, Math.PI / 2]}>
        <mesh>
          <cylinderGeometry args={[0.36, 0.36, 0.28, 24]} />
          <meshStandardMaterial color="#111215" roughness={0.8} />
        </mesh>
        <mesh position={[0, -0.12, 0]}>
          <cylinderGeometry args={[0.22, 0.22, 0.08, 16]} />
          <meshStandardMaterial color="#88909e" metalness={0.95} roughness={0.15} />
        </mesh>
      </group>

      {/* ================= CYAN UNDERGLOW NEON ================= */}
      <pointLight position={[0, -0.15, 0]} color="#00f2fe" intensity={2.8} distance={3.8} />
      <pointLight position={[0, -0.15, -1.2]} color="#ff007f" intensity={2.2} distance={3.5} />
    </group>
  );
}
