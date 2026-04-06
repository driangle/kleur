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
