from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer
from reportlab.lib.styles import getSampleStyleSheet


def generate_architecture_pdf(data, filename="architecture_report.pdf"):
    """
    Generates professional PDF architecture report
    """

    styles = getSampleStyleSheet()
    doc = SimpleDocTemplate(filename)

    content = []

    # Title
    content.append(
        Paragraph("SystemForge AI — Architecture Report", styles["Title"])
    )
    content.append(Spacer(1, 20))

    # Workflow Transformation
    content.append(
        Paragraph("Before → After Workflow Transformation", styles["Heading2"])
    )

    before = data.get("workflowTransformation", {}).get("before", [])
    after = data.get("workflowTransformation", {}).get("after", [])

    content.append(
        Paragraph(f"<b>Before:</b> {' → '.join(before)}", styles["BodyText"])
    )
    content.append(Spacer(1, 10))

    content.append(
        Paragraph(f"<b>After:</b> {' → '.join(after)}", styles["BodyText"])
    )
    content.append(Spacer(1, 20))

    # Agent Sections
    sections = [
        "architect",
        "critic",
        "refiner",
        "executiveSummary"
    ]

    for section in sections:
        block = data.get(section, {})
        title = block.get("title", "")
        decisions = block.get("decisions", [])

        content.append(
            Paragraph(title, styles["Heading2"])
        )

        for item in decisions:
            content.append(
                Paragraph(f"• {item}", styles["BodyText"])
            )

        content.append(Spacer(1, 15))

    # Final Metrics
    content.append(
        Paragraph("Final Metrics", styles["Heading2"])
    )

    metrics = data.get("finalMetrics", {})

    for key, value in metrics.items():
        content.append(
            Paragraph(f"<b>{key}:</b> {value}", styles["BodyText"])
        )

    content.append(Spacer(1, 20))

    # Architecture Layers
    content.append(
        Paragraph("Architecture Layers", styles["Heading2"])
    )

    layers = data.get("architectureLayers", [])

    for layer in layers:
        content.append(
            Paragraph(
                f"<b>{layer['title']}</b>: {layer['description']}",
                styles["BodyText"]
            )
        )

        for item in layer.get("items", []):
            content.append(
                Paragraph(f"• {item}", styles["BodyText"])
            )

        content.append(Spacer(1, 10))

    doc.build(content)

    return filename