import { Color } from "./color.js";

/**
 * Return 3 colors spaced 120 degrees apart on the color wheel.
 */
export function triadic(color: Color): [Color, Color, Color] {
  return color.triadic();
}

/**
 * Return 4 colors spaced 90 degrees apart (square harmony).
 */
export function tetradic(color: Color): [Color, Color, Color, Color] {
  return color.tetradic();
}

/**
 * Return 3 adjacent colors. Default angle: 30 degrees.
 */
export function analogous(color: Color, angle = 30): [Color, Color, Color] {
  return color.analogous(angle);
}

/**
 * Return 3 colors: base + two at 180 +/- angle.
 */
export function splitComplement(color: Color, angle = 30): [Color, Color, Color] {
  return color.splitComplement(angle);
}

/**
 * Return `count` progressively lighter variations.
 */
export function tints(color: Color, count: number): Color[] {
  return color.tints(count);
}

/**
 * Return `count` progressively darker variations.
 */
export function shades(color: Color, count: number): Color[] {
  return color.shades(count);
}

/**
 * Return `count` progressively desaturated variations.
 */
export function tones(color: Color, count: number): Color[] {
  return color.tones(count);
}
