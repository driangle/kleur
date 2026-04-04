/**
 * Kleur namespace — aggregates the entire public API into a single object.
 *
 * Usage: import { Kleur } from "kleur";
 */
import { kleur as kleurFactory, rgb, hex, hsl, number, css, grayscale } from "./parse.js";
import { luminance, isLight, isDark, contrast, distance } from "./analysis.js";
import { blend, mix, lerp } from "./blend.js";
import { triadic, tetradic, analogous, splitComplement, tints, shades, tones } from "./harmony.js";
import { random } from "./random.js";
import { getNamedColor, white, black, red, green, blue, yellow, cyan, magenta, orange, purple, pink, lime, transparent } from "./named-colors.js";
import { colorStop, solid, linearGradient, radialGradient, isSolid, isLinearGradient, isRadialGradient, isGradient } from "./gradient.js";

export const Kleur = {
  create: { kleur: kleurFactory, rgb, hex, hsl, number, css, random, grayscale },
  analyze: { luminance, isLight, isDark, contrast, distance },
  combine: { lerp, blend, mix },
  harmony: { triadic, tetradic, analogous, splitComplement, tints, shades, tones },
  gradient: { colorStop, solid, linearGradient, radialGradient, isSolid, isLinearGradient, isRadialGradient, isGradient },
  named: { get: getNamedColor, white, black, red, green, blue, yellow, cyan, magenta, orange, purple, pink, lime, transparent },
} as const;
