---
title: "Clarify warm/cool parameter semantics and rename to intensity"
id: "01kngmnm8"
status: completed
priority: low
type: feature
tags: ["api-consistency"]
created: "2026-04-06"
---

# Clarify warm/cool parameter semantics and rename to intensity

## Objective

The `warm(amount = 0.2)` and `cool(amount = 0.2)` methods on `Color` (`ts/src/color.ts:268-272`) accept an `amount` parameter whose meaning is unclear from the API surface. It could be a proportion, degrees, or a temperature value.

The actual math is a fractional hue shift toward a target hue (30° for warm, 240° for cool): `adjustHue(((targetHue - currentHue + 540) % 360 - 180) * amount)`. So `amount` is an interpolation factor (0 = no shift, 1 = fully shift to the target hue). This should be made explicit by renaming the parameter to `intensity` and documenting the behavior.

## Tasks

- [ ] Rename `amount` parameter to `intensity` in `Color.warm()` and `Color.cool()`
- [ ] Rename `amount` parameter to `intensity` in `Palette.warm()` and `Palette.cool()` for consistency
- [ ] Add JSDoc to `warm()` and `cool()` explaining: intensity is a 0–1 interpolation factor toward the target hue (30° for warm, 240° for cool)
- [ ] Update docs (`apps/docs/api/color.md`) to document the parameter semantics
- [ ] Update any tests referencing the old parameter name
- [ ] Run `make check` to verify lint, tests, and build pass

## Acceptance Criteria

- Parameter is named `intensity` (not `amount`) in both `Color` and `Palette` warm/cool methods
- JSDoc on `warm()` and `cool()` explains the hue-shift interpolation behavior
- Docs reflect the renamed parameter and its semantics
- All tests pass
