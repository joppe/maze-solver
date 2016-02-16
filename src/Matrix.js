export class Matrix {
    constructor() {
        this.cells = {};
    }

    add(x, y, value) {
        if (undefined === this.cells[x]) {
            this.cells[x] = {};
        }

        this.cells[x][y] = value;
    }
}