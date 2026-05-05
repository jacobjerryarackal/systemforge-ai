import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button, Input } from 'antd';
import {
  ThunderboltOutlined,
  CodeOutlined,
} from '@ant-design/icons';

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

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.14,
    },
  },
};

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: 'easeOut',
    },
  },
};

function CornerAccent({
  position,
}: {
  position:
  | 'top-left'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-right';
}) {
  const size = 12;

  const style: React.CSSProperties = {
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

  return <div style={style} />;
}

export default function HeroSection({
  onSubmit,
  isRunning,
}: HeroSectionProps) {
  const [description, setDescription] = useState('');

  const handleSubmit = () => {
    if (!description.trim() || isRunning) return;
    onSubmit(description.trim());
  };

  return (
    <section
      style={{
        position: 'relative',
        zIndex: 10,
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '120px 24px 80px',
      }}
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        style={{
          width: '100%',
          maxWidth: '1100px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
        }}
      >
        {/* EYEBROW */}
        <motion.div
          variants={fadeUp}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            marginBottom: '32px',
          }}
        >
          <div
            style={{
              width: 48,
              height: 1,
              background:
                'linear-gradient(90deg, transparent, rgba(227,9,19,0.6))',
            }}
          />

          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.72rem',
              letterSpacing: '0.35em',
              color: '#E30913',
            }}
          >
            AUTONOMOUS MULTI-AGENT ENGINE
          </span>

          <div
            style={{
              width: 48,
              height: 1,
              background:
                'linear-gradient(90deg, rgba(227,9,19,0.6), transparent)',
            }}
          />
        </motion.div>

        {/* TITLE */}
        <motion.div variants={fadeUp}>
          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(4rem, 10vw, 9rem)',
              lineHeight: 0.95,
              fontWeight: 900,
              letterSpacing: '-0.03em',
              marginBottom: '20px',
            }}
          >
            <span style={{ color: '#F0F0FF' }}>
              SYSTEM
            </span>

            <span
              style={{
                color: '#E30913',
                textShadow:
                  '0 0 30px rgba(227,9,19,0.5), 0 0 80px rgba(227,9,19,0.25)',
              }}
            >
              FORGE
            </span>
          </h1>

          <motion.div
            animate={{
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              repeat: Infinity,
              duration: 3,
            }}
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              color: '#8888AA',
              marginBottom: '28px',
              letterSpacing: '0.08em',
            }}
          >
            AI
          </motion.div>
        </motion.div>

        {/* TAGLINE */}
        <motion.p
          variants={fadeUp}
          style={{
            maxWidth: '760px',
            fontSize: 'clamp(1rem, 2vw, 1.35rem)',
            lineHeight: 1.7,
            color: '#8888AA',
            marginBottom: '48px',
          }}
        >
          Plans, validates, and self-corrects
          production-grade architectures using{' '}
          <span
            style={{
              color: '#00D4FF',
              textShadow:
                '0 0 20px rgba(0,212,255,0.18)',
            }}
          >
            AMD-accelerated Qwen models
          </span>
          .
        </motion.p>

        {/* AGENT FLOW */}
        <motion.div
          variants={fadeUp}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexWrap: 'wrap',
            gap: '10px',
            marginBottom: '52px',
          }}
        >
          {[
            {
              num: '01',
              title: 'ARCHITECT',
              color: '#00D4FF',
            },
            {
              num: '02',
              title: 'CRITIC',
              color: '#FFB800',
            },
            {
              num: '03',
              title: 'REFINER',
              color: '#00FF9C',
            },
          ].map((item, index) => (
            <React.Fragment key={item.title}>
              <motion.div
                whileHover={{
                  scale: 1.04,
                  y: -2,
                }}
                style={{
                  padding: '12px 28px',
                  border: `1px solid ${item.color}30`,
                  background: `${item.color}08`,
                  borderRadius: 4,
                  minWidth: 170,
                }}
              >
                <div
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.7rem',
                    color: item.color,
                    letterSpacing: '0.25em',
                    marginBottom: 4,
                  }}
                >
                  {item.num}
                </div>

                <div
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '0.95rem',
                    color: item.color,
                    letterSpacing: '0.18em',
                  }}
                >
                  {item.title}
                </div>
              </motion.div>

              {index < 2 && (
                <div
                  style={{
                    color: '#444466',
                    fontSize: '1.2rem',
                  }}
                >
                  →
                </div>
              )}
            </React.Fragment>
          ))}
        </motion.div>

        {/* INPUT SECTION */}
        <motion.div
          variants={fadeUp}
          style={{
            width: '100%',
            maxWidth: '850px',
          }}
        >
          <div
            style={{
              position: 'relative',
              background:
                'rgba(13,13,26,0.82)',
              border:
                '1px solid rgba(227,9,19,0.22)',
              borderRadius: 4,
              padding: '28px',
              backdropFilter: 'blur(18px)',
              marginBottom: '16px',
            }}
          >
            <CornerAccent position="top-left" />
            <CornerAccent position="top-right" />
            <CornerAccent position="bottom-left" />
            <CornerAccent position="bottom-right" />

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                marginBottom: '14px',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.68rem',
                letterSpacing: '0.24em',
                color: '#E30913',
              }}
            >
              <CodeOutlined />
              PROJECT_DESCRIPTION
            </div>

            <TextArea
              value={description}
              onChange={(e) =>
                setDescription(e.target.value)
              }
              placeholder="Describe your system: scale, constraints, latency, availability, domain..."
              rows={5}
              style={{
                resize: 'none',
                background: 'transparent',
                border: 'none',
                boxShadow: 'none',
                color: '#F0F0FF',
                fontSize: '1rem',
                lineHeight: 1.7,
                padding: 0,
              }}
              onKeyDown={(e) => {
                if (
                  e.key === 'Enter' &&
                  (e.ctrlKey || e.metaKey)
                ) {
                  handleSubmit();
                }
              }}
            />

            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginTop: '18px',
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.65rem',
                  color: '#444466',
                }}
              >
                Ctrl + Enter to run
              </span>

              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.65rem',
                  color:
                    description.length > 50
                      ? '#00FF9C'
                      : '#444466',
                }}
              >
                {description.length} chars
              </span>
            </div>
          </div>

          {/* CTA BUTTON */}
          <motion.div
            whileHover={{
              scale: 1.01,
            }}
            whileTap={{
              scale: 0.99,
            }}
          >
            <Button
              type="primary"
              size="large"
              icon={<ThunderboltOutlined />}
              loading={isRunning}
              onClick={handleSubmit}
              disabled={
                !description.trim() || isRunning
              }
              style={{
                width: '100%',
                height: 58,
                border: 'none',
                borderRadius: 4,
                fontFamily: 'var(--font-display)',
                fontSize: '0.88rem',
                letterSpacing: '0.18em',
                background: isRunning
                  ? 'rgba(227,9,19,0.35)'
                  : 'linear-gradient(135deg, #E30913 0%, #B5060F 100%)',
                boxShadow:
                  '0 0 40px rgba(227,9,19,0.28)',
              }}
            >
              {isRunning
                ? 'FORGING ARCHITECTURE...'
                : 'INITIATE SYSTEMFORGE →'}
            </Button>
          </motion.div>

          {/* EXAMPLES */}
          <motion.div
            variants={fadeUp}
            style={{
              marginTop: '28px',
            }}
          >
            <div
              style={{
                textAlign: 'left',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.65rem',
                letterSpacing: '0.24em',
                color: '#444466',
                marginBottom: '14px',
              }}
            >
              EXAMPLE_PROMPTS:
            </div>

            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 10,
              }}
            >
              {EXAMPLE_PROMPTS.map(
                (prompt, index) => (
                  <motion.button
                    key={index}
                    whileHover={{
                      x: 4,
                    }}
                    onClick={() =>
                      setDescription(prompt)
                    }
                    style={{
                      background:
                        'rgba(0,212,255,0.04)',
                      border:
                        '1px solid rgba(0,212,255,0.12)',
                      borderRadius: 4,
                      padding: '12px 14px',
                      textAlign: 'left',
                      cursor: 'pointer',
                      color: '#8888AA',
                      fontFamily:
                        'var(--font-mono)',
                      fontSize: '0.76rem',
                      lineHeight: 1.5,
                    }}
                  >
                    ↳ {prompt}
                  </motion.button>
                )
              )}
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
