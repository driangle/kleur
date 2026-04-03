// kleur - color manipulation library

export { KleurStruct } from "./kleur-struct.js";
export { rgbToHsl, hslToRgb } from "./hsl.js";
export {
  rgb,
  fromHex,
  fromHsl,
  fromHsla,
  fromNumber,
  fromCss,
  gray,
  grey,
  struct,
  setNamedColorLookup,
} from "./parse.js";
export type { NamedColorLookup } from "./parse.js";
export { luminance, isLight, isDark, contrast, distance } from "./analysis.js";
export type {
  Rgb,
  Rgba,
  Hsl,
  Hsla,
  SolidKleur,
  LinearGradient,
  RadialGradient,
  GradientStop,
  Kleur,
  KleurValue,
} from "./types.js";
