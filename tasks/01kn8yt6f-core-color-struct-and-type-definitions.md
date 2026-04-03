---
id: "01kn8yt6f"
title: "Core color struct and type definitions"
status: completed
priority: critical
effort: medium
type: feature
phase: "foundation"
dependencies: ["01kn8ysmd"]
tags: [core, phase:1-foundation]
created: 2026-04-03
context: ["docs/specs/mvp.md"]
---

# Core color struct and type definitions

## Objective

Implement the foundational KleurStruct class and TypeScript type definitions. This is the central data structure of the library — an immutable RGBA color with derived HSL, channel getters/setters, and value clamping. Everything else in the library depends on this.

## Tasks

- [x] Define core types: KleurValue (string | number | KleurStruct), SolidKleur, Gradient, Kleur union
- [x] Implement KleurStruct class with r, g, b (0-255) and a (0-1) storage
- [x] Add derived HSL computation (h: 0-360, s: 0-100, l: 0-100) via RGB-to-HSL conversion
- [x] Implement HSL-to-RGB conversion helper
- [x] Add channel getters: red(), green(), blue(), hue(), saturation(), lightness(), alpha()
- [x] Add immutable setters: withRed(), withGreen(), withBlue(), withHue(), withSaturation(), withLightness(), withAlpha()
- [x] Implement value clamping on construction and all operations
- [x] Ensure all operations return new instances (immutability)
- [x] Write unit tests for construction, clamping, getters, setters, HSL round-tripping

## Acceptance Criteria

- KleurStruct stores RGBA and derives HSL correctly
- All channel values are clamped to valid ranges
- `withX()` methods return new instances without mutating the original
- HSL <-> RGB round-trips are accurate (within +/-1 for integer rounding)
- Tests pass for edge cases: pure black, pure white, fully transparent, hue wrapping at 360
