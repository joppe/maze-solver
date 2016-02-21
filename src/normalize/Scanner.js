import {Matrix} from './Matrix.js';
import {Point} from './../geometry/Point.js';
import {Options} from './../maze/Options.js';

const SCAN_CELL = 0,
    SCAN_WALL = 1;

/**
 * @class Scanner
 */
export class Scanner {
    /**
     * @param {CanvasPixelArray} imageData
     * @param {{width: number, height: number}} canvasSize
     * @param {Object} options
     */
    constructor(imageData, canvasSize, options) {
        this.imageData = imageData;
        this.canvasSize = canvasSize;
        this.options = new Options(options);
    }

    /**
     * @param {Point} point
     * @returns {boolean}
     */
    isWall(point) {
        for (let column = point.x; column < (point.x + this.options.get('mazewall')); column += 1) {
            for (let row = point.y; row < (point.y + this.options.get('mazewall')); row += 1) {
                let index = (row * (this.canvasSize.width * 4 )) + (column * 4),
                    red = this.imageData[index],
                    green = this.imageData[index + 1],
                    blue = this.imageData[index + 2];

                if (this.options.get('wallr') !== red || this.options.get('wallg') !== green || this.options.get('wallb') !== blue) {
                    return false;
                }
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

        while (y < this.canvasSize.height) {
            let x = 0,
                height = (yScanMode === SCAN_CELL ? this.options.get('mazecell') : this.options.get('mazewall')),
                xScanMode = SCAN_CELL;

            while (x < this.canvasSize.width) {
                let width = (xScanMode === SCAN_CELL ? this.options.get('mazecell') : this.options.get('mazewall')),
                    position = new Point(x, y);

                matrix.add(x, y, {
                    position,
                    width,
                    height,
                    isWall: this.isWall(position)
                });

                x += width;

                xScanMode = SCAN_CELL === xScanMode ? SCAN_WALL : SCAN_CELL;
            }

            y += height;

            yScanMode = SCAN_CELL === yScanMode ? SCAN_WALL : SCAN_CELL;
        }

        return matrix;
    }
}