'use client';

import React from 'react';

export default function InfraCostBreakdown() {
    const infraCosts = [
        {
            title: 'GPU Inference Layer',
            value: '$2,500/month',
            description:
                'AMD MI300X + vLLM production inference',
        },
        {
            title: 'Database + Redis',
            value: '$600/month',
            description:
                'PostgreSQL, Redis, persistence + caching',
        },
        {
            title: 'Observability Stack',
            value: '$400/month',
            description:
                'Logs, tracing, monitoring, alerting',
        },
        {
            title: 'Queue + Orchestration',
            value: '$500/month',
            description:
                'Async workflows, retries, dead-letter queues',
        },
        {
            title: 'Backup + Recovery',
            value: '$300/month',
            description:
                'Snapshots, rollback readiness, failover',
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
                    Estimated Monthly Infrastructure Cost
                </h2>

                <p
                    style={{
                        color: '#94a3b8',
                        textAlign: 'center',
                        marginBottom: '40px',
                        fontSize: '15px',
                    }}
                >
                    Production-grade deployment cost projection
                </p>

                <div
                    style={{
                        display: 'grid',
                        gap: '20px',
                    }}
                >
                    {infraCosts.map((item, index) => (
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
                                    marginBottom: '10px',
                                }}
                            >
                                <h3
                                    style={{
                                        color: 'white',
                                        fontSize: '18px',
                                        fontWeight: 600,
                                    }}
                                >
                                    {item.title}
                                </h3>

                                <span
                                    style={{
                                        color: '#60a5fa',
                                        fontWeight: 700,
                                        fontSize: '18px',
                                    }}
                                >
                                    {item.value}
                                </span>
                            </div>

                            <p
                                style={{
                                    color: '#94a3b8',
                                    fontSize: '14px',
                                    lineHeight: 1.6,
                                }}
                            >
                                {item.description}
                            </p>
                        </div>
                    ))}
                </div>

                <div
                    style={{
                        marginTop: '40px',
                        padding: '28px',
                        borderRadius: '18px',
                        background:
                            'rgba(37,99,235,0.08)',
                        border:
                            '1px solid rgba(37,99,235,0.2)',
                        textAlign: 'center',
                    }}
                >
                    <h3
                        style={{
                            color: 'white',
                            fontSize: '26px',
                            fontWeight: 700,
                            marginBottom: '10px',
                        }}
                    >
                        Total Estimated Cost
                    </h3>

                    <p
                        style={{
                            color: '#60a5fa',
                            fontSize: '32px',
                            fontWeight: 800,
                        }}
                    >
                        $4,300/month
                    </p>
                </div>
            </div>
        </section>
    );
}
