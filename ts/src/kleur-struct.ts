import { rgbToHsl, hslToRgb } from "./hsl.js";
import type { Rgb, Rgba, Hsl, Hsla } from "./types.js";

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

  // --- Output formats ---

  toHex(): string {
    const hex = (n: number): string => n.toString(16).padStart(2, "0");
    return `#${hex(this.r)}${hex(this.g)}${hex(this.b)}`;
  }

  toCss(): string {
    return `rgba(${this.r},${this.g},${this.b},${this.a})`;
  }

  toRgb(): Rgb {
    return { r: this.r, g: this.g, b: this.b };
  }

  toRgba(): Rgba {
    return { r: this.r, g: this.g, b: this.b, a: this.a };
  }

  toHsl(): Hsl {
    return this.hsl();
  }

  toHsla(): Hsla {
    return { ...this.hsl(), a: this.a };
  }

  toArray(): [number, number, number, number] {
    return [this.r, this.g, this.b, this.a];
  }

  toNormalized(): [number, number, number, number] {
    return [this.r / 255, this.g / 255, this.b / 255, this.a];
  }

  toString(): string {
    return this.toCss();
  }

  // --- Color adjustments ---

  private fromHsl(h: number, s: number, l: number): KleurStruct {
    const rgb = hslToRgb(h, clampPercent(s), clampPercent(l));
    return new KleurStruct(rgb.r, rgb.g, rgb.b, this.a);
  }

  lighten(amount: number): KleurStruct {
    const { h, s, l } = this.hsl();
    return this.fromHsl(h, s, l + (100 - l) * amount);
  }

  darken(amount: number): KleurStruct {
    const { h, s, l } = this.hsl();
    return this.fromHsl(h, s, l * (1 - amount));
  }

  brightness(factor: number): KleurStruct {
    const { h, s, l } = this.hsl();
    return this.fromHsl(h, s, l * factor);
  }

  saturate(amount: number): KleurStruct {
    const { h, s, l } = this.hsl();
    return this.fromHsl(h, s + (100 - s) * amount, l);
  }

  desaturate(amount: number): KleurStruct {
    const { h, s, l } = this.hsl();
    return this.fromHsl(h, s * (1 - amount), l);
  }

  grayscale(): KleurStruct {
    const { h, l } = this.hsl();
    return this.fromHsl(h, 0, l);
  }

  rotate(degrees: number): KleurStruct {
    const { h, s, l } = this.hsl();
    return this.fromHsl(clampHue(h + degrees), s, l);
  }

  complement(): KleurStruct {
    return this.rotate(180);
  }

  warm(amount = 0.2): KleurStruct {
    // Shift hue toward orange (30°)
    const { h, s, l } = this.hsl();
    const target = 30;
    const diff = ((target - h + 540) % 360) - 180;
    return this.fromHsl(clampHue(h + diff * amount), s, l);
  }

  cool(amount = 0.2): KleurStruct {
    // Shift hue toward blue (240°)
    const { h, s, l } = this.hsl();
    const target = 240;
    const diff = ((target - h + 540) % 360) - 180;
    return this.fromHsl(clampHue(h + diff * amount), s, l);
  }

  invert(): KleurStruct {
    return new KleurStruct(255 - this.r, 255 - this.g, 255 - this.b, this.a);
  }

  opacity(value: number): KleurStruct {
    return new KleurStruct(this.r, this.g, this.b, value);
  }

  fade(amount: number): KleurStruct {
    return new KleurStruct(this.r, this.g, this.b, this.a * (1 - amount));
  }

  opaque(): KleurStruct {
    return new KleurStruct(this.r, this.g, this.b, 1);
  }
}
