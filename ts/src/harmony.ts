import { resolve } from "./parse.js";
import { Palette } from "./palette.js";
import type { KleurValue } from "./types.js";

/**
 * Return 3 colors spaced 120 degrees apart on the color wheel.
 */
export function triadic(color: KleurValue): Palette {
  return new Palette(resolve(color).triadic());
}

/**
 * Return 4 colors spaced 90 degrees apart (square harmony).
 */
export function tetradic(color: KleurValue): Palette {
  return new Palette(resolve(color).tetradic());
}

/**
 * Return 3 adjacent colors. Default angle: 30 degrees.
 */
export function analogous(color: KleurValue, angle = 30): Palette {
  return new Palette(resolve(color).analogous(angle));
}

/**
 * Return 3 colors: base + two at 180 +/- angle.
 */
export function splitComplement(color: KleurValue, angle = 30): Palette {
  return new Palette(resolve(color).splitComplement(angle));
}

/**
 * Return `count` progressively lighter variations.
 */
export function tints(color: KleurValue, count: number): Palette {
  return new Palette(resolve(color).tints(count));
}

/**
 * Return `count` progressively darker variations.
 */
export function shades(color: KleurValue, count: number): Palette {
  return new Palette(resolve(color).shades(count));
}

/**
 * Return `count` progressively desaturated variations.
 */
export function tones(color: KleurValue, count: number): Palette {
  return new Palette(resolve(color).tones(count));
}
