import { describe, it, expect } from "vitest";

describe("public API integration", () => {
  it("exports Kleur namespace with full API", async () => {
    const mod = await import("../src/index.js");
    const { Kleur } = mod;

    // Factory functions
    expect(typeof Kleur.rgb).toBe("function");
    expect(typeof Kleur.fromHex).toBe("function");
    expect(typeof Kleur.fromHsl).toBe("function");
    expect(typeof Kleur.fromHsla).toBe("function");
    expect(typeof Kleur.fromNumber).toBe("function");
    expect(typeof Kleur.fromCss).toBe("function");
    expect(typeof Kleur.gray).toBe("function");
    expect(typeof Kleur.grey).toBe("function");
    expect(typeof Kleur.struct).toBe("function");
    expect(typeof Kleur.random).toBe("function");

    // Analysis
    expect(typeof Kleur.luminance).toBe("function");
    expect(typeof Kleur.isLight).toBe("function");
    expect(typeof Kleur.isDark).toBe("function");
    expect(typeof Kleur.contrast).toBe("function");
    expect(typeof Kleur.distance).toBe("function");

    // Blending
    expect(typeof Kleur.blend).toBe("function");
    expect(typeof Kleur.mix).toBe("function");
    expect(typeof Kleur.lerp).toBe("function");

    // Harmony
    expect(typeof Kleur.triadic).toBe("function");
    expect(typeof Kleur.tetradic).toBe("function");
    expect(typeof Kleur.analogous).toBe("function");
    expect(typeof Kleur.splitComplement).toBe("function");
    expect(typeof Kleur.tints).toBe("function");
    expect(typeof Kleur.shades).toBe("function");
    expect(typeof Kleur.tones).toBe("function");

    // Named colors
    expect(typeof Kleur.getNamedColor).toBe("function");

    // Gradients
    expect(typeof Kleur.colorStop).toBe("function");
    expect(typeof Kleur.solid).toBe("function");
    expect(typeof Kleur.linearGradient).toBe("function");
    expect(typeof Kleur.radialGradient).toBe("function");
    expect(typeof Kleur.isSolid).toBe("function");
    expect(typeof Kleur.isGradient).toBe("function");

    // Color constants
    expect(Kleur.white.r).toBe(255);
    expect(Kleur.black.r).toBe(0);
    expect(Kleur.red.r).toBe(255);
    expect(Kleur.transparent.a).toBe(0);
  });

  it("exports KleurStruct class directly", async () => {
    const { KleurStruct } = await import("../src/index.js");
    const c = new KleurStruct(255, 0, 0);
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
    const { fromHex, rgb, struct, mix } = await import("../src/index.js");
    expect(fromHex("#ff0000").r).toBe(255);
    expect(rgb(0, 255, 0).g).toBe(255);
    expect(struct("#0000ff").b).toBe(255);
    const mid = mix(fromHex("#000000"), fromHex("#ffffff"), 0.5);
    expect(mid.r).toBe(128);
  });

  it("Kleur.struct resolves named colors", async () => {
    const { Kleur } = await import("../src/index.js");
    const c = Kleur.struct("cornflowerblue");
    expect(c.r).toBe(100);
    expect(c.g).toBe(149);
    expect(c.b).toBe(237);
  });
});
