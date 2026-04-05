import { describe, it, expect } from "vitest";
import { rgb } from "../src/parse.js";

describe("color adjustments", () => {
  describe("adjustLightness()", () => {
    it("adds to lightness in absolute channel units", () => {
      const c = rgb(255, 0, 0); // l=50
      expect(c.adjustLightness(10).lightness).toBe(60);
    });

    it("clamps to the valid range", () => {
      const c = rgb(255, 0, 0);
      expect(c.adjustLightness(60).lightness).toBe(100);
      expect(c.adjustLightness(-60).lightness).toBe(0);
    });
  });

  describe("lighten()", () => {
    it("lighten(1) produces white", () => {
      const c = rgb(100, 50, 50);
      const light = c.lighten(1);
      expect(light.lightness).toBe(100);
    });

    it("lighten(0) is a no-op", () => {
      const c = rgb(255, 0, 0);
      const same = c.lighten(0);
      expect(same.lightness).toBe(c.lightness);
    });

    it("lighten(0.5) increases lightness by half the remaining range", () => {
      const c = rgb(255, 0, 0); // l=50
      const lighter = c.lighten(0.5);
      expect(lighter.lightness).toBe(75);
    });

    it("returns a new instance", () => {
      const c = rgb(255, 0, 0);
      expect(c.lighten(0.5)).not.toBe(c);
    });
  });

  describe("darken()", () => {
    it("darken(1) produces black", () => {
      const c = rgb(100, 150, 200);
      const dark = c.darken(1);
      expect(dark.lightness).toBe(0);
    });

    it("darken(0) is a no-op", () => {
      const c = rgb(255, 0, 0);
      const same = c.darken(0);
      expect(same.lightness).toBe(c.lightness);
    });

    it("darken(0.5) halves the lightness", () => {
      const c = rgb(255, 0, 0); // l=50
      const darker = c.darken(0.5);
      expect(darker.lightness).toBe(25);
    });
  });

  describe("scaleLightness()", () => {
    it("scaleLightness(2) doubles lightness", () => {
      const c = rgb(255, 0, 0); // l=50
      const bright = c.scaleLightness(2);
      expect(bright.lightness).toBe(100);
    });

    it("scaleLightness(0) produces black", () => {
      const c = rgb(255, 0, 0);
      const dark = c.scaleLightness(0);
      expect(dark.lightness).toBe(0);
    });
  });

  describe("adjustSaturationHsl()", () => {
    it("adds to HSL saturation in absolute channel units", () => {
      const c = rgb(128, 100, 100);
      expect(c.adjustSaturationHsl(10).saturationHsl).toBe(c.saturationHsl + 10);
    });

    it("clamps to the valid range", () => {
      const c = rgb(255, 0, 0);
      expect(c.adjustSaturationHsl(10).saturationHsl).toBe(100);
      expect(c.adjustSaturationHsl(-120).saturationHsl).toBe(0);
    });
  });

  describe("scaleSaturationHsl()", () => {
    it("multiplies HSL saturation", () => {
      const c = rgb(128, 100, 100);
      expect(c.scaleSaturationHsl(0.5).saturationHsl).toBe(Math.round(c.saturationHsl * 0.5));
    });
  });

  describe("saturateHsl()", () => {
    it("saturateHsl(1) fully saturates", () => {
      const c = rgb(128, 100, 100); // partially saturated
      const sat = c.saturateHsl(1);
      expect(sat.hsl.s).toBe(100);
    });

    it("saturateHsl(0) is a no-op", () => {
      const c = rgb(255, 0, 0);
      expect(c.saturateHsl(0).hsl.s).toBe(c.hsl.s);
    });
  });

  describe("desaturateHsl()", () => {
    it("desaturateHsl(1) removes all saturation", () => {
      const c = rgb(255, 0, 0);
      expect(c.desaturateHsl(1).hsl.s).toBe(0);
    });

    it("desaturateHsl(0) is a no-op", () => {
      const c = rgb(255, 0, 0);
      expect(c.desaturateHsl(0).hsl.s).toBe(c.hsl.s);
    });
  });

  describe("grayscale()", () => {
    it("produces a color with saturation = 0", () => {
      const c = rgb(255, 0, 0);
      expect(c.grayscale().hsl.s).toBe(0);
    });

    it("preserves lightness", () => {
      const c = rgb(255, 0, 0);
      expect(c.grayscale().lightness).toBe(c.lightness);
    });

    it("preserves alpha", () => {
      const c = rgb(255, 0, 0, 0.5);
      expect(c.grayscale().alpha).toBe(0.5);
    });
  });

  describe("rotate()", () => {
    it("rotates hue by given degrees", () => {
      const c = rgb(255, 0, 0); // hue=0
      expect(c.rotate(120).hue).toBe(120);
    });

    it("wraps around 360", () => {
      const c = rgb(255, 0, 0); // hue=0
      expect(c.rotate(400).hue).toBe(40);
    });

    it("handles negative rotation", () => {
      const c = rgb(255, 0, 0); // hue=0
      expect(c.rotate(-30).hue).toBe(330);
    });
  });

  describe("adjustHue()", () => {
    it("adds to hue and wraps", () => {
      const c = rgb(255, 0, 0);
      expect(c.adjustHue(30).hue).toBe(30);
      expect(c.adjustHue(-30).hue).toBe(330);
    });
  });

  describe("adjustSaturationHsb()", () => {
    it("adds to HSB saturation in absolute channel units", () => {
      const c = rgb(128, 64, 64);
      expect(c.adjustSaturationHsb(10).saturationHsb).toBe(c.saturationHsb + 10);
    });

    it("clamps to the valid range", () => {
      const c = rgb(255, 0, 0);
      expect(c.adjustSaturationHsb(10).saturationHsb).toBe(100);
      expect(c.adjustSaturationHsb(-120).saturationHsb).toBe(0);
    });
  });

  describe("adjustBrightness()", () => {
    it("adds to brightness in absolute channel units", () => {
      const c = rgb(128, 0, 0);
      expect(c.adjustBrightness(10).brightness).toBe(c.brightness + 10);
    });

    it("clamps to the valid range", () => {
      const c = rgb(255, 0, 0);
      expect(c.adjustBrightness(10).brightness).toBe(100);
      expect(c.adjustBrightness(-120).brightness).toBe(0);
    });
  });

  describe("scaleSaturationHsb()", () => {
    it("multiplies HSB saturation", () => {
      const c = rgb(128, 64, 64);
      expect(c.scaleSaturationHsb(0.5).saturationHsb).toBe(Math.round(c.saturationHsb * 0.5));
    });
  });

  describe("scaleBrightness()", () => {
    it("multiplies brightness", () => {
      const c = rgb(128, 0, 0);
      expect(c.scaleBrightness(0.5).brightness).toBe(25);
    });
  });

  describe("complement()", () => {
    it("rotates hue by 180 degrees", () => {
      const c = rgb(255, 0, 0); // hue=0
      expect(c.complement().hue).toBe(180);
    });

    it("is equivalent to rotate(180)", () => {
      const c = rgb(100, 149, 237);
      const comp = c.complement();
      const rotated = c.rotate(180);
      expect(comp.r).toBe(rotated.r);
      expect(comp.g).toBe(rotated.g);
      expect(comp.b).toBe(rotated.b);
    });
  });

  describe("warm()", () => {
    it("shifts hue toward orange (30°)", () => {
      const blue = rgb(0, 0, 255); // hue=240
      const warmed = blue.warm(0.5);
      // Should move from 240 toward 30 (shortest path is via 0/360)
      const warmHue = warmed.hue;
      // Hue should be closer to 30 than 240
      expect(warmHue).not.toBe(240);
    });

    it("defaults amount to 0.2", () => {
      const c = rgb(0, 0, 255);
      const warmed = c.warm();
      expect(warmed.hue).not.toBe(c.hue);
    });
  });

  describe("cool()", () => {
    it("shifts hue toward blue (240°)", () => {
      const red = rgb(255, 0, 0); // hue=0
      const cooled = red.cool(0.5);
      const coolHue = cooled.hue;
      // Should move toward 240
      expect(coolHue).toBeGreaterThan(0);
    });

    it("defaults amount to 0.2", () => {
      const c = rgb(255, 0, 0);
      const cooled = c.cool();
      expect(cooled.hue).not.toBe(c.hue);
    });
  });

  describe("invert()", () => {
    it("inverts pure red to cyan", () => {
      const red = rgb(255, 0, 0);
      const inverted = red.invert();
      expect(inverted.r).toBe(0);
      expect(inverted.g).toBe(255);
      expect(inverted.b).toBe(255);
      expect(inverted.toHex()).toBe("#00ffff");
    });

    it("inverts black to white", () => {
      const black = rgb(0, 0, 0);
      const inverted = black.invert();
      expect(inverted.toHex()).toBe("#ffffff");
    });

    it("preserves alpha", () => {
      const c = rgb(255, 0, 0, 0.3);
      expect(c.invert().alpha).toBe(0.3);
    });

    it("double invert returns original", () => {
      const c = rgb(100, 149, 237);
      const double = c.invert().invert();
      expect(double.r).toBe(c.r);
      expect(double.g).toBe(c.g);
      expect(double.b).toBe(c.b);
    });
  });

  describe("alpha API surface uses only with/adjust/scale pattern", () => {
    it("does not expose opacity() (use withAlpha instead)", () => {
      const c = rgb(255, 0, 0);
      expect(c).not.toHaveProperty("opacity");
    });

    it("does not expose fade() (use scaleAlpha instead)", () => {
      const c = rgb(255, 0, 0);
      expect(c).not.toHaveProperty("fade");
    });
  });

  describe("adjustAlpha()", () => {
    it("adds to alpha in absolute channel units", () => {
      const c = rgb(255, 0, 0, 0.4);
      expect(c.adjustAlpha(0.2).alpha).toBeCloseTo(0.6);
    });

    it("clamps alpha", () => {
      const c = rgb(255, 0, 0, 0.4);
      expect(c.adjustAlpha(1).alpha).toBe(1);
      expect(c.adjustAlpha(-1).alpha).toBe(0);
    });
  });

  describe("scaleAlpha()", () => {
    it("multiplies alpha", () => {
      const c = rgb(255, 0, 0, 0.8);
      expect(c.scaleAlpha(0.5).alpha).toBe(0.4);
    });

    it("clamps alpha", () => {
      const c = rgb(255, 0, 0, 0.8);
      expect(c.scaleAlpha(2).alpha).toBe(1);
      expect(c.scaleAlpha(-1).alpha).toBe(0);
    });
  });

  describe("opaque()", () => {
    it("sets alpha to exactly 1", () => {
      const c = rgb(255, 0, 0, 0.3);
      expect(c.opaque().alpha).toBe(1);
    });

    it("preserves RGB", () => {
      const c = rgb(100, 150, 200, 0.5);
      const o = c.opaque();
      expect(o.r).toBe(100);
      expect(o.g).toBe(150);
      expect(o.b).toBe(200);
    });
  });

  describe("lighten/darken symmetry", () => {
    it("lighten and darken use the same remaining-space model toward opposite boundaries", () => {
      const c = rgb(100, 149, 237); // l ≈ 66
      // lighten(t) moves toward 100 by fraction t of remaining space
      // darken(t) moves toward 0 by fraction t of remaining space
      // For l=66: lighten(0.5) → 66 + (100-66)*0.5 = 83
      //           darken(0.5)  → 66 - 66*0.5 = 33
      const lightened = c.lighten(0.5);
      const darkened = c.darken(0.5);
      expect(lightened.lightness).toBe(Math.round(66.07843137254902 + (100 - 66.07843137254902) * 0.5));
      expect(darkened.lightness).toBe(Math.round(66.07843137254902 - 66.07843137254902 * 0.5));
    });

    it("lighten(1) reaches white, darken(1) reaches black", () => {
      const c = rgb(100, 149, 237);
      expect(c.lighten(1).lightness).toBe(100);
      expect(c.darken(1).lightness).toBe(0);
    });
  });

  describe("saturateHsl/desaturateHsl symmetry", () => {
    it("saturateHsl and desaturateHsl use the same remaining-space model toward opposite boundaries", () => {
      const c = rgb(128, 100, 100); // partially saturated
      const s = c.saturationHsl;
      // saturateHsl(0.5) moves toward 100: s + (100-s)*0.5
      // desaturateHsl(0.5) moves toward 0: s - s*0.5
      expect(c.saturateHsl(0.5).saturationHsl).toBe(Math.round(s + (100 - s) * 0.5));
      expect(c.desaturateHsl(0.5).saturationHsl).toBe(Math.round(s - s * 0.5));
    });

    it("saturateHsl(1) fully saturates, desaturateHsl(1) fully desaturates", () => {
      const c = rgb(128, 100, 100);
      expect(c.saturateHsl(1).saturationHsl).toBe(100);
      expect(c.desaturateHsl(1).saturationHsl).toBe(0);
    });
  });

  describe("HSL round-trip fidelity", () => {
    it("lighten(0) preserves exact RGB values", () => {
      const c = rgb(100, 149, 237); // cornflower blue — not on a clean HSL boundary
      const same = c.lighten(0);
      expect(same.r).toBe(100);
      expect(same.g).toBe(149);
      expect(same.b).toBe(237);
    });

    it("darken(0) preserves exact RGB values", () => {
      const c = rgb(100, 149, 237);
      const same = c.darken(0);
      expect(same.r).toBe(100);
      expect(same.g).toBe(149);
      expect(same.b).toBe(237);
    });

    it("rotate(0) preserves exact RGB values", () => {
      const c = rgb(100, 149, 237);
      const same = c.rotate(0);
      expect(same.r).toBe(100);
      expect(same.g).toBe(149);
      expect(same.b).toBe(237);
    });

    it("saturateHsl(0) preserves exact RGB values", () => {
      const c = rgb(100, 149, 237);
      const same = c.saturateHsl(0);
      expect(same.r).toBe(100);
      expect(same.g).toBe(149);
      expect(same.b).toBe(237);
    });
  });

  describe("immutability", () => {
    it("all adjustment methods return new instances", () => {
      const c = rgb(255, 0, 0, 0.8);
      const methods = [
        () => c.lighten(0.5),
        () => c.darken(0.5),
        () => c.adjustLightness(10),
        () => c.scaleLightness(1.5),
        () => c.adjustSaturationHsl(10),
        () => c.saturateHsl(0.5),
        () => c.desaturateHsl(0.5),
        () => c.scaleSaturationHsl(0.5),
        () => c.grayscale(),
        () => c.adjustHue(90),
        () => c.rotate(90),
        () => c.adjustSaturationHsb(10),
        () => c.adjustBrightness(10),
        () => c.scaleSaturationHsb(0.5),
        () => c.scaleBrightness(0.5),
        () => c.complement(),
        () => c.warm(),
        () => c.cool(),
        () => c.invert(),
        () => c.adjustAlpha(0.1),
        () => c.scaleAlpha(0.5),
        () => c.opaque(),
      ];
      for (const method of methods) {
        expect(method()).not.toBe(c);
      }
    });
  });
});
