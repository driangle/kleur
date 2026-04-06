import { describe, it, expect } from "vitest";
import { ParseError } from "../src/index.js";
import {
  rgb,
  hex,
  hsl,
  int,
  css,
  grayscale,
  kleur as kleurFn,
  resolve,
} from "../src/parse.js";

describe("rgb()", () => {
  it("creates a color from RGBA values", () => {
    const c = rgb(66, 135, 245);
    expect(c.red).toBe(66);
    expect(c.green).toBe(135);
    expect(c.blue).toBe(245);
    expect(c.alpha).toBe(1);
  });

  it("accepts explicit alpha", () => {
    const c = rgb(0, 0, 0, 0.5);
    expect(c.alpha).toBe(0.5);
  });
});

describe("hex()", () => {
  it("parses 6-digit hex", () => {
    const c = hex("#4287f5");
    expect(c.red).toBe(66);
    expect(c.green).toBe(135);
    expect(c.blue).toBe(245);
  });

  it("parses 3-digit hex", () => {
    const c = hex("#abc");
    expect(c.red).toBe(0xaa);
    expect(c.green).toBe(0xbb);
    expect(c.blue).toBe(0xcc);
  });

  it("3-digit and 6-digit produce identical colors", () => {
    const short = hex("#abc");
    const long = hex("#aabbcc");
    expect(short.red).toBe(long.red);
    expect(short.green).toBe(long.green);
    expect(short.blue).toBe(long.blue);
  });

  it("is case-insensitive", () => {
    const upper = hex("#FF0000");
    const lower = hex("#ff0000");
    expect(upper.red).toBe(lower.red);
    expect(upper.green).toBe(lower.green);
    expect(upper.blue).toBe(lower.blue);
  });

  it("throws for missing #", () => {
    expect(() => hex("ff0000")).toThrow(ParseError);
    expect(() => hex("ff0000")).toThrow("must start with #");
  });

  it("throws for invalid length", () => {
    expect(() => hex("#abcd")).toThrow(ParseError);
    expect(() => hex("#abcd")).toThrow("must be 3 or 6 digits");
  });

  it("handles leading/trailing whitespace", () => {
    const c = hex("  #ff0000  ");
    expect(c.red).toBe(255);
  });

  it("throws for invalid hex digits (6-digit)", () => {
    expect(() => hex("#gggggg")).toThrow(ParseError);
  });

  it("throws for invalid hex digits (3-digit)", () => {
    expect(() => hex("#ggg")).toThrow(ParseError);
  });

  it("throws for mixed valid/invalid hex digits", () => {
    expect(() => hex("#ff00gg")).toThrow(ParseError);
  });
});

describe("hsl()", () => {
  it("creates a color from HSL", () => {
    const c = hsl(0, 100, 50);
    expect(c.red).toBe(255);
    expect(c.green).toBe(0);
    expect(c.blue).toBe(0);
  });

  it("creates a color from HSL with alpha", () => {
    const c = hsl(240, 100, 50, 0.5);
    expect(c.red).toBe(0);
    expect(c.green).toBe(0);
    expect(c.blue).toBe(255);
    expect(c.alpha).toBe(0.5);
  });

  it("defaults alpha to 1", () => {
    const c = hsl(0, 100, 50);
    expect(c.alpha).toBe(1);
  });
});

describe("int()", () => {
  it("parses 24-bit packed integer", () => {
    const c = int(0x4287f5);
    expect(c.red).toBe(66);
    expect(c.green).toBe(135);
    expect(c.blue).toBe(245);
  });

  it("parses 0x000000 as black", () => {
    const c = int(0x000000);
    expect(c.red).toBe(0);
    expect(c.green).toBe(0);
    expect(c.blue).toBe(0);
  });

  it("parses 0xffffff as white", () => {
    const c = int(0xffffff);
    expect(c.red).toBe(255);
    expect(c.green).toBe(255);
    expect(c.blue).toBe(255);
  });

  it("parses 0 as black", () => {
    const c = int(0);
    expect(c.red).toBe(0);
    expect(c.green).toBe(0);
    expect(c.blue).toBe(0);
  });

  it("throws for negative numbers", () => {
    expect(() => int(-1)).toThrow(ParseError);
    expect(() => int(-1)).toThrow("Invalid color value");
  });

  it("throws for floats", () => {
    expect(() => int(3.7)).toThrow(ParseError);
  });

  it("throws for values exceeding 0xFFFFFF", () => {
    expect(() => int(0x1000000)).toThrow(ParseError);
  });

  it("throws for NaN", () => {
    expect(() => int(NaN)).toThrow(ParseError);
  });

  it("throws for Infinity", () => {
    expect(() => int(Infinity)).toThrow(ParseError);
    expect(() => int(-Infinity)).toThrow(ParseError);
  });
});

