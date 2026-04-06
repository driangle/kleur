---
title: "Truncate long inputs in error messages"
id: "01kngmtx2"
status: pending
priority: medium
type: bug
tags: ["robustness"]
created: "2026-04-06"
---

# Truncate long inputs in error messages

## Steps to Reproduce

1. Call `kleur.hex("a".repeat(10000))` or any parse function with a very long string

## Expected Behavior

Error messages should truncate the input to a reasonable length (~100 chars) with an ellipsis, e.g. `Invalid hex color: "aaaa...aaaa" (must start with #)`.

## Actual Behavior

The full 10,000-character input is interpolated into the error message at `errors.ts:48-51`, producing an enormous error string. This can degrade logging, crash reporters, and terminal output.

## Tasks

- [ ] Add a `truncate(input: string, maxLen?: number)` helper in `errors.ts` (default ~100 chars)
- [ ] Apply truncation to all error message templates that interpolate user input (`errors.ts:48-56`)
- [ ] Add tests for error messages with long inputs
- [ ] Run `make check` to verify lint, tests, and build pass

## Acceptance Criteria

- Error messages for inputs longer than ~100 characters are truncated with `...`
- Short inputs are not affected
- All existing error message tests pass
