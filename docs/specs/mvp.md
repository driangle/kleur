# Kleur MVP Specification

Version: 0.1.0

This spec defines the minimum viable API for the kleur library. All language implementations must conform to this spec. Behavior described here is normative; anything not specified is implementation-defined.

---

## 1. Core Color Representation

### 1.1 Internal Model

A color is stored as four channels:

| Channel | Range   | Description       |
|---------|---------|-------------------|
| r       | 0 - 255 | Red (integer)     |
| g       | 0 - 255 | Green (integer)   |
| b       | 0 - 255 | Blue (integer)    |
| a       | 0 - 1   | Alpha (float)     |

HSL values (h, s, l) are derived on demand from the RGB channels.

### 1.2 Immutability

All operations that modify a color MUST return a new color instance. The original is never mutated.

### 1.3 Clamping

All channel values MUST be clamped to their valid ranges on creation and after any operation.

---

## 2. Input Formats

A color can be created from any of the following:

| Format          | Example                      | Notes                           |
|-----------------|------------------------------|---------------------------------|
| RGB integers    | `rgb(66, 135, 245)`         | Alpha defaults to 1             |
| RGBA            | `rgb(66, 135, 245, 0.5)`    |                                 |
| Hex string      | `"#4287f5"`, `"#48f"`       | 3 or 6 digit, `#` required     |
| HSL             | `fromHsl(217, 90, 61)`      | h: 0-360, s: 0-100, l: 0-100   |
| HSLA            | `fromHsla(217, 90, 61, 0.8)`|                                 |
| CSS string      | `"rgb(66,135,245)"`         | rgb, rgba, hsl, hsla functions  |
| Named color     | `"red"`, `"cornflowerblue"` | CSS named colors, case-insensitive |
| Integer         | `0x4287F5`                   | 24-bit RGB packed integer       |
| Gray shorthand  | `gray(128)` / `grey(128)`   | Sets r=g=b, optional alpha      |

---

## 3. Output Formats

Every color instance MUST support conversion to:

| Method           | Return type          | Example output                   |
|------------------|----------------------|----------------------------------|
| `toHex()`        | string               | `"#4287f5"`                      |
| `toCss()`        | string               | `"rgba(66,135,245,1)"`           |
| `toRgb()`        | `{r, g, b}`         | `{r: 66, g: 135, b: 245}`       |
| `toRgba()`       | `{r, g, b, a}`      | `{r: 66, g: 135, b: 245, a: 1}` |
| `toHsl()`        | `{h, s, l}`         | `{h: 217, s: 90, l: 61}`        |
| `toHsla()`       | `{h, s, l, a}`      | `{h: 217, s: 90, l: 61, a: 1}`  |
| `toArray()`      | `[r, g, b, a]`      | `[66, 135, 245, 1]`             |
| `toNormalized()` | `[r, g, b, a]`      | `[0.259, 0.529, 0.961, 1]` (0-1 range) |
| `toString()`     | string               | Same as `toCss()`                |

---

## 4. Channel Access

### 4.1 Getters

Read individual channels:

- `red()` / `green()` / `blue()` -> 0-255
- `hue()` -> 0-360
- `saturation()` / `lightness()` -> 0-100
- `alpha()` -> 0-1

### 4.2 Setters (return new instance)

- `withRed(v)` / `withGreen(v)` / `withBlue(v)` -> new color
- `withHue(v)` / `withSaturation(v)` / `withLightness(v)` -> new color
- `withAlpha(v)` -> new color

---

## 5. Color Adjustments

All adjustment methods return a new color instance.

| Method              | Param       | Description                                  |
|---------------------|-------------|----------------------------------------------|
| `lighten(amount)`   | 0 - 1       | Increase lightness toward white              |
| `darken(amount)`    | 0 - 1       | Decrease lightness toward black              |
| `brightness(factor)`| float       | Scale lightness by a factor                  |
| `saturate(amount)`  | 0 - 1       | Increase saturation                          |
| `desaturate(amount)`| 0 - 1       | Decrease saturation                          |
| `grayscale()`       | -           | Remove all saturation (s = 0)                |
| `rotate(degrees)`   | float       | Rotate hue on the color wheel                |
| `complement()`      | -           | Rotate hue by 180 degrees                    |
| `warm(amount)`      | 0 - 1       | Shift hue toward orange (default 0.2)        |
| `cool(amount)`      | 0 - 1       | Shift hue toward blue (default 0.2)          |
| `invert()`          | -           | Invert RGB channels (255 - value)            |
| `opacity(value)`    | 0 - 1       | Set alpha to value                           |
| `fade(amount)`      | 0 - 1       | Reduce alpha by percentage                   |
| `opaque()`          | -           | Set alpha to 1                               |

---

## 6. Color Harmony

Harmony methods return arrays of colors derived from the base color.

