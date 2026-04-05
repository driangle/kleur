/**
 * RGB ↔ HSB (HSV) conversion helpers.
 *
 * RGB channels: 0-255 (integers)
 * HSB channels: h 0-360, s 0-100, b 0-100
 */

import type { Hsb } from "./types.js";

export function rgbToHsb(r: number, g: number, b: number): Hsb {
  const rn = r / 255;
  const gn = g / 255;
  const bn = b / 255;
  const max = Math.max(rn, gn, bn);
  const min = Math.min(rn, gn, bn);
  const d = max - min;
  let h = 0;
  if (d !== 0) {
    if (max === rn) h = ((gn - bn) / d + 6) % 6;
    else if (max === gn) h = (bn - rn) / d + 2;
    else h = (rn - gn) / d + 4;
    h = Math.round(h * 60);
  }
  const s = max === 0 ? 0 : Math.round((d / max) * 100);
  return { h, s, b: Math.round(max * 100) };
}

export function hsbToRgb(
  h: number,
  s: number,
  b: number,
): { r: number; g: number; b: number } {
  const sp = s / 100;
  const bp = b / 100;
  const c = bp * sp;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = bp - c;
  let rp = 0,
    gp = 0,
    bprime = 0;
  if (h < 60) {
    rp = c;
    gp = x;
  } else if (h < 120) {
    rp = x;
    gp = c;
  } else if (h < 180) {
    gp = c;
    bprime = x;
  } else if (h < 240) {
    gp = x;
    bprime = c;
  } else if (h < 300) {
    rp = x;
    bprime = c;
  } else {
    rp = c;
    bprime = x;
  }
  return {
    r: Math.round((rp + m) * 255),
    g: Math.round((gp + m) * 255),
    b: Math.round((bprime + m) * 255),
  };
}
