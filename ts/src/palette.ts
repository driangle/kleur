import { Color } from "./color.js";
import type { KleurValue, BlendMode } from "./types.js";

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
}
