export class Path {
    constructor() {
        this.points = [];
    }

    add(point) {
        this.points.push(point);

        return this;
    }
}