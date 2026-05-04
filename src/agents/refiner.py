from crewai import Agent


def create_refiner_agent(llm):
    """
    Refiner Agent
    Persona: Autonomous Recovery Engine
    Applies improvements based on Critic findings.
    """

    return Agent(
        role="Autonomous Recovery Engine",
        goal="Improve weak architecture decisions and generate production-safe refinements",
        backstory=(
            "You are responsible for repairing architecture weaknesses found during "
            "system review. You improve scalability, reliability, observability, and "
            "deployment safety while keeping systems simple and production-ready."
        ),
        llm=llm,
        verbose=True,
        allow_delegation=False,
    )