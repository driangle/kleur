/**
 * Color space conversion functions.
 *
 * All inputs expect RGB channels in 0-255 range.
 * Lab uses D65 illuminant with L 0-100, a/b roughly -128 to +128.
 * OKLab uses L 0-1, a/b roughly -0.4 to +0.4.
 * LCH/OKLCH are cylindrical forms: L same as parent, C >= 0, H 0-360.
 */

/**
 * Linearize an sRGB channel (0-255) to linear light (0-1).
 */
export function linearize(channel: number): number {
  const c = channel / 255;
  return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
}

// D65 reference white
const D65_X = 0.95047;
const D65_Y = 1.0;
const D65_Z = 1.08883;

function rgbToXyz(r: number, g: number, b: number): [number, number, number] {
  const lr = linearize(r);
  const lg = linearize(g);
  const lb = linearize(b);

  // sRGB → XYZ (D65) matrix
  const x = 0.4124564 * lr + 0.3575761 * lg + 0.1804375 * lb;
  const y = 0.2126729 * lr + 0.7151522 * lg + 0.072175 * lb;
  const z = 0.0193339 * lr + 0.119192 * lg + 0.9503041 * lb;

  return [x, y, z];
}

function labF(t: number): number {
  const delta = 6 / 29;
  return t > delta ** 3 ? Math.cbrt(t) : t / (3 * delta * delta) + 4 / 29;
}

export function rgbToLab(
  r: number,
  g: number,
  b: number,
): { l: number; a: number; b: number } {
  const [x, y, z] = rgbToXyz(r, g, b);

  const fx = labF(x / D65_X);
  const fy = labF(y / D65_Y);
  const fz = labF(z / D65_Z);

  return {
    l: 116 * fy - 16,
    a: 500 * (fx - fy),
    b: 200 * (fy - fz),
  };
}

export function rgbToOklab(
  r: number,
  g: number,
  b: number,
): { l: number; a: number; b: number } {
  const lr = linearize(r);
  const lg = linearize(g);
  const lb = linearize(b);

  // Linear RGB → LMS (Oklab matrix)
  const l_ = 0.4122214708 * lr + 0.5363325363 * lg + 0.0514459929 * lb;
  const m_ = 0.2119034982 * lr + 0.6806995451 * lg + 0.1073969566 * lb;
  const s_ = 0.0883024619 * lr + 0.2817188376 * lg + 0.6299787005 * lb;

  // Cube root
  const l1 = Math.cbrt(l_);
  const m1 = Math.cbrt(m_);
  const s1 = Math.cbrt(s_);

  // LMS → OKLab
  return {
    l: 0.2104542553 * l1 + 0.793617785 * m1 - 0.0040720468 * s1,
    a: 1.9779984951 * l1 - 2.428592205 * m1 + 0.4505937099 * s1,
    b: 0.0259040371 * l1 + 0.7827717662 * m1 - 0.808675766 * s1,
  };
}

export function labToLch(
  l: number,
  a: number,
  b: number,
): { l: number; c: number; h: number } {
  const c = Math.sqrt(a * a + b * b);
  let h = (Math.atan2(b, a) * 180) / Math.PI;
  if (h < 0) h += 360;
  return { l, c, h };
}

export function oklabToOklch(
  l: number,
  a: number,
  b: number,
): { l: number; c: number; h: number } {
  return labToLch(l, a, b);
}
