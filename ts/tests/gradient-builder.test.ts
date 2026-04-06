import { describe, it, expect } from "vitest";
import { rgb } from "../src/parse.js";
import {
  linearGradient,
  radialGradient,
  colorStop,
  LinearGradientBuilder,
  RadialGradientBuilder,
} from "../src/gradient.js";

const red = rgb(255, 0, 0);
const blue = rgb(0, 0, 255);
const green = rgb(0, 255, 0);

describe("LinearGradientBuilder", () => {
  it("builds a linear gradient with fluent chaining", () => {
    const g = new LinearGradientBuilder()
      .from(0, 0)
      .to(100, 0)
      .addStop(0, red)
      .addStop(1, blue)
      .build();

    expect(g.type).toBe("linear");
    expect(g.x0).toBe(0);
    expect(g.y0).toBe(0);
    expect(g.x1).toBe(100);
    expect(g.y1).toBe(0);
    expect(g.stops).toHaveLength(2);
    expect(g.stops[0].offset).toBe(0);
    expect(g.stops[1].offset).toBe(1);
  });

  it("supports alpha", () => {
    const g = new LinearGradientBuilder()
      .from(0, 0)
      .to(100, 0)
      .addStop(0, red)
      .alpha(0.5)
      .build();

    expect(g.globalAlpha).toBe(0.5);
  });

  it("clamps stop offsets", () => {
    const g = new LinearGradientBuilder()
      .addStop(-0.5, red)
      .addStop(1.5, blue)
      .build();

    expect(g.stops[0].offset).toBe(0);
    expect(g.stops[1].offset).toBe(1);
  });

  it("accepts string color values", () => {
    const g = new LinearGradientBuilder()
      .addStop(0, "#ff0000")
      .addStop(1, "#0000ff")
      .build();

    expect(g.stops[0].color.red).toBe(255);
    expect(g.stops[1].color.blue).toBe(255);
  });

  it("produces equivalent result to config-object API", () => {
    const stops = [colorStop(0, red), colorStop(0.5, green), colorStop(1, blue)];

    const fromConfig = linearGradient({
      x0: 10,
      y0: 20,
      x1: 90,
      y1: 80,
      stops,
      globalAlpha: 0.8,
    });

    const fromBuilder = new LinearGradientBuilder()
      .from(10, 20)
      .to(90, 80)
      .addStop(0, red)
      .addStop(0.5, green)
      .addStop(1, blue)
      .alpha(0.8)
      .build();

    expect(fromBuilder.type).toBe(fromConfig.type);
    expect(fromBuilder.x0).toBe(fromConfig.x0);
    expect(fromBuilder.y0).toBe(fromConfig.y0);
    expect(fromBuilder.x1).toBe(fromConfig.x1);
    expect(fromBuilder.y1).toBe(fromConfig.y1);
    expect(fromBuilder.globalAlpha).toBe(fromConfig.globalAlpha);
    expect(fromBuilder.stops).toHaveLength(fromConfig.stops.length);
    for (let i = 0; i < fromBuilder.stops.length; i++) {
      expect(fromBuilder.stops[i].offset).toBe(fromConfig.stops[i].offset);
      expect(fromBuilder.stops[i].color.red).toBe(fromConfig.stops[i].color.red);
      expect(fromBuilder.stops[i].color.green).toBe(fromConfig.stops[i].color.green);
      expect(fromBuilder.stops[i].color.blue).toBe(fromConfig.stops[i].color.blue);
    }
  });

  it("allows incremental stop addition", () => {
    const builder = new LinearGradientBuilder().from(0, 0).to(100, 0);
    builder.addStop(0, red);
    builder.addStop(0.5, green);
    builder.addStop(1, blue);
    const g = builder.build();

    expect(g.stops).toHaveLength(3);
    expect(g.stops[1].offset).toBe(0.5);
  });

  it("defaults to zero coordinates", () => {
    const g = new LinearGradientBuilder().addStop(0, red).build();
    expect(g.x0).toBe(0);
    expect(g.y0).toBe(0);
    expect(g.x1).toBe(0);
    expect(g.y1).toBe(0);
  });
});

describe("RadialGradientBuilder", () => {
  it("builds a radial gradient with fluent chaining", () => {
    const g = new RadialGradientBuilder()
      .from(50, 50, 0)
      .to(50, 50, 100)
      .addStop(0, red)
      .addStop(1, blue)
      .build();

    expect(g.type).toBe("radial");
    expect(g.x0).toBe(50);
    expect(g.y0).toBe(50);
    expect(g.r0).toBe(0);
    expect(g.x1).toBe(50);
    expect(g.y1).toBe(50);
    expect(g.r1).toBe(100);
    expect(g.stops).toHaveLength(2);
  });

  it("supports alpha", () => {
    const g = new RadialGradientBuilder()
      .from(0, 0, 0)
      .to(0, 0, 50)
      .addStop(0, red)
      .alpha(0.7)
      .build();

    expect(g.globalAlpha).toBe(0.7);
  });

  it("produces equivalent result to config-object API", () => {
    const stops = [colorStop(0, red), colorStop(1, blue)];

    const fromConfig = radialGradient({
      x0: 50, y0: 50, r0: 10,
      x1: 50, y1: 50, r1: 100,
      stops,
    });

    const fromBuilder = new RadialGradientBuilder()
      .from(50, 50, 10)
      .to(50, 50, 100)
      .addStop(0, red)
      .addStop(1, blue)
      .build();

    expect(fromBuilder.type).toBe(fromConfig.type);
    expect(fromBuilder.x0).toBe(fromConfig.x0);
    expect(fromBuilder.y0).toBe(fromConfig.y0);
    expect(fromBuilder.r0).toBe(fromConfig.r0);
    expect(fromBuilder.x1).toBe(fromConfig.x1);
    expect(fromBuilder.y1).toBe(fromConfig.y1);
    expect(fromBuilder.r1).toBe(fromConfig.r1);
    expect(fromBuilder.stops).toHaveLength(fromConfig.stops.length);
    for (let i = 0; i < fromBuilder.stops.length; i++) {
      expect(fromBuilder.stops[i].offset).toBe(fromConfig.stops[i].offset);
      expect(fromBuilder.stops[i].color.red).toBe(fromConfig.stops[i].color.red);
      expect(fromBuilder.stops[i].color.green).toBe(fromConfig.stops[i].color.green);
      expect(fromBuilder.stops[i].color.blue).toBe(fromConfig.stops[i].color.blue);
    }
  });
});
