---
title: "Add Palette.unique(threshold?) method for perceptual deduplication"
id: "01kngqq66"
status: completed
priority: medium
type: feature
tags: ["palette", "api-enhancement"]
created: "2026-04-06"
---

# Add Palette.unique(threshold?) method for perceptual deduplication

## Objective

Add a `unique(threshold?)` method to `Palette` that removes perceptually near-duplicate colors using the existing `distance()` function. After operations like `flatMap` or `concat`, palettes often contain colors that are visually indistinguishable. This method returns a new Palette with duplicates removed, keeping the first occurrence of each group of similar colors.

## Tasks

- [ ] Add `unique(threshold?)` method to `Palette` class in `ts/src/palette.ts`
- [ ] Use the existing `distance()` function to compare colors perceptually
- [ ] Choose a sensible default threshold (e.g. based on JND — just-noticeable difference)
- [ ] Preserve ordering: keep the first color encountered in each cluster of near-duplicates
- [ ] Add tests covering: exact duplicates, near-duplicates within threshold, distinct colors preserved, empty palette, custom threshold values
- [ ] Update docs (`apps/docs/api/palette.md`)
- [ ] Run `make check` to verify lint, tests, and build pass

## Acceptance Criteria

- `palette.unique()` returns a new Palette with perceptually near-duplicate colors removed
- An optional `threshold` parameter controls the minimum perceptual distance between retained colors
- Color ordering is preserved (first occurrence kept)
- Uses the existing `distance()` utility for perceptual comparison
- All tests pass
