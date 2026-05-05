'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface AgentDecision {
    agent: string;
    role: string;
    color: string;
    icon: string;
    title: string;
    summary: string;
    decisions: string[];
}

const agentDecisions: AgentDecision[] = [
    {
        agent: 'ARCHITECT',
        role: 'System Design',
        color: '#00D4FF',
        icon: '01',
        title: 'Initial Architecture Construction',
        summary:
            'The Architect Agent transforms fragmented workflows into structured services, APIs, queues, and production-ready system boundaries.',
        decisions: [
            'Separated lead intake from approval processing',
            'Introduced async queue for proposal generation',
            'Added service boundary between CRM sync and customer follow-up',
            'Recommended event-driven workflow instead of manual dependency chains',
            'Moved approval logic into dedicated policy engine',
        ],
    },
    {
        agent: 'CRITIC',
        role: 'Risk Detection',
        color: '#FFB800',
        icon: '02',
        title: 'Failure Points + Operational Risk Analysis',
        summary:
            'The Critic Agent reviews the architecture for reliability gaps, scaling risks, SPOFs, and operational bottlenecks before production deployment.',
        decisions: [
            'Detected approval bottleneck causing business delays',
            'Found manual CRM updates creating data inconsistency',
            'Identified lack of fallback path for proposal generation',
            'Flagged missing observability across workflow transitions',
            'Detected SPOF risk in centralized approval dependency',
        ],
    },
    {
        agent: 'REFINER',
        role: 'Production Readiness',
        color: '#00FF9C',
        icon: '03',
        title: 'Architecture Hardening + Final Optimization',
        summary:
            'The Refiner Agent improves resilience, observability, failover handling, and deployment readiness to create a production-grade architecture.',
        decisions: [
            'Added retry + fallback strategy for failed proposals',
            'Introduced audit logs and distributed tracing',
            'Designed HA deployment with queue failover',
            'Added circuit breaker for approval service dependency',
            'Improved operational monitoring and incident visibility',
        ],
    },
];

function DecisionCard({
    item,
    index,
}: {
    item: AgentDecision;
    index: number;
}) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
                delay: index * 0.12,
                duration: 0.55,
            }}
            whileHover={{
                y: -4,
            }}
            style={{
                border: `1px solid ${item.color}20`,
                background: `${item.color}05`,
                borderRadius: 10,
                padding: '2rem',
                backdropFilter: 'blur(14px)',
                boxShadow: `0 0 30px ${item.color}08`,
            }}
        >
            {/* Header */}
            <div
                style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    justifyContent: 'space-between',
                    gap: '1rem',
                    marginBottom: '1.5rem',
                }}
            >
                <div>
                    <div
                        style={{
                            fontFamily: 'var(--font-mono)',
                            fontSize: '0.72rem',
                            color: item.color,
                            letterSpacing: '0.22em',
                            marginBottom: '0.45rem',
                        }}
                    >
                        {item.icon} · {item.role}
                    </div>

                    <div
                        style={{
                            fontFamily: 'var(--font-display)',
                            fontSize: '1rem',
                            color: '#F0F0FF',
                            letterSpacing: '0.08em',
                            marginBottom: '0.35rem',
                        }}
                    >
                        {item.agent}
                    </div>

                    <div
                        style={{
                            color: item.color,
                            fontSize: '0.95rem',
                            fontWeight: 500,
                        }}
                    >
                        {item.title}
                    </div>
                </div>

                <div
                    style={{
                        minWidth: 56,
                        height: 56,
                        borderRadius: 8,
                        border: `1px solid ${item.color}30`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontFamily: 'var(--font-display)',
                        fontSize: '1rem',
                        color: item.color,
                        background: `${item.color}08`,
                    }}
                >
                    {item.icon}
                </div>
            </div>

            {/* Summary */}
            <p
                style={{
                    color: '#8888AA',
                    lineHeight: 1.7,
                    fontSize: '0.95rem',
                    marginBottom: '1.5rem',
                }}
            >
                {item.summary}
            </p>

            {/* Decisions */}
            <div>
                <div
                    style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.68rem',
                        color: item.color,
                        letterSpacing: '0.18em',
                        marginBottom: '0.9rem',
                    }}
                >
                    KEY DECISIONS
                </div>

                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '0.8rem',
                    }}
                >
                    {item.decisions.map((decision, i) => (
                        <div
                            key={i}
                            style={{
                                display: 'flex',
                                gap: '0.8rem',
                                alignItems: 'flex-start',
                            }}
                        >
                            <span
                                style={{
                                    color: item.color,
                                    fontSize: '0.8rem',
                                    marginTop: '2px',
                                }}
                            >
                                ●
                            </span>

                            <div
                                style={{
                                    color: '#F0F0FF',
                                    fontSize: '0.92rem',
                                    lineHeight: 1.6,
                                }}
                            >
                                {decision}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </motion.div>
    );
}

export default function AgentDecisionPanel() {
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
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.55 }}
                    style={{
                        textAlign: 'center',
                        marginBottom: '3.5rem',
                    }}
                >
                    <div
                        style={{
                            fontFamily: 'var(--font-mono)',
                            fontSize: '0.75rem',
                            color: '#E30913',
                            letterSpacing: '0.26em',
                            marginBottom: '0.8rem',
                        }}
                    >
                        MULTI-AGENT REASONING ENGINE
                    </div>

                    <h2
                        style={{
                            fontFamily: 'var(--font-display)',
                            fontSize: 'clamp(2rem, 4vw, 3.8rem)',
                            color: '#F0F0FF',
                            marginBottom: '1rem',
                        }}
                    >
                        Agent Decision Intelligence
                    </h2>

                    <p
                        style={{
                            maxWidth: 780,
                            margin: '0 auto',
                            color: '#8888AA',
                            fontSize: '1rem',
                            lineHeight: 1.75,
                        }}
                    >
                        SystemForge separates architecture generation into specialized agents.
                        Each agent performs focused reasoning: building architecture,
                        detecting risks, and refining the final system for production readiness.
                    </p>
                </motion.div>

                {/* Cards */}
                <div
                    style={{
                        display: 'grid',
                        gridTemplateColumns:
                            'repeat(auto-fit, minmax(340px, 1fr))',
                        gap: '1.6rem',
                    }}
                >
                    {agentDecisions.map((item, index) => (
                        <DecisionCard
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