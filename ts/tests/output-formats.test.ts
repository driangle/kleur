import { describe, it, expect } from "vitest";
import { rgb } from "../src/parse.js";

describe("output format conversions", () => {
  const red = rgb(255, 0, 0);
  const blue = rgb(0, 0, 255, 0.5);
  const cornflower = rgb(100, 149, 237);
  const black = rgb(0, 0, 0);
  const white = rgb(255, 255, 255);

  describe("toHex()", () => {
    it("returns lowercase 6-digit hex with # prefix", () => {
      expect(red.toHex()).toBe("#ff0000");
      expect(blue.toHex()).toBe("#0000ff");
      expect(cornflower.toHex()).toBe("#6495ed");
      expect(black.toHex()).toBe("#000000");
      expect(white.toHex()).toBe("#ffffff");
    });

    it("pads single-digit hex values", () => {
      const dark = rgb(1, 2, 3);
      expect(dark.toHex()).toBe("#010203");
    });
  });

  describe("toCss()", () => {
    it("returns rgba() string", () => {
      expect(red.toCss()).toBe("rgba(255,0,0,1)");
      expect(blue.toCss()).toBe("rgba(0,0,255,0.5)");
    });
  });

  describe("toRgb()", () => {
    it("returns {r, g, b} object", () => {
      expect(red.toRgb()).toEqual({ r: 255, g: 0, b: 0 });
      expect(cornflower.toRgb()).toEqual({ r: 100, g: 149, b: 237 });
    });

    it("does not include alpha", () => {
      const result = blue.toRgb();
      expect(result).not.toHaveProperty("a");
    });
  });

  describe("toRgba()", () => {
    it("returns {r, g, b, a} object", () => {
      expect(red.toRgba()).toEqual({ r: 255, g: 0, b: 0, a: 1 });
      expect(blue.toRgba()).toEqual({ r: 0, g: 0, b: 255, a: 0.5 });
    });
  });

  describe("toHsl()", () => {
    it("returns {h, s, l} object", () => {
      expect(red.toHsl()).toEqual({ h: 0, s: 100, l: 50 });
    });

    it("does not include alpha", () => {
      const result = blue.toHsl();
      expect(result).not.toHaveProperty("a");
    });
  });

  describe("toHsla()", () => {
    it("returns {h, s, l, a} object", () => {
      expect(red.toHsla()).toEqual({ h: 0, s: 100, l: 50, a: 1 });
      expect(blue.toHsla()).toEqual({ h: 240, s: 100, l: 50, a: 0.5 });
    });
  });

  describe("toArray()", () => {
    it("returns [r, g, b, a] tuple", () => {
      expect(red.toArray()).toEqual([255, 0, 0, 1]);
      expect(blue.toArray()).toEqual([0, 0, 255, 0.5]);
    });
  });

  describe("toNormalized()", () => {
    it("returns values in 0-1 range", () => {
      const [r, g, b, a] = white.toNormalized();
      expect(r).toBeCloseTo(1);
      expect(g).toBeCloseTo(1);
      expect(b).toBeCloseTo(1);
      expect(a).toBe(1);
    });

    it("normalizes RGB channels correctly", () => {
      const [r, g, b, a] = cornflower.toNormalized();
      expect(r).toBeCloseTo(100 / 255);
      expect(g).toBeCloseTo(149 / 255);
      expect(b).toBeCloseTo(237 / 255);
      expect(a).toBe(1);
    });

    it("black normalizes to zeros", () => {
      const [r, g, b] = black.toNormalized();
      expect(r).toBe(0);
      expect(g).toBe(0);
      expect(b).toBe(0);
    });

    it("preserves alpha as-is (already 0-1)", () => {
      const [, , , a] = blue.toNormalized();
      expect(a).toBe(0.5);
    });
  });

  describe("toString()", () => {
    it("returns same value as toCss()", () => {
      expect(red.toString()).toBe(red.toCss());
      expect(blue.toString()).toBe(blue.toCss());
      expect(cornflower.toString()).toBe(cornflower.toCss());
    });
  });
});
