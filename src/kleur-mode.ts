import {RGB} from "./rgb";
import {HSL} from "./hsl";
import {HSB} from "./hsb";

export type KleurMode = typeof RGB | typeof HSB | typeof HSL;

export const rand = function (range: Range) {
    return range.min + ((range.max - range.min) * Math.random());
};
export type Range = {
    min: number;
    max: number;
}
export const DEFAULT_RANGE: Range = {min: 0, max: 1};

export type WithSaturation = typeof HSB | typeof HSL;
