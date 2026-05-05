'use client';

import React from 'react';
import { motion } from 'framer-motion';
import type { WorkflowTransformation } from '../../lib/types';

interface BeforeAfterWorkflowProps {
    data: WorkflowTransformation;
}

function StepCard({
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
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
                delay: index * 0.08,
                duration: 0.45,
            }}
            style={{
                display: 'flex',
                alignItems: 'flex-start',
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
                    borderRadius: 8,
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.8rem',
                    color: isBefore ? '#FFB800' : '#00FF9C',
                    letterSpacing: '0.12em',
                }}
            >
                {String(index + 1).padStart(2, '0')}
            </div>

            {/* Step Content */}
            <div
                style={{
                    flex: 1,
                    border: `1px solid ${isBefore
                            ? 'rgba(255,184,0,0.08)'
                            : 'rgba(0,255,156,0.08)'
                        }`,
                    background: isBefore
                        ? 'rgba(255,184,0,0.02)'
                        : 'rgba(0,255,156,0.02)',
                    borderRadius: 8,
                    padding: '1rem 1.2rem',
                }}
            >
                <div
                    style={{
                        fontFamily: 'var(--font-body)',
                        color: '#F0F0FF',
                        fontSize: '0.98rem',
                        lineHeight: 1.6,
                    }}
                >
                    {step}
                </div>
            </div>
        </motion.div>
    );
}

export default function BeforeAfterWorkflow({
    data,
}: BeforeAfterWorkflowProps) {
    return (
        <section
            id="workflow-engine"
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
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 18 }}
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
                            fontSize: '1rem',
                            lineHeight: 1.75,
                        }}
                    >
                        SystemForge converts fragmented manual operations into
                        production-grade AI-native workflows with automation,
                        validation layers, and scalable execution paths.
                    </p>
                </motion.div>

                {/* Main Grid */}
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
                            BEFORE — MANUAL WORKFLOW
                        </div>

                        {data.before.map((step, index) => (
                            <StepCard
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

                        {data.after.map((step, index) => (
                            <StepCard
                                key={index}
                                step={step}
                                index={index}
                                type="after"
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}