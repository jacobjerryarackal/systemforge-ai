'use client';

import { motion } from 'framer-motion';

export default function Header() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        borderBottom: '1px solid rgba(227,9,19,0.15)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        background: 'rgba(7,7,15,0.85)',
        padding: '0 2rem',
        height: '60px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      {/* Logo */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
          style={{
            width: 28,
            height: 28,
            border: '2px solid #E30913',
            borderRadius: 4,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              width: 10,
              height: 10,
              background: '#E30913',
              borderRadius: 2,
              boxShadow: '0 0 12px rgba(227,9,19,0.8)',
            }}
          />
        </motion.div>
        <div>
          <div
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '0.85rem',
              fontWeight: 700,
              color: '#F0F0FF',
              letterSpacing: '0.12em',
            }}
          >
            SYSTEM<span style={{ color: '#E30913' }}>FORGE</span>
          </div>
          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.55rem',
              color: '#8888AA',
              letterSpacing: '0.2em',
              marginTop: -2,
            }}
          >
            AI ARCHITECTURE ENGINE
          </div>
        </div>
      </div>

      {/* Status pills */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
        <StatusPill label="AMD ROCm" color="#E30913" />
        <StatusPill label="Qwen 2.5" color="#00D4FF" />
        <StatusPill label="vLLM" color="#00FF9C" pulse />
      </div>

      {/* AMD Badge */}
      <div
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: '0.6rem',
          fontWeight: 700,
          letterSpacing: '0.15em',
          color: '#E30913',
          border: '1px solid rgba(227,9,19,0.4)',
          padding: '4px 10px',
          borderRadius: 2,
        }}
      >
        AMD HACKATHON · TRACK 1
      </div>
    </motion.header>
  );
}

function StatusPill({ label, color, pulse }: { label: string; color: string; pulse?: boolean }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
      <motion.div
        animate={pulse ? { opacity: [1, 0.3, 1] } : {}}
        transition={{ duration: 1.5, repeat: Infinity }}
        style={{
          width: 6,
          height: 6,
          borderRadius: '50%',
          background: color,
          boxShadow: `0 0 8px ${color}`,
        }}
      />
      <span
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.65rem',
          color: '#8888AA',
          letterSpacing: '0.08em',
        }}
      >
        {label}
      </span>
    </div>
  );
}
