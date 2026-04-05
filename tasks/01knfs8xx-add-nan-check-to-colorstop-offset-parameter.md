---
title: "Add NaN check to colorStop() offset parameter"
id: "01knfs8xx"
status: pending
priority: medium
type: bug
tags: ["gradient", "validation"]
created: "2026-04-05"
---

# Add NaN check to colorStop() offset parameter

## Steps to Reproduce

1. Create a gradient with a color stop that has `NaN` as the offset, e.g., `colorStop(color, NaN)`

## Expected Behavior

`colorStop()` throws an error indicating the offset must be a finite number.

## Actual Behavior

`Math.min(1, Math.max(0, NaN))` returns `NaN`, which silently corrupts the gradient. No error is thrown.

**Relevant file:** `ts/src/gradient.ts:11-17`

## Tasks

- [ ] Add a `Number.isFinite()` check for the offset parameter in `colorStop()`
- [ ] Throw the appropriate custom error for non-finite offsets (`NaN`, `Infinity`, `-Infinity`)
- [ ] Add tests for `NaN`, `Infinity`, and `-Infinity` offsets
- [ ] Verify valid offsets (0, 0.5, 1) continue to work

## Acceptance Criteria

- `colorStop(color, NaN)` throws a descriptive custom error
- `colorStop(color, Infinity)` and `colorStop(color, -Infinity)` are also rejected
- Valid finite offsets continue to work correctly
- `make check` passes
