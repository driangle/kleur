import type {
  LinearGradient,
  RadialGradient,
  GradientStop,
  KleurValue,
} from "./types.js";
import { colorStop, validateStops } from "./gradient.js";

/**
 * Fluent builder for constructing linear gradients incrementally.
 */
export class LinearGradientBuilder {
  #x0 = 0;
  #y0 = 0;
  #x1 = 0;
  #y1 = 0;
  #stops: GradientStop[] = [];
  #globalAlpha?: number;

  from(x: number, y: number): this {
    this.#x0 = x;
    this.#y0 = y;
    return this;
  }

  to(x: number, y: number): this {
    this.#x1 = x;
    this.#y1 = y;
    return this;
  }

  addStop(offset: number, color: KleurValue): this {
    this.#stops.push(colorStop(offset, color));
    return this;
  }

  alpha(value: number): this {
    this.#globalAlpha = value;
    return this;
  }

  build(): LinearGradient {
    validateStops(this.#stops);
    return {
      type: "linear",
      x0: this.#x0,
      y0: this.#y0,
      x1: this.#x1,
      y1: this.#y1,
      stops: this.#stops,
      globalAlpha: this.#globalAlpha,
    };
  }
}

/**
 * Fluent builder for constructing radial gradients incrementally.
 */
export class RadialGradientBuilder {
  #x0 = 0;
  #y0 = 0;
  #r0 = 0;
  #x1 = 0;
  #y1 = 0;
  #r1 = 0;
  #stops: GradientStop[] = [];
  #globalAlpha?: number;

  from(x: number, y: number, r: number): this {
    this.#x0 = x;
    this.#y0 = y;
    this.#r0 = r;
    return this;
  }

  to(x: number, y: number, r: number): this {
    this.#x1 = x;
    this.#y1 = y;
    this.#r1 = r;
    return this;
  }

  addStop(offset: number, color: KleurValue): this {
    this.#stops.push(colorStop(offset, color));
    return this;
  }

  alpha(value: number): this {
    this.#globalAlpha = value;
    return this;
  }

  build(): RadialGradient {
    validateStops(this.#stops);
    return {
      type: "radial",
      x0: this.#x0,
      y0: this.#y0,
      r0: this.#r0,
      x1: this.#x1,
      y1: this.#y1,
      r1: this.#r1,
      stops: this.#stops,
      globalAlpha: this.#globalAlpha,
    };
  }
}
