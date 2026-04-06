---
title: "Python: output format conversions"
id: "01knhk6hm"
status: pending
priority: high
type: feature
effort: small
tags: ["python", "output"]
depends-on: ["01knhk6fx"]
created: "2026-04-06"
context: ["docs/specs/python-library.md", "ts/src/color.ts"]
---

# Python: output format conversions

## Objective

Add all output/serialization methods to the Color class: hex, CSS, RGB/HSL/HSB dicts, array/tuple, and normalized (WebGL) formats.

## Tasks

- [ ] Add `to_hex()` → `"#rrggbb"`
- [ ] Add `to_hex8()` → `"#rrggbbaa"`
- [ ] Add `to_css()` → `"rgba(r, g, b, a)"`
- [ ] Add `to_rgb()` → `Rgb` TypedDict
- [ ] Add `to_rgba()` → `Rgba` TypedDict
- [ ] Add `to_hsl()` → `Hsl` TypedDict
- [ ] Add `to_hsla()` → `Hsla` TypedDict
- [ ] Add `to_hsb()` → `Hsb` TypedDict
- [ ] Add `to_hsba()` → `Hsba` TypedDict
- [ ] Add `to_array()` → `tuple[int, int, int, float]`
- [ ] Add `to_normalized()` → `tuple[float, float, float, float]` (r/255, g/255, b/255, a)
- [ ] Ensure `__str__` delegates to `to_css()`
- [ ] Tests for all output formats with known reference values

## Acceptance Criteria

- All output methods return correctly typed values
- Hex output is lowercase with `#` prefix
- CSS output matches `rgba(r, g, b, a)` format
- Normalized values are in 0–1 range
- Output matches TS implementation for the same inputs
