---
title: "Add null/undefined guard to resolve() for JS consumers"
id: "01knfs180"
status: pending
priority: medium
type: bug
tags: ["api", "parse", "validation"]
created: "2026-04-05"
---

# Add null/undefined guard to resolve() for JS consumers

## Steps to Reproduce

1. Call `resolve(null)` or `resolve(undefined)` from plain JavaScript (no TypeScript type checking)

## Expected Behavior

`resolve()` throws an `InvalidColorValueError` with a clear message indicating that `null`/`undefined` is not a valid color value.

## Actual Behavior

A generic `TypeError` is thrown (e.g., "Cannot read properties of null"), which gives no indication of what went wrong or how to fix it.

**Relevant file:** `ts/src/parse.ts:135-171`

## Tasks

- [ ] Add an explicit `value == null` guard at the top of `resolve()` that throws `InvalidColorValueError`
- [ ] Add tests for `resolve(null)` and `resolve(undefined)` verifying the correct error type and message
- [ ] Check other public entry points in parse.ts for the same issue and add guards if needed

## Acceptance Criteria

- `resolve(null)` and `resolve(undefined)` throw `InvalidColorValueError` (not a generic `TypeError`)
- Error message clearly states that null/undefined is not a valid color value
- Existing behavior for valid and other invalid inputs is unchanged
- Tests cover both `null` and `undefined` cases
- `make check` passes
