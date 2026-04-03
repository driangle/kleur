# Analysis

Functions for measuring color properties and accessibility metrics.

```ts
import { luminance, isLight, isDark, contrast } from "kleur";
// or
import { Kleur } from "kleur";
// Kleur.analyze.luminance(...), Kleur.analyze.contrast(...), etc.
```

## luminance

```ts
luminance(color: KleurStruct): number
```

Compute the WCAG 2.1 relative luminance of a color. Returns a value between 0 (black) and 1 (white).

```ts
luminance(white); // 1
luminance(black); // 0
```

## isLight

```ts
isLight(color: KleurStruct): boolean
```

Returns `true` if the color's HSL lightness is greater than 50.

```ts
isLight(hex("#ffffff")); // true
isLight(hex("#333333")); // false
```

## isDark

```ts
isDark(color: KleurStruct): boolean
```

Returns `true` if the color's HSL lightness is 50 or less.

```ts
isDark(hex("#1a1a2e")); // true
isDark(hex("#f0f0f0")); // false
```

## contrast

```ts
contrast(a: KleurStruct, b: KleurStruct): number
```

Compute the WCAG contrast ratio between two colors. Returns a value between 1 (identical) and 21 (black vs white).

Use this to check accessibility compliance:

| Level | Minimum Ratio | Use Case |
|-------|--------------|----------|
| AA Large | 3:1 | Large text (18pt+ or 14pt bold) |
| AA | 4.5:1 | Normal text |
| AAA | 7:1 | Enhanced contrast |

```ts
const bg = hex("#1a1a2e");
const fg = hex("#ffffff");

const ratio = contrast(bg, fg); // ~15.3
ratio >= 4.5; // true — passes WCAG AA
ratio >= 7;   // true — passes WCAG AAA
```

## distance

See [Distance](/api/distance) for the full `distance()` reference.
