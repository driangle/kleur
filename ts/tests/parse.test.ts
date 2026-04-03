import { describe, it, expect } from "vitest";
import { KleurStruct } from "../src/kleur-struct.js";
import {
  rgb,
  fromHex,
  fromHsl,
  fromHsla,
  fromNumber,
  fromCss,
  gray,
  grey,
  struct,
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

describe("fromHex()", () => {
  it("parses 6-digit hex", () => {
    const c = fromHex("#4287f5");
    expect(c.r).toBe(66);
    expect(c.g).toBe(135);
    expect(c.b).toBe(245);
  });

  it("parses 3-digit hex", () => {
    const c = fromHex("#abc");
    expect(c.r).toBe(0xaa);
    expect(c.g).toBe(0xbb);
    expect(c.b).toBe(0xcc);
  });

  it("3-digit and 6-digit produce identical colors", () => {
    const short = fromHex("#abc");
    const long = fromHex("#aabbcc");
    expect(short.r).toBe(long.r);
    expect(short.g).toBe(long.g);
    expect(short.b).toBe(long.b);
  });

  it("is case-insensitive", () => {
    const upper = fromHex("#FF0000");
    const lower = fromHex("#ff0000");
    expect(upper.r).toBe(lower.r);
    expect(upper.g).toBe(lower.g);
    expect(upper.b).toBe(lower.b);
  });

  it("throws for missing #", () => {
    expect(() => fromHex("ff0000")).toThrow("must start with #");
  });

  it("throws for invalid length", () => {
    expect(() => fromHex("#abcd")).toThrow("must be 3 or 6 digits");
  });

  it("handles leading/trailing whitespace", () => {
    const c = fromHex("  #ff0000  ");
    expect(c.r).toBe(255);
  });
});

describe("fromHsl() / fromHsla()", () => {
  it("creates a color from HSL", () => {
    const c = fromHsl(0, 100, 50);
    expect(c.r).toBe(255);
    expect(c.g).toBe(0);
    expect(c.b).toBe(0);
  });

  it("creates a color from HSLA", () => {
    const c = fromHsla(240, 100, 50, 0.5);
    expect(c.r).toBe(0);
    expect(c.g).toBe(0);
    expect(c.b).toBe(255);
    expect(c.a).toBe(0.5);
  });
});

describe("fromNumber()", () => {
  it("parses 24-bit packed integer", () => {
    const c = fromNumber(0x4287f5);
    expect(c.r).toBe(66);
    expect(c.g).toBe(135);
    expect(c.b).toBe(245);
  });

  it("parses 0x000000 as black", () => {
    const c = fromNumber(0x000000);
    expect(c.r).toBe(0);
    expect(c.g).toBe(0);
    expect(c.b).toBe(0);
  });

  it("parses 0xffffff as white", () => {
    const c = fromNumber(0xffffff);
    expect(c.r).toBe(255);
    expect(c.g).toBe(255);
    expect(c.b).toBe(255);
  });
});

describe("fromCss()", () => {
  it("parses rgb() string", () => {
    const c = fromCss("rgb(66,135,245)");
    expect(c.r).toBe(66);
    expect(c.g).toBe(135);
    expect(c.b).toBe(245);
    expect(c.a).toBe(1);
  });

  it("parses rgba() string", () => {
    const c = fromCss("rgba(66,135,245,0.5)");
    expect(c.r).toBe(66);
    expect(c.g).toBe(135);
    expect(c.b).toBe(245);
    expect(c.a).toBe(0.5);
  });

  it("parses hsl() string", () => {
    const c = fromCss("hsl(0, 100, 50)");
    expect(c.r).toBe(255);
    expect(c.g).toBe(0);
    expect(c.b).toBe(0);
  });

  it("parses hsla() string", () => {
    const c = fromCss("hsla(240, 100%, 50%, 0.8)");
    expect(c.r).toBe(0);
    expect(c.g).toBe(0);
    expect(c.b).toBe(255);
    expect(c.a).toBe(0.8);
  });

  it("handles spaces in CSS functions", () => {
    const c = fromCss("rgb( 66 , 135 , 245 )");
    expect(c.r).toBe(66);
    expect(c.g).toBe(135);
    expect(c.b).toBe(245);
  });

  it("is case-insensitive", () => {
    const c = fromCss("RGB(255,0,0)");
    expect(c.r).toBe(255);
  });

  it("handles missing alpha as 1", () => {
    const c = fromCss("rgb(255,0,0)");
    expect(c.a).toBe(1);
  });

  it("throws for invalid CSS", () => {
    expect(() => fromCss("not-a-color")).toThrow("Invalid CSS color");
  });
});

describe("gray() / grey()", () => {
  it("creates a gray color", () => {
    const c = gray(128);
    expect(c.r).toBe(128);
    expect(c.g).toBe(128);
    expect(c.b).toBe(128);
    expect(c.a).toBe(1);
  });

  it("accepts optional alpha", () => {
    const c = gray(128, 0.5);
    expect(c.a).toBe(0.5);
  });

  it("grey is an alias for gray", () => {
    const g1 = gray(100);
    const g2 = grey(100);
    expect(g1.r).toBe(g2.r);
    expect(g1.g).toBe(g2.g);
    expect(g1.b).toBe(g2.b);
  });
});

describe("struct()", () => {
  it("passes through KleurStruct instances", () => {
    const c = new KleurStruct(255, 0, 0);
    expect(struct(c)).toBe(c);
  });

  it("parses hex strings", () => {
    const c = struct("#ff0000");
    expect(c.r).toBe(255);
    expect(c.g).toBe(0);
    expect(c.b).toBe(0);
  });

  it("parses CSS strings", () => {
    const c = struct("rgb(0,255,0)");
    expect(c.g).toBe(255);
  });

  it("parses numbers", () => {
    const c = struct(0xff0000);
    expect(c.r).toBe(255);
  });

  it("looks up named colors when registered", () => {
    setNamedColorLookup((name) => {
      if (name === "red") return new KleurStruct(255, 0, 0);
      return undefined;
    });

    const c = struct("red");
    expect(c.r).toBe(255);
    expect(c.g).toBe(0);
    expect(c.b).toBe(0);

    // Clean up
    setNamedColorLookup(() => undefined);
  });

  it("throws for unknown named colors", () => {
    setNamedColorLookup(() => undefined);
    expect(() => struct("notacolor")).toThrow("Unknown color");
  });

  it("is case-insensitive for named colors", () => {
    setNamedColorLookup((name) => {
      if (name === "red") return new KleurStruct(255, 0, 0);
      return undefined;
    });

    const c = struct("RED");
    expect(c.r).toBe(255);

    setNamedColorLookup(() => undefined);
  });
});

describe("round-trip: fromHex(color.toHex())", () => {
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
      const parsed = fromHex(c.toHex());
      expect(parsed.r).toBe(c.r);
      expect(parsed.g).toBe(c.g);
      expect(parsed.b).toBe(c.b);
    });
  }
});
