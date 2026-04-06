---
title: "Support 4-digit and 8-digit hex formats (#rgba, #rrggbbaa)"
id: "01kngmtpb"
status: pending
priority: high
type: feature
tags: ["parsing"]
created: "2026-04-06"
---

# Support 4-digit and 8-digit hex formats (#rgba, #rrggbbaa)

## Objective

CSS Color Level 4 defines 4-digit (`#rgba`) and 8-digit (`#rrggbbaa`) hex color formats with alpha support. The hex parser in `parse.ts:29-43` currently only handles 3-digit and 6-digit formats and throws a `ParseError` with `"invalid-length"` for anything else.

Add support for these formats to improve CSS compatibility.

## Tasks

- [ ] Add 4-digit hex parsing (`#rgba` → expand each digit, parse alpha as `0x{aa} / 255`) in `parse.ts`
- [ ] Add 8-digit hex parsing (`#rrggbbaa` → parse alpha from last two digits) in `parse.ts`
- [ ] Update the `"invalid-length"` error message in `errors.ts:50` to reflect new valid lengths (3, 4, 6, 8)
- [ ] Add tests for 4-digit hex: `#f00f` (red, full alpha), `#f008` (red, ~50% alpha), `#0000` (transparent black)
- [ ] Add tests for 8-digit hex: `#ff000080` (red, ~50% alpha), `#00ff00ff` (green, full alpha)
- [ ] Add tests for edge cases: `#00000000` (fully transparent), uppercase/lowercase
- [ ] Update docs (`apps/docs`) to document the supported hex formats
- [ ] Run `make check` to verify lint, tests, and build pass

## Acceptance Criteria

- `kleur("#f00f")` parses as red with full alpha
- `kleur("#ff000080")` parses as red with ~50% alpha (`alpha ≈ 0.502`)
- 3-digit and 6-digit formats continue to work unchanged
- Invalid lengths (1, 2, 5, 7, 9+) still throw `ParseError`
- All existing tests pass
