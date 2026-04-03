import { KleurStruct } from "./kleur-struct.js";
import { hslToRgb } from "./hsl.js";

/**
 * Create a color from RGBA values.
 */
export function rgb(r: number, g: number, b: number, a?: number): KleurStruct {
  return new KleurStruct(r, g, b, a);
}

/**
 * Parse a hex color string. Requires `#` prefix.
 * Supports 3-digit (#abc) and 6-digit (#aabbcc) forms.
 */
export function fromHex(hex: string): KleurStruct {
  const s = hex.trim();
  if (!s.startsWith("#")) {
    throw new Error(`Invalid hex color: "${hex}" (must start with #)`);
  }

  const digits = s.slice(1);
  if (digits.length === 3) {
    const r = parseInt(digits[0] + digits[0], 16);
    const g = parseInt(digits[1] + digits[1], 16);
    const b = parseInt(digits[2] + digits[2], 16);
    return new KleurStruct(r, g, b);
  }

  if (digits.length === 6) {
    const r = parseInt(digits.slice(0, 2), 16);
    const g = parseInt(digits.slice(2, 4), 16);
    const b = parseInt(digits.slice(4, 6), 16);
    return new KleurStruct(r, g, b);
  }

  throw new Error(`Invalid hex color: "${hex}" (must be 3 or 6 digits)`);
}

/**
 * Create a color from HSL values.
 */
export function fromHsl(h: number, s: number, l: number): KleurStruct {
  const { r, g, b } = hslToRgb(h, s, l);
  return new KleurStruct(r, g, b);
}

/**
 * Create a color from HSLA values.
 */
export function fromHsla(h: number, s: number, l: number, a: number): KleurStruct {
  const { r, g, b } = hslToRgb(h, s, l);
  return new KleurStruct(r, g, b, a);
}

/**
 * Create a color from a 24-bit packed integer (0xRRGGBB).
 */
export function fromNumber(n: number): KleurStruct {
  const int = n >>> 0; // ensure unsigned 32-bit
  const r = (int >> 16) & 0xff;
  const g = (int >> 8) & 0xff;
  const b = int & 0xff;
  return new KleurStruct(r, g, b);
}

/**
 * Create a gray color (r=g=b=value).
 */
export function gray(value: number, alpha?: number): KleurStruct {
  return new KleurStruct(value, value, value, alpha);
}

/** Alias for gray. */
export const grey = gray;

/**
 * Parse a CSS color function string.
 * Supports: rgb(), rgba(), hsl(), hsla()
 */
export function fromCss(css: string): KleurStruct {
  const s = css.trim().toLowerCase();

  const rgbaMatch = s.match(
    /^rgba?\(\s*(\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?)(?:\s*,\s*(\d+(?:\.\d+)?))?\s*\)$/,
  );
  if (rgbaMatch) {
    const r = parseFloat(rgbaMatch[1]);
    const g = parseFloat(rgbaMatch[2]);
    const b = parseFloat(rgbaMatch[3]);
    const a = rgbaMatch[4] !== undefined ? parseFloat(rgbaMatch[4]) : 1;
    return new KleurStruct(r, g, b, a);
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
    return new KleurStruct(r, g, b, a);
  }

  throw new Error(`Invalid CSS color: "${css}"`);
}

/** Lookup function for named colors */
export type NamedColorLookup = (name: string) => KleurStruct | undefined;

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
 * Universal converter: accepts string (hex, CSS, named), number, or KleurStruct.
 */
export function struct(value: string | number | KleurStruct): KleurStruct {
  if (value instanceof KleurStruct) {
    return value;
  }

  if (typeof value === "number") {
    return fromNumber(value);
  }

  if (typeof value === "string") {
    const s = value.trim();

    // Hex
    if (s.startsWith("#")) {
      return fromHex(s);
    }

    // CSS function
    if (s.startsWith("rgb") || s.startsWith("hsl")) {
      return fromCss(s);
    }

    // Named color lookup
    const named = namedColorLookup(s.toLowerCase());
    if (named) {
      return named;
    }

    throw new Error(`Unknown color: "${value}"`);
  }

  throw new Error(`Invalid color value: ${value}`);
}
