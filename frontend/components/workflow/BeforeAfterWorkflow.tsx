'use client';

import React from 'react';
import { motion } from 'framer-motion';
import type { WorkflowTransformation } from '../../lib/types';
import FlowchartNode from './FlowchartNode';

interface BeforeAfterWorkflowProps {
    data: WorkflowTransformation;
}

function detectNodeType(step: string) {
    const text = step.toLowerCase();

    if (
        text.includes('approve') ||
        text.includes('approval')
    ) {
        return 'approval';
    }

    if (
        text.includes('decision') ||
        text.includes('verify') ||
        text.includes('check')
    ) {
        return 'decision';
    }

    if (
        text.includes('api') ||
        text.includes('service')
    ) {
        return 'api';
    }

    if (
        text.includes('queue') ||
        text.includes('kafka') ||
        text.includes('async')
    ) {
        return 'queue';
    }

    if (
        text.includes('llm') ||
        text.includes('ai') ||
        text.includes('parser')
    ) {
        return 'llm';
    }

    if (
        text.includes('human') ||
        text.includes('manual') ||
        text.includes('review')
    ) {
        return 'human_review';
    }

    if (
        text.includes('email') ||
        text.includes('notify') ||
        text.includes('notification')
    ) {
        return 'notification';
    }

    return 'task';
}

function summarizeStep(step: string): string {
    const text = step.toLowerCase();

    // Claim / Insurance Flow
    if (
        text.includes('customer emails') ||
        text.includes('claim arrives') ||
        text.includes('email arrives')
    ) {
        return 'Claim Intake';
    }

    if (
        text.includes('email parser') ||
        text.includes('extracts') ||
        text.includes('parse')
    ) {
        return 'Email Parser';
    }

    if (
        text.includes('policy') &&
        (
            text.includes('lookup') ||
            text.includes('verification') ||
            text.includes('validate')
        )
    ) {
        return 'Policy Verification';
    }

    if (
        text.includes('claims database') ||
        text.includes('claim history') ||
        text.includes('history check')
    ) {
        return 'Claims DB Check';
    }

    if (
        text.includes('coverage') &&
        (
            text.includes('verify') ||
            text.includes('validation') ||
            text.includes('cross')
        )
    ) {
        return 'Coverage Validation';
    }

    if (
        text.includes('fraud') ||
        text.includes('risk scorer')
    ) {
        return 'Fraud Score';
    }

    if (
        text.includes('decision engine') ||
        text.includes('classifier') ||
        text.includes('auto-decision')
    ) {
        return 'Decision Engine';
    }

    if (
        text.includes('approve') ||
        text.includes('approval')
    ) {
        return 'Approval Flow';
    }

    if (
        text.includes('reject') ||
        text.includes('rejection')
    ) {
        return 'Rejection Flow';
    }

    if (
        text.includes('escalate') ||
        text.includes('supervisor') ||
        text.includes('human review')
    ) {
        return 'Human Review';
    }

    if (
        text.includes('draft') &&
        text.includes('email')
    ) {
        return 'Email Draft';
    }

    if (
        text.includes('send email') ||
        text.includes('notification') ||
        text.includes('customer update')
    ) {
        return 'Customer Notification';
    }

    if (
        text.includes('crm') ||
        text.includes('spreadsheet') ||
        text.includes('update status')
    ) {
        return 'System Update';
    }

    // Recruitment Flow
    if (
        text.includes('resume') ||
        text.includes('candidate applied')
    ) {
        return 'Candidate Intake';
    }

    if (
        text.includes('resume screening') ||
        text.includes('screening')
    ) {
        return 'Resume Screening';
    }

    if (
        text.includes('shortlist') ||
        text.includes('shortlisting')
    ) {
        return 'Candidate Shortlist';
    }

    if (
        text.includes('interview')
    ) {
        return 'Interview Stage';
    }

    if (
        text.includes('hr review') ||
        text.includes('recruiter review')
    ) {
        return 'HR Review';
    }

    if (
        text.includes('offer letter') ||
        text.includes('offer generation')
    ) {
        return 'Offer Generation';
    }

    // Accounting / Finance Flow
    if (
        text.includes('invoice')
    ) {
        return 'Invoice Processing';
    }

    if (
        text.includes('payment')
    ) {
        return 'Payment Validation';
    }

    if (
        text.includes('audit')
    ) {
        return 'Audit Logging';
    }

    if (
        text.includes('approval chain')
    ) {
        return 'Approval Engine';
    }

    if (
        text.includes('queue') ||
        text.includes('kafka') ||
        text.includes('async')
    ) {
        return 'Async Queue';
    }

    if (
        text.includes('api') ||
        text.includes('service')
    ) {
        return 'Service Layer';
    }

    if (
        text.includes('monitoring') ||
        text.includes('observability')
    ) {
        return 'Monitoring Layer';
    }

    if (
        text.includes('retry') ||
        text.includes('fallback')
    ) {
        return 'Retry System';
    }

    // Final Fallback
    return step.length > 42
        ? step.slice(0, 42) + '...'
        : step;
}


