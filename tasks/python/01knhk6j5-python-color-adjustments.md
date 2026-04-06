---
title: "Python: color adjustments"
id: "01knhk6j5"
status: pending
priority: high
type: feature
effort: medium
tags: ["python", "adjustments"]
depends-on: ["01knhk6fx"]
created: "2026-04-06"
context: ["docs/specs/python-library.md", "ts/src/color.ts"]
---

# Python: color adjustments

## Objective

Add semantic color adjustment methods to the Color class: lighten, darken, saturate, desaturate, grayscale, rotate, complement, warm, cool, invert, and opaque. These are the high-level manipulation methods users interact with most.

## Tasks

- [ ] Implement `lighten(amount)` — proportion of remaining headroom toward white
- [ ] Implement `darken(amount)` — proportion of current lightness toward black
- [ ] Implement `saturate(amount)` — proportion of remaining headroom
- [ ] Implement `desaturate(amount)` — proportion of current saturation
- [ ] Implement `grayscale()` — set saturation to 0
- [ ] Implement `rotate(degrees)` — adjust hue, wraps at 360°
- [ ] Implement `complement()` — hue + 180°
- [ ] Implement `warm(intensity=0.2)` — shift hue toward 30°
- [ ] Implement `cool(intensity=0.2)` — shift hue toward 240°
- [ ] Implement `invert()` — 255-r, 255-g, 255-b (preserve alpha)
- [ ] Implement `opaque()` — set alpha to 1.0
- [ ] Tests for each adjustment with reference values from TS, including edge cases (black, white, grayscale colors)

## Acceptance Criteria

- All methods return new `Color` instances (immutability preserved)
- lighten/darken/saturate/desaturate use proportional scaling matching TS behavior
- warm/cool shift hue toward target angle using shortest arc
- Results match TS test vectors
