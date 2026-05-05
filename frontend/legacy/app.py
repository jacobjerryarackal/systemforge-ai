import gradio as gr
from src.workflows.crew import run_systemforge


def execute_systemforge(project_idea: str):
    if not project_idea.strip():
        return (
            "Please enter a project idea.",
            "No review generated.",
            "No refined architecture generated."
        )

    try:
        final_result = run_systemforge(project_idea)

        architect_output = f"""
# Architect Agent Output

Project Idea: {project_idea}

The Architect Agent generated the initial production architecture plan.
"""

        critic_output = """
# Critic Agent Output (Senior SRE Persona)

The Critic Agent reviewed the architecture for:
- scalability risks
- observability gaps
- fault tolerance
- security concerns
- production reliability
"""

        refiner_output = f"""
# Refiner Agent Output

{final_result}
"""

        return architect_output, critic_output, refiner_output

    except Exception as e:
        return (
            "Architect Agent execution failed.",
            "Critic Agent execution failed.",
            f"System Error: {str(e)}"
        )


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
        fn=execute_systemforge,
        inputs=[project_input],
        outputs=[architect_box, critic_box, refiner_box],
    )


if __name__ == "__main__":
    demo.launch()
