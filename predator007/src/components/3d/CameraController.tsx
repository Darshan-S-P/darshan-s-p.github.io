import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * Camera controller providing subtle cinematic mouse parallax
 */
export default function CameraController() {
  const { camera } = useThree();

  useFrame((state) => {
    const { pointer } = state;
    // Base camera position: parked behind the car
    const targetX = pointer.x * 0.8;
    const targetY = 1.2 + pointer.y * 0.4;
    const targetZ = 6.2;

    camera.position.x = THREE.MathUtils.lerp(camera.position.x, targetX, 0.05);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetY, 0.05);
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetZ, 0.05);

    // Look slightly above the car towards the neon city horizon
    camera.lookAt(0, 0.8, 0);
  });

  return null;
}
