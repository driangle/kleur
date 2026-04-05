# Blending & Mixing

Functions for blending and interpolating between colors.

```ts
import kleur from "@driangle/kleur";
```

## blend

```ts
kleur.blend(base: Color, overlay: Color, mode: BlendMode): Color
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
const a = kleur("#ff6600");
const b = kleur("#0066ff");

kleur.blend(a, b, "multiply").toHex();
kleur.blend(a, b, "screen").toHex();
kleur.blend(a, b, "overlay").toHex();
```

## mix

```ts
kleur.mix(a: Color, b: Color, t?: number, ease?: EasingFn): Color
```

Interpolate between two colors in RGB space. `t=0` returns `a`, `t=1` returns `b`. Default `t` is `0.5` (midpoint).

The optional `ease` function remaps `t` before interpolation, allowing non-linear blending.

```ts
const red = kleur("#ff0000");
const blue = kleur("#0000ff");

kleur.mix(red, blue);           // 50% blend
kleur.mix(red, blue, 0.25);     // 25% toward blue
kleur.mix(red, blue, 0.5, t => t * t); // ease-in quadratic
```

## Types

```ts
type BlendMode = "multiply" | "screen" | "overlay" | "add" | "subtract";
type EasingFn = (t: number) => number;
```
