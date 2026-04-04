import { Color } from "./color.js";

/**
 * Return 3 colors spaced 120 degrees apart on the color wheel.
 */
export function triadic(color: Color): [Color, Color, Color] {
  return [color, color.rotate(120), color.rotate(240)];
}

/**
 * Return 4 colors spaced 90 degrees apart (square harmony).
 */
export function tetradic(color: Color): [Color, Color, Color, Color] {
  return [color, color.rotate(90), color.rotate(180), color.rotate(270)];
}

/**
 * Return 3 adjacent colors. Default angle: 30 degrees.
 */
export function analogous(color: Color, angle = 30): [Color, Color, Color] {
  return [color.rotate(-angle), color, color.rotate(angle)];
}

/**
 * Return 3 colors: base + two at 180 +/- angle.
 */
export function splitComplement(color: Color, angle = 30): [Color, Color, Color] {
  return [color, color.rotate(180 - angle), color.rotate(180 + angle)];
}

/**
 * Return `count` progressively lighter variations.
 */
export function tints(color: Color, count: number): Color[] {
  const result: Color[] = [];
  for (let i = 1; i <= count; i++) {
    result.push(color.lighten(i / (count + 1)));
  }
  return result;
}

/**
 * Return `count` progressively darker variations.
 */
export function shades(color: Color, count: number): Color[] {
  const result: Color[] = [];
  for (let i = 1; i <= count; i++) {
    result.push(color.darken(i / (count + 1)));
  }
  return result;
}

/**
 * Return `count` progressively desaturated variations.
 */
export function tones(color: Color, count: number): Color[] {
  const result: Color[] = [];
  for (let i = 1; i <= count; i++) {
    result.push(color.desaturate(i / (count + 1)));
  }
  return result;
}
