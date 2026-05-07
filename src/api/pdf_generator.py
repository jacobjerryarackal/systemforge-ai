from datetime import datetime

from reportlab.platypus import (
    SimpleDocTemplate,
    Paragraph,
    Spacer,
    Table,
    TableStyle,
)

from reportlab.lib.styles import (
    getSampleStyleSheet,
    ParagraphStyle,
)

from reportlab.lib.pagesizes import A4
from reportlab.lib.enums import TA_CENTER
from reportlab.lib import colors
from reportlab.lib.units import inch


def generate_architecture_pdf(
    data,
    filename="architecture_report.pdf"
):
    """
    Premium Executive PDF
    Compact + Professional + CTO Ready

    Includes:
    - Cover
    - Before / After Workflow
    - Metrics Dashboard
    - Architecture Blueprint
    - Executive Summary
    """

    # =====================================================
    # COLORS
    # =====================================================

    PRIMARY = colors.HexColor("#2563EB")
    SUCCESS = colors.HexColor("#16A34A")
    WARNING = colors.HexColor("#D97706")
    PURPLE = colors.HexColor("#7C3AED")

    TEXT = colors.HexColor("#0F172A")
    MUTED = colors.HexColor("#64748B")

    BORDER = colors.HexColor("#E2E8F0")

    LIGHT_BLUE = colors.HexColor("#EFF6FF")
    LIGHT_RED = colors.HexColor("#FEF2F2")
    LIGHT_BG = colors.HexColor("#F8FAFC")
    EXEC_BG = colors.HexColor("#FAF5FF")

    # =====================================================
    # DOCUMENT
    # =====================================================

    doc = SimpleDocTemplate(
        filename,
        pagesize=A4,
        leftMargin=32,
        rightMargin=32,
        topMargin=32,
        bottomMargin=32,
    )

    styles = getSampleStyleSheet()

    # =====================================================
    # TYPOGRAPHY
    # =====================================================

    title_style = ParagraphStyle(
        "Title",
        parent=styles["Title"],
        fontName="Helvetica-Bold",
        fontSize=22,
        leading=28,
        alignment=TA_CENTER,
        textColor=TEXT,
        spaceAfter=8,
    )

    subtitle_style = ParagraphStyle(
        "Subtitle",
        parent=styles["Normal"],
        fontSize=10,
        leading=14,
        alignment=TA_CENTER,
        textColor=MUTED,
        spaceAfter=6,
    )

    section_style = ParagraphStyle(
        "Section",
        parent=styles["Heading2"],
        fontName="Helvetica-Bold",
        fontSize=13,
        leading=18,
        textColor=PRIMARY,
        spaceBefore=10,
        spaceAfter=8,
    )

    body_style = ParagraphStyle(
        "Body",
        parent=styles["BodyText"],
        fontSize=10,
        leading=14,
        textColor=TEXT,
        spaceAfter=4,
    )

    metric_value_style = ParagraphStyle(
        "MetricValue",
        parent=styles["BodyText"],
        fontName="Helvetica-Bold",
        fontSize=14,
        alignment=TA_CENTER,
        textColor=TEXT,
    )

    metric_label_style = ParagraphStyle(
        "MetricLabel",
        parent=styles["BodyText"],
        fontSize=8,
        alignment=TA_CENTER,
        textColor=MUTED,
    )

    content = []

    # =====================================================
    # COVER SECTION
    # =====================================================

    content.append(
        Paragraph(
            "SYSTEMFORGE AI",
            title_style
        )
    )

    content.append(
        Paragraph(
            "Production Architecture Blueprint",
            subtitle_style
        )
    )

    content.append(
        Paragraph(
            f"Generated on: {datetime.now().strftime('%d %B %Y')}",
            subtitle_style
        )
    )

    content.append(
        Paragraph(
            "Confidential — Internal Architecture Review",
            subtitle_style
        )
    )

    content.append(Spacer(1, 0.15 * inch))

    hero = Table(
        [[
            Paragraph(
                "Workflow Redesign + Production Validation Engine",
                body_style
            )
        ]],
        colWidths=[500]
    )

    hero.setStyle(
        TableStyle([
            ("BACKGROUND", (0, 0), (-1, -1), LIGHT_BG),
            ("BOX", (0, 0), (-1, -1), 1, PRIMARY),
            ("LEFTPADDING", (0, 0), (-1, -1), 14),
            ("TOPPADDING", (0, 0), (-1, -1), 12),
            ("BOTTOMPADDING", (0, 0), (-1, -1), 12),
        ])
    )

    content.append(hero)
    content.append(Spacer(1, 0.20 * inch))

    # =====================================================
    # BEFORE / AFTER WORKFLOW
    # =====================================================

    before = data.get(
        "workflowTransformation",
        {}
    ).get("before", [])

    after = data.get(
        "workflowTransformation",
        {}
    ).get("after", [])

    before_html = "<br/>".join(
        [f"• {step}" for step in before]
    )

    after_html = "<br/>".join(
        [f"• {step}" for step in after]
    )

    content.append(
        Paragraph(
            "Before → After Workflow Transformation",
            section_style
        )
    )

    before_after = Table(
        [[
            Paragraph(
                f"<b>BEFORE — MANUAL WORKFLOW</b><br/><br/>{before_html}",
                body_style
            ),
            Paragraph(
                f"<b>AFTER — AI NATIVE SYSTEM</b><br/><br/>{after_html}",
                body_style
            )
        ]],
        colWidths=[250, 250]
    )

    before_after.setStyle(
        TableStyle([
            ("BACKGROUND", (0, 0), (0, 0), LIGHT_RED),
            ("BACKGROUND", (1, 0), (1, 0), LIGHT_BLUE),
            ("BOX", (0, 0), (-1, -1), 1, BORDER),
            ("INNERGRID", (0, 0), (-1, -1), 0.5, BORDER),
            ("VALIGN", (0, 0), (-1, -1), "TOP"),
            ("LEFTPADDING", (0, 0), (-1, -1), 12),
            ("TOPPADDING", (0, 0), (-1, -1), 12),
            ("BOTTOMPADDING", (0, 0), (-1, -1), 12),
        ])
    )

    content.append(before_after)
    content.append(Spacer(1, 0.20 * inch))

    # =====================================================
    # METRICS DASHBOARD
    # =====================================================

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

    metric_items = [
        (
            metrics.get(
                "deploymentReadiness",
                "—"
            ),
            "Deployment Readiness",
            SUCCESS,
        ),
        (
            metrics.get(
                "automationPotential",
                "—"
            ),
            "Automation Potential",
            PRIMARY,
        ),
        (
            metrics.get(
                "riskScore",
                "—"
            ),
            "Risk Score",
            WARNING,
        ),
    ]

    cards = []

    for value, label, color in metric_items:
        card = Table(
            [[
                Paragraph(
                    str(value),
                    metric_value_style
                )
            ],
            [
                Paragraph(
                    label,
                    metric_label_style
                )
            ]],
            colWidths=[155]
        )

        card.setStyle(
            TableStyle([
                ("BOX", (0, 0), (-1, -1), 1, color),
                ("TOPPADDING", (0, 0), (-1, -1), 10),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 10),
            ])
        )

        cards.append(card)

    content.append(
        Table([cards])
    )

    content.append(Spacer(1, 0.20 * inch))

    # =====================================================
    # ARCHITECTURE BLUEPRINT
    # =====================================================

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
        layer_card = Table(
            [[
                Paragraph(
                    f"<b>{layer.get('title')}</b><br/><br/>{layer.get('description')}",
                    body_style
                )
            ]],
            colWidths=[500]
        )

        layer_card.setStyle(
            TableStyle([
                ("BOX", (0, 0), (-1, -1), 1, BORDER),
                ("LEFTPADDING", (0, 0), (-1, -1), 12),
                ("TOPPADDING", (0, 0), (-1, -1), 10),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 10),
            ])
        )

        content.append(layer_card)
        content.append(
            Spacer(1, 0.10 * inch)
        )

    # =====================================================
    # EXECUTIVE SUMMARY
    # =====================================================

    executive = data.get(
        "executiveSummary",
        {}
    )

    executive_points = executive.get(
        "decisions",
        []
    )

    if executive_points:
        content.append(
            Spacer(1, 0.15 * inch)
        )

        content.append(
            Paragraph(
                "Executive Summary",
                section_style
            )
        )

        executive_html = "<br/>".join(
            [f"• {point}" for point in executive_points]
        )

        executive_card = Table(
            [[
                Paragraph(
                    f"<b>Business Impact + ROI</b><br/><br/>{executive_html}",
                    body_style
                )
            ]],
            colWidths=[500]
        )

        executive_card.setStyle(
            TableStyle([
                ("BACKGROUND", (0, 0), (-1, -1), EXEC_BG),
                ("BOX", (0, 0), (-1, -1), 1, PURPLE),
                ("LEFTPADDING", (0, 0), (-1, -1), 14),
                ("TOPPADDING", (0, 0), (-1, -1), 12),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 12),
            ])
        )

        content.append(executive_card)

    # =====================================================
    # FOOTER
    # =====================================================

    content.append(
        Spacer(1, 0.20 * inch)
    )

    content.append(
        Paragraph(
            "Generated by SystemForge AI — Enterprise Workflow Redesign Engine",
            subtitle_style
        )
    )

    # =====================================================
    # BUILD
    # =====================================================

    doc.build(content)

    return filename