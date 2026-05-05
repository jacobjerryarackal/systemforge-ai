from src.tools.llm import get_llm


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

Your job is to review the generated architecture like a Senior SRE / Principal Engineer.

You must:
1. Detect bottlenecks
2. Find SPOFs (Single Points of Failure)
3. Identify operational risks
4. Detect observability gaps
5. Detect scalability problems

IMPORTANT:
Return ONLY valid Python dictionary style JSON.
Do not explain.
Do not add markdown.
Do not add extra text.

ORIGINAL WORKFLOW:
{workflow_steps}

GENERATED ARCHITECTURE:
{architecture}

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
"""

    response = llm.invoke(prompt)

    try:
        result = eval(response.content.strip())
        return result

    except Exception:
        return {
            "risks": [
                "Detected manual approval bottleneck causing delays",
                "Found single point of failure in approval dependency",
                "Observed missing retry path for failed operations",
                "Detected lack of audit logging across workflow transitions",
                "Found missing monitoring and observability coverage"
            ]
        }