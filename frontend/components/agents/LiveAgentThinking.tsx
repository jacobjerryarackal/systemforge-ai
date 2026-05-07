'use client';

import React, {
    useEffect,
    useState,
} from 'react';

const AGENTS = [
    {
        icon: '⚡',
        title: 'SYSTEMS ARCHITECT',
        message:
            'Designing production-grade architecture...',
        color: '#00d4ff',
    },
    {
        icon: '⚠',
        title: 'INFRASTRUCTURE CRITIC',
        message:
            'Finding failure points and bottlenecks...',
        color: '#f59e0b',
    },
    {
        icon: '🛡',
        title: 'PRODUCTION REFINER',
        message:
            'Hardening reliability and recovery paths...',
        color: '#10b981',
    },
    {
        icon: '📊',
        title: 'EXECUTIVE SUMMARY',
        message:
            'Calculating ROI and deployment readiness...',
        color: '#8b5cf6',
    },
];

export default function LiveAgentThinking() {
    const [activeIndex, setActiveIndex] =
        useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex((prev) =>
                prev < AGENTS.length - 1
                    ? prev + 1
                    : prev
            );
        }, 1800);

        return () =>
            clearInterval(interval);
    }, []);

    return (
        <section
            style={{
                maxWidth: '1200px',
                margin: '0 auto',
                padding: '60px 20px',
            }}
        >
            <h2
                style={{
                    fontSize: '42px',
                    fontWeight: 800,
                    textAlign: 'center',
                    color: '#fff',
                    marginBottom: '16px',
                }}
            >
                AI Agents Are Thinking
            </h2>

            <p
                style={{
                    textAlign: 'center',
                    color: '#94a3b8',
                    fontSize: '18px',
                    marginBottom: '50px',
                }}
            >
                Multi-agent system redesigning
                your workflow in real time
            </p>

            <div
                style={{
                    display: 'grid',
                    gap: '20px',
                }}
            >
                {AGENTS.map(
                    (agent, index) => {
                        const isActive =
                            index <= activeIndex;

                        return (
                            <div
                                key={
                                    agent.title
                                }
                                style={{
                                    padding:
                                        '24px',
                                    borderRadius:
                                        '18px',
                                    background:
                                        'rgba(5,8,22,0.9)',
                                    border: `1px solid ${isActive
                                            ? agent.color
                                            : 'rgba(255,255,255,0.06)'
                                        }`,
                                    boxShadow:
                                        isActive
                                            ? `0 0 30px ${agent.color}22`
                                            : 'none',
                                    opacity:
                                        isActive
                                            ? 1
                                            : 0.45,
                                    transition:
                                        'all 0.4s ease',
                                }}
                            >
                                <div
                                    style={{
                                        display:
                                            'flex',
                                        alignItems:
                                            'center',
                                        gap: '14px',
                                        marginBottom:
                                            '10px',
                                    }}
                                >
                                    <div
                                        style={{
                                            fontSize:
                                                '28px',
                                        }}
                                    >
                                        {
                                            agent.icon
                                        }
                                    </div>

                                    <div
                                        style={{
                                            fontSize:
                                                '18px',
                                            fontWeight: 700,
                                            color:
                                                '#fff',
                                        }}
                                    >
                                        {
                                            agent.title
                                        }
                                    </div>
                                </div>

                                <div
                                    style={{
                                        color:
                                            '#cbd5e1',
                                        fontSize:
                                            '15px',
                                        paddingLeft:
                                            '42px',
                                    }}
                                >
                                    {
                                        agent.message
                                    }
                                </div>
                            </div>
                        );
                    }
                )}
            </div>
        </section>
    );
}