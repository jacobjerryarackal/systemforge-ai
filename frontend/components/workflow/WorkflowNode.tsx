'use client';

import React from 'react';
import { motion } from 'framer-motion';
import type {
    WorkflowStep,
    WorkflowNodeType,
} from './WorkflowTypes';

interface Props {
    step: WorkflowStep;
    index: number;
    updateStep: (
        id: string,
        field: 'label' | 'type' | 'duration',
        value: string
    ) => void;
}

const NODE_TYPE_OPTIONS: {
    value: WorkflowNodeType;
    label: string;
    icon: string;
}[] = [
        {
            value: 'task',
            label: 'Task',
            icon: '□',
        },
        {
            value: 'decision',
            label: 'Decision',
            icon: '◇',
        },
        {
            value: 'approval',
            label: 'Approval',
            icon: '✓',
        },
        {
            value: 'api',
            label: 'API',
            icon: '⚡',
        },
        {
            value: 'queue',
            label: 'Queue',
            icon: '⇄',
        },
        {
            value: 'llm',
            label: 'LLM',
            icon: '🤖',
        },
        {
            value: 'human_review',
            label: 'Human Review',
            icon: '🧑',
        },
        {
            value: 'notification',
            label: 'Notification',
            icon: '📩',
        },
    ];

function getNodeAccent(
    type: WorkflowNodeType
) {
    switch (type) {
        case 'decision':
            return '#F59E0B';

        case 'approval':
            return '#22C55E';

        case 'api':
            return '#3B82F6';

        case 'queue':
            return '#8B5CF6';

        case 'llm':
            return '#EC4899';

        case 'human_review':
            return '#F97316';

        case 'notification':
            return '#06B6D4';

        default:
            return '#00D4FF';
    }
}

export default function WorkflowNode({
    step,
    index,
    updateStep,
}: Props) {
    const accent = getNodeAccent(step.type);

    return (
        <motion.div
            initial={{
                opacity: 0,
                y: 20,
            }}
            animate={{
                opacity: 1,
                y: 0,
            }}
            transition={{
                duration: 0.35,
            }}
            style={{
                border: `1px solid ${accent}20`,
                background:
                    'rgba(255,255,255,0.02)',
                borderRadius: 18,
                padding: '20px',
                marginBottom: '18px',
                backdropFilter: 'blur(8px)',
            }}
        >
            {/* Top Row */}
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '14px',
                    marginBottom: '18px',
                }}
            >
                {/* Step Number */}
                <div
                    style={{
                        minWidth: 52,
                        height: 52,
                        borderRadius: 12,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        border: `1px solid ${accent}30`,
                        background: `${accent}08`,
                        color: accent,
                        fontFamily:
                            'var(--font-mono)',
                        fontSize: '0.8rem',
                        letterSpacing: '0.12em',
                    }}
                >
                    {String(index + 1).padStart(
                        2,
                        '0'
                    )}
                </div>

                {/* Type Selector */}
                <select
                    value={step.type}
                    onChange={(e) =>
                        updateStep(
                            step.id,
                            'type',
                            e.target.value
                        )
                    }
                    style={{
                        flex: 1,
                        padding: '14px',
                        borderRadius: '12px',
                        border:
                            '1px solid rgba(255,255,255,0.08)',
                        background:
                            'rgba(255,255,255,0.03)',
                        color: '#F0F0FF',
                        fontSize: '14px',
                        outline: 'none',
                    }}
                >
                    {NODE_TYPE_OPTIONS.map(
                        (option) => (
                            <option
                                key={option.value}
                                value={option.value}
                                style={{
                                    background:
                                        '#111827',
                                    color: '#ffffff',
                                }}
                            >
                                {option.icon}{' '}
                                {option.label}
                            </option>
                        )
                    )}
                </select>
            </div>

            {/* Workflow Label */}
            <div
                style={{
                    marginBottom: '14px',
                }}
            >
                <label
                    style={{
                        display: 'block',
                        marginBottom: '8px',
                        color: '#94A3B8',
                        fontSize: '13px',
                        fontWeight: 500,
                    }}
                >
                    Step Description
                </label>

                <input
                    value={step.label}
                    onChange={(e) =>
                        updateStep(
                            step.id,
                            'label',
                            e.target.value
                        )
                    }
                    placeholder="Describe this workflow step..."
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
                />
            </div>

            {/* Duration */}
            <div>
                <label
                    style={{
                        display: 'block',
                        marginBottom: '8px',
                        color: '#94A3B8',
                        fontSize: '13px',
                        fontWeight: 500,
                    }}
                >
                    Time / Delay (Optional)
                </label>

                <input
                    value={step.duration || ''}
                    onChange={(e) =>
                        updateStep(
                            step.id,
                            'duration',
                            e.target.value
                        )
                    }
                    placeholder="Example: 5 mins / Waiting for approval / 2 hours"
                    style={{
                        width: '100%',
                        padding: '16px',
                        borderRadius: '12px',
                        border:
                            '1px solid rgba(255,255,255,0.08)',
                        background:
                            'rgba(255,255,255,0.03)',
                        color: '#F0F0FF',
                        fontSize: '14px',
                        outline: 'none',
                    }}
                />
            </div>

            {/* Node Hint */}
            <div
                style={{
                    marginTop: '14px',
                    fontSize: '13px',
                    color: accent,
                    fontWeight: 500,
                }}
            >
                {
                    NODE_TYPE_OPTIONS.find(
                        (item) =>
                            item.value === step.type
                    )?.icon
                }{' '}
                {step.type
                    .replace('_', ' ')
                    .toUpperCase()} NODE
            </div>
        </motion.div>
    );
}
