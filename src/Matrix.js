/**
 * @class Matrix
 */
export class Matrix {
    constructor() {
        this.cells = {};
        this.rowCount = 0;
        this.columnCount = 0;
        this.columns = {};
        this.rows = {};
    }

    /**
     * @param {*} column
     * @returns {number}
     */
    normalizeColumn(column) {
        if (undefined === this.columns[column]) {
            this.columns[column] = this.columnCount;
            this.columnCount += 1;
        }

        return this.columns[column];
    }

    /**
     * @param {*} row
     * @returns {number}
     */
    normalizeRow(row) {
        if (undefined === this.rows[row]) {
            this.rows[row] = this.rowCount;
            this.rowCount += 1;
        }

        return this.rows[row];
    }

    /**
     * @param {number} column
     * @param {number} row
     * @param {Cell} cell
     * @returns {Matrix}
     */
    add(column, row, cell) {
        column = this.normalizeColumn(column);
        row = this.normalizeRow(row);

        if (undefined === this.cells[column]) {
            this.cells[column] = {};
        }

        this.cells[column][row] = cell;

        return this;
    }

    /**
     * @param {number} column
     * @param {number} row
     * @returns {Cell}
     */
    get(column, row) {
        if (this.isValid(column, row)) {
            return this.cells[column][row];
        }

        throw `Cell not found for column=${column} and row=${row}`;
    }

    /**
     * @param {number} column
     * @param {number} row
     * @returns {boolean}
     */
    isValid(column, row) {
        return (undefined !== this.cells[column] && undefined !== this.cells[column][row]);
    }

    /**
     * @param {Function} callback
     */
    iterate(callback) {
        for (let column in this.cells) {
            if (this.cells.hasOwnProperty(column)) {
                for (let row in this.cells[column]) {
                    if (this.cells[column].hasOwnProperty(row)) {
                        callback(column, row, this.cells[column][row]);
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
            width: this.columnCount,
            height: this.rowCount
        }
    }

    /**
     * @returns {string}
     */
    toString() {
        let str = '';

        this.iterate((column, row, cell) => {
            str += `column: ${column}, row: ${row}, cell: ${cell.toString()}` + "\n";
        });

        return str;
    }
}