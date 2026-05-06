'use client';

import React, { useState } from 'react';
import { EXAMPLE_MESSY_WORKFLOWS } from '../../lib/exampleWorkflows';

interface WorkflowBuilderProps {
    onGenerate: (workflowSteps: string[]) => void;
    isRunning: boolean;
}

export default function WorkflowBuilder({
    onGenerate,
    isRunning,
}: WorkflowBuilderProps) {
    const [workflowText, setWorkflowText] =
        useState('');

    const [selectedExample, setSelectedExample] =
        useState('');

    const handleGenerate = () => {
        const steps = workflowText
            .split('\n')
            .map((step) => step.trim())
            .filter(Boolean);

        if (steps.length === 0) {
            alert(
                'Please enter workflow steps or load an example workflow.'
            );
            return;
        }

        onGenerate(steps);
    };

    const handleExampleChange = (
        e: React.ChangeEvent<HTMLSelectElement>
    ) => {
        const selectedId = e.target.value;
        setSelectedExample(selectedId);

        if (!selectedId) {
            return;
        }

        const selectedWorkflow =
            EXAMPLE_MESSY_WORKFLOWS.find(
                (item) => item.id === selectedId
            );

        if (!selectedWorkflow) {
            return;
        }

        setWorkflowText(
            selectedWorkflow.before.join('\n')
        );
    };

    return (
        <section
            style={{
                width: '100%',
                maxWidth: 1100,
                margin: '0 auto',
                padding: '0 24px',
                position: 'relative',
                zIndex: 10,
            }}
        >
            {/* Header */}
            <div
                style={{
                    textAlign: 'center',
                    marginBottom: '48px',
                }}
            >
                <p
                    style={{
                        fontSize: '13px',
                        letterSpacing: '0.3em',
                        color: '#00C8FF',
                        marginBottom: '16px',
                        fontFamily: 'var(--font-mono)',
                    }}
                >
                    SYSTEMFORGE AI
                </p>

                <h1
                    style={{
                        fontSize:
                            'clamp(2.5rem, 6vw, 5rem)',
                        color: '#F0F0FF',
                        marginBottom: '20px',
                        fontFamily: 'var(--font-display)',
                        lineHeight: 1.1,
                    }}
                >
                    Transform Manual
                    <br />
                    Workflows into
                    <br />
                    AI Systems
                </h1>

                <p
                    style={{
                        maxWidth: 760,
                        margin: '0 auto',
                        color: '#8B8BA7',
                        fontSize: '16px',
                        lineHeight: 1.8,
                    }}
                >
                    Build messy operational workflows,
                    redesign them into production-grade
                    AI-native systems, and generate
                    architecture decisions like a
                    Principal Engineer.
                </p>
            </div>

            {/* Main Card */}
            <div
                style={{
                    border:
                        '1px solid rgba(255,255,255,0.08)',
                    background:
                        'rgba(255,255,255,0.02)',
                    borderRadius: 20,
                    padding: '32px',
                    backdropFilter: 'blur(10px)',
                }}
            >
                {/* Example Workflow Dropdown */}
                <div
                    style={{
                        marginBottom: '28px',
                    }}
                >
                    <label
                        style={{
                            display: 'block',
                            marginBottom: '12px',
                            color: '#F0F0FF',
                            fontWeight: 600,
                            fontSize: '15px',
                        }}
                    >
                        Load Example Workflow
                    </label>

                    <select
                        value={selectedExample}
                        onChange={handleExampleChange}
                        style={{
                            width: '100%',
                            padding: '16px',
                            borderRadius: '12px',
                            border:
                                '1px solid rgba(255,255,255,0.08)',
                            background:
                                'rgba(255,255,255,0.03)',
                            color: '#F0F0FF',
                            fontSize: '15px',
                            outline: 'none',
                        }}
                    >
                        <option value="">
                            Select an example workflow
                        </option>

                        {EXAMPLE_MESSY_WORKFLOWS.map(
                            (workflow) => (
                                <option
                                    key={workflow.id}
                                    value={workflow.id}
                                    style={{
                                        background: '#111827',
                                        color: '#ffffff',
                                    }}
                                >
                                    {workflow.title} —{' '}
                                    {workflow.category}
                                </option>
                            )
                        )}
                    </select>
                </div>

                {/* Manual Workflow Input */}
                <div
                    style={{
                        marginBottom: '28px',
                    }}
                >
                    <label
                        style={{
                            display: 'block',
                            marginBottom: '12px',
                            color: '#F0F0FF',
                            fontWeight: 600,
                            fontSize: '15px',
                        }}
                    >
                        Build Your Workflow
                    </label>

                    <textarea
                        value={workflowText}
                        onChange={(e) =>
                            setWorkflowText(e.target.value)
                        }
                        placeholder={`Example:
Orders come from Shopify
Team manually updates inventory in Excel
Slack message sent to warehouse
Warehouse updates delivery status manually
Customer support manually handles delays`}
                        rows={10}
                        style={{
                            width: '100%',
                            padding: '18px',
                            borderRadius: '14px',
                            border:
                                '1px solid rgba(255,255,255,0.08)',
                            background:
                                'rgba(255,255,255,0.03)',
                            color: '#F0F0FF',
                            fontSize: '15px',
                            lineHeight: 1.8,
                            resize: 'vertical',
                            outline: 'none',
                        }}
                    />
                </div>

                {/* Helper Text */}
                <div
                    style={{
                        marginBottom: '28px',
                        color: '#8B8BA7',
                        fontSize: '14px',
                        lineHeight: 1.7,
                    }}
                >
                    One workflow step per line.
                    <br />
                    Add approvals, decision points,
                    escalations, manual checks, delays,
                    and bottlenecks exactly like real
                    operations.
                </div>

                {/* Generate Button */}
                <button
                    onClick={handleGenerate}
                    disabled={isRunning}
                    style={{
                        width: '100%',
                        padding: '18px',
                        borderRadius: '14px',
                        border: 'none',
                        cursor: isRunning
                            ? 'not-allowed'
                            : 'pointer',
                        background: isRunning
                            ? 'rgba(255,255,255,0.08)'
                            : 'linear-gradient(90deg, #2563eb, #1d4ed8)',
                        color: '#ffffff',
                        fontSize: '16px',
                        fontWeight: 700,
                        transition: '0.3s ease',
                        opacity: isRunning ? 0.7 : 1,
                    }}
                >
                    {isRunning
                        ? 'Generating Architecture...'
                        : 'Generate System Redesign'}
                </button>
            </div>
        </section>
    );
}
