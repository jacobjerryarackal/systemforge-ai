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
    isLast?: boolean;
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
    isLast = false,
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
                duration: 0.45,
            }}
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                marginBottom: isLast ? 0 : 30,
            }}
        >
            {/* NODE */}
            <div
                style={{
                    width: isDecision ? 220 : 360,
                    minHeight: isDecision
                        ? 220
                        : 150,

                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',

                    border: `1px solid ${accent}35`,
                    background: `${accent}08`,
                    backdropFilter: 'blur(14px)',

                    padding: isDecision
                        ? '20px'
                        : '28px',

                    textAlign: 'center',

                    borderRadius: isDecision
                        ? '28px'
                        : '22px',

                    transform: isDecision
                        ? 'rotate(45deg)'
                        : 'none',

                    boxShadow: `0 0 0 1px ${accent}08`,
                }}
            >
                <div
                    style={{
                        width: '100%',
                        maxWidth: isDecision
                            ? '78%'
                            : '100%',

                        transform: isDecision
                            ? 'rotate(-45deg)'
                            : 'none',

                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    {/* ICON ONLY */}
                    <div
                        style={{
                            color: accent,
                            fontSize: '24px',
                            fontWeight: 700,
                            marginBottom: '14px',
                            lineHeight: 1,
                        }}
                    >
                        {icon}
                    </div>

                    {/* TITLE ONLY */}
                    <div
                        style={{
                            color: '#F0F0FF',
                            fontSize: isDecision
                                ? '15px'
                                : '16px',
                            fontWeight: 600,
                            lineHeight: 1.8,
                            letterSpacing: '0.01em',
                            wordBreak: 'break-word',
                            whiteSpace: 'normal',
                        }}
                    >
                        {title}
                    </div>

                    {/* Optional subtitle */}
                    {subtitle && (
                        <div
                            style={{
                                marginTop: '10px',
                                color: '#94A3B8',
                                fontSize: '12px',
                                lineHeight: 1.6,
                            }}
                        >
                            {subtitle}
                        </div>
                    )}
                </div>
            </div>

            {/* CONNECTOR LINE */}
            {!isLast && (
                <div
                    style={{
                        width: '2px',
                        height: '38px',
                        marginTop: '14px',
                        background:
                            'rgba(255,255,255,0.08)',
                    }}
                />
            )}
        </motion.div>
    );
}