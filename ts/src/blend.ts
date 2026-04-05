import { Color } from "./color.js";
import { InvalidBlendModeError } from "./errors.js";
import { resolve } from "./parse.js";
import type { KleurValue } from "./types.js";

export type BlendFn = (base: Color, overlay: Color) => Color;
export type BlendMode =
  | "multiply"
  | "screen"
  | "overlay"
  | "darken"
  | "lighten"
  | "colorDodge"
  | "colorBurn"
  | "hardLight"
  | "softLight"
  | "difference"
  | "exclusion"
  | "add"
  | "subtract"
  | BlendFn;

function perChannel(
  base: Color,
  overlay: Color,
  fn: (b: number, o: number) => number,
): Color {
  const r = fn(base.red / 255, overlay.red / 255) * 255;
  const g = fn(base.green / 255, overlay.green / 255) * 255;
  const b = fn(base.blue / 255, overlay.blue / 255) * 255;
  return new Color(r, g, b, base.alpha);
}

function multiply(base: Color, overlay: Color): Color {
  return perChannel(base, overlay, (b, o) => b * o);
}

function screen(base: Color, overlay: Color): Color {
  return perChannel(base, overlay, (b, o) => 1 - (1 - b) * (1 - o));
}

function overlay(base: Color, overlay: Color): Color {
  return perChannel(base, overlay, (b, o) =>
    b < 0.5 ? 2 * b * o : 1 - 2 * (1 - b) * (1 - o),
  );
}

function add(base: Color, overlay: Color): Color {
  return perChannel(base, overlay, (b, o) => Math.min(1, b + o));
}

function subtract(base: Color, overlay: Color): Color {
  return perChannel(base, overlay, (b, o) => Math.max(0, b - o));
}

function darken(base: Color, overlay: Color): Color {
  return perChannel(base, overlay, (b, o) => Math.min(b, o));
}

function lighten(base: Color, overlay: Color): Color {
  return perChannel(base, overlay, (b, o) => Math.max(b, o));
}

function colorDodge(base: Color, overlay: Color): Color {
  return perChannel(base, overlay, (b, o) =>
    b === 0 ? 0 : o === 1 ? 1 : Math.min(1, b / (1 - o)),
  );
}

function colorBurn(base: Color, overlay: Color): Color {
  return perChannel(base, overlay, (b, o) =>
    b === 1 ? 1 : o === 0 ? 0 : 1 - Math.min(1, (1 - b) / o),
  );
}

function hardLight(base: Color, overlay: Color): Color {
  return perChannel(base, overlay, (b, o) =>
    o <= 0.5 ? 2 * b * o : 1 - 2 * (1 - b) * (1 - o),
  );
}

function softLight(base: Color, overlay: Color): Color {
  return perChannel(base, overlay, (b, o) => {
    if (o <= 0.5) return b - (1 - 2 * o) * b * (1 - b);
    const d = b <= 0.25 ? ((16 * b - 12) * b + 4) * b : Math.sqrt(b);
    return b + (2 * o - 1) * (d - b);
  });
}

function difference(base: Color, overlay: Color): Color {
  return perChannel(base, overlay, (b, o) => Math.abs(b - o));
}

function exclusion(base: Color, overlay: Color): Color {
  return perChannel(base, overlay, (b, o) => b + o - 2 * b * o);
}

const blendModes: Record<string, BlendFn> = {
  multiply,
  screen,
  overlay,
  darken,
  lighten,
  colorDodge,
  colorBurn,
  hardLight,
  softLight,
  difference,
  exclusion,
  add,
  subtract,
};

/** Blend two colors using the specified blend mode or a custom blend function. */
export function blend(base: KleurValue, overlay: KleurValue, mode: BlendMode): Color {
  const fn = typeof mode === "function" ? mode : blendModes[mode];
  if (!fn) {
    throw new InvalidBlendModeError(mode as string, Object.keys(blendModes));
  }
  return fn(resolve(base), resolve(overlay));
}

export type KleurEaseFn = (t: number) => number;

/**
 * Interpolate between two colors in RGB space.
 * t=0 returns a, t=1 returns b. An optional easing function remaps t before interpolation.
 */
export function mix(a: KleurValue, b: KleurValue, t = 0.5, ease?: KleurEaseFn): Color {
  const ca = resolve(a);
  const cb = resolve(b);
  const et = ease ? ease(t) : t;
  const r = ca.red + (cb.red - ca.red) * et;
  const g = ca.green + (cb.green - ca.green) * et;
  const bl = ca.blue + (cb.blue - ca.blue) * et;
  const alpha = ca.alpha + (cb.alpha - ca.alpha) * et;
  return new Color(r, g, bl, alpha);
}
