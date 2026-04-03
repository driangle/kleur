/**
 * Color distance computation with configurable space and method.
 */
import type { KleurStruct } from "./kleur-struct.js";
import type { DistanceOptions } from "./types.js";
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

// --- Space converters (KleurStruct → 3-component tuple) ---

const SPACE_CONVERTERS: Record<string, (c: KleurStruct) => Triple> = {
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
      throw new Error(
        `Unknown distance preset "${options.preset}". Valid presets: ${Object.keys(PRESETS).join(", ")}`,
      );
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
  a: KleurStruct,
  b: KleurStruct,
  options?: DistanceOptions,
): number {
  const { space, method } = resolveOptions(options);

  const converter = SPACE_CONVERTERS[space];
  if (!converter) {
    throw new Error(
      `Unknown color space "${space}". Valid spaces: ${Object.keys(SPACE_CONVERTERS).join(", ")}`,
    );
  }

  const distanceFn = DISTANCE_METHODS[method];
  if (!distanceFn) {
    throw new Error(
      `Unknown distance method "${method}". Valid methods: ${Object.keys(DISTANCE_METHODS).join(", ")}`,
    );
  }

  const validSpaces = VALID_COMBINATIONS[method];
  if (validSpaces && !validSpaces.has(space)) {
    throw new Error(
      `Method "${method}" is not valid for space "${space}". Valid spaces for ${method}: ${[...validSpaces].join(", ")}`,
    );
  }

  return distanceFn(converter(a), converter(b));
}
