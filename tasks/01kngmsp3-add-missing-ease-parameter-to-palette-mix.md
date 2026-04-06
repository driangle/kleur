---
title: "Add missing ease parameter to Palette.mix()"
id: "01kngmsp3"
status: pending
priority: high
type: bug
tags: ["api-consistency"]
created: "2026-04-06"
---

# Add missing ease parameter to Palette.mix()

## Steps to Reproduce

1. Create a `Palette` and call `.mix(target, 0.5, easeInOut)` with an easing function
2. TypeScript rejects the call — `Palette.mix()` only accepts `(target, t)`

## Expected Behavior

`Palette.mix()` should accept an optional `ease` parameter, matching `Color.mix(target, t, ease?)` at `color.ts:282`. The easing function should be forwarded to each underlying `Color.mix()` call.

## Actual Behavior

`Palette.mix(target, t)` at `palette.ts:94` silently drops easing support. Users who need eased interpolation on a palette must manually iterate and call `Color.mix()` on each color.

## Tasks

- [ ] Add `ease?: (t: number) => number` parameter to `Palette.mix()` (`ts/src/palette.ts:94`)
- [ ] Forward the ease parameter to `c.mix(target, t, ease)` in the map callback
- [ ] Add tests for `Palette.mix()` with an easing function
- [ ] Update docs (`apps/docs`) if `Palette.mix()` is documented
- [ ] Run `make check` to verify lint, tests, and build pass

## Acceptance Criteria

- `Palette.mix(target, t, ease?)` signature matches `Color.mix(target, t, ease?)`
- Easing function is applied per-color when provided
- Existing `Palette.mix()` calls without ease continue to work unchanged
- All tests pass
