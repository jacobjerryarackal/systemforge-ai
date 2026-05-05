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

import { generateWorkflowRedesign } from '../lib/api';
import type { SystemForgeResponse } from '../lib/types';

export default function HomePage() {
  const [loading, setLoading] = useState(false);
  const [systemData, setSystemData] =
    useState<SystemForgeResponse | null>(null);

  const handleGenerate = async (
    workflowSteps: string[]
  ) => {
    try {
      setLoading(true);

      const result =
        await generateWorkflowRedesign(
          workflowSteps
        );

      setSystemData(result);

      setTimeout(() => {
        document
          .getElementById('results')
          ?.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          });
      }, 400);
    } catch (error) {
      console.error(error);
      alert(
        'Failed to generate workflow redesign'
      );
    } finally {
      setLoading(false);
    }
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
      <ParticleBackground />

      <Navbar />

      <section
        style={{
          position: 'relative',
          zIndex: 10,
          paddingTop: '120px',
          paddingBottom: '80px',
        }}
      >
        <WorkflowBuilder
          onGenerate={handleGenerate}
          isRunning={loading}
        />
      </section>

      {systemData && (
        <section id="results">
          <BeforeAfterWorkflow
            data={
              systemData.workflowTransformation
            }
          />

          <WorkflowComparison
            data={systemData}
          />

          <AgentDecisionPanel
            architect={systemData.architect}
            critic={systemData.critic}
            refiner={systemData.refiner}
          />

          <FinalArchitectureBlueprint
            layers={
              systemData.architectureLayers
            }
          />

          <ArchitectureSummary
            metrics={
              systemData.finalMetrics
            }
          />
        </section>
      )}
    </main>
  );
}
