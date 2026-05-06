'use client';

import React from 'react';

export default function RiskHeatmap() {
    const risks = [
        {
            area: 'Input Validation Layer',
            level: 'LOW',
            reason:
                'Validation service reduces malformed workflow execution',
        },
        {
            area: 'Approval Queue',
            level: 'HIGH',
            reason:
                'Queue congestion and delayed approvals can block execution',
        },
        {
            area: 'Human Escalation',
            level: 'MEDIUM',
            reason:
                'Manual override dependency may slow peak-time operations',
        },
        {
            area: 'Retry + Recovery',
            level: 'LOW',
            reason:
                'DLQ + replay strategy improves resilience',
        },
        {
            area: 'Observability',
            level: 'MEDIUM',
            reason:
                'Missing alert ownership may delay incident response',
        },
        {
            area: 'Deployment Rollback',
            level: 'LOW',
            reason:
                'Rollback strategy minimizes release failure impact',
        },
    ];

    const getBadgeStyle = (level: string) => {
        if (level === 'HIGH') {
            return {
                background: 'rgba(239,68,68,0.15)',
                color: '#f87171',
                border: '1px solid rgba(239,68,68,0.3)',
            };
        }

        if (level === 'MEDIUM') {
            return {
                background: 'rgba(245,158,11,0.15)',
                color: '#fbbf24',
                border: '1px solid rgba(245,158,11,0.3)',
            };
        }

        return {
            background: 'rgba(34,197,94,0.15)',
            color: '#4ade80',
            border: '1px solid rgba(34,197,94,0.3)',
        };
    };

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
                    maxWidth: '1100px',
                    margin: '0 auto',
                }}
            >
                <h2
                    style={{
                        color: 'white',
                        fontSize: '32px',
                        fontWeight: 700,
                        textAlign: 'center',
                        marginBottom: '20px',
                    }}
                >
                    Architecture Confidence + Risk Heatmap
                </h2>

                <p
                    style={{
                        color: '#94a3b8',
                        textAlign: 'center',
                        marginBottom: '40px',
                        fontSize: '15px',
                    }}
                >
                    Risk visibility across production workflow boundaries
                </p>

                <div
                    style={{
                        display: 'grid',
                        gap: '18px',
                    }}
                >
                    {risks.map((risk, index) => (
                        <div
                            key={index}
                            style={{
                                background:
                                    'rgba(255,255,255,0.04)',
                                border:
                                    '1px solid rgba(255,255,255,0.08)',
                                borderRadius: '18px',
                                padding: '24px',
                                backdropFilter: 'blur(12px)',
                            }}
                        >
                            <div
                                style={{
                                    display: 'flex',
                                    justifyContent:
                                        'space-between',
                                    alignItems: 'center',
                                    marginBottom: '12px',
                                }}
                            >
                                <h3
                                    style={{
                                        color: 'white',
                                        fontSize: '18px',
                                        fontWeight: 600,
                                    }}
                                >
                                    {risk.area}
                                </h3>

                                <span
                                    style={{
                                        padding:
                                            '8px 14px',
                                        borderRadius:
                                            '999px',
                                        fontSize: '13px',
                                        fontWeight: 700,
                                        ...getBadgeStyle(
                                            risk.level
                                        ),
                                    }}
                                >
                                    {risk.level}
                                </span>
                            </div>

                            <p
                                style={{
                                    color: '#94a3b8',
                                    fontSize: '14px',
                                    lineHeight: 1.6,
                                }}
                            >
                                {risk.reason}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}