# Python Library Spec

> Specification for `kleur`, a Python color manipulation library providing the same capabilities as the TypeScript implementation, adapted to idiomatic Python conventions.

**Package name:** `kleur`
**Minimum Python:** 3.10+
**Dependencies:** None (pure Python, zero dependencies)

---

## Design Principles

1. **API parity with TypeScript** — same capabilities, same color science, same test vectors.
2. **Idiomatic Python** — use `@property`, `__iter__`, `@dataclass`, snake_case, `Enum`, type hints, and Pythonic patterns rather than transliterating TypeScript idioms.
3. **Immutable by default** — all operations return new instances. `Color` is frozen (via `__slots__` or `@dataclass(frozen=True)` internally).
4. **Zero dependencies** — standard library only for the core package.

---

## Module Structure

```
kleur/
  __init__.py          # Public API re-exports
  color.py             # Color class
  parse.py             # rgb, hex, hsl, int_, css, grayscale, resolve
  palette.py           # Palette class
  blend.py             # blend modes, mix
  harmony.py           # triadic, tetradic, analogous, etc.
  analysis.py          # luminance, is_light, is_dark, contrast
  distance.py          # distance(), delta-E implementations
  color_spaces.py      # RGB ↔ LAB/OKLab/LCH/OKLch, sRGB linearization
  hsl.py               # RGB ↔ HSL
  hsb.py               # RGB ↔ HSB
  gradient.py          # solid, color_stop, linear/radial gradient, builders
  random.py            # random_color() with constraints
  named_colors.py      # Pre-computed Color constants
  css_color_data.py    # 147 CSS color name → hex mappings
  errors.py            # Exception hierarchy
  types.py             # TypedDict / NamedTuple / Enum definitions
  py.typed             # PEP 561 marker
```

---

## Core Types

### Data containers

Use `TypedDict` for return types and `NamedTuple` where unpacking is useful:

```python
class Rgb(TypedDict):
    r: int    # 0–255
    g: int    # 0–255
    b: int    # 0–255

class Rgba(Rgb):
    a: float  # 0–1

class Hsl(TypedDict):
    h: float  # 0–360
    s: float  # 0–100
    l: float  # 0–100

class Hsla(Hsl):
    a: float  # 0–1

class Hsb(TypedDict):
    h: float  # 0–360
    s: float  # 0–100
    b: float  # 0–100

class Hsba(Hsb):
    a: float  # 0–1
```

### Enums & Literals

```python
class BlendMode(str, Enum):
    MULTIPLY = "multiply"
    SCREEN = "screen"
    OVERLAY = "overlay"
    DARKEN = "darken"
    LIGHTEN = "lighten"
    COLOR_DODGE = "color_dodge"
    COLOR_BURN = "color_burn"
    HARD_LIGHT = "hard_light"
    SOFT_LIGHT = "soft_light"
    DIFFERENCE = "difference"
    EXCLUSION = "exclusion"
    ADD = "add"
    SUBTRACT = "subtract"

class DistancePreset(str, Enum):
    FAST = "fast"
    PERCEPTUAL = "perceptual"
    ACCURATE = "accurate"
    MODERN = "modern"

class DistanceSpace(str, Enum):
    RGB = "rgb"
    HSL = "hsl"
    LAB = "lab"
    LCH = "lch"
    OKLAB = "oklab"
    OKLCH = "oklch"

class DistanceMethod(str, Enum):
    EUCLIDEAN = "euclidean"
    DELTA_E76 = "delta_e76"
    DELTA_E94 = "delta_e94"
    DELTA_E2000 = "delta_e2000"
    DELTA_E_OK = "delta_e_ok"

class SortChannel(str, Enum):
    HUE = "hue"
    SATURATION = "saturation"
    LIGHTNESS = "lightness"
    BRIGHTNESS = "brightness"
    RED = "red"
    GREEN = "green"
    BLUE = "blue"
    ALPHA = "alpha"

class SortDirection(str, Enum):
    ASC = "asc"
    DESC = "desc"
```

