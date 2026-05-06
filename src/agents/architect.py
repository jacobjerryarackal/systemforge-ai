from src.tools.llm import get_llm
from src.tools.json_parser import safe_json_parse


def architect_agent(workflow_steps, bottlenecks=None):
    """
    Systems Architect Agent
    """

    llm = get_llm()

    prompt = f"""
You are the SYSTEMS ARCHITECT Agent inside SystemForge.

You are a Principal Staff Engineer responsible for designing
production-grade enterprise AI systems.

Your job is NOT to give generic automation advice.

Your job is to design:
REAL production architecture.

You think like:
- Principal Engineer
- Staff Systems Architect
- Platform Engineer
- Distributed Systems Designer

You optimize for:
- scale
- reliability
- fault tolerance
- human override
- observability
- retry safety
- compliance
- auditability
- operational excellence

-----------------------------------
INPUT WORKFLOW
-----------------------------------

{workflow_steps}

-----------------------------------
KNOWN BOTTLENECKS
-----------------------------------

{bottlenecks}

-----------------------------------
YOUR TASK
-----------------------------------

Redesign this workflow into an AI-native production system.

You MUST include:

1. Async event-driven workflow where needed
2. Queue-based processing where delays happen
3. Validation services before critical actions
4. Human-in-loop escalation for risky decisions
5. Retry-safe workflows for failures
6. Monitoring + audit logs
7. Policy/approval engine if approvals exist
8. Service boundaries between critical domains
9. Failure recovery strategy
10. Production-grade scalability design

Avoid shallow answers like:
"automate process"

Be specific like:
"Introduce document validation service before approval queue"

-----------------------------------
STRICT OUTPUT FORMAT
-----------------------------------

Return ONLY valid JSON.

{{
  "after_workflow": [
    "specific transformed step 1",
    "specific transformed step 2",
    "specific transformed step 3",
    "specific transformed step 4",
    "specific transformed step 5"
  ],

  "decisions": [
    "specific architecture decision 1",
    "specific architecture decision 2",
    "specific architecture decision 3",
    "specific architecture decision 4",
    "specific architecture decision 5"
  ]
}}

No markdown.
No explanations.
No headings.
No text outside JSON.
"""

    response = llm.invoke(prompt)

    fallback = {
        "after_workflow": [
            "Input ingestion service captures workflow requests",
            "Validation service verifies critical business rules",
            "Queue-based orchestration routes async tasks",
            "Policy engine handles approvals and escalations",
            "Observability layer tracks failures and system health"
        ],
        "decisions": [
            "Introduced queue-first architecture for reliability",
            "Separated validation from execution boundaries",
            "Added policy engine for approval workflows",
            "Created human escalation path for exception handling",
            "Improved production monitoring with audit trails"
        ]
    }

    result = safe_json_parse(
        response.content,
        fallback=fallback
    )

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
