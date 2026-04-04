import { Color } from "./color.js";
import { linearize } from "./color-spaces.js";

export { distance } from "./distance.js";

/**
 * WCAG 2.1 relative luminance (0-1).
 */
export function luminance(color: Color): number {
  return (
    0.2126 * linearize(color.r) +
    0.7152 * linearize(color.g) +
    0.0722 * linearize(color.b)
  );
}

/**
 * True if lightness > 50.
 */
export function isLight(color: Color): boolean {
  return color.lightness() > 50;
}

/**
 * True if lightness <= 50.
 */
export function isDark(color: Color): boolean {
  return color.lightness() <= 50;
}

/**
 * WCAG contrast ratio between two colors (1-21).
 */
export function contrast(a: Color, b: Color): number {
  const la = luminance(a);
  const lb = luminance(b);
  const lighter = Math.max(la, lb);
  const darker = Math.min(la, lb);
  return (lighter + 0.05) / (darker + 0.05);
}

