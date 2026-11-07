"use client";

import React, { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

/**
 * Generates floating neural network nodes and dynamic synaptic connection lines.
 */
function NeuralNodes() {
  const count = 45;
  const meshRef = useRef<THREE.Group>(null);
  const linesRef = useRef<THREE.LineSegments>(null);

  // Generate random 3D coordinates for nodes within a sphere-like bounding volume
  const { positions, nodeArray } = useMemo(() => {
    const coords: THREE.Vector3[] = [];
    const pos = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 14;
      const y = (Math.random() - 0.5) * 8;
      const z = (Math.random() - 0.5) * 8;
      pos[i * 3] = x;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = z;
      coords.push(new THREE.Vector3(x, y, z));
    }
    return { positions: pos, nodeArray: coords };
  }, [count]);

  // Generate line connections between nodes that are within a distance threshold
  const lineGeometry = useMemo(() => {
    const linePositions: number[] = [];
    const maxDist = 4.2;

    for (let i = 0; i < count; i++) {
      for (let j = i + 1; j < count; j++) {
        const dist = nodeArray[i].distanceTo(nodeArray[j]);
        if (dist < maxDist) {
          linePositions.push(
            nodeArray[i].x, nodeArray[i].y, nodeArray[i].z,
            nodeArray[j].x, nodeArray[j].y, nodeArray[j].z
          );
        }
      }
    }

    const geom = new THREE.BufferGeometry();
    geom.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(linePositions, 3)
    );
    return geom;
  }, [nodeArray, count]);

  // Frame loop for gentle rotation and mouse reaction
  useFrame((state) => {
    const { pointer } = state;
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.05 + pointer.x * 0.25;
      meshRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.04) * 0.1 - pointer.y * 0.2;
    }
  });

  return (
    <group ref={meshRef}>
      {/* Neural Node Points */}
      {nodeArray.map((pos, idx) => (
        <Float key={idx} speed={1.5} rotationIntensity={0.6} floatIntensity={0.8}>
          <mesh position={[pos.x, pos.y, pos.z]}>
            <icosahedronGeometry args={[0.12, 1]} />
            <meshStandardMaterial
              color={idx % 3 === 0 ? "#00f2fe" : idx % 3 === 1 ? "#9d4edd" : "#4facfe"}
              emissive={idx % 3 === 0 ? "#00f2fe" : "#9d4edd"}
              emissiveIntensity={1.2}
              roughness={0.2}
              metalness={0.8}
            />
          </mesh>
        </Float>
      ))}

      {/* Dynamic Synaptic Lines */}
      <lineSegments geometry={lineGeometry}>
        <lineBasicMaterial
          color="#00f2fe"
          transparent
          opacity={0.28}
          blending={THREE.AdditiveBlending}
        />
      </lineSegments>
    </group>
  );
}

/**
 * Subtle starfield background particles for depth perception
 */
function ParticleField() {
  const pointsRef = useRef<THREE.Points>(null);
  const particleCount = 280;

  const particlePositions = useMemo(() => {
    const coords = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i++) {
      coords[i] = (Math.random() - 0.5) * 30;
    }
    return coords;
  }, []);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.getElapsedTime() * 0.015;
    }
  });

  return (
    <Points ref={pointsRef} positions={particlePositions} stride={3}>
      <PointMaterial
        transparent
        color="#4facfe"
        size={0.06}
        sizeAttenuation
        depthWrite={false}
        opacity={0.6}
      />
    </Points>
  );
}

/**
 * Mouse parallax camera controller
 */
function CameraRig() {
  const { camera } = useThree();

  useFrame((state) => {
    const { pointer } = state;
    // Smooth camera interpolation towards mouse position
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, pointer.x * 1.2, 0.05);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, pointer.y * 0.8, 0.05);
    camera.lookAt(0, 0, 0);
  });

  return null;
}

export default function NeuralScene() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 9], fov: 60 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      >
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={1.5} color="#00f2fe" />
        <pointLight position={[-10, -10, -5]} intensity={1.2} color="#9d4edd" />

        <CameraRig />
        <NeuralNodes />
        <ParticleField />
      </Canvas>
    </div>
  );
}