### Union types

```python
# Any value accepted as a color input
KleurValue = str | int | Color

# Custom blend function signature
BlendFn = Callable[[Color, Color], Color]

# Blend mode: enum member or custom function
BlendModeInput = BlendMode | BlendFn

# Easing function
EaseFn = Callable[[float], float]
```

---

## Color Class

Immutable. All mutation methods return a new `Color`.

### Construction

The `Color` class is not constructed directly. Use the module-level factory functions (`rgb()`, `hex()`, etc.) or the `kleur()` convenience function.

### Properties (read-only)

```python
@property
def red(self) -> int: ...          # 0–255
@property
def green(self) -> int: ...        # 0–255
@property
def blue(self) -> int: ...         # 0–255
@property
def alpha(self) -> float: ...      # 0–1

@property
def hue(self) -> float: ...             # 0–360 (derived from HSL)
@property
def saturation_hsl(self) -> float: ...  # 0–100
@property
def lightness(self) -> float: ...       # 0–100

@property
def saturation_hsb(self) -> float: ...  # 0–100
@property
def brightness(self) -> float: ...      # 0–100

@property
def hsl(self) -> Hsl: ...
@property
def hsb(self) -> Hsb: ...
```

### Immutable Channel Setters

Each returns a new `Color`:

```python
def with_red(self, v: int) -> Color: ...
def with_green(self, v: int) -> Color: ...
def with_blue(self, v: int) -> Color: ...
def with_alpha(self, v: float) -> Color: ...
def with_hue(self, v: float) -> Color: ...
def with_saturation_hsl(self, v: float) -> Color: ...
def with_saturation_hsb(self, v: float) -> Color: ...
def with_brightness(self, v: float) -> Color: ...
def with_lightness(self, v: float) -> Color: ...
```

### Channel Adjustments

Delta operations (add/subtract from current value):

```python
def adjust_alpha(self, delta: float) -> Color: ...
def adjust_hue(self, delta: float) -> Color: ...
def adjust_saturation_hsl(self, delta: float) -> Color: ...
def adjust_saturation_hsb(self, delta: float) -> Color: ...
def adjust_brightness(self, delta: float) -> Color: ...
def adjust_lightness(self, delta: float) -> Color: ...
```

Scale operations (multiply current value by factor):

```python
def scale_alpha(self, factor: float) -> Color: ...
def scale_saturation_hsl(self, factor: float) -> Color: ...
def scale_saturation_hsb(self, factor: float) -> Color: ...
def scale_brightness(self, factor: float) -> Color: ...
def scale_lightness(self, factor: float) -> Color: ...
```

### Semantic Color Adjustments

```python
def lighten(self, amount: float) -> Color: ...        # 0–1, increase toward white
def darken(self, amount: float) -> Color: ...          # 0–1, decrease toward black
def saturate(self, amount: float) -> Color: ...        # 0–1, increase saturation
def desaturate(self, amount: float) -> Color: ...      # 0–1, decrease saturation
def grayscale(self) -> Color: ...                      # fully desaturate
def rotate(self, degrees: float) -> Color: ...         # adjust hue, wraps at 360
def complement(self) -> Color: ...                     # hue + 180
def warm(self, intensity: float = 0.2) -> Color: ...   # shift toward 30°
def cool(self, intensity: float = 0.2) -> Color: ...   # shift toward 240°
def invert(self) -> Color: ...                         # 255-r, 255-g, 255-b
def opaque(self) -> Color: ...                         # alpha = 1
```

### Interpolation & Blending (instance methods)

```python
def mix(self, target: KleurValue, t: float = 0.5, ease: EaseFn | None = None) -> Color: ...
def blend(self, overlay: KleurValue, mode: BlendModeInput) -> Color: ...
```

### Harmony Generation (instance methods)

Each returns a `Palette`:

