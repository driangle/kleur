import { describe, it, expect } from "vitest";
import kleur from "../src/index.js";

describe("public API integration", () => {
  it("kleur is callable and carries all API methods", () => {
    // Callable as universal factory
    expect(kleur("#ff0000").red).toBe(255);
    expect(kleur(255, 0, 0).red).toBe(255);

    // Create
    expect(kleur.hex("#ff0000").red).toBe(255);
    expect(kleur.rgb(0, 255, 0).green).toBe(255);
    expect(kleur.hsl(0, 100, 50).red).toBe(255);
    expect(kleur.number(0xff0000).red).toBe(255);
    expect(kleur.css("rgb(255,0,0)").red).toBe(255);
    expect(kleur.grayscale(128).red).toBe(128);
    expect(typeof kleur.random).toBe("function");

    // Analyze
    const white = kleur.hex("#ffffff");
    const black = kleur.hex("#000000");
    expect(kleur.luminance(white)).toBeCloseTo(1);
    expect(kleur.isLight(white)).toBe(true);
    expect(kleur.isDark(black)).toBe(true);
    expect(kleur.contrast(white, black)).toBeCloseTo(21, 0);
    expect(typeof kleur.distance).toBe("function");

    // Combine
    const red = kleur.hex("#ff0000");
    const blue = kleur.hex("#0000ff");
    expect(kleur.mix(red, blue, 0.5).red).toBe(128);
    expect(typeof kleur.blend).toBe("function");

    // Harmony
    expect(kleur.triadic(red)).toHaveLength(3);
    expect(kleur.tetradic(red)).toHaveLength(4);
    expect(kleur.analogous(red)).toHaveLength(3);
    expect(kleur.splitComplement(red)).toHaveLength(3);
    expect(kleur.tints(red, 3)).toHaveLength(3);
    expect(kleur.shades(red, 3)).toHaveLength(3);
    expect(kleur.tones(red, 3)).toHaveLength(3);

    // Gradient
    expect(typeof kleur.colorStop).toBe("function");
    expect(typeof kleur.solid).toBe("function");
    expect(typeof kleur.linearGradient).toBe("function");
    expect(typeof kleur.radialGradient).toBe("function");
    expect(typeof kleur.isSolid).toBe("function");
    expect(typeof kleur.isLinearGradient).toBe("function");
    expect(typeof kleur.isRadialGradient).toBe("function");
    expect(typeof kleur.isGradient).toBe("function");

    // Named colors
    expect(kleur.white.red).toBe(255);
    expect(kleur.black.red).toBe(0);
    expect(kleur.red.red).toBe(255);
    expect(kleur.transparent.alpha).toBe(0);
  });

  it("kleur resolves named colors", () => {
    const c = kleur("cornflowerblue");
    expect(c.red).toBe(100);
    expect(c.green).toBe(149);
    expect(c.blue).toBe(237);
  });
});