export default function BeforeAfterWorkflow({
    data,
}: BeforeAfterWorkflowProps) {
    const cleanedAfterSteps = data.before.map(
        (_, index) =>
            data.after[index] ||
            'New automation layer introduced'
    );

    return (
        <section
            id="workflow-engine"
            style={{
                position: 'relative',
                zIndex: 10,
                width: '100%',
                padding: '6rem 2rem',
            }}
        >
            <div
                style={{
                    maxWidth: 1500,
                    margin: '0 auto',
                }}
            >
                {/* Header */}
                <motion.div
                    initial={{
                        opacity: 0,
                        y: 20,
                    }}
                    animate={{
                        opacity: 1,
                        y: 0,
                    }}
                    transition={{
                        duration: 0.5,
                    }}
                    style={{
                        textAlign: 'center',
                        marginBottom: '5rem',
                    }}
                >
                    <div
                        style={{
                            fontFamily: 'var(--font-mono)',
                            fontSize: '0.75rem',
                            color: '#E30913',
                            letterSpacing: '0.28em',
                            marginBottom: '1rem',
                        }}
                    >
                        WORKFLOW REDESIGN ENGINE
                    </div>

                    <h2
                        style={{
                            fontFamily: 'var(--font-display)',
                            fontSize:
                                'clamp(2rem, 4vw, 4.5rem)',
                            color: '#F0F0FF',
                            marginBottom: '1rem',
                        }}
                    >
                        Before → After Transformation
                    </h2>

                    <p
                        style={{
                            maxWidth: 800,
                            margin: '0 auto',
                            color: '#8888AA',
                            fontSize: '1rem',
                            lineHeight: 1.8,
                        }}
                    >
                        Visualize how fragmented
                        manual operations transform
                        into production-grade,
                        AI-native operational systems.
                    </p>
                </motion.div>

                {/* Main Layout */}
                <div
                    style={{
                        display: 'grid',
                        gridTemplateColumns:
                            '1fr 120px 1fr',
                        gap: '2rem',
                        alignItems: 'start',
                    }}
                >
                    {/* BEFORE FLOW */}
                    <div>
                        <div
                            style={{
                                textAlign: 'center',
                                marginBottom: '2rem',
                                color: '#FFB800',
                                fontFamily: 'var(--font-mono)',
                                letterSpacing: '0.2em',
                                fontSize: '0.8rem',
                            }}
                        >
                            BEFORE — MANUAL WORKFLOW
                        </div>

                        {data.before.map(
                            (step, index) => (
                                <FlowchartNode
                                    key={index}
                                    title={step}
                                    type={detectNodeType(step)}
                                    isLast={index === data.before.length - 1}
                                />
                            )
                        )}
                    </div>

                    {/* CENTER TRANSFORMATION */}
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            minHeight: 800,
                        }}
                    >
                        <motion.div
                            animate={{
                                x: [0, 10, 0],
                            }}
                            transition={{
                                repeat: Infinity,
                                duration: 2,
                            }}
                            style={{
                                fontSize: '4rem',
                                color: '#E30913',
                                fontWeight: 700,
                            }}
                        >
                            →
                        </motion.div>
                    </div>

                    {/* AFTER FLOW */}
                    <div>
                        <div
                            style={{
                                textAlign: 'center',
                                marginBottom: '2rem',
                                color: '#00FF9C',
                                fontFamily: 'var(--font-mono)',
                                letterSpacing: '0.2em',
                                fontSize: '0.8rem',
                            }}
                        >
                            AFTER — AI NATIVE SYSTEM
                        </div>

                        {cleanedAfterSteps.map(
                            (step, index) => (
                                <FlowchartNode
                                    key={index}
                                    title={step}
                                    type={detectNodeType(step)}
                                    isLast={index === cleanedAfterSteps.length - 1}
                                />
                            )
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
