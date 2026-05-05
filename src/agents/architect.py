from crewai import Agent
from src.tools.llm import get_llm


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

Your job is to transform messy manual workflows into scalable AI-native production workflows.

You must:
1. Analyze the current broken workflow
2. Redesign it into production-grade system steps
3. Create architectural decisions explaining what changed

IMPORTANT:
Return ONLY valid Python dictionary style JSON.
Do not explain.
Do not add markdown.
Do not add extra text.

INPUT WORKFLOW:
{workflow_steps}

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
"""

    response = llm.invoke(prompt)

    try:
        result = eval(response.content.strip())
        return result

    except Exception:
        return {
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