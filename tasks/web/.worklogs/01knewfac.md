## 2026-04-05T13:16:19Z

Started the docs interactivity audit and implementation for task `01knewfac`.

**Approach:** Reuse the existing VitePress theme component pattern for live examples, but tighten it so demos map directly to the documented API surface instead of creating a separate playground language.

**Findings:**

- The docs are almost entirely static today.
- There is one existing interactive component in the theme that proves out the pattern.
- The highest-value interactive candidates are creation/parsing, adjustments, harmonies, blending, and accessibility contrast because they benefit from immediate visual feedback.
- Reference-heavy pages like type definitions and namespace listings should stay static.

**Next:** Build a small set of reusable interactive demo components, wire them into the relevant docs pages, and add lightweight docs-side coverage for the demo logic.

## 2026-04-05T13:22:00Z

Completed the docs interactivity pass for task `01knewfac`.

**Completed:**

- [x] Added a shared `DocsDemo` wrapper and focused interactive components for creation, adjustments, palettes, contrast, blending, and distance.
- [x] Wired the demos into `Getting Started` and the API pages where live visual or numeric feedback materially improves comprehension.
- [x] Added a docs-side verification script that checks the expected demo coverage and basic library-alignment assumptions.
- [x] Confirmed the demos stay responsive by using stacked layouts on narrow viewports and shared compact controls.

**Decisions:**

- Kept reference-oriented pages such as namespace listings, named colors, type definitions, and gradient/type-guard docs static because those sections are primarily about API shape rather than behavior that benefits from live manipulation.
- Used a built-in Node verification script instead of introducing a new docs test dependency so the docs app gains coverage without changing its toolchain footprint.

**Verification:**

- `cd apps/docs && npm test`
- `cd apps/docs && npm run build`
- `make check`
