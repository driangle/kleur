# Color

The core immutable color class. Stores RGBA internally with derived HSL access. All mutation methods return a new instance.

```ts
import type { Color } from "@driangle/kleur";
```

`Color` is exported as a **type only** — use `kleur()` or the creation functions (`kleur.hex()`, `kleur.rgb()`, `kleur.hsl()`, etc.) to create instances. See [Parsing & Creation](/api/create) for the full list.

## Channel Getters

| Getter | Returns | Description |
|--------|---------|-------------|
| `red` | `number` | Red channel (0-255) |
| `green` | `number` | Green channel (0-255) |
| `blue` | `number` | Blue channel (0-255) |
| `hue` | `number` | Hue (0-360) |
| `saturation` | `number` | Saturation (0-100) |
| `lightness` | `number` | HSL lightness (0-100) |
| `brightness` | `number` | HSB brightness (0-100) |
| `alpha` | `number` | Alpha (0-1) |
| `hsl` | `Hsl` | `{ h, s, l }` object |
| `hsb` | `Hsb` | `{ h, s, b }` object |

## Immutable Setters

Each returns a **new** `Color` with the specified channel replaced:

| Method | Param | Description |
|--------|-------|-------------|
| `withRed(v)` | `number` (0-255) | Set red channel |
| `withGreen(v)` | `number` (0-255) | Set green channel |
| `withBlue(v)` | `number` (0-255) | Set blue channel |
| `withAlpha(v)` | `number` (0-1) | Set alpha |
| `withHue(v)` | `number` (0-360) | Set hue |
| `withSaturation(v)` | `number` (0-100) | Set saturation |
| `withLightness(v)` | `number` (0-100) | Set lightness |

```ts
const red = kleur("#ff0000");
const blue = red.withHue(240); // same saturation/lightness, different hue
```

## Output Formats

| Method | Returns | Example |
|--------|---------|---------|
| `toHex()` | `string` | `"#ff7f50"` |
| `toCss()` | `string` | `"rgba(255,127,80,1)"` |
| `toRgb()` | `Rgb` | `{ r: 255, g: 127, b: 80 }` |
| `toRgba()` | `Rgba` | `{ r: 255, g: 127, b: 80, a: 1 }` |
| `toHsl()` | `Hsl` | `{ h: 16, s: 100, l: 66 }` |
| `toHsla()` | `Hsla` | `{ h: 16, s: 100, l: 66, a: 1 }` |
| `toArray()` | `[r, g, b, a]` | `[255, 127, 80, 1]` |
| `toNormalized()` | `[r, g, b, a]` | `[1, 0.498, 0.314, 1]` (0-1 range) |
| `toString()` | `string` | Same as `toCss()` |

## Color Adjustments

All adjustment methods return a new `Color`.

### Lightness & Brightness

| Method | Param | Description |
|--------|-------|-------------|
| `lighten(amount)` | `number` (0-1) | Increase lightness. `0.3` = 30% toward white. |
| `darken(amount)` | `number` (0-1) | Decrease lightness. `0.3` = 30% toward black. |
| `scaleLightness(factor)` | `number` | Multiply lightness by factor. `1.5` = 50% brighter. |

### Saturation

| Method | Param | Description |
|--------|-------|-------------|
| `saturate(amount)` | `number` (0-1) | Increase saturation toward 100. |
| `desaturate(amount)` | `number` (0-1) | Decrease saturation toward 0. |
| `grayscale()` | — | Remove all saturation (equivalent to `desaturate(1)`). |

### Hue

| Method | Param | Description |
|--------|-------|-------------|
| `rotate(degrees)` | `number` | Rotate hue on the color wheel. |
| `complement()` | — | Rotate hue by 180 degrees. |
| `warm(amount?)` | `number` (default `0.2`) | Shift hue toward warm colors (yellow-red). |
| `cool(amount?)` | `number` (default `0.2`) | Shift hue toward cool colors (blue-cyan). |

### Alpha & Inversion

| Method | Param | Description |
|--------|-------|-------------|
| `opacity(value)` | `number` (0-1) | Set alpha to an absolute value. |
| `fade(amount)` | `number` (0-1) | Reduce alpha by a fraction. `0.5` = half current alpha. |
| `opaque()` | — | Set alpha to 1. |
| `invert()` | — | Invert RGB channels (255 - value). |

```ts
const color = kleur("#ff6600");

color.lighten(0.3).toHex();   // lighter orange
color.rotate(120).toHex();     // shifted 120° on the wheel
color.warm(0.3).toHex();       // warmer tone
color.fade(0.5).alpha();       // 0.5
```

## Interpolation

```ts
interpolate(target: Color, t?: number, ease?: (t: number) => number): Color
lerp(target: Color, t?: number, ease?: (t: number) => number): Color
```

Linear interpolation in RGB space between `this` and `target`. `t=0` returns `this`, `t=1` returns `target`. The optional `ease` function remaps `t` before interpolation.

`lerp()` is an alias for `interpolate()`.

```ts
const a = kleur("#ff0000");
const b = kleur("#0000ff");

a.interpolate(b, 0.5).toHex(); // midpoint between red and blue
a.lerp(b, 0.25).toHex();       // 25% toward blue
```
