import { useState } from 'react';
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import WorkflowNode from './WorkflowNode';
import { WorkflowStep } from './WorkflowTypes';

interface Props {
    onSubmit: (workflow: WorkflowStep[]) => void;
    isRunning: boolean;
}

export default function WorkflowBuilder({
    onSubmit,
    isRunning,
}: Props) {
    const [steps, setSteps] = useState<WorkflowStep[]>([
        { id: crypto.randomUUID(), label: '' },
    ]);

    const updateStep = (id: string, value: string) => {
        setSteps((prev) =>
            prev.map((s) =>
                s.id === id ? { ...s, label: value } : s
            )
        );
    };

    const addStep = () => {
        setSteps((prev) => [
            ...prev,
            { id: crypto.randomUUID(), label: '' },
        ]);
    };

    const handleSubmit = () => {
        const clean = steps.filter((s) => s.label.trim());

        if (clean.length === 0 || isRunning) return;

        onSubmit(clean);
    };

    return (
        <div
            style={{
                width: '100%',
                maxWidth: '800px',
                margin: '0 auto',
            }}
        >
            {/* Nodes */}
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '16px',
                    marginBottom: '20px',
                }}
            >
                {steps.map((step, i) => (
                    <WorkflowNode
                        key={step.id}
                        step={step}
                        index={i}
                        updateStep={updateStep}
                    />
                ))}
            </div>

            {/* Add Step */}
            <Button
                icon={<PlusOutlined />}
                onClick={addStep}
                style={{
                    marginBottom: '20px',
                }}
            >
                Add Step
            </Button>

            {/* Submit */}
            <Button
                type="primary"
                block
                loading={isRunning}
                onClick={handleSubmit}
            >
                Generate Architecture →
            </Button>
        </div>
    );
}
