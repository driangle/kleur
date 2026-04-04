// kleur - color manipulation library

export { Kleur } from "./kleur.js";
export { Color } from "./color.js";
export { rgbToHsl, hslToRgb } from "./hsl.js";
export {
  kleur,
  rgb,
  hex,
  hsl,
  number,
  css,
  grayscale,
  setNamedColorLookup,
} from "./parse.js";
export type { NamedColorLookup } from "./parse.js";
export { luminance, isLight, isDark, contrast, distance } from "./analysis.js";
export { triadic, tetradic, analogous, splitComplement, tints, shades, tones } from "./harmony.js";
export { blend, mix, lerp } from "./blend.js";
export type { BlendMode, EasingFn } from "./blend.js";
export {
  getNamedColor,
  white,
  black,
  red,
  green,
  blue,
  yellow,
  cyan,
  magenta,
  orange,
  purple,
  pink,
  lime,
  transparent,
} from "./named-colors.js";
export { random } from "./random.js";
export type { RandomOptions } from "./random.js";
export {
  colorStop,
  solid,
  linearGradient,
  radialGradient,
  isSolid,
  isLinearGradient,
  isRadialGradient,
  isGradient,
} from "./gradient.js";
export type {
  Rgb,
  Rgba,
  Hsl,
  Hsla,
  SolidKleur,
  LinearGradient,
  RadialGradient,
  GradientStop,
  KleurFill,
  KleurValue,
  DistancePreset,
  DistanceOptions,
} from "./types.js";

// Auto-register named color lookup so object("red") works out of the box
import { setNamedColorLookup as _register } from "./parse.js";
import { getNamedColor as _lookup } from "./named-colors.js";
_register(_lookup);
