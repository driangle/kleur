---
id: "01kn8ytav"
title: "Color analysis functions"
status: pending
priority: high
effort: small
type: feature
phase: "core"
dependencies: ["01kn8yt6f"]
tags: [core, analysis, wcag, phase:2-core]
created: 2026-04-03
context: ["docs/specs/mvp.md"]
---

# Color analysis functions

## Objective

Implement color analysis methods for accessibility checking and color comparison. Includes WCAG luminance, contrast ratio, light/dark detection, and color distance. Covers spec section 8.

## Tasks

- [ ] Implement `luminance()` — WCAG 2.1 relative luminance with sRGB linearization
- [ ] Implement `isLight()` — true if lightness > 50
- [ ] Implement `isDark()` — true if lightness <= 50
- [ ] Implement `contrast(a, b)` — WCAG contrast ratio (1-21)
- [ ] Implement `distance(a, b)` — Euclidean distance in RGB space
- [ ] Write tests against known WCAG luminance values (e.g., white = 1.0, black = 0.0)
- [ ] Write tests verifying contrast ratio of black/white = 21

## Acceptance Criteria

- `luminance()` implements the exact WCAG 2.1 formula with sRGB linearization
- White luminance = 1.0, black luminance = 0.0
- `contrast(white, black)` = 21 (or very close due to floating point)
- `isLight()` and `isDark()` are mutually exclusive and exhaustive
- `distance()` between identical colors = 0
