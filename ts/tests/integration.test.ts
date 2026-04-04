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
    expect(typeof Kleur.combine.lerp).toBe("function");

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
    const { hex, rgb, kleur, mix } = await import("../src/index.js");
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
});
