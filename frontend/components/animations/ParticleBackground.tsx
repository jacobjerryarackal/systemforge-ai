'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

function ParticleField({ isActive }: { isActive: boolean }) {
  const pointsRef = useRef<THREE.Points>(null);
  const velocitiesRef = useRef<Float32Array | null>(null);
  const originalPositionsRef = useRef<Float32Array | null>(null);

  const count = 1800;

  const { positions, colors } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const velocities = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 2 + Math.random() * 3;

      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);

      velocities[i * 3] = (Math.random() - 0.5) * 0.02;
      velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.02;
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.02;

      // AMD red + cyan mix
      const isRed = Math.random() > 0.6;
      if (isRed) {
        colors[i * 3] = 0.89 + Math.random() * 0.11;
        colors[i * 3 + 1] = 0.03;
        colors[i * 3 + 2] = 0.07;
      } else {
        colors[i * 3] = 0;
        colors[i * 3 + 1] = 0.7 + Math.random() * 0.3;
        colors[i * 3 + 2] = 1;
      }
    }

    velocitiesRef.current = velocities;
    originalPositionsRef.current = positions.slice();
    return { positions, colors };
  }, []);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const time = state.clock.elapsedTime;
    const geo = pointsRef.current.geometry;
    const pos = geo.attributes.position.array as Float32Array;
    const orig = originalPositionsRef.current!;
    const vel = velocitiesRef.current!;

    const explodeStrength = isActive ? 1.0 : 0.0;
    const targetStrength = explodeStrength;

    for (let i = 0; i < count; i++) {
      const ix = i * 3;
      if (isActive) {
        pos[ix] += vel[ix] * (1 + Math.sin(time * 0.5 + i * 0.01) * 0.3);
        pos[ix + 1] += vel[ix + 1] * (1 + Math.cos(time * 0.4 + i * 0.02) * 0.3);
        pos[ix + 2] += vel[ix + 2] * (1 + Math.sin(time * 0.6 + i * 0.015) * 0.3);

        // Clamp explosion radius
        const dist = Math.sqrt(pos[ix] ** 2 + pos[ix + 1] ** 2 + pos[ix + 2] ** 2);
        if (dist > 12) {
          pos[ix] *= 0.98;
          pos[ix + 1] *= 0.98;
          pos[ix + 2] *= 0.98;
        }
      } else {
        // Return to origin
        pos[ix] += (orig[ix] - pos[ix]) * 0.03;
        pos[ix + 1] += (orig[ix + 1] - pos[ix + 1]) * 0.03;
        pos[ix + 2] += (orig[ix + 2] - pos[ix + 2]) * 0.03;
      }
    }
    geo.attributes.position.needsUpdate = true;
    pointsRef.current.rotation.y = time * 0.04;
    pointsRef.current.rotation.x = Math.sin(time * 0.02) * 0.1;
    void targetStrength;
  });

  return (
    <Points ref={pointsRef} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        vertexColors
        size={0.04}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
}

function RingSystem({ isActive }: { isActive: boolean }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    const t = clock.elapsedTime;
    groupRef.current.rotation.x = t * 0.15;
    groupRef.current.rotation.z = t * 0.08;
    const scale = isActive ? 1 + Math.sin(t * 2) * 0.08 : 1;
    groupRef.current.scale.setScalar(scale);
  });

  return (
    <group ref={groupRef}>
      {[2.2, 3.1, 4.0].map((r, i) => (
        <mesh key={i} rotation={[Math.PI / 2 + i * 0.4, 0, i * 0.6]}>
          <torusGeometry args={[r, 0.008, 16, 120]} />
          <meshBasicMaterial
            color={i === 0 ? '#E30913' : i === 1 ? '#00D4FF' : '#FFB800'}
            transparent
            opacity={isActive ? 0.7 : 0.25}
          />
        </mesh>
      ))}
    </group>
  );
}

export default function ParticleBackground({ isActive }: { isActive: boolean }) {
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.3} />
        <ParticleField isActive={isActive} />
        <RingSystem isActive={isActive} />
      </Canvas>
    </div>
  );
}
