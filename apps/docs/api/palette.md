# Palette

A lightweight wrapper around a collection of colors, returned by [harmony functions](/api/harmony). Supports iteration, destructuring, and bulk color transformations.

```ts
import kleur from "@driangle/kleur";

const palette = kleur.triadic("#ff0000");

// Destructure like an array
const [base, second, third] = palette;

// Spread into an array
const colors = [...palette];

// Iterate
for (const color of palette) {
  console.log(color.toHex());
}

// Bulk transform — returns a new Palette
const muted = palette.desaturate(0.3);
const lighter = palette.lighten(0.2);
```

## Properties

### length

```ts
palette.length: number
```

The number of colors in the palette.

## Access

### at

```ts
palette.at(index: number): Color | undefined
```

Returns the color at the given index. Supports negative indices (e.g., `-1` for the last color).

### toArray

```ts
palette.toArray(): Color[]
```

Returns a plain array copy of the colors.

## Collection Operations

### map

```ts
palette.map<T>(fn: (color: Color, index: number) => T): T[]
```

Transforms each color and returns a plain array of results.

```ts
const hexValues = palette.map(c => c.toHex());
// ["#ff0000", "#00ff00", "#0000ff"]
```

### filter

```ts
palette.filter(fn: (color: Color, index: number) => boolean): Palette
```

Returns a new `Palette` containing only colors that pass the test.

```ts
const lights = palette.filter(c => c.isLight);
```

### forEach

```ts
palette.forEach(fn: (color: Color, index: number) => void): void
```

Calls the function for each color in the palette.

### flatMap

```ts
palette.flatMap(fn: (color: Color, index: number) => Color[] | Palette): Palette
```

Maps each color to an array of colors (or a Palette) and flattens the results into a single new Palette.

```ts
// Expand each color into its shades
const expanded = palette.flatMap(c => c.shades(3));
```

## Bulk Color Adjustments

All adjustment methods return a new `Palette` with the operation applied to every color.

| Method | Description |
|---|---|
| `lighten(amount)` | Lighten all colors |
| `darken(amount)` | Darken all colors |
| `saturate(amount)` | Increase saturation |
| `desaturate(amount)` | Decrease saturation |
| `rotate(degrees)` | Shift hue |
| `invert()` | Invert all colors |
| `complement()` | Get complement of each color |
| `grayscale()` | Fully desaturate all colors |
| `opaque()` | Set alpha to 1 for all colors |
| `warm(amount?)` | Shift hue toward warm tones |
| `cool(amount?)` | Shift hue toward cool tones |
| `mix(target, t?, ease?)` | Mix each color toward a target |
| `blend(overlay, mode)` | Blend each color with an overlay |
| `sortBy(channel, direction?)` | Sort by channel (`hue`, `saturation`, `lightness`, etc.). Default ascending. |
| `interpolate(steps, ease?)` | Generate smooth color ramp of `steps` colors with optional easing |
| `spread(count)` | Alias for `interpolate(count)` |
| `unique(threshold?)` | Remove perceptually near-duplicate colors (default threshold: 2.3) |

```ts
// Chain multiple transformations
const result = kleur.triadic("#ff6600")
  .desaturate(0.2)
  .lighten(0.1);
```
