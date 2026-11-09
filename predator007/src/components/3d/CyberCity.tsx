import React, { useMemo } from 'react';
import * as THREE from 'three';

// Helper to create holographic billboard textures
function createBillboardTexture(title: string, subtitle: string, color: string): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    ctx.fillStyle = '#060814';
    ctx.fillRect(0, 0, 512, 256);

    // Glowing border
    ctx.strokeStyle = color;
    ctx.lineWidth = 10;
    ctx.strokeRect(8, 8, 496, 240);

    // Grid pattern
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
    ctx.lineWidth = 1;
    for (let x = 0; x < 512; x += 32) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, 256);
      ctx.stroke();
    }

    // Title Typography
    ctx.fillStyle = '#ffffff';
    ctx.font = '900 38px "Orbitron", "Share Tech Mono", monospace, sans-serif';
    ctx.textAlign = 'center';
    ctx.shadowColor = color;
    ctx.shadowBlur = 20;
    ctx.fillText(title, 256, 110);

    // Subtitle Typography
    ctx.fillStyle = color;
    ctx.font = 'bold 22px "Share Tech Mono", monospace, sans-serif';
    ctx.shadowBlur = 10;
    ctx.fillText(subtitle, 256, 170);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

export default function CyberCity() {
  // Roadside billboards
  const billboards = useMemo(() => {
    return [
      {
        z: -45,
        side: 'left',
        title: 'DARSHAN SP',
        sub: '// PREDATOR007 //',
        color: '#00f2fe',
        tex: createBillboardTexture('DARSHAN SP', '// PREDATOR007 //', '#00f2fe'),
      },
      {
        z: -110,
        side: 'right',
        title: 'AUTONOMOUS AGENTS',
        sub: 'LangGraph • StateGraphs',
        color: '#ff007f',
        tex: createBillboardTexture('AUTONOMOUS AGENTS', 'LangGraph • StateGraphs', '#ff007f'),
      },
      {
        z: -170,
        side: 'left',
        title: 'COMPUTER VISION',
        sub: 'YOLOv8 • Azure GPUs',
        color: '#d946ef',
        tex: createBillboardTexture('COMPUTER VISION', 'YOLOv8 • Azure GPUs', '#d946ef'),
      },
      {
        z: -230,
        side: 'right',
        title: 'HIGH-PERFORMANCE ML',
        sub: 'FastAPI • PyTorch • Chroma',
        color: '#00ff88',
        tex: createBillboardTexture('HIGH-PERFORMANCE ML', 'FastAPI • PyTorch • Chroma', '#00ff88'),
      },
      {
        z: -290,
        side: 'left',
        title: 'VERIFIED CREDENTIALS',
        sub: 'Red Hat RHCSA • Stanford ML',
        color: '#ffbb00',
        tex: createBillboardTexture('VERIFIED CREDENTIALS', 'Red Hat RHCSA • Stanford ML', '#ffbb00'),
      },
    ];
  }, []);

  // Dense skyscraper masses along both sides of highway
  const buildings = useMemo(() => {
    const list = [];
    const countPerSide = 36;

    for (let i = 0; i < countPerSide; i++) {
      const z = 25 - i * 11.5;
      const width = 8 + Math.random() * 8;
      const depth = 9 + Math.random() * 9;
      const height = 24 + Math.random() * 45;

      // Left side buildings
      list.push({
        x: -14 - Math.random() * 12 - width / 2,
        y: height / 2 - 0.5,
        z,
        width,
        height,
        depth,
        color: i % 3 === 0 ? '#ff007f' : i % 3 === 1 ? '#00f2fe' : '#8b5cf6',
      });

      // Right side buildings
      list.push({
        x: 14 + Math.random() * 12 + width / 2,
        y: height / 2 - 0.5,
        z,
        width,
        height,
        depth,
        color: i % 3 === 0 ? '#00f2fe' : i % 3 === 1 ? '#d946ef' : '#ff007f',
      });
    }
    return list;
  }, []);

  return (
    <group>
      {/* ================= ATMOSPHERIC HORIZON NEBULA GLOW (Deep, non-clashing) ================= */}
      <group position={[0, 36, -390]}>
        {/* Soft glowing synthwave crescent high in the distance */}
        <mesh position={[0, 20, 0]}>
          <ringGeometry args={[26, 28, 48]} />
          <meshBasicMaterial color="#00f2fe" transparent opacity={0.35} />
        </mesh>
        <mesh position={[0, 20, -1]}>
          <circleGeometry args={[26, 48]} />
          <meshBasicMaterial color="#1a0b2e" transparent opacity={0.4} />
        </mesh>
      </group>

      {/* ================= HOLOGRAPHIC ROADSIDE BILLBOARDS ================= */}
      {billboards.map((b) => {
        const isLeft = b.side === 'left';
        const posX = isLeft ? -9.2 : 9.2;
        const rotY = isLeft ? 0.25 : -0.25;

        return (
          <group key={b.z} position={[posX, 4.5, b.z]} rotation={[0, rotY, 0]}>
            {/* Billboard Face */}
            <mesh>
              <planeGeometry args={[7.2, 3.6]} />
              <meshBasicMaterial map={b.tex} transparent />
            </mesh>
            {/* Dark Backing Frame */}
            <mesh position={[0, 0, -0.06]}>
              <boxGeometry args={[7.35, 3.75, 0.1]} />
              <meshStandardMaterial color="#05070e" metalness={0.8} />
            </mesh>
            {/* Mounting Steel Pylon */}
            <mesh position={[0, -2.6, -0.06]}>
              <cylinderGeometry args={[0.18, 0.24, 4.2, 8]} />
              <meshStandardMaterial color="#0c101c" metalness={0.9} />
            </mesh>
            {/* Radiant Billboard Ambient Glow */}
            <pointLight position={[0, 0, 1.2]} color={b.color} intensity={3.5} distance={14} />
          </group>
        );
      })}

      {/* ================= CYBERPUNK SKYSCRAPERS ================= */}
      {buildings.map((b, idx) => (
        <group key={idx} position={[b.x, b.y, b.z]}>
          {/* Main Skyscraper Tower */}
          <mesh>
            <boxGeometry args={[b.width, b.height, b.depth]} />
            <meshStandardMaterial
              color="#070a14"
              roughness={0.35}
              metalness={0.7}
            />
          </mesh>

          {/* Front Illuminated Edge Strip */}
          <mesh position={[b.x > 0 ? -b.width / 2 + 0.15 : b.width / 2 - 0.15, 0, b.depth / 2 + 0.05]}>
            <boxGeometry args={[0.3, b.height, 0.15]} />
            <meshStandardMaterial
              color={b.color}
              emissive={b.color}
              emissiveIntensity={3.0}
            />
          </mesh>

          {/* Rooftop Glowing Crown Trim */}
          <mesh position={[0, b.height / 2 + 0.1, 0]}>
            <boxGeometry args={[b.width + 0.2, 0.4, b.depth + 0.2]} />
            <meshStandardMaterial
              color={b.color}
              emissive={b.color}
              emissiveIntensity={2.5}
            />
          </mesh>

          {/* Rooftop Antenna Spire */}
          <mesh position={[0, b.height / 2 + 3.5, 0]}>
            <cylinderGeometry args={[0.08, 0.22, 7, 8]} />
            <meshStandardMaterial color="#1a1c29" metalness={0.9} />
          </mesh>
          {/* Blinking Warning Beacon */}
          <mesh position={[0, b.height / 2 + 7.1, 0]}>
            <sphereGeometry args={[0.25, 8, 8]} />
            <meshStandardMaterial color="#ff0033" emissive="#ff0033" emissiveIntensity={3.5} />
          </mesh>
        </group>
      ))}

      {/* Synthwave Horizon Grid Ground Plane */}
      <mesh position={[0, -0.6, -180]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[350, 520]} />
        <meshStandardMaterial color="#030408" roughness={0.95} />
      </mesh>
    </group>
  );
}