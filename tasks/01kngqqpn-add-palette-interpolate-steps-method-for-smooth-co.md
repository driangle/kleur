---
title: "Add Palette.interpolate(steps) method for smooth color ramps"
id: "01kngqqpn"
status: completed
priority: medium
type: feature
tags: ["palette", "api-enhancement"]
created: "2026-04-06"
---

# Add Palette.interpolate(steps) method for smooth color ramps

## Objective

Add an `interpolate(steps)` method to `Palette` that generates a smooth color ramp by treating the palette's colors as ordered control points. Given a palette of N colors and a requested step count, the method produces a new palette where colors transition smoothly through each original color in sequence. This is the core operation for turning a few hand-picked colors into a full gradient scale — e.g. a 3-color palette with `interpolate(9)` gives a smooth 9-step ramp.

## Tasks

- [ ] Add `interpolate(steps)` method to `Palette` class in `ts/src/palette.ts`
- [ ] Use `Color.mix()` to blend between adjacent control-point colors
- [ ] Map each output step position to the appropriate segment and local interpolation factor
- [ ] Support an optional `ease` parameter for non-linear interpolation (consistent with `Color.mix()`)
- [ ] Handle edge cases: steps <= 0, steps = 1, single-color palette, steps equal to palette length
- [ ] Add tests covering: basic interpolation, endpoint preservation, midpoint accuracy, easing, edge cases
- [ ] Update docs (`apps/docs/api/palette.md`)
- [ ] Run `make check` to verify lint, tests, and build pass

## Acceptance Criteria

- `palette.interpolate(steps)` returns a new Palette with exactly `steps` colors
- The first and last colors match the palette's first and last colors
- Intermediate colors are smoothly blended between adjacent palette colors
- Optional `ease` function controls the interpolation curve
- All tests pass
