---
title: "Document or validate lighten/darken/saturate/desaturate amount range"
id: "01kngmtv3"
status: completed
priority: medium
type: chore
tags: ["robustness"]
created: "2026-04-06"
---

# Document or validate lighten/darken/saturate/desaturate amount range

## Description

The adjustment methods `lighten()`, `darken()`, `saturate()`, and `desaturate()` at `color.ts:240-254` accept an `amount` parameter with no documented range or validation:

- `lighten(amount)` — `l + (100 - l) * amount` — amount is a proportion of remaining lightness headroom
- `darken(amount)` — `l - l * amount` — amount is a proportion of current lightness
- `saturate(amount)` — `s + (100 - s) * amount` — proportion of remaining saturation headroom
- `desaturate(amount)` — `s - s * amount` — proportion of current saturation

Negative values reverse the effect (e.g. `lighten(-0.5)` darkens), and values > 1 overshoot. This is silently clamped by downstream HSL-to-RGB conversion, hiding misuse.

The expected range is `[0, 1]` where 0 = no change and 1 = maximum effect. This should be documented via JSDoc. Validation is optional — clamping with a warning or throwing may be too strict for creative use cases.

## Tasks

- [ ] Add JSDoc to `lighten()`, `darken()`, `saturate()`, `desaturate()` documenting that `amount` is a `[0, 1]` proportion
- [ ] Document what happens with out-of-range values (negative reverses, >1 overshoots, clamped by HSL conversion)
- [ ] Update docs (`apps/docs/api/color.md`) with the parameter semantics
- [ ] Run `make check` to verify lint, tests, and build pass
