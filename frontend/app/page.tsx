'use client';

import React, { useState } from 'react';

import Navbar from '../components/ui/Navbar';

import WorkflowBuilder from '../components/workflow/WorkflowBuilder';
import BeforeAfterWorkflow from '../components/workflow/BeforeAfterWorkflow';
import WorkflowComparison from '../components/workflow/WorkflowComparison';

import AgentDecisionPanel from '../components/agents/AgentDecisionPanel';

import FinalArchitectureBlueprint from '../components/architecture/FinalArchitectureBlueprint';
import ArchitectureSummary from '../components/architecture/ArchitectureSummary';

import ParticleBackground from '../components/animations/ParticleBackground';

export default function HomePage() {
  const [generated, setGenerated] = useState(false);
  const [workflowSteps, setWorkflowSteps] = useState<string[]>([]);

  const handleGenerate = (steps: string[]) => {
    setWorkflowSteps(steps);
    setGenerated(true);

    setTimeout(() => {
      document
        .getElementById('redesign-results')
        ?.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
    }, 400);
  };

  return (
    <main
      style={{
        minHeight: '100vh',
        background: '#03040a',
        position: 'relative',
        overflowX: 'hidden',
      }}
    >
      {/* Optional animated cyber background */}
      <ParticleBackground />

      {/* Top Navbar */}
      <Navbar />

      {/* HERO + WORKFLOW INPUT */}
      <section
        style={{
          position: 'relative',
          zIndex: 10,
          paddingTop: '120px',
          paddingBottom: '80px',
        }}
      >
        <WorkflowBuilder onGenerate={handleGenerate} />
      </section>

      {/* RESULTS */}
      {generated && (
        <section
          id="redesign-results"
          style={{
            position: 'relative',
            zIndex: 10,
            padding: '0 0 100px',
          }}
        >
          {/* BEFORE → AFTER FLOW */}
          <BeforeAfterWorkflow workflowSteps={workflowSteps} />

          {/* COMPARISON BLOCK */}
          <WorkflowComparison />

          {/* AGENT REASONING */}
          <AgentDecisionPanel />

          {/* FINAL BLUEPRINT */}
          <FinalArchitectureBlueprint />

          {/* FINAL SUMMARY */}
          <ArchitectureSummary />
        </section>
      )}

      {/* FOOTER */}
      <footer
        style={{
          position: 'relative',
          zIndex: 10,
          borderTop: '1px solid rgba(255,255,255,0.05)',
          padding: '28px 32px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px',
          marginTop: '40px',
        }}
      >
        <div
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.68rem',
            color: '#666680',
            letterSpacing: '0.12em',
          }}
        >
          SYSTEMFORGE · AI WORKFLOW REDESIGN ENGINE
        </div>

        <div
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.68rem',
            color: '#555570',
            letterSpacing: '0.12em',
          }}
        >
          Powered by AMD ROCm · Qwen 2.5 · vLLM · CrewAI
        </div>
      </footer>
    </main>
  );
}