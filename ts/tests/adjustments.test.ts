import { describe, it, expect } from "vitest";
import { rgb } from "../src/parse.js";

describe("color adjustments", () => {
  describe("adjustLightness()", () => {
    it("adds to lightness in absolute channel units", () => {
      const c = rgb(255, 0, 0); // l=50
      expect(c.adjustLightness(10).lightness).toBeCloseTo(60, 0);
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
      expect(lighter.lightness).toBeCloseTo(75, 0);
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
      expect(darker.lightness).toBeCloseTo(25, 0);
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
      expect(c.adjustSaturationHsl(10).saturationHsl).toBeCloseTo(
        c.saturationHsl + 10,
        0,
      );
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
      expect(c.scaleSaturationHsl(0.5).saturationHsl).toBeCloseTo(
        c.saturationHsl * 0.5,
        0,
      );
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
      expect(c.grayscale().lightness).toBeCloseTo(c.lightness, 0);
    });

    it("preserves alpha", () => {
      const c = rgb(255, 0, 0, 0.5);
      expect(c.grayscale().alpha).toBe(0.5);
    });
  });

  describe("rotate()", () => {
    it("rotates hue by given degrees", () => {
      const c = rgb(255, 0, 0); // hue=0
      expect(c.rotate(120).hue).toBeCloseTo(120, 0);
    });

    it("wraps around 360", () => {
      const c = rgb(255, 0, 0); // hue=0
      expect(c.rotate(400).hue).toBeCloseTo(40, 0);
    });

    it("handles negative rotation", () => {
      const c = rgb(255, 0, 0); // hue=0
      expect(c.rotate(-30).hue).toBeCloseTo(330, 0);
    });
  });

  describe("adjustHue()", () => {
    it("adds to hue and wraps", () => {
      const c = rgb(255, 0, 0);
      expect(c.adjustHue(30).hue).toBeCloseTo(30, 0);
      expect(c.adjustHue(-30).hue).toBeCloseTo(330, 0);
    });
  });

  describe("adjustSaturationHsb()", () => {
    it("adds to HSB saturation in absolute channel units", () => {
      const c = rgb(128, 64, 64);
      expect(c.adjustSaturationHsb(10).saturationHsb).toBeCloseTo(
        c.saturationHsb + 10,
        0,
      );
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
      expect(c.adjustBrightness(10).brightness).toBeCloseTo(
        c.brightness + 10,
        0,
      );
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
      expect(c.scaleSaturationHsb(0.5).saturationHsb).toBeCloseTo(
        c.saturationHsb * 0.5,
        0,
      );
    });
  });

  describe("scaleBrightness()", () => {
    it("multiplies brightness", () => {
      const c = rgb(128, 0, 0);
      expect(c.scaleBrightness(0.5).brightness).toBeCloseTo(25, 0);
    });
  });

  describe("complement()", () => {
    it("rotates hue by 180 degrees", () => {
      const c = rgb(255, 0, 0); // hue=0
      expect(c.complement().hue).toBeCloseTo(180, 0);
    });

    it("is equivalent to rotate(180)", () => {
      const c = rgb(100, 149, 237);
      const comp = c.complement();
      const rotated = c.rotate(180);
      expect(comp.red).toBe(rotated.red);
      expect(comp.green).toBe(rotated.green);
      expect(comp.blue).toBe(rotated.blue);
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
      expect(inverted.red).toBe(0);
      expect(inverted.green).toBe(255);
      expect(inverted.blue).toBe(255);
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
      expect(double.red).toBe(c.red);
      expect(double.green).toBe(c.green);
      expect(double.blue).toBe(c.blue);
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
      expect(o.red).toBe(100);
      expect(o.green).toBe(150);
      expect(o.blue).toBe(200);
    });
  });

  describe("lighten/darken symmetry", () => {
    it("lighten and darken use the same remaining-space model toward opposite boundaries", () => {
      const c = rgb(100, 149, 237); // l ≈ 66
      const l = c.lightness;
      // lighten(t) moves toward 100 by fraction t of remaining space
      // darken(t) moves toward 0 by fraction t of remaining space
      const lightened = c.lighten(0.5);
      const darkened = c.darken(0.5);
      expect(lightened.lightness).toBeCloseTo(l + (100 - l) * 0.5, 0);
      expect(darkened.lightness).toBeCloseTo(l - l * 0.5, 0);
    });

    it("lighten(1) reaches white, darken(1) reaches black", () => {
      const c = rgb(100, 149, 237);
      expect(c.lighten(1).lightness).toBe(100);
      expect(c.darken(1).lightness).toBe(0);
    });
  });

  describe("saturate() / desaturate() unqualified aliases", () => {
    it("saturate() exists and behaves like saturateHsl()", () => {
      const c = rgb(128, 100, 100);
      expect(c.saturate(0.5).toHex()).toBe(c.saturateHsl(0.5).toHex());
    });

    it("desaturate() exists and behaves like desaturateHsl()", () => {
      const c = rgb(255, 0, 0);
      expect(c.desaturate(0.5).toHex()).toBe(c.desaturateHsl(0.5).toHex());
    });

    it("saturate(1) fully saturates", () => {
      const c = rgb(128, 100, 100);
      expect(c.saturate(1).saturationHsl).toBe(100);
    });

    it("desaturate(1) fully desaturates", () => {
      const c = rgb(255, 0, 0);
      expect(c.desaturate(1).saturationHsl).toBe(0);
    });
  });

  describe("saturateHsl/desaturateHsl symmetry", () => {
    it("saturateHsl and desaturateHsl use the same remaining-space model toward opposite boundaries", () => {
      const c = rgb(128, 100, 100); // partially saturated
      const s = c.saturationHsl;
      // saturateHsl(0.5) moves toward 100: s + (100-s)*0.5
      // desaturateHsl(0.5) moves toward 0: s - s*0.5
      expect(c.saturateHsl(0.5).saturationHsl).toBeCloseTo(
        s + (100 - s) * 0.5,
        0,
      );
      expect(c.desaturateHsl(0.5).saturationHsl).toBeCloseTo(s - s * 0.5, 0);
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
      expect(same.red).toBe(100);
      expect(same.green).toBe(149);
      expect(same.blue).toBe(237);
    });

    it("darken(0) preserves exact RGB values", () => {
      const c = rgb(100, 149, 237);
      const same = c.darken(0);
      expect(same.red).toBe(100);
      expect(same.green).toBe(149);
      expect(same.blue).toBe(237);
    });

    it("rotate(0) preserves exact RGB values", () => {
      const c = rgb(100, 149, 237);
      const same = c.rotate(0);
      expect(same.red).toBe(100);
      expect(same.green).toBe(149);
      expect(same.blue).toBe(237);
    });

    it("saturateHsl(0) preserves exact RGB values", () => {
      const c = rgb(100, 149, 237);
      const same = c.saturateHsl(0);
      expect(same.red).toBe(100);
      expect(same.green).toBe(149);
      expect(same.blue).toBe(237);
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
