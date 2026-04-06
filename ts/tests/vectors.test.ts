import { describe, it, expect } from "vitest";
import kleur from "../src/index.js";
import type { Color } from "../src/index.js";
import type { BlendMode } from "../src/blend.js";
import vectors from "./vectors/test-vectors.json";

type RGBA = { r: number; g: number; b: number; a?: number };
const toColor = (c: RGBA) => kleur.rgb(c.r, c.g, c.b, c.a ?? 1);

describe("cross-language test vectors", () => {
  describe("parsing: hex", () => {
    for (const v of vectors.parsing.hex) {
      it(`hex("${v.input}")`, () => {
        const c = kleur.hex(v.input);
        expect(c.red).toBe(v.expected.r);
        expect(c.green).toBe(v.expected.g);
        expect(c.blue).toBe(v.expected.b);
      });
    }
  });

  describe("parsing: hsl", () => {
    for (const v of vectors.parsing.hsl) {
      it(`hsl(${v.input.h}, ${v.input.s}, ${v.input.l})`, () => {
        const c = kleur.hsl(v.input.h, v.input.s, v.input.l);
        expect(c.red).toBe(v.expected.r);
        expect(c.green).toBe(v.expected.g);
        expect(c.blue).toBe(v.expected.b);
      });
    }
  });

  describe("parsing: css", () => {
    for (const v of vectors.parsing.css) {
      it(`css("${v.input}")`, () => {
        const c = kleur.css(v.input);
        expect(c.red).toBe(v.expected.r);
        expect(c.green).toBe(v.expected.g);
        expect(c.blue).toBe(v.expected.b);
        expect(c.alpha).toBeCloseTo(v.expected.a, 2);
      });
    }
  });

  describe("parsing: integer", () => {
    for (const v of vectors.parsing.integer) {
      it(`int(${v.input})`, () => {
        const c = kleur.int(v.input);
        expect(c.red).toBe(v.expected.r);
        expect(c.green).toBe(v.expected.g);
        expect(c.blue).toBe(v.expected.b);
      });
    }
  });

  describe("parsing: named", () => {
    for (const v of vectors.parsing.named) {
      it(`kleur("${v.input}")`, () => {
        const c = kleur(v.input);
        expect(c.red).toBe(v.expected.r);
        expect(c.green).toBe(v.expected.g);
        expect(c.blue).toBe(v.expected.b);
        expect(c.alpha).toBe(v.expected.a);
      });
    }
  });

  describe("output: toHex", () => {
    for (const v of vectors.output.toHex) {
      it(`rgb(${v.input.r},${v.input.g},${v.input.b}).toHex() = ${v.expected}`, () => {
        expect(toColor(v.input).toHex()).toBe(v.expected);
      });
    }
  });

  describe("output: toCss", () => {
    for (const v of vectors.output.toCss) {
      it(`toCss() = ${v.expected}`, () => {
        expect(toColor(v.input).toCss()).toBe(v.expected);
      });
    }
  });

  describe("output: toHsl", () => {
    for (const v of vectors.output.toHsl) {
      it(`rgb(${v.input.r},${v.input.g},${v.input.b}).toHsl()`, () => {
        const hsl = toColor(v.input).toHsl();
        expect(hsl.h).toBeCloseTo(v.expected.h, 0);
        expect(hsl.s).toBeCloseTo(v.expected.s, 0);
        expect(hsl.l).toBeCloseTo(v.expected.l, 0);
      });
    }
  });

  describe("output: toArray", () => {
    for (const v of vectors.output.toArray) {
      it(`toArray()`, () => {
        expect(toColor(v.input).toArray()).toEqual(v.expected);
      });
    }
  });

  describe("output: toNormalized", () => {
    for (const v of vectors.output.toNormalized) {
      it(`toNormalized()`, () => {
        const n = toColor(v.input).toNormalized();
        for (let i = 0; i < 4; i++) {
          expect(n[i]).toBeCloseTo(v.expected[i], 2);
        }
      });
    }
  });

  describe("adjustments", () => {
    for (const v of vectors.adjustments) {
      it(`${v.op}(${JSON.stringify(v.args || {})}) on rgb(${v.input.r},${v.input.g},${v.input.b})`, () => {
        const c = toColor(v.input);
        let result: Color;
        switch (v.op) {
          case "lighten":
            result = c.lighten(v.args!.amount);
            break;
          case "darken":
            result = c.darken(v.args!.amount);
            break;
          case "grayscale":
            result = c.grayscale();
            break;
          case "invert":
            result = c.invert();
            break;
          case "complement":
            result = c.complement();
            break;
          case "rotate":
            result = c.rotate(v.args!.degrees);
            break;
          case "opaque":
            result = c.opaque();
            break;
          default:
            throw new Error(`Unknown op: ${v.op}`);
        }
        if ("expected" in v && v.expected) {
          const exp = v.expected as { r: number; g: number; b: number };
          expect(result.red).toBe(exp.r);
          expect(result.green).toBe(exp.g);
          expect(result.blue).toBe(exp.b);
        }
        if ("expected_lightness" in v)
          expect(result.lightness).toBeCloseTo(
            v.expected_lightness as number,
            0,
          );
        if ("expected_saturation" in v)
          expect(result.hsl.s).toBeCloseTo(v.expected_saturation as number, 0);
        if ("expected_hue" in v)
          expect(result.hue).toBeCloseTo(v.expected_hue as number, 0);
        if ("expected_alpha" in v)
          expect(result.alpha).toBeCloseTo(v.expected_alpha as number, 2);
      });
    }
  });

  describe("harmony", () => {
    for (const v of vectors.harmony) {
      it(`${v.op} on rgb(${v.input.r},${v.input.g},${v.input.b})`, () => {
        const c = toColor(v.input);
        let result: Color[];
        switch (v.op) {
          case "triadic":
            result = kleur.triadic(c);
            break;
          case "tetradic":
            result = kleur.tetradic(c);
            break;
          case "analogous":
            result = kleur.analogous(c, v.args?.angle);
            break;
          default:
            throw new Error(`Unknown op: ${v.op}`);
        }
        expect(result).toHaveLength(v.expected_count);
        const colors = [...result];
        for (let i = 0; i < v.expected_hues.length; i++) {
          expect(colors[i].hue).toBeCloseTo(v.expected_hues[i], 0);
        }
      });
    }
  });

  describe("blending", () => {
    for (const v of vectors.blending) {
      it(`${v.op}: ${v.note || ""}`, () => {
        const result = kleur.blend(
          toColor(v.base),
          toColor(v.overlay),
          v.op as BlendMode,
        );
        const tol = ("tolerance" in v ? v.tolerance : 0) as number;
        expect(Math.abs(result.red - v.expected.r)).toBeLessThanOrEqual(
          tol + 1,
        );
        expect(Math.abs(result.green - v.expected.g)).toBeLessThanOrEqual(
          tol + 1,
        );
        expect(Math.abs(result.blue - v.expected.b)).toBeLessThanOrEqual(
          tol + 1,
        );
      });
    }
  });

  describe("analysis: luminance", () => {
    for (const v of vectors.analysis.luminance) {
      it(`luminance of rgb(${v.input.r},${v.input.g},${v.input.b})`, () => {
        const tol = v.tolerance || 0.001;
        expect(kleur.luminance(toColor(v.input))).toBeCloseTo(
          v.expected,
          -Math.log10(tol),
        );
      });
    }
  });

  describe("analysis: contrast", () => {
    for (const v of vectors.analysis.contrast) {
      it(`contrast`, () => {
        expect(kleur.contrast(toColor(v.a), toColor(v.b))).toBeCloseTo(
          v.expected,
          0,
        );
      });
    }
  });

  describe("analysis: distance", () => {
    for (const v of vectors.analysis.distance) {
      it(`distance`, () => {
        expect(kleur.distance(toColor(v.a), toColor(v.b))).toBeCloseTo(
          v.expected,
          1,
        );
      });
    }
  });

  describe("analysis: isLight", () => {
    for (const v of vectors.analysis.isLight) {
      it(`isLight of rgb(${v.input.r},${v.input.g},${v.input.b}) = ${v.expected}`, () => {
        expect(kleur.isLight(toColor(v.input))).toBe(v.expected);
      });
    }
  });
});
