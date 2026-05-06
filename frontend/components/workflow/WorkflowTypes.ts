export type WorkflowNodeType =
    | 'task'
    | 'decision'
    | 'approval'
    | 'api'
    | 'queue'
    | 'llm'
    | 'human_review'
    | 'notification';

export interface WorkflowStep {
    id: string;
    label: string;
    type: WorkflowNodeType;
    duration?: string;
}
