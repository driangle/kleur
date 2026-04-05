import { Color } from "./color.js";
import {
  InvalidColorValueError,
  InvalidCssColorError,
  InvalidHexColorError,
  UnknownColorError,
} from "./errors.js";
import { hslToRgb } from "./hsl.js";

/**
 * Create a color from RGBA values.
 */
export function rgb(r: number, g: number, b: number, a?: number): Color {
  return new Color(r, g, b, a);
}

/**
 * Parse a hex color string. Requires `#` prefix.
 * Supports 3-digit (#abc) and 6-digit (#aabbcc) forms.
 */
export function hex(hex: string): Color {
  const s = hex.trim();
  if (!s.startsWith("#")) {
    throw new InvalidHexColorError(hex, "missing-prefix");
  }

  const digits = s.slice(1);
  if (digits.length === 3) {
    const r = parseInt(digits[0] + digits[0], 16);
    const g = parseInt(digits[1] + digits[1], 16);
    const b = parseInt(digits[2] + digits[2], 16);
    return new Color(r, g, b);
  }

  if (digits.length === 6) {
    const r = parseInt(digits.slice(0, 2), 16);
    const g = parseInt(digits.slice(2, 4), 16);
    const b = parseInt(digits.slice(4, 6), 16);
    return new Color(r, g, b);
  }

  throw new InvalidHexColorError(hex, "invalid-length");
}

/**
 * Create a color from HSL values with optional alpha.
 */
export function hsl(h: number, s: number, l: number, a?: number): Color {
  const { r, g, b } = hslToRgb(h, s, l);
  return new Color(r, g, b, a);
}

/**
 * Create a color from a 24-bit packed integer (0xRRGGBB).
 */
export function number(n: number): Color {
  const int = n >>> 0; // ensure unsigned 32-bit
  const r = (int >> 16) & 0xff;
  const g = (int >> 8) & 0xff;
  const b = int & 0xff;
  return new Color(r, g, b);
}

/**
 * Create a grayscale color (r=g=b=value).
 */
export function grayscale(value: number, alpha?: number): Color {
  return new Color(value, value, value, alpha);
}

/**
 * Parse a CSS color function string.
 * Supports: rgb(), rgba(), hsl(), hsla()
 */
export function css(css: string): Color {
  const s = css.trim().toLowerCase();

  const rgbaMatch = s.match(
    /^rgba?\(\s*(\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?)(?:\s*,\s*(\d+(?:\.\d+)?))?\s*\)$/,
  );
  if (rgbaMatch) {
    const r = parseFloat(rgbaMatch[1]);
    const g = parseFloat(rgbaMatch[2]);
    const b = parseFloat(rgbaMatch[3]);
    const a = rgbaMatch[4] !== undefined ? parseFloat(rgbaMatch[4]) : 1;
    return new Color(r, g, b, a);
  }

  const hslaMatch = s.match(
    /^hsla?\(\s*(\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?)%?\s*,\s*(\d+(?:\.\d+)?)%?(?:\s*,\s*(\d+(?:\.\d+)?))?\s*\)$/,
  );
  if (hslaMatch) {
    const h = parseFloat(hslaMatch[1]);
    const sat = parseFloat(hslaMatch[2]);
    const l = parseFloat(hslaMatch[3]);
    const a = hslaMatch[4] !== undefined ? parseFloat(hslaMatch[4]) : 1;
    const { r, g, b } = hslToRgb(h, sat, l);
    return new Color(r, g, b, a);
  }

  throw new InvalidCssColorError(css);
}

/** Lookup function for named colors */
export type NamedColorLookup = (name: string) => Color | undefined;

/** Default named color lookup (empty — use setNamedColorLookup to register) */
let namedColorLookup: NamedColorLookup = () => undefined;

/**
 * Register a named color lookup function.
 * Called by the named colors module when it loads.
 */
export function setNamedColorLookup(lookup: NamedColorLookup): void {
  namedColorLookup = lookup;
}

/**
 * Universal factory: create a color from any supported input.
 *
 * Accepts: hex string, CSS string, named color, packed number, Color instance,
 * or explicit (r, g, b, a?) values.
 */
export function kleur(r: number, g: number, b: number, a?: number): Color;
export function kleur(value: string | number | Color): Color;
export function kleur(
  valueOrR: string | number | Color,
  g?: number,
  b?: number,
  a?: number,
): Color {
  if (typeof valueOrR === "number" && g !== undefined && b !== undefined) {
    return rgb(valueOrR, g, b, a);
  }
  return resolve(valueOrR);
}

/** Resolve any supported color input to a Color instance. */
export function resolve(value: string | number | Color): Color {
  if (value instanceof Color) {
    return value;
  }

  if (typeof value === "number") {
    return number(value);
  }

  if (typeof value === "string") {
    const s = value.trim();

    // Hex
    if (s.startsWith("#")) {
      return hex(s);
    }

    // CSS function
    if (s.startsWith("rgb") || s.startsWith("hsl")) {
      return css(s);
    }

    // Named color lookup
    const named = namedColorLookup(s.toLowerCase());
    if (named) {
      return named;
    }

    throw new UnknownColorError(value);
  }

  throw new InvalidColorValueError(value);
}
