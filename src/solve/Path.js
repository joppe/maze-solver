/**
 * @class Path
 */
export class Path {
    constructor() {
        this.points = [];
    }

    /**
     * @param {Object} point
     * @returns {Path}
     */
    add(point) {
        this.points.push(point);

        return this;
    }

    /**
     * @returns {Array}
     */
    * getIterator() {
        for (let i = 0; i < this.points.length; i += 1) {
            yield [i, this.points[i]];
        }
    }

    /**
     * @returns {Array}
     */
    raw() {
        return this.points;
    }

    /**
     * @param {Array} points
     * @returns {Path}
     */
    static createFromRaw(points) {
        let path = new Path();

        path.points = points;

        return path;
    }
}