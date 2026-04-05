import { Color } from "./color.js";

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
  const r = fn(base.r / 255, overlay.r / 255) * 255;
  const g = fn(base.g / 255, overlay.g / 255) * 255;
  const b = fn(base.b / 255, overlay.b / 255) * 255;
  return new Color(r, g, b, base.a);
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
export function blend(base: Color, overlay: Color, mode: BlendMode): Color {
  const fn = typeof mode === "function" ? mode : blendModes[mode];
  return fn(base, overlay);
}

export type KleurEaseFn = (t: number) => number;

/**
 * Interpolate between two colors in RGB space.
 * t=0 returns a, t=1 returns b. An optional easing function remaps t before interpolation.
 */
export function mix(a: Color, b: Color, t = 0.5, ease?: KleurEaseFn): Color {
  const et = ease ? ease(t) : t;
  const r = a.r + (b.r - a.r) * et;
  const g = a.g + (b.g - a.g) * et;
  const bl = a.b + (b.b - a.b) * et;
  const alpha = a.a + (b.a - a.a) * et;
  return new Color(r, g, bl, alpha);
}
