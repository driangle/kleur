---
title: "Python: color analysis functions"
id: "01knhk6kv"
status: pending
priority: high
type: feature
effort: small
tags: ["python", "analysis"]
depends-on: ["01knhk6fx", "01knhk6f2"]
created: "2026-04-06"
context: ["docs/specs/python-library.md", "ts/src/analysis.ts"]
---

# Python: color analysis functions

## Objective

Implement WCAG-compliant color analysis: relative luminance, light/dark detection, and contrast ratio calculation. These are module-level functions that accept `KleurValue` inputs.

## Tasks

- [ ] Create `py/kleur/analysis.py`
- [ ] Implement `luminance(color)` — WCAG 2.1 relative luminance with sRGB linearization (0–1)
- [ ] Implement `is_light(color)` — returns `True` if lightness > 50
- [ ] Implement `is_dark(color)` — returns `True` if lightness <= 50
- [ ] Implement `contrast(a, b)` — WCAG contrast ratio (1–21)
- [ ] All functions accept `KleurValue` and resolve internally
- [ ] Tests with known WCAG reference values (black/white = 21:1, etc.)

## Acceptance Criteria

- `luminance()` uses correct sRGB linearization formula
- `contrast()` returns values in 1–21 range, symmetric (contrast(a,b) == contrast(b,a))
- `is_light`/`is_dark` are consistent and mutually exclusive
- Results match TS implementation
