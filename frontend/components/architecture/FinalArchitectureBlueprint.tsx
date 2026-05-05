'use client';

import React from 'react';
import { motion } from 'framer-motion';
import type { ArchitectureLayer } from '../../lib/types';

interface FinalArchitectureBlueprintProps {
    layers: ArchitectureLayer[];
}

function LayerCard({
    layer,
    index,
}: {
    layer: ArchitectureLayer;
    index: number;
}) {
    const colors = ['#00D4FF', '#FFB800', '#00FF9C', '#E30913'];
    const color = colors[index % colors.length];

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
                border: `1px solid ${color}20`,
                background: `${color}05`,
                borderRadius: 10,
                padding: '2rem',
                backdropFilter: 'blur(14px)',
                boxShadow: `0 0 30px ${color}08`,
            }}
        >
            {/* Header */}
            <div
                style={{
                    marginBottom: '1.5rem',
                }}
            >
                <div
                    style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.72rem',
                        color,
                        letterSpacing: '0.22em',
                        marginBottom: '0.5rem',
                    }}
                >
                    LAYER {String(index + 1).padStart(2, '0')}
                </div>

                <div
                    style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: '1rem',
                        color: '#F0F0FF',
                        letterSpacing: '0.06em',
                        marginBottom: '0.5rem',
                    }}
                >
                    {layer.title}
                </div>

                <div
                    style={{
                        color: '#8888AA',
                        fontSize: '0.92rem',
                        lineHeight: 1.6,
                    }}
                >
                    {layer.description}
                </div>
            </div>

            {/* Items */}
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.8rem',
                }}
            >
                {layer.items.map((item, i) => (
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
                                color,
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
                            {item}
                        </div>
                    </div>
                ))}
            </div>
        </motion.div>
    );
}

export default function FinalArchitectureBlueprint({
    layers,
}: FinalArchitectureBlueprintProps) {
    return (
        <section
            id="architecture-blueprint"
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
                        PRODUCTION SYSTEM BLUEPRINT
                    </div>

                    <h2
                        style={{
                            fontFamily: 'var(--font-display)',
                            fontSize: 'clamp(2rem, 4vw, 3.8rem)',
                            color: '#F0F0FF',
                            marginBottom: '1rem',
                        }}
                    >
                        Final Architecture Blueprint
                    </h2>

                    <p
                        style={{
                            maxWidth: 820,
                            margin: '0 auto',
                            color: '#8888AA',
                            fontSize: '1rem',
                            lineHeight: 1.75,
                        }}
                    >
                        SystemForge produces a production-ready
                        architecture blueprint covering orchestration,
                        inference, infrastructure, observability,
                        deployment, and operational reliability.
                    </p>
                </motion.div>

                {/* Architecture Layers */}
                <div
                    style={{
                        display: 'grid',
                        gridTemplateColumns:
                            'repeat(auto-fit, minmax(320px, 1fr))',
                        gap: '1.6rem',
                    }}
                >
                    {layers.map((layer, index) => (
                        <LayerCard
                            key={index}
                            layer={layer}
                            index={index}
                        />
                    ))}
                </div>

                {/* Bottom Summary */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{
                        delay: 0.4,
                        duration: 0.6,
                    }}
                    style={{
                        marginTop: '3rem',
                        border: '1px solid rgba(227,9,19,0.16)',
                        background: 'rgba(227,9,19,0.03)',
                        borderRadius: 10,
                        padding: '2rem',
                        textAlign: 'center',
                    }}
                >
                    <div
                        style={{
                            fontFamily: 'var(--font-mono)',
                            fontSize: '0.72rem',
                            color: '#E30913',
                            letterSpacing: '0.22em',
                            marginBottom: '0.8rem',
                        }}
                    >
                        FINAL OUTCOME
                    </div>

                    <div
                        style={{
                            fontFamily: 'var(--font-display)',
                            fontSize: '1.15rem',
                            color: '#F0F0FF',
                            marginBottom: '0.8rem',
                        }}
                    >
                        From Manual Operations → Production-Ready AI System
                    </div>

                    <p
                        style={{
                            color: '#8888AA',
                            maxWidth: 760,
                            margin: '0 auto',
                            lineHeight: 1.7,
                            fontSize: '0.95rem',
                        }}
                    >
                        Workflow redesign, architecture validation,
                        AI inference, and deployment-ready system
                        planning — all inside one engineering platform.
                    </p>
                </motion.div>
            </div>
        </section>
    );
}