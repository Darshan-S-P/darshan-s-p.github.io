import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * 3D Falling Cyberpunk Neon Rain Particles
 */
export default function RainParticles() {
  const rainCount = 450;
  const linesRef = useRef<THREE.LineSegments>(null);

  const [positions] = useMemo(() => {
    const pos = new Float32Array(rainCount * 6);
    for (let i = 0; i < rainCount; i++) {
      const x = (Math.random() - 0.5) * 18;
      const y = Math.random() * 12;
      const z = (Math.random() - 0.5) * 18;
      const len = 0.35 + Math.random() * 0.3;

      // Top of rain streak
      pos[i * 6 + 0] = x;
      pos[i * 6 + 1] = y;
      pos[i * 6 + 2] = z;

      // Bottom of rain streak
      pos[i * 6 + 3] = x;
      pos[i * 6 + 4] = y - len;
      pos[i * 6 + 5] = z;
    }
    return [pos];
  }, [rainCount]);

  useFrame((_, delta) => {
    if (linesRef.current) {
      const attr = linesRef.current.geometry.attributes.position as THREE.BufferAttribute;
      const array = attr.array as Float32Array;

      for (let i = 0; i < rainCount; i++) {
        const fallSpeed = 16 * delta;
        array[i * 6 + 1] -= fallSpeed;
        array[i * 6 + 4] -= fallSpeed;

        // Reset to top when hitting the ground
        if (array[i * 6 + 4] < -0.4) {
          const y = 8 + Math.random() * 4;
          const len = 0.35 + Math.random() * 0.3;
          array[i * 6 + 1] = y;
          array[i * 6 + 4] = y - len;
        }
      }
      attr.needsUpdate = true;
    }
  });

  return (
    <lineSegments ref={linesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <lineBasicMaterial
        color="#00f2fe"
        transparent
        opacity={0.35}
        blending={THREE.AdditiveBlending}
      />
    </lineSegments>
  );
}
