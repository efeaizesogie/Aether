"""Section 4: Common student pitfalls and FAQ talking points."""

from reportlab.platypus import Spacer, PageBreak
from reportlab.lib.units import cm
from guide_pdf.styles import (
    P, bullets, numbered, hr, make_table,
    h1, h2, h3, body, note_style, code_style, warning_style,
)


def build(story):
    # ── Pitfalls ─────────────────────────────────────────────────────────
    story += [
        P("Common Student Pitfalls (and How to Catch Them Early)", h1),
        P("Each of the items below is a real failure mode that "
          "supervisors of beginner GIS projects see repeatedly. The "
          "&ldquo;Catch it by&rdquo; column tells you what to ask "
          "during a check-in to surface the problem before it ruins "
          "weeks of work.", body),
        Spacer(1, 4),
    ]

    pit_tbl = [
        ["#", "Pitfall", "Catch it by asking&hellip;"],
        ["1",
         "Working in geographic CRS by accident; buffers in &lsquo;decimal "
         "degrees&rsquo; come out wrong by orders of magnitude.",
         "&ldquo;Show me the CRS of your active map and the unit on your "
         "scale bar.&rdquo;"],
        ["2",
         "Mismatched cell sizes / extents between layers; Weighted Overlay "
         "fails or produces garbage.",
         "&ldquo;What is the cell size and snap raster you set in "
         "Environments?&rdquo;"],
        ["3",
         "Reclassifying without justification &mdash; pulling break values "
         "out of thin air.",
         "&ldquo;Where do these breakpoints come from? Cite the literature "
         "or explain the physical reasoning.&rdquo;"],
        ["4",
         "AHP matrix with consistency ratio &gt; 0.10, ignored.",
         "&ldquo;What is your CR? Show me the calculation.&rdquo;"],
        ["5",
         "Treating geophysical data as ground truth instead of an indirect "
         "estimate.",
         "&ldquo;What does an ERT low actually <i>mean</i>? Could it be "
         "anything other than weakness?&rdquo;"],
        ["6",
         "Producing a map and stopping. No validation, no sensitivity "
         "analysis, no caveats.",
         "&ldquo;How would you defend this map to a sceptical "
         "engineer?&rdquo;"],
        ["7",
         "Cherry-picking only the data sources that confirm an "
         "expected pattern.",
         "&ldquo;Which dams disagree with your hypothesis, and what do "
         "you do about them?&rdquo;"],
        ["8",
         "Beautiful cartography, weak analysis &mdash; spending three "
         "weeks on layout and ignoring methods.",
         "&ldquo;Walk me through your AHP weights before you touch the "
         "layout.&rdquo;"],
        ["9",
         "Using a global dataset (HWSD soil, CHIRPS rainfall) at a "
         "spatial resolution that is meaningless for a single dam.",
         "&ldquo;What is the cell size of your input vs. the size of the "
         "object you are studying?&rdquo;"],
        ["10",
         "Not backing up. Geodatabase corruption can wipe weeks.",
         "&ldquo;When did you last copy the .gdb folder offsite?&rdquo;"],
    ]
    story += [
        make_table(pit_tbl, [0.7*cm, 7.0*cm, 8.7*cm]),
        Spacer(1, 8),
        PageBreak(),
    ]

    # ── FAQ ─────────────────────────────────────────────────────────────
    story += [
        P("FAQ &mdash; Likely Student Questions and Ready Answers", h1),
        P("These are the questions you will be asked. Pre-loaded answers "
          "save mentoring time and give the student something concrete to "
          "write down.", body),
        Spacer(1, 4),

        P("Q1. &ldquo;Why eight criteria? Why not five, or twelve?&rdquo;",
          h3),
        P("Because they are the ones that the literature on dam stability "
          "and on flood risk consistently identifies as primary. Three "
          "describe the dam itself (ERT, GPR, geotechnics), two describe "
          "the topography/hydrology context (slope, drainage proximity), "
          "and three describe the loading/environmental context (rainfall, "
          "LULC, soil). You can defend either direction &mdash; but if "
          "you add criteria, justify each one with a citation; if you "
          "remove, justify why it is captured by another.", body),

        P("Q2. &ldquo;Where do my AHP pairwise scores come from?&rdquo;",
          h3),
        P("From three sources, in order of preference: (a) values "
          "published in peer-reviewed dam-stability or flood-risk AHP "
          "studies; (b) interviews with at least two domain experts "
          "(ideally an engineer and a geophysicist) recorded in your "
          "appendix; (c) your own reasoned judgement, clearly flagged. "
          "Whatever the source, the matrix must pass CR &lt; 0.10.", body),

        P("Q3. &ldquo;Can I do the project in QGIS instead of "
          "ArcGIS Pro?&rdquo;", h3),
        P("Yes, with caveats. QGIS has equivalents for almost every tool "
          "&mdash; SAGA and GRASS plugins cover hydrology, the "
          "<i>raster calculator</i> covers Weighted Overlay (you write "
          "the equation manually), and Python plugins handle AHP. The "
          "main loss is the polished cartographic layouts and "
          "Geostatistical Wizard. If your university does not have an "
          "ArcGIS licence, QGIS is fine; document the equivalent tools "
          "in a methods appendix.", body),

        P("Q4. &ldquo;What if I cannot do field ERT/GPR/drilling?&rdquo;",
          h3),
        P("Then the project becomes a <b>methodology paper</b> rather "
          "than a case study. Run the GIS workflow with the open data "
          "(rainfall, slope, LULC, soil, drainage) and use synthetic or "
          "literature-derived values for the geophysical and geotechnical "
          "layers, clearly labelled as illustrative. The deliverable "
          "becomes &ldquo;a reproducible workflow that a future field "
          "campaign can plug measurements into.&rdquo; State this scoping "
          "clearly in the introduction.", body),

        P("Q5. &ldquo;How accurate is my final map?&rdquo;", h3),
        P("Honestly, you do not know without validation. The map encodes "
          "your <b>assumptions</b> (which criteria, which weights, which "
          "breakpoints). Run a sensitivity analysis: change each weight "
          "by &plusmn;20% and see if the high-risk dams remain high-risk. "
          "If yes, the ranking is robust to the assumptions; if no, "
          "report which assumption drives the result. That nuance is "
          "what gets you the higher mark.", body),

        P("Q6. &ldquo;The flood inundation in Phase 5 looks too simple. "
          "Is it real?&rdquo;", h3),
        P("It is a <b>bathtub model</b>: any pixel below the dam crest "
          "elevation, downstream, is flagged as potentially flooded. It "
          "ignores hydraulic dynamics, channel roughness, attenuation, "
          "and travel time. Honest students label it &ldquo;maximum "
          "potential extent&rdquo; rather than &ldquo;flood prediction.&rdquo; "
          "If a real inundation forecast is needed, that is a HEC-RAS "
          "project, not a GIS project.", body),

        P("Q7. &ldquo;Can I use this work to actually advise the city?&rdquo;",
          h3),
        P("Not directly. A student-level vulnerability index is a "
          "<b>screening tool</b>: it flags candidate dams that warrant "
          "professional engineering inspection. The chain to actual "
          "policy advice runs through licensed dam-safety engineers and "
          "regulatory bodies. Frame the output that way and you are "
          "ethically and professionally clean.", body),
        Spacer(1, 4),
        PageBreak(),
    ]
