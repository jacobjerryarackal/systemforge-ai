'use client';

export default function ParticleBackground() {
  return (
    <div className="cyber-background">
      <div className="grid-overlay" />
      <div className="glow glow-red" />
      <div className="glow glow-blue" />
      <div className="glow glow-green" />
      <div className="scan-line" />
    </div>
  );
}