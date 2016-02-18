/**
 * @class Matrix
 */
export class Matrix {
    constructor() {
        this.cells = {};
        this.yCount = 0;
        this.xCount = 0;
        this.x = {};
        this.y = {};
    }

    /**
     * @param {*} val
     * @returns {number}
     */
    normalizeX(val) {
        if (undefined === this.x[val]) {
            this.x[val] = this.xCount;
            this.xCount += 1;
        }

        return this.x[val];
    }

    /**
     * @param {*} val
     * @returns {number}
     */
    normalizeY(val) {
        if (undefined === this.y[val]) {
            this.y[val] = this.yCount;
            this.yCount += 1;
        }

        return this.y[val];
    }

    /**
     * @param {number} x
     * @param {number} y
     * @param {*} value
     * @returns {Matrix}
     */
    add(x, y, value) {
        x = this.normalizeX(x);
        y = this.normalizeY(y);

        if (undefined === this.cells[x]) {
            this.cells[x] = {};
        }

        this.cells[x][y] = value;

        return this;
    }

    /**
     * @param {number} x
     * @param {number} y
     * @returns {*}
     */
    get(x, y) {
        if (this.isValid(x, y)) {
            return this.cells[x][y];
        }

        throw `Cell not found for x=${x} and y=${y}`;
    }

    /**
     * @param {number} x
     * @param {number} y
     * @returns {boolean}
     */
    isValid(x, y) {
        return (undefined !== this.cells[x] && undefined !== this.cells[x][y]);
    }

    /**
     * @param {Function} callback
     */
    iterate(callback) {
        for (let x in this.cells) {
            if (this.cells.hasOwnProperty(x)) {
                for (let y in this.cells[x]) {
                    if (this.cells[x].hasOwnProperty(y)) {
                        callback(x, y, this.cells[x][y]);
                    }
                }
            }
        }
    }

    /**
     * @returns {{width: number, height: number}}
     */
    getSize() {
        return {
            width: this.xCount,
            height: this.yCount
        }
    }

    /**
     * @returns {string}
     */
    toString() {
        let str = '';

        this.iterate((x, y, value) => {
            str += `x: ${x}, y: ${y}, value: ${value}` + "\n";
        });

        return str;
    }
}