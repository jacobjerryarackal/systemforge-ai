'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button, Input } from 'antd';
import { ThunderboltOutlined, CodeOutlined } from '@ant-design/icons';

const { TextArea } = Input;

interface HeroSectionProps {
  onSubmit: (description: string) => void;
  isRunning: boolean;
}

const EXAMPLE_PROMPTS = [
  'E-commerce platform with 1M DAU, real-time inventory, payment processing, and ML-based recommendations',
  'Healthcare data pipeline with HIPAA compliance, real-time patient monitoring, and AI diagnosis assistance',
  'Fintech trading platform with sub-millisecond latency, fraud detection, and regulatory reporting',
];

function CornerAccent({
  position,
}: {
  position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
}) {
  const size = 12;
  const pos: React.CSSProperties = {
    position: 'absolute',
    width: size,
    height: size,
    borderColor: '#E30913',
    borderStyle: 'solid',
    borderWidth: 0,
    borderTopWidth: position.startsWith('top') ? 2 : 0,
    borderBottomWidth: position.startsWith('bottom') ? 2 : 0,
    borderLeftWidth: position.endsWith('left') ? 2 : 0,
    borderRightWidth: position.endsWith('right') ? 2 : 0,
    top: position.startsWith('top') ? -1 : undefined,
    bottom: position.startsWith('bottom') ? -1 : undefined,
    left: position.endsWith('left') ? -1 : undefined,
    right: position.endsWith('right') ? -1 : undefined,
  };
  return <div style={pos} />;
}

