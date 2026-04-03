# kleur

A comprehensive, cross-language color library with a consistent API.

Kleur provides color creation, conversion, manipulation, and analysis across multiple color spaces. The API is designed to be identical across language implementations so you can switch between ecosystems without relearning.

## Language Support

| Language   | Status      |
|------------|-------------|
| TypeScript | In progress |

## Features

- **Multiple color spaces** - RGB, HSL, Hex, CSS strings, named colors, integer, and normalized (WebGL) formats
- **Immutable API** - All operations return new color instances
- **Color manipulation** - Lighten, darken, saturate, desaturate, rotate hue, invert, warm/cool shift
- **Color harmony** - Complementary, triadic, tetradic, analogous, split-complement, tints, shades, tones
- **Blending** - Multiply, screen, overlay, add, subtract blend modes
- **Analysis** - WCAG luminance, contrast ratio, light/dark detection, color distance
- **Gradients** - Linear and radial gradient support with color stops
- **Interpolation** - Lerp between any two colors

## Quick Example (TypeScript)

```ts
import { Kleur } from "kleur";

// Create colors
const color = Kleur.create.rgb(66, 135, 245);
const fromHex = Kleur.create.hex("#4287f5");
const fromHsl = Kleur.create.hsl(217, 90, 61);

// Manipulate (immutable - returns new instances)
const lighter = color.lighten(0.2);
const warm = color.warm(0.3);
const faded = color.fade(0.5);

// Analyze
const ratio = KleurStruct.contrast(color, Kleur.create.rgb(255, 255, 255));
const isAccessible = ratio >= 4.5;

// Harmony
const [a, b, c] = color.triadic();
const shades = color.shades(5);

// Output in any format
color.toHex();        // "#4287f5"
color.toCss();        // "rgba(66,135,245,1)"
color.toHsl();        // { h: 217, s: 90, l: 61 }
color.toNormalized(); // [0.259, 0.529, 0.961, 1]
```

## Project Structure

```
kleur/
  docs/specs/    # Language-agnostic specifications
  ts/            # TypeScript implementation (planned)
```

## License

MIT
