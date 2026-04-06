---
title: "Reject non-% unit suffixes in parseNumericToken()"
id: "01knfs891"
status: completed
priority: medium
type: bug
tags: ["parse", "validation", "css"]
created: "2026-04-05"
---

# Reject non-% unit suffixes in parseNumericToken()

## Steps to Reproduce

1. Parse a CSS color string with unit suffixes, e.g., `rgb(100px, 100px, 100px)`
2. `parseNumericToken()` calls `parseFloat("100px")` which returns `100`

## Expected Behavior

`parseNumericToken()` rejects tokens with invalid unit suffixes (e.g., `px`, `em`, `rem`) and throws an appropriate error. Only bare numbers and `%` suffixes should be accepted.

## Actual Behavior

`parseFloat("100px")` silently returns `100`, so invalid CSS color tokens like `rgb(100px, 100px, 100px)` are accepted without error.

**Relevant file:** `ts/src/css-function.ts:30-32`

## Tasks

- [x] Replace `parseFloat` with a strict numeric/percentage pattern match (e.g., regex `/^-?\d+(\.\d+)?(%)?$/`)
- [x] Throw an appropriate custom error for tokens with invalid suffixes
- [x] Add tests for tokens with unit suffixes (`px`, `em`, `rem`, `deg`, etc.)
- [x] Add tests for valid tokens (bare numbers, percentages)
- [x] Verify existing CSS color parsing still works for valid inputs

## Acceptance Criteria

- `parseNumericToken("100px")`, `parseNumericToken("50em")`, and similar unit-suffixed tokens are rejected with a descriptive error
- Bare numbers (`"100"`, `"3.14"`, `"-1"`) and percentages (`"50%"`) continue to work
- Invalid CSS color strings like `rgb(100px, 100px, 100px)` no longer parse successfully
- `make check` passes
