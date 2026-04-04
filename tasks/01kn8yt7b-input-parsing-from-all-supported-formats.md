---
id: "01kn8yt7b"
title: "Input parsing from all supported formats"
status: completed
priority: critical
effort: medium
type: feature
phase: "foundation"
dependencies: ["01kn8yt6f"]
tags: [core, parsing, phase:1-foundation]
created: 2026-04-03
context: ["docs/specs/mvp.md"]
---

# Input parsing from all supported formats

## Objective

Implement all input format parsers so colors can be created from hex strings, HSL values, CSS color strings, integers, and the gray shorthand. This task covers spec sections 2 (Input Formats) and the factory functions that create Color instances.

## Tasks

- [x] Implement `rgb(r, g, b, a?)` factory function
- [x] Implement `fromHex(str)` — parse 3-digit and 6-digit hex strings (# required)
- [x] Implement `fromHsl(h, s, l)` and `fromHsla(h, s, l, a)` factory functions
- [x] Implement CSS string parser: `rgb()`, `rgba()`, `hsl()`, `hsla()` function syntax
- [x] Implement `fromNumber(int)` — parse 24-bit packed integer (0xRRGGBB)
- [x] Implement `gray(value, alpha?)` / `grey(value, alpha?)` shorthand
- [x] Implement named color lookup (case-insensitive) — depends on named colors dictionary or a minimal subset for testing
- [x] Implement `struct(value)` — universal converter from KleurValue to Color
- [x] Write tests for each input format, including edge cases and malformed input

## Acceptance Criteria

- All 9 input formats from the spec are supported
- `fromHex("#abc")` and `fromHex("#aabbcc")` produce identical colors
- CSS string parsing handles spaces, missing alpha, and case variations
- `struct()` accepts string, number, and Color inputs
- Invalid input is handled gracefully (clamped or errors, not silent corruption)
