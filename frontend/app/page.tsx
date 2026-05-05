'use client';

import { useState, useCallback, lazy, Suspense } from 'react';
import Header from '@/components/layout/Header';
import HeroSection from '@/components/ui/HeroSection';
import AgentPipeline from '@/components/agents/AgentPipeline';
import { runForgeMock } from '@/lib/api';
import type { AgentOutput } from '@/lib/types';

// Lazy load 3D background to avoid SSR issues
const ParticleBackground = lazy(() => import('@/components/animations/ParticleBackground'));

const INITIAL_OUTPUTS: AgentOutput[] = [
  { agent: 'architect', content: '', status: 'idle' },
  { agent: 'critic', content: '', status: 'idle' },
  { agent: 'refiner', content: '', status: 'idle' },
];

export default function HomePage() {
  const [isRunning, setIsRunning] = useState(false);
  const [outputs, setOutputs] = useState<AgentOutput[]>(INITIAL_OUTPUTS);
  const [isExploding, setIsExploding] = useState(false);

  const updateOutput = useCallback((index: number, patch: Partial<AgentOutput>) => {
    setOutputs((prev) => prev.map((o, i) => (i === index ? { ...o, ...patch } : o)));
  }, []);

  const handleSubmit = useCallback(
    async (description: string) => {
      if (isRunning) return;

      setIsRunning(true);
      setIsExploding(true);
      setOutputs(INITIAL_OUTPUTS);

      // Scroll to pipeline
      setTimeout(() => {
        document.getElementById('pipeline')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 400);

      // Agent 1 — Architect
      updateOutput(0, { status: 'thinking' });
      await delay(300);

      // Agent 2 — Critic starts after short lag
      setTimeout(() => updateOutput(1, { status: 'thinking' }), 2000);

      // Agent 3 — Refiner
      setTimeout(() => updateOutput(2, { status: 'thinking' }), 4000);

      try {
        const response = await runForgeMock(description);
        const { outputs: results } = response.session;

        results.forEach((result, i) => {
          updateOutput(i, result);
        });
      } catch (err) {
        console.error(err);
        outputs.forEach((_, i) => updateOutput(i, { status: 'error', content: String(err) }));
      } finally {
        setIsRunning(false);
        setTimeout(() => setIsExploding(false), 3000);
      }
    },
    [isRunning, updateOutput, outputs]
  );

  const hasOutput = outputs.some((o) => o.status !== 'idle');

  return (
    <main style={{ position: 'relative', minHeight: '100vh' }}>
      {/* 3D Particle Background */}
      <Suspense fallback={null}>
        <ParticleBackground isActive={isExploding} />
      </Suspense>

      {/* Header */}
      <Header />

      {/* Hero + Input */}
      <HeroSection onSubmit={handleSubmit} isRunning={isRunning} />

      {/* Agent Pipeline Output */}
      <div id="pipeline">
        {hasOutput && (
          <AgentPipeline outputs={outputs} isRunning={isRunning} />
        )}
      </div>

      {/* Footer */}
      <footer
        style={{
          position: 'relative',
          zIndex: 10,
          borderTop: '1px solid rgba(255,255,255,0.04)',
          padding: '1.5rem 2rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem',
        }}
      >
        <div
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.6rem',
            color: '#444466',
            letterSpacing: '0.15em',
          }}
        >
          SYSTEMFORGE AI · THE PROMPT ENGINEER · AMD HACKATHON 2024
        </div>
        <div
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.6rem',
            color: '#333355',
            letterSpacing: '0.1em',
          }}
        >
          AMD ROCm · vLLM · Qwen2.5-7B · CrewAI
        </div>
      </footer>
    </main>
  );
}

function delay(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}
