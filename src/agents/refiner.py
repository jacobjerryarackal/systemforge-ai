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

You do NOT write like a consultant.

You write like the engineer who must deploy
this system to production tomorrow.

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

-----------------------------------
VERY IMPORTANT
-----------------------------------

Return improvements as:

- short technical improvements
- production deployment focused
- implementation-specific
- enterprise operational language
- no generic explanations
- no consultant language
- no vague statements
- no paragraphs

GOOD:
Added dead-letter queue for approval failures

GOOD:
Introduced idempotent retry-safe payment execution

GOOD:
Enabled audit-safe approval decision logging

GOOD:
Added rollback workflow for failed ERP sync

BAD:
Improved monitoring

BAD:
System is now more reliable

BAD:
Added better observability for production

BAD:
Improved deployment quality

Each improvement must feel like:
a real production deployment change.

-----------------------------------
ARCHITECTURE LAYERS RULES
-----------------------------------

Architecture layers must be:

- production-grade
- short + clear
- system boundary focused
- implementation-ready
- enterprise architecture naming style

GOOD:
Workflow Orchestration Layer

GOOD:
Decision + Validation Layer

GOOD:
Production Reliability Layer

BAD:
AI Smart Layer

BAD:
Automation System Layer

BAD:
Technology Improvement Layer

Descriptions must be concise and technical.

Items must be:

- real services
- real components
- real infrastructure boundaries

GOOD:
Approval Orchestration Engine

GOOD:
Dead Letter Queue + Retry Engine

GOOD:
Observability + Audit Logging

BAD:
AI Automation Tool

BAD:
Smart Process System

-----------------------------------
STRICT OUTPUT FORMAT
-----------------------------------

Return ONLY valid JSON.

{{
  "improvements": [
    "specific improvement 1",
    "specific improvement 2",
    "specific improvement 3",
    "specific improvement 4",
    "specific improvement 5"
  ],

  "architecture_layers": [
    {{
      "title": "Layer Name",
      "description": "Production-grade explanation",
      "items": [
        "specific item 1",
        "specific item 2",
        "specific item 3"
      ]
    }}
  ]
}}

No markdown.
No explanations.
No text outside JSON.
"""

    response = llm.invoke(prompt)

    fallback = {
        "improvements": [
            "Added dead-letter queue for failed approval events",
            "Introduced idempotent retry-safe execution for approvals",
            "Enabled centralized audit logs and distributed tracing",
            "Added circuit breaker protection and service isolation boundaries",
            "Improved monitoring with rollback readiness and human override"
        ],
        "architecture_layers": [
            {
                "title": "Workflow Orchestration Layer",
                "description": "Captures workflow inputs and manages approval lifecycle safely",
                "items": [
                    "Workflow Intake Service",
                    "Approval Orchestration Engine",
                    "Human Escalation Manager"
                ]
            },
            {
                "title": "Decision + Validation Layer",
                "description": "Validates business rules and executes policy decisions",
                "items": [
                    "Validation Engine",
                    "Policy Decision Service",
                    "Approval Routing Engine"
                ]
            },
            {
                "title": "Inference + Compute Layer",
                "description": "Handles production LLM inference using GPU-backed serving",
                "items": [
                    "Qwen 2.5 Inference",
                    "vLLM OpenAI-Compatible Serving",
                    "AMD MI300X ROCm Runtime"
                ]
            },
            {
                "title": "Production Reliability Layer",
                "description": "Provides retries, observability, compliance, and failure recovery",
                "items": [
                    "Dead Letter Queue + Retry Engine",
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