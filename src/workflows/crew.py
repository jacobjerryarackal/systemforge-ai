from crewai import Crew, Process, Task

from src.agents.architect import create_architect_agent
from src.agents.critic import create_critic_agent
from src.agents.refiner import create_refiner_agent
from src.state.state import SystemState
from src.tools.llm import get_llm


def run_systemforge(project_idea: str):
    """
    Main orchestration flow for SystemForge AI MVP

    Flow:
    Architect → Critic → Refiner
    """

    # Load Qwen / vLLM connection
    llm = get_llm()

    # Create Agents
    architect = create_architect_agent(llm)
    critic = create_critic_agent(llm)
    refiner = create_refiner_agent(llm)

    # Task 1 → Architecture Planning
    architecture_task = Task(
        description=f"""
Design a production-grade software architecture for:

{project_idea}

Focus on:
- service decomposition
- API architecture
- database strategy
- deployment planning
- scaling strategy
- observability requirements

Return structured output with clear architecture decisions.
""",
        expected_output="Production-ready architecture plan",
        agent=architect,
    )

    # Task 2 → Reliability Review
    critic_task = Task(
        description="""
Review the proposed architecture and identify:

- Single Points of Failure (SPOF)
- missing Redis / caching strategy
- missing observability pipeline
- weak deployment strategy
- scaling bottlenecks
- production reliability risks

Think like a Senior Site Reliability Engineer.
""",
        expected_output="List of reliability risks and production concerns",
        agent=critic,
    )

    # Task 3 → Self-Healing Refinement
    refinement_task = Task(
        description="""
Using the architecture plan and critic findings:

Improve the system design by:
- fixing SPOFs
- adding failover strategy
- improving caching
- improving observability
- improving deployment reliability

Return final production-grade architecture.
""",
        expected_output="Refined architecture with production-safe improvements",
        agent=refiner,
    )

    # Crew Orchestration
    crew = Crew(
        agents=[
            architect,
            critic,
            refiner
        ],
        tasks=[
            architecture_task,
            critic_task,
            refinement_task
        ],
        process=Process.sequential,
        verbose=True
    )

    # Execute Crew
    result = crew.kickoff()

    # Final State Object
    state = SystemState(
        project_idea=project_idea,
        refined_solution={
            "final_output": str(result)
        }
    )

    return state

