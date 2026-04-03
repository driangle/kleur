import { describe, it, expect } from "vitest";

describe("kleur", () => {
  it("should be importable", async () => {
    const mod = await import("../src/index.js");
    expect(mod).toBeDefined();
  });
});
