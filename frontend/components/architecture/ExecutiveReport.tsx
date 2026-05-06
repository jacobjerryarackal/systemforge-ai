'use client';

import React from 'react';

type Props = {
    summary: {
        title: string;
        subtitle: string;
        decisions: string[];
    };
};

export default function ExecutiveReport({
    summary,
}: Props) {
    return (
        <section
            style={{
                padding: '100px 40px',
                position: 'relative',
                zIndex: 10,
            }}
        >
            <div
                style={{
                    maxWidth: '1100px',
                    margin: '0 auto',
                    background:
                        'linear-gradient(180deg, rgba(37,99,235,0.08), rgba(255,255,255,0.02))',
                    border:
                        '1px solid rgba(255,255,255,0.08)',
                    borderRadius: '24px',
                    padding: '48px',
                    backdropFilter: 'blur(14px)',
                    boxShadow:
                        '0 20px 60px rgba(0,0,0,0.25)',
                }}
            >
                <p
                    style={{
                        color: '#60a5fa',
                        fontSize: '14px',
                        fontWeight: 700,
                        letterSpacing: '1px',
                        marginBottom: '12px',
                    }}
                >
                    EXECUTIVE REPORT
                </p>

                <h2
                    style={{
                        color: 'white',
                        fontSize: '38px',
                        fontWeight: 800,
                        marginBottom: '14px',
                    }}
                >
                    Production Deployment Recommendation
                </h2>

                <p
                    style={{
                        color: '#cbd5e1',
                        fontSize: '16px',
                        lineHeight: 1.8,
                        marginBottom: '40px',
                    }}
                >
                    The architecture demonstrates strong production readiness,
                    scalable system boundaries, and operational resilience.
                    Recommended for controlled enterprise rollout with staged
                    deployment monitoring and approval governance.
                </p>

                <div
                    style={{
                        display: 'grid',
                        gridTemplateColumns:
                            'repeat(auto-fit, minmax(220px, 1fr))',
                        gap: '20px',
                        marginBottom: '40px',
                    }}
                >
                    {[
                        {
                            label: 'System Status',
                            value: 'Production Ready',
                        },
                        {
                            label: 'Confidence Level',
                            value: 'High',
                        },
                        {
                            label: 'Deployment Window',
                            value: 'Immediate',
                        },
                        {
                            label: 'Recommended Action',
                            value: 'Proceed to Rollout',
                        },
                    ].map((item, index) => (
                        <div
                            key={index}
                            style={{
                                background:
                                    'rgba(255,255,255,0.04)',
                                border:
                                    '1px solid rgba(255,255,255,0.06)',
                                borderRadius: '18px',
                                padding: '24px',
                            }}
                        >
                            <p
                                style={{
                                    color: '#94a3b8',
                                    fontSize: '13px',
                                    marginBottom: '10px',
                                }}
                            >
                                {item.label}
                            </p>

                            <h3
                                style={{
                                    color: 'white',
                                    fontSize: '20px',
                                    fontWeight: 700,
                                }}
                            >
                                {item.value}
                            </h3>
                        </div>
                    ))}
                </div>

                <div>
                    <h3
                        style={{
                            color: 'white',
                            fontSize: '22px',
                            fontWeight: 700,
                            marginBottom: '20px',
                        }}
                    >
                        Strategic Business Impact
                    </h3>

                    <div
                        style={{
                            display: 'grid',
                            gap: '14px',
                        }}
                    >
                        {summary.decisions.map(
                            (item, index) => (
                                <div
                                    key={index}
                                    style={{
                                        padding: '18px 20px',
                                        borderRadius: '14px',
                                        background:
                                            'rgba(255,255,255,0.03)',
                                        border:
                                            '1px solid rgba(255,255,255,0.05)',
                                        color: '#dbeafe',
                                        fontSize: '15px',
                                        lineHeight: 1.7,
                                    }}
                                >
                                    {item}
                                </div>
                            )
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
