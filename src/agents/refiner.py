from src.tools.llm import get_llm
from src.tools.json_parser import safe_json_parse


def refiner_agent(workflow_steps, architecture, critic_feedback):
    """
    Refiner Agent

    Input:
        workflow_steps
        architecture
        critic_feedback

    Output:
        {
            "improvements": [],
            "architecture_layers": []
        }
    """

    llm = get_llm()

    prompt = f"""
You are the REFINER Agent inside SystemForge.

Your role is to take Architect output + Critic feedback
and transform the system into a production-grade architecture.

You are acting like a Staff Engineer responsible for
final deployment readiness.

Your responsibilities:

1. Resolve critic risks
2. Improve reliability
3. Add retry + fallback strategies
4. Improve observability
5. Improve resilience
6. Improve deployment readiness
7. Create final architecture layers
8. Ensure production-grade operational design

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
  "improvements": [
    "improvement 1",
    "improvement 2",
    "improvement 3",
    "improvement 4",
    "improvement 5"
  ],

  "architecture_layers": [
    {{
      "title": "Layer Name",
      "description": "Short description",
      "items": [
        "item 1",
        "item 2",
        "item 3"
      ]
    }}
  ]
}}

ORIGINAL WORKFLOW:

{workflow_steps}

ARCHITECT OUTPUT:

{architecture}

CRITIC FEEDBACK:

{critic_feedback}
"""

    response = llm.invoke(prompt)

    fallback = {
        "improvements": [
            "Added retry + fallback strategy for failed approvals",
            "Introduced audit logging and distributed tracing",
            "Added event queue for async workflow handling",
            "Improved failure recovery path across services",
            "Enabled production monitoring and alerting"
        ],
        "architecture_layers": [
            {
                "title": "Workflow Interface Layer",
                "description": "User input and workflow orchestration",
                "items": [
                    "Workflow Builder UI",
                    "Approval Chain Modeling",
                    "Operational Flow Mapping"
                ]
            },
            {
                "title": "Multi-Agent Intelligence Layer",
                "description": "Autonomous reasoning engine",
                "items": [
                    "Architect Agent",
                    "Critic Agent",
                    "Refiner Agent"
                ]
            },
            {
                "title": "Inference + Compute Layer",
                "description": "LLM execution and GPU acceleration",
                "items": [
                    "Qwen Inference",
                    "vLLM Serving",
                    "AMD ROCm Runtime"
                ]
            },
            {
                "title": "Production Architecture Layer",
                "description": "Deployment and reliability",
                "items": [
                    "Redis + PostgreSQL",
                    "Async Event Queues",
                    "Observability + Monitoring"
                ]
            }
        ]
    }

    result = safe_json_parse(
        response.content,
        fallback=fallback
    )

    # Response validation
    if (
        not isinstance(result, dict)
        or "improvements" not in result
        or "architecture_layers" not in result
    ):
        return fallback

    if not isinstance(result["improvements"], list):
        result["improvements"] = fallback["improvements"]

    if not isinstance(result["architecture_layers"], list):
        result["architecture_layers"] = fallback["architecture_layers"]

    return result