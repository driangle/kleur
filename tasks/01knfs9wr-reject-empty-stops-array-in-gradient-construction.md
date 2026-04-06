---
title: "Reject empty stops array in gradient construction"
id: "01knfs9wr"
status: completed
priority: medium
type: bug
tags: ["gradient", "validation"]
created: "2026-04-05"
---

# Reject empty stops array in gradient construction

## Steps to Reproduce

1. Create a gradient with an empty stops array, e.g., `gradient({ stops: [] })`

## Expected Behavior

An error is thrown indicating that a gradient requires at least one (or two) color stops.

## Actual Behavior

The empty stops array is silently accepted, producing an invalid gradient.

**Relevant file:** `ts/src/gradient.ts:30-73`

## Tasks

- [x] Add validation that the stops array has a minimum required length (at least 1, or arguably 2 for a meaningful gradient)
- [x] Throw the appropriate custom error with a descriptive message
- [x] Add tests for empty stops array
- [x] Add tests for single-stop array (decide if this is valid or requires at least 2)
- [x] Verify valid gradient construction is unaffected

## Acceptance Criteria

- `gradient({ stops: [] })` throws a descriptive custom error
- Valid gradients with sufficient stops continue to work
- `make check` passes
