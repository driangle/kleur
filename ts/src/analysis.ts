import { linearize } from "./color-spaces.js";
import { resolve } from "./parse.js";
import type { KleurValue } from "./types.js";

export { distance } from "./distance.js";

/**
 * WCAG 2.1 relative luminance (0-1).
 */
export function luminance(color: KleurValue): number {
  const c = resolve(color);
  return (
    0.2126 * linearize(c.r) +
    0.7152 * linearize(c.g) +
    0.0722 * linearize(c.b)
  );
}

/**
 * True if lightness > 50.
 */
export function isLight(color: KleurValue): boolean {
  return resolve(color).lightness > 50;
}

/**
 * True if lightness <= 50.
 */
export function isDark(color: KleurValue): boolean {
  return resolve(color).lightness <= 50;
}

/**
 * WCAG contrast ratio between two colors (1-21).
 */
export function contrast(a: KleurValue, b: KleurValue): number {
  const la = luminance(a);
  const lb = luminance(b);
  const lighter = Math.max(la, lb);
  const darker = Math.min(la, lb);
  return (lighter + 0.05) / (darker + 0.05);
}
