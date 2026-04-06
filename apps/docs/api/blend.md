# Blending & Mixing

Functions for blending and interpolating between colors.

All blending functions accept flexible color inputs — hex strings, CSS strings, packed numbers, or `Color` instances.

```ts
import kleur from "@driangle/kleur";
```

<BlendDemo />

## blend

```ts
kleur.blend(base: KleurValue, overlay: KleurValue, mode: BlendMode): Color
```

Blend two colors using the specified blend mode. Operates per-channel in normalized (0-1) space. The result uses the base color's alpha.

### Blend Modes

| Mode | Formula | Effect |
|------|---------|--------|
| `"multiply"` | `base * overlay` | Darkens — produces darker results |
| `"screen"` | `1 - (1 - base)(1 - overlay)` | Lightens — produces lighter results |
| `"overlay"` | Multiply if dark, screen if light | Increases contrast |
| `"darken"` | `min(base, overlay)` | Keeps the darker value per channel |
| `"lighten"` | `max(base, overlay)` | Keeps the lighter value per channel |
| `"colorDodge"` | `base / (1 - overlay)` | Brightens by decreasing contrast |
| `"colorBurn"` | `1 - (1 - base) / overlay` | Darkens by increasing contrast |
| `"hardLight"` | Overlay with roles swapped | Overlay controls multiply vs screen |
| `"softLight"` | W3C formula | Gentle, diffused contrast adjustment |
| `"difference"` | `abs(base - overlay)` | Shows difference; identical = black |
| `"exclusion"` | `base + overlay - 2 * base * overlay` | Like difference but softer |
| `"add"` | `min(1, base + overlay)` | Brightens additively |
| `"subtract"` | `max(0, base - overlay)` | Darkens subtractively |

```ts
kleur.blend("#ff6600", "#0066ff", "multiply").toHex();
kleur.blend("#ff6600", "#0066ff", "screen").toHex();
kleur.blend("#ff6600", "#0066ff", "overlay").toHex();

// Custom blend function — receives both Color objects
kleur.blend("#ff6600", "#0066ff", (base, overlay) =>
  kleur.rgb((base.red + overlay.red) / 2, (base.green + overlay.green) / 2, (base.blue + overlay.blue) / 2)
);
```

Also available as an [instance method on Color](/api/color#interpolation-blending):

```ts
const base = kleur("#ff6600");
base.blend("#0066ff", "multiply").toHex();
```

## mix

```ts
kleur.mix(from: KleurValue, to: KleurValue, t?: number, ease?: KleurEaseFn): Color
```

Interpolate between two colors in RGB space. `t=0` returns `from`, `t=1` returns `to`. Default `t` is `0.5` (midpoint).

The optional `ease` function remaps `t` before interpolation, allowing non-linear blending.

```ts
kleur.mix("#ff0000", "#0000ff");           // 50% blend
kleur.mix("#ff0000", "#0000ff", 0.25);     // 25% toward blue
kleur.mix("#ff0000", "#0000ff", 0.5, t => t * t); // ease-in quadratic
```

## Types

```ts
type BlendFn = (base: Color, overlay: Color) => Color;
type BlendMode =
  | "multiply" | "screen" | "overlay"
  | "darken" | "lighten"
  | "colorDodge" | "colorBurn"
  | "hardLight" | "softLight"
  | "difference" | "exclusion"
  | "add" | "subtract"
  | BlendFn;
type KleurEaseFn = (t: number) => number;
```
