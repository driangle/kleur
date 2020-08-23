import {Kleur} from "./kleur";
import {KleurUtils} from "./kleur-utils";
import {DEFAULT_RANGE, rand, Range} from "./kleur-mode";

export type HSLRandomConfig = {
    hue?: Range;
    saturation?: Range;
    lightness?: Range;
    alpha?: Range;
};
const DEFAULT_HSL_RANDOM_CONFIG: HSLRandomConfig = {
    hue: {
        min: 0,
        max: 360
    },
    saturation: DEFAULT_RANGE,
    lightness: DEFAULT_RANGE,
    alpha: DEFAULT_RANGE
};
export const HSL = {
    name: 'HSL',
    create(hue: number, saturation: number, lightness: number, alpha: number = 1): Kleur {
        // https://en.wikipedia.org/wiki/HSL_and_HSV#HSL_to_RGB
        const c = (1 - Math.abs(2 * lightness - 1)) * saturation;
        const h = KleurUtils.normalizeHue(hue) / 60;
        const x = c * (1 - Math.abs((h % 2) - 1));
        const m = lightness - c / 2;
        const rgb = function () {
            if (0 <= h && h <= 1) {
                return [c, x, 0];
            } else if (1 <= h && h <= 2) {
                return [x, c, 0];
            } else if (2 <= h && h <= 3) {
                return [0, c, x];
            } else if (3 <= h && h <= 4) {
                return [0, x, c];
            } else if (4 <= h && h <= 5) {
                return [x, 0, c];
            } else if (5 <= h && h <= 6) {
                return [c, 0, x];
            }
        }();
        const r = rgb[0];
        const g = rgb[1];
        const b = rgb[2];
        return new Kleur(r + m, g + m, b + m, alpha)
    },

    random(config: HSLRandomConfig = DEFAULT_HSL_RANDOM_CONFIG): Kleur {
        return HSL.create(
            rand({...DEFAULT_HSL_RANDOM_CONFIG.hue, ...config.hue}),
            rand({...DEFAULT_HSL_RANDOM_CONFIG.saturation, ...config.saturation}),
            rand({...DEFAULT_HSL_RANDOM_CONFIG.lightness, ...config.lightness}),
            rand({...DEFAULT_HSL_RANDOM_CONFIG.alpha, ...config.alpha})
        );
    },

    randomize(color: Kleur, strength: number): Kleur {
        return color
            .withHueDelta(rand({min: -360, max: 360}) * strength)
            .withSaturationDelta(rand({min: -1, max: 1}) * strength, HSL)
            .withLightnessDelta(rand({min: -1, max: 1}) * strength);
    },

    interpolate(start: Kleur, end: Kleur, amount: number): Kleur {
        return this.create(
            start.hue + (end.hue - start.hue) * amount,
            start.saturation(HSL) + (end.saturation(HSL) - start.saturation(HSL)) * amount,
            start.lightness + (end.lightness - start.lightness) * amount,
            start.alpha + (end.alpha - start.alpha) * amount
        );
    },

    withHue(color: Kleur, hue: number) {
        const saturation = color.saturation(HSL);
        return HSL.create(hue, saturation, color.lightness, color.alpha);
    },

    withSaturation(color: Kleur, saturation: number) {
        return HSL.create(color.hue, saturation, color.lightness, color.alpha);
    },

    withLightness(color: Kleur, lightness: number) {
        const saturation = color.saturation(this.name);
        return HSL.create(color.hue, saturation, lightness, color.alpha);
    }
};
