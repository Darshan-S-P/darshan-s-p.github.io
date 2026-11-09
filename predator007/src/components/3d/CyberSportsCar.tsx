import React, { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { carState, GATES, CAR_COLORS } from './CarStore';

/**
 * High-Performance 3D Cyber Sports Car "PREDATOR007"
 * Features:
 * - 100% Unified Vibrant Paint Finish: Entire car body (hood, roof, canopy, rear deck,
 *   spoiler, and bumpers) is painted in the selected high-contrast color! No black patches.
 * - Dynamic Real-Time Color Customization (White, Cyan, Gold, Purple, Red)
 * - Butter-Smooth Physics & Damping (No jumps, fluid scroll cruising, progressive steering)
 * - Radiant cyan neon underglow reflecting on asphalt
 * - Full-width synthwave LED taillight bar with dynamic brake glow
 * - Twin ice-blue LED headlights with forward road projection
 * - 4 Detailed alloy wheels with glowing cyan neon rim rings & spinning disk brakes
 * - Dedicated overhead key light ensuring chassis is brilliantly illuminated from every angle
 */
export default function CyberSportsCar() {
  const carGroup = useRef<THREE.Group>(null);
  const frontLeftWheel = useRef<THREE.Group>(null);
  const frontRightWheel = useRef<THREE.Group>(null);
  const rearLeftWheel = useRef<THREE.Group>(null);
  const rearRightWheel = useRef<THREE.Group>(null);
  const brakeLightMat = useRef<THREE.MeshStandardMaterial>(null);
  const exhaustFlameMat = useRef<THREE.MeshBasicMaterial>(null);

  // Reactive color state
  const [currentColor, setCurrentColor] = useState(carState.carColor);

  useEffect(() => {
    return carState.subscribe(() => {
      if (carState.carColor !== currentColor) {
        setCurrentColor(carState.carColor);
      }
    });
  }, [currentColor]);

  const colorConfig = CAR_COLORS[currentColor] || CAR_COLORS.white;

  // Physics constants
  const MAX_SPEED = 34;        // max forward units/sec (~150 km/h)
  const MAX_REV_SPEED = -12;   // max reverse speed
  const MAX_STEER = 0.42;      // max wheel angle in radians
  const ROAD_HALF_WIDTH = 4.8; // road boundaries

  useFrame((_, delta) => {
    const dt = Math.min(delta, 0.05);

    // 1. Process Smooth Scroll Velocity into continuous gliding displacement
    if (Math.abs(carState.scrollVelocity) > 0.005) {
      const scrollPush = carState.scrollVelocity * dt * 2.4;
      carState.position.z -= scrollPush;

      const targetSpeed = -carState.scrollVelocity * 0.75;
      carState.speed = THREE.MathUtils.damp(carState.speed, targetSpeed, 6.0, dt);
      carState.scrollVelocity = THREE.MathUtils.damp(carState.scrollVelocity, 0, 4.5, dt);
    }

    // 2. Handle Autopilot Drive-to destination
    if (carState.targetGateZ !== null) {
      const distZ = carState.targetGateZ - carState.position.z;
      if (Math.abs(distZ) > 1.2) {
        const dir = Math.sign(distZ);
        carState.speed = THREE.MathUtils.damp(carState.speed, dir * 28, 5.0, dt);
        carState.position.x = THREE.MathUtils.damp(carState.position.x, 0, 4.0, dt);
        carState.rotation = THREE.MathUtils.damp(carState.rotation, 0, 6.0, dt);
      } else {
        carState.speed = THREE.MathUtils.damp(carState.speed, 0, 8.0, dt);
        if (Math.abs(carState.speed) < 0.4) {
          carState.speed = 0;
          carState.targetGateZ = null;
          if (carState.nearbyGate && carState.onArrival) {
            carState.onArrival(carState.nearbyGate);
          }
        }
      }
    } else {
      // 3. Manual Keyboard / WASD Controls with Smooth Damping
      const { forward, backward, left, right, brake } = carState.keys;
      carState.isBraking = brake || (carState.speed < -1 && backward);

      if (forward) {
        carState.speed = THREE.MathUtils.damp(carState.speed, -MAX_SPEED, 3.8, dt);
      } else if (backward) {
        if (carState.speed < -1) {
          carState.speed = THREE.MathUtils.damp(carState.speed, 0, 6.0, dt);
        } else {
          carState.speed = THREE.MathUtils.damp(carState.speed, -MAX_REV_SPEED, 3.2, dt);
        }
      } else if (Math.abs(carState.scrollVelocity) <= 0.005) {
        carState.speed = THREE.MathUtils.damp(carState.speed, 0, 1.4, dt);
        if (Math.abs(carState.speed) < 0.05) carState.speed = 0;
      }

      if (brake) {
        carState.speed = THREE.MathUtils.damp(carState.speed, 0, 9.0, dt);
      }

      carState.speed = THREE.MathUtils.clamp(carState.speed, -MAX_SPEED, -MAX_REV_SPEED);

      const isMoving = Math.abs(carState.speed) > 0.15;
      const moveDir = Math.sign(carState.speed);

      if (left) {
        carState.steering = THREE.MathUtils.damp(carState.steering, MAX_STEER, 8.0, dt);
        if (isMoving) carState.rotation += (moveDir < 0 ? 2.6 : -2.6) * dt;
      } else if (right) {
        carState.steering = THREE.MathUtils.damp(carState.steering, -MAX_STEER, 8.0, dt);
        if (isMoving) carState.rotation -= (moveDir < 0 ? 2.6 : -2.6) * dt;
      } else {
        carState.steering = THREE.MathUtils.damp(carState.steering, 0, 9.0, dt);
        carState.rotation = THREE.MathUtils.damp(carState.rotation, 0, 4.0, dt);
      }
    }

    // 4. Update Car Position
    const forwardX = Math.sin(carState.rotation);
    const forwardZ = Math.cos(carState.rotation);

    carState.position.x += forwardX * carState.speed * dt;
    carState.position.z += forwardZ * carState.speed * dt;

    // Road Guardrail Collisions
    if (carState.position.x > ROAD_HALF_WIDTH) {
      carState.position.x = ROAD_HALF_WIDTH;
      carState.speed *= 0.88;
      carState.rotation = THREE.MathUtils.damp(carState.rotation, 0, 8.0, dt);
    } else if (carState.position.x < -ROAD_HALF_WIDTH) {
      carState.position.x = -ROAD_HALF_WIDTH;
      carState.speed *= 0.88;
      carState.rotation = THREE.MathUtils.damp(carState.rotation, 0, 8.0, dt);
    }

    // Loop highway bounds
    if (carState.position.z < -380) {
      carState.position.z = 20;
    } else if (carState.position.z > 30) {
      carState.position.z = 30;
      carState.speed = 0;
    }

    // 5. Update Display Telemetry for HUDs
    carState.displaySpeed = Math.round(Math.abs(carState.speed) * 4.4);

    // 6. Check Nearby Gates
    let foundGate = null;
    for (const gate of GATES) {
      const dist = Math.abs(carState.position.z - gate.z);
      if (dist < 14 && Math.abs(carState.position.x) < 4.8) {
        foundGate = gate;
        break;
      }
    }
    carState.nearbyGate = foundGate;

    // 7. Apply to Three.js Object with Smooth Body Physics
    if (carGroup.current) {
      carGroup.current.position.copy(carState.position);
      carGroup.current.rotation.y = carState.rotation;

      // Dynamic chassis body roll into turns
      const roll = (carState.steering * 0.18) * (Math.abs(carState.speed) / MAX_SPEED);
      carGroup.current.rotation.z = THREE.MathUtils.damp(carGroup.current.rotation.z, roll, 8.0, dt);

      // Dynamic acceleration squat & brake dive
      const pitch = (carState.speed * 0.006);
      carGroup.current.rotation.x = THREE.MathUtils.damp(carGroup.current.rotation.x, pitch, 8.0, dt);
    }

    // 8. Wheel Animations
    const wheelSpin = (carState.speed * dt * 3.8);
    if (frontLeftWheel.current) {
      frontLeftWheel.current.rotation.y = carState.steering;
      frontLeftWheel.current.rotation.x += wheelSpin;
    }
    if (frontRightWheel.current) {
      frontRightWheel.current.rotation.y = carState.steering;
      frontRightWheel.current.rotation.x += wheelSpin;
    }
    if (rearLeftWheel.current) rearLeftWheel.current.rotation.x += wheelSpin;
    if (rearRightWheel.current) rearRightWheel.current.rotation.x += wheelSpin;

    // 9. Update Brake Light Glow
    if (brakeLightMat.current) {
      const isGlowing = carState.isBraking || Math.abs(carState.speed) < 0.2;
      brakeLightMat.current.emissiveIntensity = isGlowing ? 4.8 : 1.8;
    }

    // 10. Update Exhaust Afterburner Pulse
    if (exhaustFlameMat.current) {
      const isAccelerating = carState.keys.forward || carState.speed < -15;
      exhaustFlameMat.current.opacity = isAccelerating ? 0.9 : 0.25;
    }

    carState.notify();
  });

  return (
    <group ref={carGroup} position={[0, 0, 10]}>
      {/* ================= DEDICATED CAR LIGHTING RIG ================= */}
      {/* Main Overhead Key Light */}
      <pointLight position={[0, 4.0, 0.5]} intensity={7.0} color="#ffffff" distance={15} />
      {/* Rear High-Intensity Fill Light */}
      <pointLight position={[0, 2.2, 3.5]} intensity={5.0} color="#ffffff" distance={10} />

      {/* ================= RADIANT NEON UNDERGLOW ================= */}
      <mesh position={[0, 0.04, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[2.5, 4.6]} />
        <meshBasicMaterial color="#00f2fe" transparent opacity={0.7} />
      </mesh>
      <pointLight position={[0, 0.12, 0]} intensity={7.0} color="#00f2fe" distance={8} />

      {/* ================= CHASSIS (100% Fully Painted in Selected Color) ================= */}
      {/* Lower Main Hull */}
      <mesh position={[0, 0.42, 0]} castShadow>
        <boxGeometry args={[2.24, 0.44, 4.4]} />
        <meshStandardMaterial
          color={colorConfig.hex}
          roughness={0.14}
          metalness={0.82}
        />
      </mesh>

      {/* Rear Bumper & Fascia */}
      <mesh position={[0, 0.42, 2.18]}>
        <boxGeometry args={[2.2, 0.42, 0.12]} />
        <meshStandardMaterial color={colorConfig.hex} roughness={0.14} metalness={0.82} />
      </mesh>

      {/* Side Skirt Aero Blades (Vibrant Accent Glow) */}
      <mesh position={[-1.15, 0.22, 0]}>
        <boxGeometry args={[0.08, 0.12, 4.2]} />
        <meshStandardMaterial color={colorConfig.accent} emissive={colorConfig.accent} emissiveIntensity={3.2} />
      </mesh>
      <mesh position={[1.15, 0.22, 0]}>
        <boxGeometry args={[0.08, 0.12, 4.2]} />
        <meshStandardMaterial color={colorConfig.accent} emissive={colorConfig.accent} emissiveIntensity={3.2} />
      </mesh>

      {/* Front Nose Wedge (Hood) */}
      <mesh position={[0, 0.32, -1.8]} rotation={[-0.24, 0, 0]} castShadow>
        <boxGeometry args={[2.18, 0.34, 1.4]} />
        <meshStandardMaterial
          color={colorConfig.hex}
          roughness={0.14}
          metalness={0.84}
        />
      </mesh>

      {/* Front Aero Lip Bumper */}
      <mesh position={[0, 0.16, -2.25]}>
        <boxGeometry args={[2.26, 0.1, 0.5]} />
        <meshStandardMaterial color={colorConfig.hex} roughness={0.2} metalness={0.8} />
      </mesh>

      {/* Glowing Neon Cyber Racing Stripes on Hood */}
      <mesh position={[-0.45, 0.37, -1.8]} rotation={[-0.24, 0, 0]}>
        <boxGeometry args={[0.08, 0.35, 1.3]} />
        <meshStandardMaterial color="#00f2fe" emissive="#00f2fe" emissiveIntensity={4.0} />
      </mesh>
      <mesh position={[0.45, 0.37, -1.8]} rotation={[-0.24, 0, 0]}>
        <boxGeometry args={[0.08, 0.35, 1.3]} />
        <meshStandardMaterial color="#00f2fe" emissive="#00f2fe" emissiveIntensity={4.0} />
      </mesh>

      {/* ================= COCKPIT CANOPY & ROOF (Painted in Car Color!) ================= */}
      {/* Cockpit Roof & Pillars */}
      <mesh position={[0, 0.82, 0.15]} castShadow>
        <boxGeometry args={[1.72, 0.46, 2.15]} />
        <meshStandardMaterial color={colorConfig.hex} roughness={0.14} metalness={0.82} />
      </mesh>

      {/* Front Windshield Glass */}
      <mesh position={[0, 0.77, -1.05]} rotation={[-0.46, 0, 0]}>
        <boxGeometry args={[1.56, 0.04, 0.86]} />
        <meshStandardMaterial color="#00f2fe" roughness={0.05} metalness={0.95} transparent opacity={0.5} />
      </mesh>

      {/* Rear Window Glass */}
      <mesh position={[0, 0.78, 1.28]} rotation={[0.44, 0, 0]}>
        <boxGeometry args={[1.54, 0.04, 0.8]} />
        <meshStandardMaterial color="#00f2fe" roughness={0.05} metalness={0.95} transparent opacity={0.5} />
      </mesh>

      {/* Rear Engine Deck Painted Panel */}
      <mesh position={[0, 0.65, 1.65]}>
        <boxGeometry args={[1.85, 0.15, 0.8]} />
        <meshStandardMaterial color={colorConfig.hex} roughness={0.14} metalness={0.82} />
      </mesh>

      {/* ================= REAR SPOILER (Fully Painted in Car Color) ================= */}
      {/* Spoiler Main Wing Blade */}
      <mesh position={[0, 1.2, 2.15]}>
        <boxGeometry args={[2.38, 0.08, 0.46]} />
        <meshStandardMaterial color={colorConfig.hex} roughness={0.15} metalness={0.85} />
      </mesh>
      {/* Glowing Wingtip Endplates */}
      <mesh position={[-1.2, 1.22, 2.15]}>
        <boxGeometry args={[0.06, 0.3, 0.5]} />
        <meshStandardMaterial color="#00f2fe" emissive="#00f2fe" emissiveIntensity={4.0} />
      </mesh>
      <mesh position={[1.2, 1.22, 2.15]}>
        <boxGeometry args={[0.06, 0.3, 0.5]} />
        <meshStandardMaterial color="#00f2fe" emissive="#00f2fe" emissiveIntensity={4.0} />
      </mesh>
      {/* Spoiler Struts Painted in Car Color */}
      <mesh position={[-0.75, 0.86, 2.05]}>
        <boxGeometry args={[0.08, 0.6, 0.18]} />
        <meshStandardMaterial color={colorConfig.hex} metalness={0.85} roughness={0.2} />
      </mesh>
      <mesh position={[0.75, 0.86, 2.05]}>
        <boxGeometry args={[0.08, 0.6, 0.18]} />
        <meshStandardMaterial color={colorConfig.hex} metalness={0.85} roughness={0.2} />
      </mesh>

      {/* ================= REAR TAILLIGHTS ================= */}
      {/* Full-Width Synthwave LED Taillight Bar */}
      <mesh position={[0, 0.48, 2.22]}>
        <boxGeometry args={[2.14, 0.1, 0.06]} />
        <meshStandardMaterial
          ref={brakeLightMat}
          color="#ff0055"
          emissive="#ff0055"
          emissiveIntensity={3.2}
        />
      </mesh>

      {/* Lower Secondary Taillight Strip */}
      <mesh position={[0, 0.34, 2.22]}>
        <boxGeometry args={[1.8, 0.05, 0.06]} />
        <meshStandardMaterial color="#ff0055" emissive="#ff0055" emissiveIntensity={2.8} />
      </mesh>

      {/* Cyber License Plate: PREDATOR007 */}
      <mesh position={[0, 0.41, 2.23]}>
        <boxGeometry args={[0.72, 0.18, 0.04]} />
        <meshStandardMaterial color="#020408" roughness={0.3} metalness={0.8} />
      </mesh>
      <mesh position={[0, 0.41, 2.25]}>
        <boxGeometry args={[0.66, 0.13, 0.01]} />
        <meshStandardMaterial color="#00f2fe" emissive="#00f2fe" emissiveIntensity={3.2} />
      </mesh>

      {/* Dual Chrome Exhaust Tips */}
      <mesh position={[-0.55, 0.22, 2.24]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.09, 0.09, 0.18, 16]} />
        <meshStandardMaterial color="#8892b0" metalness={0.95} roughness={0.1} />
      </mesh>
      <mesh position={[0.55, 0.22, 2.24]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.09, 0.09, 0.18, 16]} />
        <meshStandardMaterial color="#8892b0" metalness={0.95} roughness={0.1} />
      </mesh>

      {/* Exhaust Afterburner Fire Flame Plumes */}
      <mesh position={[-0.55, 0.22, 2.4]}>
        <coneGeometry args={[0.08, 0.28, 8]} />
        <meshBasicMaterial ref={exhaustFlameMat} color="#00f2fe" transparent opacity={0.6} />
      </mesh>
      <mesh position={[0.55, 0.22, 2.4]}>
        <coneGeometry args={[0.08, 0.28, 8]} />
        <meshBasicMaterial color="#00f2fe" transparent opacity={0.6} />
      </mesh>

      {/* ================= FRONT HEADLIGHTS ================= */}
      <mesh position={[-0.85, 0.42, -2.18]}>
        <boxGeometry args={[0.35, 0.1, 0.08]} />
        <meshStandardMaterial color="#00f2fe" emissive="#00f2fe" emissiveIntensity={5.0} />
      </mesh>
      <mesh position={[0.85, 0.42, -2.18]}>
        <boxGeometry args={[0.35, 0.1, 0.08]} />
        <meshStandardMaterial color="#00f2fe" emissive="#00f2fe" emissiveIntensity={5.0} />
      </mesh>
      <spotLight
        position={[-0.85, 0.45, -2.2]}
        target-position={[-0.85, 0, -22]}
        intensity={6.5}
        color="#00f2fe"
        angle={0.4}
        penumbra={0.6}
        distance={35}
      />
      <spotLight
        position={[0.85, 0.45, -2.2]}
        target-position={[0.85, 0, -22]}
        intensity={6.5}
        color="#00f2fe"
        angle={0.4}
        penumbra={0.6}
        distance={35}
      />

      {/* ================= 4 DETAILED SPORTS WHEELS ================= */}
      <group ref={frontLeftWheel} position={[-1.18, 0.34, -1.45]}>
        <WheelMesh />
      </group>
      <group ref={frontRightWheel} position={[1.18, 0.34, -1.45]}>
        <WheelMesh isRight />
      </group>
      <group ref={rearLeftWheel} position={[-1.18, 0.36, 1.45]}>
        <WheelMesh isWide />
      </group>
      <group ref={rearRightWheel} position={[1.18, 0.36, 1.45]}>
        <WheelMesh isRight isWide />
      </group>
    </group>
  );
}

