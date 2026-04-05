import { rgbToHsl, hslToRgb } from "./hsl.js";
import { rgbToHsb, hsbToRgb } from "./hsb.js";
import type { Rgb, Rgba, Hsl, Hsla, Hsb, KleurValue } from "./types.js";

const clampByte = (v: number): number => Math.round(Math.min(255, Math.max(0, v)));
const clampAlpha = (v: number): number => Math.min(1, Math.max(0, v));
const clampHue = (v: number): number => ((v % 360) + 360) % 360;
const clampPercent = (v: number): number => Math.min(100, Math.max(0, v));

/** Resolver function registered by parse.ts to break the circular dependency. */
let _resolve: ((value: KleurValue) => Color) | undefined;

/** Register the resolve function (called by parse.ts at import time). */
export function registerResolver(fn: (value: KleurValue) => Color): void {
  _resolve = fn;
}

/** Resolve a KleurValue to a Color, passing through if already a Color. */
function resolveValue(value: KleurValue): Color {
  if (value instanceof Color) return value;
  if (!_resolve) throw new Error("Color resolver not registered. Import parse.js first.");
  return _resolve(value);
}

/** Immutable RGBA color with derived HSL access. All mutation methods return a new instance. */
export class Color {
  readonly #r: number;
  readonly #g: number;
  readonly #b: number;
  readonly #a: number;

  constructor(r: number, g: number, b: number, a = 1) {
    this.#r = clampByte(r);
    this.#g = clampByte(g);
    this.#b = clampByte(b);
    this.#a = clampAlpha(a);
  }

