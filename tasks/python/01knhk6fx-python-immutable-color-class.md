---
title: "Python: immutable Color class"
id: "01knhk6fx"
status: pending
priority: critical
type: feature
effort: medium
tags: ["python", "core"]
depends-on: ["01knhk6e5", "01knhk6f2"]
created: "2026-04-06"
context: ["docs/specs/python-library.md", "ts/src/color.ts"]
---

# Python: immutable Color class

## Objective

Implement the core `Color` class — the central type in the library. It stores RGBA internally, exposes read-only properties for all color spaces (HSL, HSB computed on demand), and provides immutable `with_*` / `adjust_*` / `scale_*` channel methods. Does not yet include semantic adjustments (lighten, darken) or harmony methods — those are separate tasks.

## Tasks

- [ ] Create `py/kleur/color.py` with `Color` class using `__slots__` for immutability
- [ ] Internal storage: `_r`, `_g`, `_b`, `_a` (clamped/rounded on construction)
- [ ] Validation: reject `NaN`/`inf` with `InvalidChannelError`
- [ ] Read-only `@property`: `red`, `green`, `blue`, `alpha`
- [ ] Lazy-computed HSL properties: `hue`, `saturation_hsl`, `lightness`, `hsl`
- [ ] Lazy-computed HSB properties: `saturation_hsb`, `brightness`, `hsb`
- [ ] Immutable setters: `with_red()`, `with_green()`, `with_blue()`, `with_alpha()`, `with_hue()`, `with_saturation_hsl()`, `with_saturation_hsb()`, `with_brightness()`, `with_lightness()`
- [ ] Delta adjusters: `adjust_alpha()`, `adjust_hue()`, `adjust_saturation_hsl()`, `adjust_saturation_hsb()`, `adjust_brightness()`, `adjust_lightness()`
- [ ] Scale adjusters: `scale_alpha()`, `scale_saturation_hsl()`, `scale_saturation_hsb()`, `scale_brightness()`, `scale_lightness()`
- [ ] Dunder methods: `__repr__`, `__str__`, `__eq__`, `__hash__`
- [ ] Tests for construction, clamping, channel access, immutability, NaN/inf rejection

## Acceptance Criteria

- `Color` instances are immutable (no public setters, `__slots__` prevents attribute assignment)
- All `with_*` / `adjust_*` / `scale_*` return new `Color` instances
- Channel clamping and hue normalization match TS behavior
- `NaN`/`inf` raises `InvalidChannelError`
- `__eq__` and `__hash__` work correctly (usable in sets/dicts)
- `mypy --strict` passes
