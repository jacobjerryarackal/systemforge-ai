'use client';

import dynamic from 'next/dynamic';

const ParticleCanvas = dynamic(
  () => import('./ParticleCanvas'),
  {
    ssr: false,
  }
);

export default function ParticleBackground({
  isActive,
}: {
  isActive: boolean;
}) {
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
      }}
    >
      <ParticleCanvas isActive={isActive} />
    </div>
  );
}