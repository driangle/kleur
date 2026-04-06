import { Color, registerPalette } from "./color.js";
import { distance } from "./distance.js";
import type { KleurValue, BlendMode } from "./types.js";

export type PaletteSortChannel =
  | "hue" | "saturation" | "lightness" | "brightness"
  | "red" | "green" | "blue" | "alpha";

const channelAccessor: Record<PaletteSortChannel, (c: Color) => number> = {
  hue: (c) => c.hue,
  saturation: (c) => c.saturationHsl,
  lightness: (c) => c.lightness,
  brightness: (c) => c.brightness,
  red: (c) => c.red,
  green: (c) => c.green,
  blue: (c) => c.blue,
  alpha: (c) => c.alpha,
};

function harmonicTargets(colors: readonly Color[]): number[] {
  let sinSum = 0, cosSum = 0;
  for (const c of colors) {
    const rad = (c.hue * Math.PI) / 180;
    sinSum += Math.sin(rad);
    cosSum += Math.cos(rad);
  }
  const mean = ((Math.atan2(sinSum, cosSum) * 180) / Math.PI + 360) % 360;
  const n = colors.length;
  const targets = Array.from({ length: n }, (_, i) => (mean + (i * 360) / n) % 360);
  const used = new Set<number>();
  return colors.map((c) => {
    let best = 0, bestD = Infinity;
    for (let i = 0; i < n; i++) {
      if (used.has(i)) continue;
      const d = Math.abs(((c.hue - targets[i] + 540) % 360) - 180);
      if (d < bestD) { bestD = d; best = i; }
    }
    used.add(best);
    return targets[best];
  });
}

/**
 * A collection of colors with convenient bulk operations.
 *
 * Returned by harmony functions and supports iteration, destructuring,
 * and palette-wide color transformations.
 */
export class Palette {
  readonly #colors: readonly Color[];

  constructor(colors: readonly Color[]) {
    this.#colors = colors;
  }

  get length(): number {
    return this.#colors.length;
  }

  at(index: number): Color | undefined {
    const i = index < 0 ? this.#colors.length + index : index;
    return this.#colors[i];
  }

  toArray(): Color[] {
    return [...this.#colors];
  }

  [Symbol.iterator](): Iterator<Color> {
    return this.#colors[Symbol.iterator]();
  }

  // --- Collection operations ---

  map<T>(fn: (color: Color, index: number) => T): T[] {
    return this.#colors.map((c, i) => fn(c, i));
  }

  filter(fn: (color: Color, index: number) => boolean): Palette {
    return new Palette(this.#colors.filter((c, i) => fn(c, i)));
  }

  forEach(fn: (color: Color, index: number) => void): void {
    this.#colors.forEach((c, i) => fn(c, i));
  }

  flatMap(fn: (color: Color, index: number) => Color[] | Palette): Palette {
    const result: Color[] = [];
    this.#colors.forEach((c, i) => {
      const output = fn(c, i);
      for (const color of output) result.push(color);
    });
    return new Palette(result);
  }

  // --- Bulk color adjustments (each returns a new Palette) ---
  #mapColors(fn: (c: Color) => Color): Palette { return new Palette(this.#colors.map(fn)); }
  lighten(amount: number): Palette { return this.#mapColors((c) => c.lighten(amount)); }
  darken(amount: number): Palette { return this.#mapColors((c) => c.darken(amount)); }
  saturate(amount: number): Palette { return this.#mapColors((c) => c.saturate(amount)); }
  desaturate(amount: number): Palette { return this.#mapColors((c) => c.desaturate(amount)); }
  rotate(degrees: number): Palette { return this.#mapColors((c) => c.rotate(degrees)); }
  invert(): Palette { return this.#mapColors((c) => c.invert()); }
  complement(): Palette { return this.#mapColors((c) => c.complement()); }
  grayscale(): Palette { return this.#mapColors((c) => c.grayscale()); }
  opaque(): Palette { return this.#mapColors((c) => c.opaque()); }
  warm(amount = 0.2): Palette { return this.#mapColors((c) => c.warm(amount)); }
  cool(amount = 0.2): Palette { return this.#mapColors((c) => c.cool(amount)); }
  mix(target: KleurValue, t = 0.5, ease?: (t: number) => number): Palette {
    return this.#mapColors((c) => c.mix(target, t, ease));
  }
  blend(overlay: KleurValue, mode: BlendMode): Palette {
    return this.#mapColors((c) => c.blend(overlay, mode));
  }

  /** Sort colors by a channel. Returns a new Palette. */
  sortBy(channel: PaletteSortChannel, direction: "asc" | "desc" = "asc"): Palette {
    const accessor = channelAccessor[channel];
    const sorted = [...this.#colors].sort((a, b) => {
      const diff = accessor(a) - accessor(b);
      return direction === "desc" ? -diff : diff;
    });
    return new Palette(sorted);
  }

  /** Resample the palette to exactly `count` colors by interpolating between existing colors. */
  spread(count: number): Palette {
    return this.interpolate(count);
  }

  /** Generate a smooth color ramp of `steps` colors. Optional `ease` controls the interpolation curve. */
  interpolate(steps: number, ease?: (t: number) => number): Palette {
    if (steps <= 0 || this.#colors.length === 0) return new Palette([]);
    if (steps === 1) return new Palette([this.#colors[0]]);
    if (this.#colors.length === 1) return new Palette(Array(steps).fill(this.#colors[0]));
    const result: Color[] = [];
    const segments = this.#colors.length - 1;
    for (let i = 0; i < steps; i++) {
      const t = (i / (steps - 1)) * segments;
      const seg = Math.min(Math.floor(t), segments - 1);
      const local = t - seg;
      result.push(this.#colors[seg].mix(this.#colors[seg + 1], local, ease));
    }
    return new Palette(result);
  }

  /** Nudge hues toward harmonic spacing. `amount` 0–1 controls shift strength. */
  harmonize(amount = 0.5): Palette {
    if (this.#colors.length <= 1) return new Palette([...this.#colors]);
    const targets = harmonicTargets(this.#colors);
    return new Palette(this.#colors.map((c, i) => {
      const delta = (((targets[i] - c.hue + 540) % 360) - 180) * amount;
      return c.rotate(delta);
    }));
  }

  /** Remove perceptually near-duplicate colors, keeping the first occurrence. */
  unique(threshold = 2.3): Palette {
    const kept: Color[] = [];
    for (const color of this.#colors) {
      const isDuplicate = kept.some(
        (c) => distance(c, color, { preset: "perceptual" }) < threshold,
      );
      if (!isDuplicate) kept.push(color);
    }
    return new Palette(kept);
  }
}

registerPalette((colors) => new Palette(colors));
