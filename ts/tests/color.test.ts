import { describe, it, expect } from "vitest";
import { rgb } from "../src/parse.js";
import { rgbToHsl, hslToRgb } from "../src/hsl.js";

describe("Color", () => {
  describe("construction and clamping", () => {
    it("stores RGBA values", () => {
      const c = rgb(66, 135, 245);
      expect(c.r).toBe(66);
      expect(c.g).toBe(135);
      expect(c.b).toBe(245);
      expect(c.a).toBe(1);
    });

    it("defaults alpha to 1", () => {
      const c = rgb(0, 0, 0);
      expect(c.a).toBe(1);
    });

    it("accepts explicit alpha", () => {
      const c = rgb(0, 0, 0, 0.5);
      expect(c.a).toBe(0.5);
    });

    it("clamps RGB below 0", () => {
      const c = rgb(-10, -1, -255);
      expect(c.r).toBe(0);
      expect(c.g).toBe(0);
      expect(c.b).toBe(0);
    });

    it("clamps RGB above 255", () => {
      const c = rgb(300, 256, 999);
      expect(c.r).toBe(255);
      expect(c.g).toBe(255);
      expect(c.b).toBe(255);
    });

    it("rounds fractional RGB values", () => {
      const c = rgb(66.7, 135.2, 244.5);
      expect(c.r).toBe(67);
      expect(c.g).toBe(135);
      expect(c.b).toBe(245);
    });

    it("clamps alpha below 0", () => {
      const c = rgb(0, 0, 0, -0.5);
      expect(c.a).toBe(0);
    });

    it("clamps alpha above 1", () => {
      const c = rgb(0, 0, 0, 1.5);
      expect(c.a).toBe(1);
    });
  });

  describe("channel getters", () => {
    it("returns RGB channels", () => {
      const c = rgb(10, 20, 30, 0.8);
      expect(c.red).toBe(10);
      expect(c.green).toBe(20);
      expect(c.blue).toBe(30);
      expect(c.alpha).toBe(0.8);
    });

    it("returns HSL channels for a known color", () => {
      // Pure red: h=0, s=100, l=50
      const red = rgb(255, 0, 0);
      expect(red.hue).toBe(0);
      expect(red.saturation).toBe(100);
      expect(red.lightness).toBe(50);
    });

    it("returns HSL for pure green", () => {
      const green = rgb(0, 128, 0);
      expect(green.hue).toBe(120);
      expect(green.saturation).toBe(100);
      expect(green.lightness).toBe(25);
    });

    it("returns HSL for pure blue", () => {
      const blue = rgb(0, 0, 255);
      expect(blue.hue).toBe(240);
      expect(blue.saturation).toBe(100);
      expect(blue.lightness).toBe(50);
    });
  });

  describe("immutable setters", () => {
    const base = rgb(100, 150, 200, 0.9);

    it("withRed returns new instance", () => {
      const changed = base.withRed(50);
      expect(changed.r).toBe(50);
      expect(changed.g).toBe(150);
      expect(changed.b).toBe(200);
      expect(changed.a).toBe(0.9);
      // original unchanged
      expect(base.r).toBe(100);
      expect(changed).not.toBe(base);
    });

    it("withGreen returns new instance", () => {
      const changed = base.withGreen(50);
      expect(changed.g).toBe(50);
      expect(base.g).toBe(150);
    });

    it("withBlue returns new instance", () => {
      const changed = base.withBlue(50);
      expect(changed.b).toBe(50);
      expect(base.b).toBe(200);
    });

    it("withAlpha returns new instance", () => {
      const changed = base.withAlpha(0.3);
      expect(changed.a).toBe(0.3);
      expect(base.a).toBe(0.9);
    });

    it("withAlpha clamps values", () => {
      expect(base.withAlpha(-1).a).toBe(0);
      expect(base.withAlpha(2).a).toBe(1);
    });

    it("withRed clamps values", () => {
      expect(base.withRed(-10).r).toBe(0);
      expect(base.withRed(999).r).toBe(255);
    });

    it("withHue returns new instance with updated hue", () => {
      const red = rgb(255, 0, 0);
      const rotated = red.withHue(120);
      // Hue 120 = green area
      expect(rotated.hue).toBe(120);
      expect(red.hue).toBe(0);
      expect(rotated).not.toBe(red);
    });

    it("withSaturation returns new instance", () => {
      const c = rgb(255, 0, 0);
      const desat = c.withSaturation(50);
      expect(desat.saturation).toBe(50);
      expect(c.saturation).toBe(100);
    });

    it("withLightness returns new instance", () => {
      const c = rgb(255, 0, 0);
      const lighter = c.withLightness(75);
      expect(lighter.lightness).toBe(75);
      expect(c.lightness).toBe(50);
    });

    it("withSaturation clamps to 0-100", () => {
      const c = rgb(255, 0, 0);
      expect(c.withSaturation(-10).saturation).toBe(0);
      expect(c.withSaturation(200).saturation).toBe(100);
    });

    it("withLightness clamps to 0-100", () => {
      const c = rgb(255, 0, 0);
      expect(c.withLightness(-10).lightness).toBe(0);
      expect(c.withLightness(200).lightness).toBe(100);
    });
  });

  describe("edge cases", () => {
    it("pure black", () => {
      const black = rgb(0, 0, 0);
      expect(black.r).toBe(0);
      expect(black.g).toBe(0);
      expect(black.b).toBe(0);
      expect(black.lightness).toBe(0);
      expect(black.saturation).toBe(0);
    });

    it("pure white", () => {
      const white = rgb(255, 255, 255);
      expect(white.r).toBe(255);
      expect(white.g).toBe(255);
      expect(white.b).toBe(255);
      expect(white.lightness).toBe(100);
      expect(white.saturation).toBe(0);
    });

    it("fully transparent", () => {
      const transparent = rgb(255, 0, 0, 0);
      expect(transparent.a).toBe(0);
      expect(transparent.alpha).toBe(0);
      expect(transparent.r).toBe(255);
    });

    it("gray has zero saturation", () => {
      const gray = rgb(128, 128, 128);
      expect(gray.saturation).toBe(0);
    });
  });

  describe("HSL round-tripping", () => {
    const testCases = [
      { name: "red", r: 255, g: 0, b: 0 },
      { name: "green", r: 0, g: 128, b: 0 },
      { name: "blue", r: 0, g: 0, b: 255 },
      { name: "yellow", r: 255, g: 255, b: 0 },
      { name: "cyan", r: 0, g: 255, b: 255 },
      { name: "magenta", r: 255, g: 0, b: 255 },
      { name: "white", r: 255, g: 255, b: 255 },
      { name: "black", r: 0, g: 0, b: 0 },
      { name: "mid gray", r: 128, g: 128, b: 128 },
      { name: "cornflower blue", r: 100, g: 149, b: 237 },
    ];

    for (const { name, r, g, b } of testCases) {
      it(`round-trips ${name} within +/-1`, () => {
        const original = rgb(r, g, b);
        const h = original.hue;
        const s = original.saturation;
        const l = original.lightness;
        const converted = hslToRgb(h, s, l);
        const roundTripped = rgb(converted.r, converted.g, converted.b);

        expect(Math.abs(roundTripped.r - r)).toBeLessThanOrEqual(1);
        expect(Math.abs(roundTripped.g - g)).toBeLessThanOrEqual(1);
        expect(Math.abs(roundTripped.b - b)).toBeLessThanOrEqual(1);
      });
    }
  });

  describe("hue wrapping at 360", () => {
    it("withHue wraps negative values", () => {
      const c = rgb(255, 0, 0);
      const wrapped = c.withHue(-30);
      expect(wrapped.hue).toBe(330);
    });

    it("withHue wraps values above 360", () => {
      const c = rgb(255, 0, 0);
      const wrapped = c.withHue(390);
      expect(wrapped.hue).toBe(30);
    });

    it("withHue 360 wraps to 0", () => {
      const c = rgb(255, 0, 0);
      const wrapped = c.withHue(360);
      expect(wrapped.hue).toBe(0);
    });
  });
});
