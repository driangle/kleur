---
title: "Add Palette.flatMap(fn) method for palette expansion"
id: "01kngqqqj"
status: completed
priority: medium
type: feature
tags: ["palette", "api-enhancement"]
created: "2026-04-06"
---

# Add Palette.flatMap(fn) method for palette expansion

## Objective

Add a `flatMap(fn)` method to `Palette` that maps each color to an array of colors (or a Palette) and flattens the results into a single new Palette. This is the general-purpose primitive for palette expansion — e.g. `palette.flatMap(c => c.shades(4))` expands each color into its shades. It unlocks tints, shades, tones, and harmony expansion patterns without needing dedicated methods for each.

## Tasks

- [ ] Add `flatMap(fn)` method to `Palette` class in `ts/src/palette.ts`
- [ ] Accept a callback `(color: Color, index: number) => Color[] | Palette`
- [ ] Flatten returned arrays/Palettes into a single new Palette
- [ ] Add tests covering: expansion via shades/tints, identity flatMap, empty results, mixed return types (array vs Palette), index parameter usage
- [ ] Update docs (`apps/docs/api/palette.md`)
- [ ] Run `make check` to verify lint, tests, and build pass

## Acceptance Criteria

- `palette.flatMap(fn)` returns a new Palette containing all colors produced by `fn`
- Callback receives `(color, index)` and may return `Color[]` or `Palette`
- Results are flattened in order (all outputs of color 0, then color 1, etc.)
- All tests pass
