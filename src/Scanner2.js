import {Matrix} from './Matrix.js';
import {Point} from './Point.js';
import {Cell} from './Cell.js';

const SCAN_CELL = 0,
    SCAN_WALL = 1;

/**
 * @class Scanner
 */
export class Scanner {
    /**
     * @param {Object} data
     */
    constructor(data) {
        this.imageData = data.imageData;
        this.width = data.width;
        this.height = data.height;
        this.cellSize = data.cellSize;
        this.wallSize = data.wallSize;
        this.options = options;
    }

    /**
     * @param {Point} point
     * @returns {boolean}
     */
    isWall(point) {
        let data = this.canvas.getImageData(point, this.options.get('mazewall'), this.options.get('mazewall'));

        for (let i = 0, n = data.length; i < n; i += 4) {
            let red = data[i],
                green = data[i + 1],
                blue = data[i + 2];

            if (this.options.get('wallr') !== red || this.options.get('wallg') !== green || this.options.get('wallb') !== blue) {
                return false;
            }
        }

        return true;
    }

    /**
     * @returns {Matrix}
     */
    scan() {
        let y = 0,
            yScanMode = SCAN_CELL,
            matrix = new Matrix();

        while (y < this.height) {
            let x = 0,
                height = (yScanMode === SCAN_CELL ? this.cellSize : this.wallSize),
                xScanMode = SCAN_CELL;

            while (x < this.width) {
                let width = (xScanMode === SCAN_CELL ? this.cellSize : this.wallSize),
                    position = new Point(x, y);

                matrix.add(x, y, new Cell(
                    position,
                    width,
                    height,
                    this.isWall(position)
                ));

                x += width;

                xScanMode = SCAN_CELL === xScanMode ? SCAN_WALL : SCAN_CELL;
            }

            y += height;

            yScanMode = SCAN_CELL === yScanMode ? SCAN_WALL : SCAN_CELL;
        }

        return matrix;
    }
}