/**
 * @class Path
 */
export class Path {
    /**
     * @param {Array} points
     * @param {boolean} isComplete
     */
    constructor(points = [], isComplete = false) {
        this.points = points;
        this.isComplete = isComplete;
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
     * @returns {{points: Array, isComplete: (boolean|*)}}
     */
    raw() {
        return {
            points: this.points,
            isComplete: this.isComplete
        };
    }

    /**
     * @param {Object} raw
     * @returns {Path}
     */
    static createFromRaw(raw) {
        return new Path(raw.points, raw.isComplete);
    }
}