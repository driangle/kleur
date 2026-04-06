---
title: "Validate or document custom RNG contract in random()"
id: "01kngmtw2"
status: pending
priority: medium
type: chore
tags: ["robustness"]
created: "2026-04-06"
---

# Validate or document custom RNG contract in random()

## Description

The `random()` function at `random.ts:46` accepts an optional `rng` function via `options.rng`. This function is expected to return values in `[0, 1)` (matching `Math.random()`'s contract), but this is neither documented nor validated.

If `rng()` returns values outside `[0, 1)`, `randInRange()` produces out-of-range HSL values that get silently clamped by the Color constructor, producing biased or unexpected colors with no indication of misuse.

## Tasks

- [ ] Add JSDoc to the `rng` field in `RandomOptions` type documenting the `[0, 1)` contract
- [ ] Add JSDoc to `random()` mentioning the RNG requirement
- [ ] Update docs (`apps/docs`) if `random()` options are documented
- [ ] Run `make check` to verify lint, tests, and build pass
