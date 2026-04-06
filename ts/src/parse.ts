import { Color, registerResolver } from "./color.js";
import { ParseError } from "./errors.js";
import { parseCssFunction, parseNumericToken } from "./css-function.js";
import { hslToRgb } from "./hsl.js";
import { CSS_COLORS } from "./css-color-data.js";

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
    throw new ParseError("hex", hex, "missing-prefix");
  }

  const digits = s.slice(1);
  if (!/^[0-9a-fA-F]+$/.test(digits)) {
    throw new ParseError("hex", hex, "invalid-digits");
  }

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

  throw new ParseError("hex", hex, "invalid-length");
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
export function int(n: number): Color {
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
 * Both comma-separated and space-separated (CSS Color Level 4) syntax.
 * Hue values can be negative.
 */
export function css(css: string): Color {
  const parsed = parseCssFunction(css.trim().toLowerCase());
  if (!parsed) throw new ParseError("css", css);

  const [name, ...args] = parsed;

  if (name === "rgb" || name === "rgba") {
    if (args.length < 3 || args.length > 4) throw new ParseError("css", css);
    const r = parseNumericToken(args[0]);
    const g = parseNumericToken(args[1]);
    const b = parseNumericToken(args[2]);
    const a = args[3] !== undefined ? parseNumericToken(args[3]) : 1;
    if ([r, g, b, a].some(Number.isNaN)) throw new ParseError("css", css);
    return new Color(r, g, b, a);
  }

  if (name === "hsl" || name === "hsla") {
    if (args.length < 3 || args.length > 4) throw new ParseError("css", css);
    const h = parseNumericToken(args[0]);
    const sat = parseNumericToken(args[1]);
    const l = parseNumericToken(args[2]);
    const a = args[3] !== undefined ? parseNumericToken(args[3]) : 1;
    if ([h, sat, l, a].some(Number.isNaN)) throw new ParseError("css", css);
    const { r, g, b } = hslToRgb(h, sat, l);
    return new Color(r, g, b, a);
  }

  throw new ParseError("css", css);
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
  if (value == null) {
    throw new ParseError("value", value);
  }

  if (value instanceof Color) {
    return value;
  }

  if (typeof value === "number") {
    return int(value);
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
    const lower = s.toLowerCase();
    if (lower === "transparent") {
      return new Color(0, 0, 0, 0);
    }
    const namedHex = CSS_COLORS[lower];
    if (namedHex) {
      return hex(namedHex);
    }

    throw new ParseError("named", value);
  }

  throw new ParseError("value", value);
}

// Register the resolver so Color methods can resolve KleurValue without circular imports.
registerResolver(resolve);
