import type {
  SolidColor,
  LinearGradient,
  RadialGradient,
  GradientStop,
  KleurFill,
  KleurValue,
} from "./types.js";
import { InvalidOffsetError, KleurError } from "./errors.js";
import { resolve } from "./parse.js";

export function validateStops(stops: readonly GradientStop[]): void {
  if (stops.length === 0) {
    throw new KleurError("A gradient requires at least one color stop.");
  }
}

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
export function solid(color: KleurValue): SolidColor {
  return { type: "solid", color: resolve(color) };
}

/**
 * Create a linear gradient fill.
 */
export function linearGradient(options: {
  x0: number;
  y0: number;
  x1: number;
  y1: number;
  stops: GradientStop[];
  globalAlpha?: number;
}): LinearGradient {
  validateStops(options.stops);
  return {
    type: "linear",
    x0: options.x0,
    y0: options.y0,
    x1: options.x1,
    y1: options.y1,
    stops: options.stops.map((s) => colorStop(s.offset, s.color)),
    globalAlpha: options.globalAlpha,
  };
}

/**
 * Create a radial gradient fill.
 */
export function radialGradient(options: {
  x0: number;
  y0: number;
  r0: number;
  x1: number;
  y1: number;
  r1: number;
  stops: GradientStop[];
  globalAlpha?: number;
}): RadialGradient {
  validateStops(options.stops);
  return {
    type: "radial",
    x0: options.x0,
    y0: options.y0,
    r0: options.r0,
    x1: options.x1,
    y1: options.y1,
    r1: options.r1,
    stops: options.stops.map((s) => colorStop(s.offset, s.color)),
    globalAlpha: options.globalAlpha,
  };
}

// --- Type guards ---

export function isSolid(fill: KleurFill): fill is SolidColor {
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
