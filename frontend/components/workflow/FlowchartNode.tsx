'use client';

import React from 'react';
import { motion } from 'framer-motion';

export type FlowchartNodeType =
    | 'task'
    | 'decision'
    | 'api'
    | 'queue'
    | 'llm'
    | 'approval'
    | 'human_review'
    | 'notification';

interface FlowchartNodeProps {
    title: string;
    type: FlowchartNodeType;
    subtitle?: string;
}

function getNodeAccent(
    type: FlowchartNodeType
) {
    switch (type) {
        case 'decision':
            return '#F59E0B';

        case 'api':
            return '#3B82F6';

        case 'queue':
            return '#8B5CF6';

        case 'llm':
            return '#EC4899';

        case 'approval':
            return '#22C55E';

        case 'human_review':
            return '#F97316';

        case 'notification':
            return '#06B6D4';

        default:
            return '#00D4FF';
    }
}

function getNodeIcon(
    type: FlowchartNodeType
) {
    switch (type) {
        case 'decision':
            return '?';

        case 'api':
            return '⚡';

        case 'queue':
            return '⇄';

        case 'llm':
            return '🤖';

        case 'approval':
            return '✓';

        case 'human_review':
            return '🧑';

        case 'notification':
            return '📩';

        default:
            return '□';
    }
}

export default function FlowchartNode({
    title,
    type,
    subtitle,
}: FlowchartNodeProps) {
    const accent = getNodeAccent(type);
    const icon = getNodeIcon(type);
    const isDecision =
        type === 'decision';

    return (
        <motion.div
            initial={{
                opacity: 0,
                y: 20,
            }}
            whileInView={{
                opacity: 1,
                y: 0,
            }}
            viewport={{
                once: true,
            }}
            transition={{
                duration: 0.4,
            }}
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                marginBottom: '32px',
            }}
        >
            {/* Node Shape */}
            <div
                style={{
                    width: isDecision ? 130 : 240,
                    height: isDecision ? 130 : 110,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: `1px solid ${accent}30`,
                    background: `${accent}08`,
                    borderRadius: isDecision
                        ? '18px'
                        : '18px',
                    transform: isDecision
                        ? 'rotate(45deg)'
                        : 'none',
                    backdropFilter: 'blur(10px)',
                    padding: '20px',
                    textAlign: 'center',
                }}
            >
                <div
                    style={{
                        transform: isDecision
                            ? 'rotate(-45deg)'
                            : 'none',
                        maxWidth: '85%',
                    }}
                >
                    <div
                        style={{
                            color: accent,
                            fontSize: '18px',
                            marginBottom: '10px',
                            fontWeight: 700,
                        }}
                    >
                        {icon}
                    </div>

                    <div
                        style={{
                            color: '#F0F0FF',
                            fontSize: '15px',
                            fontWeight: 600,
                            lineHeight: 1.5,
                        }}
                    >
                        {title}
                    </div>

                    {subtitle && (
                        <div
                            style={{
                                marginTop: '8px',
                                color: '#94A3B8',
                                fontSize: '12px',
                                lineHeight: 1.5,
                            }}
                        >
                            {subtitle}
                        </div>
                    )}
                </div>
            </div>

            {/* Connector Line */}
            <div
                style={{
                    width: '2px',
                    height: '40px',
                    background:
                        'rgba(255,255,255,0.08)',
                    marginTop: '14px',
                }}
            />
        </motion.div>
    );
}
