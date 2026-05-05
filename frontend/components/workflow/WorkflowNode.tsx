import { Input } from 'antd';
import { motion } from 'framer-motion';
import { WorkflowStep } from './WorkflowTypes';

interface Props {
    step: WorkflowStep;
    index: number;
    updateStep: (id: string, value: string) => void;
}

export default function WorkflowNode({
    step,
    index,
    updateStep,
}: Props) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
            }}
        >
            {/* Step number */}
            <div
                style={{
                    fontFamily: 'var(--font-mono)',
                    color: '#00D4FF',
                    fontSize: '0.7rem',
                    letterSpacing: '0.2em',
                }}
            >
                {String(index + 1).padStart(2, '0')}
            </div>

            {/* Input */}
            <Input
                value={step.label}
                onChange={(e) =>
                    updateStep(step.id, e.target.value)
                }
                placeholder="Describe step..."
                style={{
                    background: 'rgba(255,255,255,0.02)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    color: '#F0F0FF',
                }}
            />

            {/* Arrow */}
            <span style={{ color: '#444466' }}>→</span>
        </motion.div>
    );
}