// kleur - color manipulation library

export { default } from "./kleur.js";
export type { KleurFn, KleurApi } from "./kleur.js";
export type { Color } from "./color.js";
export type { BlendFn, BlendMode, KleurEaseFn } from "./blend.js";
export type { NamedColorLookup } from "./parse.js";
export type { RandomOptions } from "./random.js";
export type {
  Rgb,
  Rgba,
  Hsl,
  Hsla,
  Hsb,
  SolidKleur,
  LinearGradient,
  RadialGradient,
  GradientStop,
  KleurFill,
  KleurValue,
  DistancePreset,
  DistanceOptions,
} from "./types.js";

// Auto-register named color lookup so kleur("red") works out of the box
import { setNamedColorLookup as _register } from "./parse.js";
import { getNamedColor as _lookup } from "./named-colors.js";
_register(_lookup);
