---
title: "Validate int() input: reject negative numbers and floats"
id: "01knfs201"
status: pending
priority: medium
type: bug
tags: ["api", "parse", "validation"]
created: "2026-04-05"
---

# Validate int() input: reject negative numbers and floats

## Steps to Reproduce

1. Call `int(-1)` — uses `>>> 0` which wraps to `4294967295`
2. Call `int(3.7)` — silently truncates the fractional part

## Expected Behavior

Both calls should throw an appropriate error indicating the input is not a valid integer color value (not a non-negative integer in the range `0x000000`–`0xFFFFFF`).

## Actual Behavior

`int(-1)` silently wraps to `4294967295` (out of valid color range). `int(3.7)` silently truncates to `3`. Neither produces an error.

**Relevant file:** `ts/src/parse.ts:62-68`

## Tasks

- [ ] Add validation at the top of `int()`: `Number.isInteger(n) && n >= 0 && n <= 0xFFFFFF`
- [ ] Throw the appropriate custom error class for invalid inputs
- [ ] Add tests for negative numbers (e.g., `int(-1)`)
- [ ] Add tests for floats (e.g., `int(3.7)`)
- [ ] Add tests for values exceeding `0xFFFFFF` (e.g., `int(0x1000000)`)
- [ ] Verify `NaN` and `Infinity` are also rejected
- [ ] Ensure valid integer inputs (`0`, `0xFF0000`, `0xFFFFFF`) continue to work

## Acceptance Criteria

- `int(-1)`, `int(3.7)`, `int(0x1000000)`, `int(NaN)`, `int(Infinity)` all throw a descriptive custom error
- Valid inputs in range `0`–`0xFFFFFF` that are integers continue to work correctly
- `make check` passes
