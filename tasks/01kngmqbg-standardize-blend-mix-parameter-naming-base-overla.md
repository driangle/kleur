---
title: "Standardize blend/mix parameter naming (base/overlay vs a/b)"
id: "01kngmqbg"
status: pending
priority: medium
type: chore
tags: ["api-consistency"]
created: "2026-04-06"
---

# Standardize blend/mix parameter naming (base/overlay vs a/b)

## Description

The two color-combining functions in `blend.ts` use inconsistent parameter naming:

- `blend(base, overlay, mode)` at `blend.ts:101` — uses `base`/`overlay` (semantically meaningful for blend operations)
- `mix(a, b, t, ease?)` at `blend.ts:119` — uses generic `a`/`b`

Since `mix` is symmetric interpolation (order doesn't imply layering), `a`/`b` is acceptable. But `blend` has directional semantics (base layer vs overlay layer), so `base`/`overlay` is the better convention there.

**Suggestion:** Rename `mix` parameters from `a`/`b` to `base`/`overlay` for consistency, since `t=0` returns the first argument and `t=1` returns the second — the first is the "base" and the second is the "target" being mixed toward. Alternatively, use `from`/`to` for `mix` if `base`/`overlay` feels too blend-specific.

## Tasks

- [ ] Decide on naming: `base`/`overlay` for both, or `base`/`overlay` for blend + `from`/`to` for mix
- [ ] Rename `mix()` parameters from `a`/`b` to the chosen names (`ts/src/blend.ts:119`)
- [ ] Update JSDoc comment for `mix()` which references `a` and `b` (`blend.ts:116`)
- [ ] Update any tests referencing the old parameter names
- [ ] Update docs (`apps/docs`) if parameter names are documented
- [ ] Run `make check` to verify lint, tests, and build pass
