/**
 * Color distance computation with configurable space and method.
 */
import type { Color } from "./color.js";
import {
  InvalidDistanceCombinationError,
  UnknownColorSpaceError,
  UnknownDistanceMethodError,
  UnknownDistancePresetError,
} from "./errors.js";
import type { DistanceOptions, KleurValue } from "./types.js";
import { resolve } from "./parse.js";
import { rgbToLab, rgbToOklab, labToLch, oklabToOklch } from "./color-spaces.js";
import { rgbToHsl } from "./hsl.js";
import {
  type Triple,
  euclidean, deltaE76, deltaE94, deltaE2000, deltaEOK,
} from "./delta-e.js";

// --- Preset mappings ---

const PRESETS: Record<string, { space: string; method: string }> = {
  fast: { space: "rgb", method: "euclidean" },
  perceptual: { space: "lab", method: "deltaE94" },
  accurate: { space: "lab", method: "deltaE2000" },
  modern: { space: "oklab", method: "deltaEOK" },
};

// --- Space converters (Color → 3-component tuple) ---

const SPACE_CONVERTERS: Record<string, (c: Color) => Triple> = {
  rgb: (c) => [c.r, c.g, c.b],
  hsl: (c) => { const { h, s, l } = rgbToHsl(c.r, c.g, c.b); return [h, s, l]; },
  lab: (c) => { const { l, a, b } = rgbToLab(c.r, c.g, c.b); return [l, a, b]; },
  lch: (c) => {
    const lab = rgbToLab(c.r, c.g, c.b);
    const { l, c: ch, h } = labToLch(lab.l, lab.a, lab.b);
    return [l, ch, h];
  },
  oklab: (c) => { const { l, a, b } = rgbToOklab(c.r, c.g, c.b); return [l, a, b]; },
  oklch: (c) => {
    const ok = rgbToOklab(c.r, c.g, c.b);
    const { l, c: ch, h } = oklabToOklch(ok.l, ok.a, ok.b);
    return [l, ch, h];
  },
};

// --- Distance method dispatch ---

const DISTANCE_METHODS: Record<string, (a: Triple, b: Triple) => number> = {
  euclidean, deltaE76, deltaE94, deltaE2000, deltaEOK,
};

const VALID_COMBINATIONS: Record<string, Set<string>> = {
  euclidean: new Set(["rgb", "hsl", "lab", "lch", "oklab", "oklch"]),
  deltaE76: new Set(["lab"]),
  deltaE94: new Set(["lab"]),
  deltaE2000: new Set(["lab"]),
  deltaEOK: new Set(["oklab"]),
};

// --- Public API ---

function resolveOptions(options?: DistanceOptions): { space: string; method: string } {
  if (!options) return { space: "rgb", method: "euclidean" };

  if ("preset" in options) {
    const resolved = PRESETS[options.preset];
    if (!resolved) {
      throw new UnknownDistancePresetError(options.preset, Object.keys(PRESETS));
    }
    return resolved;
  }

  return { space: options.space, method: options.method };
}

/**
 * Compute the distance between two colors.
 *
 * Without options, returns Euclidean distance in RGB space (backward-compatible).
 * Pass a preset or explicit {space, method} for perceptual distance metrics.
 */
export function distance(
  a: KleurValue,
  b: KleurValue,
  options?: DistanceOptions,
): number {
  const ca = resolve(a);
  const cb = resolve(b);
  const { space, method } = resolveOptions(options);

  const converter = SPACE_CONVERTERS[space];
  if (!converter) {
    throw new UnknownColorSpaceError(space, Object.keys(SPACE_CONVERTERS));
  }

  const distanceFn = DISTANCE_METHODS[method];
  if (!distanceFn) {
    throw new UnknownDistanceMethodError(method, Object.keys(DISTANCE_METHODS));
  }

  const validSpaces = VALID_COMBINATIONS[method];
  if (validSpaces && !validSpaces.has(space)) {
    throw new InvalidDistanceCombinationError(method, space, [...validSpaces]);
  }

  return distanceFn(converter(ca), converter(cb));
}
