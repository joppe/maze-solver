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
     * @returns {Object}
     */
    * getIterator() {
        for (let point of this.points) {
            yield point;
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