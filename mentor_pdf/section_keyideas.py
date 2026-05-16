"""Section 3: Key concepts the student must understand."""

from reportlab.platypus import Spacer, PageBreak
from reportlab.lib.units import cm
from guide_pdf.styles import (
    P, bullets, numbered, hr, make_table,
    h1, h2, h3, body, note_style, code_style, warning_style,
)


def build(story):
    story += [
        P("Key Concepts Your Student Must Understand", h1),
        P("If you only have time to teach a few concepts, teach these. "
          "Each one is paired with a simple test you can use to check "
          "whether the student really gets it.", body),
        Spacer(1, 4),
    ]

    # ── 1. CRS ──────────────────────────────────────────────────────────
    story += [
        P("Concept 1 &mdash; Coordinate Reference Systems (CRS)", h2),
        P("<b>The idea:</b> every spatial dataset describes locations "
          "using a coordinate system. Two systems that matter:", body),
        bullets([
            "<b>Geographic CRS</b> (e.g., WGS84, EPSG:4326) &mdash; "
            "coordinates in degrees of latitude and longitude. Good for "
            "global storage. Bad for measurements: 1&deg; of longitude is "
            "111 km at the equator but 0 km at the poles.",
            "<b>Projected CRS</b> (e.g., UTM Zone 30N for Abidjan, "
            "EPSG:32630) &mdash; coordinates in metres on a flat plane. "
            "<b>This is what you use for analysis.</b> Buffers, areas, "
            "and distances only make sense in projected CRS.",
        ]),
        P("<b>Test:</b> ask the student &ldquo;why are we using UTM 30N "
          "for Abidjan?&rdquo; A correct answer mentions: (a) we need "
          "metres for buffers and areas, and (b) Abidjan&rsquo;s longitude "
          "(~4&deg;W) falls inside UTM Zone 30N&rsquo;s coverage.", note_style),
    ]

    # ── 2. Raster vs vector ─────────────────────────────────────────────
    story += [
        P("Concept 2 &mdash; Raster vs Vector", h2),
        bullets([
            "<b>Raster</b>: a grid of cells, each holding one value. "
            "Good for continuous phenomena (elevation, rainfall, "
            "resistivity). Example: SRTM DEM at 30 m.",
            "<b>Vector</b>: discrete shapes &mdash; points, lines, "
            "polygons &mdash; with attribute tables. Good for discrete "
            "objects (a road, a dam, a commune boundary).",
        ]),
        P("Most analysis in this project happens in <b>raster space</b>, "
          "because Weighted Overlay only works on aligned rasters. So "
          "every vector layer (e.g., drainage lines, dam buffers) "
          "eventually gets converted to a raster.", body),
        P("<b>Test:</b> &ldquo;If I have a roads shapefile and want it in "
          "the vulnerability model, what do I do?&rdquo; Correct: buffer "
          "&rarr; rasterise &rarr; reclassify.", note_style),
    ]

    # ── 3. Reclassification ─────────────────────────────────────────────
    story += [
        P("Concept 3 &mdash; Reclassification (Why a 1&ndash;5 Scale?)",
          h2),
        P("Each input layer measures something different in different "
          "units: resistivity in &Omega;&middot;m, slope in degrees, "
          "rainfall in mm. We <b>cannot add</b> 47 &Omega;&middot;m + "
          "12 degrees + 1850 mm. The numbers do not mean the same thing.",
          body),
        P("Reclassification solves this by mapping every layer onto a "
          "common dimensionless scale (we use 1&ndash;5, where 5 = highest "
          "vulnerability). After that, we can combine them.", body),
        P("<b>Test:</b> &ldquo;Why do we reclassify ERT resistivity so that "
          "low values get high scores?&rdquo; Correct: because low "
          "resistivity means saturated/weak zones, which is what we are "
          "<i>worried</i> about. The vulnerability scale is built around "
          "&ldquo;higher number = worse.&rdquo;", note_style),
    ]

    # ── 4. AHP ──────────────────────────────────────────────────────────
    story += [
        P("Concept 4 &mdash; AHP (Why Weights, Not Just Averages?)", h2),
        P("If we simply averaged the eight reclassified layers, we would "
          "be saying that rainfall and ERT matter equally. They do not.",
          body),
        bullets([
            "ERT and GPR describe the dam itself.",
            "Rainfall and land use describe the surroundings.",
            "Both matter, but they should not have the same weight.",
        ]),
        P("AHP (Analytic Hierarchy Process) is a structured way to derive "
          "weights from <b>pairwise comparisons</b>. The student fills in "
          "a matrix asking, for each pair, &ldquo;how much more important "
          "is X than Y?&rdquo; The maths then gives back a consistent set "
          "of weights that sum to 1.", body),
        P("Critically, AHP also produces a <b>Consistency Ratio (CR)</b>. "
          "If CR &gt; 0.10, the pairwise judgements contradict each other "
          "and the weights are unreliable. This is the safeguard against "
          "students just making up numbers.", body),
        P("<b>Test:</b> &ldquo;What does CR &gt; 0.10 mean and what do you "
          "do?&rdquo; Correct: it means the pairwise judgements are "
          "inconsistent; revise the matrix until CR is below 0.10.",
          note_style),
    ]

    # ── 5. Weighted overlay ─────────────────────────────────────────────
    story += [
        P("Concept 5 &mdash; Weighted Overlay", h2),
        P("Once layers are reclassified (same 1&ndash;5 scale) and weights "
          "are set (sum to 100%), Weighted Overlay simply does:", body),
        P("Vulnerability = &Sigma; (layer<sub>i</sub> &times; weight<sub>i</sub>) "
          "for i = 1..8", code_style),
        P("Every pixel ends up with one number between 1 and 5. We "
          "classify those into Low, Moderate, High, Very High, Critical "
          "and that is the final map.", body),
        P("<b>Test:</b> &ldquo;A pixel scored 4.7. What does that mean and "
          "what should be done about that location?&rdquo; Correct: very "
          "high vulnerability; recommend prioritised field inspection and "
          "monitoring.", note_style),
        Spacer(1, 4),
        PageBreak(),
    ]

    # ── 6. NoData ───────────────────────────────────────────────────────
    story += [
        P("Concept 6 &mdash; NoData (The Silent Map-Killer)", h2),
        P("In raster analysis, <b>NoData</b> means &ldquo;value missing "
          "here.&rdquo; If even one input layer has NoData inside the "
          "study area, every output that uses it will also be NoData "
          "there. Beginners produce maps with mysterious blank patches "
          "and do not know why.", body),
        P("Common causes specific to this project:", body),
        bullets([
            "Drainage proximity raster has NoData outside buffers &rarr; "
            "fix by reclassifying NoData &rarr; 1.",
            "ERT/GPR/geotech surfaces only cover the immediate dam area "
            "&rarr; this is a real limitation; either extend the analysis "
            "extent to just the dam zones, or use a default value (e.g., 1) "
            "for &ldquo;no information&rdquo; areas with a clear caveat.",
            "Soil rasters with sea pixels reaching into the lagoon &rarr; "
            "clip to the land boundary first.",
        ]),
        P("<b>Test:</b> &ldquo;Your final map has a hole in it. What are "
          "the three most likely reasons?&rdquo;", note_style),
    ]

    # ── 7. Validation ───────────────────────────────────────────────────
    story += [
        P("Concept 7 &mdash; Validation (The Map Is a Hypothesis)", h2),
        P("This is the concept students most often skip. A vulnerability "
          "map is a <i>prediction</i>. It must be tested.", body),
        P("Possible validation strategies for this project:", body),
        bullets([
            "<b>Cross-validation between techniques:</b> do the ERT, GPR, "
            "and borehole anomalies agree at the locations where they "
            "overlap? If yes, confidence is high.",
            "<b>Historical record:</b> do dams that historically had "
            "leakage, repairs, or near-failures fall in the High/Critical "
            "zones of the map?",
            "<b>Expert review:</b> have a dam engineer or hydrogeologist "
            "look at the map and rate whether the rankings match their "
            "intuition.",
            "<b>Sensitivity analysis:</b> change the AHP weights by &plusmn;20% "
            "and re-run. If the high-risk dams stay high-risk, the model "
            "is robust. If they shuffle wildly, the model is fragile.",
        ]),
        P("<b>Test:</b> &ldquo;Your map says Dam A is critical. How do "
          "you convince a sceptical engineer?&rdquo; Correct answer "
          "involves at least two of the four validation strategies above.",
          note_style),
        Spacer(1, 4),
        PageBreak(),
    ]
