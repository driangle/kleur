---
title: "Add lightweight Palette wrapper for harmony function results"
id: "01knfry2y"
status: completed
priority: medium
type: feature
tags: ["api", "harmony"]
created: "2026-04-05"
---

# Add lightweight Palette wrapper for harmony function results

## Objective

Harmony functions (`triadic()`, `tetradic()`, `tints()`, `shades()`, etc.) currently return raw arrays (`Color[]` or typed tuples like `[Color, Color, Color]`). To apply any operation across the palette (e.g., lighten all colors, adjust saturation), users must manually `Array.map()` over results. Introduce a lightweight `Palette` wrapper class that holds an array of colors and provides convenient collection operations, making palette-wide transformations ergonomic.

**Relevant files:** `ts/src/harmony.ts:5-58`, `ts/src/color.ts:300-336`

## Tasks

- [x] Design the `Palette` class API (methods like `map`, `forEach`, `filter`, `toArray`, plus color-specific helpers like `lightenAll`, `saturateAll`)
- [x] Implement the `Palette` class in a new `ts/src/palette.ts` module
- [x] Make `Palette` iterable (support `for...of` and spread syntax)
- [x] Update harmony functions to return `Palette` instances instead of raw arrays
- [x] Ensure backward compatibility — `Palette` should work wherever arrays were expected (via iteration protocol and `toArray()`)
- [x] Add tests for `Palette` collection operations
- [x] Add tests for harmony functions returning `Palette`
- [x] Export `Palette` from the package public API
- [x] Update docs (`apps/docs`) with `Palette` usage examples

## Acceptance Criteria

- Harmony functions (`triadic`, `tetradic`, `analogous`, `splitComplementary`, `tints`, `shades`, `tones`) return `Palette` instances
- `Palette` supports iteration (`for...of`, spread `[...palette]`), `map`, `filter`, `forEach`, and `toArray()`
- `Palette` provides color-specific bulk operations (e.g., `palette.lighten(10)` returns a new `Palette` with all colors lightened)
- Existing code using array destructuring or spread on harmony results continues to work
- All new behavior has corresponding tests
- `make check` passes
