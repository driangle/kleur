---
title: "Add Palette.balanceLightness() method for uniform perceived lightness"
id: "01kngqqs1"
status: pending
priority: medium
type: feature
tags: ["palette", "api-enhancement"]
created: "2026-04-06"
---

# Add Palette.balanceLightness() method for uniform perceived lightness

## Objective

Add a `balanceLightness()` method to `Palette` that adjusts all colors to share a uniform perceived lightness while preserving their hue and saturation. This is critical for UI palettes (icon sets, tag colors, chip backgrounds) where uneven lightness makes some colors visually dominate. The target lightness should default to the median lightness of the palette but be optionally overridable.

## Tasks

- [ ] Add `balanceLightness(target?)` method to `Palette` class in `ts/src/palette.ts`
- [ ] Default `target` to the median lightness of the palette's colors
- [ ] Adjust each color's lightness to the target using `Color.withLightness()`
- [ ] Preserve hue and saturation for each color
- [ ] Add tests covering: palette with varied lightness (values converge), already-uniform palette (no change), custom target lightness, single-color palette, hue/saturation preservation
- [ ] Update docs (`apps/docs/api/palette.md`)
- [ ] Run `make check` to verify lint, tests, and build pass

## Acceptance Criteria

- `palette.balanceLightness()` returns a new Palette where all colors share the same lightness
- Default target is the median lightness of the input palette
- Optional `target` parameter overrides the lightness value (0–100)
- Hue and saturation are preserved for each color
- All tests pass
