from src.agents.workflow_analyst import workflow_analyst_agent
from src.agents.architect import architect_agent
from src.agents.infrastructure_critic import infrastructure_critic_agent
from src.agents.refiner import refiner_agent
from src.agents.executive_summary import executive_summary_agent


def run_systemforge(workflow_steps):
    """
    workflow_steps:
    [
        "Resume comes from LinkedIn",
        "HR manually shortlists candidates",
        ...
    ]
    """

    # STEP 1 — Workflow Analyst
    analyst_output = workflow_analyst_agent(workflow_steps)

    # STEP 2 — Architecture Generation
    architect_output = architect_agent(
        workflow_steps=workflow_steps,
        bottlenecks=analyst_output["bottlenecks"]
    )

    # STEP 3 — Infrastructure Critic
    critic_output = infrastructure_critic_agent(
        workflow_steps=workflow_steps,
        architecture=architect_output
    )

    # STEP 4 — Production Refinement
    refiner_output = refiner_agent(
        workflow_steps=workflow_steps,
        architecture=architect_output,
        critic_feedback=critic_output
    )

    # STEP 5 — Executive Summary
    summary_output = executive_summary_agent(
        workflow_steps=workflow_steps,
        final_architecture=refiner_output
    )

    final_response = {
        "workflowTransformation": {
            "before": workflow_steps,
            "after": architect_output["after_workflow"]
        },

        "workflowAnalyst": {
            "title": "WORKFLOW ANALYST",
            "subtitle": "Bottleneck Detection + Manual Dependency Analysis",
            "decisions": analyst_output["bottlenecks"]
        },

        "architect": {
            "title": "SYSTEMS ARCHITECT",
            "subtitle": "Production Architecture Design",
            "decisions": architect_output["decisions"]
        },

        "critic": {
            "title": "INFRASTRUCTURE CRITIC",
            "subtitle": "Failure Points + Risk Detection",
            "decisions": critic_output["risks"]
        },

        "refiner": {
            "title": "PRODUCTION REFINER",
            "subtitle": "Optimization + Reliability Improvements",
            "decisions": refiner_output["improvements"]
        },

        "architectureLayers": refiner_output["architecture_layers"],

        "finalMetrics": {
            "deploymentReadiness": summary_output["deployment_readiness"],
            "automationPotential": summary_output["automation_potential"],
            "riskScore": summary_output["risk_score"],
            "estimatedMonthlyInfraCost": summary_output["infra_cost"],
            "architectureConfidence": summary_output["confidence_score"]
        },

        "executiveSummary": {
            "title": "EXECUTIVE IMPACT",
            "subtitle": "Business Outcome + ROI",
            "decisions": summary_output["business_impact"]
        }
    }

    return final_response
