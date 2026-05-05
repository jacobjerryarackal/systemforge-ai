'use client';

import { motion } from 'framer-motion';
import type { AgentOutput } from '../../lib/types';
import AgentCard from './AgentCard';

interface AgentPipelineProps {
  outputs: AgentOutput[];
  isRunning: boolean;
}

export default function AgentPipeline({ outputs, isRunning }: AgentPipelineProps) {
  const hasOutput = outputs.some((o) => o.status !== 'idle');
  const allComplete = outputs.every((o) => o.status === 'complete') && outputs.length === 3;

  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: hasOutput ? 1 : 0, y: hasOutput ? 0 : 40 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      style={{
        position: 'relative',
        zIndex: 10,
        padding: '0 2rem 6rem',
        maxWidth: '1400px',
        margin: '0 auto',
      }}
    >
      {/* Section header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '1rem',
          marginBottom: '2.5rem',
        }}
      >
        <div
          style={{
            flex: 1,
            height: 1,
            background: 'linear-gradient(90deg, transparent, rgba(227,9,19,0.3))',
          }}
        />
        <div
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.65rem',
            color: '#E30913',
            letterSpacing: '0.3em',
            whiteSpace: 'nowrap',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          {isRunning && (
            <motion.div
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 0.6, repeat: Infinity }}
              style={{
                width: 6,
                height: 6,
                borderRadius: '50%',
                background: '#E30913',
                boxShadow: '0 0 10px rgba(227,9,19,0.8)',
              }}
            />
          )}
          SELF-CORRECTION PIPELINE
        </div>
        <div
          style={{
            flex: 1,
            height: 1,
            background: 'linear-gradient(90deg, rgba(227,9,19,0.3), transparent)',
          }}
        />
      </div>

      {/* Agent Cards Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
          gap: '1.5rem',
        }}
      >
        {outputs.map((output, i) => (
          <AgentCard key={output.agent} output={output} index={i} />
        ))}
      </div>

      {/* Flow complete banner */}
      {allComplete && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          style={{
            marginTop: '2rem',
            padding: '1.25rem 2rem',
            border: '1px solid rgba(0,255,156,0.25)',
            borderRadius: 4,
            background: 'rgba(0,255,156,0.04)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1rem',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <motion.div
              animate={{ scale: [1, 1.15, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              style={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                background: '#00FF9C',
                boxShadow: '0 0 15px rgba(0,255,156,0.6)',
              }}
            />
            <span
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '0.8rem',
                color: '#00FF9C',
                letterSpacing: '0.15em',
              }}
            >
              ARCHITECTURE SELF-CORRECTION COMPLETE
            </span>
          </div>
          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.65rem',
              color: '#8888AA',
              letterSpacing: '0.1em',
            }}
          >
            Powered by AMD ROCm + Qwen2.5 + vLLM
          </div>
        </motion.div>
      )}
    </motion.section>
  );
}
