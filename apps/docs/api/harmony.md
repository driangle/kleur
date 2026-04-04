# Color Harmonies

Functions for generating color palettes based on color theory relationships.

```ts
import { triadic, tetradic, analogous, splitComplement, tints, shades, tones } from "@driangle/kleur";
// or
import { Kleur } from "@driangle/kleur";
// Kleur.harmony.triadic(...), Kleur.harmony.tints(...), etc.
```

## triadic

```ts
triadic(color: Color): [Color, Color, Color]
```

Returns 3 colors evenly spaced 120 degrees apart on the color wheel. The first element is the original color.

```ts
const [base, second, third] = triadic(hex("#ff0000"));
// base = red, second = green, third = blue
```

## tetradic

```ts
tetradic(color: Color): [Color, Color, Color, Color]
```

Returns 4 colors evenly spaced 90 degrees apart (square harmony). The first element is the original color.

```ts
const [a, b, c, d] = tetradic(hex("#ff0000"));
```

## analogous

```ts
analogous(color: Color, angle?: number): [Color, Color, Color]
```

Returns 3 adjacent colors. The center color is the original, flanked by colors at +/- `angle` degrees. Default angle is `30`.

```ts
const [left, center, right] = analogous(hex("#ff6600"));
const wider = analogous(hex("#ff6600"), 45);
```

## splitComplement

```ts
splitComplement(color: Color, angle?: number): [Color, Color, Color]
```

Returns 3 colors: the original plus two colors near its complement (180 degrees +/- `angle`). Default angle is `30`.

```ts
const [base, a, b] = splitComplement(hex("#ff6600"));
```

## tints

```ts
tints(color: Color, count: number): Color[]
```

Returns `count` progressively lighter variations of the color.

```ts
const lightVariations = tints(hex("#ff6600"), 5);
// 5 colors, each lighter than the previous
```

## shades

```ts
shades(color: Color, count: number): Color[]
```

Returns `count` progressively darker variations of the color.

```ts
const darkVariations = shades(hex("#ff6600"), 5);
// 5 colors, each darker than the previous
```

## tones

```ts
tones(color: Color, count: number): Color[]
```

Returns `count` progressively desaturated variations of the color.

```ts
const mutedVariations = tones(hex("#ff6600"), 5);
// 5 colors, each more muted than the previous
```
