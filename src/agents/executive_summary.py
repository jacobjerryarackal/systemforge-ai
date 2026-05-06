from src.tools.llm import get_llm
from src.tools.json_parser import safe_json_parse


def executive_summary_agent(workflow_steps, final_architecture):
    """
    Executive Summary Agent

    Goal:
    Convert technical architecture into business impact
    + generate realistic deployment metrics.
    """

    llm = get_llm()

    prompt = f"""
You are the EXECUTIVE SUMMARY Agent inside SystemForge.

You are a Principal Solutions Architect speaking to:

- CTO
- VP Engineering
- Head of Operations
- Enterprise Leadership

Your job is to translate technical architecture into:

1. deployment readiness score
2. automation potential
3. operational risk score
4. architecture confidence score
5. business impact summary

You do NOT write technical implementation details.

You explain:
why this architecture matters to the business.

-----------------------------------
INPUT WORKFLOW
-----------------------------------

{workflow_steps}

-----------------------------------
FINAL ARCHITECTURE
-----------------------------------

{final_architecture}

-----------------------------------
YOUR TASK
-----------------------------------

Generate realistic executive-level metrics.

Avoid fake-looking values.

Bad:
100%
99%
Perfect

Good:
87%
72%
Moderate Risk
$2,500–$4,000/month

Think realistically.

-----------------------------------
STRICT OUTPUT FORMAT
-----------------------------------

Return ONLY valid JSON.

{{
  "deployment_readiness": "87%",
  "automation_potential": "74%",
  "risk_score": "Low Risk",
  "infra_cost": "$3,000–$5,000/month",
  "confidence_score": "91%",

  "business_impact": [
    "impact 1",
    "impact 2",
    "impact 3",
    "impact 4",
    "impact 5"
  ]
}}

No markdown.
No explanations.
No text outside JSON.
"""

    response = llm.invoke(prompt)

    fallback = {
        "deployment_readiness": "88%",
        "automation_potential": "76%",
        "risk_score": "Low to Moderate Risk",
        "infra_cost": "$3,000–$5,000/month",
        "confidence_score": "90%",
        "business_impact": [
            "Reduced manual approvals by introducing policy-driven automation",
            "Improved operational speed by shifting approvals to async orchestration",
            "Lowered production failure risk with retries and dead-letter recovery",
            "Improved compliance visibility through centralized audit logging",
            "Enabled scale readiness for high-volume enterprise workflows"
        ]
    }

    result = safe_json_parse(
        response.content,
        fallback=fallback
    )

    required_keys = [
        "deployment_readiness",
        "automation_potential",
        "risk_score",
        "infra_cost",
        "confidence_score",
        "business_impact"
    ]

    if not isinstance(result, dict):
        return fallback

    for key in required_keys:
        if key not in result:
            result[key] = fallback[key]

    if not isinstance(result["business_impact"], list):
        result["business_impact"] = fallback["business_impact"]

    return result