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


    /* =========================
       INSURANCE / CLAIM FLOW
    ========================= */

    if (
        text.includes('customer emails a claim') ||
        text.includes('claim arrives') ||
        text.includes('email arrives')
    ) {
        return 'Claim Intake';
    }

    if (
        text.includes('opens email') ||
        text.includes('outlook')
    ) {
        return 'Email Review';
    }

    if (
        text.includes('read email body') ||
        text.includes('reads claim details')
    ) {
        return 'Claim Review';
    }

    if (
        text.includes('policy lookup') ||
        text.includes('policy portal') ||
        text.includes('search policy')
    ) {
        return 'Policy Lookup';
    }

    if (
        text.includes('type policy number') ||
        text.includes('manual policy entry')
    ) {
        return 'Policy Entry';
    }

    if (
        text.includes('read policy details') ||
        text.includes('coverage type')
    ) {
        return 'Policy Review';
    }

    if (
        text.includes('claims history') ||
        text.includes('claim history') ||
        text.includes('claims db')
    ) {
        return 'Claims DB Check';
    }

    if (
        text.includes('customer filing history')
    ) {
        return 'History Validation';
    }

    if (
        text.includes('coverage verification')
    ) {
        return 'Coverage Validation';
    }

    if (
        text.includes('cross-reference') ||
        text.includes('coverage limits')
    ) {
        return 'Compliance Check';
    }

    if (
        text.includes('fraud risk') ||
        text.includes('fraud scorer')
    ) {
        return 'Fraud Score';
    }

    if (
        text.includes('spreadsheet summary') ||
        text.includes('summary of findings')
    ) {
        return 'Summary Creation';
    }

    if (
        text.includes('email summary to supervisor')
    ) {
        return 'Supervisor Brief';
    }

    if (
        text.includes('wait for supervisor')
    ) {
        return 'Approval Waiting';
    }

    if (
        text.includes('supervisor decision')
    ) {
        return 'Approval Decision';
    }

    if (
        text.includes('draft approval email')
    ) {
        return 'Approval Draft';
    }

    if (
        text.includes('draft rejection')
    ) {
        return 'Rejection Draft';
    }

    if (
        text.includes('send email to customer')
    ) {
        return 'Customer Notification';
    }

    if (
        text.includes('update spreadsheet') ||
        text.includes('update crm')
    ) {
        return 'System Update';
    }

    /* =========================
       RECRUITMENT FLOW
    ========================= */

    if (
        text.includes('resumes arrive') ||
        text.includes('resume arrives')
    ) {
        return 'Candidate Intake';
    }

    if (
        text.includes('downloads resumes')
    ) {
        return 'Resume Collection';
    }

    if (
        text.includes('reviews candidate profile')
    ) {
        return 'Profile Review';
    }

    if (
        text.includes('resume screening')
    ) {
        return 'Resume Screening';
    }

    if (
        text.includes('candidate shortlist') ||
        text.includes('shortlisting')
    ) {
        return 'Candidate Shortlist';
    }

    if (
        text.includes('schedule interview')
    ) {
        return 'Interview Scheduling';
    }

    if (
        text.includes('interview feedback')
    ) {
        return 'Interview Review';
    }

    if (
        text.includes('hr review')
    ) {
        return 'HR Review';
    }

    if (
        text.includes('offer letter')
    ) {
        return 'Offer Generation';
    }

    if (
        text.includes('onboarding')
    ) {
        return 'Candidate Onboarding';
    }

    /* =========================
       ACCOUNTING / FINANCE FLOW
    ========================= */

    if (
        text.includes('invoice received')
    ) {
        return 'Invoice Intake';
    }

    if (
        text.includes('invoice validation')
    ) {
        return 'Invoice Validation';
    }

    if (
        text.includes('payment confirmation')
    ) {
        return 'Payment Validation';
    }

    if (
        text.includes('audit log')
    ) {
        return 'Audit Logging';
    }

    if (
        text.includes('approval chain')
    ) {
        return 'Approval Engine';
    }

    /* =========================
       SYSTEM / ARCHITECTURE
    ========================= */

    if (
        text.includes('queue') ||
        text.includes('kafka')
    ) {
        return 'Async Queue';
    }

    if (
        text.includes('email parser')
    ) {
        return 'Email Parser';
    }

    if (
        text.includes('validation service')
    ) {
        return 'Validation Layer';
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

    if (
        text.includes('human review') ||
        text.includes('manual review')
    ) {
        return 'Human Review';
    }

    /* =========================
       FINAL SAFE FALLBACK
    ========================= */

    return step.length > 50
        ? step.slice(0, 50) + '...'
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
                                    title={summarizeStep(step)}
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
