import { describe, it, expect } from "vitest";
import { Color } from "../src/color.js";

describe("color adjustments", () => {
  describe("lighten()", () => {
    it("lighten(1) produces white", () => {
      const c = new Color(100, 50, 50);
      const light = c.lighten(1);
      expect(light.lightness).toBe(100);
    });

    it("lighten(0) is a no-op", () => {
      const c = new Color(255, 0, 0);
      const same = c.lighten(0);
      expect(same.lightness).toBe(c.lightness);
    });

    it("lighten(0.5) increases lightness by half the remaining range", () => {
      const c = new Color(255, 0, 0); // l=50
      const lighter = c.lighten(0.5);
      expect(lighter.lightness).toBe(75);
    });

    it("returns a new instance", () => {
      const c = new Color(255, 0, 0);
      expect(c.lighten(0.5)).not.toBe(c);
    });
  });

  describe("darken()", () => {
    it("darken(1) produces black", () => {
      const c = new Color(100, 150, 200);
      const dark = c.darken(1);
      expect(dark.lightness).toBe(0);
    });

    it("darken(0) is a no-op", () => {
      const c = new Color(255, 0, 0);
      const same = c.darken(0);
      expect(same.lightness).toBe(c.lightness);
    });

    it("darken(0.5) halves the lightness", () => {
      const c = new Color(255, 0, 0); // l=50
      const darker = c.darken(0.5);
      expect(darker.lightness).toBe(25);
    });
  });

  describe("scaleLightness()", () => {
    it("scaleLightness(2) doubles lightness", () => {
      const c = new Color(255, 0, 0); // l=50
      const bright = c.scaleLightness(2);
      expect(bright.lightness).toBe(100);
    });

    it("scaleLightness(0) produces black", () => {
      const c = new Color(255, 0, 0);
      const dark = c.scaleLightness(0);
      expect(dark.lightness).toBe(0);
    });
  });

  describe("saturate()", () => {
    it("saturate(1) fully saturates", () => {
      const c = new Color(128, 100, 100); // partially saturated
      const sat = c.saturate(1);
      expect(sat.saturation).toBe(100);
    });

    it("saturate(0) is a no-op", () => {
      const c = new Color(255, 0, 0);
      expect(c.saturate(0).saturation).toBe(c.saturation);
    });
  });

  describe("desaturate()", () => {
    it("desaturate(1) removes all saturation", () => {
      const c = new Color(255, 0, 0);
      expect(c.desaturate(1).saturation).toBe(0);
    });

    it("desaturate(0) is a no-op", () => {
      const c = new Color(255, 0, 0);
      expect(c.desaturate(0).saturation).toBe(c.saturation);
    });
  });

  describe("grayscale()", () => {
    it("produces a color with saturation = 0", () => {
      const c = new Color(255, 0, 0);
      expect(c.grayscale().saturation).toBe(0);
    });

    it("preserves lightness", () => {
      const c = new Color(255, 0, 0);
      expect(c.grayscale().lightness).toBe(c.lightness);
    });

    it("preserves alpha", () => {
      const c = new Color(255, 0, 0, 0.5);
      expect(c.grayscale().alpha).toBe(0.5);
    });
  });

  describe("rotate()", () => {
    it("rotates hue by given degrees", () => {
      const c = new Color(255, 0, 0); // hue=0
      expect(c.rotate(120).hue).toBe(120);
    });

    it("wraps around 360", () => {
      const c = new Color(255, 0, 0); // hue=0
      expect(c.rotate(400).hue).toBe(40);
    });

    it("handles negative rotation", () => {
      const c = new Color(255, 0, 0); // hue=0
      expect(c.rotate(-30).hue).toBe(330);
    });
  });

  describe("complement()", () => {
    it("rotates hue by 180 degrees", () => {
      const c = new Color(255, 0, 0); // hue=0
      expect(c.complement().hue).toBe(180);
    });

    it("is equivalent to rotate(180)", () => {
      const c = new Color(100, 149, 237);
      const comp = c.complement();
      const rotated = c.rotate(180);
      expect(comp.r).toBe(rotated.r);
      expect(comp.g).toBe(rotated.g);
      expect(comp.b).toBe(rotated.b);
    });
  });

  describe("warm()", () => {
    it("shifts hue toward orange (30°)", () => {
      const blue = new Color(0, 0, 255); // hue=240
      const warmed = blue.warm(0.5);
      // Should move from 240 toward 30 (shortest path is via 0/360)
      const warmHue = warmed.hue;
      // Hue should be closer to 30 than 240
      expect(warmHue).not.toBe(240);
    });

    it("defaults amount to 0.2", () => {
      const c = new Color(0, 0, 255);
      const warmed = c.warm();
      expect(warmed.hue).not.toBe(c.hue);
    });
  });

  describe("cool()", () => {
    it("shifts hue toward blue (240°)", () => {
      const red = new Color(255, 0, 0); // hue=0
      const cooled = red.cool(0.5);
      const coolHue = cooled.hue;
      // Should move toward 240
      expect(coolHue).toBeGreaterThan(0);
    });

    it("defaults amount to 0.2", () => {
      const c = new Color(255, 0, 0);
      const cooled = c.cool();
      expect(cooled.hue).not.toBe(c.hue);
    });
  });

  describe("invert()", () => {
    it("inverts pure red to cyan", () => {
      const red = new Color(255, 0, 0);
      const inverted = red.invert();
      expect(inverted.r).toBe(0);
      expect(inverted.g).toBe(255);
      expect(inverted.b).toBe(255);
      expect(inverted.toHex()).toBe("#00ffff");
    });

    it("inverts black to white", () => {
      const black = new Color(0, 0, 0);
      const inverted = black.invert();
      expect(inverted.toHex()).toBe("#ffffff");
    });

    it("preserves alpha", () => {
      const c = new Color(255, 0, 0, 0.3);
      expect(c.invert().alpha).toBe(0.3);
    });

    it("double invert returns original", () => {
      const c = new Color(100, 149, 237);
      const double = c.invert().invert();
      expect(double.r).toBe(c.r);
      expect(double.g).toBe(c.g);
      expect(double.b).toBe(c.b);
    });
  });

  describe("opacity()", () => {
    it("sets alpha to given value", () => {
      const c = new Color(255, 0, 0);
      expect(c.opacity(0.5).alpha).toBe(0.5);
    });

    it("clamps alpha", () => {
      const c = new Color(255, 0, 0);
      expect(c.opacity(1.5).alpha).toBe(1);
      expect(c.opacity(-0.5).alpha).toBe(0);
    });

    it("preserves RGB", () => {
      const c = new Color(100, 150, 200);
      const o = c.opacity(0.3);
      expect(o.r).toBe(100);
      expect(o.g).toBe(150);
      expect(o.b).toBe(200);
    });
  });

  describe("fade()", () => {
    it("reduces alpha by percentage", () => {
      const c = new Color(255, 0, 0, 1);
      expect(c.fade(0.5).alpha).toBe(0.5);
    });

    it("fade(1) makes fully transparent", () => {
      const c = new Color(255, 0, 0, 0.8);
      expect(c.fade(1).alpha).toBe(0);
    });

    it("fade(0) is a no-op", () => {
      const c = new Color(255, 0, 0, 0.7);
      expect(c.fade(0).alpha).toBe(0.7);
    });
  });

  describe("opaque()", () => {
    it("sets alpha to exactly 1", () => {
      const c = new Color(255, 0, 0, 0.3);
      expect(c.opaque().alpha).toBe(1);
    });

    it("preserves RGB", () => {
      const c = new Color(100, 150, 200, 0.5);
      const o = c.opaque();
      expect(o.r).toBe(100);
      expect(o.g).toBe(150);
      expect(o.b).toBe(200);
    });
  });

  describe("immutability", () => {
    it("all adjustment methods return new instances", () => {
      const c = new Color(255, 0, 0, 0.8);
      const methods = [
        () => c.lighten(0.5),
        () => c.darken(0.5),
        () => c.scaleLightness(1.5),
        () => c.saturate(0.5),
        () => c.desaturate(0.5),
        () => c.grayscale(),
        () => c.rotate(90),
        () => c.complement(),
        () => c.warm(),
        () => c.cool(),
        () => c.invert(),
        () => c.opacity(0.5),
        () => c.fade(0.5),
        () => c.opaque(),
      ];
      for (const method of methods) {
        expect(method()).not.toBe(c);
      }
    });
  });
});
