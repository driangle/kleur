---
id: "01kn8yt92"
title: "Color adjustments"
status: completed
priority: high
effort: medium
type: feature
phase: "core"
dependencies: ["01kn8yt6f"]
tags: [core, manipulation, phase:2-core]
created: 2026-04-03
context: ["docs/specs/mvp.md"]
---

# Color adjustments

## Objective

Implement all color adjustment methods that modify lightness, saturation, hue, and alpha. These are the bread-and-butter manipulation operations. Covers spec section 5.

## Tasks

- [x] Implement `lighten(amount)` — increase lightness toward white (amount 0-1)
- [x] Implement `darken(amount)` — decrease lightness toward black (amount 0-1)
- [x] Implement `brightness(factor)` — scale lightness by a factor
- [x] Implement `saturate(amount)` — increase saturation (amount 0-1)
- [x] Implement `desaturate(amount)` — decrease saturation (amount 0-1)
- [x] Implement `grayscale()` — set saturation to 0
- [x] Implement `rotate(degrees)` — rotate hue on the color wheel
- [x] Implement `complement()` — rotate hue by 180 degrees
- [x] Implement `warm(amount)` — shift hue toward orange (default 0.2)
- [x] Implement `cool(amount)` — shift hue toward blue (default 0.2)
- [x] Implement `invert()` — invert RGB channels (255 - value)
- [x] Implement `opacity(value)` — set alpha to value
- [x] Implement `fade(amount)` — reduce alpha by percentage
- [x] Implement `opaque()` — set alpha to 1
- [x] Write tests for each adjustment with known input/output pairs

## Acceptance Criteria

- All 14 adjustment methods from the spec are implemented
- All methods return new KleurStruct instances (immutability)
- `lighten(1)` on any color produces white; `darken(1)` produces black
- `grayscale()` produces a color with saturation = 0
- `complement()` is equivalent to `rotate(180)`
- `invert()` of pure red (#ff0000) produces cyan (#00ffff)
- `opaque()` sets alpha to exactly 1
