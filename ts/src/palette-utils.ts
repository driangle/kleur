import type { Color } from "./color.js";

export type PaletteSortChannel =
  | "hue"
  | "saturation"
  | "lightness"
  | "brightness"
  | "red"
  | "green"
  | "blue"
  | "alpha";

export const channelAccessor: Record<PaletteSortChannel, (c: Color) => number> =
  {
    hue: (c) => c.hue,
    saturation: (c) => c.saturationHsl,
    lightness: (c) => c.lightness,
    brightness: (c) => c.brightness,
    red: (c) => c.red,
    green: (c) => c.green,
    blue: (c) => c.blue,
    alpha: (c) => c.alpha,
  };

export function median(values: number[]): number {
  const sorted = [...values].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
}

export function harmonicTargets(colors: readonly Color[]): number[] {
  let sinSum = 0,
    cosSum = 0;
  for (const c of colors) {
    const rad = (c.hue * Math.PI) / 180;
    sinSum += Math.sin(rad);
    cosSum += Math.cos(rad);
  }
  const mean = ((Math.atan2(sinSum, cosSum) * 180) / Math.PI + 360) % 360;
  const n = colors.length;
  const targets = Array.from(
    { length: n },
    (_, i) => (mean + (i * 360) / n) % 360,
  );
  const used = new Set<number>();
  return colors.map((c) => {
    let best = 0,
      bestD = Infinity;
    for (let i = 0; i < n; i++) {
      if (used.has(i)) continue;
      const d = Math.abs(((c.hue - targets[i] + 540) % 360) - 180);
      if (d < bestD) {
        bestD = d;
        best = i;
      }
    }
    used.add(best);
    return targets[best];
  });
}
