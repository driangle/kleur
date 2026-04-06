# @driangle/kleur

A TypeScript color manipulation library. Create, convert, analyze, and transform colors with an immutable, chainable API.

**[Documentation](https://driangle.github.io/kleur/)**

## Install

```bash
npm install @driangle/kleur
```

## Quick Start

```ts
import kleur from "@driangle/kleur";

// Create colors from any format
const color = kleur("#ff6600");
const fromRgb = kleur.rgb(66, 135, 245);
const fromHsl = kleur.hsl(217, 90, 61);
const fromCss = kleur.css("rebeccapurple");

// Manipulate (returns new instances)
color.lighten(0.2);
color.darken(0.3);
color.saturate(0.5);
color.rotate(45);
color.withAlpha(0.8);

// Output in any format
color.toHex();   // "#ff6600"
color.toRgb();   // { r: 255, g: 102, b: 0 }
color.toHsl();   // { h: 24, s: 100, l: 50 }
color.toCss();   // "rgba(255,102,0,1)"
color.toHex8();  // "#ff6600ff"
```

## Features

### Color Creation

```ts
kleur("#ff6600");           // hex (3, 4, 6, or 8 digit)
kleur.rgb(255, 102, 0);    // RGB values
kleur.hsl(24, 100, 50);    // HSL values
kleur.css("coral");         // CSS named colors
kleur.int(0xff6600);        // integer
kleur.grayscale(128);       // grayscale value
kleur.random();             // random color
```

### Manipulation

All methods are immutable and return a new `Color` instance.

```ts
const c = kleur("#3388ff");

// Adjustments
c.lighten(0.2);       // lighten by 20% of remaining headroom
c.darken(0.3);        // darken by 30% of current lightness
c.saturate(0.5);      // increase saturation
c.desaturate(0.2);    // decrease saturation
c.rotate(90);         // rotate hue by degrees
c.complement();       // rotate 180 degrees
c.invert();           // invert RGB channels
c.grayscale();        // remove saturation
c.warm(0.3);          // shift hue toward warm
c.cool(0.3);          // shift hue toward cool

// Direct channel control
c.withRed(200);
c.withHue(180);
c.withAlpha(0.5);
c.adjustHue(30);
c.scaleLightness(1.2);
```

### Color Harmony

Harmony methods return a `Palette` (an iterable array-like of colors).

```ts
const c = kleur("#ff6600");

c.triadic();              // 3 colors, 120 degrees apart
c.tetradic();             // 4 colors, 90 degrees apart
c.analogous();            // 3 neighboring colors
c.splitComplement();      // split-complementary
c.tints(5);               // 5 lighter variations
c.shades(5);              // 5 darker variations
c.tones(5);               // 5 desaturated variations
```

### Blending & Mixing

```ts
const a = kleur("#ff0000");
const b = kleur("#0000ff");

// Mix two colors
a.mix(b, 0.5);                     // 50% blend
a.mix(b, 0.5, t => t * t);         // with easing

// Blend modes
a.blend(b, "multiply");
a.blend(b, "screen");
a.blend(b, "overlay");
```

### Analysis

```ts
const c = kleur("#3388ff");

kleur.luminance(c);                  // relative luminance (0-1)
kleur.contrast(c, kleur.white);      // contrast ratio
kleur.isLight(c);                    // true if light
kleur.isDark(c);                     // true if dark
kleur.distance(c, kleur("#0066cc")); // perceptual distance
```

### Gradients

```ts
import { LinearGradientBuilder } from "@driangle/kleur";

const gradient = new LinearGradientBuilder()
  .stop("#ff0000", 0)
  .stop("#0000ff", 1)
  .build(90);
```

### Palette Utilities

```ts
const palette = kleur("#ff6600").triadic();

palette.sortBy("hue");
palette.unique();
palette.spread(7);
palette.interpolate(10);
palette.harmonize(0.5);
palette.balanceLightness(50);
palette.flatMap(c => [c, c.lighten(0.3)]);
```

## Output Formats

```ts
const c = kleur("#ff6600");

c.toHex();        // "#ff6600"
c.toHex8();       // "#ff6600ff"
c.toRgb();        // { r: 255, g: 102, b: 0 }
c.toRgba();       // { r: 255, g: 102, b: 0, a: 1 }
c.toHsl();        // { h: 24, s: 100, l: 50 }
c.toHsla();       // { h: 24, s: 100, l: 50, a: 1 }
c.toHsb();        // { h: 24, s: 100, b: 100 }
c.toHsba();       // { h: 24, s: 100, b: 100, a: 1 }
c.toCss();        // "rgba(255,102,0,1)"
c.toArray();      // [255, 102, 0, 1]
c.toNormalized(); // [1, 0.4, 0, 1]
```

## License

MIT
