import { rgbToHsl, hslToRgb } from "./hsl.js";

const clampByte = (v: number): number => Math.round(Math.min(255, Math.max(0, v)));
const clampAlpha = (v: number): number => Math.min(1, Math.max(0, v));
const clampHue = (v: number): number => ((v % 360) + 360) % 360;
const clampPercent = (v: number): number => Math.min(100, Math.max(0, v));

/**
 * Immutable RGBA color with derived HSL access.
 *
 * All mutation methods return a new instance.
 */
export class KleurStruct {
  readonly r: number;
  readonly g: number;
  readonly b: number;
  readonly a: number;

  constructor(r: number, g: number, b: number, a = 1) {
    this.r = clampByte(r);
    this.g = clampByte(g);
    this.b = clampByte(b);
    this.a = clampAlpha(a);
  }

  // --- HSL (derived on demand) ---

  private hsl(): { h: number; s: number; l: number } {
    return rgbToHsl(this.r, this.g, this.b);
  }

  // --- Channel getters ---

  red(): number {
    return this.r;
  }

  green(): number {
    return this.g;
  }

  blue(): number {
    return this.b;
  }

  hue(): number {
    return this.hsl().h;
  }

  saturation(): number {
    return this.hsl().s;
  }

  lightness(): number {
    return this.hsl().l;
  }

  alpha(): number {
    return this.a;
  }

  // --- Immutable setters ---

  withRed(v: number): KleurStruct {
    return new KleurStruct(v, this.g, this.b, this.a);
  }

  withGreen(v: number): KleurStruct {
    return new KleurStruct(this.r, v, this.b, this.a);
  }

  withBlue(v: number): KleurStruct {
    return new KleurStruct(this.r, this.g, v, this.a);
  }

  withHue(v: number): KleurStruct {
    const { s, l } = this.hsl();
    const rgb = hslToRgb(clampHue(v), s, l);
    return new KleurStruct(rgb.r, rgb.g, rgb.b, this.a);
  }

  withSaturation(v: number): KleurStruct {
    const { h, l } = this.hsl();
    const rgb = hslToRgb(h, clampPercent(v), l);
    return new KleurStruct(rgb.r, rgb.g, rgb.b, this.a);
  }

  withLightness(v: number): KleurStruct {
    const { h, s } = this.hsl();
    const rgb = hslToRgb(h, s, clampPercent(v));
    return new KleurStruct(rgb.r, rgb.g, rgb.b, this.a);
  }

  withAlpha(v: number): KleurStruct {
    return new KleurStruct(this.r, this.g, this.b, v);
  }
}
