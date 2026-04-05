# Distance

Compute the perceptual or mathematical distance between two colors using configurable color spaces and distance methods.

All distance functions accept flexible color inputs — hex strings, CSS strings, packed numbers, or `Color` instances.

```ts
import kleur from "@driangle/kleur";
// kleur.distance(...)
```

<DistanceDemo />

## distance

```ts
distance(a: KleurValue, b: KleurValue, options?: DistanceOptions): number
```

Without options, returns Euclidean distance in RGB space. Pass a preset or explicit `{space, method}` for perceptual distance metrics.

## Presets

Use a preset for common strategies:

```ts
kleur.distance("#ff6600", "#0066ff", { preset: "fast" });       // Euclidean in RGB
kleur.distance("#ff6600", "#0066ff", { preset: "perceptual" }); // deltaE94 in Lab
kleur.distance("#ff6600", "#0066ff", { preset: "accurate" });   // CIEDE2000 in Lab
kleur.distance("#ff6600", "#0066ff", { preset: "modern" });     // Euclidean in OKLab
```

| Preset | Color Space | Method | Best For |
|--------|-------------|--------|----------|
| `"fast"` | RGB | Euclidean | Quick comparisons, non-perceptual |
| `"perceptual"` | Lab | deltaE94 | Perceptual similarity (good balance) |
| `"accurate"` | Lab | CIEDE2000 | Most accurate perceptual distance |
| `"modern"` | OKLab | Euclidean | Modern perceptual uniformity |

## Custom Configuration

Specify an explicit color space and distance method:

```ts
kleur.distance("#ff6600", "#0066ff", { space: "oklab", method: "euclidean" });
kleur.distance("#ff6600", "#0066ff", { space: "lab", method: "deltaE2000" });
```

### Color Spaces

| Space | Description |
|-------|-------------|
| `"rgb"` | RGB (0-255 per channel) |
| `"hsl"` | HSL (h: 0-360, s: 0-100, l: 0-100) |
| `"lab"` | CIELAB (L: 0-100, a/b: ~-128 to +128) |
| `"lch"` | Cylindrical Lab (L: 0-100, C: >= 0, H: 0-360) |
| `"oklab"` | OKLab (L: 0-1, a/b: ~-0.4 to +0.4) |
| `"oklch"` | Cylindrical OKLab (L: 0-1, C: >= 0, H: 0-360) |

### Distance Methods

| Method | Valid Spaces | Description |
|--------|-------------|-------------|
| `"euclidean"` | all | Euclidean distance in any 3D space |
| `"deltaE76"` | `lab` | CIE76 — Euclidean in Lab (simple) |
| `"deltaE94"` | `lab` | CIE94 — weighted Lab distance |
| `"deltaE2000"` | `lab` | CIEDE2000 — modern standard |
| `"deltaEOK"` | `oklab` | Euclidean in OKLab |

Not all combinations are valid. Using an unsupported space/method pair throws an error.

## Types

```ts
type DistancePreset = "fast" | "perceptual" | "accurate" | "modern";

type DistanceOptions =
  | { preset: DistancePreset }
  | {
      space: "rgb" | "hsl" | "lab" | "lch" | "oklab" | "oklch";
      method: "euclidean" | "deltaE76" | "deltaE94" | "deltaE2000" | "deltaEOK";
    };
```
