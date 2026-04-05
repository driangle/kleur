import { describe, it, expect } from "vitest";
import { deltaE2000, type Triple } from "../src/delta-e.js";

describe("deltaE2000 CIEDE2000 reference values (Sharma 2005)", () => {
  // Reference pairs from Sharma, Wu, Dalal (2005) Table 1
  // Source: https://www.hajim.rochester.edu/ece/~gsharma/ciede2000/

  const sharmaPairs: {
    name: string;
    a: Triple;
    b: Triple;
    expected: number;
  }[] = [
    {
      name: "pair 1",
      a: [50.0, 2.6772, -79.7751],
      b: [50.0, 0.0, -82.7485],
      expected: 2.0425,
    },
    {
      name: "pair 4",
      a: [50.0, -1.3802, -84.2814],
      b: [50.0, 0.0, -82.7485],
      expected: 1.0,
    },
    {
      name: "pair 7 (achromatic vs chromatic)",
      a: [50.0, 0.0, 0.0],
      b: [50.0, -1.0, 2.0],
      expected: 2.3669,
    },
    {
      name: "pair 8 (chromatic vs achromatic, reverse of 7)",
      a: [50.0, -1.0, 2.0],
      b: [50.0, 0.0, 0.0],
      expected: 2.3669,
    },
    {
      name: "pair 9",
      a: [50.0, 2.49, -0.001],
      b: [50.0, -2.49, 0.0009],
      expected: 7.1792,
    },
    {
      name: "pair 11",
      a: [50.0, 2.49, -0.001],
      b: [50.0, -2.49, 0.0011],
      expected: 7.2195,
    },
    {
      name: "pair 13",
      a: [50.0, -0.001, 2.49],
      b: [50.0, 0.0009, -2.49],
      expected: 4.8045,
    },
    {
      name: "pair 16",
      a: [50.0, 2.5, 0.0],
      b: [50.0, 0.0, -2.5],
      expected: 4.3065,
    },
    {
      name: "pair 17",
      a: [50.0, 2.5, 0.0],
      b: [73.0, 25.0, -18.0],
      expected: 27.1492,
    },
    {
      name: "pair 21",
      a: [50.0, 2.5, 0.0],
      b: [50.0, 3.1736, 0.5854],
      expected: 1.0,
    },
    {
      name: "pair 25",
      a: [60.2574, -34.0099, 36.2677],
      b: [60.4626, -34.1751, 39.4387],
      expected: 1.2644,
    },
    {
      name: "pair 29",
      a: [22.7233, 20.0904, -46.694],
      b: [23.0331, 14.973, -42.5619],
      expected: 2.0373,
    },
    {
      name: "pair 31",
      a: [90.8027, -2.0831, 1.441],
      b: [91.1528, -1.6435, 0.0447],
      expected: 1.4441,
    },
    {
      name: "pair 34",
      a: [2.0776, 0.0795, -1.135],
      b: [0.9033, -0.0636, -0.5514],
      expected: 0.9082,
    },
  ];

  for (const { name, a, b, expected } of sharmaPairs) {
    it(`matches Sharma ${name}`, () => {
      expect(deltaE2000(a, b)).toBeCloseTo(expected, 4);
    });
  }

  describe("achromatic guard (c1p * c2p == 0)", () => {
    it("both achromatic: only lightness contributes", () => {
      // When both colors are achromatic, dCp=0, dHp=0, only dLp/sL matters
      const a: Triple = [50.0, 0.0, 0.0];
      const b: Triple = [50.0, 0.0, 0.0];
      expect(deltaE2000(a, b)).toBe(0);
    });

    it("achromatic pair with lightness difference", () => {
      const a: Triple = [0.0, 0.0, 0.0];
      const b: Triple = [100.0, 0.0, 0.0];
      const result = deltaE2000(a, b);
      expect(result).toBeGreaterThan(0);
      expect(Number.isNaN(result)).toBe(false);
    });

    it("symmetric for achromatic vs chromatic (Sharma pairs 7+8)", () => {
      const achromatic: Triple = [50.0, 0.0, 0.0];
      const chromatic: Triple = [50.0, -1.0, 2.0];
      expect(deltaE2000(achromatic, chromatic)).toBeCloseTo(
        deltaE2000(chromatic, achromatic),
        10,
      );
    });
  });
});
