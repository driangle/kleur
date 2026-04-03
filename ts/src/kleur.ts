/**
 * Kleur namespace — aggregates the entire public API into a single object.
 *
 * Usage: import { Kleur } from "kleur";
 */
import { rgb, fromHex, fromHsl, fromHsla, fromNumber, fromCss, gray, grey, struct } from "./parse.js";
import { luminance, isLight, isDark, contrast, distance } from "./analysis.js";
import { blend, mix, lerp } from "./blend.js";
import { triadic, tetradic, analogous, splitComplement, tints, shades, tones } from "./harmony.js";
import { random } from "./random.js";
import { getNamedColor, white, black, red, green, blue, yellow, cyan, magenta, orange, purple, pink, lime, transparent } from "./named-colors.js";
import { colorStop, solid, linearGradient, radialGradient, isSolid, isLinearGradient, isRadialGradient, isGradient } from "./gradient.js";

export const Kleur = {
  // Factory functions
  rgb, fromHex, fromHsl, fromHsla, fromNumber, fromCss, gray, grey, struct, random,
  // Analysis
  luminance, isLight, isDark, contrast, distance,
  // Blending
  blend, mix, lerp,
  // Harmony
  triadic, tetradic, analogous, splitComplement, tints, shades, tones,
  // Named colors
  getNamedColor,
  // Gradients
  colorStop, solid, linearGradient, radialGradient, isSolid, isLinearGradient, isRadialGradient, isGradient,
  // Color constants
  white, black, red, green, blue, yellow, cyan, magenta, orange, purple, pink, lime, transparent,
} as const;
