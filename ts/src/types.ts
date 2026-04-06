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

/** HSB (HSV) channels object */
export interface Hsb {
  h: number;
  s: number;
  b: number;
}

/** HSB (HSV) channels object with alpha */
export interface Hsba extends Hsb {
  a: number;
}

/** A solid color fill */
export interface SolidColor {
  type: "solid";
  color: Color;
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
  color: Color;
}

/** Union of all fill types */
export type KleurFill = SolidColor | LinearGradient | RadialGradient;

/** Any value accepted as a color input */
export type KleurValue = string | number | Color;

/** Preset name for common distance strategies */
export type DistancePreset = "fast" | "perceptual" | "accurate" | "modern";

/** All supported color spaces for distance computation */
export type DistanceSpace = "rgb" | "hsl" | "lab" | "lch" | "oklab" | "oklch";

/** All supported distance methods */
export type DistanceMethod =
  | "euclidean"
  | "deltaE76"
  | "deltaE94"
  | "deltaE2000"
  | "deltaEOK";

/**
 * Valid space+method combinations for the distance() function.
 *
 * - euclidean works with any color space
 * - deltaE76, deltaE94, deltaE2000 require "lab"
 * - deltaEOK requires "oklab"
 */
export type DistanceSpaceMethod =
  | { space: DistanceSpace; method: "euclidean" }
  | { space: "lab"; method: "deltaE76" | "deltaE94" | "deltaE2000" }
  | { space: "oklab"; method: "deltaEOK" };

/** Options for the distance() function — either a preset or explicit space+method */
export type DistanceOptions = { preset: DistancePreset } | DistanceSpaceMethod;

/** A function that blends two colors channel-by-channel. */
export type BlendFn = (base: Color, overlay: Color) => Color;

/** A preset blend mode name or a custom blend function. */
export type BlendMode =
  | "multiply"
  | "screen"
  | "overlay"
  | "darken"
  | "lighten"
  | "colorDodge"
  | "colorBurn"
  | "hardLight"
  | "softLight"
  | "difference"
  | "exclusion"
  | "add"
  | "subtract"
  | BlendFn;

// Forward reference — resolved at runtime via the actual class
import type { Color } from "./color.js";
export type { Color };