  private _hsl(): { h: number; s: number; l: number } { return rgbToHsl(this.#r, this.#g, this.#b); }
  private _hsb(): Hsb { return rgbToHsb(this.#r, this.#g, this.#b); }
  private fromHsl(h: number, s: number, l: number): Color {
    const rgb = hslToRgb(h, clampPercent(s), clampPercent(l));
    return new Color(rgb.r, rgb.g, rgb.b, this.#a);
  }
  private fromHsb(h: number, s: number, b: number): Color {
    const rgb = hsbToRgb(h, clampPercent(s), clampPercent(b));
    return new Color(rgb.r, rgb.g, rgb.b, this.#a);
  }
  private mapHsl(mapper: (hsl: Hsl) => Hsl): Color {
    const { h, s, l } = mapper(this._hsl());
    return this.fromHsl(clampHue(h), s, l);
  }
  private mapHsb(mapper: (hsb: Hsb) => Hsb): Color {
    const { h, s, b } = mapper(this._hsb());
    return this.fromHsb(clampHue(h), s, b);
  }

  // --- Channel getters ---
  get red(): number { return this.#r; }
  get green(): number { return this.#g; }
  get blue(): number { return this.#b; }
  get hue(): number { return Math.round(this._hsl().h); }
  get saturationHsl(): number { return Math.round(this._hsl().s); }
  get lightness(): number { return Math.round(this._hsl().l); }
  get alpha(): number { return this.#a; }
  get saturationHsb(): number { return this._hsb().s; }
  get brightness(): number { return this._hsb().b; }
  get hsl(): Hsl {
    const { h, s, l } = this._hsl();
    return { h: Math.round(h), s: Math.round(s), l: Math.round(l) };
  }
  get hsb(): Hsb { return this._hsb(); }

  // --- Immutable setters ---
  withRed(v: number): Color { return new Color(v, this.#g, this.#b, this.#a); }
  withGreen(v: number): Color { return new Color(this.#r, v, this.#b, this.#a); }
  withBlue(v: number): Color { return new Color(this.#r, this.#g, v, this.#a); }
  withAlpha(v: number): Color { return new Color(this.#r, this.#g, this.#b, v); }
  withHue(v: number): Color { return this.mapHsl(({ s, l }) => ({ h: v, s, l })); }
  withSaturationHsl(v: number): Color { return this.mapHsl(({ h, l }) => ({ h, s: v, l })); }
  withSaturationHsb(v: number): Color { return this.mapHsb(({ h, b }) => ({ h, s: v, b })); }
  withBrightness(v: number): Color { return this.mapHsb(({ h, s }) => ({ h, s, b: v })); }
  withLightness(v: number): Color { return this.mapHsl(({ h, s }) => ({ h, s, l: v })); }
  adjustAlpha(delta: number): Color { return this.withAlpha(this.#a + delta); }
  adjustHue(delta: number): Color { return this.mapHsl(({ h, s, l }) => ({ h: h + delta, s, l })); }
  adjustSaturationHsl(delta: number): Color { return this.mapHsl(({ h, s, l }) => ({ h, s: s + delta, l })); }
  adjustSaturationHsb(delta: number): Color { return this.mapHsb(({ h, s, b }) => ({ h, s: s + delta, b })); }
  adjustBrightness(delta: number): Color { return this.mapHsb(({ h, s, b }) => ({ h, s, b: b + delta })); }
  adjustLightness(delta: number): Color { return this.mapHsl(({ h, s, l }) => ({ h, s, l: l + delta })); }
  scaleAlpha(factor: number): Color { return this.withAlpha(this.#a * factor); }
  scaleSaturationHsl(factor: number): Color { return this.mapHsl(({ h, s, l }) => ({ h, s: s * factor, l })); }
  scaleSaturationHsb(factor: number): Color { return this.mapHsb(({ h, s, b }) => ({ h, s: s * factor, b })); }
  scaleBrightness(factor: number): Color { return this.mapHsb(({ h, s, b }) => ({ h, s, b: b * factor })); }
  scaleLightness(factor: number): Color { return this.mapHsl(({ h, s, l }) => ({ h, s, l: l * factor })); }

  // --- Output formats ---
  toHex(): string {
    const hex = (n: number): string => n.toString(16).padStart(2, "0");
    return `#${hex(this.#r)}${hex(this.#g)}${hex(this.#b)}`;
  }

  toCss(): string { return `rgba(${this.#r},${this.#g},${this.#b},${this.#a})`; }
  toRgb(): Rgb { return { r: this.#r, g: this.#g, b: this.#b }; }
  toRgba(): Rgba { return { r: this.#r, g: this.#g, b: this.#b, a: this.#a }; }
  toHsl(): Hsl { return this.hsl; }
  toHsla(): Hsla { return { ...this.hsl, a: this.#a }; }
  toArray(): [number, number, number, number] { return [this.#r, this.#g, this.#b, this.#a]; }
  toNormalized(): [number, number, number, number] { return [this.#r / 255, this.#g / 255, this.#b / 255, this.#a]; }
  toString(): string { return this.toCss(); }

  // --- Color adjustments ---
  lighten(amount: number): Color {
    const { h, s, l } = this._hsl();
    return this.fromHsl(h, s, l + (100 - l) * amount);
  }
  darken(amount: number): Color { return this.mapHsl(({ h, s, l }) => ({ h, s, l: l - l * amount })); }
  saturateHsl(amount: number): Color { return this.mapHsl(({ h, s, l }) => ({ h, s: s + (100 - s) * amount, l })); }
  desaturateHsl(amount: number): Color { return this.mapHsl(({ h, s, l }) => ({ h, s: s - s * amount, l })); }
  grayscale(): Color { return this.withSaturationHsl(0); }
  rotate(degrees: number): Color { return this.adjustHue(degrees); }
  complement(): Color { return this.rotate(180); }
  warm(amount = 0.2): Color { return this.adjustHue((((30 - this.hue + 540) % 360) - 180) * amount); }
  cool(amount = 0.2): Color { return this.adjustHue((((240 - this.hue + 540) % 360) - 180) * amount); }
  invert(): Color { return new Color(255 - this.#r, 255 - this.#g, 255 - this.#b, this.#a); }
  opaque(): Color { return this.withAlpha(1); }

  // --- Interpolation ---
  mix(target: KleurValue, t = 0.5, ease?: (t: number) => number): Color {
    const b = resolveValue(target);
    const et = ease ? ease(t) : t;
    return new Color(
      this.#r + (b.#r - this.#r) * et,
      this.#g + (b.#g - this.#g) * et,
      this.#b + (b.#b - this.#b) * et,
      this.#a + (b.#a - this.#a) * et,
    );
  }

  // --- Harmony ---
  triadic(): [Color, Color, Color] {
    return [this, this.rotate(120), this.rotate(240)];
  }

  tetradic(): [Color, Color, Color, Color] {
    return [this, this.rotate(90), this.rotate(180), this.rotate(270)];
  }

  analogous(angle = 30): [Color, Color, Color] {
    return [this.rotate(-angle), this, this.rotate(angle)];
  }

  splitComplement(angle = 30): [Color, Color, Color] {
    return [this, this.rotate(180 - angle), this.rotate(180 + angle)];
  }

  tints(count: number): Color[] {
    const result: Color[] = [];
    for (let i = 1; i <= count; i++) result.push(this.lighten(i / (count + 1)));
    return result;
  }

  shades(count: number): Color[] {
    const result: Color[] = [];
    for (let i = 1; i <= count; i++) result.push(this.darken(i / (count + 1)));
    return result;
  }

  tones(count: number): Color[] {
    const result: Color[] = [];
    for (let i = 1; i <= count; i++) result.push(this.desaturateHsl(i / (count + 1)));
    return result;
  }
}
