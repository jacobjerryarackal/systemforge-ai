from reportlab.platypus import (
    SimpleDocTemplate,
    Paragraph,
    Spacer,
    ListFlowable,
    ListItem,
)
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.pagesizes import A4
from reportlab.lib.enums import TA_CENTER, TA_LEFT
from reportlab.lib import colors
from reportlab.lib.units import inch


def generate_architecture_pdf(
    data,
    filename="architecture_report.pdf"
):
    """
    Premium themed PDF report for SystemForge AI

    Dark-tech style inspired by frontend UI:
    - clean hierarchy
    - stronger headings
    - better spacing
    - enterprise presentation feel
    """

    doc = SimpleDocTemplate(
        filename,
        pagesize=A4,
        leftMargin=40,
        rightMargin=40,
        topMargin=50,
        bottomMargin=50,
    )

    styles = getSampleStyleSheet()

    # -------------------------
    # CUSTOM STYLES
    # -------------------------

    title_style = ParagraphStyle(
        "TitleStyle",
        parent=styles["Title"],
        fontName="Helvetica-Bold",
        fontSize=22,
        leading=28,
        alignment=TA_CENTER,
        textColor=colors.HexColor("#0F172A"),
        spaceAfter=12,
    )

    subtitle_style = ParagraphStyle(
        "SubtitleStyle",
        parent=styles["Normal"],
        fontName="Helvetica",
        fontSize=10,
        leading=15,
        alignment=TA_CENTER,
        textColor=colors.HexColor("#475569"),
        spaceAfter=20,
    )

    section_style = ParagraphStyle(
        "SectionStyle",
        parent=styles["Heading2"],
        fontName="Helvetica-Bold",
        fontSize=14,
        leading=20,
        textColor=colors.HexColor("#2563EB"),
        spaceBefore=16,
        spaceAfter=10,
    )

    body_style = ParagraphStyle(
        "BodyStyle",
        parent=styles["BodyText"],
        fontName="Helvetica",
        fontSize=10.5,
        leading=16,
        textColor=colors.HexColor("#1E293B"),
        spaceAfter=6,
    )

    metric_style = ParagraphStyle(
        "MetricStyle",
        parent=styles["BodyText"],
        fontName="Helvetica-Bold",
        fontSize=11,
        leading=18,
        textColor=colors.HexColor("#111827"),
        spaceAfter=6,
    )

    bullet_style = ParagraphStyle(
        "BulletStyle",
        parent=styles["BodyText"],
        fontName="Helvetica",
        fontSize=10,
        leading=15,
        textColor=colors.HexColor("#334155"),
        leftIndent=8,
        spaceAfter=4,
    )

    content = []

    # -------------------------
    # HEADER
    # -------------------------

    content.append(
        Paragraph(
            "SYSTEMFORGE AI",
            title_style
        )
    )

    content.append(
        Paragraph(
            "Production Architecture Report",
            subtitle_style
        )
    )

    content.append(Spacer(1, 0.2 * inch))

    # -------------------------
    # WORKFLOW TRANSFORMATION
    # -------------------------

    content.append(
        Paragraph(
            "Before → After Workflow Transformation",
            section_style
        )
    )

    before = data.get(
        "workflowTransformation",
        {}
    ).get("before", [])

    after = data.get(
        "workflowTransformation",
        {}
    ).get("after", [])

    content.append(
        Paragraph(
            f"<b>Before Workflow:</b><br/>{' → '.join(before)}",
            body_style
        )
    )

    content.append(
        Paragraph(
            f"<b>After Workflow:</b><br/>{' → '.join(after)}",
            body_style
        )
    )

    content.append(Spacer(1, 0.15 * inch))

    # -------------------------
    # AGENT OUTPUTS
    # -------------------------

    sections = [
        "architect",
        "critic",
        "refiner",
        "executiveSummary",
    ]

    for section in sections:
        block = data.get(section, {})
        title = block.get("title", "")
        decisions = block.get("decisions", [])

        if not title:
            continue

        content.append(
            Paragraph(
                title,
                section_style
            )
        )

        for item in decisions:
            content.append(
                Paragraph(
                    f"• {item}",
                    bullet_style
                )
            )

        content.append(
            Spacer(1, 0.1 * inch)
        )

    # -------------------------
    # FINAL METRICS
    # -------------------------

    content.append(
        Paragraph(
            "Final System Metrics",
            section_style
        )
    )

    metrics = data.get(
        "finalMetrics",
        {}
    )

    pretty_names = {
        "deploymentReadiness": "Deployment Readiness",
        "automationPotential": "Automation Potential",
        "riskScore": "Risk Score",
        "estimatedMonthlyInfraCost": "Infrastructure Cost",
        "architectureConfidence": "Architecture Confidence",
    }

    for key, value in metrics.items():
        label = pretty_names.get(key, key)

        content.append(
            Paragraph(
                f"<b>{label}:</b> {value}",
                metric_style
            )
        )

    content.append(
        Spacer(1, 0.15 * inch)
    )

    # -------------------------
    # ARCHITECTURE LAYERS
    # -------------------------

    content.append(
        Paragraph(
            "Final Architecture Blueprint",
            section_style
        )
    )

    layers = data.get(
        "architectureLayers",
        []
    )

    for layer in layers:
        content.append(
            Paragraph(
                f"<b>{layer.get('title', '')}</b><br/>{layer.get('description', '')}",
                body_style
            )
        )

        for item in layer.get("items", []):
            content.append(
                Paragraph(
                    f"• {item}",
                    bullet_style
                )
            )

        content.append(
            Spacer(1, 0.08 * inch)
        )

    # -------------------------
    # FOOTER NOTE
    # -------------------------

    content.append(
        Spacer(1, 0.2 * inch)
    )

    content.append(
        Paragraph(
            "Generated by SystemForge AI — Workflow Redesign + Production Validation Engine",
            subtitle_style
        )
    )

    # -------------------------
    # BUILD PDF
    # -------------------------

    doc.build(content)

    return filename