---
title: "Add Palette.spread(count) method for palette resampling"
id: "01kngqqnc"
status: completed
priority: medium
type: feature
tags: ["palette", "api-enhancement"]
created: "2026-04-06"
---

# Add Palette.spread(count) method for palette resampling

## Objective

Add a `spread(count)` method to `Palette` that resamples the palette to exactly `count` colors by interpolating between existing colors. This treats the palette as ordered control points and produces a new palette of the desired size — useful when you need "this palette, but as a 5-step scale" or "this palette, but as a 12-step scale." Expanding adds interpolated intermediates; contracting samples representative colors.

## Tasks

- [ ] Add `spread(count)` method to `Palette` class in `ts/src/palette.ts`
- [ ] Interpolate between adjacent colors using the existing `Color.mix()` method
- [ ] Handle edge cases: count of 0 (empty palette), count of 1 (midpoint or first color), count equal to current length (identity), count less than current length (downsample)
- [ ] Add tests covering: upsampling (3 → 9), downsampling (9 → 3), identity (n → n), edge cases (0, 1), color accuracy of interpolated results
- [ ] Update docs (`apps/docs/api/palette.md`)
- [ ] Run `make check` to verify lint, tests, and build pass

## Acceptance Criteria

- `palette.spread(count)` returns a new Palette with exactly `count` colors
- Colors are interpolated smoothly between the existing palette colors in order
- First and last colors of the original palette are preserved when count >= 2
- All tests pass
