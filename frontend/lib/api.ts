import type { SystemForgeResponse } from "./types";

export async function generateWorkflowRedesign(
  workflowSteps: string[]
): Promise<SystemForgeResponse> {
  const API_URL =
    process.env.NEXT_PUBLIC_API_URL ||
    process.env.NEXT_PUBLIC_BACKEND_URL ||
    "";

  if (!API_URL) {
    throw new Error(
      "NEXT_PUBLIC_API_URL is missing in .env"
    );
  }

  const response = await fetch(
    `${API_URL}/run-systemforge`,
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

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.detail ||
      data.error ||
      "Failed to generate architecture"
    );
  }

  return data;
}


export async function downloadArchitectureReport(
  workflowSteps: string[]
): Promise<void> {
  const API_URL =
    process.env.NEXT_PUBLIC_API_URL ||
    process.env.NEXT_PUBLIC_BACKEND_URL ||
    "";

  if (!API_URL) {
    throw new Error(
      "NEXT_PUBLIC_API_URL is missing in .env"
    );
  }

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
    let errorMessage =
      "Failed to download report";

    try {
      const errorData =
        await response.json();

      errorMessage =
        errorData.detail ||
        errorData.error ||
        errorMessage;
    } catch {
      // fallback if response is not JSON
    }

    throw new Error(errorMessage);
  }

  const blob = await response.blob();
  const url =
    window.URL.createObjectURL(blob);

  const link =
    document.createElement("a");

  link.href = url;
  link.download =
    "SystemForge_Architecture_Report.pdf";

  document.body.appendChild(link);
  link.click();
  link.remove();

  window.URL.revokeObjectURL(url);
}