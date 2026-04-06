---
title: "Avoid re-resolving already-resolved gradient stops"
id: "01kngmqf9"
status: pending
priority: medium
type: feature
tags: ["performance", "api-consistency"]
created: "2026-04-06"
---

# Avoid re-resolving already-resolved gradient stops

## Objective

The `linearGradient()` and `radialGradient()` factory functions in `gradient.ts:55,82` accept `GradientStop[]` where `color` is already typed as `Color` (a resolved type). However, they pass each stop through `colorStop()` which calls `resolve()` again — redundantly re-resolving already-resolved `Color` instances.

The input type should accept `KleurValue` (unresolved) for the color field, and resolution should happen exactly once inside the factory. This both clarifies the API contract (callers can pass raw strings, hex values, etc.) and avoids redundant work.

## Tasks

- [ ] Define a `GradientStopInput` type: `{ offset: number; color: KleurValue }` in `types.ts`
- [ ] Update `linearGradient()` to accept `GradientStopInput[]` as its `stops` parameter (`gradient.ts:40`)
- [ ] Update `radialGradient()` to accept `GradientStopInput[]` as its `stops` parameter (`gradient.ts:63`)
- [ ] Ensure `colorStop()` resolves `KleurValue` to `Color` exactly once (already does this)
- [ ] Update `validateStops()` to accept `readonly GradientStopInput[]` if needed
- [ ] Update the `GradientBuilderStop` type in `gradient-builder.ts` if it feeds into these factories
- [ ] Update docs (`apps/docs`) to reflect the new input type
- [ ] Run `make check` to verify lint, tests, and build pass

## Acceptance Criteria

- `linearGradient()` and `radialGradient()` accept `{ offset: number; color: KleurValue }[]` as stops
- Color resolution happens exactly once per stop inside the factory
- Callers can pass raw color values (strings, hex, etc.) directly without pre-resolving
- All existing tests pass
- TypeScript compilation succeeds with no type errors
