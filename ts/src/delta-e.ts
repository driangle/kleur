/**
 * Delta E color difference formulas.
 *
 * All functions take two 3-component tuples representing colors
 * in the appropriate color space (Lab or OKLab).
 */

export type Triple = [number, number, number];

export function euclidean(a: Triple, b: Triple): number {
  return Math.sqrt(
    (a[0] - b[0]) ** 2 + (a[1] - b[1]) ** 2 + (a[2] - b[2]) ** 2,
  );
}

/** CIE76: Euclidean distance in Lab space */
export function deltaE76(a: Triple, b: Triple): number {
  return euclidean(a, b);
}

/** CIE94 with graphic arts parametric factors */
export function deltaE94(a: Triple, b: Triple): number {
  const [l1, a1, b1] = a;
  const [l2, a2, b2] = b;

  const dL = l1 - l2;
  const c1 = Math.sqrt(a1 * a1 + b1 * b1);
  const c2 = Math.sqrt(a2 * a2 + b2 * b2);
  const dC = c1 - c2;

  const da = a1 - a2;
  const db = b1 - b2;
  const dHSq = da * da + db * db - dC * dC;
  const dH = dHSq > 0 ? Math.sqrt(dHSq) : 0;

  const sL = 1;
  const sC = 1 + 0.045 * c1;
  const sH = 1 + 0.015 * c1;

  return Math.sqrt((dL / sL) ** 2 + (dC / sC) ** 2 + (dH / sH) ** 2);
}

/** CIEDE2000 color difference */
export function deltaE2000(a: Triple, b: Triple): number {
  const [l1, a1, b1] = a;
  const [l2, a2, b2] = b;

  const lBar = (l1 + l2) / 2;
  const c1 = Math.sqrt(a1 * a1 + b1 * b1);
  const c2 = Math.sqrt(a2 * a2 + b2 * b2);
  const cBar = (c1 + c2) / 2;

  const cBar7 = cBar ** 7;
  const g = 0.5 * (1 - Math.sqrt(cBar7 / (cBar7 + 25 ** 7)));

  const a1p = a1 * (1 + g);
  const a2p = a2 * (1 + g);

  const c1p = Math.sqrt(a1p * a1p + b1 * b1);
  const c2p = Math.sqrt(a2p * a2p + b2 * b2);
  const cBarP = (c1p + c2p) / 2;

  let h1p = (Math.atan2(b1, a1p) * 180) / Math.PI;
  if (h1p < 0) h1p += 360;
  let h2p = (Math.atan2(b2, a2p) * 180) / Math.PI;
  if (h2p < 0) h2p += 360;

  let hBarP: number;
  let dhP: number;

  if (c1p * c2p === 0) {
    // Achromatic guard: when either color is achromatic
    hBarP = h1p + h2p;
    dhP = 0;
  } else {
    if (Math.abs(h1p - h2p) <= 180) {
      hBarP = (h1p + h2p) / 2;
    } else if (h1p + h2p < 360) {
      hBarP = (h1p + h2p + 360) / 2;
    } else {
      hBarP = (h1p + h2p - 360) / 2;
    }

    if (Math.abs(h2p - h1p) <= 180) {
      dhP = h2p - h1p;
    } else if (h2p - h1p > 180) {
      dhP = h2p - h1p - 360;
    } else {
      dhP = h2p - h1p + 360;
    }
  }

  const t =
    1 -
    0.17 * Math.cos(((hBarP - 30) * Math.PI) / 180) +
    0.24 * Math.cos((2 * hBarP * Math.PI) / 180) +
    0.32 * Math.cos(((3 * hBarP + 6) * Math.PI) / 180) -
    0.2 * Math.cos(((4 * hBarP - 63) * Math.PI) / 180);

  const dLp = l2 - l1;
  const dCp = c2p - c1p;
  const dHp = 2 * Math.sqrt(c1p * c2p) * Math.sin(((dhP / 2) * Math.PI) / 180);

  const sL = 1 + (0.015 * (lBar - 50) ** 2) / Math.sqrt(20 + (lBar - 50) ** 2);
  const sC = 1 + 0.045 * cBarP;
  const sH = 1 + 0.015 * cBarP * t;

  const cBarP7 = cBarP ** 7;
  const rT =
    -2 *
    Math.sqrt(cBarP7 / (cBarP7 + 25 ** 7)) *
    Math.sin((60 * Math.exp(-(((hBarP - 275) / 25) ** 2)) * Math.PI) / 180);

  return Math.sqrt(
    (dLp / sL) ** 2 +
      (dCp / sC) ** 2 +
      (dHp / sH) ** 2 +
      rT * (dCp / sC) * (dHp / sH),
  );
}

/** Euclidean distance in OKLab space */
export function deltaEOK(a: Triple, b: Triple): number {
  return euclidean(a, b);
}
