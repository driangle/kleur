---
title: "Guard against NaN propagation in Color constructor"
id: "01kngmtnb"
status: pending
priority: high
type: bug
tags: ["robustness"]
created: "2026-04-06"
---

# Guard against NaN propagation in Color constructor

## Steps to Reproduce

1. Call `new Color(NaN, 100, 100)` or any entry point that passes NaN (e.g. `rgb(NaN, 0, 0)`, `hsl(NaN, 50, 50)`)
2. Call `.toHex()` on the resulting color

## Expected Behavior

The constructor should throw an error (using the library's error types) when any channel value is `NaN`, `Infinity`, or `-Infinity`.

## Actual Behavior

`clampByte(NaN)` at `color.ts:24` returns `NaN` because `Math.max(0, NaN)` is `NaN`. The NaN silently propagates through the Color instance, producing `"#NaNNaNNaN"` from `.toHex()` and corrupting downstream operations.

## Tasks

- [ ] Add `Number.isFinite(v)` check to `clampByte()` (`color.ts:24`) — throw or default to 0
- [ ] Add `Number.isFinite(v)` check to `clampAlpha()` (`color.ts:26`)
- [ ] Use an appropriate error type from `errors.ts` for the thrown error
- [ ] Add tests for NaN, Infinity, and -Infinity inputs to the Color constructor
- [ ] Add tests for NaN propagation through entry points (`rgb()`, `hsl()`, `grayscale()`)
- [ ] Run `make check` to verify lint, tests, and build pass

## Acceptance Criteria

- `new Color(NaN, 0, 0)` throws a descriptive error
- `new Color(0, 0, 0, NaN)` throws a descriptive error
- `Infinity` and `-Infinity` are also rejected
- All existing tests pass