```python
def triadic(self) -> Palette: ...
def tetradic(self) -> Palette: ...
def analogous(self, angle: float = 30) -> Palette: ...
def split_complement(self, angle: float = 30) -> Palette: ...
def tints(self, count: int) -> Palette: ...
def shades(self, count: int) -> Palette: ...
def tones(self, count: int) -> Palette: ...
```

### Output Formats

```python
def to_hex(self) -> str: ...          # "#rrggbb"
def to_hex8(self) -> str: ...         # "#rrggbbaa"
def to_css(self) -> str: ...          # "rgba(r, g, b, a)"
def to_rgb(self) -> Rgb: ...
def to_rgba(self) -> Rgba: ...
def to_hsl(self) -> Hsl: ...
def to_hsla(self) -> Hsla: ...
def to_hsb(self) -> Hsb: ...
def to_hsba(self) -> Hsba: ...
def to_array(self) -> tuple[int, int, int, float]: ...
def to_normalized(self) -> tuple[float, float, float, float]: ...  # WebGL: r/255, g/255, b/255, a
```

### Dunder Methods

```python
def __repr__(self) -> str: ...       # "Color(r=255, g=0, b=0, a=1.0)"
def __str__(self) -> str: ...        # same as to_css()
def __eq__(self, other) -> bool: ... # compare r, g, b, a
def __hash__(self) -> int: ...       # hashable (immutable)
```

---

## Module-Level Factory Functions

These are the primary way to create colors. All are importable from the top-level package.

```python
import kleur

# Universal constructor — resolves any KleurValue
kleur.color(value: KleurValue) -> Color
kleur.color(r: int, g: int, b: int, a: float = 1.0) -> Color

# Explicit constructors
kleur.rgb(r: int, g: int, b: int, a: float = 1.0) -> Color
kleur.hex(value: str) -> Color          # "#rgb", "#rgba", "#rrggbb", "#rrggbbaa"
kleur.hsl(h: float, s: float, l: float, a: float = 1.0) -> Color
kleur.int_(n: int) -> Color             # 0xRRGGBB packed integer (trailing _ avoids shadowing builtin)
kleur.css(value: str) -> Color          # "rgb(...)", "rgba(...)", "hsl(...)", "hsla(...)"
kleur.grayscale(value: int, alpha: float = 1.0) -> Color
kleur.resolve(value: KleurValue) -> Color  # universal resolver
```

### Named Color Constants

Pre-computed `Color` instances, accessible as module attributes:

```python
kleur.WHITE
kleur.BLACK
kleur.RED
kleur.GREEN
kleur.BLUE
kleur.YELLOW
kleur.CYAN
kleur.MAGENTA
kleur.ORANGE
kleur.PURPLE
kleur.PINK
kleur.LIME
kleur.TRANSPARENT
```

Constants are UPPER_CASE per Python convention.

### Random Color Generation

```python
kleur.random_color(
    *,
    hue: Literal["warm", "cool"] | tuple[float, float] | None = None,
    saturation: tuple[float, float] | None = None,
    lightness: tuple[float, float] | None = None,
    alpha: float | None = None,
    rng: Callable[[], float] | None = None,
) -> Color
```

- `hue="warm"`: 0–90° and 330–360°
- `hue="cool"`: 90–330°
- `hue=(min, max)`: explicit range
- `rng`: custom random number generator (must return `[0, 1)`)

---

## Analysis Functions

```python
kleur.luminance(color: KleurValue) -> float         # WCAG 2.1 relative luminance, 0–1
kleur.is_light(color: KleurValue) -> bool            # lightness > 50
kleur.is_dark(color: KleurValue) -> bool             # lightness <= 50
kleur.contrast(a: KleurValue, b: KleurValue) -> float  # WCAG contrast ratio, 1–21
```

---

## Distance Functions

