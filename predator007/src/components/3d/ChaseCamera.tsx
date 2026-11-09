import { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { carState } from './CarStore';

/**
 * 3rd-Person Chase Camera Rig for the Cyber Sports Car
 * Smoothly follows behind the car, dynamically adjusting FOV and offset with speed.
 */
export default function ChaseCamera() {
  const { camera } = useThree();
  const currentPos = useRef(new THREE.Vector3(0, 2.6, 18));
  const currentLookAt = useRef(new THREE.Vector3(0, 1.2, 0));

  useFrame(() => {
    const carPos = carState.position;
    const carRot = carState.rotation;
    const speedRatio = Math.abs(carState.speed) / 32;

    // Follow distance expands slightly at high speed for dynamic arcade feel
    const followDist = 8.2 + speedRatio * 2.5;
    const followHeight = 2.4 + speedRatio * 0.6;

    // Calculate ideal camera position behind the car based on car's heading
    const targetCamX = carPos.x + Math.sin(carRot) * followDist;
    const targetCamY = carPos.y + followHeight;
    const targetCamZ = carPos.z + Math.cos(carRot) * followDist;

    // Smooth lerp to target camera position
    currentPos.current.x = THREE.MathUtils.lerp(currentPos.current.x, targetCamX, 0.08);
    currentPos.current.y = THREE.MathUtils.lerp(currentPos.current.y, targetCamY, 0.08);
    currentPos.current.z = THREE.MathUtils.lerp(currentPos.current.z, targetCamZ, 0.08);

    camera.position.copy(currentPos.current);

    // Look at point: ahead of the car down the road
    const targetLookX = carPos.x - Math.sin(carRot) * 12;
    const targetLookY = carPos.y + 1.1;
    const targetLookZ = carPos.z - Math.cos(carRot) * 12;

    currentLookAt.current.x = THREE.MathUtils.lerp(currentLookAt.current.x, targetLookX, 0.1);
    currentLookAt.current.y = THREE.MathUtils.lerp(currentLookAt.current.y, targetLookY, 0.1);
    currentLookAt.current.z = THREE.MathUtils.lerp(currentLookAt.current.z, targetLookZ, 0.1);

    camera.lookAt(currentLookAt.current);
  });

  return null;
}
