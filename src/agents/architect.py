from src.tools.llm import get_llm
from src.tools.json_parser import safe_json_parse


def architect_agent(workflow_steps):
    """
    Architect Agent

    Input:
        [
            "Patient fills intake form",
            "Reception manually verifies insurance",
            ...
        ]

    Output:
        {
            "after_workflow": [],
            "decisions": []
        }
    """

    llm = get_llm()

    prompt = f"""
You are the ARCHITECT Agent inside SystemForge.

Your role is to transform messy manual workflows into scalable,
AI-native, production-grade system workflows.

You are acting like a Principal Architect designing
real enterprise systems.

Your responsibilities:

1. Analyze the current broken workflow
2. Identify manual bottlenecks
3. Redesign the workflow into automation-ready steps
4. Introduce service boundaries
5. Introduce validation layers
6. Improve reliability and scalability
7. Create architecture decisions explaining what changed

IMPORTANT RULES:

You MUST return ONLY valid JSON.

Do NOT explain anything.
Do NOT use markdown.
Do NOT use headings.
Do NOT use bullet points.
Do NOT use backticks.
Do NOT add extra text before or after JSON.

STRICT OUTPUT FORMAT:

{{
  "after_workflow": [
    "step 1",
    "step 2",
    "step 3",
    "step 4",
    "step 5"
  ],

  "decisions": [
    "decision 1",
    "decision 2",
    "decision 3",
    "decision 4",
    "decision 5"
  ]
}}

INPUT WORKFLOW:

{workflow_steps}
"""

    response = llm.invoke(prompt)

    fallback = {
        "after_workflow": [
            "Digital intake workflow created",
            "Validation service introduced",
            "Approval engine added",
            "Automation pipeline deployed",
            "Production monitoring enabled"
        ],
        "decisions": [
            "Separated intake from approval workflow",
            "Introduced async validation architecture",
            "Added approval policy engine",
            "Created event-driven service boundaries",
            "Improved operational observability"
        ]
    }

    result = safe_json_parse(
        response.content,
        fallback=fallback
    )

    # Response validation
    if (
        not isinstance(result, dict)
        or "after_workflow" not in result
        or "decisions" not in result
    ):
        return fallback

    if not isinstance(result["after_workflow"], list):
        result["after_workflow"] = fallback["after_workflow"]

    if not isinstance(result["decisions"], list):
        result["decisions"] = fallback["decisions"]

    return result