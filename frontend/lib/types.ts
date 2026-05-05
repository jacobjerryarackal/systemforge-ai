export type AgentStatus = 'idle' | 'thinking' | 'complete' | 'error';

export interface AgentOutput {
  agent: 'architect' | 'critic' | 'refiner';
  content: string;
  status: AgentStatus;
  duration?: number;
}

export interface ForgeSession {
  id: string;
  projectDescription: string;
  outputs: AgentOutput[];
  startedAt: number;
  completedAt?: number;
  isMockMode: boolean;
}

export interface ForgeRequest {
  projectDescription: string;
}

export interface ForgeResponse {
  session: ForgeSession;
}
