import {KleurUtils} from './kleur-utils';
import {KleurMode, WithSaturation} from "./kleur-mode";
import {HSL, HSLRandomConfig} from "./hsl";
import {HSB, HSBRandomConfig} from "./hsb";
import {RGB, RGBRandomConfig} from "./rgb";

const MAX_VALUE = 1;
// const SAFE_MIN_MESSAGE = "[min] must be between [0,1] inclusive";
// const SAFE_MAX_MESSAGE = "[max] must be between [0,1] inclusive";


/*

  // Random Changes
  def withRandomRed(randomizer: Randomizer = Randomizer.Uniform()): Kleur = {
    this.withRed(randomizer.randomInRange(0, Kleur.MAX_VALUE).floatValue())
  }

  def withRandomGreen(randomizer: Randomizer = Randomizer.Uniform()): Kleur = {
    this.withGreen(randomizer.randomInRange(0, Kleur.MAX_VALUE).floatValue())
  }

  def withRandomBlue(randomizer: Randomizer = Randomizer.Uniform()): Kleur = {
    this.withBlue(randomizer.randomInRange(0, Kleur.MAX_VALUE).floatValue())
  }

  def withRandomHue(randomizer: Randomizer = Randomizer.Uniform()): Kleur = {
    this.withHue(randomizer.randomInRange(0, Kleur.MAX_HUE_VALUE).floatValue())
  }

  def withRandomSaturation(randomizer: Randomizer = Randomizer.Uniform()): Kleur = {
    this.withSaturation(randomizer.randomInRange(0, Kleur.MAX_VALUE).floatValue())
  }

  def withRandomBrightness(randomizer: Randomizer = Randomizer.Uniform()): Kleur = {
    this.withBrightness(randomizer.randomInRange(0, Kleur.MAX_VALUE).floatValue())
  }
 */

const safeValue = (value: number): number => {
    return Math.min(MAX_VALUE, Math.max(0.0, value));
};
const verifyValue = (value: number, min: number = 0, max: number = 1): void => {
    if (value < min || value > max) {
        throw `value must be between [${min}, ${max}] inclusive.`;
    }
};

const verifyDelta = (delta: number): void => {
    if (delta < -1 || delta > 1) {
        throw "[delta] must be between [-1,1] inclusive.";
    }
};

function computeHSBL(): HSBL {
    // https://en.wikipedia.org/wiki/HSL_and_HSV#From_RGB
    const all = [this.red, this.green, this.blue];
    const sorted = all.sort();
    const min = sorted[0];
    const max = sorted[2];
    const h = (function () {
        if (max == min) {
            return 0;
        } else if (max === this.red) {
            return 60 * ((this.green - this.blue) / (max - min));
        } else if (max === this.green) {
            return 60 * (2 + (this.blue - this.red) / (max - min));
        } else {
            return 60 * (4 + (this.red - this.green) / (max - min));
        }
    }).bind(this)();
    const b = max;
    const l = (max + min) / 2.0;
    const s: SaturationMap = (function () {
        const hsbSaturation = (max === 0 || min === 1) ? 0 : (max - min) / max;
        const hslSaturation = (max === 0 || min === 1) ? 0 : (max - l) / Math.min(l, 1 - l);
        return {
            'HSB': hsbSaturation,
            'HSL': hslSaturation
        }
    })();
    return {
        hue: KleurUtils.normalizeHue(h),
        saturation: s,
        brightness: b,
        lightness: l
    };
}

type SaturationMap = Record<string, number>;

type HSBL = {
    hue: number;
    saturation: SaturationMap;
    brightness: number;
    lightness: number;
}
export type RandomConfig = RGBRandomConfig | HSBRandomConfig | HSLRandomConfig;
export class Kleur {

    /** Static Code */
    static readonly BLACK = new Kleur(0, 0, 0);
    static readonly WHITE = new Kleur(1, 1, 1);

    static readonly RED = new Kleur(1, 0, 0);
    static readonly GREEN = new Kleur(0, 1, 0);
    static readonly BLUE = new Kleur(0, 0, 1);

    static readonly YELLOW = new Kleur(1, 1, 0);
    static readonly TEAL = new Kleur(0, 1, 1);
    static readonly PURPLE = new Kleur(1, 0, 1);

    static random(): Kleur {
        return RGB.random();
    }

    static randomRGB(config: RGBRandomConfig): Kleur {
        return RGB.random(config);
    }

    static randomHSB(config: HSBRandomConfig): Kleur {
        return HSB.random(config);
    }

    static randomHSL(config: HSLRandomConfig): Kleur {
        return HSL.random(config);
    }

    static rgb(red: number, green: number, blue: number, alpha: number) {
        return new Kleur(red, green, blue, alpha);
    }
    static hsb(hue: number, saturation: number, brightness: number, alpha: number) {
        return HSB.create(hue, saturation, brightness, alpha)
    }
    static hsl(hue: number, saturation: number, lightness: number, alpha: number) {
        return HSL.create(hue, saturation, lightness, alpha);
    }

    static hex(hex: number) {
        const red = (hex & 0xff0000) >> 16;
        const green = (hex & 0x00ff00) >> 8;
        const blue = hex & 0x0000ff;
        return new Kleur(red / 255.0, green / 255.0, blue / 255.0);
    }

    /* Instance Code */

    readonly red: number;
    readonly green: number;
    readonly blue: number;
    readonly alpha: number;

    readonly hue: number;
    readonly brightness: number;
    readonly lightness: number;

