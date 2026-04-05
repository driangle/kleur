# Color Harmonies

Functions for generating color palettes based on color theory relationships. All harmony functions are available both on the `kleur` namespace (accepts any color input) and as methods on `Color` instances.

All harmony functions return a [`Palette`](/api/palette) instance, which supports iteration, destructuring, and bulk color operations.

```ts
import kleur from "@driangle/kleur";

// Namespace style — accepts any color input
const [base, second, third] = kleur.triadic("#ff0000");

// Method style — on a Color instance
const coral = kleur("#ff6347");
const [base, second, third] = coral.triadic();

// Palette operations — transform all colors at once
const muted = kleur.triadic("#ff0000").desaturate(0.3);
const lighter = kleur.shades("#ff6600", 5).lighten(0.1);
```

<PaletteDemo />

## triadic

```ts
kleur.triadic(color: KleurValue): Palette
color.triadic(): [Color, Color, Color]
```

Returns 3 colors evenly spaced 120 degrees apart on the color wheel. The first element is the original color.

```ts
const [base, second, third] = kleur.triadic("#ff0000");
// base = red, second = green, third = blue
```

## tetradic

```ts
kleur.tetradic(color: KleurValue): Palette
color.tetradic(): [Color, Color, Color, Color]
```

Returns 4 colors evenly spaced 90 degrees apart (square harmony). The first element is the original color.

```ts
const [a, b, c, d] = kleur.tetradic("#ff0000");
```

## analogous

```ts
kleur.analogous(color: KleurValue, angle?): Palette
color.analogous(angle?): [Color, Color, Color]
```

Returns 3 adjacent colors. The center color is the original, flanked by colors at +/- `angle` degrees. Default angle is `30`.

```ts
const [left, center, right] = kleur.analogous("#ff6600");
const wider = kleur("#ff6600").analogous(45);
```

## splitComplement

```ts
kleur.splitComplement(color: KleurValue, angle?): Palette
color.splitComplement(angle?): [Color, Color, Color]
```

Returns 3 colors: the original plus two colors near its complement (180 degrees +/- `angle`). Default angle is `30`.

```ts
const [base, a, b] = kleur.splitComplement("#ff6600");
```

## tints

```ts
kleur.tints(color: KleurValue, count): Palette
color.tints(count): Color[]
```

Returns `count` progressively lighter variations of the color.

```ts
const lightVariations = kleur.tints("#ff6600", 5);
// 5 colors, each lighter than the previous
```

## shades

```ts
kleur.shades(color: KleurValue, count): Palette
color.shades(count): Color[]
```

Returns `count` progressively darker variations of the color.

```ts
const darkVariations = kleur.shades("#ff6600", 5);
// 5 colors, each darker than the previous
```

## tones

```ts
kleur.tones(color: KleurValue, count): Palette
color.tones(count): Color[]
```

Returns `count` progressively desaturated variations of the color.

```ts
const mutedVariations = kleur.tones("#ff6600", 5);
// 5 colors, each more muted than the previous
```
