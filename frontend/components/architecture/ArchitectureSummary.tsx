'use client';

import React from 'react';
import { motion } from 'framer-motion';
import type { FinalMetrics } from '../../lib/types';

interface ArchitectureSummaryProps {
    metrics: FinalMetrics;
    onDownloadReport: () => void;
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
    onDownloadReport,
}: ArchitectureSummaryProps) {
    const metricCards: MetricCardData[] = [
        {
            label: 'Deployment Readiness',
            value: metrics.deploymentReadiness,
            subtitle: 'Production readiness score',
            color: '#00FF9C',
        },
        {
            label: 'Automation Potential',
            value: metrics.automationPotential,
            subtitle: 'Operational bottlenecks removed',
            color: '#00D4FF',
        },
        {
            label: 'Risk Score',
            value: metrics.riskScore,
            subtitle: 'System vulnerability evaluation',
            color: '#FFB800',
        },
        {
            label: 'Architecture Confidence',
            value: metrics.architectureConfidence,
            subtitle: 'Validated architecture confidence',
            color: '#A020F0',
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
                        padding: '2.5rem',
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

                    {/* Download Button INSIDE final card */}
                    <div
                        style={{
                            marginTop: '32px',
                            display: 'flex',
                            justifyContent: 'center',
                        }}
                    >
                        <button
                            onClick={onDownloadReport}
                            style={{
                                background:
                                    'linear-gradient(135deg, #2563eb, #1d4ed8)',
                                color: '#fff',
                                border: 'none',
                                padding: '18px 42px',
                                borderRadius: '14px',
                                fontSize: '16px',
                                fontWeight: 700,
                                cursor: 'pointer',
                                boxShadow:
                                    '0 12px 32px rgba(37,99,235,0.25)',
                                transition: 'all 0.3s ease',
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform =
                                    'translateY(-2px)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform =
                                    'translateY(0px)';
                            }}
                        >
                            Download Architecture Report
                        </button>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}