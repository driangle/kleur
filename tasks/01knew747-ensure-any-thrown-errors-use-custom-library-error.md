---
title: "Ensure any thrown errors use custom library error types"
id: "01knew747"
status: pending
priority: low
type: chore
tags: []
created: "2026-04-05"
---

# Ensure any thrown errors use custom library error types

## Objective

Audit the library for any direct `throw new Error(...)` usage or other non-library error throws and replace them with custom error classes declared by this package. This keeps the public error surface consistent, makes failures easier to handle programmatically, and ensures callers can reliably identify library-specific failures.

## Tasks

- [ ] Inventory every location in the library that throws an error
- [ ] Identify the custom error classes that already exist and the gaps in current coverage
- [ ] Add any missing custom error types needed to represent current failure modes clearly
- [ ] Replace generic thrown errors with the appropriate declared custom error class
- [ ] Ensure each custom error includes a stable name/message and any useful contextual fields supported by the library's design
- [ ] Add a one-line instruction to `CLAUDE.md` requiring library-thrown errors to use custom error classes declared in this package
- [ ] Add a matching one-line instruction to `AGENTS.md` requiring library-thrown errors to use custom error classes declared in this package
- [ ] Update exports so any new custom error types are part of the public API if callers need to narrow on them
- [ ] Add or update tests covering each affected error path and asserting the thrown error type
- [ ] Run the full project verification to confirm lint, tests, and build still pass

## Acceptance Criteria

- No library code throws a bare `Error` or other ad hoc error type for library-defined failures
- Every intentional thrown error uses a custom error class declared in this repository
- `CLAUDE.md` and `AGENTS.md` each include a clear one-line instruction reinforcing that library-thrown errors must use declared custom error classes
- Error-producing tests assert the specific custom error type for affected public APIs
- Any newly introduced custom errors are documented through clear naming and exported consistently with the rest of the public API
- `make check` passes after the change
