import { describe, it, expect } from "vitest";
import { rgb } from "../src/parse.js";
import { Palette } from "../src/palette.js";
import { Color } from "../src/color.js";

const red = rgb(255, 0, 0);
const green = rgb(0, 255, 0);
const blue = rgb(0, 0, 255);

const palette = new Palette([red, green, blue]);

describe("Palette", () => {
  describe("length and access", () => {
    it("reports correct length", () => {
      expect(palette.length).toBe(3);
    });

    it("at() returns the color at the given index", () => {
      expect(palette.at(0)).toBe(red);
      expect(palette.at(1)).toBe(green);
      expect(palette.at(2)).toBe(blue);
    });

    it("at() supports negative indices", () => {
      expect(palette.at(-1)).toBe(blue);
    });

    it("at() returns undefined for out-of-bounds", () => {
      expect(palette.at(5)).toBeUndefined();
    });

    it("toArray() returns a plain array copy", () => {
      const arr = palette.toArray();
      expect(arr).toEqual([red, green, blue]);
      expect(Array.isArray(arr)).toBe(true);
    });
  });

  describe("iteration", () => {
    it("supports for...of", () => {
      const colors: Color[] = [];
      for (const c of palette) {
        colors.push(c);
      }
      expect(colors).toEqual([red, green, blue]);
    });

    it("supports spread syntax", () => {
      const colors = [...palette];
      expect(colors).toEqual([red, green, blue]);
    });

    it("supports destructuring", () => {
      const [r, g, b] = palette;
      expect(r).toBe(red);
      expect(g).toBe(green);
      expect(b).toBe(blue);
    });
  });

  describe("collection operations", () => {
    it("map() transforms each color", () => {
      const hues = palette.map((c) => c.hue);
      expect(hues).toEqual([0, 120, 240]);
    });

    it("map() passes index", () => {
      const indices = palette.map((_, i) => i);
      expect(indices).toEqual([0, 1, 2]);
    });

    it("filter() returns a new Palette", () => {
      const filtered = palette.filter((c) => c.red > 0);
      expect(filtered).toBeInstanceOf(Palette);
      expect(filtered.length).toBe(1);
      expect(filtered.at(0)).toBe(red);
    });

    it("forEach() visits each color", () => {
      const visited: number[] = [];
      palette.forEach((_, i) => visited.push(i));
      expect(visited).toEqual([0, 1, 2]);
    });
  });

  describe("bulk color adjustments", () => {
    it("lighten() lightens all colors", () => {
      const lightened = palette.lighten(0.5);
      expect(lightened).toBeInstanceOf(Palette);
      expect(lightened.length).toBe(3);
      for (const [i, c] of [...lightened].entries()) {
        expect(c.lightness).toBeGreaterThan(palette.at(i)!.lightness);
      }
    });

    it("darken() darkens all colors", () => {
      const darkened = palette.darken(0.5);
      expect(darkened).toBeInstanceOf(Palette);
      for (const [i, c] of [...darkened].entries()) {
        expect(c.lightness).toBeLessThan(palette.at(i)!.lightness);
      }
    });

    it("saturate() increases saturation", () => {
      const muted = new Palette([rgb(180, 100, 100)]);
      const saturated = muted.saturate(0.5);
      expect(saturated.at(0)!.hsl.s).toBeGreaterThan(muted.at(0)!.hsl.s);
    });

    it("desaturate() decreases saturation", () => {
      const desaturated = palette.desaturate(0.5);
      expect(desaturated).toBeInstanceOf(Palette);
      expect(desaturated.at(0)!.hsl.s).toBeLessThan(red.hsl.s);
    });

    it("rotate() shifts hue of all colors", () => {
      const rotated = palette.rotate(60);
      expect(rotated).toBeInstanceOf(Palette);
      expect(rotated.at(0)!.hue).toBeCloseTo(60, 0);
      expect(rotated.at(1)!.hue).toBeCloseTo(180, 0);
      expect(rotated.at(2)!.hue).toBeCloseTo(300, 0);
    });

    it("invert() inverts all colors", () => {
      const inverted = palette.invert();
      expect(inverted).toBeInstanceOf(Palette);
      expect(inverted.at(0)!.red).toBe(0);
      expect(inverted.at(0)!.green).toBe(255);
      expect(inverted.at(0)!.blue).toBe(255);
    });

    it("complement() returns complementary palette", () => {
      const comp = palette.complement();
      expect(comp).toBeInstanceOf(Palette);
      expect(comp.at(0)!.hue).toBeCloseTo(180, 0);
    });

    it("grayscale() desaturates fully", () => {
      const gray = palette.grayscale();
      expect(gray).toBeInstanceOf(Palette);
      for (const c of gray) {
        expect(c.hsl.s).toBe(0);
      }
    });

    it("opaque() sets alpha to 1", () => {
      const transparent = new Palette([
        rgb(255, 0, 0).withAlpha(0.5),
        rgb(0, 255, 0).withAlpha(0.3),
      ]);
      const opaq = transparent.opaque();
      for (const c of opaq) {
        expect(c.alpha).toBe(1);
      }
    });
  });

  describe("mix with ease", () => {
    it("mix() without ease works as before", () => {
      const mixed = palette.mix("#000000", 0.5);
      expect(mixed).toBeInstanceOf(Palette);
      expect(mixed.length).toBe(3);
      // Red mixed 50% toward black
      expect(mixed.at(0)!.red).toBeCloseTo(128, 0);
      expect(mixed.at(0)!.green).toBeCloseTo(0, 0);
      expect(mixed.at(0)!.blue).toBeCloseTo(0, 0);
    });

    it("mix() with ease applies easing function", () => {
      // Ease that always returns 1 → fully target color
      const alwaysOne = () => 1;
      const mixed = palette.mix("#000000", 0.5, alwaysOne);
      for (const c of mixed) {
        expect(c.red).toBeCloseTo(0, 0);
        expect(c.green).toBeCloseTo(0, 0);
        expect(c.blue).toBeCloseTo(0, 0);
      }
    });

    it("mix() with ease that returns 0 keeps original colors", () => {
      const alwaysZero = () => 0;
      const mixed = palette.mix("#000000", 0.5, alwaysZero);
      expect(mixed.at(0)!.red).toBeCloseTo(255, 0);
      expect(mixed.at(1)!.green).toBeCloseTo(255, 0);
      expect(mixed.at(2)!.blue).toBeCloseTo(255, 0);
    });

    it("mix() with custom easing curve", () => {
      // Quadratic ease: t² at t=0.5 → 0.25
      const easeIn = (t: number) => t * t;
      const mixed = palette.mix("#000000", 0.5, easeIn);
      // Red channel of first color: 255 + (0 - 255) * 0.25 = 191.25
      expect(mixed.at(0)!.red).toBeCloseTo(191, 0);
    });
  });

  describe("flatMap()", () => {
    it("expands each color into shades", () => {
      const expanded = palette.flatMap((c) => [...c.shades(2)]);
      expect(expanded.length).toBe(6); // 3 colors × 2 shades each
    });

    it("accepts Palette return type", () => {
      const expanded = palette.flatMap((c) => c.shades(2));
      expect(expanded.length).toBe(6);
      expect(expanded).toBeInstanceOf(Palette);
    });

    it("identity flatMap returns copy", () => {
      const copy = palette.flatMap((c) => [c]);
      expect(copy.length).toBe(3);
      expect(copy.at(0)).toBe(red);
    });

    it("handles empty results", () => {
      const empty = palette.flatMap(() => []);
      expect(empty.length).toBe(0);
    });

    it("passes index to callback", () => {
      const indices: number[] = [];
      palette.flatMap((_, i) => { indices.push(i); return []; });
      expect(indices).toEqual([0, 1, 2]);
    });

    it("preserves order", () => {
      const expanded = palette.flatMap((c) => [c, c]);
      expect(expanded.length).toBe(6);
      expect(expanded.at(0)).toBe(red);
      expect(expanded.at(1)).toBe(red);
      expect(expanded.at(2)).toBe(green);
    });
  });

  describe("sortBy()", () => {
    it("sorts by hue ascending", () => {
      // red=0, green=120, blue=240
      const sorted = palette.sortBy("hue");
      expect(sorted.at(0)!.hue).toBe(0);
      expect(sorted.at(1)!.hue).toBe(120);
      expect(sorted.at(2)!.hue).toBe(240);
    });

    it("sorts by hue descending", () => {
      const sorted = palette.sortBy("hue", "desc");
      expect(sorted.at(0)!.hue).toBe(240);
      expect(sorted.at(2)!.hue).toBe(0);
    });

    it("sorts by red channel", () => {
      const sorted = palette.sortBy("red");
      expect(sorted.at(0)!.red).toBe(0);
      expect(sorted.at(2)!.red).toBe(255);
    });

    it("sorts by lightness", () => {
      const dark = rgb(20, 20, 20);
      const light = rgb(200, 200, 200);
      const mid = rgb(100, 100, 100);
      const p = new Palette([light, dark, mid]);
      const sorted = p.sortBy("lightness");
      expect(sorted.at(0)!.lightness).toBeLessThan(sorted.at(1)!.lightness);
      expect(sorted.at(1)!.lightness).toBeLessThan(sorted.at(2)!.lightness);
    });

    it("sorts by alpha", () => {
      const a1 = rgb(255, 0, 0, 0.2);
      const a2 = rgb(0, 255, 0, 0.8);
      const a3 = rgb(0, 0, 255, 0.5);
      const p = new Palette([a2, a1, a3]);
      const sorted = p.sortBy("alpha");
      expect(sorted.at(0)!.alpha).toBeCloseTo(0.2);
      expect(sorted.at(1)!.alpha).toBeCloseTo(0.5);
      expect(sorted.at(2)!.alpha).toBeCloseTo(0.8);
    });

    it("returns new Palette instance", () => {
      const sorted = palette.sortBy("hue");
      expect(sorted).toBeInstanceOf(Palette);
      expect(sorted).not.toBe(palette);
    });

    it("handles empty palette", () => {
      const empty = new Palette([]);
      expect(empty.sortBy("hue").length).toBe(0);
    });

    it("handles single-color palette", () => {
      const single = new Palette([red]);
      expect(single.sortBy("hue").length).toBe(1);
    });
  });

  describe("spread()", () => {
    it("upsamples palette (3 → 5)", () => {
      const spread = palette.spread(5);
      expect(spread.length).toBe(5);
      // First and last should match originals
      expect(spread.at(0)!.red).toBe(255);
      expect(spread.at(4)!.blue).toBe(255);
    });

    it("downsamples palette (3 → 2)", () => {
      const spread = palette.spread(2);
      expect(spread.length).toBe(2);
      // First and last preserved
      expect(spread.at(0)!.red).toBe(255);
      expect(spread.at(1)!.blue).toBe(255);
    });

    it("identity (n → n)", () => {
      const spread = palette.spread(3);
      expect(spread.length).toBe(3);
      expect(spread.at(0)!.red).toBe(255);
      expect(spread.at(1)!.green).toBe(255);
      expect(spread.at(2)!.blue).toBe(255);
    });

    it("count of 0 returns empty palette", () => {
      expect(palette.spread(0).length).toBe(0);
    });

    it("count of 1 returns first color", () => {
      const spread = palette.spread(1);
      expect(spread.length).toBe(1);
      expect(spread.at(0)!.red).toBe(255);
    });

    it("midpoint is interpolated correctly", () => {
      const twoColor = new Palette([red, blue]);
      const spread = twoColor.spread(3);
      // Midpoint should be 50% mix of red and blue
      expect(spread.at(1)!.red).toBeCloseTo(128, 0);
      expect(spread.at(1)!.blue).toBeCloseTo(128, 0);
    });

    it("returns empty palette from empty palette", () => {
      const empty = new Palette([]);
      expect(empty.spread(5).length).toBe(0);
    });
  });

  describe("harmonize()", () => {
    it("amount 0 returns unchanged hues", () => {
      const harmonized = palette.harmonize(0);
      expect(harmonized.at(0)!.hue).toBeCloseTo(red.hue, 0);
      expect(harmonized.at(1)!.hue).toBeCloseTo(green.hue, 0);
      expect(harmonized.at(2)!.hue).toBeCloseTo(blue.hue, 0);
    });

    it("amount 1 fully snaps to harmonic arrangement", () => {
      const harmonized = palette.harmonize(1);
      const hues = [...harmonized].map((c) => c.hue);
      // Should be evenly spaced (120° apart for 3 colors)
      const diffs = hues.map((h, i) => {
        const next = hues[(i + 1) % hues.length];
        return Math.abs(((next - h + 540) % 360) - 180);
      });
      for (const d of diffs) {
        expect(d).toBeCloseTo(120, 0);
      }
    });

    it("preserves lightness and saturation", () => {
      const harmonized = palette.harmonize(0.5);
      for (let i = 0; i < palette.length; i++) {
        expect(harmonized.at(i)!.lightness).toBeCloseTo(palette.at(i)!.lightness, 0);
        expect(harmonized.at(i)!.saturationHsl).toBeCloseTo(palette.at(i)!.saturationHsl, 0);
      }
    });

    it("single-color palette returns unchanged", () => {
      const single = new Palette([red]);
      const harmonized = single.harmonize();
      expect(harmonized.at(0)!.hue).toBeCloseTo(red.hue, 0);
    });

    it("returns new Palette instance", () => {
      const harmonized = palette.harmonize();
      expect(harmonized).toBeInstanceOf(Palette);
      expect(harmonized).not.toBe(palette);
    });
  });

  describe("interpolate()", () => {
    it("generates smooth ramp with correct count", () => {
      const ramp = palette.interpolate(9);
      expect(ramp.length).toBe(9);
    });

    it("preserves endpoints", () => {
      const ramp = palette.interpolate(9);
      expect(ramp.at(0)!.red).toBe(255);
      expect(ramp.at(8)!.blue).toBe(255);
    });

    it("midpoint between two colors is correctly blended", () => {
      const twoColor = new Palette([red, blue]);
      const ramp = twoColor.interpolate(3);
      expect(ramp.at(1)!.red).toBeCloseTo(128, 0);
      expect(ramp.at(1)!.blue).toBeCloseTo(128, 0);
    });

    it("identity when steps equals palette length", () => {
      const ramp = palette.interpolate(3);
      expect(ramp.at(0)!.red).toBe(255);
      expect(ramp.at(1)!.green).toBe(255);
      expect(ramp.at(2)!.blue).toBe(255);
    });

    it("supports ease parameter", () => {
      const twoColor = new Palette([red, blue]);
      const easeIn = (t: number) => t * t;
      const ramp = twoColor.interpolate(3, easeIn);
      // Midpoint with quadratic ease: t=0.5, eased=0.25
      expect(ramp.at(1)!.red).toBeCloseTo(191, 0);
    });

    it("steps of 0 returns empty", () => {
      expect(palette.interpolate(0).length).toBe(0);
    });

    it("steps of 1 returns first color", () => {
      expect(palette.interpolate(1).at(0)!.red).toBe(255);
    });

    it("single-color palette fills all steps", () => {
      const single = new Palette([red]);
      const ramp = single.interpolate(5);
      expect(ramp.length).toBe(5);
      for (const c of ramp) {
        expect(c.red).toBe(255);
      }
    });
  });

  describe("unique()", () => {
    it("removes exact duplicates", () => {
      const p = new Palette([red, red, green, green, blue]);
      expect(p.unique().length).toBe(3);
    });

    it("removes near-duplicates within threshold", () => {
      const almostRed = rgb(254, 1, 1);
      const p = new Palette([red, almostRed, green]);
      const unique = p.unique();
      expect(unique.length).toBe(2);
      expect(unique.at(0)).toBe(red);
    });

    it("preserves distinct colors", () => {
      const unique = palette.unique();
      expect(unique.length).toBe(3);
    });

    it("returns empty palette from empty palette", () => {
      const empty = new Palette([]);
      expect(empty.unique().length).toBe(0);
    });

    it("respects custom threshold", () => {
      const almostRed = rgb(254, 1, 1);
      const p = new Palette([red, almostRed]);
      // With threshold 0, even near-duplicates are kept
      expect(p.unique(0).length).toBe(2);
      // With large threshold, everything collapses
      expect(p.unique(1000).length).toBe(1);
    });

    it("preserves ordering (keeps first occurrence)", () => {
      const p = new Palette([red, green, red, blue]);
      const unique = p.unique();
      expect(unique.at(0)).toBe(red);
      expect(unique.at(1)).toBe(green);
      expect(unique.at(2)).toBe(blue);
    });
  });

  describe("empty palette", () => {
    const empty = new Palette([]);

    it("has length 0", () => {
      expect(empty.length).toBe(0);
    });

    it("toArray() returns empty array", () => {
      expect(empty.toArray()).toEqual([]);
    });

    it("spread returns empty array", () => {
      expect([...empty]).toEqual([]);
    });

    it("bulk operations return empty palette", () => {
      expect(empty.lighten(0.5).length).toBe(0);
    });
  });
});
