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


export async function downloadArchitectureReport(
  workflowSteps: string[]
): Promise<void> {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const response = await fetch(
    `${API_URL}/download-report`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        workflow: workflowSteps,
      }),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to download report");
  }

  const blob = await response.blob();
  const url = window.URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download =
    "SystemForge_Architecture_Report.pdf";

  document.body.appendChild(link);
  link.click();
  link.remove();

  window.URL.revokeObjectURL(url);
}