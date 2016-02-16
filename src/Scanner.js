import {Matrix} from './Matrix.js';

const SCAN_HORIZONTAL = 0,
    SCAN_VERTICAL = 1;

export class Scanner {
    /**
     * Scan horizontal line/vertical line/horizontal line ...
     *
     * @param {Canvas} canvas
     * @param {Options} options
     */
    constructor(canvas, options) {
        this.canvas = canvas;
        this.options = options;
    }

    /**
     * @param {number} x
     * @param {number} y
     * @returns {boolean}
     */
    isWall(x, y) {
        let data = this.canvas.getImageData(x, y, this.options.get('mazewall'), this.options.get('mazewall'));

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

    scan() {
        let y = this.options.get('mazecell'),
            scanMode = SCAN_HORIZONTAL,
            matrix = new Matrix();

        while (y < this.canvas.getHeight()) {
            let x = this.options.get('mazecell');

            while (x < this.canvas.getWidth()) {
                matrix.add(x, y, this.isWall(x, y));
                x += this.options.get('mazecell') + this.options.get('mazewall');
            }

            y += this.options.get('mazecell') + this.options.get('mazewall');

            scanMode = (scanMode + 1) % 2;
        }

        return matrix;
    }
}