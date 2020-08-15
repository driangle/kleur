import utils from './kleur-utils';
import Kleur from './kleur-class';

const rand = function(min, max) {
    return min + ((max - min) * Math.random());
};
const RGB = {
    'name': 'RGB',
    'create': function (r, g, b, a) {
        return new Kleur(r, g, b, a);
    },
    'interpolate': function (start, end, amount) {
        return new Kleur(
            start.red + (end.red - start.red) * amount,
            start.green + (end.green - start.green) * amount,
            start.blue + (end.blue - start.blue) * amount,
            start.alpha + (end.alpha - start.alpha) * amount
        );
    },
    'random': function(config) {
        const red = Object.assign({'min': 0, 'max': 1}, config.red);
        const green = Object.assign({'min': 0, 'max': 1}, config.green);
        const blue = Object.assign({'min': 0, 'max': 1}, config.blue);
        const alpha = Object.assign({'min': 1, 'max': 1}, config.alpha);
        return _create(
            rand(red.min, red.max),
            rand(green.min, green.max),
            rand(blue.min, blue.max),
            rand(alpha.min, alpha.max)
        );
    }
};

const HSB = function () {
    const _create = function (hue, saturation, brightness, alpha) {
        // https://en.wikipedia.org/wiki/HSL_and_HSV#HSV_to_RGB_alternative
        const f = n => {
            const k = (n + utils.normalizeHue(hue) / 60.0) % 6;
            const min = [k, 4 - k, 1].sort()[0];
            return brightness - (brightness * saturation * Math.max(min, 0));
        };
        return new Kleur(f(5), f(3), f(1), alpha);
    };
    return {
        'name': 'HSB',
        'create': _create,
        'interpolate': function (start, end, amount) {
            return _create(
                start.hue + (end.hue - start.hue) * amount,
                start.saturation('HSB') + (end.saturation('HSB') - start.saturation('HSB')) * amount,
                start.brightness + (end.brightness - start.brightness) * amount,
                start.alpha + (end.alpha - start.alpha) * amount
            );
        },
        'withHue': function (color, hue) {
            const saturation = color.saturation('HSB');
            return _create(hue, saturation, color.brightness, color.alpha);
        },
        'withSaturation': function (color, saturation) {
            return _create(color.hue, saturation, color.brightness, color.alpha);
        },
        'withBrightness': function (color, brightness) {
            const saturation = color.saturation('HSB');
            return _create(color.hue, saturation, brightness, color.alpha);
        },
        'random': function(config) {
            const hue = Object.assign({'min': 0, 'max': 360}, config.hue);
            const saturation = Object.assign({'min': 0, 'max': 1}, config.saturation);
            const brightness = Object.assign({'min': 0, 'max': 1}, config.brightness);
            const alpha = Object.assign({'min': 1, 'max': 1}, config.alpha);
            return _create(
                rand(hue.min, hue.max),
                rand(saturation.min, saturation.max),
                rand(brightness.min, brightness.max),
                rand(alpha.min, alpha.max)
            );
        }
    };
}();
const HSL = function () {
    const _create = function (hue, saturation, lightness, alpha) {
        // https://en.wikipedia.org/wiki/HSL_and_HSV#HSL_to_RGB
        const c = (1 - Math.abs(2 * lightness - 1)) * saturation;
        const h = utils.normalizeHue(hue) / 60;
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
        new Kleur(r + m, g + m, b + m, alpha)
    };
    return {
        'name': 'HSL',
        'create': _create,
        'interpolate': function (start, end, amount) {
            return _create(
                start.hue + (end.hue - start.hue) * amount,
                start.saturation('HSL') + (end.saturation('HSL') - start.saturation('HSL')) * amount,
                start.lightness + (end.lightness - start.lightness) * amount,
                start.alpha + (end.alpha - start.alpha) * amount
            );
        },
        'withHue': function (color, hue) {
            const saturation = color.saturation('HSL');
            return _create(hue, saturation, color.lightness, color.alpha);
        },
        'withSaturation': function (color, saturation) {
            return _create(color.hue, saturation, color.lightness, color.alpha);
        },
        'withLightness': function (color, lightness) {
            const saturation = color.saturation('HSL');
            return _create(color.hue, saturation, lightness, color.alpha);
        },
        'random': function(config) {
            const hue = Object.assign({'min': 0, 'max': 360}, config.hue);
            const saturation = Object.assign({'min': 0, 'max': 1}, config.saturation);
            const lightness = Object.assign({'min': 0, 'max': 1}, config.lightness);
            const alpha = Object.assign({'min': 1, 'max': 1}, config.alpha);
            return _create(
                rand(hue.min, hue.max),
                rand(saturation.min, saturation.max),
                rand(lightness.min, lightness.max),
                rand(alpha.min, alpha.max)
            );
        }
    };
}();

export default {
    'RGB': RGB,
    'HSB': HSB,
    'HSL': HSL
};