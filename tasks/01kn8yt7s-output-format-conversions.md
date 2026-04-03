---
id: "01kn8yt7s"
title: "Output format conversions"
status: completed
priority: critical
effort: small
type: feature
phase: "foundation"
dependencies: ["01kn8yt6f"]
tags: [core, phase:1-foundation]
created: 2026-04-03
context: ["docs/specs/mvp.md"]
---

# Output format conversions

## Objective

Implement all output format methods on KleurStruct so any color can be serialized to hex, CSS, RGB/HSL objects, arrays, and normalized WebGL format. Covers spec section 3.

## Tasks

- [x] Implement `toHex()` — returns "#rrggbb"
- [x] Implement `toCss()` — returns "rgba(r,g,b,a)"
- [x] Implement `toRgb()` — returns {r, g, b}
- [x] Implement `toRgba()` — returns {r, g, b, a}
- [x] Implement `toHsl()` — returns {h, s, l}
- [x] Implement `toHsla()` — returns {h, s, l, a}
- [x] Implement `toArray()` — returns [r, g, b, a]
- [x] Implement `toNormalized()` — returns [r/255, g/255, b/255, a] (0-1 range)
- [x] Implement `toString()` — delegates to toCss()
- [x] Write tests verifying output for known colors (e.g., pure red -> "#ff0000")

## Acceptance Criteria

- All 9 output methods from the spec are implemented
- `toHex()` produces lowercase 6-digit hex with # prefix
- `toNormalized()` values are in 0-1 range
- `toString()` returns the same value as `toCss()`
- Round-trip: `fromHex(color.toHex())` produces an equivalent color
