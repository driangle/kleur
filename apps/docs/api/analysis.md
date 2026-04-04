# Analysis

Functions for measuring color properties and accessibility metrics.

```ts
import { kleur } from "@driangle/kleur";
// kleur.luminance(...), kleur.contrast(...), etc.
// or import individual functions:
import { luminance, isLight, isDark, contrast } from "@driangle/kleur";
```

## luminance

```ts
luminance(color: Color): number
```

Compute the WCAG 2.1 relative luminance of a color. Returns a value between 0 (black) and 1 (white).

```ts
luminance(white); // 1
luminance(black); // 0
```

## isLight

```ts
isLight(color: Color): boolean
```

Returns `true` if the color's HSL lightness is greater than 50.

```ts
isLight(kleur("#ffffff")); // true
isLight(kleur("#333333")); // false
```

## isDark

```ts
isDark(color: Color): boolean
```

Returns `true` if the color's HSL lightness is 50 or less.

```ts
isDark(kleur("#1a1a2e")); // true
isDark(kleur("#f0f0f0")); // false
```

## contrast

```ts
contrast(a: Color, b: Color): number
```

Compute the WCAG contrast ratio between two colors. Returns a value between 1 (identical) and 21 (black vs white).

Use this to check accessibility compliance:

| Level | Minimum Ratio | Use Case |
|-------|--------------|----------|
| AA Large | 3:1 | Large text (18pt+ or 14pt bold) |
| AA | 4.5:1 | Normal text |
| AAA | 7:1 | Enhanced contrast |

```ts
const bg = kleur("#1a1a2e");
const fg = kleur("#ffffff");

const ratio = contrast(bg, fg); // ~15.3
ratio >= 4.5; // true — passes WCAG AA
ratio >= 7;   // true — passes WCAG AAA
```

## distance

See [Distance](/api/distance) for the full `distance()` reference.
