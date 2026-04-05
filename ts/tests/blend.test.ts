import { describe, it, expect } from "vitest";
import { rgb } from "../src/parse.js";
import { blend, mix } from "../src/blend.js";

const white = rgb(255, 255, 255);
const black = rgb(0, 0, 0);
const red = rgb(255, 0, 0);
const mid = rgb(128, 128, 128);

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
      const dark = rgb(50, 50, 50);
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

  describe("darken", () => {
    it("keeps the darker channel value", () => {
      const result = blend(mid, black, "darken");
      expect(result.r).toBe(0);
      expect(result.g).toBe(0);
      expect(result.b).toBe(0);
    });

    it("darken with white is identity", () => {
      const result = blend(mid, white, "darken");
      expect(result.r).toBe(128);
    });
  });

  describe("lighten", () => {
    it("keeps the lighter channel value", () => {
      const result = blend(mid, white, "lighten");
      expect(result.r).toBe(255);
      expect(result.g).toBe(255);
      expect(result.b).toBe(255);
    });

    it("lighten with black is identity", () => {
      const result = blend(mid, black, "lighten");
      expect(result.r).toBe(128);
    });
  });

  describe("colorDodge", () => {
    it("dodge with black base returns 0", () => {
      const result = blend(black, mid, "colorDodge");
      expect(result.r).toBe(0);
    });

    it("dodge with white overlay returns white", () => {
      const result = blend(mid, white, "colorDodge");
      expect(result.r).toBe(255);
    });

    it("dodge brightens", () => {
      const result = blend(mid, mid, "colorDodge");
      expect(result.r).toBeGreaterThan(128);
    });
  });

  describe("colorBurn", () => {
    it("burn with white base returns white", () => {
      const result = blend(white, mid, "colorBurn");
      expect(result.r).toBe(255);
    });

    it("burn with black overlay returns 0", () => {
      const result = blend(mid, black, "colorBurn");
      expect(result.r).toBe(0);
    });

    it("burn darkens", () => {
      const result = blend(mid, mid, "colorBurn");
      expect(result.r).toBeLessThan(128);
    });
  });

  describe("hardLight", () => {
    it("dark overlay multiplies", () => {
      const dark = rgb(50, 50, 50);
      const result = blend(mid, dark, "hardLight");
      expect(result.r).toBeLessThanOrEqual(50);
    });

    it("light overlay screens", () => {
      const light = rgb(200, 200, 200);
      const result = blend(mid, light, "hardLight");
      expect(result.r).toBeGreaterThanOrEqual(200);
    });
  });

  describe("softLight", () => {
    it("mid on mid produces a result near mid", () => {
      const result = blend(mid, mid, "softLight");
      expect(result.r).toBeCloseTo(128, -1);
    });

    it("white overlay lightens", () => {
      const result = blend(mid, white, "softLight");
      expect(result.r).toBeGreaterThan(128);
    });

    it("black overlay darkens", () => {
      const result = blend(mid, black, "softLight");
      expect(result.r).toBeLessThan(128);
    });
  });

  describe("difference", () => {
    it("identical colors produce black", () => {
      const result = blend(mid, mid, "difference");
      expect(result.r).toBeCloseTo(0);
    });

    it("black and white produce white", () => {
      const result = blend(black, white, "difference");
      expect(result.r).toBe(255);
    });
  });

  describe("exclusion", () => {
    it("identical colors produce gray", () => {
      // b + b - 2*b*b at 0.5 => 0.5
      const result = blend(mid, mid, "exclusion");
      expect(result.r).toBeCloseTo(128, -1);
    });

    it("exclusion with black is identity", () => {
      const result = blend(mid, black, "exclusion");
      expect(result.r).toBeCloseTo(128, 0);
    });
  });

  describe("custom function", () => {
    it("receives both full Color objects", () => {
      const result = blend(red, mid, (base, overlay) => {
        return rgb(
          (base.r + overlay.r) / 2,
          (base.g + overlay.g) / 2,
          (base.b + overlay.b) / 2,
        );
      });
      expect(result.r).toBeCloseTo(192, 0);
      expect(result.g).toBeCloseTo(64, 0);
      expect(result.b).toBeCloseTo(64, 0);
    });

    it("can use alpha from either color", () => {
      const a = rgb(255, 0, 0, 0.3);
      const b = rgb(0, 0, 255, 0.9);
      const result = blend(a, b, (base, overlay) => {
        return rgb(overlay.r, overlay.g, overlay.b, overlay.a);
      });
      expect(result.a).toBeCloseTo(0.9);
    });
  });

  it("preserves base alpha", () => {
    const base = rgb(128, 128, 128, 0.7);
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

describe("mix()", () => {
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
    const a = rgb(0, 0, 0, 0);
    const b = rgb(0, 0, 0, 1);
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

});

describe("Color.mix()", () => {
  it("works equivalently to static mix()", () => {
    const a = rgb(100, 50, 200, 0.8);
    const b = rgb(200, 150, 50, 0.4);

    const staticResult = mix(a, b, 0.3);
    const instanceResult = a.mix(b, 0.3);

    expect(instanceResult.r).toBe(staticResult.r);
    expect(instanceResult.g).toBe(staticResult.g);
    expect(instanceResult.b).toBe(staticResult.b);
    expect(instanceResult.a).toBeCloseTo(staticResult.a);
  });

  it("applies easing function", () => {
    const a = rgb(0, 0, 0);
    const b = rgb(255, 255, 255);
    const result = a.mix(b, 0.5, (t) => t * t);
    expect(result.r).toBeCloseTo(64, 0);
  });

  it("returns new instance", () => {
    const a = rgb(255, 0, 0);
    const b = rgb(0, 0, 255);
    expect(a.mix(b, 0.5)).not.toBe(a);
    expect(a.mix(b, 0.5)).not.toBe(b);
  });
});
