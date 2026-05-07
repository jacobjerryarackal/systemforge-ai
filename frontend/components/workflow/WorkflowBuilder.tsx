// components/workflow/WorkflowBuilder.tsx

'use client';

import React, { useState } from 'react';
import { EXAMPLE_WORKFLOWS } from '../../lib/exampleWorkflows';

interface Props {
    onGenerate: (workflowSteps: string[]) => void;
    isRunning: boolean;
    onWorkflowSelect: (workflowId: string) => void;
}

export default function WorkflowBuilder({
    onGenerate,
    isRunning,
    onWorkflowSelect,
}: Props) {
    /*
      IMPORTANT FLOW:
  
      - DO NOT preload insurance claims automatically
      - Start with user-editable workflow inputs
      - User can type their own workflow
      - OR user can load from example workflow dropdown later
      - Generate only on button click
    */

    const [steps, setSteps] = useState([
        '',
        '',
        '',
    ]);

    const [selectedExample, setSelectedExample] =
        useState('');

    const handleStepChange = (
        index: number,
        value: string
    ) => {
        const updated = [...steps];
        updated[index] = value;
        setSteps(updated);
    };

    const handleAddStep = () => {
        setSteps([...steps, '']);
    };

    const handleRemoveStep = (index: number) => {
        const updated = [...steps];
        updated.splice(index, 1);
        setSteps(updated);
    };

    const handleGenerate = () => {
        const cleanedSteps = steps
            .map((step) => step.trim())
            .filter(Boolean);

        if (!cleanedSteps.length) {
            alert('Please add at least one workflow step');
            return;
        }

        /*
          Only if user selected example workflow,
          we update selected workflow.
    
          If user created custom workflow,
          LLM should redesign THAT workflow.
        */

        if (selectedExample) {
            onWorkflowSelect(selectedExample);
        }

        onGenerate(cleanedSteps);
    };

    const handleLoadExample = (
        workflowId: string
    ) => {
        setSelectedExample(workflowId);

        const selected =
            EXAMPLE_WORKFLOWS.find(
                (workflow) => workflow.id === workflowId
            );

        if (!selected) return;

        setSteps(
            selected.before.map(
                (step) => step.label
            )
        );
    };

    return (
        <section
            style={{
                maxWidth: '1300px',
                margin: '0 auto',
                padding: '80px 24px',
                position: 'relative',
                zIndex: 10,
            }}
        >
            {/* MAIN CARD */}
            <div
                style={{
                    border:
                        '1px solid rgba(255,255,255,0.08)',
                    borderRadius: '18px',
                    padding: '40px',
                    background:
                        'rgba(3, 6, 18, 0.85)',
                    backdropFilter: 'blur(14px)',
                }}
            >
                {/* TOP LABEL */}
                <div
                    style={{
                        color: '#ff2d2d',
                        fontSize: '12px',
                        letterSpacing: '4px',
                        textTransform: 'uppercase',
                        marginBottom: '18px',
                        fontWeight: 600,
                    }}
                >
                    WORKFLOW_INPUT
                </div>

                {/* TITLE */}
                <h2
                    style={{
                        fontSize: '52px',
                        lineHeight: 1.1,
                        color: '#f8fafc',
                        margin: 0,
                        marginBottom: '18px',
                        fontWeight: 800,
                    }}
                >
                    Map Your Current Workflow
                </h2>

                {/* SUBTEXT */}
                <p
                    style={{
                        color: '#94a3b8',
                        fontSize: '20px',
                        lineHeight: 1.8,
                        maxWidth: '1000px',
                        marginBottom: '42px',
                    }}
                >
                    Add your messy operational process —
                    approvals, spreadsheets, manual
                    handoffs, broken workflows, or
                    disconnected systems. SystemForge
                    will redesign it into a scalable
                    production-grade AI workflow.
                </p>

                {/* OPTIONAL EXAMPLE LOADER */}
                <div
                    style={{
                        marginBottom: '28px',
                    }}
                >
                    <select
                        value={selectedExample}
                        onChange={(e) =>
                            handleLoadExample(
                                e.target.value
                            )
                        }
                        style={{
                            width: '100%',
                            height: '54px',
                            background: '#050816',
                            border:
                                '1px solid rgba(255,255,255,0.08)',
                            borderRadius: '10px',
                            color: '#fff',
                            padding: '0 16px',
                            fontSize: '15px',
                            outline: 'none',
                        }}
                    >
                        <option value="">
                            Load Example Workflow
                        </option>

                        {EXAMPLE_WORKFLOWS.map(
                            (workflow) => (
                                <option
                                    key={workflow.id}
                                    value={workflow.id}
                                >
                                    {workflow.title} —{' '}
                                    {workflow.industry}
                                </option>
                            )
                        )}
                    </select>
                </div>

                {/* WORKFLOW STEPS */}
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '18px',
                    }}
                >
                    {steps.map((step, index) => (
                        <div
                            key={index}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '16px',
                            }}
                        >
                            {/* STEP NUMBER */}
                            <div
                                style={{
                                    width: '42px',
                                    minWidth: '42px',
                                    color: '#00d4ff',
                                    fontWeight: 700,
                                    fontSize: '18px',
                                }}
                            >
                                {String(index + 1).padStart(
                                    2,
                                    '0'
                                )}
                            </div>

                            {/* INPUT */}
                            <input
                                value={step}
                                onChange={(e) =>
                                    handleStepChange(
                                        index,
                                        e.target.value
                                    )
                                }
                                placeholder={
                                    index === 0
                                        ? 'Step 1: What triggers your workflow?'
                                        : index === 1
                                            ? 'Step 2: What happens next?'
                                            : index === 2
                                                ? 'Step 3: Who approves or decides?'
                                                : `Step ${index + 1}: Add workflow step`
                                }
                                style={{
                                    flex: 1,
                                    height: '52px',
                                    background: '#050816',
                                    border:
                                        '1px solid rgba(255,255,255,0.08)',
                                    borderRadius: '8px',
                                    padding: '0 16px',
                                    color: '#ffffff',
                                    fontSize: '16px',
                                    outline: 'none',
                                }}
                            />

                            {/* REMOVE */}
                            <button
                                onClick={() =>
                                    handleRemoveStep(index)
                                }
                                style={{
                                    background: 'transparent',
                                    border: 'none',
                                    color: '#64748b',
                                    fontSize: '24px',
                                    cursor: 'pointer',
                                }}
                            >
                                →
                            </button>
                        </div>
                    ))}
                </div>

                {/* ADD STEP */}
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        marginTop: '34px',
                        marginBottom: '42px',
                    }}
                >
                    <button
                        onClick={handleAddStep}
                        style={{
                            background: 'transparent',
                            border:
                                '1px solid rgba(0,212,255,0.25)',
                            borderRadius: '10px',
                            padding: '14px 34px',
                            color: '#00d4ff',
                            fontSize: '22px',
                            fontWeight: 600,
                            cursor: 'pointer',
                        }}
                    >
                        + Add Workflow Step
                    </button>
                </div>

                {/* GENERATE BUTTON */}
                <button
                    onClick={handleGenerate}
                    disabled={isRunning}
                    style={{
                        width: '100%',
                        height: '70px',
                        border: 'none',
                        borderRadius: '8px',
                        background:
                            isRunning
                                ? '#334155'
                                : '#ff1111',
                        color: '#fff',
                        fontSize: '24px',
                        fontWeight: 800,
                        letterSpacing: '1px',
                        cursor: isRunning
                            ? 'not-allowed'
                            : 'pointer',
                        boxShadow:
                            '0 0 30px rgba(255,0,0,0.18)',
                    }}
                >
                    {isRunning
                        ? 'GENERATING...'
                        : '⚡ GENERATE PRODUCTION ARCHITECTURE →'}
                </button>
            </div>
        </section>
    );
}