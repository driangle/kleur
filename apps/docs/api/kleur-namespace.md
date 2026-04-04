# kleur

The `kleur` export is both a universal color factory and a namespace carrying the full API. Import it once to access everything:

```ts
import { kleur } from "@driangle/kleur";

// Factory — create colors from any format
const color = kleur("#ff6600");
const other = kleur(255, 102, 0);

// Named creators
kleur.hex("#ff6600");
kleur.rgb(255, 102, 0);
kleur.hsl(24, 100, 50);

// Analysis
kleur.luminance(color);
kleur.contrast(color, kleur.white);

// Blending
kleur.mix(color, other, 0.5);

// Harmonies
kleur.triadic(color);
```

## API Reference

All functions listed below are properties of `kleur`. They are also available as individual named imports.

### Color Creation

See [Parsing & Creation](/api/create).

| Function | Description |
|----------|-------------|
| `kleur(value)` | Universal factory (hex, CSS, named, number, Color) |
| `kleur(r, g, b, a?)` | Create from RGBA values |
| `kleur.rgb(r, g, b, a?)` | Create from RGBA values |
| `kleur.hex(str)` | Parse hex string |
| `kleur.hsl(h, s, l, a?)` | Create from HSL values |
| `kleur.number(n)` | Create from packed integer (`0xRRGGBB`) |
| `kleur.css(str)` | Parse CSS function string |
| `kleur.random(options?)` | Generate a random color |
| `kleur.grayscale(value, alpha?)` | Create a gray color |

### Analysis

See [Analysis](/api/analysis) and [Distance](/api/distance).

| Function | Description |
|----------|-------------|
| `kleur.luminance(color)` | WCAG 2.1 relative luminance |
| `kleur.isLight(color)` | True if lightness > 50 |
| `kleur.isDark(color)` | True if lightness <= 50 |
| `kleur.contrast(a, b)` | WCAG contrast ratio (1-21) |
| `kleur.distance(a, b, options?)` | Color distance with configurable space/method |

### Blending & Mixing

See [Blending & Mixing](/api/blend).

| Function | Description |
|----------|-------------|
| `kleur.mix(a, b, t?, ease?)` | Interpolate between two colors |
| `kleur.lerp(a, b, t?, ease?)` | Alias for `mix` |
| `kleur.blend(base, overlay, mode)` | Blend with a blend mode |

### Color Harmonies

See [Color Harmonies](/api/harmony).

| Function | Description |
|----------|-------------|
| `kleur.triadic(color)` | 3 colors, 120 degrees apart |
| `kleur.tetradic(color)` | 4 colors, 90 degrees apart |
| `kleur.analogous(color, angle?)` | 3 adjacent colors |
| `kleur.splitComplement(color, angle?)` | Base + two near the complement |
| `kleur.tints(color, count)` | Progressively lighter variations |
| `kleur.shades(color, count)` | Progressively darker variations |
| `kleur.tones(color, count)` | Progressively desaturated variations |

### Gradients

See [Gradients](/api/gradient).

| Function | Description |
|----------|-------------|
| `kleur.colorStop(offset, color)` | Create a gradient stop |
| `kleur.solid(color)` | Create a solid fill |
| `kleur.linearGradient(config)` | Create a linear gradient |
| `kleur.radialGradient(config)` | Create a radial gradient |
| `kleur.isSolid(fill)` | Type guard for solid fills |
| `kleur.isLinearGradient(fill)` | Type guard for linear gradients |
| `kleur.isRadialGradient(fill)` | Type guard for radial gradients |
| `kleur.isGradient(fill)` | Type guard for any gradient |

### Named Colors

See [Named Colors](/api/named-colors).

| Property | Description |
|----------|-------------|
| `kleur.white`, `kleur.black`, `kleur.red`, `kleur.green`, `kleur.blue` | Color constants |
| `kleur.yellow`, `kleur.cyan`, `kleur.magenta`, `kleur.orange` | Color constants |
| `kleur.purple`, `kleur.pink`, `kleur.lime`, `kleur.transparent` | Color constants |
