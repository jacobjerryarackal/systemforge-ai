'use client';

import React, { useState } from 'react';
import { EXAMPLE_WORKFLOWS } from '../../lib/exampleWorkflows';
import { WorkflowNodeType, WorkflowStep } from './WorkflowTypes';

interface WorkflowBuilderProps {
    onGenerate: (workflowSteps: string[]) => void;
    isRunning: boolean;
    onWorkflowSelect: (workflowId: string | null) => void;
    onWorkflowChange: () => void;
}

const STEP_TYPES = [
    { value: 'input', label: 'Input', icon: '📥' },
    { value: 'task', label: 'Task', icon: '⚙️' },
    { value: 'decision', label: 'Decision', icon: '🔀' },
    { value: 'automation', label: 'Automation', icon: '🤖' },
    { value: 'approval', label: 'Approval', icon: '✅' },
    { value: 'output', label: 'Output', icon: '📤' },
    { value: 'api', label: 'API', icon: '🔌' },
    { value: 'queue', label: 'Queue', icon: '📬' },
    { value: 'llm', label: 'LLM', icon: '🧠' },
    {
        value: 'human_review',
        label: 'Human Review',
        icon: '👤',
    },
    {
        value: 'notification',
        label: 'Notification',
        icon: '🔔',
    },
];

const DEFAULT_STEPS: WorkflowStep[] = [
    {
        id: '1',
        type: 'input',
        label: '',
    },
    {
        id: '2',
        type: 'task',
        label: '',
    },
    {
        id: '3',
        type: 'decision',
        label: '',
    },
];

