---
title: "Add optional RNG function to random() for deterministic seeding"
id: "01knfsad1"
status: completed
priority: medium
type: feature
tags: ["api", "random", "testing"]
created: "2026-04-05"
---

# Add optional RNG function to random() for deterministic seeding

## Objective

`random()` currently uses `Math.random()` directly, making results non-deterministic and untestable without mocking globals. Accept an optional `rng` function in `RandomOptions` so consumers can inject a seeded PRNG for reproducible results in tests and generative art use cases.

**Relevant file:** `ts/src/random.ts:15-16`

## Tasks

- [x] Add an optional `rng?: () => number` property to `RandomOptions` (returns 0–1, same contract as `Math.random`)
- [x] Update `randInRange()` (or wherever `Math.random()` is called) to use the provided `rng` if present, falling back to `Math.random()`
- [x] Add tests using a deterministic RNG to verify reproducible output
- [x] Verify default behavior (no `rng` provided) is unchanged
- [x] Update docs (`apps/docs`) with seeded RNG usage example

## Acceptance Criteria

- `random({ rng: mySeededRng })` produces deterministic, reproducible colors
- Omitting `rng` falls back to `Math.random()` (no breaking change)
- Tests demonstrate reproducibility with a fixed-seed RNG
- `make check` passes
