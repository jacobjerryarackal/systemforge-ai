export interface WorkflowTransformation {
  before: string[];
  after: string[];
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
  readiness: string;
  manualReduction: string;
  speedGain: string;
  scalabilityGain: string;
}

export interface SystemForgeResponse {
  workflowTransformation: WorkflowTransformation;

  architect: AgentDecision;
  critic: AgentDecision;
  refiner: AgentDecision;

  architectureLayers: ArchitectureLayer[];

  finalMetrics: FinalMetrics;
}