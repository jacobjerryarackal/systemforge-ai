import type { SystemForgeResponse } from "./types";

export async function generateWorkflowRedesign(
  workflowSteps: string[]
): Promise<SystemForgeResponse> {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const response = await fetch(`${API_URL}/run-systemforge`, {
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