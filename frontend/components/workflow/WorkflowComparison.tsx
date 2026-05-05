'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface ComparisonItem {
    title: string;
    before: string;
    after: string;
    impact: string;
}

const comparisonData: ComparisonItem[] = [
    {
        title: 'Lead Qualification',
        before: 'Manual review by sales team using spreadsheets and repeated follow-ups.',
        after: 'AI lead scoring engine with automatic routing and qualification.',
        impact: 'Faster response time + higher conversion',
    },
    {
        title: 'Approval Flow',
        before: 'Manager approvals handled manually through WhatsApp and email chains.',
        after: 'Policy-based approval engine with auto-escalation and rule validation.',
        impact: 'Reduced approval delays + audit visibility',
    },
    {
        title: 'Proposal Generation',
        before: 'Proposals created manually in Excel and shared through multiple versions.',
        after: 'Proposal Generator Agent with template automation and approval checkpoints.',
        impact: 'Consistent output + less manual effort',
    },
    {
        title: 'CRM Updates',
        before: 'Operations team manually updates CRM after every customer interaction.',
        after: 'Real-time CRM sync with event-driven updates and workflow triggers.',
        impact: 'Reliable data + operational accuracy',
    },
];

function ComparisonCard({
    item,
    index,
}: {
    item: ComparisonItem;
    index: number;
}) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
                delay: index * 0.08,
                duration: 0.5,
            }}
            style={{
                border: '1px solid rgba(255,255,255,0.06)',
                background: 'rgba(255,255,255,0.02)',
                borderRadius: 8,
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
                    marginBottom: '1.5rem',
                    letterSpacing: '0.06em',
                }}
            >
                {item.title}
            </div>

            {/* Before */}
            <div
                style={{
                    marginBottom: '1.2rem',
                }}
            >
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
            <div
                style={{
                    marginBottom: '1.2rem',
                }}
            >
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

export default function WorkflowComparison() {
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
                            lineHeight: 1.7,
                        }}
                    >
                        Every workflow redesign is broken into measurable improvements.
                        SystemForge explains what changed, why it changed, and how the
                        redesigned system improves scalability, reliability, and execution speed.
                    </p>
                </motion.div>

                {/* Grid */}
                <div
                    style={{
                        display: 'grid',
                        gridTemplateColumns:
                            'repeat(auto-fit, minmax(300px, 1fr))',
                        gap: '1.5rem',
                    }}
                >
                    {comparisonData.map((item, index) => (
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