import Kleur from './kleur-class';
import KleurMode from './kleur-mode';
import KleurPalette from './kleur-palette';

const API = {
    'BLACK': new Kleur(0, 0, 0),
    'WHITE': new Kleur(1, 1, 1),
    'RED': new Kleur(1, 0, 0),
    'GREEN': new Kleur(0, 1, 0),
    'BLUE': new Kleur(0, 0, 1),
    'TEAL': new Kleur(0, 1, 1),
    'YELLOW': new Kleur(1, 1, 0),
    'PURPLE': new Kleur(1, 0, 1),
    'random': function (config) {
        if (typeof config === 'object' && typeof config.mode !== 'undefined') {
            const mode = KleurMode[config.mode.toUpperCase()];
            if (!mode) {
                throw "Unexpected Kleur mode [" + mode + "]";
            } else {
                return mode.random(config);
            }
        } else {
            return new Kleur(Math.random(), Math.random(), Math.random(), 1);
        }
    },
    'rgb': function (r, g, b, a) {
        return new Kleur(r, g, b, a);
    },
    'hsb': function(h, s, b, a) {
        return KleurMode.HSB.create(h, s, b, a);
    },
    'hsl': function(h, s, l, a) {
        return KleurMode.HSL.create(h, s, l, a);
    },
    'hex': function(hex) {
        const red = (hex & 0xff0000) >> 16;
        const green = (hex & 0x00ff00) >> 8;
        const blue = hex & 0x0000ff;
        return new Kleur(red / 255.0, green / 255.0, blue / 255.0)

    },
    'palette': {
        'group': function (colors) {
            return new KleurPalette(colors);
        },
        'fromRoot': function (size, root, factory) {
            const colors = [root];
            for (let i = 1; i < size; i++) {
                colors.push(factory(root, i));
            }
            return new KleurPalette(colors);
        },
        'fromRelative': function (size, _root, factory) {
            const root = Function.ensureIsFunction(_root)();
            const colors = [root];
            for (let i = 1; i < size; i++) {
                const last = colors[i - 1];
                colors.push(factory(last, i));
            }
            return new KleurPalette(colors);
        },
        'random': function (size) {
            const colors = [];
            for (let i = 0; i < size; i++) {
                colors.push(API.random());
            }
            return new KleurPalette(colors);
        },
        'constant': function(color) {
            return new Kleur([color]);
        }
    }
};
export default API;