/**
 * Core type definitions for the kleur color library.
 */

/** RGB channels object */
export interface Rgb {
  r: number;
  g: number;
  b: number;
}

/** RGBA channels object */
export interface Rgba extends Rgb {
  a: number;
}

/** HSL channels object */
export interface Hsl {
  h: number;
  s: number;
  l: number;
}

/** HSLA channels object */
export interface Hsla extends Hsl {
  a: number;
}

/** A solid color fill */
export interface SolidKleur {
  type: "solid";
  color: KleurStruct;
}

/** A linear gradient fill */
export interface LinearGradient {
  type: "linear";
  x0: number;
  y0: number;
  x1: number;
  y1: number;
  stops: GradientStop[];
  globalAlpha?: number;
}

/** A radial gradient fill */
export interface RadialGradient {
  type: "radial";
  x0: number;
  y0: number;
  r0: number;
  x1: number;
  y1: number;
  r1: number;
  stops: GradientStop[];
  globalAlpha?: number;
}

/** A color stop within a gradient */
export interface GradientStop {
  offset: number;
  color: KleurStruct;
}

/** Union of all fill types */
export type KleurFill = SolidKleur | LinearGradient | RadialGradient;

/** Any value accepted as a color input */
export type KleurValue = string | number | KleurStruct;

// Forward reference — resolved at runtime via the actual class
import type { KleurStruct } from "./kleur-struct.js";
export type { KleurStruct };
