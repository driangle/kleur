---
title: "Python: blending modes and interpolation"
id: "01knhk6jy"
status: pending
priority: high
type: feature
effort: medium
tags: ["python", "blending"]
depends-on: ["01knhk6fx", "01knhk6gr"]
created: "2026-04-06"
context: ["docs/specs/python-library.md", "ts/src/blend.ts"]
---

# Python: blending modes and interpolation

## Objective

Implement all 13 blend modes and the `mix()` interpolation function, both as module-level functions and as Color instance methods. Support custom blend functions and optional easing.

## Tasks

- [ ] Create `py/kleur/blend.py` with channel-level blend math for all 13 modes:
  - [ ] multiply, screen, overlay, darken, lighten
  - [ ] color_dodge, color_burn, hard_light, soft_light
  - [ ] difference, exclusion, add, subtract
- [ ] Implement `blend(base, overlay, mode)` module-level function
- [ ] Implement `mix(a, b, t=0.5, ease=None)` module-level function (RGB-space linear interpolation)
- [ ] Support `BlendMode` enum and custom `BlendFn` callables
- [ ] Add `Color.blend(overlay, mode)` instance method
- [ ] Add `Color.mix(target, t=0.5, ease=None)` instance method
- [ ] Raise `UnknownOptionError` for invalid blend mode strings
- [ ] Tests for all 13 modes with edge cases (multiply by white = identity, etc.)
- [ ] Tests for mix with easing functions

## Acceptance Criteria

- All 13 blend modes produce correct results matching TS implementation
- Custom blend functions accepted alongside enum values
- Alpha compositing handled correctly
- `mix()` supports optional easing function
- `UnknownOptionError` raised for invalid modes
