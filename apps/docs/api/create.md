# Parsing & Creation

Functions for creating `Color` instances from various input formats.

```ts
import kleur from "@driangle/kleur";
// kleur.rgb(...), kleur.hex(...), etc.
```

<CreateColorDemo />

## rgb

```ts
rgb(r: number, g: number, b: number, a?: number): Color
```

Create a color from RGBA values. Channels are clamped to 0-255, alpha to 0-1.

```ts
const red = kleur.rgb(255, 0, 0);
const semiTransparent = kleur.rgb(255, 0, 0, 0.5);
```

## hex

```ts
hex(hex: string): Color
```

Parse a hex color string. Requires `#` prefix. Supports 3-digit (`#abc`) and 6-digit (`#aabbcc`) forms.

```ts
const coral = kleur.hex("#ff7f50");
const short = kleur.hex("#f60"); // same as #ff6600
```

Throws if the string is not a valid hex color.

## hsl

```ts
hsl(h: number, s: number, l: number, a?: number): Color
```

Create a color from HSL values with optional alpha.

| Param | Range |
|-------|-------|
| `h` | 0-360 (degrees) |
| `s` | 0-100 (percent) |
| `l` | 0-100 (percent) |
| `a` | 0-1 (default `1`) |

```ts
const orange = kleur.hsl(30, 100, 50);
```

## int

```ts
int(n: number): Color
```

Create a color from a 24-bit packed integer (`0xRRGGBB`).

```ts
const white = kleur.int(0xffffff);
const red = kleur.int(0xff0000);
```

## css

```ts
css(css: string): Color
```

Parse a CSS color function string. Supports `rgb()`, `rgba()`, `hsl()`, and `hsla()` in both comma-separated and space-separated (CSS Color Level 4) syntax. Hue values can be negative.

```ts
// Comma-separated (legacy)
const a = kleur.css("rgb(255, 127, 80)");
const b = kleur.css("rgba(255, 127, 80, 0.5)");
const c = kleur.css("hsl(16, 100%, 66%)");

// Space-separated (CSS Color Level 4)
const d = kleur.css("rgb(255 127 80)");
const e = kleur.css("rgb(255 127 80 / 0.5)");
const f = kleur.css("hsl(-30 100% 50% / 0.8)");
```

Throws if the string cannot be parsed.

## grayscale

```ts
grayscale(value: number, alpha?: number): Color
```

Create a grayscale color where `r = g = b = value`.

```ts
const gray = kleur.grayscale(128);       // mid-gray
const shadow = kleur.grayscale(0, 0.3);  // semi-transparent black
```

## kleur

```ts
kleur(value: string | number | Color): Color
kleur(r: number, g: number, b: number, a?: number): Color
```

Universal factory that accepts any supported color format:
- Hex strings (`"#ff6600"`)
- CSS function strings (`"rgb(255, 102, 0)"`)
- Named colors (`"coral"`)
- Packed integers (`0xff6600`)
- Existing `Color` instances (passthrough)
- Explicit RGBA values (`255, 102, 0`)

```ts
const a = kleur("#ff6600");
const b = kleur("coral");
const c = kleur(0xff6600);
const d = kleur(255, 102, 0);
```

Throws if the value cannot be resolved to a color.

## random

```ts
random(options?: RandomOptions): Color
```

Generate a random color with optional constraints.

### RandomOptions

| Property | Type | Description |
|----------|------|-------------|
| `hue` | `"warm" \| "cool" \| [min, max]` | Constrain hue. `"warm"` = reds/yellows, `"cool"` = blues/greens. Tuple is a degree range (0-360). |
| `saturation` | `[min, max]` | Constrain saturation (0-100). |
| `lightness` | `[min, max]` | Constrain lightness (0-100). |
| `alpha` | `number` | Fixed alpha value (0-1). Default `1`. |

```ts
const any = kleur.random();
const warm = kleur.random({ hue: "warm" });
const pastel = kleur.random({ saturation: [20, 40], lightness: [70, 90] });
const blueish = kleur.random({ hue: [200, 260], saturation: [60, 100] });
```