function WheelMesh({ isRight = false, isWide = false }: { isRight?: boolean; isWide?: boolean }) {
  const width = isWide ? 0.36 : 0.3;
  const radius = isWide ? 0.36 : 0.34;
  const rimFaceX = isRight ? width / 2 + 0.01 : -width / 2 - 0.01;

  return (
    <group>
      {/* Rubber Tire Tread */}
      <mesh rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[radius, radius, width, 24]} />
        <meshStandardMaterial color="#141822" roughness={0.8} />
      </mesh>

      {/* Dark Alloy Rim Hub */}
      <mesh rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[radius * 0.72, radius * 0.72, width + 0.01, 16]} />
        <meshStandardMaterial color="#30384f" metalness={0.9} roughness={0.2} />
      </mesh>

      {/* Glowing Neon Cyan Outer Rim Ring */}
      <mesh position={[rimFaceX, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
        <ringGeometry args={[radius * 0.62, radius * 0.7, 24]} />
        <meshStandardMaterial
          color="#00f2fe"
          emissive="#00f2fe"
          emissiveIntensity={3.5}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Red Performance Brake Caliper */}
      <mesh position={[isRight ? -0.06 : 0.06, radius * 0.4, 0]}>
        <boxGeometry args={[0.08, 0.16, 0.14]} />
        <meshStandardMaterial color="#ff0055" emissive="#ff0055" emissiveIntensity={2.0} />
      </mesh>
    </group>
  );
}