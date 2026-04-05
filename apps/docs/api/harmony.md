# Color Harmonies

Functions for generating color palettes based on color theory relationships. All harmony functions are available both on the `kleur` namespace (accepts any color input) and as methods on `Color` instances.

```ts
import kleur from "@driangle/kleur";

// Namespace style — accepts any color input
const [base, second, third] = kleur.triadic("#ff0000");

// Method style — on a Color instance
const coral = kleur("#ff6347");
const [base, second, third] = coral.triadic();
```

<PaletteDemo />

## triadic

```ts
kleur.triadic(color): [Color, Color, Color]
color.triadic(): [Color, Color, Color]
```

Returns 3 colors evenly spaced 120 degrees apart on the color wheel. The first element is the original color.

```ts
const [base, second, third] = kleur.triadic("#ff0000");
// base = red, second = green, third = blue
```

## tetradic

```ts
kleur.tetradic(color): [Color, Color, Color, Color]
color.tetradic(): [Color, Color, Color, Color]
```

Returns 4 colors evenly spaced 90 degrees apart (square harmony). The first element is the original color.

```ts
const [a, b, c, d] = kleur("#ff0000").tetradic();
```

## analogous

```ts
kleur.analogous(color, angle?): [Color, Color, Color]
color.analogous(angle?): [Color, Color, Color]
```

Returns 3 adjacent colors. The center color is the original, flanked by colors at +/- `angle` degrees. Default angle is `30`.

```ts
const [left, center, right] = kleur.analogous("#ff6600");
const wider = kleur("#ff6600").analogous(45);
```

## splitComplement

```ts
kleur.splitComplement(color, angle?): [Color, Color, Color]
color.splitComplement(angle?): [Color, Color, Color]
```

Returns 3 colors: the original plus two colors near its complement (180 degrees +/- `angle`). Default angle is `30`.

```ts
const [base, a, b] = kleur("#ff6600").splitComplement();
```

## tints

```ts
kleur.tints(color, count): Color[]
color.tints(count): Color[]
```

Returns `count` progressively lighter variations of the color.

```ts
const lightVariations = kleur("#ff6600").tints(5);
// 5 colors, each lighter than the previous
```

## shades

```ts
kleur.shades(color, count): Color[]
color.shades(count): Color[]
```

Returns `count` progressively darker variations of the color.

```ts
const darkVariations = kleur("#ff6600").shades(5);
// 5 colors, each darker than the previous
```

## tones

```ts
kleur.tones(color, count): Color[]
color.tones(count): Color[]
```

Returns `count` progressively desaturated variations of the color.

```ts
const mutedVariations = kleur("#ff6600").tones(5);
// 5 colors, each more muted than the previous
```
