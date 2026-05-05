'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface BeforeAfterWorkflowProps {
    beforeWorkflow?: string[];
    afterWorkflow?: string[];
}

const defaultBeforeWorkflow = [
    'Lead comes from website form',
    'Sales team manually qualifies lead',
    'Manager approval happens in WhatsApp',
    'Proposal created manually in Excel',
    'CRM updated manually by operations',
];

const defaultAfterWorkflow = [
    'AI Lead Qualification Engine',
    'Priority scoring + routing automation',
    'Auto approval policy engine',
    'Proposal Generator Agent',
    'CRM auto-sync + follow-up automation',
];

function WorkflowNode({
    step,
    index,
    type,
}: {
    step: string;
    index: number;
    type: 'before' | 'after';
}) {
    const isBefore = type === 'before';

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
                delay: index * 0.08,
                duration: 0.45,
            }}
            style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                marginBottom: '1rem',
            }}
        >
            {/* Step Number */}
            <div
                style={{
                    minWidth: 52,
                    height: 52,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: `1px solid ${isBefore
                            ? 'rgba(255,184,0,0.25)'
                            : 'rgba(0,255,156,0.25)'
                        }`,
                    background: isBefore
                        ? 'rgba(255,184,0,0.05)'
                        : 'rgba(0,255,156,0.05)',
                    borderRadius: 6,
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.8rem',
                    color: isBefore ? '#FFB800' : '#00FF9C',
                    letterSpacing: '0.12em',
                }}
            >
                {String(index + 1).padStart(2, '0')}
            </div>

            {/* Content */}
            <div
                style={{
                    flex: 1,
                    border: `1px solid ${isBefore
                            ? 'rgba(255,184,0,0.10)'
                            : 'rgba(0,255,156,0.10)'
                        }`,
                    background: isBefore
                        ? 'rgba(255,184,0,0.03)'
                        : 'rgba(0,255,156,0.03)',
                    padding: '1rem 1.2rem',
                    borderRadius: 6,
                }}
            >
                <div
                    style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '1rem',
                        color: '#F0F0FF',
                        lineHeight: 1.6,
                    }}
                >
                    {step}
                </div>
            </div>
        </motion.div>
    );
}

function ResultCard() {
    const stats = [
        {
            label: 'Less Manual Work',
            value: '92%',
        },
        {
            label: 'Faster Execution',
            value: '78%',
        },
        {
            label: 'Scalability Improvement',
            value: '4x',
        },
    ];

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
                delay: 0.5,
                duration: 0.6,
            }}
            style={{
                marginTop: '3rem',
                border: '1px solid rgba(0,255,156,0.14)',
                background: 'rgba(0,255,156,0.03)',
                borderRadius: 8,
                padding: '2rem',
            }}
        >
            <div
                style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.72rem',
                    color: '#00FF9C',
                    letterSpacing: '0.25em',
                    marginBottom: '1rem',
                }}
            >
                BUSINESS IMPACT
            </div>

            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                    gap: '1rem',
                }}
            >
                {stats.map((item, i) => (
                    <div
                        key={i}
                        style={{
                            border: '1px solid rgba(0,255,156,0.08)',
                            background: 'rgba(255,255,255,0.015)',
                            padding: '1.2rem',
                            borderRadius: 6,
                        }}
                    >
                        <div
                            style={{
                                fontFamily: 'var(--font-display)',
                                fontSize: '2rem',
                                color: '#00FF9C',
                                marginBottom: '0.5rem',
                            }}
                        >
                            {item.value}
                        </div>

                        <div
                            style={{
                                fontFamily: 'var(--font-body)',
                                color: '#8888AA',
                                fontSize: '0.95rem',
                            }}
                        >
                            {item.label}
                        </div>
                    </div>
                ))}
            </div>
        </motion.div>
    );
}

export default function BeforeAfterWorkflow({
    beforeWorkflow = defaultBeforeWorkflow,
    afterWorkflow = defaultAfterWorkflow,
}: BeforeAfterWorkflowProps) {
    return (
        <section
            style={{
                position: 'relative',
                zIndex: 10,
                width: '100%',
                padding: '5rem 2rem',
            }}
        >
            <div
                style={{
                    maxWidth: 1400,
                    margin: '0 auto',
                }}
            >
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.55 }}
                    style={{
                        textAlign: 'center',
                        marginBottom: '4rem',
                    }}
                >
                    <div
                        style={{
                            fontFamily: 'var(--font-mono)',
                            fontSize: '0.75rem',
                            color: '#E30913',
                            letterSpacing: '0.28em',
                            marginBottom: '1rem',
                        }}
                    >
                        WORKFLOW REDESIGN ENGINE
                    </div>

                    <h2
                        style={{
                            fontFamily: 'var(--font-display)',
                            fontSize: 'clamp(2rem, 4vw, 4rem)',
                            color: '#F0F0FF',
                            marginBottom: '1rem',
                        }}
                    >
                        Before → After Transformation
                    </h2>

                    <p
                        style={{
                            maxWidth: 760,
                            margin: '0 auto',
                            color: '#8888AA',
                            fontSize: '1.05rem',
                            lineHeight: 1.7,
                        }}
                    >
                        SystemForge transforms broken manual workflows into scalable,
                        production-grade AI-native systems with autonomous orchestration,
                        policy engines, and production architecture readiness.
                    </p>
                </motion.div>

                {/* Comparison Grid */}
                <div
                    style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 100px 1fr',
                        gap: '2rem',
                        alignItems: 'start',
                    }}
                >
                    {/* BEFORE */}
                    <div
                        style={{
                            border: '1px solid rgba(255,184,0,0.12)',
                            background: 'rgba(255,184,0,0.02)',
                            borderRadius: 10,
                            padding: '2rem',
                        }}
                    >
                        <div
                            style={{
                                fontFamily: 'var(--font-mono)',
                                color: '#FFB800',
                                fontSize: '0.75rem',
                                letterSpacing: '0.22em',
                                marginBottom: '1.5rem',
                            }}
                        >
                            BEFORE — MANUAL CHAOS
                        </div>

                        {beforeWorkflow.map((step, index) => (
                            <WorkflowNode
                                key={index}
                                step={step}
                                index={index}
                                type="before"
                            />
                        ))}
                    </div>

                    {/* Center Arrow */}
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            minHeight: 500,
                        }}
                    >
                        <motion.div
                            animate={{
                                x: [0, 10, 0],
                            }}
                            transition={{
                                repeat: Infinity,
                                duration: 2,
                            }}
                            style={{
                                fontSize: '3rem',
                                color: '#E30913',
                                fontWeight: 700,
                            }}
                        >
                            →
                        </motion.div>
                    </div>

                    {/* AFTER */}
                    <div
                        style={{
                            border: '1px solid rgba(0,255,156,0.12)',
                            background: 'rgba(0,255,156,0.02)',
                            borderRadius: 10,
                            padding: '2rem',
                        }}
                    >
                        <div
                            style={{
                                fontFamily: 'var(--font-mono)',
                                color: '#00FF9C',
                                fontSize: '0.75rem',
                                letterSpacing: '0.22em',
                                marginBottom: '1.5rem',
                            }}
                        >
                            AFTER — AI NATIVE SYSTEM
                        </div>

                        {afterWorkflow.map((step, index) => (
                            <WorkflowNode
                                key={index}
                                step={step}
                                index={index}
                                type="after"
                            />
                        ))}
                    </div>
                </div>

                {/* Impact */}
                <ResultCard />
            </div>
        </section>
    );
}