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
| `hue` | `number` | Hue (0-360, same in HSL and HSB) |
| `saturationHsl` | `number` | HSL saturation (0-100) |
| `lightness` | `number` | HSL lightness (0-100) |
| `saturationHsb` | `number` | HSB saturation (0-100) |
| `brightness` | `number` | HSB brightness (0-100) |
| `alpha` | `number` | Alpha (0-1) |
| `hsl` | `Hsl` | `{ h, s, l }` |
| `hsb` | `Hsb` | `{ h, s, b }` |

## Immutable Setters

Each returns a **new** `Color` with the specified channel replaced:

| Method | Param | Description |
|--------|-------|-------------|
| `withRed(v)` | `number` (0-255) | Set red channel |
| `withGreen(v)` | `number` (0-255) | Set green channel |
| `withBlue(v)` | `number` (0-255) | Set blue channel |
| `withAlpha(v)` | `number` (0-1) | Set alpha |
| `withHue(v)` | `number` (0-360) | Set hue |
| `withSaturationHsl(v)` | `number` (0-100) | Set HSL saturation |
| `withSaturationHsb(v)` | `number` (0-100) | Set HSB saturation |
| `withLightness(v)` | `number` (0-100) | Set lightness |
| `withBrightness(v)` | `number` (0-100) | Set HSB brightness |

```ts
const red = kleur("#ff0000");
const blue = red.withHue(240); // same saturation/lightness, different hue
```

## Systematic Channel Operations

For channels that support multiple kinds of adjustment, the API follows a consistent pattern:

- `withX(value)` sets an absolute value
- `adjustX(delta)` adds a delta in channel units
- `scaleX(factor)` multiplies the current value

| Channel | Absolute | Additive | Multiplicative |
|--------|----------|----------|----------------|
| Alpha | `withAlpha(v)` | `adjustAlpha(delta)` | `scaleAlpha(factor)` |
| Hue | `withHue(v)` | `adjustHue(delta)` | — |
| HSL saturation | `withSaturationHsl(v)` | `adjustSaturationHsl(delta)` | `scaleSaturationHsl(factor)` |
| HSB saturation | `withSaturationHsb(v)` | `adjustSaturationHsb(delta)` | `scaleSaturationHsb(factor)` |
| Lightness | `withLightness(v)` | `adjustLightness(delta)` | `scaleLightness(factor)` |
| Brightness | `withBrightness(v)` | `adjustBrightness(delta)` | `scaleBrightness(factor)` |

```ts
const color = kleur("#ff6600");

color.withLightness(70);
color.adjustLightness(10);
color.scaleLightness(1.2);
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
| `adjustLightness(delta)` | `number` | Add to HSL lightness in channel units. |
| `lighten(amount)` | `number` (0-1) | Increase lightness. `0.3` = 30% toward white. |
| `darken(amount)` | `number` (0-1) | Decrease lightness. `0.3` = 30% toward black. |
| `scaleLightness(factor)` | `number` | Multiply lightness by factor. `1.5` = 50% brighter. |
| `adjustBrightness(delta)` | `number` | Add to HSB brightness in channel units. |
| `scaleBrightness(factor)` | `number` | Multiply brightness by factor. |

### Saturation

| Method | Param | Description |
|--------|-------|-------------|
| `adjustSaturationHsl(delta)` | `number` | Add to HSL saturation in channel units. |
| `saturateHsl(amount)` | `number` (0-1) | Increase HSL saturation toward 100. |
| `desaturateHsl(amount)` | `number` (0-1) | Decrease HSL saturation toward 0. |
| `scaleSaturationHsl(factor)` | `number` | Multiply HSL saturation by factor. |
| `adjustSaturationHsb(delta)` | `number` | Add to HSB saturation in channel units. |
| `scaleSaturationHsb(factor)` | `number` | Multiply HSB saturation by factor. |
| `grayscale()` | — | Remove all HSL saturation (equivalent to `desaturateHsl(1)`). |

### Hue

| Method | Param | Description |
|--------|-------|-------------|
| `adjustHue(delta)` | `number` | Add to hue and wrap around 360. |
| `rotate(degrees)` | `number` | Rotate hue on the color wheel. |
| `complement()` | — | Rotate hue by 180 degrees. |
| `warm(amount?)` | `number` (default `0.2`) | Shift hue toward warm colors (yellow-red). |
| `cool(amount?)` | `number` (default `0.2`) | Shift hue toward cool colors (blue-cyan). |

### Alpha & Inversion

| Method | Param | Description |
|--------|-------|-------------|
| `adjustAlpha(delta)` | `number` | Add to alpha, clamped to 0-1. |
| `opacity(value)` | `number` (0-1) | Set alpha to an absolute value. |
| `fade(amount)` | `number` (0-1) | Reduce alpha by a fraction. `0.5` = half current alpha. |
| `scaleAlpha(factor)` | `number` | Multiply alpha by factor, clamped to 0-1. |
| `opaque()` | — | Set alpha to 1. |
| `invert()` | — | Invert RGB channels (255 - value). |

```ts
const color = kleur("#ff6600");

color.lighten(0.3).toHex();   // lighter orange
color.rotate(120).toHex();     // shifted 120° on the wheel
color.warm(0.3).toHex();       // warmer tone
color.fade(0.5).alpha;         // 0.5
```

## Interpolation

```ts
mix(target: Color, t?: number, ease?: (t: number) => number): Color
```

Linear interpolation in RGB space between `this` and `target`. `t=0` returns `this`, `t=1` returns `target`. The optional `ease` function remaps `t` before interpolation.

```ts
const a = kleur("#ff0000");
const b = kleur("#0000ff");

a.mix(b, 0.5).toHex(); // midpoint between red and blue
a.mix(b, 0.25).toHex(); // 25% toward blue
```

## Harmony

These methods are convenience shortcuts for the [harmony functions](/api/harmony) available on the `kleur` namespace. They return the same results but can be called directly on a `Color` instance.

| Method | Returns | Description |
|--------|---------|-------------|
| `triadic()` | `[Color, Color, Color]` | 3 colors, 120 degrees apart |
| `tetradic()` | `[Color, Color, Color, Color]` | 4 colors, 90 degrees apart |
| `analogous(angle?)` | `[Color, Color, Color]` | 3 adjacent colors (default 30°) |
| `splitComplement(angle?)` | `[Color, Color, Color]` | Base + two near the complement (default 30°) |
| `tints(count)` | `Color[]` | Progressively lighter variations |
| `shades(count)` | `Color[]` | Progressively darker variations |
| `tones(count)` | `Color[]` | Progressively desaturated variations |

```ts
const coral = kleur("#ff6347");

const [base, second, third] = coral.triadic();
const lighter = coral.tints(5);
const darker = coral.shades(3);
```