```python
# With preset
kleur.distance(
    a: KleurValue,
    b: KleurValue,
    *,
    preset: DistancePreset = DistancePreset.PERCEPTUAL,
) -> float

# With explicit space + method
kleur.distance(
    a: KleurValue,
    b: KleurValue,
    *,
    space: DistanceSpace,
    method: DistanceMethod,
) -> float
```

**Presets:**

| Preset | Space | Method | Use case |
|--------|-------|--------|----------|
| `fast` | RGB | euclidean | Performance-critical |
| `perceptual` | LAB | deltaE94 | Balanced accuracy |
| `accurate` | LAB | deltaE2000 | Maximum accuracy |
| `modern` | OKLab | deltaEOK | Modern best practice |

**Valid combinations:**

- `euclidean` works with any space
- `delta_e76`, `delta_e94`, `delta_e2000` require `space=DistanceSpace.LAB`
- `delta_e_ok` requires `space=DistanceSpace.OKLAB`

Invalid combinations raise `InvalidDistanceCombinationError`.

---

## Blending & Interpolation

### Module-level functions

```python
kleur.blend(base: KleurValue, overlay: KleurValue, mode: BlendModeInput) -> Color
kleur.mix(a: KleurValue, b: KleurValue, t: float = 0.5, ease: EaseFn | None = None) -> Color
```

### Blend modes

All 13 standard blend modes via `BlendMode` enum. Custom blend functions are also accepted:

```python
def my_blend(base: Color, overlay: Color) -> Color:
    ...

result = kleur.blend(c1, c2, my_blend)
```

---

## Palette Class

Returned by harmony functions. Supports iteration, indexing, and bulk operations.

### Collection Protocol

```python
class Palette:
    def __len__(self) -> int: ...
    def __getitem__(self, index: int) -> Color: ...   # supports negative indexing
    def __iter__(self) -> Iterator[Color]: ...
    def __contains__(self, item: Color) -> bool: ...
    def __repr__(self) -> str: ...
```

### Functional Methods

```python
def map(self, fn: Callable[[Color], T]) -> list[T]: ...
def filter(self, fn: Callable[[Color], bool]) -> Palette: ...
def flat_map(self, fn: Callable[[Color], Iterable[Color]]) -> Palette: ...
def for_each(self, fn: Callable[[Color], None]) -> None: ...
def to_list(self) -> list[Color]: ...
```

### Bulk Color Operations

Each applies the operation to every color and returns a new `Palette`:

```python
def lighten(self, amount: float) -> Palette: ...
def darken(self, amount: float) -> Palette: ...
def saturate(self, amount: float) -> Palette: ...
def desaturate(self, amount: float) -> Palette: ...
def rotate(self, degrees: float) -> Palette: ...
def invert(self) -> Palette: ...
def complement(self) -> Palette: ...
def grayscale(self) -> Palette: ...
def opaque(self) -> Palette: ...
def warm(self, intensity: float = 0.2) -> Palette: ...
def cool(self, intensity: float = 0.2) -> Palette: ...
def mix(self, target: KleurValue, t: float = 0.5, ease: EaseFn | None = None) -> Palette: ...
def blend(self, overlay: KleurValue, mode: BlendModeInput) -> Palette: ...
```

### Palette Analysis & Transformation

```python
def sort_by(self, channel: SortChannel, direction: SortDirection = SortDirection.ASC) -> Palette: ...
def balance_lightness(self, target: float | None = None) -> Palette: ...
def spread(self, count: int) -> Palette: ...
def interpolate(self, steps: int, ease: EaseFn | None = None) -> Palette: ...
def harmonize(self, amount: float = 0.5) -> Palette: ...
def unique(self, threshold: float = 2.3) -> Palette: ...
```

---

## Gradients

### Types

```python
@dataclass(frozen=True)
class GradientStop:
    offset: float   # 0–1
    color: Color

@dataclass(frozen=True)
class SolidColor:
    color: Color

@dataclass(frozen=True)
class LinearGradient:
    x0: float
    y0: float
    x1: float
    y1: float
    stops: tuple[GradientStop, ...]
    global_alpha: float | None = None

@dataclass(frozen=True)
class RadialGradient:
    x0: float
    y0: float
    r0: float
    x1: float
    y1: float
    r1: float
    stops: tuple[GradientStop, ...]
    global_alpha: float | None = None

KleurFill = SolidColor | LinearGradient | RadialGradient
```

