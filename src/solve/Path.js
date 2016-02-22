/**
 * @class Path
 */
export class Path {
    constructor() {
        this.points = [];
    }

    /**
     * @param {Object} cell
     * @returns {Path}
     */
    add(cell) {
        this.points.push(cell);

        return this;
    }

    /**
     * @returns {Object}
     */
    * getIterator() {
        for (let cell of this.points) {
            yield cell;
        }
    }

    /**
     * @returns {Array}
     */
    raw() {
        return this.points;
    }
}