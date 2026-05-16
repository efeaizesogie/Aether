"""Main build script for the mentor briefing PDF."""

import sys
import os

# Make the parent of guide_pdf importable for shared styles
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from reportlab.lib.pagesizes import A4
from reportlab.lib.units import cm
from reportlab.platypus import SimpleDocTemplate

from mentor_pdf.section_overview import build as build_overview
from mentor_pdf.section_concepts import build as build_concepts
from mentor_pdf.section_keyideas import build as build_keyideas
from mentor_pdf.section_pitfalls import build as build_pitfalls
from mentor_pdf.section_milestones import build as build_milestones

OUT = "/projects/sandbox/Aether/Mentor_Briefing_Dam_Stability_Abidjan.pdf"


def main():
    doc = SimpleDocTemplate(
        OUT, pagesize=A4,
        leftMargin=1.8 * cm, rightMargin=1.8 * cm,
        topMargin=1.6 * cm, bottomMargin=1.6 * cm,
        title="Mentor Briefing - Dam Stability GIS Project (Abidjan)",
        author="Kiro",
    )

    story = []
    build_overview(story)
    build_concepts(story)
    build_keyideas(story)
    build_pitfalls(story)
    build_milestones(story)

    doc.build(story)
    print(f"PDF generated: {OUT}")
    print(f"Size: {os.path.getsize(OUT) / 1024:.1f} KB")


if __name__ == "__main__":
    main()
