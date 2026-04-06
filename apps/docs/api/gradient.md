# Gradients

Functions for creating gradient and solid fill objects, plus type guards for discriminating between fill types.

```ts
import kleur from "@driangle/kleur";
// kleur.linearGradient(...), kleur.isSolid(...), etc.
```

## colorStop

```ts
colorStop(offset: number, color: KleurValue): GradientStop
```

Create a gradient stop. The offset is clamped to 0-1. Accepts any color input.

```ts
const stop = kleur.colorStop(0.5, "#ff6600");
```

## solid

```ts
solid(color: KleurValue): SolidColor
```

Create a solid fill from a single color. Accepts any color input.

```ts
const fill = kleur.solid("#ff6600");
fill.type;  // "solid"
fill.color; // Color
```

## linearGradient

```ts
linearGradient(config: {
  x0: number;
  y0: number;
  x1: number;
  y1: number;
  stops: GradientStop[];
  globalAlpha?: number;
}): LinearGradient
```

Create a linear gradient fill. Coordinates define the gradient line; stops define color transitions.

```ts
const gradient = kleur.linearGradient({
  x0: 0, y0: 0,
  x1: 100, y1: 0,
  stops: [
    kleur.colorStop(0, "#ff0000"),
    kleur.colorStop(1, "#0000ff"),
  ],
});
```

## radialGradient

```ts
radialGradient(config: {
  x0: number;
  y0: number;
  r0: number;
  x1: number;
  y1: number;
  r1: number;
  stops: GradientStop[];
  globalAlpha?: number;
}): RadialGradient
```

Create a radial gradient fill. Defines two circles (start and end) with color stops.

```ts
const gradient = kleur.radialGradient({
  x0: 50, y0: 50, r0: 0,
  x1: 50, y1: 50, r1: 50,
  stops: [
    kleur.colorStop(0, "#ffffff"),
    kleur.colorStop(1, "#000000"),
  ],
});
```

## Gradient Builders

For building gradients incrementally, use the builder classes. They support fluent chaining and produce the same result as the config-object API.

### LinearGradientBuilder

```ts
import { LinearGradientBuilder } from "@driangle/kleur";

const gradient = new LinearGradientBuilder()
  .from(0, 0)
  .to(100, 0)
  .addStop(0, "#ff0000")
  .addStop(0.5, "#00ff00")
  .addStop(1, "#0000ff")
  .alpha(0.8)
  .build();
```

| Method | Description |
|---|---|
| `from(x, y)` | Set start coordinates |
| `to(x, y)` | Set end coordinates |
| `addStop(offset, color)` | Add a color stop (offset clamped to 0-1) |
| `alpha(value)` | Set global alpha |
| `build()` | Returns a `LinearGradient` |

### RadialGradientBuilder

```ts
import { RadialGradientBuilder } from "@driangle/kleur";

const gradient = new RadialGradientBuilder()
  .from(50, 50, 0)
  .to(50, 50, 100)
  .addStop(0, "#ffffff")
  .addStop(1, "#000000")
  .build();
```

| Method | Description |
|---|---|
| `from(x, y, r)` | Set start circle (center + radius) |
| `to(x, y, r)` | Set end circle (center + radius) |
| `addStop(offset, color)` | Add a color stop (offset clamped to 0-1) |
| `alpha(value)` | Set global alpha |
| `build()` | Returns a `RadialGradient` |

## Type Guards

Use these to narrow `KleurFill` union types:

```ts
isSolid(fill: KleurFill): fill is SolidColor
isLinearGradient(fill: KleurFill): fill is LinearGradient
isRadialGradient(fill: KleurFill): fill is RadialGradient
isGradient(fill: KleurFill): fill is LinearGradient | RadialGradient
```

```ts
function render(fill: KleurFill) {
  if (kleur.isSolid(fill)) {
    // fill.color is Color
  } else if (kleur.isLinearGradient(fill)) {
    // fill.x0, fill.y0, fill.x1, fill.y1, fill.stops
  } else if (kleur.isRadialGradient(fill)) {
    // fill.x0, fill.y0, fill.r0, fill.x1, fill.y1, fill.r1, fill.stops
  }
}
```
