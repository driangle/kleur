---
title: "Add space and method options to distance function"
id: "01kn9hvwx"
status: completed
priority: high
type: feature
tags: ["api", "analysis"]
created: "2026-04-03"
---

# Add space and method options to distance function

## Objective

The `distance()` function currently only computes Euclidean distance in RGB space. It should accept an optional second argument supporting either a preset shorthand or an explicit space+method combination. The types are:

```ts
type DistancePreset = "fast" | "perceptual" | "accurate" | "modern";

type DistanceOptions =
  | { preset: DistancePreset }
  | {
      space: "rgb" | "hsl" | "lab" | "lch" | "oklab" | "oklch";
      method: "euclidean" | "deltaE76" | "deltaE94" | "deltaE2000" | "deltaEOK";
    };
```

The signature becomes:

```ts
distance(a, b, options?: DistanceOptions)
```

Default behavior (no options) remains RGB Euclidean (`"fast"` preset), preserving backward compatibility. Presets map to specific space+method combinations (e.g. `"perceptual"` → Lab deltaE94, `"accurate"` → Lab deltaE2000, `"modern"` → OKLab deltaEOK).

## Tasks

- [x] Add `DistancePreset` and `DistanceOptions` types
- [x] Implement color space conversion functions needed (RGB→Lab, RGB→OKLab, RGB→LCH, RGB→OKLCH)
- [x] Implement distance methods: euclidean, deltaE76, deltaE94, deltaE2000, deltaEOK
- [x] Define preset mappings (fast→rgb/euclidean, perceptual→lab/deltaE94, accurate→lab/deltaE2000, modern→oklab/deltaEOK)
- [x] Refactor `distance()` to accept optional third argument `options?: DistanceOptions`
- [x] Validate space+method combinations and throw clear errors for invalid ones
- [x] Update tests to cover: default (no options), each preset, explicit space+method, and invalid options
- [x] Ensure all existing distance tests and cross-language vectors still pass
- [x] Export `DistancePreset` and `DistanceOptions` types from index.ts

## Acceptance Criteria

- `distance(a, b)` without options produces identical results to the current implementation
- `distance(a, b, { preset: "fast" })` produces the same result as the default
- Each preset (`"fast"`, `"perceptual"`, `"accurate"`, `"modern"`) works and produces distinct results
- Explicit `{ space, method }` form works for all valid combinations
- Passing an unsupported space/method combination throws a descriptive error
- `DistancePreset` and `DistanceOptions` types are exported from the public API
- All existing tests and cross-language test vectors pass unchanged
