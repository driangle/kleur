
class KleurPalette {

    constructor(colors) {
        if (!colors || colors.length === 0) {
            throw '[colors]] cannot be empty';
        }
        this.colors = colors;
    }

    at(index) {
        return this.colors[index];
    }

    contains(colors) {
        return !!this.colors.find(c => c.equals(color));
    }

    size() {
        return this.colors.length;
    }

    iterator() {
        return this.colors.iterator();
    }

    factory() {
        return this.colors.ring();
    }

    map(transform) {
        return new KleurPalette(this.colors.map(transform));
    }

    filter(predicate) {
        return new KleurPalette(this.colors.filter(predicate));
    }

    distinct() {
        return new KleurPalette(this.colors.distinct((a, b) => a.equals(b)))
    }

    shuffle() {
        return new KleurPalette(this.colors.shuffle());
    }

    reverse() {
        return new KleurPalette(this.colors.rev());
    }

    rotate(amount) {
        const offset = Math.abs(amount) % this.colors.length;
        const parts = (amount >= 0) ? (
            [this.colors.takeRight(offset), this.colors.take(this.colors.length - offset)]
        ) : (
            [this.colors.takeRight(this.colors.length - offset), this.colors.take(offset)]
        );
        const left = parts[0];
        const right = parts[1];
        return new KleurPalette(left.concat(right));
    }
    add(color) {
        return new KleurPalette(this.colors.concat([color]));
    }
    // TODO: bind "this" so that instance methods can be used in detached mode, ie: palette.head.map(c => c.red))
    head() {
        return this.colors.head();
    }
    last() {
        return this.colors.last();
    }
    init() {
        return new KleurPalette(this.colors.init());
    }
    tail() {
        return new KleurPalette(this.colors.tail());
    }
    take(count) {
        return new KleurPalette(this.colors.take(count));
    }
    takeRight(count) {
        return new KleurPalette(this.colors.takeRight(count));
    }
}


export default KleurPalette;