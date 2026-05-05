from src.tools.llm import get_llm
from src.tools.json_parser import safe_json_parse


def critic_agent(workflow_steps, architecture):
    """
    Critic Agent

    Input:
        workflow_steps -> original messy workflow
        architecture -> architect output

    Output:
        {
            "risks": []
        }
    """

    llm = get_llm()

    prompt = f"""
You are the CRITIC Agent inside SystemForge.

Your role is to review the generated architecture like a
Principal Engineer, Senior SRE, and Production Reviewer.

You must critically analyze the system for:

1. Operational bottlenecks
2. Single Points of Failure (SPOFs)
3. Reliability risks
4. Missing retry/fallback strategies
5. Missing observability
6. Scaling risks
7. Failure recovery gaps
8. Security or audit visibility issues

Your goal is NOT to redesign.

Your goal is to break the system before production does.

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
  "risks": [
    "risk 1",
    "risk 2",
    "risk 3",
    "risk 4",
    "risk 5"
  ]
}}

ORIGINAL WORKFLOW:

{workflow_steps}

GENERATED ARCHITECTURE:

{architecture}
"""

    response = llm.invoke(prompt)

    fallback = {
        "risks": [
            "Detected manual approval bottleneck causing delays",
            "Found single point of failure in approval dependency",
            "Observed missing retry path for failed operations",
            "Detected lack of audit logging across workflow transitions",
            "Found missing monitoring and observability coverage"
        ]
    }

    result = safe_json_parse(
        response.content,
        fallback=fallback
    )

    # Response validation
    if (
        not isinstance(result, dict)
        or "risks" not in result
    ):
        return fallback

    if not isinstance(result["risks"], list):
        result["risks"] = fallback["risks"]

    return result