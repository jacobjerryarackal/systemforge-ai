'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { AgentOutput, AgentStatus } from '@/lib/types';

interface AgentCardProps {
  output: AgentOutput;
  index: number;
}

const AGENT_CONFIG = {
  architect: {
    num: '01',
    title: 'ARCHITECT',
    subtitle: 'System Design Agent',
    color: '#00D4FF',
    glow: 'rgba(0,212,255,0.3)',
    subtle: 'rgba(0,212,255,0.06)',
    icon: '⬡',
    persona: 'Senior Solutions Architect',
  },
  critic: {
    num: '02',
    title: 'CRITIC',
    subtitle: 'SRE Review Agent',
    color: '#FFB800',
    glow: 'rgba(255,184,0,0.3)',
    subtle: 'rgba(255,184,0,0.06)',
    icon: '◈',
    persona: 'Principal Site Reliability Engineer',
  },
  refiner: {
    num: '03',
    title: 'REFINER',
    subtitle: 'Self-Correction Agent',
    color: '#00FF9C',
    glow: 'rgba(0,255,156,0.3)',
    subtle: 'rgba(0,255,156,0.06)',
    icon: '◆',
    persona: 'Staff Platform Engineer',
  },
};

const STATUS_LABELS: Record<AgentStatus, string> = {
  idle: 'STANDBY',
  thinking: 'PROCESSING',
  complete: 'COMPLETE',
  error: 'ERROR',
};

export default function AgentCard({ output, index }: AgentCardProps) {
  const config = AGENT_CONFIG[output.agent];
  const [displayedContent, setDisplayedContent] = useState('');
  const [charIndex, setCharIndex] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Stream content character by character when complete
  useEffect(() => {
    if (output.status === 'complete' && output.content) {
      setDisplayedContent('');
      setCharIndex(0);
    }
  }, [output.status, output.content]);

  useEffect(() => {
    if (output.status !== 'complete' || !output.content) return;
    if (charIndex >= output.content.length) return;

    intervalRef.current = setInterval(() => {
      setCharIndex((prev) => {
        const next = prev + 6; // stream 6 chars at a time
        setDisplayedContent(output.content.slice(0, next));
        if (next >= output.content.length) {
          if (intervalRef.current) clearInterval(intervalRef.current);
        }
        return next;
      });
    }, 8);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [output.status, output.content, charIndex]);

  const isThinking = output.status === 'thinking';
  const isComplete = output.status === 'complete';

  return (
    <motion.div
      initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40, y: 20 }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{ delay: index * 0.15, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      style={{
        position: 'relative',
        border: `1px solid ${isComplete ? config.color + '40' : 'rgba(255,255,255,0.06)'}`,
        borderRadius: 4,
        overflow: 'hidden',
        background: isComplete ? config.subtle : 'rgba(13,13,26,0.6)',
        backdropFilter: 'blur(20px)',
        transition: 'all 0.5s ease',
        boxShadow: isComplete ? `0 0 40px ${config.glow}, 0 0 80px ${config.glow}22` : 'none',
      }}
    >
      {/* Active scan line */}
      {isThinking && (
        <motion.div
          animate={{ top: ['0%', '100%'] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            height: '2px',
            background: `linear-gradient(90deg, transparent, ${config.color}, transparent)`,
            zIndex: 5,
          }}
        />
      )}

      {/* Card Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '1rem 1.25rem',
          borderBottom: `1px solid rgba(255,255,255,0.04)`,
          background: 'rgba(0,0,0,0.2)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {/* Number + Icon */}
          <div
            style={{
              width: 40,
              height: 40,
              border: `1px solid ${config.color}50`,
              borderRadius: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              background: `${config.color}10`,
              position: 'relative',
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.55rem',
                color: config.color,
                letterSpacing: '0.1em',
              }}
            >
              {config.num}
            </span>
            <span style={{ fontSize: '0.9rem', lineHeight: 1 }}>{config.icon}</span>
          </div>

          {/* Title */}
          <div>
            <div
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '0.9rem',
                fontWeight: 700,
                color: config.color,
                letterSpacing: '0.15em',
              }}
            >
              {config.title}
            </div>
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.6rem',
                color: '#8888AA',
                letterSpacing: '0.08em',
                marginTop: 1,
              }}
            >
              {config.persona}
            </div>
          </div>
        </div>

        {/* Status */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {output.duration && isComplete && (
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.6rem',
                color: '#444466',
              }}
            >
              {(output.duration / 1000).toFixed(1)}s
            </span>
          )}
          <motion.div
            animate={isThinking ? { opacity: [1, 0.3, 1] } : {}}
            transition={{ duration: 0.8, repeat: Infinity }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '5px',
              padding: '3px 8px',
              borderRadius: 2,
              border: `1px solid ${
                isComplete
                  ? config.color + '50'
                  : isThinking
                  ? 'rgba(255,255,255,0.15)'
                  : 'rgba(255,255,255,0.06)'
              }`,
              background: isComplete ? `${config.color}15` : 'transparent',
            }}
          >
            <div
              style={{
                width: 5,
                height: 5,
                borderRadius: '50%',
                background: isComplete ? config.color : isThinking ? '#FFB800' : '#444466',
                boxShadow: isComplete ? `0 0 8px ${config.color}` : isThinking ? '0 0 8px #FFB800' : 'none',
              }}
            />
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.55rem',
                color: isComplete ? config.color : isThinking ? '#FFB800' : '#444466',
                letterSpacing: '0.15em',
              }}
            >
              {STATUS_LABELS[output.status]}
            </span>
          </motion.div>
        </div>
      </div>

      {/* Card Content */}
      <div style={{ padding: '1.25rem', minHeight: '200px' }}>
        <AnimatePresence mode="wait">
          {isThinking && (
            <motion.div
              key="thinking"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}
            >
              <ThinkingIndicator color={config.color} />
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.7rem',
                  color: '#444466',
                  marginTop: '0.5rem',
                }}
              >
                Agent is reasoning...
              </div>
              {[70, 55, 85, 45, 65].map((w, i) => (
                <motion.div
                  key={i}
                  animate={{ opacity: [0.2, 0.5, 0.2] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
                  style={{
                    height: 8,
                    width: `${w}%`,
                    borderRadius: 2,
                    background: 'rgba(255,255,255,0.05)',
                  }}
                />
              ))}
            </motion.div>
          )}

          {isComplete && (
            <motion.div
              key="content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
            >
              <MarkdownDisplay content={displayedContent} color={config.color} />
            </motion.div>
          )}

          {output.status === 'idle' && (
            <motion.div
              key="idle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '160px',
                flexDirection: 'column',
                gap: '12px',
              }}
            >
              <div
                style={{
                  width: 48,
                  height: 48,
                  border: `1px solid ${config.color}20`,
                  borderRadius: 4,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.5rem',
                  opacity: 0.3,
                }}
              >
                {config.icon}
              </div>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.65rem',
                  color: '#333355',
                  letterSpacing: '0.15em',
                }}
              >
                AWAITING_ACTIVATION
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

