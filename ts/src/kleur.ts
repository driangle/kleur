/**
 * kleur — callable universal factory with the full API as properties.
 *
 * Usage:
 *   import kleur from "@driangle/kleur";
 *   const color = kleur("#ff6600");    // factory call
 *   const c = kleur.hex("#ff6600");    // named creator
 *   kleur.luminance(color);            // analysis
 *   kleur.mix(color, other);           // blending
 *   kleur.triadic(color);              // harmony
 */
import type { Color } from "./color.js";
import { kleur as kleurFactory, rgb, hex, hsl, number, css, grayscale } from "./parse.js";
import { luminance, isLight, isDark, contrast, distance } from "./analysis.js";
import { blend, mix } from "./blend.js";
import { triadic, tetradic, analogous, splitComplement, tints, shades, tones } from "./harmony.js";
import { random } from "./random.js";
import { getNamedColor, white, black, red, green, blue, yellow, cyan, magenta, orange, purple, pink, lime, transparent } from "./named-colors.js";
import { colorStop, solid, linearGradient, radialGradient, isSolid, isLinearGradient, isRadialGradient, isGradient } from "./gradient.js";

/** All properties available on the `kleur` function object. */
export interface KleurApi {
  // Create
  rgb: typeof rgb;
  hex: typeof hex;
  hsl: typeof hsl;
  number: typeof number;
  css: typeof css;
  grayscale: typeof grayscale;
  random: typeof random;

  // Analyze
  luminance: typeof luminance;
  isLight: typeof isLight;
  isDark: typeof isDark;
  contrast: typeof contrast;
  distance: typeof distance;

  // Combine
  blend: typeof blend;
  mix: typeof mix;

  // Harmony
  triadic: typeof triadic;
  tetradic: typeof tetradic;
  analogous: typeof analogous;
  splitComplement: typeof splitComplement;
  tints: typeof tints;
  shades: typeof shades;
  tones: typeof tones;

  // Gradient
  colorStop: typeof colorStop;
  solid: typeof solid;
  linearGradient: typeof linearGradient;
  radialGradient: typeof radialGradient;
  isSolid: typeof isSolid;
  isLinearGradient: typeof isLinearGradient;
  isRadialGradient: typeof isRadialGradient;
  isGradient: typeof isGradient;

  // Named colors
  white: Color;
  black: Color;
  red: Color;
  green: Color;
  blue: Color;
  yellow: Color;
  cyan: Color;
  magenta: Color;
  orange: Color;
  purple: Color;
  pink: Color;
  lime: Color;
  transparent: Color;
}

/** The `kleur` function: callable as a universal factory, with the full API as properties. */
export type KleurFn = {
  (r: number, g: number, b: number, a?: number): Color;
  (value: string | number | Color): Color;
} & KleurApi;

// Build the augmented function by assigning all API methods onto the factory.
const kleur = kleurFactory as KleurFn;

// Create
kleur.rgb = rgb;
kleur.hex = hex;
kleur.hsl = hsl;
kleur.number = number;
kleur.css = css;
kleur.grayscale = grayscale;
kleur.random = random;

// Analyze
kleur.luminance = luminance;
kleur.isLight = isLight;
kleur.isDark = isDark;
kleur.contrast = contrast;
kleur.distance = distance;

// Combine
kleur.blend = blend;
kleur.mix = mix;

// Harmony
kleur.triadic = triadic;
kleur.tetradic = tetradic;
kleur.analogous = analogous;
kleur.splitComplement = splitComplement;
kleur.tints = tints;
kleur.shades = shades;
kleur.tones = tones;

// Gradient
kleur.colorStop = colorStop;
kleur.solid = solid;
kleur.linearGradient = linearGradient;
kleur.radialGradient = radialGradient;
kleur.isSolid = isSolid;
kleur.isLinearGradient = isLinearGradient;
kleur.isRadialGradient = isRadialGradient;
kleur.isGradient = isGradient;

// Named colors
kleur.white = white;
kleur.black = black;
kleur.red = red;
kleur.green = green;
kleur.blue = blue;
kleur.yellow = yellow;
kleur.cyan = cyan;
kleur.magenta = magenta;
kleur.orange = orange;
kleur.purple = purple;
kleur.pink = pink;
kleur.lime = lime;
kleur.transparent = transparent;

export default kleur;

/** Legacy grouped namespace. */
export const Kleur = {
  create: { kleur: kleurFactory, rgb, hex, hsl, number, css, random, grayscale },
  analyze: { luminance, isLight, isDark, contrast, distance },
  combine: { blend, mix },
  harmony: { triadic, tetradic, analogous, splitComplement, tints, shades, tones },
  gradient: { colorStop, solid, linearGradient, radialGradient, isSolid, isLinearGradient, isRadialGradient, isGradient },
  named: { get: getNamedColor, white, black, red, green, blue, yellow, cyan, magenta, orange, purple, pink, lime, transparent },
} as const;
