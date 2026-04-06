---
title: "Python: types, enums, and error hierarchy"
id: "01knhk6e5"
status: pending
priority: critical
type: feature
effort: small
tags: ["python", "types"]
depends-on: ["01knhk57a"]
created: "2026-04-06"
context: ["docs/specs/python-library.md", "ts/src/types.ts", "ts/src/errors.ts"]
---

# Python: types, enums, and error hierarchy

## Objective

Define the foundational type system for the Python library: TypedDicts for color data containers, str Enums for blend modes / distance options / sort channels, union type aliases, and the full exception hierarchy. Everything else in the library depends on these definitions.

## Tasks

- [ ] Create `py/kleur/types.py` with TypedDict definitions: `Rgb`, `Rgba`, `Hsl`, `Hsla`, `Hsb`, `Hsba`
- [ ] Add str Enums: `BlendMode`, `DistancePreset`, `DistanceSpace`, `DistanceMethod`, `SortChannel`, `SortDirection`
- [ ] Add type aliases: `KleurValue`, `BlendFn`, `BlendModeInput`, `EaseFn`
- [ ] Create `py/kleur/errors.py` with `KleurError` base and all subclasses: `ParseError`, `UnknownOptionError`, `InvalidChannelError`, `InvalidCountError`, `InvalidOffsetError`, `InvalidDistanceCombinationError`
- [ ] Ensure all error classes carry structured attributes (kind, value, valid_options, etc.) matching the TS implementation
- [ ] Add tests for error construction and message formatting

## Acceptance Criteria

- All TypedDicts, Enums, and type aliases importable from `kleur.types`
- All error classes importable from `kleur.errors`
- Each error class has correct structured attributes and readable messages
- `mypy --strict` passes on all type definitions
- Tests cover error instantiation and attribute access
