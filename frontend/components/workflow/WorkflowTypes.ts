export type WorkflowNodeType =
    | 'input'
    | 'task'
    | 'decision'
    | 'automation'
    | 'approval'
    | 'output'
    | 'api'
    | 'queue'
    | 'llm'
    | 'human_review'
    | 'notification';

export interface WorkflowStep {
    id: string;
    type: WorkflowNodeType;
    label: string;
}

export interface ExampleWorkflow {
    id: string;
    title: string;
    industry: string;
    before: WorkflowStep[];
    after: WorkflowStep[];
    estimatedReduction: string;
}