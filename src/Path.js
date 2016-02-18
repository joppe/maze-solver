/**
 * @class Path
 */
export class Path {
    constructor() {
        this.points = [];
    }

    /**
     * @param {Point} point
     * @returns {Path}
     */
    add(point) {
        this.points.push(point);

        return this;
    }

    /**
     * @param {Function} callback
     */
    iterate(callback) {
        this.points.forEach(callback);
    }

    /**
     * @returns {string}
     */
    toString() {
        let str = '';

        this.points.forEach((point) => {
            str += point.toString() + "\n";
        });

        return str;
    }
}