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
import ArchitectureScoreCard from '../components/architecture/ArchitectureScoreCard';
import {
  generateWorkflowRedesign,
  downloadArchitectureReport,
} from '../lib/api';
import ReadinessProgress from '../components/architecture/ReadinessProgress';
import InfraCostBreakdown from '../components/architecture/InfraCostBreakdown';
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

  const handleDownloadReport = async () => {
    if (!systemData) {
      alert('Generate architecture first');
      return;
    }

    try {
      const workflowSteps =
        systemData.workflowTransformation.before;

      await downloadArchitectureReport(
        workflowSteps
      );
    } catch (error) {
      console.error(error);
      alert(
        'Failed to download architecture report'
      );
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

          <ArchitectureScoreCard
            metrics={systemData.finalMetrics}
          />

          <ReadinessProgress
            metrics={{
              deploymentReadiness:
                systemData.finalMetrics.deploymentReadiness,
              automationPotential:
                systemData.finalMetrics.automationPotential,
              architectureConfidence:
                systemData.finalMetrics.architectureConfidence,
            }}
          />

          <InfraCostBreakdown />

          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              padding: '40px 0 80px',
            }}
          >
            <button
              onClick={handleDownloadReport}
              style={{
                background: '#2563eb',
                color: 'white',
                border: 'none',
                padding: '16px 32px',
                borderRadius: '12px',
                fontSize: '16px',
                fontWeight: 600,
                cursor: 'pointer',
                boxShadow:
                  '0 10px 30px rgba(37, 99, 235, 0.3)',
              }}
            >
              Download Architecture Report
            </button>
          </div>
        </section>
      )}
    </main>
  );
}