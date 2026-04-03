import { KleurStruct } from "./kleur-struct.js";

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
export function blend(base: KleurStruct, overlay: KleurStruct, mode: BlendMode): KleurStruct {
  const r = applyBlend(base.r / 255, overlay.r / 255, mode) * 255;
  const g = applyBlend(base.g / 255, overlay.g / 255, mode) * 255;
  const b = applyBlend(base.b / 255, overlay.b / 255, mode) * 255;
  return new KleurStruct(r, g, b, base.a);
}

/**
 * Linear interpolation between two colors in RGB space.
 * t=0 returns a, t=1 returns b, t=0.5 returns the midpoint.
 */
export function mix(a: KleurStruct, b: KleurStruct, t = 0.5): KleurStruct {
  const r = a.r + (b.r - a.r) * t;
  const g = a.g + (b.g - a.g) * t;
  const bl = a.b + (b.b - a.b) * t;
  const alpha = a.a + (b.a - a.a) * t;
  return new KleurStruct(r, g, bl, alpha);
}

/** Alias for mix. */
export const lerp = mix;
