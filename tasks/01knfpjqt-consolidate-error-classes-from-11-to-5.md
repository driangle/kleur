---
title: "Consolidate error classes from 11 to 5"
id: "01knfpjqt"
status: completed
priority: medium
type: chore
tags: ["errors", "refactor"]
created: "2026-04-05"
---

# Consolidate error classes from 11 to 5

## Objective

Reduce the number of error classes in `ts/src/errors.ts` from 11 to 5 by consolidating errors that share the same shape into unified classes with a `kind` discriminator.

### Target structure

```
KleurError (base)
├── ParseError          (replaces InvalidHexColorError, InvalidCssColorError, UnknownColorError, InvalidColorValueError)
├── UnknownOptionError  (replaces UnknownDistancePresetError, UnknownColorSpaceError, UnknownDistanceMethodError, InvalidBlendModeError)
├── InvalidDistanceCombinationError  (keep as-is — unique shape)
├── InvalidCountError                (keep as-is — unique shape)
└── MissingRegistrationError         (keep as-is — unique shape)
```

- `ParseError`: all 4 parsing errors share the concept "could not parse input into a color." Add a `kind` field (`"hex" | "css" | "named" | "value"`) to distinguish. Keep `input` property. For hex errors, keep the `reason` sub-discriminator.
- `UnknownOptionError`: all 4 lookup errors share the same shape — "you passed X, valid options are [Y]." Add a `kind` field (`"distancePreset" | "colorSpace" | "distanceMethod" | "blendMode"`).

## Tasks

- [x] Consolidate the 4 parsing error classes into `ParseError` with a `kind` discriminator
- [x] Consolidate the 4 lookup error classes into `UnknownOptionError` with a `kind` discriminator
- [x] Update all throw sites in `parse.ts`, `distance.ts`, `blend.ts`, `color.ts`
- [x] Update all tests to use the new error classes
- [x] Update `ts/src/index.ts` exports (remove old, add new)
- [x] Update CLAUDE.md error guidance to be generic (e.g. "use the consolidated error classes with appropriate `kind` values") without naming specific error types
- [x] Run `make check` to verify lint, tests, and build pass

## Acceptance Criteria

- `ts/src/errors.ts` defines exactly 5 error classes (KleurError + 4 specific)
- All existing throw sites use the new consolidated classes
- All tests pass and assert on the correct new error types
- Public API exports the new error classes (old names removed)
- CLAUDE.md error guidance is updated to reflect the consolidated pattern without listing specific error type names
