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

  // --- Bulk color adjustments ---

  lighten(amount: number): Palette {
    return new Palette(this.#colors.map((c) => c.lighten(amount)));
  }

  darken(amount: number): Palette {
    return new Palette(this.#colors.map((c) => c.darken(amount)));
  }

  saturate(amount: number): Palette {
    return new Palette(this.#colors.map((c) => c.saturate(amount)));
  }

  desaturate(amount: number): Palette {
    return new Palette(this.#colors.map((c) => c.desaturate(amount)));
  }

  rotate(degrees: number): Palette {
    return new Palette(this.#colors.map((c) => c.rotate(degrees)));
  }

  invert(): Palette {
    return new Palette(this.#colors.map((c) => c.invert()));
  }

  complement(): Palette {
    return new Palette(this.#colors.map((c) => c.complement()));
  }

  grayscale(): Palette {
    return new Palette(this.#colors.map((c) => c.grayscale()));
  }

  opaque(): Palette {
    return new Palette(this.#colors.map((c) => c.opaque()));
  }

  warm(amount = 0.2): Palette {
    return new Palette(this.#colors.map((c) => c.warm(amount)));
  }

  cool(amount = 0.2): Palette {
    return new Palette(this.#colors.map((c) => c.cool(amount)));
  }

  mix(target: KleurValue, t = 0.5, ease?: (t: number) => number): Palette {
    return new Palette(this.#colors.map((c) => c.mix(target, t, ease)));
  }

  blend(overlay: KleurValue, mode: BlendMode): Palette {
    return new Palette(this.#colors.map((c) => c.blend(overlay, mode)));
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
    if (count <= 0 || this.#colors.length === 0) return new Palette([]);
    if (count === 1) return new Palette([this.#colors[0]]);
    if (this.#colors.length === 1) return new Palette(Array(count).fill(this.#colors[0]));
    const result: Color[] = [];
    const segments = this.#colors.length - 1;
    for (let i = 0; i < count; i++) {
      const t = (i / (count - 1)) * segments;
      const seg = Math.min(Math.floor(t), segments - 1);
      const local = t - seg;
      result.push(this.#colors[seg].mix(this.#colors[seg + 1], local));
    }
    return new Palette(result);
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
