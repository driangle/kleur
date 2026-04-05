import { describe, it, expect } from "vitest";
import { rgb } from "../src/parse.js";
import {
  triadic,
  tetradic,
  analogous,
  splitComplement,
  tints,
  shades,
  tones,
} from "../src/harmony.js";
import { InvalidCountError } from "../src/errors.js";

const red = rgb(255, 0, 0); // hue=0, s=100, l=50

describe("triadic()", () => {
  it("returns exactly 3 colors", () => {
    expect(triadic(red)).toHaveLength(3);
  });

  it("has hues 120 degrees apart", () => {
    const [c1, c2, c3] = triadic(red);
    expect(c1.hue).toBe(0);
    expect(c2.hue).toBe(120);
    expect(c3.hue).toBe(240);
  });

  it("first color is the original", () => {
    const [c1] = triadic(red);
    expect(c1.red).toBe(red.red);
    expect(c1.green).toBe(red.green);
    expect(c1.blue).toBe(red.blue);
  });
});

describe("tetradic()", () => {
  it("returns exactly 4 colors", () => {
    expect(tetradic(red)).toHaveLength(4);
  });

  it("has hues 90 degrees apart", () => {
    const [c1, c2, c3, c4] = tetradic(red);
    expect(c1.hue).toBe(0);
    expect(c2.hue).toBeCloseTo(90, 0);
    expect(c3.hue).toBeCloseTo(180, 0);
    expect(c4.hue).toBeCloseTo(270, 0);
  });
});

describe("analogous()", () => {
  it("returns exactly 3 colors", () => {
    expect(analogous(red)).toHaveLength(3);
  });

  it("defaults to 30 degree angle", () => {
    const [left, center, right] = analogous(red);
    expect(center.hue).toBe(0);
    expect(left.hue).toBeCloseTo(330, 0); // -30 wraps
    expect(right.hue).toBeCloseTo(30, 0);
  });

  it("respects custom angle", () => {
    const [left, center, right] = analogous(red, 45);
    expect(center.hue).toBe(0);
    expect(left.hue).toBeCloseTo(315, 0); // -45 wraps
    expect(right.hue).toBeCloseTo(45, 0);
  });
});

describe("splitComplement()", () => {
  it("returns exactly 3 colors", () => {
    expect(splitComplement(red)).toHaveLength(3);
  });

  it("returns base + two colors at 180 +/- angle", () => {
    const [base, left, right] = splitComplement(red, 30);
    expect(base.hue).toBe(0);
    expect(left.hue).toBeCloseTo(150, 0); // 180 - 30
    expect(right.hue).toBeCloseTo(210, 0); // 180 + 30
  });
});

describe("count validation", () => {
  const cases = [
    { name: "tints", fn: (n: number) => tints(red, n) },
    { name: "shades", fn: (n: number) => shades(red, n) },
    { name: "tones", fn: (n: number) => tones(red, n) },
  ];

  for (const { name, fn } of cases) {
    it(`${name}(Infinity) throws InvalidCountError`, () => {
      expect(() => fn(Infinity)).toThrow(InvalidCountError);
    });

    it(`${name}(-Infinity) throws InvalidCountError`, () => {
      expect(() => fn(-Infinity)).toThrow(InvalidCountError);
    });

    it(`${name}(NaN) throws InvalidCountError`, () => {
      expect(() => fn(NaN)).toThrow(InvalidCountError);
    });

    it(`${name}(-1) throws InvalidCountError`, () => {
      expect(() => fn(-1)).toThrow(InvalidCountError);
    });

    it(`${name}(1.5) throws InvalidCountError`, () => {
      expect(() => fn(1.5)).toThrow(InvalidCountError);
    });

    it(`${name}(0) returns empty array`, () => {
      expect(fn(0)).toEqual([]);
    });
  }
});

describe("tints()", () => {
  it("returns requested count", () => {
    expect(tints(red, 5)).toHaveLength(5);
  });

  it("each tint is lighter than the previous", () => {
    const t = tints(red, 5);
    for (let i = 1; i < t.length; i++) {
      expect(t[i].lightness).toBeGreaterThan(t[i - 1].lightness);
    }
  });

  it("all tints are lighter than the original", () => {
    const t = tints(red, 3);
    for (const c of t) {
      expect(c.lightness).toBeGreaterThan(red.lightness);
    }
  });
});

describe("shades()", () => {
  it("returns requested count", () => {
    expect(shades(red, 5)).toHaveLength(5);
  });

  it("each shade is darker than the previous", () => {
    const s = shades(red, 5);
    for (let i = 1; i < s.length; i++) {
      expect(s[i].lightness).toBeLessThan(s[i - 1].lightness);
    }
  });

  it("all shades are darker than the original", () => {
    const s = shades(red, 3);
    for (const c of s) {
      expect(c.lightness).toBeLessThan(red.lightness);
    }
  });
});

describe("tones()", () => {
  it("returns requested count", () => {
    expect(tones(red, 5)).toHaveLength(5);
  });

  it("each tone is less saturated than the previous", () => {
    const t = tones(red, 5);
    for (let i = 1; i < t.length; i++) {
      expect(t[i].hsl.s).toBeLessThan(t[i - 1].hsl.s);
    }
  });

  it("all tones are less saturated than the original", () => {
    const t = tones(red, 3);
    for (const c of t) {
      expect(c.hsl.s).toBeLessThan(red.hsl.s);
    }
  });
});
