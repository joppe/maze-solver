import {Matrix} from './Matrix.js';
import {Point} from './Point.js';

const SCAN_CELL = 0,
    SCAN_WALL = 1;

export class Scanner {
    /**
     * @param {Canvas} canvas
     * @param {Options} options
     */
    constructor(canvas, options) {
        this.canvas = canvas;
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

        while (y < this.canvas.getHeight()) {
            let x = 0,
                xScanMode = SCAN_CELL;

            while (x < this.canvas.getWidth()) {
                matrix.add(x, y, this.isWall(new Point(x, y)));

                x += (xScanMode === SCAN_CELL ? this.options.get('mazecell') : this.options.get('mazewall'));

                xScanMode = SCAN_CELL === xScanMode ? SCAN_WALL : SCAN_CELL;
            }

            y += (yScanMode === SCAN_CELL ? this.options.get('mazecell') : this.options.get('mazewall'));

            yScanMode = SCAN_CELL === yScanMode ? SCAN_WALL : SCAN_CELL;
        }

        return matrix;
    }
}