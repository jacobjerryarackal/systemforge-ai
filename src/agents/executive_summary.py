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

You do NOT write like a consultant.

You explain:
why this architecture matters to the business.

You focus on:

- operational efficiency
- execution speed
- approval reduction
- production reliability
- enterprise scalability
- compliance confidence
- deployment readiness

NOT:

- technical implementation details
- infrastructure cost anxiety
- generic transformation language

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
Low to Moderate Risk
91%

VERY IMPORTANT:

Business impact must be:

- short executive statements
- business outcome focused
- operationally measurable
- enterprise language
- no technical implementation detail
- no long explanations
- no consultant paragraphs

GOOD:
Reduced manual approvals through policy-driven automation

GOOD:
Improved workflow speed using async approval routing

GOOD:
Lowered operational failure risk with retry-safe execution

GOOD:
Improved compliance visibility through centralized audit logs

BAD:
The system architecture uses better monitoring and queues

BAD:
This architecture improves scalability and reliability significantly

BAD:
AI improves business performance

Do NOT over-focus on infrastructure cost.

Prioritize:

time reduction,
manual effort reduction,
deployment readiness,
operational confidence

over:

monthly cloud cost discussion.

-----------------------------------
STRICT OUTPUT FORMAT
-----------------------------------

Return ONLY valid JSON.

{{
  "deployment_readiness": "87%",
  "automation_potential": "74%",
  "risk_score": "Low Risk",
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
        "confidence_score": "90%",
        "business_impact": [
            "Reduced manual approvals through policy-driven automation",
            "Improved workflow speed using async approval routing",
            "Lowered production failure risk with retry-safe execution",
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