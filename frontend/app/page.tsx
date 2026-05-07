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

import { EXAMPLE_WORKFLOWS } from '../lib/exampleWorkflows';
import {
  generateWorkflowRedesign,
  downloadArchitectureReport,
} from '../lib/api';

import type { SystemForgeResponse } from '../lib/types';

export default function HomePage() {
  const [loading, setLoading] = useState(false);

  const [systemData, setSystemData] =
    useState<SystemForgeResponse | null>(null);

  const [selectedWorkflow, setSelectedWorkflow] =
    useState<typeof EXAMPLE_WORKFLOWS[0] | null>(null);

  // generate LLM redesign
  const handleGenerate = async (
    workflowSteps: string[]
  ) => {
    try {
      setLoading(true);
      console.log("Sending steps:", workflowSteps);
      const result =
        await generateWorkflowRedesign(
          workflowSteps
        );
      console.log("API Result:", result);
      setSystemData(result);
      console.log("Received result:", result);
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

  const workflowToRender =
    systemData?.workflowTransformation
      ? {
        before: selectedWorkflow
          ? selectedWorkflow.before.map(step => step.label)
          : systemData.workflowTransformation.before,

        after: selectedWorkflow
          ? selectedWorkflow.after.map(step => step.label)
          : systemData.workflowTransformation.after,
      }
      : null;

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
          {workflowToRender && (
            <BeforeAfterWorkflow
              data={workflowToRender}
            />
          )}

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

          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              padding: '50px 0 100px',
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