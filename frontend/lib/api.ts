import type { SystemForgeResponse } from './types';

export async function generateWorkflowRedesign(
  workflowSteps: string[]
): Promise<SystemForgeResponse> {
  const response = await fetch("http://localhost:8000/run-systemforge", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      workflow: workflowSteps,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to generate architecture");
  }

  return response.json();
}