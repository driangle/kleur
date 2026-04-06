import { Color } from "./color.js";
import { hslToRgb } from "./hsl.js";

export interface RandomOptions {
  /** Constrain hue: "warm", "cool", or [min, max] range (0-360) */
  hue?: "warm" | "cool" | [number, number];
  /** Constrain saturation: [min, max] range (0-100) */
  saturation?: [number, number];
  /** Constrain lightness: [min, max] range (0-100) */
  lightness?: [number, number];
  /** Fixed alpha value (0-1) */
  alpha?: number;
}

function randInRange(min: number, max: number): number {
  const lo = Math.min(min, max);
  const hi = Math.max(min, max);
  return lo + Math.random() * (hi - lo);
}

function randomHue(option?: "warm" | "cool" | [number, number]): number {
  if (!option) {
    return randInRange(0, 360);
  }
  if (Array.isArray(option)) {
    return randInRange(option[0], option[1]);
  }
  if (option === "warm") {
    // Warm: 0-90 and 330-360
    // Pick from combined range (total 120°)
    const r = Math.random() * 120;
    return r < 90 ? r : 330 + (r - 90);
  }
  // Cool: 90-330
  return randInRange(90, 330);
}

/**
 * Generate a random color with optional constraints.
 */
export function random(options?: RandomOptions): Color {
  const h = randomHue(options?.hue);
  const s = options?.saturation
    ? randInRange(options.saturation[0], options.saturation[1])
    : randInRange(0, 100);
  const l = options?.lightness
    ? randInRange(options.lightness[0], options.lightness[1])
    : randInRange(0, 100);
  const a = options?.alpha ?? 1;

  const { r, g, b } = hslToRgb(h, s, l);
  return new Color(r, g, b, a);
}
