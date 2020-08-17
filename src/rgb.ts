import {Kleur} from "./kleur";
import {DEFAULT_RANGE, rand, Range} from "./kleur-mode";

export type RGBRandomConfig = {
    red: Range,
    green: Range,
    blue: Range,
    alpha: Range
};
const DEFAULT_RGB_RANDOM_CONFIG = {
    red: DEFAULT_RANGE,
    green: DEFAULT_RANGE,
    blue: DEFAULT_RANGE,
    alpha: DEFAULT_RANGE
};
export const RGB = {
    name: 'RGB',
    create(red: number, green: number, blue: number, alpha: number = 1): Kleur {
        return new Kleur(red, green, blue, alpha);
    },

    random(config: RGBRandomConfig = DEFAULT_RGB_RANDOM_CONFIG): Kleur {
        return new Kleur(
            rand(config.red),
            rand(config.green),
            rand(config.blue),
            rand(config.alpha)
        );
    },

    interpolate(start: Kleur, end: Kleur, amount: number): Kleur {
        return new Kleur(
            start.red + (end.red - start.red) * amount,
            start.green + (end.green - start.green) * amount,
            start.blue + (end.blue - start.blue) * amount,
            start.alpha + (end.alpha - start.alpha) * amount
        );
    }
};
