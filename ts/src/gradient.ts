import type {
  SolidKleur,
  LinearGradient,
  RadialGradient,
  GradientStop,
  KleurFill,
  KleurValue,
} from "./types.js";
import { InvalidOffsetError } from "./errors.js";
import { resolve } from "./parse.js";

const clampOffset = (v: number): number => {
  if (!Number.isFinite(v)) throw new InvalidOffsetError(v);
  return Math.min(1, Math.max(0, v));
};

/**
 * Create a clamped gradient stop.
 */
export function colorStop(offset: number, color: KleurValue): GradientStop {
  return { offset: clampOffset(offset), color: resolve(color) };
}

/**
 * Create a solid fill.
 */
export function solid(color: KleurValue): SolidKleur {
  return { type: "solid", color: resolve(color) };
}

/**
 * Create a linear gradient fill.
 */
export function linearGradient(config: {
  x0: number;
  y0: number;
  x1: number;
  y1: number;
  stops: GradientStop[];
  globalAlpha?: number;
}): LinearGradient {
  return {
    type: "linear",
    x0: config.x0,
    y0: config.y0,
    x1: config.x1,
    y1: config.y1,
    stops: config.stops.map((s) => colorStop(s.offset, s.color)),
    globalAlpha: config.globalAlpha,
  };
}

/**
 * Create a radial gradient fill.
 */
export function radialGradient(config: {
  x0: number;
  y0: number;
  r0: number;
  x1: number;
  y1: number;
  r1: number;
  stops: GradientStop[];
  globalAlpha?: number;
}): RadialGradient {
  return {
    type: "radial",
    x0: config.x0,
    y0: config.y0,
    r0: config.r0,
    x1: config.x1,
    y1: config.y1,
    r1: config.r1,
    stops: config.stops.map((s) => colorStop(s.offset, s.color)),
    globalAlpha: config.globalAlpha,
  };
}

// --- Builders ---

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

// --- Type guards ---

export function isSolid(fill: KleurFill): fill is SolidKleur {
  return fill.type === "solid";
}

export function isLinearGradient(fill: KleurFill): fill is LinearGradient {
  return fill.type === "linear";
}

export function isRadialGradient(fill: KleurFill): fill is RadialGradient {
  return fill.type === "radial";
}

export function isGradient(
  fill: KleurFill,
): fill is LinearGradient | RadialGradient {
  return fill.type === "linear" || fill.type === "radial";
}
