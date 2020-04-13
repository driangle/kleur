import utils from './kleur-utils';
import KleurMode from './kleur-mode';
import API from "./kleur";

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

const verifyValue = (name, value) => {
    if (value < 0 || value > 1) {
        throw "[" + name + "] must be between [-1, 1] inclusive.";
    }
};

const verifyDelta = delta => {
    if (delta < -1 || delta > 1) {
        throw "[delta] must be between [-1,1] inclusive.";
    }
};

const safeValue = (value) => {
    return Math.min(MAX_VALUE, Math.max(0.0, value));
};

class Kleur {
    constructor(red, green, blue, alpha) {
        this.red = red;
        this.green = green;
        this.blue = blue;
        this.alpha = typeof alpha === 'undefined' ? 1 : alpha;
        this.hsbl = this._computeHSBL();
        this.hue = this.hsbl[0];
        this.brightness = this.hsbl[2];
        this.lightness = this.hsbl[3];
    }

    _computeHSBL() {
        return (function () {
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
            const s = (function () {
                const hsbSaturation = (max === 0 || min === 1) ? 0 : (max - min) / max;
                const hslSaturation = (max === 0 || min === 1) ? 0 : (max - l) / Math.min(l, 1 - l);
                return {
                    'HSB': hsbSaturation,
                    'HSL': hslSaturation
                }
            }).bind(this)();
            return [utils.normalizeHue(h), s, b, l];
        }).bind(this)();
    }

    saturation(_mode) {
        const mode = typeof _mode === 'string' ? _mode : _mode.name;
        return this.hsbl[1][mode];
    }

    withRed(red) {
        return API.rgb(red, this.green, this.blue, this.alpha)
    }

    withGreen(green) {
        return API.rgb(this.red, green, this.blue, this.alpha)
    }

    withBlue(blue) {
        return API.rgb(this.red, this.green, blue, this.alpha)
    }

    withAlpha(alpha) {
        return API.rgb(this.red, this.green, this.blue, alpha)
    }

    withHue(hue, mode = KleurMode.HSB) {
        return mode.withHue(this, hue);
    }
    withSaturation(saturation, mode = KleurMode.HSB) {
        return mode.withSaturation(this, safeValue(saturation));
    }
    withBrightness(brightness) {
        return KleurMode.HSB.withBrightness(this, safeValue(brightness));
    }
    withLightness(lightness) {
        return KleurMode.HSB.withBrightness(this, safeValue(lightness));
    }

    // Delta
    withRedDelta(delta) {
        verifyDelta(delta);
        return API.rgb(safeValue(this.red + delta), this.green, this.blue, this.alpha);
    }

    withGreenDelta(delta) {
        verifyDelta(delta);
        return API.rgb(this.red, safeValue(this.green + delta), this.blue, this.alpha);
    }

    withBlueDelta(delta) {
        verifyDelta(delta);
        return API.rgb(this.red, this.green, safeValue(this.blue + delta), this.alpha);
    }

    withAlphaDelta(delta) {
        verifyDelta(delta);
        return API.rgb(this.red, this.green, this.blue, safeValue(this.alpha + delta));
    }

    withHueDelta(delta, mode = KleurMode.HSB) {
        return this.withHue(this.hue + delta, mode)
    }

    withSaturationDelta(delta, mode = KleurMode.HSB) {
        verifyDelta(delta);
        return this.withSaturation(this.saturation(mode) + delta, mode);
    }

    withBrightnessDelta(delta) {
        verifyDelta(delta);
        return this.withBrightness(this.brightness + delta);
    }

    // Min /Max
    withMinRed(min) {
        verifyValue(min);
        return API.rgb(Math.max(min, this.red), this.green, this.blue, this.alpha);
    }

    withMaxRed(max) {
        verifyValue(max);
        return API.rgb(Math.min(max, this.red), this.green, this.blue, this.alpha);
    }

    withMinGreen(min) {
        verifyValue(min);
        return API.rgb(this.red, Math.max(min, this.green), this.blue, this.alpha);
    }

    withMaxGreen(max) {
        verifyValue(max);
        return API.rgb(this.red, Math.min(max, this.green), this.blue, this.alpha);
    }

    withMinBlue(min) {
        verifyValue(min);
        return API.rgb(this.red, this.green, Math.max(min, this.blue), this.alpha);
    }

    withMaxBlue(max) {
        verifyValue(max);
        return API.rgb(this.red, this.green, Math.min(max, this.blue), this.alpha);
    }

    withMinAlpha(min) {
        verifyValue(min);
        return API.rgb(this.red, this.green, this.blue, Math.max(min, this.alpha));
    }

    withMaxAlpha(max) {
        verifyValue(max);
        return API.rgb(this.red, this.green, this.blue, Math.min(max, this.alpha));
    }

    withMinHue(min) {
        verifyValue(min);
        return this.withHue(Math.max(this.hue, min));
    }

    withMaxHue(max) {
        verifyValue(min);
        return this.withHue(Math.min(this.hue, max));
    }

    withMinSaturation(min, mode = KleurMode.HSB) {
        verifyValue(min);
        return this.withSaturation(Math.max(this.saturation(mode), safeValue(min)), mode);
    }

    withMaxSaturation(max, mode = KleurMode.HSB) {
        verifyValue(min);
        return this.withSaturation(Math.min(this.saturation(mode), safeValue(max)), mode);
    }

    withMinBrightness(min) {
        verifyValue(min);
        return this.withBrightness(Math.max(this.brightness, safeValue(min)));
    }

    withMaxBrightness(max) {
        verifyValue(max);
        return this.withBrightness(Math.min(this.brightness, safeValue(max)));
    }

    withMinLightness(min) {
        verifyValue(min);
        return this.withLightness(Math.max(this.lightness, safeValue(min)));
    }

    withMaxLightness(max) {
        verifyValue(max);
        return this.withLightness(Math.min(this.lightness, safeValue(max)));
    }

    interpolate(end, amount, mode = KleurMode.RGB) {
        return mode.interpolate(this, end, amount);
    }

    equals(other) {
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

export default Kleur;