### Factory Functions

```python
kleur.color_stop(offset: float, color: KleurValue) -> GradientStop
kleur.solid(color: KleurValue) -> SolidColor
kleur.linear_gradient(
    *,
    x0: float, y0: float,
    x1: float, y1: float,
    stops: Sequence[GradientStop],
    global_alpha: float | None = None,
) -> LinearGradient
kleur.radial_gradient(
    *,
    x0: float, y0: float, r0: float,
    x1: float, y1: float, r1: float,
    stops: Sequence[GradientStop],
    global_alpha: float | None = None,
) -> RadialGradient
```

### Type Guards

```python
kleur.is_solid(fill: KleurFill) -> TypeGuard[SolidColor]: ...
kleur.is_linear_gradient(fill: KleurFill) -> TypeGuard[LinearGradient]: ...
kleur.is_radial_gradient(fill: KleurFill) -> TypeGuard[RadialGradient]: ...
kleur.is_gradient(fill: KleurFill) -> TypeGuard[LinearGradient | RadialGradient]: ...
```

### Builder Classes

Fluent API for incremental gradient construction:

```python
class LinearGradientBuilder:
    def __init__(self, *, x0: float, y0: float, x1: float, y1: float) -> None: ...
    def stop(self, offset: float, color: KleurValue) -> LinearGradientBuilder: ...
    def alpha(self, value: float) -> LinearGradientBuilder: ...
    def build(self) -> LinearGradient: ...

class RadialGradientBuilder:
    def __init__(self, *, x0: float, y0: float, r0: float, x1: float, y1: float, r1: float) -> None: ...
    def stop(self, offset: float, color: KleurValue) -> RadialGradientBuilder: ...
    def alpha(self, value: float) -> RadialGradientBuilder: ...
    def build(self) -> RadialGradient: ...
```

Builder methods return `self` to enable chaining. Builders are mutable (they accumulate stops), but `build()` produces an immutable gradient.

---

## Harmony Functions (module-level)

```python
kleur.triadic(color: KleurValue) -> Palette
kleur.tetradic(color: KleurValue) -> Palette
kleur.analogous(color: KleurValue, angle: float = 30) -> Palette
kleur.split_complement(color: KleurValue, angle: float = 30) -> Palette
kleur.tints(color: KleurValue, count: int) -> Palette
kleur.shades(color: KleurValue, count: int) -> Palette
kleur.tones(color: KleurValue, count: int) -> Palette
```

---

## Error Hierarchy

All exceptions extend a common base class:

```python
class KleurError(Exception):
    """Base exception for all kleur errors."""

class ParseError(KleurError):
    kind: Literal["hex", "css", "named", "value"]
    input: object
    reason: Literal["missing_prefix", "invalid_length", "invalid_digits"] | None

class UnknownOptionError(KleurError):
    kind: Literal["distance_preset", "color_space", "distance_method", "blend_mode"]
    value: str
    valid_options: tuple[str, ...]

class InvalidChannelError(KleurError):
    kind: Literal["byte", "alpha"]
    value: float

class InvalidCountError(KleurError):
    value: int

class InvalidOffsetError(KleurError):
    value: float

class InvalidDistanceCombinationError(KleurError):
    method: str
    space: str
    valid_spaces: tuple[str, ...]
```

---

## Validation & Clamping Rules

These rules match the TypeScript implementation exactly:

