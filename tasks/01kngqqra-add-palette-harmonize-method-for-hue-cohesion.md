---
title: "Add Palette.harmonize() method for hue cohesion"
id: "01kngqqra"
status: completed
priority: medium
type: feature
tags: ["palette", "api-enhancement"]
created: "2026-04-06"
---

# Add Palette.harmonize() method for hue cohesion

## Objective

Add a `harmonize()` method to `Palette` that nudges the hues of all colors toward harmonic relationships while preserving their lightness and saturation. Given a palette of arbitrary colors, this method finds the nearest harmonic hue arrangement (analogous, triadic, complementary, etc.) and shifts each color's hue toward it by a configurable amount. This makes a dissonant palette feel more cohesive — similar to Adobe's harmony rules.

## Tasks

- [ ] Research and choose a hue harmonization algorithm (e.g. snap to nearest harmonic template, weighted average toward centroid)
- [ ] Add `harmonize(amount?)` method to `Palette` class in `ts/src/palette.ts`
- [ ] The `amount` parameter (0–1, default ~0.5) controls how aggressively hues are shifted toward harmony
- [ ] Preserve each color's lightness and saturation — only hue is adjusted
- [ ] At `amount = 0`, return the palette unchanged; at `amount = 1`, fully snap to the harmonic arrangement
- [ ] Add tests covering: already-harmonic palette (no change), dissonant palette (hues shift), amount = 0 (identity), amount = 1 (full snap), lightness/saturation preservation
- [ ] Update docs (`apps/docs/api/palette.md`)
- [ ] Run `make check` to verify lint, tests, and build pass

## Acceptance Criteria

- `palette.harmonize()` returns a new Palette with hues shifted toward harmonic relationships
- Lightness and saturation are preserved for each color
- `amount` parameter controls the strength of harmonization (0 = no change, 1 = full)
- Works for palettes of any size
- All tests pass
