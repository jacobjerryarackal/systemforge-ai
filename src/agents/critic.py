from src.tools.llm import get_llm
from src.tools.json_parser import safe_json_parse


def infrastructure_critic_agent(workflow_steps, architecture):
    """
    Infrastructure Critic Agent

    Goal:
    Break the system before production does.
    """

    llm = get_llm()

    prompt = f"""
You are the INFRASTRUCTURE CRITIC Agent inside SystemForge.

You are a Principal SRE + Production Incident Reviewer.

Your job is NOT to improve the system.

Your job is to find:
how this architecture will fail in production.

You think like:
- Senior SRE
- Reliability Engineer
- Failure Investigator
- Platform Engineer
- Incident Commander

You aggressively search for:

1. Single Points of Failure
2. Queue failure risks
3. Missing retries / idempotency issues
4. Human bottlenecks still hidden
5. Missing observability
6. No audit trail risks
7. Security boundary failures
8. Approval workflow deadlocks
9. Scaling bottlenecks
10. Failure recovery gaps
11. Alerting blind spots
12. Cost explosion risks
13. Operational ownership ambiguity

Do NOT redesign.

Do NOT solve.

Only identify:
what will break.

-----------------------------------
ORIGINAL WORKFLOW
-----------------------------------

{workflow_steps}

-----------------------------------
GENERATED ARCHITECTURE
-----------------------------------

{architecture}

-----------------------------------
STRICT OUTPUT FORMAT
-----------------------------------

Return ONLY valid JSON.

{
  "risks": [
    "specific production risk 1",
    "specific production risk 2",
    "specific production risk 3",
    "specific production risk 4",
    "specific production risk 5"
  ]
}

Bad example:
"system may fail"

Good example:
"Approval queue has no dead-letter handling, causing silent failures"

No markdown.
No explanations.
No text outside JSON.
"""

    response = llm.invoke(prompt)

    fallback = {
        "risks": [
            "Approval queue has no dead-letter queue causing silent task loss",
            "Manual escalation path creates approval bottleneck during peak load",
            "Missing retry-safe execution may trigger duplicate business actions",
            "No centralized audit trail for approval decisions creates compliance risk",
            "Lack of service-level monitoring hides production degradation"
        ]
    }

    result = safe_json_parse(
        response.content,
        fallback=fallback
    )

    if (
        not isinstance(result, dict)
        or "risks" not in result
    ):
        return fallback

    if not isinstance(result["risks"], list):
        result["risks"] = fallback["risks"]

    return result