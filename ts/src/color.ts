import { rgbToHsl, hslToRgb } from "./hsl.js";
import type { Rgb, Rgba, Hsl, Hsla, Hsb } from "./types.js";

const clampByte = (v: number): number => Math.round(Math.min(255, Math.max(0, v)));
const clampAlpha = (v: number): number => Math.min(1, Math.max(0, v));
const clampHue = (v: number): number => ((v % 360) + 360) % 360;
const clampPercent = (v: number): number => Math.min(100, Math.max(0, v));

/** Immutable RGBA color with derived HSL access. All mutation methods return a new instance. */
export class Color {
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

  private _hsl(): { h: number; s: number; l: number } {
    return rgbToHsl(this.r, this.g, this.b);
  }

  private _hsb(): Hsb {
    const r = this.r / 255;
    const g = this.g / 255;
    const b = this.b / 255;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const d = max - min;
    let h = 0;
    if (d !== 0) {
      if (max === r) h = ((g - b) / d + 6) % 6;
      else if (max === g) h = (b - r) / d + 2;
      else h = (r - g) / d + 4;
      h = Math.round(h * 60);
    }
    const s = max === 0 ? 0 : Math.round((d / max) * 100);
    return { h, s, b: Math.round(max * 100) };
  }

  private fromHsl(h: number, s: number, l: number): Color {
    const rgb = hslToRgb(h, clampPercent(s), clampPercent(l));
    return new Color(rgb.r, rgb.g, rgb.b, this.a);
  }

  // --- Channel getters ---
  get red(): number { return this.r; }
  get green(): number { return this.g; }
  get blue(): number { return this.b; }
  get hue(): number { return this._hsl().h; }
  get saturation(): number { return this._hsl().s; }
  get lightness(): number { return this._hsl().l; }
  get alpha(): number { return this.a; }
  get brightness(): number { return this._hsb().b; }
  get hsl(): Hsl { return this._hsl(); }
  get hsb(): Hsb { return this._hsb(); }

  // --- Immutable setters ---
  withRed(v: number): Color { return new Color(v, this.g, this.b, this.a); }
  withGreen(v: number): Color { return new Color(this.r, v, this.b, this.a); }
  withBlue(v: number): Color { return new Color(this.r, this.g, v, this.a); }
  withAlpha(v: number): Color { return new Color(this.r, this.g, this.b, v); }

  withHue(v: number): Color {
    const { s, l } = this._hsl();
    return this.fromHsl(clampHue(v), s, l);
  }

  withSaturation(v: number): Color {
    const { h, l } = this._hsl();
    return this.fromHsl(h, clampPercent(v), l);
  }

  withLightness(v: number): Color {
    const { h, s } = this._hsl();
    return this.fromHsl(h, s, clampPercent(v));
  }

  // --- Output formats ---
  toHex(): string {
    const hex = (n: number): string => n.toString(16).padStart(2, "0");
    return `#${hex(this.r)}${hex(this.g)}${hex(this.b)}`;
  }

  toCss(): string { return `rgba(${this.r},${this.g},${this.b},${this.a})`; }
  toRgb(): Rgb { return { r: this.r, g: this.g, b: this.b }; }
  toRgba(): Rgba { return { r: this.r, g: this.g, b: this.b, a: this.a }; }
  toHsl(): Hsl { return this._hsl(); }
  toHsla(): Hsla { return { ...this._hsl(), a: this.a }; }
  toArray(): [number, number, number, number] { return [this.r, this.g, this.b, this.a]; }
  toNormalized(): [number, number, number, number] { return [this.r / 255, this.g / 255, this.b / 255, this.a]; }
  toString(): string { return this.toCss(); }

  // --- Color adjustments ---
  lighten(amount: number): Color {
    const { h, s, l } = this._hsl();
    return this.fromHsl(h, s, l + (100 - l) * amount);
  }

  darken(amount: number): Color {
    const { h, s, l } = this._hsl();
    return this.fromHsl(h, s, l * (1 - amount));
  }

  scaleLightness(factor: number): Color {
    const { h, s, l } = this._hsl();
    return this.fromHsl(h, s, l * factor);
  }

  saturate(amount: number): Color {
    const { h, s, l } = this._hsl();
    return this.fromHsl(h, s + (100 - s) * amount, l);
  }

  desaturate(amount: number): Color {
    const { h, s, l } = this._hsl();
    return this.fromHsl(h, s * (1 - amount), l);
  }

  grayscale(): Color {
    const { h, l } = this._hsl();
    return this.fromHsl(h, 0, l);
  }

  rotate(degrees: number): Color {
    const { h, s, l } = this._hsl();
    return this.fromHsl(clampHue(h + degrees), s, l);
  }

  complement(): Color { return this.rotate(180); }

  warm(amount = 0.2): Color {
    const { h, s, l } = this._hsl();
    const diff = ((30 - h + 540) % 360) - 180;
    return this.fromHsl(clampHue(h + diff * amount), s, l);
  }

  cool(amount = 0.2): Color {
    const { h, s, l } = this._hsl();
    const diff = ((240 - h + 540) % 360) - 180;
    return this.fromHsl(clampHue(h + diff * amount), s, l);
  }

  invert(): Color { return new Color(255 - this.r, 255 - this.g, 255 - this.b, this.a); }
  opacity(value: number): Color { return new Color(this.r, this.g, this.b, value); }
  fade(amount: number): Color { return new Color(this.r, this.g, this.b, this.a * (1 - amount)); }
  opaque(): Color { return new Color(this.r, this.g, this.b, 1); }

  // --- Interpolation ---
  interpolate(target: Color, t = 0.5, ease?: (t: number) => number): Color {
    const et = ease ? ease(t) : t;
    return new Color(
      this.r + (target.r - this.r) * et,
      this.g + (target.g - this.g) * et,
      this.b + (target.b - this.b) * et,
      this.a + (target.a - this.a) * et,
    );
  }

  lerp(target: Color, t = 0.5, ease?: (t: number) => number): Color { return this.interpolate(target, t, ease); }
}
