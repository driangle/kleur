import { describe, it, expect } from "vitest";
import { rgb } from "../src/parse.js";
import { distance } from "../src/distance.js";
import type { DistanceOptions } from "../src/types.js";

/**
 * Type-level tests for distance space+method combinations.
 *
 * Lines marked @ts-expect-error verify that invalid combinations
 * produce compile errors. The vitest assertions below are just
 * smoke tests — the real value is the type checking.
 */

const red = rgb(255, 0, 0);
const blue = rgb(0, 0, 255);

describe("distance() type-level safety", () => {
  describe("valid combinations compile", () => {
    it("euclidean works with any space", () => {
      expect(
        distance(red, blue, { space: "rgb", method: "euclidean" }),
      ).toBeGreaterThan(0);
      expect(
        distance(red, blue, { space: "hsl", method: "euclidean" }),
      ).toBeGreaterThan(0);
      expect(
        distance(red, blue, { space: "lab", method: "euclidean" }),
      ).toBeGreaterThan(0);
      expect(
        distance(red, blue, { space: "lch", method: "euclidean" }),
      ).toBeGreaterThan(0);
      expect(
        distance(red, blue, { space: "oklab", method: "euclidean" }),
      ).toBeGreaterThan(0);
      expect(
        distance(red, blue, { space: "oklch", method: "euclidean" }),
      ).toBeGreaterThan(0);
    });

    it("deltaE methods work with lab", () => {
      expect(
        distance(red, blue, { space: "lab", method: "deltaE76" }),
      ).toBeGreaterThan(0);
      expect(
        distance(red, blue, { space: "lab", method: "deltaE94" }),
      ).toBeGreaterThan(0);
      expect(
        distance(red, blue, { space: "lab", method: "deltaE2000" }),
      ).toBeGreaterThan(0);
    });

    it("deltaEOK works with oklab", () => {
      expect(
        distance(red, blue, { space: "oklab", method: "deltaEOK" }),
      ).toBeGreaterThan(0);
    });

    it("presets compile", () => {
      expect(distance(red, blue, { preset: "fast" })).toBeGreaterThan(0);
      expect(distance(red, blue, { preset: "perceptual" })).toBeGreaterThan(0);
      expect(distance(red, blue, { preset: "accurate" })).toBeGreaterThan(0);
      expect(distance(red, blue, { preset: "modern" })).toBeGreaterThan(0);
    });
  });

  describe("invalid combinations produce compile errors", () => {
    it("deltaE76 rejects non-lab spaces", () => {
      // @ts-expect-error — deltaE76 requires lab space
      const _opts: DistanceOptions = { space: "rgb", method: "deltaE76" };
      expect(_opts).toBeDefined();
    });

    it("deltaE94 rejects non-lab spaces", () => {
      // @ts-expect-error — deltaE94 requires lab space
      const _opts: DistanceOptions = { space: "hsl", method: "deltaE94" };
      expect(_opts).toBeDefined();
    });

    it("deltaE2000 rejects non-lab spaces", () => {
      // @ts-expect-error — deltaE2000 requires lab space
      const _opts: DistanceOptions = { space: "oklab", method: "deltaE2000" };
      expect(_opts).toBeDefined();
    });

    it("deltaEOK rejects non-oklab spaces", () => {
      // @ts-expect-error — deltaEOK requires oklab space
      const _opts: DistanceOptions = { space: "lab", method: "deltaEOK" };
      expect(_opts).toBeDefined();
    });

    it("deltaEOK rejects rgb space", () => {
      // @ts-expect-error — deltaEOK requires oklab space
      const _opts: DistanceOptions = { space: "rgb", method: "deltaEOK" };
      expect(_opts).toBeDefined();
    });
  });
});
