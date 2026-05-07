from pydantic import BaseModel, Field
from typing import List, Dict, Any


class SystemState(BaseModel):
    project_idea: str
    workflow_steps: List[str] = Field(default_factory=list)
    architecture_plan: Dict[str, Any] = Field(default_factory=dict)
    critic_flags: List[str] = Field(default_factory=list)
    refined_solution: Dict[str, Any] = Field(default_factory=dict)
    critic_feedback: Dict[str, Any] = Field(default_factory=dict)
    executive_summary: Dict[str, Any] = Field(default_factory=dict)


# Simple global in-memory state
system_state: SystemState = SystemState(
    project_idea="",
    workflow_steps=[],
    architecture_plan={},
    critic_flags=[],
    refined_solution={},
    critic_feedback={},
    executive_summary={}
)