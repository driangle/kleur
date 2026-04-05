# Analysis

Functions for measuring color properties and accessibility metrics.

All analysis functions accept flexible color inputs — hex strings, CSS strings, packed numbers, or `Color` instances.

```ts
import kleur from "@driangle/kleur";
// kleur.luminance(...), kleur.contrast(...), etc.
```

<ContrastDemo />

## luminance

```ts
luminance(color: KleurValue): number
```

Compute the WCAG 2.1 relative luminance of a color. Returns a value between 0 (black) and 1 (white).

```ts
kleur.luminance("#ffffff"); // 1
kleur.luminance("#000000"); // 0
kleur.luminance(kleur.white); // 1
```

## isLight

```ts
isLight(color: KleurValue): boolean
```

Returns `true` if the color's HSL lightness is greater than 50.

```ts
kleur.isLight("#ffffff"); // true
kleur.isLight("#333333"); // false
```

## isDark

```ts
isDark(color: KleurValue): boolean
```

Returns `true` if the color's HSL lightness is 50 or less.

```ts
kleur.isDark("#1a1a2e"); // true
kleur.isDark("#f0f0f0"); // false
```

## contrast

```ts
contrast(a: KleurValue, b: KleurValue): number
```

Compute the WCAG contrast ratio between two colors. Returns a value between 1 (identical) and 21 (black vs white).

Use this to check accessibility compliance:

| Level | Minimum Ratio | Use Case |
|-------|--------------|----------|
| AA Large | 3:1 | Large text (18pt+ or 14pt bold) |
| AA | 4.5:1 | Normal text |
| AAA | 7:1 | Enhanced contrast |

```ts
const ratio = kleur.contrast("#1a1a2e", "#ffffff"); // ~15.3
ratio >= 4.5; // true — passes WCAG AA
ratio >= 7;   // true — passes WCAG AAA
```

## distance

See [Distance](/api/distance) for the full `distance()` reference.
