from src.tools.llm import get_llm
from src.tools.json_parser import safe_json_parse


def refiner_agent(workflow_steps, architecture, critic_feedback):
    """
    Production Refiner Agent

    Goal:
    Convert architecture into deployment-ready production design.
    """

    llm = get_llm()

    prompt = f"""
You are the PRODUCTION REFINER Agent inside SystemForge.

You are a Staff+ Engineer responsible for final
production readiness.

Your job is to transform architecture into something
that can survive real-world enterprise deployment.

You think like:
- Staff Engineer
- Principal Platform Engineer
- Production Reliability Engineer
- Distributed Systems Designer

You optimize for:
- operational excellence
- failure recovery
- auditability
- deployment safety
- observability
- rollback readiness
- compliance
- scale readiness

-----------------------------------
INPUTS
-----------------------------------

ORIGINAL WORKFLOW:
{workflow_steps}

ARCHITECT OUTPUT:
{architecture}

CRITIC FEEDBACK:
{critic_feedback}

-----------------------------------
YOUR TASK
-----------------------------------

Resolve the critic risks by adding:

1. Dead Letter Queues (DLQ)
2. Retry-safe execution paths
3. Idempotent workflows
4. Audit logging
5. Distributed tracing
6. Monitoring + alerting
7. Human override paths
8. Rollback safety
9. Confidence scoring
10. Failure isolation boundaries
11. Circuit breaker protection
12. Deployment readiness strategy

You MUST also create final architecture layers.

Avoid weak answers like:
"improve monitoring"

Use strong answers like:
"Add dead-letter queue for approval failures with manual replay workflow"

-----------------------------------
STRICT OUTPUT FORMAT
-----------------------------------

Return ONLY valid JSON.

{
  "improvements": [
    "specific improvement 1",
    "specific improvement 2",
    "specific improvement 3",
    "specific improvement 4",
    "specific improvement 5"
  ],

  "architecture_layers": [
    {
      "title": "Layer Name",
      "description": "Production-grade explanation",
      "items": [
        "specific item 1",
        "specific item 2",
        "specific item 3"
      ]
    }
  ]
}

No markdown.
No explanations.
No text outside JSON.
"""

    response = llm.invoke(prompt)

    fallback = {
        "improvements": [
            "Added dead-letter queue for failed approval events with manual replay workflow",
            "Introduced idempotent retry-safe execution for critical approval actions",
            "Enabled centralized audit logs and distributed tracing across services",
            "Added circuit breaker protection and service isolation boundaries",
            "Improved monitoring with alerting, rollback readiness, and human override paths"
        ],
        "architecture_layers": [
            {
                "title": "Workflow Orchestration Layer",
                "description": "Captures workflow inputs, routes business events, and manages approval lifecycle safely",
                "items": [
                    "Workflow Intake Service",
                    "Approval Orchestration Engine",
                    "Human Escalation Manager"
                ]
            },
            {
                "title": "Multi-Agent Intelligence Layer",
                "description": "Performs reasoning, architecture generation, failure analysis, and optimization decisions",
                "items": [
                    "Workflow Analyst Agent",
                    "Systems Architect Agent",
                    "Infrastructure Critic Agent"
                ]
            },
            {
                "title": "Inference + Compute Layer",
                "description": "Handles production LLM inference using GPU-backed vLLM serving",
                "items": [
                    "Qwen 2.5 Inference",
                    "vLLM OpenAI-Compatible Serving",
                    "AMD MI300X ROCm Runtime"
                ]
            },
            {
                "title": "Production Reliability Layer",
                "description": "Provides retries, observability, storage, compliance, and deployment safety",
                "items": [
                    "Dead Letter Queues + Retry Engine",
                    "PostgreSQL + Redis",
                    "Observability + Audit Logging"
                ]
            }
        ]
    }

    result = safe_json_parse(
        response.content,
        fallback=fallback
    )

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