| Channel | Range | Behavior |
|---------|-------|----------|
| RGB (r, g, b) | 0–255 | Clamped, rounded to `int` |
| Alpha | 0–1 | Clamped to `[0, 1]` |
| Hue | 0–360 | Normalized: `((v % 360) + 360) % 360` |
| Saturation/Lightness | 0–100 | Clamped to `[0, 100]` |
| `NaN` / `inf` in RGB or alpha | — | Raises `InvalidChannelError` |
| Gradient offset | 0–1 | Clamped; `NaN`/`inf` raises `InvalidOffsetError` |
| Count (tints, shades, etc.) | ≥ 0, integer | Raises `InvalidCountError` if negative or non-integer |

---

## Naming Conventions: TypeScript → Python

| TypeScript | Python | Rationale |
|------------|--------|-----------|
| `camelCase` methods | `snake_case` methods | PEP 8 |
| `readonly` properties | `@property` (no setter) | Pythonic immutability |
| `#private` fields | `_private` with `__slots__` | Python convention |
| `kleur()` callable | `kleur.color()` function | Python modules aren't callable; explicit is better |
| `kleur.int()` | `kleur.int_()` | Avoids shadowing `int` builtin |
| Named color `.red` | Named color `RED` | PEP 8 constant naming |
| `colorDodge` blend mode | `color_dodge` | snake_case enums |
| `random()` | `random_color()` | Avoids shadowing `random` module |
| `splitComplement()` | `split_complement()` | snake_case |
| `balanceLightness()` | `balance_lightness()` | snake_case |
| `toHex()` | `to_hex()` | snake_case |
| `flatMap()` | `flat_map()` | snake_case |
| `forEach()` | `for_each()` | snake_case |
| `toArray()` | `to_list()` (Palette), `to_array()` (Color) | Palette returns a list; Color returns a tuple |
| `[Symbol.iterator]` | `__iter__` | Python iterator protocol |
| interface / TypedDict | `TypedDict` | Structural typing |

---

## Cross-Language Test Vectors

The Python library must pass the same test vectors as the TypeScript implementation to guarantee behavioral parity. A shared `vectors.json` file at the repository root defines canonical input/output pairs for:

- Color parsing (hex, CSS, named, int)
- Channel access (RGB, HSL, HSB)
- Color adjustments (lighten, darken, saturate, desaturate, rotate, warm, cool)
- Blend modes (all 13)
- Mix interpolation
- Harmony generation
- Luminance, contrast, distance
- Output formats

Both implementations read from the same vectors file in their test suites.

---

## Usage Examples

### Basic color creation and manipulation

```python
import kleur

red = kleur.rgb(255, 0, 0)
sky = kleur.hex("#87CEEB")
coral = kleur.hsl(16, 100, 66)

# Resolve any value
c = kleur.resolve("#ff6347")
c = kleur.resolve(0xFF6347)
c = kleur.resolve("tomato")

# Manipulate (all return new Color)
light_red = red.lighten(0.3)
muted = sky.desaturate(0.5)
opposite = coral.complement()
```

### Palette operations

```python
palette = kleur.resolve("teal").analogous()
lighter = palette.lighten(0.2)
sorted_pal = lighter.sort_by(kleur.SortChannel.HUE)

for color in sorted_pal:
    print(color.to_hex())
```

### Color analysis

```python
bg = kleur.hex("#1a1a2e")
fg = kleur.hex("#e0e0e0")

ratio = kleur.contrast(bg, fg)
print(f"Contrast ratio: {ratio:.1f}:1")
print(f"Background is {'dark' if kleur.is_dark(bg) else 'light'}")
```

### Gradients

```python
gradient = (
    kleur.LinearGradientBuilder(x0=0, y0=0, x1=1, y1=0)
    .stop(0.0, "#ff0000")
    .stop(0.5, "#00ff00")
    .stop(1.0, "#0000ff")
    .build()
)
```

### Distance

```python
d = kleur.distance("coral", "salmon", preset=kleur.DistancePreset.ACCURATE)

d = kleur.distance(
    "#ff0000", "#00ff00",
    space=kleur.DistanceSpace.LAB,
    method=kleur.DistanceMethod.DELTA_E2000,
)
```
