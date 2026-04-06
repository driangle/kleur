# p5.js

<a href="./p5js-demo" class="kl-demo-link">Open Standalone Demo &rarr;</a>

Use kleur to generate harmonious color palettes for p5.js sketches. kleur's harmony methods and palette spreading produce rich, coherent color sets that feed directly into p5's `fill()` and `stroke()` functions.

## Palette-Driven Generative Grid

The core pattern: pick a base color, generate a harmony, spread it across as many cells as you need, and iterate:

```js
import kleur from "@driangle/kleur";

const base = kleur("#e84393");
const palette = base.analogous().spread(100);

function setup() {
  createCanvas(400, 400);
  noLoop();
}

function draw() {
  const size = width / 10;
  let i = 0;

  for (const color of palette) {
    const [r, g, b] = color.toArray();
    fill(r, g, b);
    noStroke();
    rect((i % 10) * size, Math.floor(i / 10) * size, size, size);
    i++;
  }
}
```

`palette.spread(n)` resamples the harmony into exactly `n` colors by interpolating between the harmony's anchor points. The result is iterable, so you can use `for...of` directly.

<P5SketchDemo />

## Random Variations

Use `kleur.random()` with constrained ranges for generative variation while staying within a cohesive color space:

```js
function draw() {
  for (let i = 0; i < 50; i++) {
    const color = kleur.random({
      hue: "warm",
      saturation: [40, 80],
      lightness: [30, 70],
    });
    const [r, g, b] = color.toArray();
    fill(r, g, b);
    ellipse(random(width), random(height), 20, 20);
  }
}
```

## Color Output Formats

p5.js accepts colors in several ways. kleur provides matching output methods:

```js
const color = kleur("#e84393");

// RGB components for fill(r, g, b)
const [r, g, b] = color.toArray();

// Hex string for fill("#e84393")
const hex = color.toHex();

// CSS string for p5's color() function
const css = color.toCss();
```
