"""Section 1: Cover, purpose, elevator pitch, and the problem statement."""

from reportlab.platypus import Spacer, PageBreak
from guide_pdf.styles import (
    P, bullets, numbered, hr, make_table,
    title_style, subtitle_style, h1, h2, h3, body,
    note_style, code_style, warning_style,
)


def build(story):
    # ── Title page ──────────────────────────────────────────────────────
    story += [
        P("Project Briefing for Mentors", title_style),
        P("How to explain the &ldquo;ERT + GPR + Geotechnical + GIS&rdquo; "
          "Dam Stability Project to your student &mdash; in plain language, "
          "with the conceptual framework, talking points, and milestones.",
          subtitle_style),
        hr(),
        Spacer(1, 8),
        P("This document is a companion to the full technical guide "
          "(<i>Dam_Stability_GIS_Guide_Abidjan.pdf</i>). The technical guide "
          "tells the student which buttons to click. This briefing tells "
          "<b>you</b> how to make the project make sense to them.", note_style),
        Spacer(1, 6),
    ]

    # ── Why this document exists ────────────────────────────────────────
    story += [
        P("Why You Need This Briefing", h1),
        P("When a beginner GIS student is given a project that combines "
          "<b>geophysics</b>, <b>geotechnics</b>, and <b>spatial analysis</b>, "
          "the most common failure mode is not technical &mdash; it is "
          "conceptual. They click through tools without understanding why, "
          "produce plausible-looking maps, and cannot defend their choices "
          "in a viva.", body),
        P("This document gives you, the supervisor, the structured talking "
          "points to:", body),
        bullets([
            "Frame the project as a single coherent story, not four "
            "disconnected techniques.",
            "Pre-empt the conceptual confusions that beginners always hit.",
            "Set clear milestones so progress is measurable, not just "
            "&ldquo;working on GIS.&rdquo;",
            "Have ready answers to the questions students will ask "
            "(and the questions they should ask but won&rsquo;t).",
        ]),
        Spacer(1, 6),
    ]

    # ── Elevator pitch ──────────────────────────────────────────────────
    story += [
        P("The 30-Second Elevator Pitch", h1),
        P("Use this as the first thing you say to the student. Memorise it.",
          body),
        P("&ldquo;Abidjan floods every rainy season. Some of those floods "
          "are made worse by failing earthen dams that nobody monitors. We "
          "want a map that says, for every dam in the district, <i>how "
          "likely is this one to fail, and who is downstream</i>. To get "
          "that, we look <b>inside</b> the dams using two geophysical "
          "techniques (ERT and GPR) and confirm with drilling "
          "(geotechnics). Then we put all of that, together with "
          "rainfall, slope, soil, and population, into one GIS model "
          "that ranks every dam from low to critical. The map is the "
          "deliverable. The decision-support is the impact.&rdquo;",
          note_style),
        Spacer(1, 6),
    ]

    # ── The problem ─────────────────────────────────────────────────────
    story += [
        P("The Problem &mdash; Why This Project Exists", h1),

        P("Context for Abidjan", h2),
        bullets([
            "Abidjan sits on a low-lying coastal sedimentary basin. "
            "Average annual rainfall is 1,400&ndash;2,400 mm, falling "
            "mostly in two intense rainy seasons.",
            "The city has grown from ~1 million in 1980 to over 5 million "
            "today, with much of that growth in informal, unplanned "
            "neighbourhoods on flood-prone land.",
            "Small earth dams (<i>barrages</i>) were built upstream of the "
            "lagoon system to manage run-off, irrigation, and water "
            "supply. Many are decades old, poorly documented, and never "
            "geotechnically re-assessed.",
            "When a dam fails or overtops during a heavy rain event, the "
            "consequences are downstream flooding, loss of life, and "
            "infrastructure damage &mdash; on top of the flooding that "
            "would have happened anyway.",
        ]),

        P("The research gap", h2),
        P("Existing flood-risk studies for Abidjan (e.g., Kouam&eacute; "
          "et al. 2016) treat the surface only &mdash; rainfall, slope, "
          "drainage density, land use. None of them ask whether the dams "
          "themselves are part of the hazard. That is the gap this "
          "project fills: <b>treating dam stability as a spatial, "
          "measurable variable</b> in the flood-risk equation.", body),
        Spacer(1, 4),
        PageBreak(),
    ]
