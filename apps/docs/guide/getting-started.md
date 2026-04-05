# Getting Started

## Create a Color

The simplest way to create a color is from a hex string:

```ts
import kleur from "@driangle/kleur";

const coral = kleur("#ff7f50");
```

You can also use the individual factory functions directly:

```ts
import { hex } from "@driangle/kleur";

const coral = hex("#ff7f50");
```

Other creation methods include `rgb()`, `hsl()`, `css()`, `number()`, and `kleur()`. See [Parsing & Creation](/api/create) for the full list.

## Manipulate Colors

All operations are immutable — they return a new color and leave the original unchanged:

```ts
const lighter = coral.lighten(0.3);
const desaturated = coral.desaturate(0.5);
const complement = coral.complement();

// Chain operations
const muted = coral.desaturate(0.4).darken(0.1);
```

## Output Formats

Convert colors to the format you need:

```ts
coral.toHex();        // "#ff7f50"
coral.toCss();        // "rgba(255,127,80,1)"
coral.toRgb();        // { r: 255, g: 127, b: 80 }
coral.toHsl();        // { h: 16, s: 100, l: 66 }
coral.toArray();      // [255, 127, 80, 1]
coral.toNormalized(); // [1, 0.498, 0.314, 1]
```

## Generate Palettes

Create color harmonies from any base color:

```ts
import { triadic, tints, shades } from "@driangle/kleur";

const [base, second, third] = triadic(coral);
const lightVariations = tints(coral, 5);
const darkVariations = shades(coral, 5);
```

## Check Accessibility

Measure contrast and luminance for WCAG compliance:

```ts
import kleur from "@driangle/kleur";

const bg = kleur("#1a1a2e");
const fg = kleur("#ffffff");

const ratio = kleur.contrast(bg, fg); // ~15.3
const readable = ratio >= 4.5;        // WCAG AA: true

kleur.isLight(fg); // true
kleur.isLight(bg); // false
```

## Blend Colors

Mix and blend colors together:

```ts
import kleur from "@driangle/kleur";

const a = kleur("#ff0000");
const b = kleur("#0000ff");

const purple = kleur.mix(a, b, 0.5);           // midpoint blend
const overlay = kleur.blend(a, b, "screen");    // screen blend mode
```

## Next Steps

- [API Reference — Color](/api/color) for all instance methods
- [Parsing & Creation](/api/create) for all ways to create colors
- [Color Harmonies](/api/harmony) for palette generation
- [Analysis](/api/analysis) for accessibility checks
