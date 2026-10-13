# VYOMA Brand Kit — Developer Reference

Transcribed from `VYOMA BRAND GUIDELINES v2.pdf` (2026) so this doesn't need re-opening during build. This PDF is the source of truth for the new marketing site's visual identity — it supersedes any older palette found elsewhere (see note at bottom).

## Identity
- Wordmark: "VYOMA" with a circular logomark (Sri Yantra triangular geometry inside an orbit ring, a jet/arrow streaking through it)
- Tagline: **"Digital Backbone of Aviation"**
- Brand principles: Precision · Continuity · Trust · Forward Motion

## Color system

| Name | Hex | Meaning | Recommended balance |
|---|---|---|---|
| Deep Navy | `#143758` | Trust, Stability | 25% |
| Aviation Blue | `#005f8f` | Progress, Professionalism | — |
| Sky Blue | `#41a1d9` | Innovation, Freedom | 12% |
| Cloud | `#c0d2e1` | Clarity, Simplicity | — |
| Light | `#fefefe` | Balance, Clean | 55% |

The overall treatment should be **light-dominant** (white ~55%) with navy/sky as accent — not a dark-hero treatment. This is a deliberate differentiator vs. competitor sites (Aviatize, FlightLogger) which both lean dark/heavy.

## Typography
- Headings: **Barlow**
- Body: **Inter**
- Type scale: H1 32px Bold · H2 24px SemiBold · H3 18px SemiBold · Body 14px Regular · Small 12px Regular

## Graphic language / motifs
Reusable geometric elements, meant as abstract design devices — not literal aviation photography:

| Motif | Meaning | Site usage |
|---|---|---|
| Yantra Grid | Structured geometry, balance | Subtle background texture |
| Orbit Bands | Continuity, trajectory, connection | Hero background behind the logomark |
| Flight Chevron | Directional movement, momentum | Scroll-triggered section dividers |
| Rosette Ring | Heritage as a modular frame | Frame around testimonials/trust stats |

## Logo usage rules
- Minimum size: 120px wide (digital), 32mm wide (print) — below that, use the mark only
- Clear space: maintain space around every edge equal to the height of the central triangular unit
- Do not: stretch, rotate, recolor, or crop the mark

## ⚠ Known palette drift (do not propagate)
`camo-dev`'s actual in-app UI (`frontend/src/index.css`) uses a **red** primary (`#D92C2C`) + a slightly different navy (`#1F3A5F`) — this predates the 2026 brand kit and conflicts with it (no red anywhere in the official kit). The marketing site follows this brand kit (navy/blue only), not the product app's current UI colors. Worth flagging to the camo-dev team separately; out of scope to fix here.

## SaaS-not-airline positioning (team directive, 2026-10-13 huddle)
The site must read as a modern software product, not an airline brand. No aircraft/airport photography as a primary visual device anywhere on the site — use the motifs above plus realistic in-app UI mockups instead (see competitive reference notes in the project plan).
