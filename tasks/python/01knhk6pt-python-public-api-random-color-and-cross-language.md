---
title: "Python: public API, random color, and cross-language test vectors"
id: "01knhk6pt"
status: pending
priority: high
type: feature
effort: medium
tags: ["python", "api", "testing"]
depends-on: ["01knhk6gr", "01knhk6hm", "01knhk6j5", "01knhk6jy", "01knhk6kv", "01knhk6me", "01knhk6np", "01knhk6p6"]
created: "2026-04-06"
context: ["docs/specs/python-library.md", "ts/src/index.ts", "ts/src/random.ts"]
---

# Python: public API, random color, and cross-language test vectors

## Objective

Wire up the public `__init__.py` that re-exports the full API, implement `random_color()`, and create a shared cross-language test vector suite that both Python and TypeScript run against to guarantee behavioral parity.

## Tasks

- [ ] Create `py/kleur/random.py` with `random_color()`:
  - [ ] Keyword-only args: `hue`, `saturation`, `lightness`, `alpha`, `rng`
  - [ ] Hue constraints: `"warm"` (0–90° + 330–360°), `"cool"` (90–330°), or `(min, max)` tuple
  - [ ] Saturation/lightness as `(min, max)` tuples
  - [ ] Custom `rng` callable (defaults to `random.random`)
- [ ] Create `py/kleur/__init__.py` that re-exports:
  - [ ] Factory functions: `color`, `rgb`, `hex`, `hsl`, `int_`, `css`, `grayscale`, `resolve`, `random_color`
  - [ ] Named constants: `WHITE`, `BLACK`, `RED`, `GREEN`, `BLUE`, `YELLOW`, `CYAN`, `MAGENTA`, `ORANGE`, `PURPLE`, `PINK`, `LIME`, `TRANSPARENT`
  - [ ] Classes: `Color`, `Palette`, `LinearGradientBuilder`, `RadialGradientBuilder`
  - [ ] Analysis: `luminance`, `is_light`, `is_dark`, `contrast`, `distance`
  - [ ] Blending: `blend`, `mix`
  - [ ] Harmony: `triadic`, `tetradic`, `analogous`, `split_complement`, `tints`, `shades`, `tones`
  - [ ] Gradients: `color_stop`, `solid`, `linear_gradient`, `radial_gradient`, `is_solid`, `is_linear_gradient`, `is_radial_gradient`, `is_gradient`
  - [ ] Types and errors
- [ ] Create shared `vectors.json` at repo root with canonical test vectors for:
  - [ ] Parsing (hex, CSS, named, int)
  - [ ] Channel access (RGB, HSL, HSB)
  - [ ] Adjustments (lighten, darken, saturate, desaturate, rotate, warm, cool)
  - [ ] Blend modes (all 13)
  - [ ] Mix interpolation
  - [ ] Harmony generation
  - [ ] Luminance, contrast, distance
  - [ ] Output formats
- [ ] Generate vectors from the TS test suite
- [ ] Add Python test that reads `vectors.json` and validates all entries
- [ ] Add TS test that reads `vectors.json` and validates all entries
- [ ] Verify `import kleur` exposes the full public API via `dir(kleur)` or `__all__`

## Acceptance Criteria

- `import kleur` provides the complete public API as documented in the spec
- `random_color()` respects all constraints and produces valid colors
- `vectors.json` exists with comprehensive test vectors
- Both Python and TS test suites pass against the shared vectors
- `__all__` is defined and complete
- `mypy --strict` passes on the full package
