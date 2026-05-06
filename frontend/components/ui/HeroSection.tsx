import React from 'react';
import { motion } from 'framer-motion';
import WorkflowBuilder from '../workflow/WorkflowBuilder';

interface HeroSectionProps {
  onSubmit: (workflowText: string) => void;
  isRunning: boolean;
}

const EXAMPLE_WORKFLOWS = [
  {
    title: 'E-commerce Operations Chaos',
    flow:
      'Orders come from Shopify → Team manually updates inventory in Excel → Slack message sent to warehouse → Warehouse updates delivery status manually → Customer support manually handles delays',
  },
  {
    title: 'Hospital Approval Workflow',
    flow:
      'Patient fills intake form → Reception manually verifies insurance → Doctor manually reviews reports → Lab sends PDF reports by email → Admin manually updates billing',
  },
  {
    title: 'Hiring Workflow Mess',
    flow:
      'Resume comes from LinkedIn → HR manually shortlists candidates → Interview scheduling via WhatsApp → Feedback collected in Google Sheets → Offer approval delayed manually',
  },
  {
    title: 'Startup Support Workflow',
    flow:
      'Customer submits issue → Support team checks CRM manually → Engineering gets pinged in Slack → Fix status tracked in Notion → Customer gets manual update email',
  },
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

export default function HeroSection({
  onSubmit,
  isRunning,
}: HeroSectionProps) {
  return (
    <section
      style={{
        position: 'relative',
        zIndex: 10,
        minHeight: '100vh',
        display: 'flex',
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
          maxWidth: '1200px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {/* EYEBROW */}
        <motion.div
          variants={fadeUp}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            marginBottom: '28px',
          }}
        >
          <div
            style={{
              width: 60,
              height: 1,
              background:
                'linear-gradient(90deg, transparent, rgba(227,9,19,0.7))',
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
            WORKFLOW REDESIGN ENGINE
          </span>

          <div
            style={{
              width: 60,
              height: 1,
              background:
                'linear-gradient(90deg, rgba(227,9,19,0.7), transparent)',
            }}
          />
        </motion.div>

        {/* TITLE */}
        <motion.div
          variants={fadeUp}
          style={{
            textAlign: 'center',
            marginBottom: '28px',
          }}
        >
          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(4rem, 10vw, 8rem)',
              lineHeight: 0.95,
              fontWeight: 900,
              letterSpacing: '-0.03em',
              marginBottom: '16px',
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

          <div
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.5rem, 3vw, 2.6rem)',
              color: '#8888AA',
              letterSpacing: '0.08em',
            }}
          >
            Messy Workflow → AI-Native Architecture
          </div>
        </motion.div>

        {/* TAGLINE */}
        <motion.p
          variants={fadeUp}
          style={{
            maxWidth: '860px',
            textAlign: 'center',
            fontSize: 'clamp(1rem, 2vw, 1.25rem)',
            lineHeight: 1.8,
            color: '#8888AA',
            marginBottom: '52px',
          }}
        >
          Transform approvals, spreadsheets, manual handoffs, broken operations,
          and disconnected systems into scalable production-grade AI workflows
          powered by{' '}
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
            marginBottom: '56px',
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
                  scale: 1.03,
                  y: -2,
                }}
                style={{
                  padding: '14px 30px',
                  border: `1px solid ${item.color}30`,
                  background: `${item.color}08`,
                  borderRadius: 4,
                  minWidth: 190,
                  textAlign: 'center',
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

        {/* WORKFLOW BUILDER */}
        <motion.div
          variants={fadeUp}
          style={{
            width: '100%',
            maxWidth: '980px',
            marginBottom: '48px',
          }}
        >
          <WorkflowBuilder
            onGenerate={(steps: string[]) => onSubmit(steps.join(' → '))}
            isRunning={isRunning}
          />
        </motion.div>

        {/* EXAMPLE WORKFLOWS */}
        <motion.div
          variants={fadeUp}
          style={{
            width: '100%',
            maxWidth: '980px',
          }}
        >
          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.7rem',
              letterSpacing: '0.28em',
              color: '#444466',
              marginBottom: '18px',
              textAlign: 'center',
            }}
          >
            EXAMPLE_MESSY_WORKFLOWS
          </div>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '18px',
            }}
          >
            {EXAMPLE_WORKFLOWS.map((item, index) => (
              <motion.div
                key={index}
                whileHover={{
                  y: -2,
                }}
                style={{
                  background:
                    'rgba(0,212,255,0.04)',
                  border:
                    '1px solid rgba(0,212,255,0.12)',
                  borderRadius: 4,
                  padding: '22px',
                  cursor: 'pointer',
                }}
              >
                <div
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.1rem',
                    color: '#00D4FF',
                    marginBottom: '12px',
                  }}
                >
                  {item.title}
                </div>

                <div
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.88rem',
                    lineHeight: 1.8,
                    color: '#8888AA',
                  }}
                >
                  {item.flow}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}