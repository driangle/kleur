# Kleur Namespace

The `Kleur` object groups the entire public API into semantic namespaces. It's a convenient alternative to importing individual functions.

```ts
import { Kleur } from "kleur";
```

## Namespaces

### `Kleur.create`

Color creation functions. See [Parsing & Creation](/api/create).

| Function | Description |
|----------|-------------|
| `rgb(r, g, b, a?)` | Create from RGBA values |
| `hex(str)` | Parse hex string |
| `hsl(h, s, l, a?)` | Create from HSL values |
| `number(n)` | Create from packed integer (`0xRRGGBB`) |
| `css(str)` | Parse CSS function string |
| `object(value)` | Universal converter (hex, CSS, named, number, or passthrough) |
| `random(options?)` | Generate a random color |
| `grayscale(value, alpha?)` | Create a gray color |

### `Kleur.analyze`

Color analysis functions. See [Analysis](/api/analysis) and [Distance](/api/distance).

| Function | Description |
|----------|-------------|
| `luminance(color)` | WCAG 2.1 relative luminance |
| `isLight(color)` | True if lightness > 50 |
| `isDark(color)` | True if lightness <= 50 |
| `contrast(a, b)` | WCAG contrast ratio (1-21) |
| `distance(a, b, options?)` | Color distance with configurable space/method |

### `Kleur.combine`

Blending and interpolation. See [Blending & Mixing](/api/blend).

| Function | Description |
|----------|-------------|
| `lerp(a, b, t?, ease?)` | Linear interpolation (alias for `mix`) |
| `blend(base, overlay, mode)` | Blend with a blend mode |
| `mix(a, b, t?, ease?)` | Interpolate between two colors |

### `Kleur.harmony`

Color harmony functions. See [Color Harmonies](/api/harmony).

| Function | Description |
|----------|-------------|
| `triadic(color)` | 3 colors, 120 degrees apart |
| `tetradic(color)` | 4 colors, 90 degrees apart |
| `analogous(color, angle?)` | 3 adjacent colors |
| `splitComplement(color, angle?)` | Base + two near the complement |
| `tints(color, count)` | Progressively lighter variations |
| `shades(color, count)` | Progressively darker variations |
| `tones(color, count)` | Progressively desaturated variations |

### `Kleur.gradient`

Gradient creation and type guards. See [Gradients](/api/gradient).

| Function | Description |
|----------|-------------|
| `colorStop(offset, color)` | Create a gradient stop |
| `solid(color)` | Create a solid fill |
| `linearGradient(config)` | Create a linear gradient |
| `radialGradient(config)` | Create a radial gradient |
| `isSolid(fill)` | Type guard for solid fills |
| `isLinearGradient(fill)` | Type guard for linear gradients |
| `isRadialGradient(fill)` | Type guard for radial gradients |
| `isGradient(fill)` | Type guard for any gradient |

### `Kleur.named`

Named color constants and lookup. See [Named Colors](/api/named-colors).

| Property | Description |
|----------|-------------|
| `get(name)` | Look up a CSS named color |
| `white`, `black`, `red`, `green`, `blue` | Color constants |
| `yellow`, `cyan`, `magenta`, `orange` | Color constants |
| `purple`, `pink`, `lime`, `transparent` | Color constants |
