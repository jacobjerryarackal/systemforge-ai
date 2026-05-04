from src.workflows.crew import run_systemforge


if __name__ == "__main__":
    project_input = "Build a scalable fintech SaaS using Next.js + FastAPI + PostgreSQL"

    result = run_systemforge(project_input)

    print("\n=== SYSTEMFORGE AI OUTPUT ===\n")
    print("Project Idea:")
    print(result.project_idea)

    print("\nArchitecture Plan:")
    print(result.architecture_plan)

    print("\nCritic Flags:")
    print(result.critic_flags)

    print("\nRefined Solution:")
    print(result.refined_solution)
