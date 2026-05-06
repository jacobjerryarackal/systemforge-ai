'use client';

import React from 'react';

type Props = {
    metrics: {
        deploymentReadiness: string;
        automationPotential: string;
        architectureConfidence: string;
        riskScore: string;
        estimatedMonthlyInfraCost: string;
    };
};

export default function ArchitectureScoreCard({
    metrics,
}: Props) {
    const cards = [
        {
            title: 'Deployment Readiness',
            value: metrics.deploymentReadiness,
        },
        {
            title: 'Automation Potential',
            value: metrics.automationPotential,
        },
        {
            title: 'Architecture Confidence',
            value: metrics.architectureConfidence,
        },
        {
            title: 'Risk Score',
            value: metrics.riskScore,
        },
        {
            title: 'Infra Cost',
            value: metrics.estimatedMonthlyInfraCost,
        },
    ];

    return (
        <section
            style={{
                padding: '80px 40px',
                position: 'relative',
                zIndex: 10,
            }}
        >
            <div
                style={{
                    maxWidth: '1200px',
                    margin: '0 auto',
                }}
            >
                <h2
                    style={{
                        color: 'white',
                        fontSize: '32px',
                        fontWeight: 700,
                        marginBottom: '40px',
                        textAlign: 'center',
                    }}
                >
                    System Health Scorecard
                </h2>

                <div
                    style={{
                        display: 'grid',
                        gridTemplateColumns:
                            'repeat(auto-fit, minmax(240px, 1fr))',
                        gap: '24px',
                    }}
                >
                    {cards.map((card, index) => (
                        <div
                            key={index}
                            style={{
                                background:
                                    'rgba(255,255,255,0.04)',
                                border:
                                    '1px solid rgba(255,255,255,0.08)',
                                borderRadius: '18px',
                                padding: '28px',
                                backdropFilter: 'blur(12px)',
                                boxShadow:
                                    '0 10px 30px rgba(0,0,0,0.2)',
                            }}
                        >
                            <p
                                style={{
                                    color: '#94a3b8',
                                    fontSize: '14px',
                                    marginBottom: '12px',
                                }}
                            >
                                {card.title}
                            </p>

                            <h3
                                style={{
                                    color: 'white',
                                    fontSize: '24px',
                                    fontWeight: 700,
                                    lineHeight: 1.4,
                                }}
                            >
                                {card.value}
                            </h3>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
