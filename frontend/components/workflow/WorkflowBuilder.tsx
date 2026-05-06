'use client';

import React, { useState } from 'react';
import WorkflowNode from './WorkflowNode';
import type {
    WorkflowStep,
    WorkflowNodeType,
} from './WorkflowTypes';
import {
    EXAMPLE_WORKFLOWS
} from '../../lib/exampleWorkflows';

interface WorkflowBuilderProps {
    onGenerate: (workflowSteps: string[]) => void;
    isRunning: boolean;
}

function createEmptyStep(): WorkflowStep {
    return {
        id: crypto.randomUUID(),
        label: '',
        type: 'task'
    };
}

export default function WorkflowBuilder({
    onGenerate,
    isRunning,
}: WorkflowBuilderProps) {
    const [selectedExample, setSelectedExample] =
        useState('');

    const [workflowSteps, setWorkflowSteps] =
        useState<WorkflowStep[]>([
            createEmptyStep(),
            createEmptyStep(),
            createEmptyStep(),
        ]);

    const updateStep = (
        id: string,
        field: 'label' | 'type' | 'duration',
        value: string
    ) => {
        setWorkflowSteps((prev) =>
            prev.map((step) =>
                step.id === id
                    ? {
                        ...step,
                        [field]:
                            field === 'type'
                                ? (value as WorkflowNodeType)
                                : value,
                    }
                    : step
            )
        );
    };

    const addStep = () => {
        setWorkflowSteps((prev) => [
            ...prev,
            createEmptyStep(),
        ]);
    };

    const removeStep = (id: string) => {
        if (workflowSteps.length <= 1) {
            return;
        }

        setWorkflowSteps((prev) =>
            prev.filter((step) => step.id !== id)
        );
    };

    const handleGenerate = () => {
        const cleanedSteps = workflowSteps
            .map((step) => {
                const typePrefix =
                    step.type !== 'task'
                        ? `[${step.type
                            .replace('_', ' ')
                            .toUpperCase()}] `
                        : '';

                return `${typePrefix}${step.label}`.trim();
            })
            .filter(
                (step) =>
                    step &&
                    step !== '[TASK]' &&
                    step !== ''
            );

        if (cleanedSteps.length === 0) {
            alert(
                'Please build at least one workflow step.'
            );
            return;
        }

        onGenerate(cleanedSteps);
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
            EXAMPLE_WORKFLOWS.find(
                (item) => item.id === selectedId
            );

        if (!selectedWorkflow) {
            return;
        }

        const mappedSteps: WorkflowStep[] =
            selectedWorkflow.before.map(
                (step) => ({
                    id: crypto.randomUUID(),
                    label: step.label,
                    type: step.type,
                })
            );

        setWorkflowSteps(mappedSteps);
    };

    return (
        <section
            style={{
                width: '100%',
                maxWidth: 1200,
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
                    Build Real
                    <br />
                    Operational Workflows
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
                    Create messy real-world workflows
                    using tasks, approvals, decision
                    nodes, APIs, queues, LLM steps,
                    and human review paths like a real
                    enterprise system.
                </p>
            </div>

            {/* Main Builder */}
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
                {/* Example Dropdown */}
                <div
                    style={{
                        marginBottom: '32px',
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

                        {EXAMPLE_WORKFLOWS.map(
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
                                    {workflow.industry}
                                </option>
                            )
                        )}
                    </select>
                </div>

                {/* Workflow Nodes */}
                <div
                    style={{
                        marginBottom: '28px',
                    }}
                >
                    {workflowSteps.map(
                        (step, index) => (
                            <div
                                key={step.id}
                                style={{
                                    position: 'relative',
                                }}
                            >
                                <WorkflowNode
                                    step={step}
                                    index={index}
                                    updateStep={updateStep}
                                    removeStep={removeStep}
                                />
                            </div>
                        )
                    )}
                </div>

                {/* Add Step */}
                <button
                    onClick={addStep}
                    style={{
                        width: '100%',
                        marginBottom: '24px',
                        padding: '16px',
                        borderRadius: '14px',
                        border:
                            '1px dashed rgba(255,255,255,0.12)',
                        background:
                            'rgba(255,255,255,0.02)',
                        color: '#00C8FF',
                        cursor: 'pointer',
                        fontWeight: 600,
                        fontSize: '15px',
                    }}
                >
                    + Add Workflow Step
                </button>

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
