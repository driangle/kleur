# Vanilla JS

Use kleur with plain DOM APIs to interpolate colors, style elements dynamically, and build data visualizations — no framework required.

## Color Interpolation

<a href="./vanilla-interpolation" class="kl-demo-link">Open Demo &rarr;</a>

The most common pattern is mapping a range of values to a color gradient using `kleur.mix()`. Each element gets a color interpolated between two endpoints based on its position.

```js
import kleur from "@driangle/kleur";

const from = kleur("#1a1a8e");
const to   = kleur("#e8a030");
const bars = document.querySelectorAll(".bar");

bars.forEach((bar, i) => {
  const t = i / (bars.length - 1);
  const color = kleur.mix(from, to, t);

  bar.style.backgroundColor = color.toHex();
  bar.style.color = kleur.isLight(color) ? "#111" : "#f5f5f5";
});
```

`kleur.mix(a, b, t)` returns a new `Color` interpolated at position `t` (0–1). The result works with any DOM style property via `.toHex()` or `.toCss()`.

## Scroll-Driven Color

<a href="./vanilla-scroll-color" class="kl-demo-link">Open Demo &rarr;</a>

Combine `kleur.mix()` with scroll position to create smooth color transitions:

```js
const start = kleur("#0d0d0d");
const end   = kleur("#f5f5f5");

window.addEventListener("scroll", () => {
  const t = window.scrollY / (document.body.scrollHeight - window.innerHeight);
  document.body.style.backgroundColor = kleur.mix(start, end, t).toHex();
});
```

## Data-Driven Styling

<a href="./vanilla-data-styling" class="kl-demo-link">Open Demo &rarr;</a>

Use `.toRgb()` when you need individual channel values, or `.toCss()` for direct CSS assignment:

```js
const color = kleur("#3a6bd5");
const { r, g, b } = color.toRgb();

// Use channels individually
element.style.borderColor = `rgba(${r}, ${g}, ${b}, 0.5)`;

// Or use toCss() directly
element.style.backgroundColor = color.lighten(0.2).toCss();
```
