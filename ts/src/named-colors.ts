import { Color } from "./color.js";
import { hex as parseHex } from "./parse.js";
import { CSS_COLORS } from "./css-color-data.js";

/**
 * Case-insensitive named color lookup.
 * Returns a Color or undefined if not found.
 */
export function getNamedColor(name: string): Color | undefined {
  if (name === "transparent") {
    return new Color(0, 0, 0, 0);
  }
  const hex = CSS_COLORS[name.toLowerCase()];
  if (hex) {
    return parseHex(hex);
  }
  return undefined;
}

// --- Direct constants ---

export const white = parseHex("#ffffff");
export const black = parseHex("#000000");
export const red = parseHex("#ff0000");
export const green = parseHex("#008000");
export const blue = parseHex("#0000ff");
export const yellow = parseHex("#ffff00");
export const cyan = parseHex("#00ffff");
export const magenta = parseHex("#ff00ff");
export const orange = parseHex("#ffa500");
export const purple = parseHex("#800080");
export const pink = parseHex("#ffc0cb");
export const lime = parseHex("#00ff00");
export const transparent = new Color(0, 0, 0, 0);