export default function WorkflowBuilder({
    onGenerate,
    isRunning,
    onWorkflowSelect,
    onWorkflowChange,
}: WorkflowBuilderProps) {
    const [selectedExample, setSelectedExample] =
        useState('');

    const [workflowSteps, setWorkflowSteps] =
        useState<WorkflowStep[]>(DEFAULT_STEPS);

    const placeholders = [
        'Step 1: What triggers your workflow?',
        'Step 2: What happens next?',
        'Step 3: Who approves or decides?',
    ];

    const handleExampleChange = (
        e: React.ChangeEvent<HTMLSelectElement>
    ) => {
        const workflowId = e.target.value;

        setSelectedExample(workflowId);

        // reset old results
        onWorkflowChange();

        if (!workflowId) {
            onWorkflowSelect(null);
            setWorkflowSteps(DEFAULT_STEPS);
            return;
        }

        onWorkflowSelect(workflowId);

        const selectedWorkflow =
            EXAMPLE_WORKFLOWS.find(
                (workflow) =>
                    workflow.id === workflowId
            );

        if (selectedWorkflow) {
            setWorkflowSteps(
                selectedWorkflow.before.map(
                    (step) => ({
                        id: step.id,
                        type: step.type,
                        label: step.label,
                    })
                )
            );
        }
    };

    const clearExampleWorkflow = () => {
        setSelectedExample('');

        // reset old results
        onWorkflowChange();

        onWorkflowSelect(null);
        setWorkflowSteps(DEFAULT_STEPS);
    };

    const updateStepLabel = (
        id: string,
        value: string
    ) => {
        onWorkflowChange();

        setWorkflowSteps((prev) =>
            prev.map((step) =>
                step.id === id
                    ? {
                        ...step,
                        label: value,
                    }
                    : step
            )
        );
    };

    const updateStepType = (
        id: string,
        type: WorkflowNodeType
    ) => {
        onWorkflowChange();

        setWorkflowSteps((prev) =>
            prev.map((step) =>
                step.id === id
                    ? {
                        ...step,
                        type,
                    }
                    : step
            )
        );
    };

    const addWorkflowStep = () => {
        onWorkflowChange();

        setWorkflowSteps((prev) => [
            ...prev,
            {
                id: Date.now().toString(),
                type: 'task',
                label: '',
            },
        ]);
    };

    const removeStep = (id: string) => {
        if (workflowSteps.length <= 1) return;

        onWorkflowChange();

        setWorkflowSteps((prev) =>
            prev.filter(
                (step) => step.id !== id
            )
        );
    };

    const handleGenerate = () => {
        const cleanedSteps = workflowSteps
            .map((step) => step.label.trim())
            .filter(Boolean);

        if (cleanedSteps.length === 0) {
            alert(
                'Please add at least one workflow step'
            );
            return;
        }

        onGenerate(cleanedSteps);
    };

    return (
        <section
            style={{
                maxWidth: '1400px',
                margin: '0 auto',
                padding: '40px',
                border:
                    '1px solid rgba(255,255,255,0.08)',
                borderRadius: '24px',
                background:
                    'rgba(5, 8, 22, 0.85)',
                backdropFilter: 'blur(10px)',
            }}
        >
            <div
                style={{
                    fontSize: '56px',
                    fontWeight: 800,
                    marginBottom: '20px',
                    color: '#f8fafc',
                }}
            >
                Map Your Current Workflow
            </div>

            <p
                style={{
                    fontSize: '18px',
                    lineHeight: 1.8,
                    color: '#94a3b8',
                    marginBottom: '40px',
                    maxWidth: '1000px',
                }}
            >
                Add your messy operational
                process — approvals,
                spreadsheets, manual
                handoffs, broken workflows,
                or disconnected systems.
                SystemForge will redesign it
                into a scalable
                production-grade AI workflow.
            </p>

            {/* Example Workflow Dropdown */}
            <div
                style={{
                    marginBottom: '28px',
                }}
            >
                <select
                    value={selectedExample}
                    onChange={
                        handleExampleChange
                    }
                    style={{
                        width: '100%',
                        padding: '20px',
                        borderRadius: '14px',
                        background: '#050816',
                        color: '#fff',
                        border:
                            '1px solid rgba(255,255,255,0.08)',
                        fontSize: '18px',
                        outline: 'none',
                    }}
                >
                    <option value="">
                        Load Example Workflow
                    </option>

                    {EXAMPLE_WORKFLOWS.map(
                        (workflow) => (
                            <option
                                key={
                                    workflow.id
                                }
                                value={
                                    workflow.id
                                }
                            >
                                {
                                    workflow.title
                                }{' '}
                                —{' '}
                                {
                                    workflow.industry
                                }
                            </option>
                        )
                    )}
                </select>

                {selectedExample && (
                    <button
                        onClick={
                            clearExampleWorkflow
                        }
                        style={{
                            marginTop: '14px',
                            background:
                                'transparent',
                            border:
                                '1px solid #ef4444',
                            color:
                                '#ef4444',
                            padding:
                                '10px 18px',
                            borderRadius:
                                '10px',
                            cursor:
                                'pointer',
                            fontWeight: 600,
                        }}
                    >
                        Clear Example
                        Workflow
                    </button>
                )}
            </div>

            {/* Workflow Steps */}
            <div
                style={{
                    display: 'flex',
                    flexDirection:
                        'column',
                    gap: '22px',
                }}
            >
                {workflowSteps.map(
                    (step, index) => (
                        <div
                            key={step.id}
                            style={{
                                display:
                                    'flex',
                                gap: '14px',
                                alignItems:
                                    'center',
                            }}
                        >
                            {/* Step Number */}
                            <div
                                style={{
                                    minWidth:
                                        '60px',
                                    fontSize:
                                        '28px',
                                    fontWeight: 700,
                                    color:
                                        '#00d4ff',
                                }}
                            >
                                {String(
                                    index + 1
                                ).padStart(
                                    2,
                                    '0'
                                )}
                            </div>

                            {/* Step Type */}
                            <select
                                value={
                                    step.type
                                }
                                onChange={(
                                    e
                                ) =>
                                    updateStepType(
                                        step.id,
                                        e
                                            .target
                                            .value as WorkflowNodeType
                                    )
                                }
                                style={{
                                    width:
                                        '220px',
                                    padding:
                                        '16px',
                                    borderRadius:
                                        '12px',
                                    background:
                                        '#050816',
                                    color:
                                        '#fff',
                                    border:
                                        '1px solid rgba(255,255,255,0.08)',
                                    fontSize:
                                        '15px',
                                }}
                            >
                                {STEP_TYPES.map(
                                    (
                                        type
                                    ) => (
                                        <option
                                            key={
                                                type.value
                                            }
                                            value={
                                                type.value
                                            }
                                        >
                                            {
                                                type.icon
                                            }{' '}
                                            {
                                                type.label
                                            }
                                        </option>
                                    )
                                )}
                            </select>

                            {/* Step Input */}
                            <input
                                type="text"
                                value={
                                    step.label
                                }
                                onChange={(
                                    e
                                ) =>
                                    updateStepLabel(
                                        step.id,
                                        e
                                            .target
                                            .value
                                    )
                                }
                                placeholder={
                                    placeholders[
                                    index
                                    ] ||
                                    `Step ${index + 1}`
                                }
                                style={{
                                    flex: 1,
                                    padding:
                                        '18px 20px',
                                    borderRadius:
                                        '12px',
                                    background:
                                        '#050816',
                                    color:
                                        '#fff',
                                    border:
                                        '1px solid rgba(255,255,255,0.08)',
                                    fontSize:
                                        '18px',
                                    outline:
                                        'none',
                                }}
                            />

                            {/* Remove Button */}
                            <button
                                onClick={() =>
                                    removeStep(
                                        step.id
                                    )
                                }
                                style={{
                                    background:
                                        'transparent',
                                    border:
                                        '1px solid #ef4444',
                                    color:
                                        '#ef4444',
                                    padding:
                                        '10px 18px',
                                    borderRadius:
                                        '10px',
                                    cursor:
                                        'pointer',
                                    fontWeight: 700,
                                }}
                            >
                                Remove
                            </button>
                        </div>
                    )
                )}
            </div>

            {/* Add Step */}
            <div
                style={{
                    display: 'flex',
                    justifyContent:
                        'center',
                    marginTop: '34px',
                }}
            >
                <button
                    onClick={addWorkflowStep}
                    style={{
                        background:
                            'transparent',
                        border:
                            '1px solid #00d4ff',
                        color: '#00d4ff',
                        padding:
                            '18px 32px',
                        borderRadius:
                            '14px',
                        cursor:
                            'pointer',
                        fontWeight: 700,
                        fontSize: '16px',
                    }}
                >
                    + Add Workflow Step
                </button>
            </div>

            {/* Generate Button */}
            <button
                onClick={handleGenerate}
                disabled={isRunning}
                style={{
                    background:
                        'linear-gradient(90deg, #dc2626, #ef4444)',
                    color: '#fff',
                    border: 'none',
                    padding:
                        '18px 32px',
                    borderRadius:
                        '14px',
                    fontSize: '16px',
                    fontWeight: 700,
                    cursor:
                        'pointer',
                    width: 'fit-content',
                    minWidth: '360px',
                    margin:
                        '42px auto 0',
                    display: 'block',
                    boxShadow:
                        '0 10px 30px rgba(239,68,68,0.20)',
                    opacity:
                        isRunning
                            ? 0.7
                            : 1,
                }}
            >
                {isRunning
                    ? 'Generating...'
                    : '⚡ Generate Production Architecture'}
            </button>
        </section>
    );
}
