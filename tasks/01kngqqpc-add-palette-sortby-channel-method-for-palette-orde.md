---
title: "Add Palette.sortBy(channel) method for palette ordering"
id: "01kngqqpc"
status: completed
priority: medium
type: feature
tags: ["palette", "api-enhancement"]
created: "2026-04-06"
---

# Add Palette.sortBy(channel) method for palette ordering

## Objective

Add a `sortBy(channel)` method to `Palette` that returns a new palette with colors sorted by a given color channel. Supported channels should include `hue`, `saturation`, `lightness`, `brightness`, `red`, `green`, `blue`, and `alpha`. Sorting by hue produces a rainbow order; sorting by lightness produces a grayscale ramp. This is essential for rendering ordered swatches and generating usable design system scales.

## Tasks

- [ ] Define a union type for valid sort channels (e.g. `PaletteSortChannel`)
- [ ] Add `sortBy(channel, direction?)` method to `Palette` class in `ts/src/palette.ts`
- [ ] Support ascending (default) and descending order via an optional direction parameter
- [ ] Use the existing `Color` channel getters (`hue`, `lightness`, `saturationHsl`, `brightness`, `red`, `green`, `blue`, `alpha`)
- [ ] Add tests covering: each supported channel, ascending vs descending, stable sort for equal values, single-color palette, empty palette
- [ ] Update docs (`apps/docs/api/palette.md`)
- [ ] Run `make check` to verify lint, tests, and build pass

## Acceptance Criteria

- `palette.sortBy('hue')` returns a new Palette with colors sorted by hue ascending
- All channel options (`hue`, `saturation`, `lightness`, `brightness`, `red`, `green`, `blue`, `alpha`) are supported
- Optional direction parameter supports `'asc'` (default) and `'desc'`
- Returns a new Palette (immutable)
- All tests pass
