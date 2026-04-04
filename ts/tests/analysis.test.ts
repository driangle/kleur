import { describe, it, expect } from "vitest";
import { rgb } from "../src/parse.js";
import type { Color } from "../src/color.js";
import { luminance, isLight, isDark, contrast, distance } from "../src/analysis.js";

const white = rgb(255, 255, 255);
const black = rgb(0, 0, 0);
const red = rgb(255, 0, 0);
const green = rgb(0, 128, 0);
const blue = rgb(0, 0, 255);
const gray = rgb(128, 128, 128);

describe("luminance()", () => {
  it("white luminance = 1.0", () => {
    expect(luminance(white)).toBeCloseTo(1.0, 5);
  });

  it("black luminance = 0.0", () => {
    expect(luminance(black)).toBeCloseTo(0.0, 5);
  });

  it("red has known luminance", () => {
    // Pure red: 0.2126 * 1.0 = 0.2126
    expect(luminance(red)).toBeCloseTo(0.2126, 4);
  });

  it("pure blue has known luminance", () => {
    // Pure blue: 0.0722 * 1.0 = 0.0722
    expect(luminance(blue)).toBeCloseTo(0.0722, 4);
  });

  it("luminance is between 0 and 1", () => {
    const colors = [white, black, red, green, blue, gray];
    for (const c of colors) {
      const l = luminance(c);
      expect(l).toBeGreaterThanOrEqual(0);
      expect(l).toBeLessThanOrEqual(1);
    }
  });
});

describe("isLight() / isDark()", () => {
  it("white is light", () => {
    expect(isLight(white)).toBe(true);
    expect(isDark(white)).toBe(false);
  });

  it("black is dark", () => {
    expect(isLight(black)).toBe(false);
    expect(isDark(black)).toBe(true);
  });

  it("are mutually exclusive", () => {
    const colors = [white, black, red, green, blue, gray];
    for (const c of colors) {
      expect(isLight(c)).not.toBe(isDark(c));
    }
  });

  it("gray (l=50) is dark (<=50)", () => {
    expect(isDark(gray)).toBe(true);
    expect(isLight(gray)).toBe(false);
  });

  it("light color (l > 50) is light", () => {
    const light = rgb(200, 200, 200); // l=78
    expect(isLight(light)).toBe(true);
  });
});

describe("contrast()", () => {
  it("black/white contrast = 21", () => {
    expect(contrast(white, black)).toBeCloseTo(21, 0);
  });

  it("same color has contrast ratio of 1", () => {
    expect(contrast(red, red)).toBeCloseTo(1, 5);
  });

  it("contrast is symmetric", () => {
    expect(contrast(white, black)).toBeCloseTo(contrast(black, white), 5);
  });

  it("contrast ratio is between 1 and 21", () => {
    const pairs: [Color, Color][] = [
      [white, black],
      [red, blue],
      [green, gray],
      [red, white],
    ];
    for (const [a, b] of pairs) {
      const c = contrast(a, b);
      expect(c).toBeGreaterThanOrEqual(1);
      expect(c).toBeLessThanOrEqual(21);
    }
  });
});

describe("distance()", () => {
  it("identical colors have distance 0", () => {
    expect(distance(red, red)).toBe(0);
    expect(distance(white, white)).toBe(0);
    expect(distance(black, black)).toBe(0);
  });

  it("black to white has known distance", () => {
    // sqrt(255^2 + 255^2 + 255^2) = sqrt(195075) ≈ 441.67
    expect(distance(black, white)).toBeCloseTo(441.67, 1);
  });

  it("distance is symmetric", () => {
    expect(distance(red, blue)).toBeCloseTo(distance(blue, red), 5);
  });

  it("distance is non-negative", () => {
    expect(distance(red, green)).toBeGreaterThanOrEqual(0);
  });
});
