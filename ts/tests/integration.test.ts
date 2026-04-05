import { describe, it, expect } from "vitest";

describe("public API integration", () => {
  it("exports Kleur namespace with grouped API", async () => {
    const mod = await import("../src/index.js");
    const { Kleur } = mod;

    // Create
    expect(typeof Kleur.create.rgb).toBe("function");
    expect(typeof Kleur.create.hex).toBe("function");
    expect(typeof Kleur.create.hsl).toBe("function");
    expect(typeof Kleur.create.number).toBe("function");
    expect(typeof Kleur.create.css).toBe("function");
    expect(typeof Kleur.create.kleur).toBe("function");
    expect(typeof Kleur.create.random).toBe("function");
    expect(typeof Kleur.create.grayscale).toBe("function");

    // Analyze
    expect(typeof Kleur.analyze.luminance).toBe("function");
    expect(typeof Kleur.analyze.isLight).toBe("function");
    expect(typeof Kleur.analyze.isDark).toBe("function");
    expect(typeof Kleur.analyze.contrast).toBe("function");
    expect(typeof Kleur.analyze.distance).toBe("function");

    // Combine
    expect(typeof Kleur.combine.blend).toBe("function");
    expect(typeof Kleur.combine.mix).toBe("function");

    // Harmony
    expect(typeof Kleur.harmony.triadic).toBe("function");
    expect(typeof Kleur.harmony.tetradic).toBe("function");
    expect(typeof Kleur.harmony.analogous).toBe("function");
    expect(typeof Kleur.harmony.splitComplement).toBe("function");
    expect(typeof Kleur.harmony.tints).toBe("function");
    expect(typeof Kleur.harmony.shades).toBe("function");
    expect(typeof Kleur.harmony.tones).toBe("function");

    // Named
    expect(typeof Kleur.named.get).toBe("function");

    // Gradient
    expect(typeof Kleur.gradient.colorStop).toBe("function");
    expect(typeof Kleur.gradient.solid).toBe("function");
    expect(typeof Kleur.gradient.linearGradient).toBe("function");
    expect(typeof Kleur.gradient.radialGradient).toBe("function");
    expect(typeof Kleur.gradient.isSolid).toBe("function");
    expect(typeof Kleur.gradient.isGradient).toBe("function");

    // Named color constants
    expect(Kleur.named.white.r).toBe(255);
    expect(Kleur.named.black.r).toBe(0);
    expect(Kleur.named.red.r).toBe(255);
    expect(Kleur.named.transparent.a).toBe(0);
  });

  it("exports rgb factory function", async () => {
    const { rgb } = await import("../src/index.js");
    const c = rgb(255, 0, 0);
    expect(c.r).toBe(255);
    expect(typeof c.lighten).toBe("function");
    expect(typeof c.toHex).toBe("function");
  });

  it("exports named constants directly", async () => {
    const { red, blue, white, transparent } = await import("../src/index.js");
    expect(red.r).toBe(255);
    expect(blue.b).toBe(255);
    expect(white.g).toBe(255);
    expect(transparent.a).toBe(0);
  });

  it("exports factory functions directly", async () => {
    const { default: kleur, hex, rgb, mix } = await import("../src/index.js");
    expect(hex("#ff0000").r).toBe(255);
    expect(rgb(0, 255, 0).g).toBe(255);
    expect(kleur("#0000ff").b).toBe(255);
    const mid = mix(hex("#000000"), hex("#ffffff"), 0.5);
    expect(mid.r).toBe(128);
  });

  it("Kleur.create.kleur resolves named colors", async () => {
    const { Kleur } = await import("../src/index.js");
    const c = Kleur.create.kleur("cornflowerblue");
    expect(c.r).toBe(100);
    expect(c.g).toBe(149);
    expect(c.b).toBe(237);
  });

  it("kleur is callable and carries all API methods", async () => {
    const { default: kleur } = await import("../src/index.js");

    // Callable as universal factory
    expect(kleur("#ff0000").r).toBe(255);
    expect(kleur(255, 0, 0).r).toBe(255);

    // Create
    expect(kleur.hex("#ff0000").r).toBe(255);
    expect(kleur.rgb(0, 255, 0).g).toBe(255);
    expect(kleur.hsl(0, 100, 50).r).toBe(255);
    expect(kleur.number(0xff0000).r).toBe(255);
    expect(kleur.css("rgb(255,0,0)").r).toBe(255);
    expect(kleur.grayscale(128).r).toBe(128);
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
    expect(kleur.mix(red, blue, 0.5).r).toBe(128);
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
    expect(kleur.white.r).toBe(255);
    expect(kleur.black.r).toBe(0);
    expect(kleur.red.r).toBe(255);
    expect(kleur.transparent.a).toBe(0);
  });
});