function ThinkingIndicator({ color }: { color: string }) {
  return (
    <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
      {[0, 1, 2, 3, 4].map((i) => (
        <motion.div
          key={i}
          animate={{ scaleY: [0.4, 1.4, 0.4] }}
          transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.1 }}
          style={{
            width: 3,
            height: 18,
            borderRadius: 2,
            background: color,
            transformOrigin: 'center',
            opacity: 0.7,
          }}
        />
      ))}
    </div>
  );
}

function MarkdownDisplay({ content, color }: { content: string; color: string }) {
  const lines = content.split('\n');

  return (
    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', lineHeight: 1.7 }}>
      {lines.map((line, i) => {
        if (line.startsWith('# ')) {
          return (
            <div
              key={i}
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1rem',
                fontWeight: 700,
                color,
                marginBottom: '0.75rem',
                marginTop: i > 0 ? '1rem' : 0,
                letterSpacing: '0.05em',
              }}
            >
              {line.replace(/^# /, '')}
            </div>
          );
        }
        if (line.startsWith('## ')) {
          return (
            <div
              key={i}
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '0.8rem',
                fontWeight: 600,
                color: '#F0F0FF',
                marginTop: '1rem',
                marginBottom: '0.5rem',
                letterSpacing: '0.1em',
                borderBottom: `1px solid rgba(255,255,255,0.06)`,
                paddingBottom: '4px',
              }}
            >
              {line.replace(/^## /, '')}
            </div>
          );
        }
        if (line.startsWith('### ')) {
          return (
            <div
              key={i}
              style={{
                fontSize: '0.75rem',
                fontWeight: 600,
                color: '#AAAACC',
                marginTop: '0.75rem',
                marginBottom: '0.25rem',
              }}
            >
              {line.replace(/^### /, '')}
            </div>
          );
        }
        if (line.startsWith('- ') || line.startsWith('* ')) {
          const text = line.replace(/^[-*] /, '');
          return (
            <div key={i} style={{ display: 'flex', gap: '8px', marginBottom: '2px', paddingLeft: '8px' }}>
              <span style={{ color, flexShrink: 0 }}>▸</span>
              <span style={{ color: '#C0C0D8' }}>{renderInline(text, color)}</span>
            </div>
          );
        }
        if (line.startsWith('✅') || line.startsWith('⚠️') || line.startsWith('🟡')) {
          return (
            <div key={i} style={{ color: '#F0F0FF', marginBottom: '2px', paddingLeft: '4px' }}>
              {renderInline(line, color)}
            </div>
          );
        }
        if (line === '') {
          return <div key={i} style={{ height: '0.4rem' }} />;
        }
        return (
          <div key={i} style={{ color: '#B0B0C8', marginBottom: '1px' }}>
            {renderInline(line, color)}
          </div>
        );
      })}
    </div>
  );
}

function renderInline(text: string, color: string): React.ReactNode {
  const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={i} style={{ color: '#F0F0FF', fontWeight: 700 }}>
          {part.slice(2, -2)}
        </strong>
      );
    }
    if (part.startsWith('`') && part.endsWith('`')) {
      return (
        <code
          key={i}
          style={{
            color,
            background: 'rgba(255,255,255,0.06)',
            padding: '1px 5px',
            borderRadius: 2,
            fontSize: '0.75rem',
          }}
        >
          {part.slice(1, -1)}
        </code>
      );
    }
    return part;
  });
}
