// kleur - color manipulation library

export { default } from "./kleur.js";
export type { KleurFn, KleurApi } from "./kleur.js";
export type { Color } from "./color.js";
export type { BlendFn, BlendMode, KleurEaseFn } from "./blend.js";
export { resolve } from "./parse.js";
export type { RandomOptions } from "./random.js";
export { Palette } from "./palette.js";
export { LinearGradientBuilder, RadialGradientBuilder } from "./gradient-builder.js";
export {
  KleurError,
  ParseError,
  UnknownOptionError,
  InvalidChannelError,
  InvalidOffsetError,
  InvalidCountError,
  InvalidDistanceCombinationError,
  MissingRegistrationError,
} from "./errors.js";
export type { InvalidChannelKind, ParseErrorKind, UnknownOptionKind } from "./errors.js";
export type {
  Rgb,
  Rgba,
  Hsl,
  Hsla,
  Hsb,
  Hsba,
  SolidColor,
  LinearGradient,
  RadialGradient,
  GradientStop,
  GradientStopInput,
  KleurFill,
  KleurValue,
  DistancePreset,
  DistanceSpace,
  DistanceMethod,
  DistanceSpaceMethod,
  DistanceOptions,
} from "./types.js";

