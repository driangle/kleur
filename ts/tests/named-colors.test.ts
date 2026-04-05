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
    expect(r!.red).toBe(255);
    expect(r!.green).toBe(0);
    expect(r!.blue).toBe(0);
  });

  it("is case-insensitive", () => {
    const r1 = getNamedColor("red");
    const r2 = getNamedColor("Red");
    const r3 = getNamedColor("RED");
    expect(r1!.red).toBe(r2!.red);
    expect(r2!.red).toBe(r3!.red);
  });

  it("returns undefined for unknown names", () => {
    expect(getNamedColor("notacolor")).toBeUndefined();
  });

  it("returns transparent with alpha=0", () => {
    const t = getNamedColor("transparent");
    expect(t).toBeDefined();
    expect(t!.red).toBe(0);
    expect(t!.green).toBe(0);
    expect(t!.blue).toBe(0);
    expect(t!.alpha).toBe(0);
  });

  it("looks up cornflowerblue", () => {
    const c = getNamedColor("cornflowerblue");
    expect(c).toBeDefined();
    expect(c!.red).toBe(100);
    expect(c!.green).toBe(149);
    expect(c!.blue).toBe(237);
  });

  it("looks up rebeccapurple", () => {
    const c = getNamedColor("rebeccapurple");
    expect(c).toBeDefined();
    expect(c!.red).toBe(102);
    expect(c!.green).toBe(51);
    expect(c!.blue).toBe(153);
  });
});

describe("color constants", () => {
  it("white is #ffffff", () => {
    expect(white.red).toBe(255);
    expect(white.green).toBe(255);
    expect(white.blue).toBe(255);
  });

  it("black is #000000", () => {
    expect(black.red).toBe(0);
    expect(black.green).toBe(0);
    expect(black.blue).toBe(0);
  });

  it("red is #ff0000", () => {
    expect(red.red).toBe(255);
    expect(red.green).toBe(0);
    expect(red.blue).toBe(0);
  });

  it("green is #008000", () => {
    expect(green.red).toBe(0);
    expect(green.green).toBe(128);
    expect(green.blue).toBe(0);
  });

  it("blue is #0000ff", () => {
    expect(blue.red).toBe(0);
    expect(blue.green).toBe(0);
    expect(blue.blue).toBe(255);
  });

  it("yellow is #ffff00", () => {
    expect(yellow.red).toBe(255);
    expect(yellow.green).toBe(255);
    expect(yellow.blue).toBe(0);
  });

  it("cyan is #00ffff", () => {
    expect(cyan.red).toBe(0);
    expect(cyan.green).toBe(255);
    expect(cyan.blue).toBe(255);
  });

  it("magenta is #ff00ff", () => {
    expect(magenta.red).toBe(255);
    expect(magenta.green).toBe(0);
    expect(magenta.blue).toBe(255);
  });

  it("orange is #ffa500", () => {
    expect(orange.red).toBe(255);
    expect(orange.green).toBe(165);
    expect(orange.blue).toBe(0);
  });

  it("purple is #800080", () => {
    expect(purple.red).toBe(128);
    expect(purple.green).toBe(0);
    expect(purple.blue).toBe(128);
  });

  it("pink is #ffc0cb", () => {
    expect(pink.red).toBe(255);
    expect(pink.green).toBe(192);
    expect(pink.blue).toBe(203);
  });

  it("lime is #00ff00", () => {
    expect(lime.red).toBe(0);
    expect(lime.green).toBe(255);
    expect(lime.blue).toBe(0);
  });

  it("transparent is rgba(0,0,0,0)", () => {
    expect(transparent.red).toBe(0);
    expect(transparent.green).toBe(0);
    expect(transparent.blue).toBe(0);
    expect(transparent.alpha).toBe(0);
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
      expect(c!.red).toBe(r);
      expect(c!.green).toBe(g);
      expect(c!.blue).toBe(b);
    });
  }
});
