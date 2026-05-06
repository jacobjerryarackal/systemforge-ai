from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse

from src.workflows.crew import run_systemforge
from src.api.pdf_generator import generate_architecture_pdf


app = FastAPI(title="SystemForge API")


# CORS for Next.js frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # later replace with frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class WorkflowRequest(BaseModel):
    workflow: list[str]


@app.get("/")
def root():
    return {
        "message": "SystemForge API Running"
    }


@app.post("/run-systemforge")
def generate_architecture(request: WorkflowRequest):
    try:
        result = run_systemforge(request.workflow)

        return result

    except Exception as e:
        return {
            "error": str(e)
        }


@app.post("/download-report")
def download_report(request: WorkflowRequest):
    """
    Generates PDF architecture report
    and returns downloadable file
    """
    try:
        # Generate architecture first
        result = run_systemforge(request.workflow)

        # Create PDF
        file_path = generate_architecture_pdf(
            data=result,
            filename="architecture_report.pdf"
        )

        return FileResponse(
            path=file_path,
            filename="SystemForge_Architecture_Report.pdf",
            media_type="application/pdf"
        )

    except Exception as e:
        return {
            "error": str(e)
        }