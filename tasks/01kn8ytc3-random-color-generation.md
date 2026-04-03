---
id: "01kn8ytc3"
title: "Random color generation"
status: completed
priority: medium
effort: small
type: feature
phase: "extras"
dependencies: ["01kn8yt6f"]
tags: [utility, phase:3-extras]
created: 2026-04-03
context: ["docs/specs/mvp.md"]
---

# Random color generation

## Objective

Implement constrained random color generation. Users can generate random colors with optional constraints on hue, saturation, lightness, and alpha. Covers spec section 11.

## Tasks

- [x] Implement `random(options?)` function
- [x] Support `hue` option: "warm", "cool", or [min, max] range
- [x] Support `saturation` option: [min, max] range (0-100)
- [x] Support `lightness` option: [min, max] range (0-100)
- [x] Support `alpha` option: fixed alpha value
- [x] Define "warm" as hue range roughly 0-90 and 330-360; "cool" as 90-330
- [x] Write tests verifying constraints are respected (run multiple times, check all outputs are in range)

## Acceptance Criteria

- `random()` with no options returns a valid color with alpha = 1
- `random({ hue: "warm" })` produces hues in the warm range
- `random({ saturation: [80, 100] })` produces highly saturated colors
- All generated colors have valid, clamped channel values
- Constraints compose (e.g., warm + high saturation + specific lightness range)
