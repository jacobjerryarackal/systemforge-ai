from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse

from src.workflows.crew import run_systemforge
from src.api.pdf_generator import generate_architecture_pdf


app = FastAPI(
    title="SystemForge API"
)


# CORS for Next.js frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
    ],
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
def generate_architecture(
    request: WorkflowRequest
):
    try:
        if not request.workflow:
            raise HTTPException(
                status_code=400,
                detail="Workflow steps cannot be empty"
            )

        result = run_systemforge(
            request.workflow
        )

        return result

    except HTTPException:
        raise

    except Exception as e:
        print(f"SystemForge Error: {str(e)}")

        raise HTTPException(
            status_code=500,
            detail="Failed to generate architecture"
        )


@app.post("/download-report")
def download_report(
    request: WorkflowRequest
):
    """
    Generates PDF architecture report
    and returns downloadable file
    """

    try:
        if not request.workflow:
            raise HTTPException(
                status_code=400,
                detail="Workflow steps cannot be empty"
            )

        # Generate architecture first
        result = run_systemforge(
            request.workflow
        )

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

    except HTTPException:
        raise

    except Exception as e:
        print(f"PDF Generation Error: {str(e)}")

        raise HTTPException(
            status_code=500,
            detail="Failed to generate report"
        )