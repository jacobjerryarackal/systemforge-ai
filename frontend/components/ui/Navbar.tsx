'use client';

import React from 'react';
import { motion } from 'framer-motion';

const navItems = [
    {
        label: 'Workflow Engine',
        target: 'workflow-engine',
    },
    {
        label: 'Agent Intelligence',
        target: 'agent-intelligence',
    },
    {
        label: 'Architecture Blueprint',
        target: 'architecture-blueprint',
    },
    {
        label: 'AMD Inference',
        target: 'amd-inference',
    },
];

export default function Navbar() {
    const scrollToSection = (id: string) => {
        const section = document.getElementById(id);

        if (section) {
            section.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
            });
        }
    };

    return (
        <header
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                zIndex: 100,
                backdropFilter: 'blur(20px)',
                background: 'rgba(3, 4, 10, 0.75)',
                borderBottom:
                    '1px solid rgba(255,255,255,0.04)',
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
                {/* Logo */}
                <div
                    style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: '1rem',
                        color: '#F0F0FF',
                        letterSpacing: '0.08em',
                        cursor: 'pointer',
                    }}
                    onClick={() =>
                        window.scrollTo({
                            top: 0,
                            behavior: 'smooth',
                        })
                    }
                >
                    SYSTEM
                    <span
                        style={{
                            color: '#E30913',
                        }}
                    >
                        FORGE
                    </span>
                </div>

                {/* Nav Links */}
                <div
                    style={{
                        display: 'flex',
                        gap: '2rem',
                        alignItems: 'center',
                    }}
                >
                    {navItems.map((item, index) => (
                        <motion.button
                            key={index}
                            whileHover={{
                                y: -2,
                            }}
                            onClick={() =>
                                scrollToSection(item.target)
                            }
                            style={{
                                background: 'transparent',
                                border: 'none',
                                cursor: 'pointer',
                                color: '#8888AA',
                                fontFamily: 'var(--font-mono)',
                                fontSize: '0.72rem',
                                letterSpacing: '0.12em',
                            }}
                        >
                            {item.label}
                        </motion.button>
                    ))}
                </div>

                {/* Status */}
                <div
                    style={{
                        padding: '8px 14px',
                        border:
                            '1px solid rgba(0,255,156,0.15)',
                        borderRadius: 6,
                        background:
                            'rgba(0,255,156,0.03)',
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.65rem',
                        color: '#00FF9C',
                        letterSpacing: '0.12em',
                    }}
                >
                    AMD READY
                </div>
            </div>
        </header>
    );
}