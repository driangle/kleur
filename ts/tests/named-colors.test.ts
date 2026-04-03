import { describe, it, expect } from "vitest";
import {
  getNamedColor,
  white,
  black,
  red,
  green,
  blue,
  yellow,
  cyan,
  magenta,
  orange,
  purple,
  pink,
  lime,
  transparent,
} from "../src/named-colors.js";

describe("getNamedColor()", () => {
  it("looks up known colors", () => {
    const r = getNamedColor("red");
    expect(r).toBeDefined();
    expect(r!.r).toBe(255);
    expect(r!.g).toBe(0);
    expect(r!.b).toBe(0);
  });

  it("is case-insensitive", () => {
    const r1 = getNamedColor("red");
    const r2 = getNamedColor("Red");
    const r3 = getNamedColor("RED");
    expect(r1!.r).toBe(r2!.r);
    expect(r2!.r).toBe(r3!.r);
  });

  it("returns undefined for unknown names", () => {
    expect(getNamedColor("notacolor")).toBeUndefined();
  });

  it("returns transparent with alpha=0", () => {
    const t = getNamedColor("transparent");
    expect(t).toBeDefined();
    expect(t!.r).toBe(0);
    expect(t!.g).toBe(0);
    expect(t!.b).toBe(0);
    expect(t!.a).toBe(0);
  });

  it("looks up cornflowerblue", () => {
    const c = getNamedColor("cornflowerblue");
    expect(c).toBeDefined();
    expect(c!.r).toBe(100);
    expect(c!.g).toBe(149);
    expect(c!.b).toBe(237);
  });

  it("looks up rebeccapurple", () => {
    const c = getNamedColor("rebeccapurple");
    expect(c).toBeDefined();
    expect(c!.r).toBe(102);
    expect(c!.g).toBe(51);
    expect(c!.b).toBe(153);
  });
});

describe("color constants", () => {
  it("white is #ffffff", () => {
    expect(white.r).toBe(255);
    expect(white.g).toBe(255);
    expect(white.b).toBe(255);
  });

  it("black is #000000", () => {
    expect(black.r).toBe(0);
    expect(black.g).toBe(0);
    expect(black.b).toBe(0);
  });

  it("red is #ff0000", () => {
    expect(red.r).toBe(255);
    expect(red.g).toBe(0);
    expect(red.b).toBe(0);
  });

  it("green is #008000", () => {
    expect(green.r).toBe(0);
    expect(green.g).toBe(128);
    expect(green.b).toBe(0);
  });

  it("blue is #0000ff", () => {
    expect(blue.r).toBe(0);
    expect(blue.g).toBe(0);
    expect(blue.b).toBe(255);
  });

  it("yellow is #ffff00", () => {
    expect(yellow.r).toBe(255);
    expect(yellow.g).toBe(255);
    expect(yellow.b).toBe(0);
  });

  it("cyan is #00ffff", () => {
    expect(cyan.r).toBe(0);
    expect(cyan.g).toBe(255);
    expect(cyan.b).toBe(255);
  });

  it("magenta is #ff00ff", () => {
    expect(magenta.r).toBe(255);
    expect(magenta.g).toBe(0);
    expect(magenta.b).toBe(255);
  });

  it("orange is #ffa500", () => {
    expect(orange.r).toBe(255);
    expect(orange.g).toBe(165);
    expect(orange.b).toBe(0);
  });

  it("purple is #800080", () => {
    expect(purple.r).toBe(128);
    expect(purple.g).toBe(0);
    expect(purple.b).toBe(128);
  });

  it("pink is #ffc0cb", () => {
    expect(pink.r).toBe(255);
    expect(pink.g).toBe(192);
    expect(pink.b).toBe(203);
  });

  it("lime is #00ff00", () => {
    expect(lime.r).toBe(0);
    expect(lime.g).toBe(255);
    expect(lime.b).toBe(0);
  });

  it("transparent is rgba(0,0,0,0)", () => {
    expect(transparent.r).toBe(0);
    expect(transparent.g).toBe(0);
    expect(transparent.b).toBe(0);
    expect(transparent.a).toBe(0);
  });
});

describe("dictionary completeness", () => {
  // Spot-check a few more from the 148
  const spotChecks: [string, number, number, number][] = [
    ["aliceblue", 240, 248, 255],
    ["darkslategray", 47, 79, 79],
    ["mediumspringgreen", 0, 250, 154],
    ["papayawhip", 255, 239, 213],
    ["yellowgreen", 154, 205, 50],
  ];

  for (const [name, r, g, b] of spotChecks) {
    it(`contains ${name}`, () => {
      const c = getNamedColor(name);
      expect(c).toBeDefined();
      expect(c!.r).toBe(r);
      expect(c!.g).toBe(g);
      expect(c!.b).toBe(b);
    });
  }
});
