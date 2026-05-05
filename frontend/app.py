import gradio as gr


def run_systemforge_mock(project_idea: str):
    if not project_idea.strip():
        return (
            "Please enter a project idea.",
            "No review generated.",
            "No refined architecture generated."
        )

    architect_output = f"""
## Architect Agent Output

Project Idea: {project_idea}

Recommended Core Architecture:
- Frontend: Next.js / React dashboard
- Backend: FastAPI service layer
- Database: PostgreSQL for transactional data
- Cache Layer: Redis for performance optimization
- Queue System: Celery + Redis for async tasks
- Authentication: JWT + OAuth
- Deployment: Docker + AMD Cloud inference endpoint
- AI Layer: Qwen-powered multi-agent workflow using CrewAI

Initial Recommendation:
Build a scalable service-oriented architecture with clear agent boundaries.
"""

    critic_output = """
## Critic Agent Output (Senior SRE Persona)

Potential Risks Identified:
- Missing observability layer (logging + monitoring)
- No fallback strategy for LLM failure
- Single-point dependency on inference endpoint
- No retry mechanism for failed agent execution
- Missing security validation for generated architecture

Recommendation:
Add resilience, observability, and fault-tolerance before production rollout.
"""

    refiner_output = """
## Refiner Agent Output

Production-Ready Improvements:
- Add Prometheus + Grafana monitoring
- Add structured logging with request tracing
- Add fallback workflow for LLM timeout/failure
- Introduce retry queue for failed tasks
- Add validation layer before final architecture approval
- Add security review checkpoint before deployment

Final Result:
SystemForge AI now produces safer, more reliable, and production-grade architecture recommendations.
"""

    return architect_output, critic_output, refiner_output


with gr.Blocks(title="SystemForge AI") as demo:
    gr.Markdown("""
# SystemForge AI
### Autonomous Multi-Agent Architecture Engine

Architect → Critic → Refiner

Describe your startup or product idea and let the agents generate a production-grade system design.
""")

    project_input = gr.Textbox(
        label="Describe Your Project Idea",
        placeholder="Example: Build a scalable fintech SaaS platform for SMB lending",
        lines=4,
    )

    run_button = gr.Button("Run SystemForge")

    architect_box = gr.Markdown(label="Architect Output")
    critic_box = gr.Markdown(label="Critic Output")
    refiner_box = gr.Markdown(label="Refiner Output")

    run_button.click(
        fn=run_systemforge_mock,
        inputs=[project_input],
        outputs=[architect_box, critic_box, refiner_box],
    )


if __name__ == "__main__":
    demo.launch()
