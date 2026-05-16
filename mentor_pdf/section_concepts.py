"""Section 2: The four pillars and the integration logic, in plain language."""

from reportlab.platypus import Spacer, PageBreak
from reportlab.lib.units import cm
from guide_pdf.styles import (
    P, bullets, numbered, hr, make_table,
    h1, h2, h3, body, note_style, code_style, warning_style,
)


def build(story):
    # ── The four pillars ────────────────────────────────────────────────
    story += [
        P("The Four Pillars &mdash; Explained Simply", h1),
        P("If your student remembers nothing else, they should remember "
          "what each pillar contributes and why we cannot remove any of "
          "them.", body),
    ]

    # ── ERT ─────────────────────────────────────────────────────────────
    story += [
        P("Pillar 1 &mdash; ERT (Electrical Resistivity Tomography)", h2),
        P("<b>Plain-language analogy:</b> imagine taking the X-ray of a "
          "loaf of bread to see whether the inside is dry crumb or soggy. "
          "ERT does the same to the dam: it injects electrical current "
          "through metal stakes pushed into the ground and measures how "
          "easily the current flows.", body),
        bullets([
            "<b>What it measures:</b> resistivity, in ohm-metres (&Omega;&middot;m).",
            "<b>What that tells us:</b> wet/clay material conducts well "
            "(low resistivity, &lt; 50 &Omega;&middot;m). Dry, granular, "
            "or rocky material resists current (high resistivity, "
            "&gt; 200 &Omega;&middot;m).",
            "<b>For a dam:</b> a band of unexpectedly low resistivity "
            "inside the embankment is a red flag &mdash; it could be a "
            "saturated zone, internal erosion, or a seepage path.",
            "<b>Limitation:</b> ERT is good at finding wet versus dry "
            "but cannot tell you <i>why</i> a zone is wet. That is what "
            "GPR and boreholes are for.",
        ]),
    ]

    # ── GPR ─────────────────────────────────────────────────────────────
    story += [
        P("Pillar 2 &mdash; GPR (Ground Penetrating Radar)", h2),
        P("<b>Plain-language analogy:</b> a fish-finder, but for the "
          "ground. GPR sends radar pulses into the soil and listens for "
          "echoes off any boundary where material properties change.",
          body),
        bullets([
            "<b>What it measures:</b> reflected radar amplitude versus "
            "time (which we convert to depth).",
            "<b>What that tells us:</b> the location and shape of "
            "interfaces &mdash; soil layering, voids, buried objects, "
            "the water table, cracks.",
            "<b>For a dam:</b> bright, anomalous reflections indicate "
            "voids (very dangerous), buried structures, or sharp material "
            "changes that should not be there in a homogeneous embankment.",
            "<b>Limitation:</b> GPR struggles in highly conductive "
            "(salty, clayey, wet) ground &mdash; exactly where ERT "
            "performs best. The two techniques are <b>complementary</b>, "
            "not redundant.",
        ]),
    ]

    # ── Geotechnical ────────────────────────────────────────────────────
    story += [
        P("Pillar 3 &mdash; Geotechnical Investigation", h2),
        P("<b>Plain-language analogy:</b> the ground-truth. ERT and GPR "
          "are both <i>indirect</i> &mdash; they infer subsurface "
          "properties from physical signals. Geotechnical drilling "
          "actually pulls out the soil and tests it.", body),
        bullets([
            "<b>What it measures:</b> SPT N-values (a measure of soil "
            "stiffness), moisture content, permeability, lithology "
            "logged metre by metre.",
            "<b>What that tells us:</b> the mechanical and hydraulic "
            "properties of the dam body, with absolute certainty at the "
            "borehole location.",
            "<b>For the project:</b> boreholes <b>calibrate</b> the "
            "geophysics. If ERT shows a low-resistivity zone and a "
            "borehole nearby has high moisture and low SPT, you have "
            "high confidence that zone is real and weak.",
            "<b>Limitation:</b> a borehole is one column in a 3D body. "
            "You can only afford a handful of them. That is why we need "
            "the geophysics to fill in the space between.",
        ]),
        P("<b>The teaching point</b>: emphasise that geotechnics is "
          "&ldquo;truth at a point&rdquo; and geophysics is "
          "&ldquo;estimate over space.&rdquo; Together they give "
          "&ldquo;truth over space.&rdquo;", note_style),
    ]

    # ── GIS ─────────────────────────────────────────────────────────────
    story += [
        P("Pillar 4 &mdash; GIS (Geographic Information System)", h2),
        P("<b>Plain-language analogy:</b> a stack of transparent maps "
          "you can put on top of one another, where every pixel knows "
          "its real-world coordinates.", body),
        bullets([
            "<b>What it does:</b> stores, aligns, and combines spatial "
            "data &mdash; rasters (satellite imagery, DEMs), vectors "
            "(roads, buildings, dam points), and tables.",
            "<b>Why we need it here:</b> the dam stability question is "
            "ultimately a <i>spatial</i> question. We are asking "
            "&ldquo;where on the map is risk highest?&rdquo; That is "
            "exactly what GIS is built to answer.",
            "<b>For this project:</b> GIS is the integration layer. "
            "It is where ERT, GPR, geotechnical, rainfall, slope, soil, "
            "land use, and population all become <i>numbers in the same "
            "grid cells</i> that we can multiply, add, and rank.",
            "<b>Limitation:</b> garbage in, garbage out. GIS will "
            "happily produce a beautiful map of nonsense if the inputs "
            "are wrong.",
        ]),
        Spacer(1, 4),
        PageBreak(),
    ]

    # ── How they combine ────────────────────────────────────────────────
    story += [
        P("How the Four Pillars Combine &mdash; The Integration Logic",
          h1),
        P("Walk through this with your student using a whiteboard. The "
          "diagram below describes the data flow:", body),
    ]

    flow_tbl = [
        ["Input layer", "Source", "Becomes"],
        ["ERT inverted resistivity", "Field survey",
         "Surface resistivity raster"],
        ["GPR depth slices", "Field survey",
         "Amplitude anomaly raster"],
        ["Borehole SPT &amp; moisture", "Field drilling",
         "Geotechnical weakness raster"],
        ["DEM (SRTM)", "Open data",
         "Slope raster"],
        ["DEM derivatives", "Open data",
         "Flow accumulation, drainage proximity"],
        ["Rainfall (CHIRPS / WorldClim)", "Open data",
         "Mean annual rainfall raster"],
        ["Land cover (BNETD / WorldCover)", "Open data",
         "LULC raster"],
        ["Soil (HWSD / SoilGrids)", "Open data",
         "Soil texture / clay raster"],
    ]
    story += [
        make_table(flow_tbl, [4.5*cm, 3.5*cm, 8.5*cm]),
        Spacer(1, 6),
        P("All eight rasters above are reclassified to a common 1&ndash;5 "
          "scale (1 = low vulnerability, 5 = very high), then combined "
          "using AHP-derived weights into a single <b>Vulnerability "
          "Index</b> map. The geophysical and geotechnical layers carry "
          "the highest weights (~64% combined) because they describe the "
          "dam itself; the other layers provide environmental context.",
          body),
        Spacer(1, 4),
        P("<b>The most important sentence to drill into your student:</b> "
          "&ldquo;The map is not the answer. The map is a hypothesis. "
          "Field validation is the answer.&rdquo;", warning_style),
        PageBreak(),
    ]
