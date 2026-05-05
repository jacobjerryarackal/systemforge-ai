'use client';

import React from 'react';
import { motion } from 'framer-motion';
import type { SystemForgeResponse } from '../../lib/types';

interface WorkflowComparisonProps {
    data: SystemForgeResponse;
}

interface ComparisonBlock {
    title: string;
    before: string;
    after: string;
    impact: string;
}

function buildComparisonBlocks(
    before: string[],
    after: string[]
): ComparisonBlock[] {
    const maxLength = Math.max(before.length, after.length);

    const blocks: ComparisonBlock[] = [];

    for (let i = 0; i < maxLength; i++) {
        blocks.push({
            title: `Workflow Step ${String(i + 1).padStart(2, '0')}`,
            before: before[i] || 'Not defined',
            after: after[i] || 'System optimized this step',
            impact:
                i % 2 === 0
                    ? 'Reduced manual effort + faster execution'
                    : 'Improved reliability + production readiness',
        });
    }

    return blocks;
}

function ComparisonCard({
    item,
    index,
}: {
    item: ComparisonBlock;
    index: number;
}) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
                delay: index * 0.08,
                duration: 0.45,
            }}
            style={{
                border: '1px solid rgba(255,255,255,0.06)',
                background: 'rgba(255,255,255,0.02)',
                borderRadius: 10,
                padding: '1.8rem',
                backdropFilter: 'blur(14px)',
            }}
        >
            {/* Title */}
            <div
                style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1rem',
                    color: '#F0F0FF',
                    marginBottom: '1.4rem',
                    letterSpacing: '0.05em',
                }}
            >
                {item.title}
            </div>

            {/* Before */}
            <div style={{ marginBottom: '1.2rem' }}>
                <div
                    style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.72rem',
                        color: '#FFB800',
                        letterSpacing: '0.18em',
                        marginBottom: '0.5rem',
                    }}
                >
                    BEFORE
                </div>

                <div
                    style={{
                        color: '#8888AA',
                        lineHeight: 1.7,
                        fontSize: '0.95rem',
                    }}
                >
                    {item.before}
                </div>
            </div>

            {/* After */}
            <div style={{ marginBottom: '1.2rem' }}>
                <div
                    style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.72rem',
                        color: '#00FF9C',
                        letterSpacing: '0.18em',
                        marginBottom: '0.5rem',
                    }}
                >
                    AFTER
                </div>

                <div
                    style={{
                        color: '#F0F0FF',
                        lineHeight: 1.7,
                        fontSize: '0.95rem',
                    }}
                >
                    {item.after}
                </div>
            </div>

            {/* Impact */}
            <div
                style={{
                    borderTop: '1px solid rgba(255,255,255,0.05)',
                    paddingTop: '1rem',
                }}
            >
                <div
                    style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.7rem',
                        color: '#00D4FF',
                        letterSpacing: '0.18em',
                        marginBottom: '0.4rem',
                    }}
                >
                    BUSINESS IMPACT
                </div>

                <div
                    style={{
                        color: '#00D4FF',
                        fontSize: '0.92rem',
                        lineHeight: 1.6,
                    }}
                >
                    {item.impact}
                </div>
            </div>
        </motion.div>
    );
}

export default function WorkflowComparison({
    data,
}: WorkflowComparisonProps) {
    const comparisonBlocks = buildComparisonBlocks(
        data.workflowTransformation.before,
        data.workflowTransformation.after
    );

    return (
        <section
            style={{
                position: 'relative',
                zIndex: 10,
                width: '100%',
                padding: '4rem 2rem',
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
                    transition={{ duration: 0.5 }}
                    style={{
                        textAlign: 'center',
                        marginBottom: '3rem',
                    }}
                >
                    <div
                        style={{
                            fontFamily: 'var(--font-mono)',
                            fontSize: '0.75rem',
                            color: '#00D4FF',
                            letterSpacing: '0.24em',
                            marginBottom: '0.8rem',
                        }}
                    >
                        WORKFLOW INTELLIGENCE LAYER
                    </div>

                    <h2
                        style={{
                            fontFamily: 'var(--font-display)',
                            fontSize: 'clamp(2rem, 4vw, 3.6rem)',
                            color: '#F0F0FF',
                            marginBottom: '1rem',
                        }}
                    >
                        Operational Redesign Breakdown
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
                        Every workflow redesign is broken into measurable
                        improvements. SystemForge explains what changed,
                        why it changed, and how the redesigned system
                        improves execution speed, scalability, and
                        operational reliability.
                    </p>
                </motion.div>

                {/* Grid */}
                <div
                    style={{
                        display: 'grid',
                        gridTemplateColumns:
                            'repeat(auto-fit, minmax(320px, 1fr))',
                        gap: '1.5rem',
                    }}
                >
                    {comparisonBlocks.map((item, index) => (
                        <ComparisonCard
                            key={index}
                            item={item}
                            index={index}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}