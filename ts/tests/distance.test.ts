import { describe, it, expect } from "vitest";
import { KleurStruct } from "../src/kleur-struct.js";
import { distance } from "../src/distance.js";
import type { DistanceOptions } from "../src/types.js";

const red = new KleurStruct(255, 0, 0);
const blue = new KleurStruct(0, 0, 255);
const white = new KleurStruct(255, 255, 255);
const black = new KleurStruct(0, 0, 0);
const green = new KleurStruct(0, 128, 0);

describe("distance() with options", () => {
  describe("backward compatibility", () => {
    it("no options matches RGB Euclidean", () => {
      expect(distance(black, white)).toBeCloseTo(441.67, 1);
    });

    it("preset 'fast' matches no-options default", () => {
      const d1 = distance(red, blue);
      const d2 = distance(red, blue, { preset: "fast" });
      expect(d1).toBe(d2);
    });

    it("identical colors have distance 0 with any preset", () => {
      const presets = ["fast", "perceptual", "accurate", "modern"] as const;
      for (const preset of presets) {
        expect(distance(red, red, { preset })).toBe(0);
      }
    });
  });

  describe("presets", () => {
    it("each preset produces a distinct result for the same pair", () => {
      const presets = ["fast", "perceptual", "accurate", "modern"] as const;
      const results = presets.map((preset) => distance(red, blue, { preset }));

      // All should be positive
      for (const r of results) {
        expect(r).toBeGreaterThan(0);
      }

      // All should be distinct from each other
      const unique = new Set(results.map((r) => r.toFixed(6)));
      expect(unique.size).toBe(presets.length);
    });

    it("perceptual preset uses Lab deltaE94", () => {
      const preset = distance(red, green, { preset: "perceptual" });
      const explicit = distance(red, green, { space: "lab", method: "deltaE94" });
      expect(preset).toBe(explicit);
    });

    it("accurate preset uses Lab deltaE2000", () => {
      const preset = distance(red, green, { preset: "accurate" });
      const explicit = distance(red, green, { space: "lab", method: "deltaE2000" });
      expect(preset).toBe(explicit);
    });

    it("modern preset uses OKLab deltaEOK", () => {
      const preset = distance(red, green, { preset: "modern" });
      const explicit = distance(red, green, { space: "oklab", method: "deltaEOK" });
      expect(preset).toBe(explicit);
    });
  });

  describe("explicit space+method", () => {
    it("rgb euclidean works", () => {
      const d = distance(red, blue, { space: "rgb", method: "euclidean" });
      expect(d).toBeCloseTo(360.62, 1);
    });

    it("hsl euclidean works", () => {
      const d = distance(red, blue, { space: "hsl", method: "euclidean" });
      expect(d).toBeGreaterThan(0);
    });

    it("lab deltaE76 works", () => {
      const d = distance(red, blue, { space: "lab", method: "deltaE76" });
      expect(d).toBeGreaterThan(0);
    });

    it("lab deltaE2000 works", () => {
      const d = distance(red, blue, { space: "lab", method: "deltaE2000" });
      expect(d).toBeGreaterThan(0);
    });

    it("oklab deltaEOK works", () => {
      const d = distance(red, blue, { space: "oklab", method: "deltaEOK" });
      expect(d).toBeGreaterThan(0);
    });

    it("distance is symmetric for symmetric methods", () => {
      // deltaE94 is intentionally asymmetric (uses C1 as reference)
      const configs: DistanceOptions[] = [
        { space: "lab", method: "deltaE76" },
        { space: "lab", method: "deltaE2000" },
        { space: "oklab", method: "deltaEOK" },
      ];
      for (const opts of configs) {
        expect(distance(red, blue, opts)).toBeCloseTo(
          distance(blue, red, opts), 5,
        );
      }
    });
  });

  describe("validation", () => {
    it("throws for invalid space+method combination", () => {
      expect(() =>
        distance(red, blue, { space: "rgb", method: "deltaE2000" }),
      ).toThrow('Method "deltaE2000" is not valid for space "rgb"');
    });

    it("throws for deltaE94 on non-lab space", () => {
      expect(() =>
        distance(red, blue, { space: "oklab", method: "deltaE94" }),
      ).toThrow('not valid for space "oklab"');
    });

    it("throws for deltaEOK on non-oklab space", () => {
      expect(() =>
        distance(red, blue, { space: "lab", method: "deltaEOK" }),
      ).toThrow('not valid for space "lab"');
    });

    it("euclidean works with any space", () => {
      const spaces = ["rgb", "hsl", "lab", "lch", "oklab", "oklch"] as const;
      for (const space of spaces) {
        expect(() =>
          distance(red, blue, { space, method: "euclidean" }),
        ).not.toThrow();
      }
    });
  });

  describe("known reference values", () => {
    it("deltaE2000 for red vs blue is in expected range", () => {
      // Red vs Blue should be a large perceptual difference
      const d = distance(red, blue, { space: "lab", method: "deltaE2000" });
      expect(d).toBeGreaterThan(40);
      expect(d).toBeLessThan(200);
    });

    it("perceptually similar colors have small deltaE", () => {
      const c1 = new KleurStruct(100, 100, 100);
      const c2 = new KleurStruct(102, 100, 98);
      const d = distance(c1, c2, { preset: "accurate" });
      expect(d).toBeLessThan(2);
    });
  });
});
