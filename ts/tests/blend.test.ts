import { describe, it, expect } from "vitest";
import { Color } from "../src/color.js";
import { blend, mix, lerp } from "../src/blend.js";

const white = new Color(255, 255, 255);
const black = new Color(0, 0, 0);
const red = new Color(255, 0, 0);
const mid = new Color(128, 128, 128);

describe("blend()", () => {
  describe("multiply", () => {
    it("multiply with white is identity", () => {
      const result = blend(red, white, "multiply");
      expect(result.r).toBe(255);
      expect(result.g).toBe(0);
      expect(result.b).toBe(0);
    });

    it("multiply with black is black", () => {
      const result = blend(red, black, "multiply");
      expect(result.r).toBe(0);
      expect(result.g).toBe(0);
      expect(result.b).toBe(0);
    });

    it("multiply mid * mid ≈ 64", () => {
      const result = blend(mid, mid, "multiply");
      // (128/255)^2 * 255 ≈ 64.25
      expect(result.r).toBeCloseTo(64, 0);
    });
  });

  describe("screen", () => {
    it("screen with black is identity", () => {
      const result = blend(red, black, "screen");
      expect(result.r).toBe(255);
      expect(result.g).toBe(0);
      expect(result.b).toBe(0);
    });

    it("screen with white is white", () => {
      const result = blend(red, white, "screen");
      expect(result.r).toBe(255);
      expect(result.g).toBe(255);
      expect(result.b).toBe(255);
    });

    it("screen mid with mid ≈ 192", () => {
      const result = blend(mid, mid, "screen");
      // 1 - (1 - 128/255)^2 * 255 ≈ 191.75
      expect(result.r).toBeCloseTo(192, 0);
    });
  });

  describe("overlay", () => {
    it("overlay with self produces result", () => {
      const result = blend(mid, mid, "overlay");
      expect(result.r).toBeGreaterThan(0);
      expect(result.r).toBeLessThan(255);
    });

    it("overlay black on dark base uses multiply path", () => {
      const dark = new Color(50, 50, 50);
      const result = blend(dark, black, "overlay");
      expect(result.r).toBe(0);
    });
  });

  describe("add", () => {
    it("add clamps to 255", () => {
      const result = blend(red, red, "add");
      expect(result.r).toBe(255);
    });

    it("add with black is identity", () => {
      const result = blend(mid, black, "add");
      expect(result.r).toBe(128);
    });
  });

  describe("subtract", () => {
    it("subtract clamps to 0", () => {
      const result = blend(black, red, "subtract");
      expect(result.r).toBe(0);
    });

    it("subtract from self is black", () => {
      const result = blend(mid, mid, "subtract");
      expect(result.r).toBe(0);
    });
  });

  it("preserves base alpha", () => {
    const base = new Color(128, 128, 128, 0.7);
    const result = blend(base, white, "multiply");
    expect(result.a).toBe(0.7);
  });

  it("results are clamped", () => {
    const result = blend(white, white, "add");
    expect(result.r).toBe(255);
    expect(result.g).toBe(255);
    expect(result.b).toBe(255);
  });
});

describe("mix() / lerp()", () => {
  it("mix(a, b, 0) returns a", () => {
    const result = mix(red, black, 0);
    expect(result.r).toBe(255);
    expect(result.g).toBe(0);
    expect(result.b).toBe(0);
  });

  it("mix(a, b, 1) returns b", () => {
    const result = mix(red, black, 1);
    expect(result.r).toBe(0);
    expect(result.g).toBe(0);
    expect(result.b).toBe(0);
  });

  it("mix(a, b, 0.5) returns midpoint", () => {
    const result = mix(black, white, 0.5);
    expect(result.r).toBe(128);
    expect(result.g).toBe(128);
    expect(result.b).toBe(128);
  });

  it("defaults t to 0.5", () => {
    const result = mix(black, white);
    expect(result.r).toBe(128);
  });

  it("interpolates alpha", () => {
    const a = new Color(0, 0, 0, 0);
    const b = new Color(0, 0, 0, 1);
    expect(mix(a, b, 0.5).a).toBeCloseTo(0.5);
  });

  it("applies easing function to t", () => {
    // ease that always returns 1 → result should equal b
    const result = mix(black, white, 0.3, () => 1);
    expect(result.r).toBe(255);
    expect(result.g).toBe(255);
    expect(result.b).toBe(255);
  });

  it("works with ease-in-quad", () => {
    const easeInQuad = (t: number) => t * t;
    // t=0.5 → eased=0.25 → 0 + (255-0)*0.25 = 63.75
    const result = mix(black, white, 0.5, easeInQuad);
    expect(result.r).toBeCloseTo(64, 0);
  });

  it("lerp is an alias for mix", () => {
    const m = mix(red, black, 0.3);
    const l = lerp(red, black, 0.3);
    expect(l.r).toBe(m.r);
    expect(l.g).toBe(m.g);
    expect(l.b).toBe(m.b);
    expect(l.a).toBe(m.a);
  });
});

describe("Color.interpolate()", () => {
  it("works equivalently to static mix()", () => {
    const a = new Color(100, 50, 200, 0.8);
    const b = new Color(200, 150, 50, 0.4);

    const staticResult = mix(a, b, 0.3);
    const instanceResult = a.interpolate(b, 0.3);

    expect(instanceResult.r).toBe(staticResult.r);
    expect(instanceResult.g).toBe(staticResult.g);
    expect(instanceResult.b).toBe(staticResult.b);
    expect(instanceResult.a).toBeCloseTo(staticResult.a);
  });

  it("instance lerp delegates to interpolate", () => {
    const a = new Color(255, 0, 0);
    const b = new Color(0, 0, 255);
    const interp = a.interpolate(b, 0.5);
    const lerpResult = a.lerp(b, 0.5);
    expect(lerpResult.r).toBe(interp.r);
    expect(lerpResult.g).toBe(interp.g);
    expect(lerpResult.b).toBe(interp.b);
  });

  it("applies easing function", () => {
    const a = new Color(0, 0, 0);
    const b = new Color(255, 255, 255);
    const result = a.interpolate(b, 0.5, (t) => t * t);
    expect(result.r).toBeCloseTo(64, 0);
  });

  it("returns new instance", () => {
    const a = new Color(255, 0, 0);
    const b = new Color(0, 0, 255);
    expect(a.interpolate(b, 0.5)).not.toBe(a);
    expect(a.interpolate(b, 0.5)).not.toBe(b);
  });
});
