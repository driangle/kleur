---
id: "01kn8yt92"
title: "Color adjustments"
status: pending
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

- [ ] Implement `lighten(amount)` — increase lightness toward white (amount 0-1)
- [ ] Implement `darken(amount)` — decrease lightness toward black (amount 0-1)
- [ ] Implement `brightness(factor)` — scale lightness by a factor
- [ ] Implement `saturate(amount)` — increase saturation (amount 0-1)
- [ ] Implement `desaturate(amount)` — decrease saturation (amount 0-1)
- [ ] Implement `grayscale()` — set saturation to 0
- [ ] Implement `rotate(degrees)` — rotate hue on the color wheel
- [ ] Implement `complement()` — rotate hue by 180 degrees
- [ ] Implement `warm(amount)` — shift hue toward orange (default 0.2)
- [ ] Implement `cool(amount)` — shift hue toward blue (default 0.2)
- [ ] Implement `invert()` — invert RGB channels (255 - value)
- [ ] Implement `opacity(value)` — set alpha to value
- [ ] Implement `fade(amount)` — reduce alpha by percentage
- [ ] Implement `opaque()` — set alpha to 1
- [ ] Write tests for each adjustment with known input/output pairs

## Acceptance Criteria

- All 14 adjustment methods from the spec are implemented
- All methods return new KleurStruct instances (immutability)
- `lighten(1)` on any color produces white; `darken(1)` produces black
- `grayscale()` produces a color with saturation = 0
- `complement()` is equivalent to `rotate(180)`
- `invert()` of pure red (#ff0000) produces cyan (#00ffff)
- `opaque()` sets alpha to exactly 1
