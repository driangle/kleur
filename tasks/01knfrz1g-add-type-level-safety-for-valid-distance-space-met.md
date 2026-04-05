---
title: "Add type-level safety for valid distance space+method combinations"
id: "01knfrz1g"
status: completed
priority: medium
type: feature
tags: ["api", "types", "distance"]
created: "2026-04-05"
---

# Add type-level safety for valid distance space+method combinations

## Objective

The distance API currently accepts a `{ space, method }` options object where `space` and `method` are independently typed. This allows invalid combinations like `{ space: "hsl", method: "deltaE94" }` to compile successfully but throw at runtime. Use TypeScript conditional types or function overloads to restrict the options so that only valid space+method pairings are accepted at compile time.

**Relevant files:** `ts/src/types.ts:86-92`, `ts/src/distance.ts:76-82`

## Tasks

- [x] Audit existing distance methods and catalog which methods are valid for which color spaces
- [x] Define a type-level mapping of valid `(space, method)` combinations (e.g., using conditional types or a discriminated union)
- [x] Update the `DistanceOptions` type (or equivalent) to enforce valid combinations
- [x] Update `distance()` function signature with overloads or constrained generics as needed
- [x] Ensure invalid combinations produce clear compile-time errors (not just `never`)
- [x] Verify that valid combinations continue to work without requiring explicit type annotations at call sites
- [x] Add type-level tests (e.g., `@ts-expect-error` assertions) for invalid combinations
- [x] Update docs (`apps/docs`) if the distance API usage examples need adjustment

## Acceptance Criteria

- `{ space: "hsl", method: "deltaE94" }` and other invalid combinations produce a TypeScript compile error
- All valid space+method combinations compile and work correctly without extra type annotations
- Type errors for invalid combinations are reasonably descriptive (not opaque `never` assignments)
- No runtime behavior changes for valid inputs
- Type-level tests verify both valid and invalid combinations
- `make check` passes
