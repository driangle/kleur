---
title: "Unify harmony method return types between Color and kleur module"
id: "01kngmm78"
status: pending
priority: medium
type: feature
tags: ["api-consistency"]
created: "2026-04-06"
---

# Unify harmony method return types between Color and kleur module

## Objective

Unify the return types of harmony methods so that `Color` instance methods (e.g. `triadic()`, `tetradic()`, `analogous()`, `splitComplement()`) and the corresponding `kleur` module functions (e.g. `kleur.triadic(color)`) return the same type. Currently:

- `color.triadic()` returns `[Color, Color, Color]` (typed tuple) — `ts/src/color.ts:299`
- `kleur.triadic(color)` returns `Palette` (wraps the tuple via `harmony.ts:8-9`)

This inconsistency forces users to handle different types for semantically identical operations depending on call site.

**Chosen approach:** Make `Color` harmony methods return `Palette` directly, since `Palette` already provides bulk transformations (`lighten`, `darken`, `saturate`, etc.) and is iterable/indexable. The `harmony.ts` wrapper functions can then simply delegate without re-wrapping.

## Tasks

- [ ] Update `Color.triadic()` to return `Palette` instead of `[Color, Color, Color]`
- [ ] Update `Color.tetradic()` to return `Palette` instead of `[Color, Color, Color, Color]`
- [ ] Update `Color.analogous()` to return `Palette` instead of `[Color, Color, Color]`
- [ ] Update `Color.splitComplement()` to return `Palette` instead of `[Color, Color, Color]`
- [ ] Update `Color.tints()` to return `Palette` instead of `Color[]`
- [ ] Update `Color.shades()` to return `Palette` instead of `Color[]`
- [ ] Update `Color.tones()` to return `Palette` instead of `Color[]`
- [ ] Simplify `harmony.ts` wrapper functions to avoid double-wrapping (they currently call `new Palette(resolve(color).triadic())`)
- [ ] Update tests to reflect the new return types
- [ ] Update docs (`apps/docs/api/color.md`) to reflect `Palette` return types
- [ ] Run `make check` to verify lint, tests, and build pass

## Acceptance Criteria

- All `Color` harmony methods (`triadic`, `tetradic`, `analogous`, `splitComplement`, `tints`, `shades`, `tones`) return `Palette`
- `kleur.triadic(color)` and `color.triadic()` return the same type (`Palette`)
- Destructuring still works (e.g. `const [a, b, c] = color.triadic()`) via `Palette`'s iterable interface
- All existing tests pass (updated as needed)
- Docs reflect the unified return type
