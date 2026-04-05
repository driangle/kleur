---
title: "Validate inverted ranges in random() options"
id: "01knfs8yg"
status: pending
priority: medium
type: bug
tags: ["random", "validation"]
created: "2026-04-05"
---

# Validate inverted ranges in random() options

## Steps to Reproduce

1. Call `random({ saturation: [100, 0] })` where min > max (inverted range)

## Expected Behavior

Either swap the values so the range is valid, or throw an error indicating min must be <= max.

## Actual Behavior

`randInRange(100, 0)` produces negative values, generating invalid colors silently.

**Relevant file:** `ts/src/random.ts:15-16`

## Tasks

- [ ] Add validation in `random()` (or `randInRange()`) to detect inverted ranges where min > max
- [ ] Decide behavior: auto-swap the values or throw an error (auto-swap is more ergonomic)
- [ ] Add tests for inverted ranges on each option (`hue`, `saturation`, `lightness`, etc.)
- [ ] Verify normal ranges continue to work

## Acceptance Criteria

- `random({ saturation: [100, 0] })` either auto-corrects the range or throws a descriptive error
- No negative or out-of-bound values are produced from inverted ranges
- Valid ranges continue to work correctly
- `make check` passes
