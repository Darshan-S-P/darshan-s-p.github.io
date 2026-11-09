import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { carState, GATES } from './CarStore';

export default function CyberSportsCar() {
  const carGroup = useRef<THREE.Group>(null);
  const frontLeftWheel = useRef<THREE.Group>(null);
  const frontRightWheel = useRef<THREE.Group>(null);
  const rearLeftWheel = useRef<THREE.Group>(null);
  const rearRightWheel = useRef<THREE.Group>(null);
  const brakeLightMat = useRef<THREE.MeshStandardMaterial>(null);

  // Physics constants
  const MAX_SPEED = 32;       // max forward units/sec (~140 km/h)
  const MAX_REV_SPEED = -12;  // max reverse speed
  const ACCEL = 22;           // acceleration rate
  const BRAKE_DECEL = 35;     // braking deceleration
  const FRICTION = 0.985;     // natural road friction
  const TURN_SPEED = 2.4;     // steering sensitivity
  const MAX_STEER = 0.45;     // max wheel angle in radians
  const ROAD_HALF_WIDTH = 4.6;// road boundaries

  useFrame((_, delta) => {
    // Cap delta to prevent huge jumps on tab switch
    const dt = Math.min(delta, 0.05);

    // 1. Handle Autopilot Drive-to destination if requested
    if (carState.targetGateZ !== null) {
      const distZ = carState.targetGateZ - carState.position.z;
      if (Math.abs(distZ) > 1.2) {
        // Accelerate towards target Z
        const dir = Math.sign(distZ);
        carState.speed = THREE.MathUtils.lerp(carState.speed, dir * 26, 0.08);
        // Center on road lane
        carState.position.x = THREE.MathUtils.lerp(carState.position.x, 0, 0.06);
        carState.rotation = THREE.MathUtils.lerp(carState.rotation, 0, 0.08);
      } else {
        // Arrived at destination
        carState.speed = THREE.MathUtils.lerp(carState.speed, 0, 0.15);
        if (Math.abs(carState.speed) < 0.5) {
          carState.speed = 0;
          carState.targetGateZ = null;
        }
      }
    } else {
      // 2. Manual Keyboard / WASD Controls
      const { forward, backward, left, right, brake } = carState.keys;
      carState.isBraking = brake || (carState.speed > 1 && backward);

      // Acceleration / Braking
      if (forward) {
        carState.speed -= ACCEL * dt; // Moving down -Z
      } else if (backward) {
        if (carState.speed < -1) {
          // Braking while moving forward
          carState.speed += BRAKE_DECEL * dt;
        } else {
          // Reversing
          carState.speed += (ACCEL * 0.6) * dt;
        }
      } else {
        // Natural friction coasting
        carState.speed *= FRICTION;
        if (Math.abs(carState.speed) < 0.05) carState.speed = 0;
      }

      // Handbrake
      if (brake) {
        carState.speed = THREE.MathUtils.lerp(carState.speed, 0, 0.15);
      }

      // Clamp speed
      carState.speed = THREE.MathUtils.clamp(carState.speed, -MAX_SPEED, -MAX_REV_SPEED);

      // Steering
      const isMoving = Math.abs(carState.speed) > 0.2;
      const moveDir = Math.sign(carState.speed);

      if (left) {
        carState.steering = THREE.MathUtils.lerp(carState.steering, MAX_STEER, 0.15);
        if (isMoving) carState.rotation += TURN_SPEED * dt * (moveDir < 0 ? 1 : -1);
      } else if (right) {
        carState.steering = THREE.MathUtils.lerp(carState.steering, -MAX_STEER, 0.15);
        if (isMoving) carState.rotation -= TURN_SPEED * dt * (moveDir < 0 ? 1 : -1);
      } else {
        carState.steering = THREE.MathUtils.lerp(carState.steering, 0, 0.2);
        // Slowly align straight with highway if user isn't actively steering
        carState.rotation = THREE.MathUtils.lerp(carState.rotation, 0, 0.04);
      }
    }

    // 3. Update Car 3D Position
    const forwardX = Math.sin(carState.rotation);
    const forwardZ = Math.cos(carState.rotation);

    carState.position.x += forwardX * carState.speed * dt;
    carState.position.z += forwardZ * carState.speed * dt;

    // Road Guardrail Collisions
    if (carState.position.x > ROAD_HALF_WIDTH) {
      carState.position.x = ROAD_HALF_WIDTH;
      carState.speed *= 0.85;
      carState.rotation = THREE.MathUtils.lerp(carState.rotation, 0, 0.2);
    } else if (carState.position.x < -ROAD_HALF_WIDTH) {
      carState.position.x = -ROAD_HALF_WIDTH;
      carState.speed *= 0.85;
      carState.rotation = THREE.MathUtils.lerp(carState.rotation, 0, 0.2);
    }

    // Loop highway if user drives beyond the end or start
    if (carState.position.z < -360) {
      carState.position.z = 15;
    } else if (carState.position.z > 25) {
      carState.position.z = 25;
      carState.speed = 0;
    }

    // 4. Update Display Telemetry for HUDs
    carState.displaySpeed = Math.round(Math.abs(carState.speed) * 4.4); // converts to ~0-140 km/h

    // 5. Check Nearby Gates
    let foundGate = null;
    for (const gate of GATES) {
      const dist = Math.abs(carState.position.z - gate.z);
      if (dist < 12 && Math.abs(carState.position.x) < 4.5) {
        foundGate = gate;
        break;
      }
    }
    carState.nearbyGate = foundGate;

    // 6. Apply Position & Rotation to Three.js Object
    if (carGroup.current) {
      carGroup.current.position.copy(carState.position);
      carGroup.current.rotation.y = carState.rotation;

      // Suspension body roll when turning
      const roll = (carState.steering * 0.15) * (Math.abs(carState.speed) / MAX_SPEED);
      carGroup.current.rotation.z = THREE.MathUtils.lerp(carGroup.current.rotation.z, roll, 0.1);

      // Pitch when accelerating / braking
      const pitch = (carState.speed * 0.005);
      carGroup.current.rotation.x = THREE.MathUtils.lerp(carGroup.current.rotation.x, pitch, 0.1);
    }

    // 7. Rotate Wheels with Speed and Turn Front Wheels
    const wheelSpin = (carState.speed * dt * 3.5);
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

    // 8. Update Brake Light Glow
    if (brakeLightMat.current) {
      const isGlowing = carState.isBraking || Math.abs(carState.speed) < 0.2;
      brakeLightMat.current.emissiveIntensity = isGlowing ? 4.5 : 1.5;
    }

    // Notify UI listeners (throttled)
    carState.notify();
  });

  return (
    <group ref={carGroup} position={[0, 0, 10]}>
      {/* ================= CHASSIS (Deep Gloss Cyberpunk Wedge Body) ================= */}
      <mesh position={[0, 0.42, 0]} castShadow>
        <boxGeometry args={[2.1, 0.42, 4.3]} />
        <meshStandardMaterial color="#0c0d12" roughness={0.12} metalness={0.92} />
      </mesh>

      {/* Aerodynamic Front Wedge Hood */}
      <mesh position={[0, 0.32, -1.8]} rotation={[-0.22, 0, 0]} castShadow>
        <boxGeometry args={[2.05, 0.32, 1.4]} />
        <meshStandardMaterial color="#090a0f" roughness={0.12} metalness={0.92} />
      </mesh>

      {/* Cockpit & Tinted Canopy */}
      <mesh position={[0, 0.78, 0.15]} castShadow>
        <boxGeometry args={[1.65, 0.42, 2.1]} />
        <meshStandardMaterial color="#05070a" roughness={0.05} metalness={0.98} />
      </mesh>

      {/* Front Windshield Angle */}
      <mesh position={[0, 0.72, -1.05]} rotation={[-0.45, 0, 0]}>
        <boxGeometry args={[1.5, 0.05, 0.85]} />
        <meshStandardMaterial color="#030508" roughness={0.05} metalness={0.98} />
      </mesh>

      {/* Rear Window Slats */}
      <mesh position={[0, 0.74, 1.3]} rotation={[0.42, 0, 0]}>
        <boxGeometry args={[1.48, 0.05, 0.8]} />
        <meshStandardMaterial color="#030508" roughness={0.08} metalness={0.95} />
      </mesh>

      {/* ================= AERODYNAMIC REAR WING / SPOILER ================= */}
      {/* Spoiler Main Wing Blade */}
      <mesh position={[0, 1.1, 2.15]}>
        <boxGeometry args={[2.25, 0.08, 0.42]} />
        <meshStandardMaterial color="#08090d" roughness={0.2} metalness={0.9} />
      </mesh>
      {/* Spoiler Struts */}
      <mesh position={[-0.8, 0.8, 2.05]}>
        <boxGeometry args={[0.08, 0.52, 0.2]} />
        <meshStandardMaterial color="#0a0b10" metalness={0.8} />
      </mesh>
      <mesh position={[0.8, 0.8, 2.05]}>
        <boxGeometry args={[0.08, 0.52, 0.2]} />
        <meshStandardMaterial color="#0a0b10" metalness={0.8} />
      </mesh>

      {/* ================= REAR TAILLIGHT BARS (Facing +Z) ================= */}
      <mesh position={[0, 0.52, 2.16]}>
        <boxGeometry args={[2.0, 0.12, 0.06]} />
        <meshStandardMaterial
          ref={brakeLightMat}
          color="#ff0033"
          emissive="#ff0033"
          emissiveIntensity={2.5}
          roughness={0.1}
        />
      </mesh>
      <pointLight position={[0, 0.5, 2.4]} color="#ff0033" intensity={3.5} distance={6} />

      {/* ================= ILLUMINATED LICENSE PLATE: "PREDATOR007" ================= */}
      <group position={[0, 0.26, 2.17]}>
        <mesh>
          <boxGeometry args={[0.7, 0.2, 0.04]} />
          <meshStandardMaterial color="#14161f" roughness={0.5} />
        </mesh>
        <mesh position={[0, 0, 0.025]}>
          <planeGeometry args={[0.64, 0.16]} />
          <meshStandardMaterial
            color="#ffffff"
            emissive="#ffffff"
            emissiveIntensity={0.8}
            roughness={0.2}
          />
        </mesh>
      </group>

      {/* ================= CHROME QUAD EXHAUSTS ================= */}
      {[-0.42, -0.26, 0.26, 0.42].map((x, i) => (
        <mesh key={i} position={[x, 0.16, 2.17]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.065, 0.065, 0.12, 16]} />
          <meshStandardMaterial color="#2d323d" metalness={0.98} roughness={0.1} />
        </mesh>
      ))}

      {/* ================= FRONT HEADLIGHTS & LIGHT BEAMS (Facing -Z) ================= */}
      <mesh position={[-0.75, 0.35, -2.48]}>
        <boxGeometry args={[0.45, 0.12, 0.06]} />
        <meshStandardMaterial color="#00f2fe" emissive="#00f2fe" emissiveIntensity={3.5} />
      </mesh>
      <mesh position={[0.75, 0.35, -2.48]}>
        <boxGeometry args={[0.45, 0.12, 0.06]} />
        <meshStandardMaterial color="#00f2fe" emissive="#00f2fe" emissiveIntensity={3.5} />
      </mesh>
      {/* Front Road Illuminators */}
      <spotLight
        position={[0, 0.6, -2.5]}
        target-position={[0, 0, -25]}
        color="#00f2fe"
        intensity={6.0}
        angle={0.65}
        penumbra={0.5}
        distance={35}
      />

      {/* ================= CYAN NEON UNDERGLOW ================= */}
      <pointLight position={[0, -0.15, 0]} color="#00f2fe" intensity={3.5} distance={4.5} />
      <pointLight position={[0, -0.15, 1.2]} color="#ff007f" intensity={2.8} distance={4.0} />

      {/* ================= WHEELS (Steering & Rotating) ================= */}
      {/* Front Left Wheel */}
      <group ref={frontLeftWheel} position={[-1.08, 0.26, -1.35]}>
        <mesh rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.36, 0.36, 0.26, 24]} />
          <meshStandardMaterial color="#111215" roughness={0.8} />
        </mesh>
        <mesh position={[-0.12, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.22, 0.22, 0.08, 16]} />
          <meshStandardMaterial color="#00f2fe" metalness={0.9} roughness={0.2} emissive="#00f2fe" emissiveIntensity={0.5} />
        </mesh>
      </group>

      {/* Front Right Wheel */}
      <group ref={frontRightWheel} position={[1.08, 0.26, -1.35]}>
        <mesh rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.36, 0.36, 0.26, 24]} />
          <meshStandardMaterial color="#111215" roughness={0.8} />
        </mesh>
        <mesh position={[0.12, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.22, 0.22, 0.08, 16]} />
          <meshStandardMaterial color="#00f2fe" metalness={0.9} roughness={0.2} emissive="#00f2fe" emissiveIntensity={0.5} />
        </mesh>
      </group>

      {/* Rear Left Wheel */}
      <group ref={rearLeftWheel} position={[-1.08, 0.28, 1.35]}>
        <mesh rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.38, 0.38, 0.3, 24]} />
          <meshStandardMaterial color="#111215" roughness={0.8} />
        </mesh>
        <mesh position={[-0.14, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.24, 0.24, 0.08, 16]} />
          <meshStandardMaterial color="#ff007f" metalness={0.9} roughness={0.2} emissive="#ff007f" emissiveIntensity={0.5} />
        </mesh>
      </group>

      {/* Rear Right Wheel */}
      <group ref={rearRightWheel} position={[1.08, 0.28, 1.35]}>
        <mesh rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.38, 0.38, 0.3, 24]} />
          <meshStandardMaterial color="#111215" roughness={0.8} />
        </mesh>
        <mesh position={[0.14, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.24, 0.24, 0.08, 16]} />
          <meshStandardMaterial color="#ff007f" metalness={0.9} roughness={0.2} emissive="#ff007f" emissiveIntensity={0.5} />
        </mesh>
      </group>
    </group>
  );
}
