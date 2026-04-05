import { describe, it, expect } from "vitest";
import { rgbToHsl, hslToRgb } from "../src/hsl.js";

describe("rgbToHsl", () => {
  it("converts pure red", () => {
    expect(rgbToHsl(255, 0, 0)).toEqual({ h: 0, s: 100, l: 50 });
  });

  it("converts pure green (0,255,0)", () => {
    expect(rgbToHsl(0, 255, 0)).toEqual({ h: 120, s: 100, l: 50 });
  });

  it("converts pure blue", () => {
    expect(rgbToHsl(0, 0, 255)).toEqual({ h: 240, s: 100, l: 50 });
  });

  it("converts white", () => {
    expect(rgbToHsl(255, 255, 255)).toEqual({ h: 0, s: 0, l: 100 });
  });

  it("converts black", () => {
    expect(rgbToHsl(0, 0, 0)).toEqual({ h: 0, s: 0, l: 0 });
  });

  it("converts gray", () => {
    const { h, s, l } = rgbToHsl(128, 128, 128);
    expect(s).toBe(0);
    expect(l).toBeCloseTo(50.2, 0);
    expect(h).toBe(0);
  });

  it("converts a mid-range color", () => {
    // cornflower blue: rgb(100, 149, 237)
    const { h, s, l } = rgbToHsl(100, 149, 237);
    expect(h).toBeCloseTo(218.4, 0);
    expect(s).toBeCloseTo(79.4, 0);
    expect(l).toBeCloseTo(66.1, 0);
  });
});

describe("hslToRgb", () => {
  it("converts h=0 s=100 l=50 to red", () => {
    expect(hslToRgb(0, 100, 50)).toEqual({ r: 255, g: 0, b: 0 });
  });

  it("converts h=120 s=100 l=50 to green", () => {
    expect(hslToRgb(120, 100, 50)).toEqual({ r: 0, g: 255, b: 0 });
  });

  it("converts h=240 s=100 l=50 to blue", () => {
    expect(hslToRgb(240, 100, 50)).toEqual({ r: 0, g: 0, b: 255 });
  });

  it("converts achromatic (s=0) to gray", () => {
    const result = hslToRgb(0, 0, 50);
    expect(result.r).toBe(result.g);
    expect(result.g).toBe(result.b);
    expect(result.r).toBe(128);
  });

  it("converts l=0 to black", () => {
    expect(hslToRgb(0, 100, 0)).toEqual({ r: 0, g: 0, b: 0 });
  });

  it("converts l=100 to white", () => {
    expect(hslToRgb(0, 100, 100)).toEqual({ r: 255, g: 255, b: 255 });
  });
});

describe("round-trip accuracy", () => {
  const colors = [
    [255, 0, 0],
    [0, 255, 0],
    [0, 0, 255],
    [255, 255, 0],
    [0, 255, 255],
    [255, 0, 255],
    [128, 128, 128],
    [100, 149, 237],
    [255, 165, 0],
    [75, 0, 130],
  ] as const;

  for (const [r, g, b] of colors) {
    it(`rgb(${r},${g},${b}) -> hsl -> rgb is exact`, () => {
      const hsl = rgbToHsl(r, g, b);
      const back = hslToRgb(hsl.h, hsl.s, hsl.l);
      expect(back.r).toBe(r);
      expect(back.g).toBe(g);
      expect(back.b).toBe(b);
    });
  }
});
