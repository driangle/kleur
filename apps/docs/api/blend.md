# Blending & Mixing

Functions for blending and interpolating between colors.

```ts
import { blend, mix, lerp } from "@driangle/kleur";
// or
import { Kleur } from "@driangle/kleur";
// Kleur.combine.blend(...), Kleur.combine.mix(...), etc.
```

## blend

```ts
blend(base: KleurStruct, overlay: KleurStruct, mode: BlendMode): KleurStruct
```

Blend two colors using the specified blend mode. Operates per-channel in normalized (0-1) space. The result uses the base color's alpha.

### Blend Modes

| Mode | Formula | Effect |
|------|---------|--------|
| `"multiply"` | `base * overlay` | Darkens — produces darker results |
| `"screen"` | `1 - (1 - base)(1 - overlay)` | Lightens — produces lighter results |
| `"overlay"` | Multiply if dark, screen if light | Increases contrast |
| `"add"` | `min(1, base + overlay)` | Brightens additively |
| `"subtract"` | `max(0, base - overlay)` | Darkens subtractively |

```ts
const a = hex("#ff6600");
const b = hex("#0066ff");

blend(a, b, "multiply").toHex();
blend(a, b, "screen").toHex();
blend(a, b, "overlay").toHex();
```

## mix

```ts
mix(a: KleurStruct, b: KleurStruct, t?: number, ease?: EasingFn): KleurStruct
```

Interpolate between two colors in RGB space. `t=0` returns `a`, `t=1` returns `b`. Default `t` is `0.5` (midpoint).

The optional `ease` function remaps `t` before interpolation, allowing non-linear blending.

```ts
const red = hex("#ff0000");
const blue = hex("#0000ff");

mix(red, blue);           // 50% blend
mix(red, blue, 0.25);     // 25% toward blue
mix(red, blue, 0.5, t => t * t); // ease-in quadratic
```

## lerp

```ts
lerp(a: KleurStruct, b: KleurStruct, t?: number, ease?: EasingFn): KleurStruct
```

Alias for `mix`. Identical behavior.

## Types

```ts
type BlendMode = "multiply" | "screen" | "overlay" | "add" | "subtract";
type EasingFn = (t: number) => number;
```
