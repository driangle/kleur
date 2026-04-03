import { describe, it, expect } from "vitest";
import { random } from "../src/random.js";

const ITERATIONS = 50;

describe("random()", () => {
  it("returns a valid color with no options", () => {
    for (let i = 0; i < ITERATIONS; i++) {
      const c = random();
      expect(c.r).toBeGreaterThanOrEqual(0);
      expect(c.r).toBeLessThanOrEqual(255);
      expect(c.g).toBeGreaterThanOrEqual(0);
      expect(c.g).toBeLessThanOrEqual(255);
      expect(c.b).toBeGreaterThanOrEqual(0);
      expect(c.b).toBeLessThanOrEqual(255);
      expect(c.a).toBe(1);
    }
  });

  it("respects hue: 'warm' constraint", () => {
    for (let i = 0; i < ITERATIONS; i++) {
      const c = random({ hue: "warm" });
      const h = c.hue();
      // Warm: 0-90 or 330-360
      const isWarm = h <= 90 || h >= 330;
      expect(isWarm).toBe(true);
    }
  });

  it("respects hue: 'cool' constraint", () => {
    for (let i = 0; i < ITERATIONS; i++) {
      // Use high saturation so hue is meaningful after round-trip
      const c = random({ hue: "cool", saturation: [50, 100], lightness: [30, 70] });
      const h = c.hue();
      // Cool: 90-330 (HSL round-trip can shift hue by a few degrees)
      expect(h).toBeGreaterThanOrEqual(85);
      expect(h).toBeLessThanOrEqual(335);
    }
  });

  it("respects hue: [min, max] constraint", () => {
    for (let i = 0; i < ITERATIONS; i++) {
      // Use high saturation so hue is meaningful after round-trip
      const c = random({ hue: [200, 250], saturation: [50, 100], lightness: [30, 70] });
      const h = c.hue();
      // HSL round-trip rounding can shift hue by a few degrees
      expect(h).toBeGreaterThanOrEqual(195);
      expect(h).toBeLessThanOrEqual(255);
    }
  });

  it("respects saturation constraint", () => {
    for (let i = 0; i < ITERATIONS; i++) {
      const c = random({ saturation: [80, 100] });
      const s = c.saturation();
      expect(s).toBeGreaterThanOrEqual(79);
      expect(s).toBeLessThanOrEqual(100);
    }
  });

  it("respects lightness constraint", () => {
    for (let i = 0; i < ITERATIONS; i++) {
      const c = random({ lightness: [40, 60] });
      const l = c.lightness();
      expect(l).toBeGreaterThanOrEqual(39);
      expect(l).toBeLessThanOrEqual(61);
    }
  });

  it("respects alpha option", () => {
    for (let i = 0; i < ITERATIONS; i++) {
      const c = random({ alpha: 0.5 });
      expect(c.a).toBe(0.5);
    }
  });

  it("composes multiple constraints", () => {
    for (let i = 0; i < ITERATIONS; i++) {
      const c = random({
        hue: "warm",
        saturation: [80, 100],
        lightness: [40, 60],
        alpha: 0.8,
      });
      const h = c.hue();
      expect(h <= 90 || h >= 330).toBe(true);
      expect(c.saturation()).toBeGreaterThanOrEqual(79);
      expect(c.lightness()).toBeGreaterThanOrEqual(39);
      expect(c.lightness()).toBeLessThanOrEqual(61);
      expect(c.a).toBe(0.8);
    }
  });
});
