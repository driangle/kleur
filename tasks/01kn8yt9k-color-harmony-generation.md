---
id: "01kn8yt9k"
title: "Color harmony generation"
status: completed
priority: high
effort: medium
type: feature
phase: "core"
dependencies: ["01kn8yt92"]
tags: [core, harmony, phase:2-core]
created: 2026-04-03
context: ["docs/specs/mvp.md"]
---

# Color harmony generation

## Objective

Implement color harmony methods that generate palettes based on color theory relationships. These methods use hue rotation and lightness/saturation adjustments to produce aesthetically related colors. Covers spec section 6.

## Tasks

- [x] Implement `triadic()` — return 3 colors spaced 120 degrees apart
- [x] Implement `tetradic()` — return 4 colors spaced 90 degrees apart
- [x] Implement `analogous(angle?)` — return 3 adjacent colors (default angle: 30 degrees)
- [x] Implement `splitComplement(angle?)` — return 3 colors: base + two at 180 +/- angle
- [x] Implement `tints(count)` — return progressively lighter variations
- [x] Implement `shades(count)` — return progressively darker variations
- [x] Implement `tones(count)` — return progressively desaturated variations
- [x] Write tests verifying correct hue spacing and count for each method

## Acceptance Criteria

- All 7 harmony methods from the spec are implemented (complement is in adjustments)
- `triadic()` returns exactly 3 colors with hues 120 degrees apart
- `tetradic()` returns exactly 4 colors with hues 90 degrees apart
- `tints(5)` returns 5 colors, each lighter than the previous
- `shades(5)` returns 5 colors, each darker than the previous
- `tones(5)` returns 5 colors, each less saturated than the previous
- `analogous()` defaults to 30 degree angle; custom angle is respected
