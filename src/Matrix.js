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
    getXIndex(val) {
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
    getYIndex(val) {
        if (undefined === this.y[val]) {
            this.y[val] = this.yCount;
            this.yCount += 1;
        }

        return this.y[val];
    }

    /**
     * @param {number} a
     * @param {number} b
     * @param {*} value
     * @returns {Matrix}
     */
    add(a, b, value) {
        let x = this.getXIndex(a),
            y = this.getYIndex(b);

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
        if (undefined === this.cells[x] || undefined === this.cells[x][y]) {
            throw `Cell not found for x=${x} and y=${y}`;
        }

        return this.cells[x][y];
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