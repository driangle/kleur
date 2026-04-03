import { KleurStruct } from "./kleur-struct.js";

/**
 * Return 3 colors spaced 120 degrees apart on the color wheel.
 */
export function triadic(color: KleurStruct): [KleurStruct, KleurStruct, KleurStruct] {
  return [color, color.rotate(120), color.rotate(240)];
}

/**
 * Return 4 colors spaced 90 degrees apart (square harmony).
 */
export function tetradic(color: KleurStruct): [KleurStruct, KleurStruct, KleurStruct, KleurStruct] {
  return [color, color.rotate(90), color.rotate(180), color.rotate(270)];
}

/**
 * Return 3 adjacent colors. Default angle: 30 degrees.
 */
export function analogous(color: KleurStruct, angle = 30): [KleurStruct, KleurStruct, KleurStruct] {
  return [color.rotate(-angle), color, color.rotate(angle)];
}

/**
 * Return 3 colors: base + two at 180 +/- angle.
 */
export function splitComplement(color: KleurStruct, angle = 30): [KleurStruct, KleurStruct, KleurStruct] {
  return [color, color.rotate(180 - angle), color.rotate(180 + angle)];
}

/**
 * Return `count` progressively lighter variations.
 */
export function tints(color: KleurStruct, count: number): KleurStruct[] {
  const result: KleurStruct[] = [];
  for (let i = 1; i <= count; i++) {
    result.push(color.lighten(i / (count + 1)));
  }
  return result;
}

/**
 * Return `count` progressively darker variations.
 */
export function shades(color: KleurStruct, count: number): KleurStruct[] {
  const result: KleurStruct[] = [];
  for (let i = 1; i <= count; i++) {
    result.push(color.darken(i / (count + 1)));
  }
  return result;
}

/**
 * Return `count` progressively desaturated variations.
 */
export function tones(color: KleurStruct, count: number): KleurStruct[] {
  const result: KleurStruct[] = [];
  for (let i = 1; i <= count; i++) {
    result.push(color.desaturate(i / (count + 1)));
  }
  return result;
}
