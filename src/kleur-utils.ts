
export class KleurUtils {
    static normalizeHue(hue : number) : number {
        if (hue < 0) {
            return hue + 360 * Math.ceil(-hue / 360.0)
        } else if (hue > 360) {
            return hue - 360 * Math.floor(hue / 360.0)
        } else {
            return hue
        }
    }
}