| Method                     | Returns | Description                              |
|----------------------------|---------|------------------------------------------|
| `triadic()`                | 3       | Colors spaced 120 degrees apart          |
| `tetradic()`               | 4       | Colors spaced 90 degrees apart (square)  |
| `analogous(angle?)`        | 3       | Adjacent colors (default angle: 30)      |
| `splitComplement(angle?)`  | 3       | Base + two colors at 180 +/- angle       |
| `complement()`             | 1       | Opposite on the color wheel              |
| `tints(count)`             | count   | Progressively lighter variations         |
| `shades(count)`            | count   | Progressively darker variations          |
| `tones(count)`             | count   | Progressively desaturated variations     |

---

## 7. Blending

### 7.1 Two-Color Blend

`blend(base, overlay, mode)` applies a blend mode and returns a new color.

Supported blend modes:

| Mode         | Formula (per channel, normalized 0-1)         |
|--------------|-----------------------------------------------|
| `multiply`   | `base * overlay`                              |
| `screen`     | `1 - (1 - base) * (1 - overlay)`             |
| `overlay`    | multiply if base < 0.5, screen otherwise      |
| `add`        | `clamp(base + overlay, 0, 1)`                |
| `subtract`   | `clamp(base - overlay, 0, 1)`                |

### 7.2 Interpolation

`mix(a, b, t)` / `lerp(a, b, t)` — Linear interpolation in RGB space. `t` ranges from 0 (= a) to 1 (= b). Default `t = 0.5`.

---

## 8. Analysis

| Method / Function     | Return  | Description                                           |
|-----------------------|---------|-------------------------------------------------------|
| `isLight()`           | bool    | `true` if lightness > 50                              |
| `isDark()`            | bool    | `true` if lightness <= 50                             |
| `luminance()`         | float   | Relative luminance per WCAG 2.1 (0-1)                |
| `contrast(a, b)`      | float   | WCAG contrast ratio between two colors (1-21)         |
| `distance(a, b)`      | float   | Euclidean distance in RGB space                       |

### 8.1 Luminance Formula

Per WCAG 2.1:

```
L = 0.2126 * R' + 0.7152 * G' + 0.0722 * B'
```

Where each channel C' is linearized:
- If C <= 0.04045: `C' = C / 12.92`
- Else: `C' = ((C + 0.055) / 1.055) ^ 2.4`

C is the channel value normalized to 0-1.

### 8.2 Contrast Ratio Formula

```
ratio = (L_lighter + 0.05) / (L_darker + 0.05)
```

---

## 9. Named Colors

The library MUST include all 148 CSS named colors (per CSS Color Level 4). Lookup MUST be case-insensitive.

A subset MUST be available as direct constants:
`white`, `black`, `red`, `green`, `blue`, `yellow`, `cyan`, `magenta`, `orange`, `purple`, `pink`, `lime`, `transparent`

---

## 10. Gradients

### 10.1 Gradient Types

**Linear gradient:**
- Start point (x0, y0) and end point (x1, y1)
- Array of color stops: `{ offset: 0-1, color: Color }`
- Optional `globalAlpha` multiplier

**Radial gradient:**
- Inner circle (x0, y0, r0) and outer circle (x1, y1, r1)
- Array of color stops: `{ offset: 0-1, color: Color }`
- Optional `globalAlpha` multiplier

### 10.2 Fill Type Union

A "fill" is one of:
- **Solid** — a single color
- **Linear gradient**
- **Radial gradient**

---

## 11. Random Color Generation

`random(options?)` generates a random color. Options constrain the output:

| Option       | Type                          | Description                  |
|--------------|-------------------------------|------------------------------|
| `hue`        | `"warm"` / `"cool"` / `[min, max]` | Constrain hue range    |
| `saturation` | `[min, max]`                 | Constrain saturation (0-100) |
| `lightness`  | `[min, max]`                 | Constrain lightness (0-100)  |
| `alpha`      | number                        | Fixed alpha value            |

---

## 12. Cross-Language Contract

All implementations MUST:

1. Use the same method names (adapted to language naming conventions — e.g. `to_hex()` in Python/Rust, `toHex()` in TypeScript/Kotlin)
2. Accept the same input formats (where the language supports it)
3. Produce identical output values for the same input
4. Maintain immutability of color instances
5. Clamp values to valid ranges

Implementations MAY add language-specific conveniences (operator overloading, protocol conformance, etc.) as long as the core API is preserved.

---

## Out of Scope (Future)

The following are explicitly **not** part of the MVP:

- CMYK color space
- Lab / LCH color space
- ICC color profiles
- Color palette generation algorithms (beyond harmony)
- Perceptual color difference (Delta E)
- Color blindness simulation
- CSS color-mix() function parsing
- HDR / wide-gamut color spaces
- Gradient interpolation in non-RGB spaces
