import { Color } from "./color.js";

export type BlendMode = "multiply" | "screen" | "overlay" | "add" | "subtract";

function applyBlend(base: number, overlay: number, mode: BlendMode): number {
  switch (mode) {
    case "multiply":
      return base * overlay;
    case "screen":
      return 1 - (1 - base) * (1 - overlay);
    case "overlay":
      return base < 0.5
        ? 2 * base * overlay
        : 1 - 2 * (1 - base) * (1 - overlay);
    case "add":
      return Math.min(1, base + overlay);
    case "subtract":
      return Math.max(0, base - overlay);
  }
}

/**
 * Blend two colors using the specified blend mode.
 * Operates per-channel in normalized (0-1) space.
 */
export function blend(base: Color, overlay: Color, mode: BlendMode): Color {
  const r = applyBlend(base.r / 255, overlay.r / 255, mode) * 255;
  const g = applyBlend(base.g / 255, overlay.g / 255, mode) * 255;
  const b = applyBlend(base.b / 255, overlay.b / 255, mode) * 255;
  return new Color(r, g, b, base.a);
}

export type EasingFn = (t: number) => number;

/**
 * Interpolate between two colors in RGB space.
 * t=0 returns a, t=1 returns b. An optional easing function remaps t before interpolation.
 */
export function mix(a: Color, b: Color, t = 0.5, ease?: EasingFn): Color {
  const et = ease ? ease(t) : t;
  const r = a.r + (b.r - a.r) * et;
  const g = a.g + (b.g - a.g) * et;
  const bl = a.b + (b.b - a.b) * et;
  const alpha = a.a + (b.a - a.a) * et;
  return new Color(r, g, bl, alpha);
}

/** Alias for mix. */
export const lerp = mix;
