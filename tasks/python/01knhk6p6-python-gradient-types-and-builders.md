---
title: "Python: gradient types and builders"
id: "01knhk6p6"
status: pending
priority: medium
type: feature
effort: medium
tags: ["python", "gradient"]
depends-on: ["01knhk6fx", "01knhk6gr"]
created: "2026-04-06"
context: ["docs/specs/python-library.md", "ts/src/gradient.ts", "ts/src/gradient-builder.ts"]
---

# Python: gradient types and builders

## Objective

Implement gradient types (SolidColor, LinearGradient, RadialGradient), factory functions, type guard functions, and fluent builder classes for incremental gradient construction.

## Tasks

- [ ] Create `py/kleur/gradient.py` with frozen dataclasses:
  - [ ] `GradientStop(offset, color)`
  - [ ] `SolidColor(color)`
  - [ ] `LinearGradient(x0, y0, x1, y1, stops, global_alpha)`
  - [ ] `RadialGradient(x0, y0, r0, x1, y1, r1, stops, global_alpha)`
  - [ ] `KleurFill` type alias
- [ ] Factory functions: `color_stop()`, `solid()`, `linear_gradient()`, `radial_gradient()`
- [ ] Type guard functions: `is_solid()`, `is_linear_gradient()`, `is_radial_gradient()`, `is_gradient()`
- [ ] `LinearGradientBuilder` with fluent `stop()` / `alpha()` / `build()` methods
- [ ] `RadialGradientBuilder` with fluent `stop()` / `alpha()` / `build()` methods
- [ ] Offset validation: clamp to 0–1, reject NaN/inf with `InvalidOffsetError`
- [ ] Tests for all types, factories, builders, and error cases

## Acceptance Criteria

- All gradient types are frozen (immutable) dataclasses
- Builders support method chaining and produce immutable gradients
- Offsets are clamped to 0–1; NaN/inf raises `InvalidOffsetError`
- Type guard functions return correct `TypeGuard` results
- Factory functions resolve `KleurValue` inputs via `resolve()`
