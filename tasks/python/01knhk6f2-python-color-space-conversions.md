---
title: "Python: color space conversions"
id: "01knhk6f2"
status: pending
priority: critical
type: feature
effort: medium
tags: ["python", "color-science"]
depends-on: ["01knhk6e5"]
created: "2026-04-06"
context: ["docs/specs/python-library.md", "ts/src/hsl.ts", "ts/src/hsb.ts", "ts/src/color-spaces.ts"]
---

# Python: color space conversions

## Objective

Implement all color space conversion functions that the Color class and analysis modules depend on. These are pure math functions with no dependencies on the Color class itself, so they can be built and tested in isolation.

## Tasks

- [ ] Create `py/kleur/hsl.py` with `rgb_to_hsl()` and `hsl_to_rgb()` (hue normalization, achromatic handling)
- [ ] Create `py/kleur/hsb.py` with `rgb_to_hsb()` and `hsb_to_rgb()`
- [ ] Create `py/kleur/color_spaces.py` with:
  - [ ] `linearize()` / `delinearize()` for sRGB gamma
  - [ ] `rgb_to_xyz()` / `xyz_to_rgb()` with D65 illuminant
  - [ ] `xyz_to_lab()` / `lab_to_xyz()` (L 0–100, a/b ~-128 to +128)
  - [ ] `rgb_to_lab()` / `lab_to_rgb()` convenience wrappers
  - [ ] `lab_to_lch()` / `lch_to_lab()` cylindrical conversion
  - [ ] `rgb_to_oklab()` / `oklab_to_rgb()` (L 0–1, a/b ~-0.4 to +0.4)
  - [ ] `oklab_to_oklch()` / `oklch_to_oklab()`
- [ ] Port reference test values from the TS test suite
- [ ] Test round-trip accuracy: rgb → space → rgb for all spaces

## Acceptance Criteria

- All conversion functions match TS implementation output within floating-point tolerance
- Round-trip conversions preserve values (rgb → hsl → rgb, rgb → lab → rgb, etc.)
- Edge cases handled: black, white, pure grays (achromatic), fully saturated primaries
- All tests pass, `mypy --strict` passes
