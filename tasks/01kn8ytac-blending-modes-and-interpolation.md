---
id: "01kn8ytac"
title: "Blending modes and interpolation"
status: completed
priority: high
effort: medium
type: feature
phase: "core"
dependencies: ["01kn8yt6f"]
tags: [core, blending, phase:2-core]
created: 2026-04-03
context: ["docs/specs/mvp.md"]
---

# Blending modes and interpolation

## Objective

Implement color blending (multiply, screen, overlay, add, subtract) and linear interpolation (mix/lerp). Covers spec section 7.

## Tasks

- [x] Implement `blend(base, overlay, mode)` static method
- [x] Implement multiply blend: `base * overlay` (per channel, normalized)
- [x] Implement screen blend: `1 - (1 - base) * (1 - overlay)`
- [x] Implement overlay blend: multiply if base < 0.5, screen otherwise
- [x] Implement add blend: `clamp(base + overlay, 0, 1)`
- [x] Implement subtract blend: `clamp(base - overlay, 0, 1)`
- [x] Implement `mix(a, b, t)` / `lerp(a, b, t)` — linear interpolation in RGB space, default t = 0.5
- [x] Add instance method `interpolate(target, t)` / `lerp(target, t)` on KleurStruct
- [x] Write tests with known blend results for each mode

## Acceptance Criteria

- All 5 blend modes produce correct results per the spec formulas
- `mix(a, b, 0)` returns a; `mix(a, b, 1)` returns b; `mix(a, b, 0.5)` returns the midpoint
- `lerp` is an alias for `mix` with identical behavior
- Instance `interpolate()` method works equivalently to static `mix()`
- Blend results are clamped to valid ranges
