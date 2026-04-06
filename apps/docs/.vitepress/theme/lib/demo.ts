import kleur from "@driangle/kleur";
import type { Color, DistancePreset } from "@driangle/kleur";

export interface ColorOutputs {
  hex: string;
  css: string;
  rgb: string;
  hsl: string;
}

export interface ContrastSummary {
  ratio: string;
  aa: boolean;
  aaa: boolean;
}

export type PaletteKind =
  | "triadic"
  | "tetradic"
  | "analogous"
  | "splitComplement"
  | "tints"
  | "shades"
  | "tones";

export type BlendPreviewMode =
  | "mix"
  | "multiply"
  | "screen"
  | "overlay"
  | "difference"
  | "lighten"
  | "darken";

export function tryParseColor(input: string): Color | null {
  try {
    return kleur(input.trim());
  } catch {
    return null;
  }
}

export function readableTextColor(hex: string): string {
  const color = kleur(hex);
  return kleur.isLight(color) ? "#111111" : "#f5f5f5";
}

export function formatColorOutputs(color: Color): ColorOutputs {
  const rgb = color.toRgb();
  const hsl = color.toHsl();

  return {
    hex: color.toHex(),
    css: color.toCss(),
    rgb: `r: ${rgb.r}\ng: ${rgb.g}\nb: ${rgb.b}`,
    hsl: `h: ${hsl.h}\ns: ${hsl.s}\nl: ${hsl.l}`,
  };
}

export function describeContrast(foreground: Color, background: Color): ContrastSummary {
  const ratio = kleur.contrast(foreground, background);

  return {
    ratio: ratio.toFixed(2),
    aa: ratio >= 4.5,
    aaa: ratio >= 7,
  };
}

export function buildPalette(
  color: Color,
  kind: PaletteKind,
  options: { angle: number; count: number }
): Color[] {
  switch (kind) {
    case "triadic":
      return color.triadic();
    case "tetradic":
      return color.tetradic();
    case "analogous":
      return color.analogous(options.angle);
    case "splitComplement":
      return color.splitComplement(options.angle);
    case "tints":
      return [color, ...color.tints(options.count)];
    case "shades":
      return [color, ...color.shades(options.count)];
    case "tones":
      return [color, ...color.tones(options.count)];
  }
}

export function blendColors(
  base: Color,
  overlay: Color,
  mode: BlendPreviewMode,
  t: number
): Color {
  if (mode === "mix") {
    return kleur.mix(base, overlay, t);
  }

  return kleur.blend(base, overlay, mode);
}

export function measureDistance(
  a: Color,
  b: Color,
  preset: DistancePreset
): string {
  return kleur.distance(a, b, { preset }).toFixed(2);
}
