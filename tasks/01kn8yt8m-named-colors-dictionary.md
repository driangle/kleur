---
id: "01kn8yt8m"
title: "Named colors dictionary"
status: completed
priority: high
effort: small
type: feature
phase: "extras"
dependencies: ["01kn8yt6f"]
tags: [data, phase:3-extras]
created: 2026-04-03
context: ["docs/specs/mvp.md"]
---

# Named colors dictionary

## Objective

Add the complete CSS Color Level 4 named colors dictionary (148 colors) and expose common colors as direct constants. Covers spec section 9.

## Tasks

- [x] Create a named colors map: lowercase name -> hex value for all 148 CSS named colors
- [x] Implement `getNamedColor(name)` — case-insensitive lookup returning KleurStruct or undefined
- [x] Export direct constants: white, black, red, green, blue, yellow, cyan, magenta, orange, purple, pink, lime, transparent
- [x] Ensure `transparent` has alpha = 0
- [x] Write tests for lookup (case-insensitive), constants, and unknown names

## Acceptance Criteria

- Dictionary contains all 148 CSS Color Level 4 named colors
- Lookup is case-insensitive ("Red", "RED", "red" all work)
- All 13 required constants are exported and match their CSS definitions
- `transparent` returns rgba(0,0,0,0)
- Unknown names return undefined (not an error)
