---
title: "Rename SolidKleur for consistent type naming with gradient types"
id: "01knfs7nh"
status: completed
priority: low
type: chore
tags: ["api", "types", "naming"]
created: "2026-04-05"
---

# Rename SolidKleur for consistent type naming with gradient types

## Description

The `SolidKleur` type name mixes library branding ("Kleur") with English descriptors, while other gradient types use plain English naming (`LinearGradient`, `RadialGradient`). This inconsistency makes the API less predictable. Rename `SolidKleur` to `SolidColor` (or rename all gradient types to `*Kleur`) for a uniform naming convention.

**Relevant file:** `ts/src/types.ts:42-45`

## Tasks

- [x] Decide naming direction: rename `SolidKleur` → `SolidColor` (preferred, aligns with existing gradient naming) or rename gradients to `*Kleur`
- [x] Rename the type across the codebase (type definition, all usages, re-exports)
- [x] Add a deprecated type alias for `SolidKleur` pointing to the new name (if a breaking-change grace period is desired) — skipped, no published version yet
- [x] Update tests referencing the old name — no tests referenced the type name
- [x] Update docs (`apps/docs`) with the new name
- [x] Run `make check` to verify nothing is broken
