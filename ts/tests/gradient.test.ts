import { describe, it, expect } from "vitest";
import { Color } from "../src/color.js";
import {
  colorStop,
  solid,
  linearGradient,
  radialGradient,
  isSolid,
  isLinearGradient,
  isRadialGradient,
  isGradient,
} from "../src/gradient.js";

const red = new Color(255, 0, 0);
const blue = new Color(0, 0, 255);

describe("colorStop()", () => {
  it("creates a stop with clamped offset", () => {
    const stop = colorStop(0.5, red);
    expect(stop.offset).toBe(0.5);
    expect(stop.color).toBe(red);
  });

  it("clamps offset below 0", () => {
    expect(colorStop(-0.5, red).offset).toBe(0);
  });

  it("clamps offset above 1", () => {
    expect(colorStop(1.5, red).offset).toBe(1);
  });
});

describe("solid()", () => {
  it("creates a solid fill", () => {
    const s = solid(red);
    expect(s.type).toBe("solid");
    expect(s.color).toBe(red);
  });
});

describe("linearGradient()", () => {
  it("creates a linear gradient with clamped stops", () => {
    const g = linearGradient({
      x0: 0, y0: 0, x1: 100, y1: 0,
      stops: [
        { offset: -0.1, color: red },
        { offset: 1.5, color: blue },
      ],
    });
    expect(g.type).toBe("linear");
    expect(g.x0).toBe(0);
    expect(g.x1).toBe(100);
    expect(g.stops[0].offset).toBe(0);
    expect(g.stops[1].offset).toBe(1);
  });

  it("supports globalAlpha", () => {
    const g = linearGradient({
      x0: 0, y0: 0, x1: 100, y1: 0,
      stops: [{ offset: 0, color: red }],
      globalAlpha: 0.5,
    });
    expect(g.globalAlpha).toBe(0.5);
  });
});

describe("radialGradient()", () => {
  it("creates a radial gradient with clamped stops", () => {
    const g = radialGradient({
      x0: 50, y0: 50, r0: 0,
      x1: 50, y1: 50, r1: 100,
      stops: [
        { offset: 0, color: red },
        { offset: 2, color: blue },
      ],
    });
    expect(g.type).toBe("radial");
    expect(g.r0).toBe(0);
    expect(g.r1).toBe(100);
    expect(g.stops[1].offset).toBe(1);
  });
});

describe("type guards", () => {
  const s = solid(red);
  const lg = linearGradient({
    x0: 0, y0: 0, x1: 100, y1: 0,
    stops: [{ offset: 0, color: red }],
  });
  const rg = radialGradient({
    x0: 50, y0: 50, r0: 0, x1: 50, y1: 50, r1: 100,
    stops: [{ offset: 0, color: red }],
  });

  describe("isSolid()", () => {
    it("true for solid", () => expect(isSolid(s)).toBe(true));
    it("false for linear", () => expect(isSolid(lg)).toBe(false));
    it("false for radial", () => expect(isSolid(rg)).toBe(false));
  });

  describe("isLinearGradient()", () => {
    it("true for linear", () => expect(isLinearGradient(lg)).toBe(true));
    it("false for solid", () => expect(isLinearGradient(s)).toBe(false));
    it("false for radial", () => expect(isLinearGradient(rg)).toBe(false));
  });

  describe("isRadialGradient()", () => {
    it("true for radial", () => expect(isRadialGradient(rg)).toBe(true));
    it("false for solid", () => expect(isRadialGradient(s)).toBe(false));
    it("false for linear", () => expect(isRadialGradient(lg)).toBe(false));
  });

  describe("isGradient()", () => {
    it("true for linear", () => expect(isGradient(lg)).toBe(true));
    it("true for radial", () => expect(isGradient(rg)).toBe(true));
    it("false for solid", () => expect(isGradient(s)).toBe(false));
  });
});
