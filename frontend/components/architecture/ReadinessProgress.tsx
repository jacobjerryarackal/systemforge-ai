'use client';

import React from 'react';

type Props = {
    metrics: {
        deploymentReadiness: string;
        automationPotential: string;
        architectureConfidence: string;
    };
};

export default function ReadinessProgress({
    metrics,
}: Props) {
    const progressItems = [
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
    ];

    const getPercentage = (
        value: string
    ): number => {
        const match = value.match(/\d+/);
        return match ? Number(match[0]) : 0;
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
                    maxWidth: '900px',
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
                    Deployment Readiness Dashboard
                </h2>

                {progressItems.map(
                    (item, index) => {
                        const percent =
                            getPercentage(item.value);

                        return (
                            <div
                                key={index}
                                style={{
                                    marginBottom: '32px',
                                }}
                            >
                                <div
                                    style={{
                                        display: 'flex',
                                        justifyContent:
                                            'space-between',
                                        marginBottom: '10px',
                                    }}
                                >
                                    <span
                                        style={{
                                            color: '#cbd5e1',
                                            fontSize: '16px',
                                            fontWeight: 500,
                                        }}
                                    >
                                        {item.title}
                                    </span>

                                    <span
                                        style={{
                                            color: 'white',
                                            fontWeight: 700,
                                        }}
                                    >
                                        {item.value}
                                    </span>
                                </div>

                                <div
                                    style={{
                                        width: '100%',
                                        height: '14px',
                                        background:
                                            'rgba(255,255,255,0.08)',
                                        borderRadius: '999px',
                                        overflow: 'hidden',
                                    }}
                                >
                                    <div
                                        style={{
                                            width: `${percent}%`,
                                            height: '100%',
                                            background:
                                                'linear-gradient(90deg, #2563eb, #60a5fa)',
                                            borderRadius:
                                                '999px',
                                            transition:
                                                'width 0.5s ease',
                                        }}
                                    />
                                </div>
                            </div>
                        );
                    }
                )}
            </div>
        </section>
    );
}