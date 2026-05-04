from pydantic import BaseModel, Field
from typing import List, Dict, Any


class SystemState(BaseModel):
    project_idea: str
    architecture_plan: Dict[str, Any] = Field(default_factory=dict)
    critic_flags: List[str] = Field(default_factory=list)
    refined_solution: Dict[str, Any] = Field(default_factory=dict)