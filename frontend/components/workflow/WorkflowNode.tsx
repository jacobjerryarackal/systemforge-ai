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
        field: 'label' | 'type',
        value: string
    ) => void;
    removeStep: (id: string) => void;
}

const NODE_OPTIONS: {
    value: WorkflowNodeType;
    label: string;
    icon: string;
}[] = [
        { value: 'task', label: 'Task', icon: '□' },
        { value: 'decision', label: 'Decision', icon: '◇' },
        { value: 'approval', label: 'Approval', icon: '✓' },
        { value: 'api', label: 'API', icon: '⚡' },
        { value: 'queue', label: 'Queue', icon: '⇄' },
        { value: 'llm', label: 'LLM', icon: '🤖' },
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

function getAccent(type: WorkflowNodeType) {
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
    removeStep,
}: Props) {
    const accent = getAccent(step.type);

    const isDecision =
        step.type === 'decision';

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
            style={{
                marginBottom: '20px',
            }}
        >
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px',
                }}
            >
                {/* Node Shape */}
                <div
                    style={{
                        width: 58,
                        height: 58,
                        minWidth: 58,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        border: `1px solid ${accent}30`,
                        background: `${accent}08`,
                        color: accent,
                        fontSize: '18px',
                        fontWeight: 700,
                        transform: isDecision
                            ? 'rotate(45deg)'
                            : 'none',
                        borderRadius: isDecision
                            ? '8px'
                            : '14px',
                    }}
                >
                    <span
                        style={{
                            transform: isDecision
                                ? 'rotate(-45deg)'
                                : 'none',
                        }}
                    >
                        {isDecision
                            ? '?'
                            : String(index + 1).padStart(
                                2,
                                '0'
                            )}
                    </span>
                </div>

                {/* Main Card */}
                <div
                    style={{
                        flex: 1,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '14px',
                        border:
                            '1px solid rgba(255,255,255,0.08)',
                        background:
                            'rgba(255,255,255,0.02)',
                        borderRadius: '18px',
                        padding: '18px 20px',
                        backdropFilter: 'blur(8px)',
                    }}
                >
                    {/* Type */}
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
                            border: 'none',
                            background: 'transparent',
                            color: accent,
                            fontWeight: 600,
                            fontSize: '14px',
                            outline: 'none',
                            minWidth: 120,
                        }}
                    >
                        {NODE_OPTIONS.map((item) => (
                            <option
                                key={item.value}
                                value={item.value}
                                style={{
                                    background: '#111827',
                                    color: '#ffffff',
                                }}
                            >
                                {item.icon} {item.label}
                            </option>
                        ))}
                    </select>

                    {/* Input */}
                    <input
                        value={step.label}
                        onChange={(e) =>
                            updateStep(
                                step.id,
                                'label',
                                e.target.value
                            )
                        }
                        placeholder="Describe workflow step..."
                        style={{
                            flex: 1,
                            border: 'none',
                            background: 'transparent',
                            color: '#F0F0FF',
                            fontSize: '16px',
                            outline: 'none',
                        }}
                    />

                    {/* Remove */}
                    <button
                        onClick={() =>
                            removeStep(step.id)
                        }
                        style={{
                            border: 'none',
                            background: 'transparent',
                            color: '#EF4444',
                            fontWeight: 600,
                            cursor: 'pointer',
                            fontSize: '14px',
                        }}
                    >
                        Remove
                    </button>
                </div>
            </div>
        </motion.div>
    );
}
