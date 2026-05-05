import { useState } from 'react';
import { Button } from 'antd';
import { PlusOutlined, ThunderboltOutlined } from '@ant-design/icons';
import { motion } from 'framer-motion';
import WorkflowNode from './WorkflowNode';
import { WorkflowStep } from './WorkflowTypes';

interface Props {
    onGenerate: (steps: string[]) => void;
}

const EXAMPLE_WORKFLOWS = [
    {
        title: 'E-commerce Operations Chaos',
        steps: [
            'Orders come from Shopify',
            'Team manually updates inventory in Excel',
            'Slack message sent to warehouse',
            'Warehouse updates delivery status manually',
            'Customer support manually handles delays',
        ],
    },
    {
        title: 'Hospital Approval Workflow',
        steps: [
            'Patient fills intake form',
            'Reception manually verifies insurance',
            'Doctor manually reviews reports',
            'Lab sends PDF reports by email',
            'Admin manually updates billing',
        ],
    },
    {
        title: 'Hiring Workflow Mess',
        steps: [
            'Resume comes from LinkedIn',
            'HR manually shortlists candidates',
            'Interview scheduling via WhatsApp',
            'Feedback collected in Google Sheets',
            'Offer approval delayed manually',
        ],
    },
    {
        title: 'Startup Support Workflow',
        steps: [
            'Customer submits issue',
            'Support team checks CRM manually',
            'Engineering gets pinged in Slack',
            'Fix status tracked in Notion',
            'Customer gets manual update email',
        ],
    },
];

function createStep(label = ''): WorkflowStep {
    return {
        id: crypto.randomUUID(),
        label,
    };
}

