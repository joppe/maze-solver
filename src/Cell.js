/**
 * @class Cell
 */
export class Cell {
    /**
     * @param {Point} position
     * @param {number} width
     * @param {number} height
     * @param {boolean} isWall
     */
    constructor(position, width, height, isWall) {
        this.position = position;
        this.width = width;
        this.height = height;
        this.isWall = isWall;
    }

    /**
     * @returns {string}
     */
    toString() {
        return `normalized: ${this.normalizedPosition.toString()}; position: ${this.position.toString()}; width: ${this.width}; height: ${this.height}; isWall: ${this.isWall}`;
    }
}