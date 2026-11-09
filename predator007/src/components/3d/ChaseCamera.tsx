import { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { carState } from './CarStore';

/**
 * 3rd-Person Dynamic Chase Camera Rig for the Cyber Sports Car
 * Optimally frames the car prominently in the lower-center of the viewport:
 * - Closer follow distance (5.2 units) so the sports car is large, bold, and detailed
 * - Lower camera height (1.9 units) creating an immersive arcade racer perspective
 * - Uses THREE.MathUtils.damp for 100% butter-smooth, jitter-free camera interpolation
 */
export default function ChaseCamera() {
  const { camera } = useThree();
  const currentPos = useRef(new THREE.Vector3(0, 2.2, 15.4));
  const currentLookAt = useRef(new THREE.Vector3(0, 1.0, 5.0));

  useFrame((_, delta) => {
    const dt = Math.min(delta, 0.05);
    const carPos = carState.position;
    const carRot = carState.rotation;
    const speedRatio = Math.abs(carState.speed) / 34;

    // Follow distance & height tuned so full car is prominently visible
    const followDist = 5.2 + speedRatio * 1.2;
    const followHeight = 1.9 + speedRatio * 0.3;

    // Camera sits behind and above the car
    const targetCamX = carPos.x + Math.sin(carRot) * followDist;
    const targetCamY = carPos.y + followHeight;
    const targetCamZ = carPos.z + Math.cos(carRot) * followDist;

    // Time-corrected exponential damping for 100% butter-smooth camera
    currentPos.current.x = THREE.MathUtils.damp(currentPos.current.x, targetCamX, 7.0, dt);
    currentPos.current.y = THREE.MathUtils.damp(currentPos.current.y, targetCamY, 7.0, dt);
    currentPos.current.z = THREE.MathUtils.damp(currentPos.current.z, targetCamZ, 7.0, dt);

    camera.position.copy(currentPos.current);

    // Look-at point: directly through the car towards the road ahead
    const targetLookX = carPos.x - Math.sin(carRot) * 4.2;
    const targetLookY = carPos.y + 0.95;
    const targetLookZ = carPos.z - Math.cos(carRot) * 4.2;

    currentLookAt.current.x = THREE.MathUtils.damp(currentLookAt.current.x, targetLookX, 9.0, dt);
    currentLookAt.current.y = THREE.MathUtils.damp(currentLookAt.current.y, targetLookY, 9.0, dt);
    currentLookAt.current.z = THREE.MathUtils.damp(currentLookAt.current.z, targetLookZ, 9.0, dt);

    camera.lookAt(currentLookAt.current);
  });

  return null;
}