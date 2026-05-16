"""Section 5: Milestones, evaluation, deliverables, and mentoring cadence."""

from reportlab.platypus import Spacer, PageBreak
from reportlab.lib.units import cm
from guide_pdf.styles import (
    P, bullets, numbered, hr, make_table,
    h1, h2, h3, body, note_style, code_style, warning_style,
)


def build(story):
    # ── Workflow at a glance ───────────────────────────────────────────
    story += [
        P("The Workflow at a Glance (Use This for Your Whiteboard)", h1),
        P("Six phases, one map. If your student can sketch this from "
          "memory, they understand the project.", body),
    ]

    phase_tbl = [
        ["Phase", "What happens", "Output"],
        ["1. Data acquisition",
         "Download open data; collect ERT, GPR, borehole field data.",
         "Folder of source files"],
        ["2. ArcGIS Pro setup",
         "Project, environments, clip to study area, derive slope and "
         "hydrology.",
         "Cleaned base layers + study area map"],
        ["3. Geophysics integration",
         "Georeference ERT/GPR, interpolate to surfaces, score boreholes.",
         "Three subsurface rasters"],
        ["4. Multi-criteria analysis",
         "Reclassify all 8 layers; AHP weights; Weighted Overlay.",
         "Vulnerability Index map"],
        ["5. Decision-support outputs",
         "Per-dam vulnerability, simplified flood inundation, population "
         "and infrastructure at risk.",
         "Final thematic maps"],
        ["6. Validation &amp; report",
         "Sensitivity analysis, expert review, write-up, defence.",
         "Thesis / report"],
    ]
    story += [
        make_table(phase_tbl, [3.5*cm, 8.5*cm, 4.5*cm]),
        Spacer(1, 8),
    ]

    # ── Milestones ──────────────────────────────────────────────────────
    story += [
        P("Milestones &mdash; What &ldquo;On Track&rdquo; Looks Like", h1),
        P("Use these as gates. Do not let the student progress to the "
          "next milestone until the previous one is genuinely complete. "
          "Every milestone has a single artefact that proves it.", body),
    ]

    miles_tbl = [
        ["#", "Milestone", "Artefact that proves it",
         "Approx. timeline"],
        ["M1", "Project framing complete",
         "One-page project brief with goals, study area, criteria list, "
         "data sources",
         "End of week 2"],
        ["M2", "Open data acquired and inspected",
         "Map of Abidjan with all open layers loaded, projected, clipped",
         "End of week 4"],
        ["M3", "Field data collected and processed",
         "ERT inverted models, GPR depth slices, borehole logs in CSV",
         "End of week 7"],
        ["M4", "All inputs integrated into GIS",
         "Eight reclassified rasters in the geodatabase, all aligned",
         "End of week 10"],
        ["M5", "AHP matrix and weights validated",
         "Pairwise matrix with CR &lt; 0.10, weights table, "
         "sensitivity table",
         "End of week 11"],
        ["M6", "Final vulnerability map produced",
         "Vulnerability_Index raster + per-dam summary table",
         "End of week 13"],
        ["M7", "Validation and decision-support",
         "Sensitivity analysis, simplified inundation, exposure analysis",
         "End of week 14"],
        ["M8", "Report draft submitted",
         "Full draft with figures, tables, references",
         "End of week 16"],
    ]
    story += [
        make_table(miles_tbl, [0.8*cm, 4.0*cm, 7.5*cm, 3.0*cm]),
        Spacer(1, 8),
        P("If the student is two weeks behind on a milestone, that is the "
          "moment to intervene &mdash; not at week 16.", warning_style),
        PageBreak(),
    ]

    # ── What good looks like ────────────────────────────────────────────
    story += [
        P("What &lsquo;Good&rsquo; Looks Like &mdash; Final Deliverables "
          "Checklist", h1),
        P("By the end of the project, the student should hand you "
          "<b>all</b> of the following. Treat the absence of any item as "
          "a fail.", body),

        P("Maps (export each as 300 DPI PDF and PNG)", h3),
        bullets([
            "Study area / location map (with inset showing C&ocirc;te "
            "d&rsquo;Ivoire)",
            "Geology / soil map of Abidjan",
            "Slope and rainfall maps",
            "Land-use / land-cover map",
            "Drainage and proximity buffer map",
            "ERT cross-section per dam, plus interpolated surface map",
            "GPR depth-slice map for each survey",
            "Eight reclassified factor maps (1&ndash;5 scale)",
            "Final vulnerability map (the headline figure)",
            "Per-dam vulnerability ranking map",
            "Simplified flood inundation map per critical dam",
            "Exposure map (population &amp; infrastructure at risk)",
        ]),

        P("Tables", h3),
        bullets([
            "Data inventory table (source, format, resolution, date)",
            "AHP pairwise comparison matrix and CR calculation",
            "Final weights table with justification per factor",
            "Sensitivity analysis table (weights &plusmn;20%)",
            "Per-dam vulnerability summary (mean, max, class)",
            "Exposure summary (population, buildings, road km per dam)",
        ]),

        P("Document &amp; data", h3),
        bullets([
            "Full written report or thesis",
            "Geodatabase (.gdb) with all final layers, named consistently",
            "Project metadata: README listing every layer with source, "
            "processing steps, units, CRS, and date",
            "Code or model: any Python scripts, ModelBuilder models, or "
            "AHP spreadsheets used",
            "Field logs: photos, GPS tracks, raw geophysical data",
        ]),

        P("Defensible narrative (the most important deliverable)", h3),
        P("The student should be able to deliver a 10-minute presentation "
          "that answers, in order:", body),
        numbered([
            "What problem does this solve and who cares? (1 minute)",
            "What did you measure and where? (2 minutes)",
            "How did you combine it? (2 minutes &mdash; AHP + Weighted "
            "Overlay)",
            "What does the map say? (2 minutes &mdash; specific dam "
            "rankings)",
            "How confident are you and why? (2 minutes &mdash; "
            "validation, sensitivity, limitations)",
            "What would you do next? (1 minute &mdash; future work)",
        ]),
        Spacer(1, 6),
    ]

    # ── Mentoring cadence ───────────────────────────────────────────────
    story += [
        P("Suggested Mentoring Cadence", h1),
        bullets([
            "<b>Weekly 30-minute check-in</b>: progress against the "
            "current milestone, blockers, what is being done in the "
            "coming week.",
            "<b>Bi-weekly 60-minute working session</b>: open ArcGIS Pro "
            "together, look at actual files, point to specific issues. "
            "This is where most learning happens.",
            "<b>Monthly milestone review</b>: formal sign-off on the "
            "milestone artefact. Do not sign off if it is incomplete; "
            "rolling debt kills these projects.",
            "<b>Mock viva at week 14</b>: 20 minutes of presentation "
            "plus 10 minutes of hostile questions. Surfaces every "
            "weakness while there is still time to fix it.",
        ]),
        Spacer(1, 6),
    ]

    # ── Closing ─────────────────────────────────────────────────────────
    story += [
        P("Closing Notes for the Mentor", h1),
        bullets([
            "<b>Resist the urge to drive the mouse.</b> When the student "
            "is stuck, narrate what they should do; do not take the "
            "keyboard. They learn by clicking, not by watching.",
            "<b>Frame every check-in around the question, not the "
            "tool.</b> &ldquo;What are you trying to find out?&rdquo; "
            "beats &ldquo;Show me the Reclassify dialog.&rdquo;",
            "<b>Reward the caveat.</b> Students who say &ldquo;here is "
            "the map and here is what is wrong with it&rdquo; should be "
            "graded above students who present an unqualified map, even "
            "if the latter looks prettier.",
            "<b>Connect to practice.</b> A field visit to one of the "
            "barrages, or a guest seminar from a working dam engineer, "
            "is worth more than three lectures.",
        ]),
        Spacer(1, 8),
        hr(),
        P("Companion document: <i>Dam_Stability_GIS_Guide_Abidjan.pdf</i> "
          "&mdash; the full step-by-step technical workflow your student "
          "should follow. This briefing is the &lsquo;why&rsquo; behind "
          "that &lsquo;how&rsquo;.", note_style),
    ]
