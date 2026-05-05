from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

from src.workflows.crew import run_systemforge


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