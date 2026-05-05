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

    const { positions } = useMemo(() => {
        const positions = new Float32Array(count * 3);
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
        }

        velocitiesRef.current = velocities;
        originalPositionsRef.current = positions.slice();

        return { positions };
    }, []);

    useFrame((state) => {
        if (!pointsRef.current) return;

        const time = state.clock.elapsedTime;
        const geometry = pointsRef.current.geometry;
        const pos = geometry.attributes.position.array as Float32Array;

        const original = originalPositionsRef.current!;
        const velocity = velocitiesRef.current!;

        for (let i = 0; i < count; i++) {
            const index = i * 3;

            if (isActive) {
                pos[index] +=
                    velocity[index] *
                    (1 + Math.sin(time * 0.5 + i * 0.01) * 0.3);

                pos[index + 1] +=
                    velocity[index + 1] *
                    (1 + Math.cos(time * 0.4 + i * 0.02) * 0.3);

                pos[index + 2] +=
                    velocity[index + 2] *
                    (1 + Math.sin(time * 0.6 + i * 0.015) * 0.3);

                const distance = Math.sqrt(
                    pos[index] ** 2 +
                    pos[index + 1] ** 2 +
                    pos[index + 2] ** 2
                );

                if (distance > 12) {
                    pos[index] *= 0.98;
                    pos[index + 1] *= 0.98;
                    pos[index + 2] *= 0.98;
                }
            } else {
                pos[index] += (original[index] - pos[index]) * 0.03;
                pos[index + 1] +=
                    (original[index + 1] - pos[index + 1]) * 0.03;
                pos[index + 2] +=
                    (original[index + 2] - pos[index + 2]) * 0.03;
            }
        }

        geometry.attributes.position.needsUpdate = true;

        pointsRef.current.rotation.y = time * 0.04;
        pointsRef.current.rotation.x = Math.sin(time * 0.02) * 0.1;
    });

    return (
        <Points
            ref={pointsRef}
            positions={positions}
            stride={3}
            frustumCulled={false}
        >
            <PointMaterial
                transparent
                color="#00D4FF"
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

        const time = clock.elapsedTime;

        groupRef.current.rotation.x = time * 0.15;
        groupRef.current.rotation.z = time * 0.08;

        const scale = isActive
            ? 1 + Math.sin(time * 2) * 0.08
            : 1;

        groupRef.current.scale.setScalar(scale);
    });

    return (
        <group ref={groupRef}>
            {[2.2, 3.1, 4.0].map((radius, index) => (
                <mesh
                    key={index}
                    rotation={[
                        Math.PI / 2 + index * 0.4,
                        0,
                        index * 0.6,
                    ]}
                >
                    <torusGeometry args={[radius, 0.008, 16, 120]} />
                    <meshBasicMaterial
                        color={
                            index === 0
                                ? '#E30913'
                                : index === 1
                                    ? '#00D4FF'
                                    : '#FFB800'
                        }
                        transparent
                        opacity={isActive ? 0.7 : 0.25}
                    />
                </mesh>
            ))}
        </group>
    );
}

export default function ParticleCanvas({
    isActive,
}: {
    isActive: boolean;
}) {
    return (
        <Canvas
            camera={{
                position: [0, 0, 8],
                fov: 60,
            }}
            gl={{
                antialias: true,
                alpha: true,
            }}
            style={{
                background: 'transparent',
            }}
        >
            <ambientLight intensity={0.3} />

            <ParticleField isActive={isActive} />

            <RingSystem isActive={isActive} />
        </Canvas>
    );
}
