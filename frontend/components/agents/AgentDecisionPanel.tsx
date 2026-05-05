'use client';

import React from 'react';
import { motion } from 'framer-motion';
import type { AgentDecision } from '../../lib/types';

interface AgentDecisionPanelProps {
    architect: AgentDecision;
    critic: AgentDecision;
    refiner: AgentDecision;
}

interface AgentCardData {
    id: string;
    role: string;
    color: string;
    data: AgentDecision;
}

function DecisionCard({
    item,
    index,
}: {
    item: AgentCardData;
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
                        {item.id} · {item.role}
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
                        {item.data.title}
                    </div>

                    <div
                        style={{
                            color: item.color,
                            fontSize: '0.95rem',
                            fontWeight: 500,
                        }}
                    >
                        {item.data.subtitle}
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
                    {item.id}
                </div>
            </div>

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
                    {item.data.decisions.map((decision, i) => (
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

export default function AgentDecisionPanel({
    architect,
    critic,
    refiner,
}: AgentDecisionPanelProps) {
    const agentCards: AgentCardData[] = [
        {
            id: '01',
            role: 'ARCHITECT',
            color: '#00D4FF',
            data: architect,
        },
        {
            id: '02',
            role: 'CRITIC',
            color: '#FFB800',
            data: critic,
        },
        {
            id: '03',
            role: 'REFINER',
            color: '#00FF9C',
            data: refiner,
        },
    ];

    return (
        <section
            id="agent-intelligence"
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
                        SystemForge separates architecture generation
                        into specialized reasoning agents. Each agent
                        performs focused analysis: system design,
                        risk detection, and production hardening.
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
                    {agentCards.map((item, index) => (
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