export interface WorkflowTransformation {
  before: string[];
  after: string[];
}

export type AgentStatus = 'idle' | 'thinking' | 'complete' | 'error';

export interface AgentOutput {
  agent: 'architect' | 'critic' | 'refiner';
  status: AgentStatus;
  content: string;
  duration?: number;
}

export interface AgentDecision {
  title: string;
  subtitle: string;
  decisions: string[];
}

export interface ArchitectureLayer {
  title: string;
  description: string;
  items: string[];
}

export interface FinalMetrics {
  deploymentReadiness: string;
  automationPotential: string;
  architectureConfidence: string;
  riskScore: string;
  estimatedMonthlyInfraCost: string;
}

export interface SystemForgeResponse {
  workflowTransformation: WorkflowTransformation;

  architect: AgentDecision;
  critic: AgentDecision;
  refiner: AgentDecision;

  architectureLayers: ArchitectureLayer[];

  finalMetrics: FinalMetrics;
}