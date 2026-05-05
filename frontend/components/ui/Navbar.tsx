'use client';

import React from 'react';
import { motion } from 'framer-motion';

const navItems = [
    'Workflow Engine',
    'Agent Intelligence',
    'Architecture Blueprint',
    'AMD Inference',
];

export default function Navbar() {
    return (
        <motion.header
            initial={{ opacity: 0, y: -24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
                duration: 0.6,
                ease: 'easeOut',
            }}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                zIndex: 100,
                backdropFilter: 'blur(18px)',
                background: 'rgba(2, 2, 4, 0.72)',
                borderBottom: '1px solid rgba(255,255,255,0.05)',
            }}
        >
            <div
                style={{
                    maxWidth: '1400px',
                    margin: '0 auto',
                    padding: '18px 28px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '24px',
                }}
            >
                {/* Left: Brand */}
                <motion.div
                    whileHover={{ scale: 1.02 }}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        cursor: 'pointer',
                        userSelect: 'none',
                    }}
                >
                    <div
                        style={{
                            width: 38,
                            height: 38,
                            border: '1px solid rgba(227,9,19,0.35)',
                            borderRadius: 6,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            background: 'rgba(227,9,19,0.06)',
                            boxShadow:
                                '0 0 20px rgba(227,9,19,0.08)',
                        }}
                    >
                        <span
                            style={{
                                fontFamily: 'var(--font-display)',
                                fontSize: '0.9rem',
                                fontWeight: 700,
                                color: '#E30913',
                                letterSpacing: '0.08em',
                            }}
                        >
                            SF
                        </span>
                    </div>

                    <div>
                        <div
                            style={{
                                fontFamily: 'var(--font-display)',
                                fontSize: '1rem',
                                fontWeight: 700,
                                color: '#F0F0FF',
                                letterSpacing: '0.08em',
                                lineHeight: 1,
                            }}
                        >
                            SYSTEM
                            <span
                                style={{
                                    color: '#E30913',
                                    marginLeft: 2,
                                }}
                            >
                                FORGE
                            </span>
                        </div>

                        <div
                            style={{
                                fontFamily: 'var(--font-mono)',
                                fontSize: '0.58rem',
                                color: '#666680',
                                letterSpacing: '0.18em',
                                marginTop: 4,
                            }}
                        >
                            AI WORKFLOW REDESIGN ENGINE
                        </div>
                    </div>
                </motion.div>

                {/* Center: Nav Links */}
                <nav
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '28px',
                    }}
                >
                    {navItems.map((item, index) => (
                        <motion.button
                            key={index}
                            whileHover={{ y: -2 }}
                            style={{
                                background: 'transparent',
                                border: 'none',
                                outline: 'none',
                                cursor: 'pointer',
                                fontFamily: 'var(--font-mono)',
                                fontSize: '0.72rem',
                                color: '#8888AA',
                                letterSpacing: '0.14em',
                                transition: 'all 0.2s ease',
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.color =
                                    '#00D4FF';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.color =
                                    '#8888AA';
                            }}
                        >
                            {item}
                        </motion.button>
                    ))}
                </nav>

                {/* Right: Status */}
                <motion.div
                    whileHover={{ scale: 1.02 }}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        padding: '10px 16px',
                        border: '1px solid rgba(0,255,156,0.18)',
                        background: 'rgba(0,255,156,0.04)',
                        borderRadius: 6,
                    }}
                >
                    <motion.div
                        animate={{
                            scale: [1, 1.2, 1],
                            opacity: [1, 0.6, 1],
                        }}
                        transition={{
                            duration: 1.6,
                            repeat: Infinity,
                        }}
                        style={{
                            width: 8,
                            height: 8,
                            borderRadius: '50%',
                            background: '#00FF9C',
                            boxShadow:
                                '0 0 12px rgba(0,255,156,0.45)',
                        }}
                    />

                    <span
                        style={{
                            fontFamily: 'var(--font-mono)',
                            fontSize: '0.65rem',
                            color: '#00FF9C',
                            letterSpacing: '0.14em',
                        }}
                    >
                        AMD GPU ACTIVE
                    </span>
                </motion.div>
            </div>
        </motion.header>
    );
}