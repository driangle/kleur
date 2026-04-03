import { describe, it, expect } from "vitest";
import { KleurStruct } from "../src/kleur-struct.js";
import {
  rgb,
  hex,
  hsl,
  number,
  css,
  grayscale,
  object,
  setNamedColorLookup,
} from "../src/parse.js";

describe("rgb()", () => {
  it("creates a color from RGBA values", () => {
    const c = rgb(66, 135, 245);
    expect(c.r).toBe(66);
    expect(c.g).toBe(135);
    expect(c.b).toBe(245);
    expect(c.a).toBe(1);
  });

  it("accepts explicit alpha", () => {
    const c = rgb(0, 0, 0, 0.5);
    expect(c.a).toBe(0.5);
  });
});

describe("hex()", () => {
  it("parses 6-digit hex", () => {
    const c = hex("#4287f5");
    expect(c.r).toBe(66);
    expect(c.g).toBe(135);
    expect(c.b).toBe(245);
  });

  it("parses 3-digit hex", () => {
    const c = hex("#abc");
    expect(c.r).toBe(0xaa);
    expect(c.g).toBe(0xbb);
    expect(c.b).toBe(0xcc);
  });

  it("3-digit and 6-digit produce identical colors", () => {
    const short = hex("#abc");
    const long = hex("#aabbcc");
    expect(short.r).toBe(long.r);
    expect(short.g).toBe(long.g);
    expect(short.b).toBe(long.b);
  });

  it("is case-insensitive", () => {
    const upper = hex("#FF0000");
    const lower = hex("#ff0000");
    expect(upper.r).toBe(lower.r);
    expect(upper.g).toBe(lower.g);
    expect(upper.b).toBe(lower.b);
  });

  it("throws for missing #", () => {
    expect(() => hex("ff0000")).toThrow("must start with #");
  });

  it("throws for invalid length", () => {
    expect(() => hex("#abcd")).toThrow("must be 3 or 6 digits");
  });

  it("handles leading/trailing whitespace", () => {
    const c = hex("  #ff0000  ");
    expect(c.r).toBe(255);
  });
});

describe("hsl()", () => {
  it("creates a color from HSL", () => {
    const c = hsl(0, 100, 50);
    expect(c.r).toBe(255);
    expect(c.g).toBe(0);
    expect(c.b).toBe(0);
  });

  it("creates a color from HSL with alpha", () => {
    const c = hsl(240, 100, 50, 0.5);
    expect(c.r).toBe(0);
    expect(c.g).toBe(0);
    expect(c.b).toBe(255);
    expect(c.a).toBe(0.5);
  });

  it("defaults alpha to 1", () => {
    const c = hsl(0, 100, 50);
    expect(c.a).toBe(1);
  });
});

describe("number()", () => {
  it("parses 24-bit packed integer", () => {
    const c = number(0x4287f5);
    expect(c.r).toBe(66);
    expect(c.g).toBe(135);
    expect(c.b).toBe(245);
  });

  it("parses 0x000000 as black", () => {
    const c = number(0x000000);
    expect(c.r).toBe(0);
    expect(c.g).toBe(0);
    expect(c.b).toBe(0);
  });

  it("parses 0xffffff as white", () => {
    const c = number(0xffffff);
    expect(c.r).toBe(255);
    expect(c.g).toBe(255);
    expect(c.b).toBe(255);
  });
});

describe("css()", () => {
  it("parses rgb() string", () => {
    const c = css("rgb(66,135,245)");
    expect(c.r).toBe(66);
    expect(c.g).toBe(135);
    expect(c.b).toBe(245);
    expect(c.a).toBe(1);
  });

  it("parses rgba() string", () => {
    const c = css("rgba(66,135,245,0.5)");
    expect(c.r).toBe(66);
    expect(c.g).toBe(135);
    expect(c.b).toBe(245);
    expect(c.a).toBe(0.5);
  });

  it("parses hsl() string", () => {
    const c = css("hsl(0, 100, 50)");
    expect(c.r).toBe(255);
    expect(c.g).toBe(0);
    expect(c.b).toBe(0);
  });

  it("parses hsla() string", () => {
    const c = css("hsla(240, 100%, 50%, 0.8)");
    expect(c.r).toBe(0);
    expect(c.g).toBe(0);
    expect(c.b).toBe(255);
    expect(c.a).toBe(0.8);
  });

  it("handles spaces in CSS functions", () => {
    const c = css("rgb( 66 , 135 , 245 )");
    expect(c.r).toBe(66);
    expect(c.g).toBe(135);
    expect(c.b).toBe(245);
  });

  it("is case-insensitive", () => {
    const c = css("RGB(255,0,0)");
    expect(c.r).toBe(255);
  });

  it("handles missing alpha as 1", () => {
    const c = css("rgb(255,0,0)");
    expect(c.a).toBe(1);
  });

  it("throws for invalid CSS", () => {
    expect(() => css("not-a-color")).toThrow("Invalid CSS color");
  });
});

describe("grayscale()", () => {
  it("creates a gray color", () => {
    const c = grayscale(128);
    expect(c.r).toBe(128);
    expect(c.g).toBe(128);
    expect(c.b).toBe(128);
    expect(c.a).toBe(1);
  });

  it("accepts optional alpha", () => {
    const c = grayscale(128, 0.5);
    expect(c.a).toBe(0.5);
  });
});

describe("object()", () => {
  it("passes through KleurStruct instances", () => {
    const c = new KleurStruct(255, 0, 0);
    expect(object(c)).toBe(c);
  });

  it("parses hex strings", () => {
    const c = object("#ff0000");
    expect(c.r).toBe(255);
    expect(c.g).toBe(0);
    expect(c.b).toBe(0);
  });

  it("parses CSS strings", () => {
    const c = object("rgb(0,255,0)");
    expect(c.g).toBe(255);
  });

  it("parses numbers", () => {
    const c = object(0xff0000);
    expect(c.r).toBe(255);
  });

  it("looks up named colors when registered", () => {
    setNamedColorLookup((name) => {
      if (name === "red") return new KleurStruct(255, 0, 0);
      return undefined;
    });

    const c = object("red");
    expect(c.r).toBe(255);
    expect(c.g).toBe(0);
    expect(c.b).toBe(0);

    // Clean up
    setNamedColorLookup(() => undefined);
  });

  it("throws for unknown named colors", () => {
    setNamedColorLookup(() => undefined);
    expect(() => object("notacolor")).toThrow("Unknown color");
  });

  it("is case-insensitive for named colors", () => {
    setNamedColorLookup((name) => {
      if (name === "red") return new KleurStruct(255, 0, 0);
      return undefined;
    });

    const c = object("RED");
    expect(c.r).toBe(255);

    setNamedColorLookup(() => undefined);
  });
});

describe("round-trip: hex(color.toHex())", () => {
  const colors = [
    new KleurStruct(255, 0, 0),
    new KleurStruct(0, 255, 0),
    new KleurStruct(0, 0, 255),
    new KleurStruct(66, 135, 245),
    new KleurStruct(0, 0, 0),
    new KleurStruct(255, 255, 255),
  ];

  for (const c of colors) {
    it(`round-trips ${c.toHex()}`, () => {
      const parsed = hex(c.toHex());
      expect(parsed.r).toBe(c.r);
      expect(parsed.g).toBe(c.g);
      expect(parsed.b).toBe(c.b);
    });
  }
});