describe("css()", () => {
  it("parses rgb() string", () => {
    const c = css("rgb(66,135,245)");
    expect(c.red).toBe(66);
    expect(c.green).toBe(135);
    expect(c.blue).toBe(245);
    expect(c.alpha).toBe(1);
  });

  it("parses rgba() string", () => {
    const c = css("rgba(66,135,245,0.5)");
    expect(c.red).toBe(66);
    expect(c.green).toBe(135);
    expect(c.blue).toBe(245);
    expect(c.alpha).toBe(0.5);
  });

  it("parses hsl() string", () => {
    const c = css("hsl(0, 100, 50)");
    expect(c.red).toBe(255);
    expect(c.green).toBe(0);
    expect(c.blue).toBe(0);
  });

  it("parses hsla() string", () => {
    const c = css("hsla(240, 100%, 50%, 0.8)");
    expect(c.red).toBe(0);
    expect(c.green).toBe(0);
    expect(c.blue).toBe(255);
    expect(c.alpha).toBe(0.8);
  });

  it("handles spaces in CSS functions", () => {
    const c = css("rgb( 66 , 135 , 245 )");
    expect(c.red).toBe(66);
    expect(c.green).toBe(135);
    expect(c.blue).toBe(245);
  });

  it("is case-insensitive", () => {
    const c = css("RGB(255,0,0)");
    expect(c.red).toBe(255);
  });

  it("handles missing alpha as 1", () => {
    const c = css("rgb(255,0,0)");
    expect(c.alpha).toBe(1);
  });

  it("throws for invalid CSS", () => {
    expect(() => css("not-a-color")).toThrow(ParseError);
    expect(() => css("not-a-color")).toThrow("Invalid CSS color");
  });

  it("rejects tokens with unit suffixes", () => {
    expect(() => css("rgb(100px, 100px, 100px)")).toThrow(ParseError);
    expect(() => css("rgb(100em, 50em, 0em)")).toThrow(ParseError);
    expect(() => css("rgb(100rem, 50rem, 0rem)")).toThrow(ParseError);
    expect(() => css("hsl(180deg, 50%, 50%)")).toThrow(ParseError);
  });

  it("parses space-separated rgb() (CSS Color Level 4)", () => {
    const c = css("rgb(255 128 0)");
    expect(c.red).toBe(255);
    expect(c.green).toBe(128);
    expect(c.blue).toBe(0);
    expect(c.alpha).toBe(1);
  });

  it("parses space-separated rgb() with slash alpha", () => {
    const c = css("rgb(255 128 0 / 0.5)");
    expect(c.red).toBe(255);
    expect(c.green).toBe(128);
    expect(c.blue).toBe(0);
    expect(c.alpha).toBe(0.5);
  });

  it("parses space-separated hsl() (CSS Color Level 4)", () => {
    const c = css("hsl(0 100% 50%)");
    expect(c.red).toBe(255);
    expect(c.green).toBe(0);
    expect(c.blue).toBe(0);
    expect(c.alpha).toBe(1);
  });

  it("parses space-separated hsl() with slash alpha", () => {
    const c = css("hsl(240 100% 50% / 0.8)");
    expect(c.red).toBe(0);
    expect(c.green).toBe(0);
    expect(c.blue).toBe(255);
    expect(c.alpha).toBe(0.8);
  });

  it("parses negative hue values in hsl()", () => {
    const c = css("hsl(-120, 100%, 50%)");
    expect(c.red).toBe(0);
    expect(c.green).toBe(0);
    expect(c.blue).toBe(255);
  });

  it("parses negative hue in space-separated hsl()", () => {
    const c = css("hsl(-120 100% 50%)");
    expect(c.red).toBe(0);
    expect(c.green).toBe(0);
    expect(c.blue).toBe(255);
  });
});

describe("grayscale()", () => {
  it("creates a gray color", () => {
    const c = grayscale(128);
    expect(c.red).toBe(128);
    expect(c.green).toBe(128);
    expect(c.blue).toBe(128);
    expect(c.alpha).toBe(1);
  });

  it("accepts optional alpha", () => {
    const c = grayscale(128, 0.5);
    expect(c.alpha).toBe(0.5);
  });
});

describe("kleur()", () => {
  it("passes through Color instances", () => {
    const c = rgb(255, 0, 0);
    expect(kleurFn(c)).toBe(c);
  });

  it("parses hex strings", () => {
    const c = kleurFn("#ff0000");
    expect(c.red).toBe(255);
    expect(c.green).toBe(0);
    expect(c.blue).toBe(0);
  });

  it("parses CSS strings", () => {
    const c = kleurFn("rgb(0,255,0)");
    expect(c.green).toBe(255);
  });

  it("parses numbers", () => {
    const c = kleurFn(0xff0000);
    expect(c.red).toBe(255);
  });

  it("resolves named CSS colors without any setup", () => {
    const c = kleurFn("red");
    expect(c.red).toBe(255);
    expect(c.green).toBe(0);
    expect(c.blue).toBe(0);
  });

  it("throws for unknown named colors", () => {
    expect(() => kleurFn("notacolor")).toThrow(ParseError);
    expect(() => kleurFn("notacolor")).toThrow("Unknown color");
  });

  it("is case-insensitive for named colors", () => {
    const c = kleurFn("RED");
    expect(c.red).toBe(255);
  });

  it("resolves transparent", () => {
    const c = kleurFn("transparent");
    expect(c.alpha).toBe(0);
  });

  it("throws a library error for invalid non-color values", () => {
    expect(() => kleurFn(true as never)).toThrow(ParseError);
    expect(() => kleurFn(true as never)).toThrow("Invalid color value: true");
  });
});

describe("resolve() null/undefined guard", () => {
  it("throws ParseError for null", () => {
    expect(() => resolve(null as never)).toThrow(ParseError);
    expect(() => resolve(null as never)).toThrow("Invalid color value: null");
  });

  it("throws ParseError for undefined", () => {
    expect(() => resolve(undefined as never)).toThrow(ParseError);
    expect(() => resolve(undefined as never)).toThrow(
      "Invalid color value: undefined",
    );
  });
});

describe("round-trip: hex(color.toHex())", () => {
  const colors = [
    rgb(255, 0, 0),
    rgb(0, 255, 0),
    rgb(0, 0, 255),
    rgb(66, 135, 245),
    rgb(0, 0, 0),
    rgb(255, 255, 255),
  ];

  for (const c of colors) {
    it(`round-trips ${c.toHex()}`, () => {
      const parsed = hex(c.toHex());
      expect(parsed.red).toBe(c.red);
      expect(parsed.green).toBe(c.green);
      expect(parsed.blue).toBe(c.blue);
    });
  }
});