export default function HeroSection({ onSubmit, isRunning }: HeroSectionProps) {
  const [description, setDescription] = useState('');

  const handleSubmit = () => {
    if (description.trim() && !isRunning) onSubmit(description.trim());
  };

  return (
    <section
      style={{
        position: 'relative',
        zIndex: 10,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        padding: '80px 2rem 4rem',
        textAlign: 'center',
      }}
    >
      {/* Eyebrow */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2rem' }}
      >
        <div style={{ width: 32, height: 1, background: 'rgba(227,9,19,0.5)' }} />
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.7rem',
            color: '#E30913',
            letterSpacing: '0.3em',
          }}
        >
          AUTONOMOUS MULTI-AGENT ENGINE
        </span>
        <div style={{ width: 32, height: 1, background: 'rgba(227,9,19,0.5)' }} />
      </motion.div>

      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35, duration: 0.7 }}
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(3rem, 8vw, 7rem)',
          fontWeight: 900,
          lineHeight: 1,
          letterSpacing: '-0.02em',
          marginBottom: '1.5rem',
        }}
      >
        <span style={{ color: '#F0F0FF' }}>SYSTEM</span>
        <span
          style={{
            color: '#E30913',
            textShadow: '0 0 40px rgba(227,9,19,0.6), 0 0 80px rgba(227,9,19,0.3)',
          }}
        >
          FORGE
        </span>
        <br />
        <span
          style={{
            fontSize: 'clamp(1.5rem, 3vw, 2.8rem)',
            color: '#8888AA',
            fontWeight: 400,
            letterSpacing: '0.05em',
          }}
        >
          AI
        </span>
      </motion.h1>

      {/* Tagline */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.55, duration: 0.6 }}
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: 'clamp(1rem, 2vw, 1.35rem)',
          color: '#8888AA',
          maxWidth: '640px',
          lineHeight: 1.6,
          marginBottom: '3rem',
        }}
      >
        Plans, validates, and self-corrects production-grade architectures using{' '}
        <span style={{ color: '#00D4FF' }}>AMD-accelerated Qwen models</span>.
      </motion.p>

      {/* Agent pills */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.7, duration: 0.5 }}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
          marginBottom: '3rem',
          flexWrap: 'wrap',
          justifyContent: 'center',
        }}
      >
        {(
          [
            { num: '01', name: 'ARCHITECT', color: '#00D4FF' },
            null,
            { num: '02', name: 'CRITIC', color: '#FFB800' },
            null,
            { num: '03', name: 'REFINER', color: '#00FF9C' },
          ] as Array<{ num: string; name: string; color: string } | null>
        ).map((item, i) =>
          item === null ? (
            <span key={i} style={{ color: '#444466', fontSize: '1.2rem', padding: '0 4px' }}>
              →
            </span>
          ) : (
            <div
              key={i}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: '8px 20px',
                border: `1px solid ${item.color}33`,
                borderRadius: 2,
                background: `${item.color}08`,
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.6rem',
                  color: item.color,
                  letterSpacing: '0.2em',
                }}
              >
                {item.num}
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '0.75rem',
                  color: item.color,
                  letterSpacing: '0.15em',
                  marginTop: 2,
                }}
              >
                {item.name}
              </span>
            </div>
          )
        )}
      </motion.div>

      {/* Input box */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.85, duration: 0.6 }}
        style={{ width: '100%', maxWidth: '780px' }}
      >
        <div
          style={{
            position: 'relative',
            border: '1px solid rgba(227,9,19,0.25)',
            borderRadius: 4,
            padding: '1.5rem',
            background: 'rgba(13,13,26,0.8)',
            backdropFilter: 'blur(20px)',
            marginBottom: '1rem',
          }}
        >
          <CornerAccent position="top-left" />
          <CornerAccent position="top-right" />
          <CornerAccent position="bottom-left" />
          <CornerAccent position="bottom-right" />

          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.65rem',
              color: '#E30913',
              letterSpacing: '0.2em',
              marginBottom: '0.75rem',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <CodeOutlined />
            PROJECT_DESCRIPTION
          </div>

          <TextArea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe your system: scale, requirements, constraints, domain..."
            rows={4}
            style={{
              resize: 'none',
              fontSize: '0.95rem',
              lineHeight: 1.6,
              background: 'transparent',
              border: 'none',
              boxShadow: 'none',
              padding: 0,
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) handleSubmit();
            }}
          />

          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: '1rem',
            }}
          >
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: '#444466' }}>
              Ctrl+Enter to run
            </span>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.6rem',
                color: description.length > 50 ? '#00FF9C' : '#444466',
              }}
            >
              {description.length} chars
            </span>
          </div>
        </div>

        <Button
          type="primary"
          size="large"
          icon={<ThunderboltOutlined />}
          loading={isRunning}
          onClick={handleSubmit}
          disabled={!description.trim() || isRunning}
          style={{
            width: '100%',
            height: '52px',
            fontFamily: 'var(--font-display)',
            fontSize: '0.85rem',
            letterSpacing: '0.2em',
            background: isRunning
              ? 'rgba(227,9,19,0.3)'
              : 'linear-gradient(135deg, #E30913 0%, #B5060F 100%)',
            border: 'none',
            borderRadius: 2,
            boxShadow: isRunning ? 'none' : '0 0 30px rgba(227,9,19,0.4)',
          }}
        >
          {isRunning ? 'FORGING ARCHITECTURE...' : 'INITIATE SYSTEMFORGE →'}
        </Button>

        {/* Example prompts */}
        <div style={{ marginTop: '1.5rem' }}>
          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.6rem',
              color: '#444466',
              letterSpacing: '0.2em',
              marginBottom: '0.75rem',
              textAlign: 'left',
            }}
          >
            EXAMPLE_PROMPTS:
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {EXAMPLE_PROMPTS.map((prompt, i) => (
              <button
                key={i}
                onClick={() => setDescription(prompt)}
                style={{
                  background: 'rgba(0,212,255,0.04)',
                  border: '1px solid rgba(0,212,255,0.12)',
                  borderRadius: 2,
                  padding: '8px 12px',
                  color: '#8888AA',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.7rem',
                  textAlign: 'left',
                  cursor: 'pointer',
                  lineHeight: 1.4,
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#00D4FF';
                  e.currentTarget.style.borderColor = 'rgba(0,212,255,0.3)';
                  e.currentTarget.style.background = 'rgba(0,212,255,0.08)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = '#8888AA';
                  e.currentTarget.style.borderColor = 'rgba(0,212,255,0.12)';
                  e.currentTarget.style.background = 'rgba(0,212,255,0.04)';
                }}
              >
                ↳ {prompt}
              </button>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
