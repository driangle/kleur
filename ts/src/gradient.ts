import type {
  SolidKleur,
  LinearGradient,
  RadialGradient,
  GradientStop,
  Kleur,
} from "./types.js";
import { KleurStruct } from "./kleur-struct.js";

const clampOffset = (v: number): number => Math.min(1, Math.max(0, v));

/**
 * Create a clamped gradient stop.
 */
export function colorStop(offset: number, color: KleurStruct): GradientStop {
  return { offset: clampOffset(offset), color };
}

/**
 * Create a solid fill.
 */
export function solid(color: KleurStruct): SolidKleur {
  return { type: "solid", color };
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

// --- Type guards ---

export function isSolid(fill: Kleur): fill is SolidKleur {
  return fill.type === "solid";
}

export function isLinearGradient(fill: Kleur): fill is LinearGradient {
  return fill.type === "linear";
}

export function isRadialGradient(fill: Kleur): fill is RadialGradient {
  return fill.type === "radial";
}

export function isGradient(fill: Kleur): fill is LinearGradient | RadialGradient {
  return fill.type === "linear" || fill.type === "radial";
}
