# Type Definitions

All exported types from the kleur library.

```ts
import type {
  Rgb, Rgba, Hsl, Hsla,
  SolidKleur, LinearGradient, RadialGradient, GradientStop, KleurFill,
  KleurValue, DistancePreset, DistanceOptions,
  BlendMode, EasingFn, RandomOptions, NamedColorLookup,
} from "@driangle/kleur";
```

## Color Channel Types

### Rgb

```ts
interface Rgb {
  r: number; // 0-255
  g: number; // 0-255
  b: number; // 0-255
}
```

### Rgba

```ts
interface Rgba extends Rgb {
  a: number; // 0-1
}
```

### Hsl

```ts
interface Hsl {
  h: number; // 0-360
  s: number; // 0-100
  l: number; // 0-100
}
```

### Hsla

```ts
interface Hsla extends Hsl {
  a: number; // 0-1
}
```

## Fill Types

### SolidKleur

```ts
interface SolidKleur {
  type: "solid";
  color: Color;
}
```

### LinearGradient

```ts
interface LinearGradient {
  type: "linear";
  x0: number;
  y0: number;
  x1: number;
  y1: number;
  stops: GradientStop[];
  globalAlpha?: number;
}
```

### RadialGradient

```ts
interface RadialGradient {
  type: "radial";
  x0: number;
  y0: number;
  r0: number;
  x1: number;
  y1: number;
  r1: number;
  stops: GradientStop[];
  globalAlpha?: number;
}
```

### GradientStop

```ts
interface GradientStop {
  offset: number; // 0-1
  color: Color;
}
```

### KleurFill

```ts
type KleurFill = SolidKleur | LinearGradient | RadialGradient;
```

## Input Types

### KleurValue

Any value accepted as a color input by `object()`:

```ts
type KleurValue = string | number | Color;
```

### NamedColorLookup

```ts
type NamedColorLookup = (name: string) => Color | undefined;
```

## Distance Types

### DistancePreset

```ts
type DistancePreset = "fast" | "perceptual" | "accurate" | "modern";
```

### DistanceOptions

```ts
type DistanceOptions =
  | { preset: DistancePreset }
  | {
      space: "rgb" | "hsl" | "lab" | "lch" | "oklab" | "oklch";
      method: "euclidean" | "deltaE76" | "deltaE94" | "deltaE2000" | "deltaEOK";
    };
```

## Blend Types

### BlendMode

```ts
type BlendMode = "multiply" | "screen" | "overlay" | "add" | "subtract";
```

### EasingFn

```ts
type EasingFn = (t: number) => number;
```

## Random Types

### RandomOptions

```ts
interface RandomOptions {
  hue?: "warm" | "cool" | [number, number];
  saturation?: [number, number];
  lightness?: [number, number];
  alpha?: number;
}
```
