import {Kleur} from "./kleur";
import {KleurUtils} from "./kleur-utils";
import {DEFAULT_RANGE, rand, Range} from "./kleur-mode";

export type HSBRandomConfig = {
    hue: Range;
    saturation: Range;
    brightness: Range;
    alpha: Range;
};
const DEFAULT_HSB_RANDOM_CONFIG : HSBRandomConfig = {
    hue: {
        min: 0,
        max: 360
    },
    saturation: DEFAULT_RANGE,
    brightness: DEFAULT_RANGE,
    alpha: DEFAULT_RANGE
};
export const HSB = {
    name: 'HSB',
    create(hue: number, saturation: number, brightness: number, alpha: number = 1): Kleur {
        // https://en.wikipedia.org/wiki/HSL_and_HSV#HSV_to_RGB_alternative
        const f = (n: number): number => {
            const k = (n + KleurUtils.normalizeHue(hue) / 60.0) % 6;
            const min = [k, 4 - k, 1].sort()[0];
            return brightness - (brightness * saturation * Math.max(min, 0));
        };
        return new Kleur(f(5), f(3), f(1), alpha);
    },
    interpolate(start: Kleur, end: Kleur, amount: number) {
        return HSB.create(
            start.hue + (end.hue - start.hue) * amount,
            start.saturation(HSB) + (end.saturation(HSB) - start.saturation(HSB)) * amount,
            start.brightness + (end.brightness - start.brightness) * amount,
            start.alpha + (end.alpha - start.alpha) * amount
        );
    },
    random(config: HSBRandomConfig = DEFAULT_HSB_RANDOM_CONFIG) {
        return HSB.create(
            rand(config.hue),
            rand(config.saturation),
            rand(config.brightness),
            rand(config.alpha)
        );
    },
    withHue(color: Kleur, hue: number) {
        const saturation = color.saturation(HSB);
        return this.create(hue, saturation, color.brightness, color.alpha);
    },

    withSaturation(color: Kleur, saturation: number) {
        return this.create(color.hue, saturation, color.brightness, color.alpha);
    },
    withBrightness(color: Kleur, brightness: number) {
        const saturation = color.saturation(HSB);
        return this.create(color.hue, saturation, brightness, color.alpha);
    }
};
