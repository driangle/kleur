---
title: "Add Prettier to the TypeScript project"
id: "01knfav7a"
status: completed
priority: medium
type: chore
tags: ["formatting", "dx"]
created: "2026-04-05"
---

# Add Prettier to the TypeScript project

## Objective

Add Prettier as the code formatter for the TypeScript project to ensure consistent code style across the codebase. If formatting causes too many files to exceed the ESLint `max-lines` rule, increase the limit to 300 in the lint config.

## Tasks

- [x] Install Prettier as a dev dependency
- [x] Create a `.prettierrc` config file with project-appropriate settings
- [x] Add `eslint-config-prettier` to disable ESLint rules that conflict with Prettier
- [x] Add a `format` script to `package.json`
- [x] Run Prettier on the entire codebase
- [x] Check how many files fail the ESLint `max-lines` rule after formatting
- [x] If too many files fail `max-lines`, increase the limit to 300 in the ESLint config
- [x] Ensure `make check` passes after all changes

## Acceptance Criteria

- Prettier is installed and configured with a `.prettierrc` file
- A `format` script is available in `package.json`
- ESLint and Prettier do not conflict (via `eslint-config-prettier`)
- All source files are formatted with Prettier
- `make check` passes (lint, tests, build)
- If formatting pushed files over the `max-lines` limit, the limit is raised to 300