    private hsbl: HSBL;

    constructor(red: number, green: number, blue: number, alpha: number = 1) {
        this.red = red;
        this.green = green;
        this.blue = blue;
        this.alpha = alpha;
        this.hsbl = computeHSBL.bind(this)();
        this.hue = this.hsbl.hue;
        this.brightness = this.hsbl.brightness;
        this.lightness = this.hsbl.lightness;
    }

    saturation(mode: WithSaturation): number {
        return this.hsbl.saturation[mode.name];
    }

    withRed(red: number) {
        return new Kleur(red, this.green, this.blue, this.alpha)
    }

    withGreen(green: number) {
        return new Kleur(this.red, green, this.blue, this.alpha)
    }

    withBlue(blue: number) {
        return new Kleur(this.red, this.green, blue, this.alpha)
    }

    withAlpha(alpha: number) {
        return new Kleur(this.red, this.green, this.blue, alpha)
    }

    withHue(hue: number) {
        return HSL.withHue(this, hue);
    }

    withSaturation(saturation: number, mode: WithSaturation = HSB) {
        return mode.withSaturation(this, safeValue(saturation));
    }

    withBrightness(brightness: number) {
        return HSB.withBrightness(this, safeValue(brightness));
    }

    withLightness(lightness: number) {
        return HSB.withBrightness(this, safeValue(lightness));
    }

    // Delta
    withRedDelta(delta: number) {
        verifyDelta(delta);
        return new Kleur(safeValue(this.red + delta), this.green, this.blue, this.alpha);
    }

    withGreenDelta(delta: number) {
        verifyDelta(delta);
        return new Kleur(this.red, safeValue(this.green + delta), this.blue, this.alpha);
    }

    withBlueDelta(delta: number) {
        verifyDelta(delta);
        return new Kleur(this.red, this.green, safeValue(this.blue + delta), this.alpha);
    }

    withAlphaDelta(delta: number) {
        verifyDelta(delta);
        return new Kleur(this.red, this.green, this.blue, safeValue(this.alpha + delta));
    }

    withHueDelta(delta: number) {
        return this.withHue(this.hue + delta)
    }

    withSaturationDelta(delta: number, mode: WithSaturation = HSB) {
        verifyDelta(delta);
        return this.withSaturation(this.saturation(mode) + delta, mode);
    }

    withBrightnessDelta(delta: number) {
        verifyDelta(delta);
        return this.withBrightness(this.brightness + delta);
    }

    // Min /Max
    withMinRed(min: number) {
        verifyValue(min);
        return new Kleur(Math.max(min, this.red), this.green, this.blue, this.alpha);
    }

    withMaxRed(max: number) {
        verifyValue(max);
        return new Kleur(Math.min(max, this.red), this.green, this.blue, this.alpha);
    }

    withMinGreen(min: number) {
        verifyValue(min);
        return new Kleur(this.red, Math.max(min, this.green), this.blue, this.alpha);
    }

    withMaxGreen(max: number) {
        verifyValue(max);
        return new Kleur(this.red, Math.min(max, this.green), this.blue, this.alpha);
    }

    withMinBlue(min: number) {
        verifyValue(min);
        return new Kleur(this.red, this.green, Math.max(min, this.blue), this.alpha);
    }

    withMaxBlue(max: number) {
        verifyValue(max);
        return new Kleur(this.red, this.green, Math.min(max, this.blue), this.alpha);
    }

    withMinAlpha(min: number) {
        verifyValue(min);
        return new Kleur(this.red, this.green, this.blue, Math.max(min, this.alpha));
    }

    withMaxAlpha(max: number) {
        verifyValue(max);
        return new Kleur(this.red, this.green, this.blue, Math.min(max, this.alpha));
    }

    withMinHue(min: number) {
        verifyValue(min);
        return this.withHue(Math.max(this.hue, min));
    }

    withMaxHue(max: number) {
        verifyValue(max);
        return this.withHue(Math.min(this.hue, max));
    }

    withMinSaturation(min: number, mode: WithSaturation = HSB) {
        verifyValue(min);
        return this.withSaturation(Math.max(this.saturation(mode), safeValue(min)), mode);
    }

    withMaxSaturation(max: number, mode: WithSaturation = HSB) {
        verifyValue(max);
        return this.withSaturation(Math.min(this.saturation(mode), safeValue(max)), mode);
    }

    withMinBrightness(min: number) {
        verifyValue(min);
        return this.withBrightness(Math.max(this.brightness, safeValue(min)));
    }

    withMaxBrightness(max: number) {
        verifyValue(max);
        return this.withBrightness(Math.min(this.brightness, safeValue(max)));
    }

    withMinLightness(min: number) {
        verifyValue(min);
        return this.withLightness(Math.max(this.lightness, safeValue(min)));
    }

    withMaxLightness(max: number) {
        verifyValue(max);
        return this.withLightness(Math.min(this.lightness, safeValue(max)));
    }

    interpolate(end: Kleur, amount: number, mode: KleurMode = HSB) {
        return mode.interpolate(this, end, amount);
    }

    equals(other: Kleur) {
        return this.red === other.red
            && this.green === other.green
            && this.blue === other.blue
            && this.alpha === other.alpha;
    }

    p5() {
        return [this.red * 255, this.green * 255, this.blue * 255, this.alpha * 255];
    }

    hex() {
        const red = this.red * 255 << 16;
        const green = this.green * 255 << 8;
        const blue = this.blue * 255;
        return red | green | blue;
    }

}