export default function WorkflowBuilder({
    onGenerate,
}: Props) {
    const [steps, setSteps] = useState<WorkflowStep[]>([
        createStep(),
    ]);
    const [isRunning, setIsRunning] = useState(false);

    const updateStep = (id: string, value: string) => {
        setSteps((prev) =>
            prev.map((step) =>
                step.id === id
                    ? { ...step, label: value }
                    : step
            )
        );
    };

    const addStep = () => {
        setSteps((prev) => [...prev, createStep()]);
    };

    const loadExampleWorkflow = (example: {
        title: string;
        steps: string[];
    }) => {
        setSteps(example.steps.map((step) => createStep(step)));
    };

    const handleSubmit = () => {
        const cleanSteps = steps.filter(
            (step) => step.label.trim() !== ''
        );

        if (cleanSteps.length === 0 || isRunning) return;

        setIsRunning(true);
        setTimeout(() => {
            setIsRunning(false);
            onGenerate(cleanSteps.map((s) => s.label));
        }, 800);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            style={{
                width: '100%',
                maxWidth: '980px',
                margin: '0 auto',
            }}
        >
            {/* Main Workflow Box */}
            <div
                style={{
                    position: 'relative',
                    border: '1px solid rgba(227, 9, 19, 0.25)',
                    background:
                        'linear-gradient(180deg, rgba(10,10,18,0.95), rgba(7,7,15,0.95))',
                    backdropFilter: 'blur(20px)',
                    borderRadius: 6,
                    padding: '2rem',
                    boxShadow:
                        '0 0 40px rgba(227, 9, 19, 0.06)',
                    marginBottom: '1.5rem',
                }}
            >
                {/* Header */}
                <div
                    style={{
                        marginBottom: '1.5rem',
                    }}
                >
                    <div
                        style={{
                            fontFamily: 'var(--font-mono)',
                            fontSize: '0.72rem',
                            color: '#E30913',
                            letterSpacing: '0.24em',
                            marginBottom: '0.6rem',
                        }}
                    >
                        WORKFLOW_INPUT
                    </div>

                    <h3
                        style={{
                            fontFamily: 'var(--font-display)',
                            fontSize: '1.4rem',
                            color: '#F0F0FF',
                            marginBottom: '0.5rem',
                        }}
                    >
                        Map Your Current Workflow
                    </h3>

                    <p
                        style={{
                            color: '#8888AA',
                            lineHeight: 1.7,
                            fontSize: '0.95rem',
                            maxWidth: '760px',
                        }}
                    >
                        Add your messy operational process —
                        approvals, spreadsheets, manual handoffs,
                        broken workflows, or disconnected systems.
                        SystemForge will redesign it into a
                        scalable production-grade AI workflow.
                    </p>
                </div>

                {/* Workflow Nodes */}
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '18px',
                        marginBottom: '1.5rem',
                    }}
                >
                    {steps.map((step, index) => (
                        <WorkflowNode
                            key={step.id}
                            step={step}
                            index={index}
                            updateStep={updateStep}
                        />
                    ))}
                </div>

                {/* Add Step */}
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        marginBottom: '1.5rem',
                    }}
                >
                    <Button
                        icon={<PlusOutlined />}
                        onClick={addStep}
                        style={{
                            height: '42px',
                            padding: '0 24px',
                            borderRadius: 4,
                            background:
                                'rgba(0,212,255,0.04)',
                            border:
                                '1px solid rgba(0,212,255,0.2)',
                            color: '#00D4FF',
                            fontFamily: 'var(--font-display)',
                            letterSpacing: '0.08em',
                        }}
                    >
                        Add Workflow Step
                    </Button>
                </div>

                {/* Generate Button */}
                <Button
                    type="primary"
                    icon={<ThunderboltOutlined />}
                    loading={isRunning}
                    onClick={handleSubmit}
                    block
                    style={{
                        height: '56px',
                        border: 'none',
                        borderRadius: 4,
                        background:
                            'linear-gradient(135deg, #E30913 0%, #B5060F 100%)',
                        fontFamily: 'var(--font-display)',
                        fontSize: '0.9rem',
                        letterSpacing: '0.16em',
                        boxShadow:
                            '0 0 30px rgba(227, 9, 19, 0.25)',
                    }}
                >
                    {isRunning
                        ? 'REDESIGNING WORKFLOW...'
                        : 'GENERATE PRODUCTION ARCHITECTURE →'}
                </Button>
            </div>

            {/* Example Workflows */}
            <div>
                <div
                    style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.7rem',
                        color: '#444466',
                        letterSpacing: '0.22em',
                        marginBottom: '1rem',
                    }}
                >
                    EXAMPLE_MESSY_WORKFLOWS
                </div>

                <div
                    style={{
                        display: 'grid',
                        gap: '14px',
                    }}
                >
                    {EXAMPLE_WORKFLOWS.map(
                        (example, index) => (
                            <button
                                key={index}
                                onClick={() =>
                                    loadExampleWorkflow(example)
                                }
                                style={{
                                    textAlign: 'left',
                                    padding: '1rem 1.2rem',
                                    borderRadius: 4,
                                    border:
                                        '1px solid rgba(0,212,255,0.12)',
                                    background:
                                        'rgba(0,212,255,0.03)',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s ease',
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.borderColor =
                                        'rgba(0,212,255,0.28)';
                                    e.currentTarget.style.background =
                                        'rgba(0,212,255,0.06)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.borderColor =
                                        'rgba(0,212,255,0.12)';
                                    e.currentTarget.style.background =
                                        'rgba(0,212,255,0.03)';
                                }}
                            >
                                <div
                                    style={{
                                        color: '#00D4FF',
                                        fontFamily:
                                            'var(--font-display)',
                                        fontSize: '0.85rem',
                                        marginBottom: '0.4rem',
                                        letterSpacing: '0.08em',
                                    }}
                                >
                                    {example.title}
                                </div>

                                <div
                                    style={{
                                        color: '#8888AA',
                                        fontFamily: 'var(--font-mono)',
                                        fontSize: '0.72rem',
                                        lineHeight: 1.7,
                                    }}
                                >
                                    {example.steps.join(' → ')}
                                </div>
                            </button>
                        )
                    )}
                </div>
            </div>
        </motion.div>
    );
}
