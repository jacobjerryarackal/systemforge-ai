from crewai import Agent


def create_critic_agent(llm):
    """
    Critic Agent
    Persona: Senior Site Reliability Engineer (SRE)
    Reviews architecture for SPOFs, scaling risks, and missing observability.
    """

    return Agent(
        role="Senior Site Reliability Engineer",
        goal="Identify production risks, reliability gaps, and scaling bottlenecks",
        backstory=(
            "You are a senior SRE responsible for keeping large-scale systems stable "
            "in production. You assume failure will happen and proactively detect "
            "single points of failure, caching gaps, deployment weaknesses, and "
            "missing monitoring pipelines before incidents occur."
        ),
        llm=llm,
        verbose=True,
        allow_delegation=False,
    )