'use client';

import React from 'react';
import { motion } from 'framer-motion';
import type { FinalMetrics } from '../../lib/types';

interface ArchitectureSummaryProps {
    metrics: FinalMetrics;
}

interface MetricCardData {
    label: string;
    value: string;
    subtitle: string;
    color: string;
}

function MetricCard({
    item,
    index,
}: {
    item: MetricCardData;
    index: number;
}) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
                delay: index * 0.08,
                duration: 0.45,
            }}
            whileHover={{
                y: -4,
            }}
            style={{
                border: `1px solid ${item.color}18`,
                background: `${item.color}05`,
                borderRadius: 10,
                padding: '1.8rem',
                backdropFilter: 'blur(14px)',
                boxShadow: `0 0 24px ${item.color}08`,
            }}
        >
            <div
                style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '2.2rem',
                    color: item.color,
                    marginBottom: '0.6rem',
                    lineHeight: 1,
                }}
            >
                {item.value}
            </div>

            <div
                style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '0.95rem',
                    color: '#F0F0FF',
                    marginBottom: '0.45rem',
                    letterSpacing: '0.04em',
                }}
            >
                {item.label}
            </div>

            <div
                style={{
                    color: '#8888AA',
                    fontSize: '0.9rem',
                    lineHeight: 1.6,
                }}
            >
                {item.subtitle}
            </div>
        </motion.div>
    );
}

export default function ArchitectureSummary({
    metrics,
}: ArchitectureSummaryProps) {
    const metricCards: MetricCardData[] = [
        {
            label: 'Production Readiness',
            value: metrics.readiness,
            subtitle: 'Validated architecture confidence',
            color: '#00FF9C',
        },
        {
            label: 'Manual Work Reduced',
            value: metrics.manualReduction,
            subtitle: 'Operational bottlenecks removed',
            color: '#00D4FF',
        },
        {
            label: 'Execution Speed',
            value: metrics.speedGain,
            subtitle: 'Faster workflow completion',
            color: '#FFB800',
        },
        {
            label: 'Scalability Gain',
            value: metrics.scalabilityGain,
            subtitle: 'Improved system growth capacity',
            color: '#E30913',
        },
    ];

    return (
        <section
            id="amd-inference"
            style={{
                position: 'relative',
                zIndex: 10,
                width: '100%',
                padding: '4rem 2rem 6rem',
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
                        ARCHITECTURE OUTCOME SUMMARY
                    </div>

                    <h2
                        style={{
                            fontFamily: 'var(--font-display)',
                            fontSize: 'clamp(2rem, 4vw, 3.4rem)',
                            color: '#F0F0FF',
                            marginBottom: '1rem',
                        }}
                    >
                        Final System Impact
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
                        SystemForge evaluates architectural improvements
                        beyond diagrams. The platform measures reliability,
                        scalability, workflow efficiency, and deployment
                        readiness to provide a complete engineering outcome.
                    </p>
                </motion.div>

                {/* Metrics Grid */}
                <div
                    style={{
                        display: 'grid',
                        gridTemplateColumns:
                            'repeat(auto-fit, minmax(260px, 1fr))',
                        gap: '1.4rem',
                        marginBottom: '3rem',
                    }}
                >
                    {metricCards.map((item, index) => (
                        <MetricCard
                            key={index}
                            item={item}
                            index={index}
                        />
                    ))}
                </div>

                {/* Closing Block */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{
                        delay: 0.35,
                        duration: 0.6,
                    }}
                    style={{
                        border: '1px solid rgba(0,212,255,0.12)',
                        background: 'rgba(0,212,255,0.03)',
                        borderRadius: 10,
                        padding: '2rem',
                        textAlign: 'center',
                    }}
                >
                    <div
                        style={{
                            fontFamily: 'var(--font-mono)',
                            fontSize: '0.72rem',
                            color: '#00D4FF',
                            letterSpacing: '0.22em',
                            marginBottom: '0.8rem',
                        }}
                    >
                        SYSTEMFORGE RESULT
                    </div>

                    <div
                        style={{
                            fontFamily: 'var(--font-display)',
                            fontSize: '1.1rem',
                            color: '#F0F0FF',
                            marginBottom: '0.8rem',
                        }}
                    >
                        Workflow Redesign + Production Validation
                        in One Engine
                    </div>

                    <p
                        style={{
                            maxWidth: 780,
                            margin: '0 auto',
                            color: '#8888AA',
                            lineHeight: 1.7,
                            fontSize: '0.95rem',
                        }}
                    >
                        The final output is not just a workflow redesign.
                        It is a production-grade system strategy with
                        measurable business impact, operational clarity,
                        and infrastructure confidence.
                    </p>
                </motion.div>
            </div>
        </section>
    );
}