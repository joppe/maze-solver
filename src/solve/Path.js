/**
 * @class Path
 */
export class Path {
    constructor() {
        this.points = [];
    }

    /**
     * @param {Cell} cell
     * @returns {Path}
     */
    add(cell) {
        this.points.push(cell);

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

        this.points.forEach((cell) => {
            str += cell.toString() + "\n";
        });

        return str;
    }
}