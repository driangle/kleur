import { KleurStruct } from "./kleur-struct.js";

/**
 * Linearize an sRGB channel value (0-255) for luminance calculation.
 */
function linearize(channel: number): number {
  const c = channel / 255;
  return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
}

/**
 * WCAG 2.1 relative luminance (0-1).
 */
export function luminance(color: KleurStruct): number {
  return (
    0.2126 * linearize(color.r) +
    0.7152 * linearize(color.g) +
    0.0722 * linearize(color.b)
  );
}

/**
 * True if lightness > 50.
 */
export function isLight(color: KleurStruct): boolean {
  return color.lightness() > 50;
}

/**
 * True if lightness <= 50.
 */
export function isDark(color: KleurStruct): boolean {
  return color.lightness() <= 50;
}

/**
 * WCAG contrast ratio between two colors (1-21).
 */
export function contrast(a: KleurStruct, b: KleurStruct): number {
  const la = luminance(a);
  const lb = luminance(b);
  const lighter = Math.max(la, lb);
  const darker = Math.min(la, lb);
  return (lighter + 0.05) / (darker + 0.05);
}

/**
 * Euclidean distance in RGB space.
 */
export function distance(a: KleurStruct, b: KleurStruct): number {
  return Math.sqrt(
    (a.r - b.r) ** 2 + (a.g - b.g) ** 2 + (a.b - b.b) ** 2,
  );
}
