import {Options} from './maze/Options.js';
import {MazeImage} from './maze/MazeImage.js';
import {Canvas} from './dom/Canvas.js';
import {Scanner} from './normalize/Scanner.js';
import {Matrix} from './normalize/Matrix.js';
import {Solver} from './solve/Solver.js';
import {Point} from './geometry/Point.js';
import {Vector} from './geometry/Vector.js';
import {Path} from './solve/Path.js';
import {Manager as TimerManager} from './timer/Manager.js';
import {REQUEST_TYPE_SCAN} from './normalize/Worker.js';
import {REQUEST_TYPE_SIMPLE,RESPONSE_TYPE_SOLVED} from './solve/Worker.js';
import {normalize} from './solve/Normalize.js';

/**
 * get image
 * draw image
 * scan image (normalize)
 * solve
 * draw solution
 */

/**
 * @class MazeSolver
 */
class MazeSolver {
    /**
     * @param {MazeImage} image
     * @param {Options} options
     */
    constructor(image, options) {
        this.image = image;
        this.options = options;

        this.canvas = this.createCanvas();
    }

    simple() {
        let scanner = this.scan();

        this.canvas.appendTo(document.body);

        scanner.then((rawMatrix) => {
            let matrix = Matrix.createFromRaw(rawMatrix),
                solver = this.solve(matrix, new Point(1, 0), new Vector(1, 0));

            this.drawNormalized(rawMatrix);

            solver.then((data) => {
                if (RESPONSE_TYPE_SOLVED === data.type) {
                    let path = Path.createFromRaw(data.data.path),
                        normalized = normalize(path),
                        solution = new Canvas(this.image.getWidth(), this.image.getHeight());

                    solution.drawImage(this.image.getElement(), new Point(0, 0));
                    solution.appendTo(document.body);

                    this.drawPath(path, solution, 'green');
                    this.drawPath(normalized, solution, 'red');
                } else {
                    console.log('not solved');
                }
            });
        });
    }

    solve(matrix, start, direction) {
        return new Promise((resolve) => {
            let solver = new Worker('dist/worker.js');

            solver.addEventListener('message', (event) => {
                resolve(event.data);
            });
            solver.postMessage({
                file: './solve/Worker.js',
                className: 'Worker',
                args: [],
                message: {
                    type: REQUEST_TYPE_SIMPLE,
                    data: {
                        matrix: matrix.raw(),
                        start: start.raw(),
                        direction: direction.raw()
                    }
                }
            })
        });
    }

    /**
     * @returns {Promise}
     */
    scan() {
        return new Promise((resolve) => {
            let scanner = new Worker('dist/worker.js');

            scanner.addEventListener('message', (event) => {
                resolve(event.data.data.matrix);
            });
            scanner.postMessage({
                file: './normalize/Worker.js',
                className: 'Worker',
                args: [],
                message: {
                    type: REQUEST_TYPE_SCAN,
                    data: {
                        imageData: this.canvas.getImageData(new Point(0, 0), this.canvas.getWidth(), this.canvas.getHeight()),
                        canvasSize: {
                            width: this.canvas.getWidth(),
                            height: this.canvas.getHeight()
                        },
                        options: this.options.raw()
                    }
                }
            });
        });
    }

    /**
     * @param {Object} raw
     */
    drawNormalized(raw) {
        let canvas = new Canvas(this.image.getWidth(), this.image.getHeight()),
            matrix = Matrix.createFromRaw(raw);

        for (let [x, y, cell] of matrix.getIterator()) {
            canvas.drawRectangle(new Point(x, y), 1, 1, cell.isWall ? 'black' : 'white');
        }

        canvas.appendTo(document.body);
    }

    /**
     * @param {Path} path
     * @param {Canvas} canvas
     * @param {string} color
     */
    drawPath(path, canvas, color) {
        for (let [i, point] of path.getIterator()) {
            canvas.drawRectangle(point.position, point.width, point.height, color);
        }
    }

    /**
     * @returns {Canvas}
     */
    createCanvas() {
        let canvas = new Canvas(this.image.getWidth(), this.image.getHeight());

        canvas.drawImage(this.image.getElement(), new Point(0, 0));

        return canvas;

    }

    /**
     * @param {Options} options
     * @returns {Promise}
     */
    static create(options) {
        return new Promise((resolve, reject) => {
            MazeImage.fetch(options).then((image) => {
                resolve(new MazeSolver(image, options));
            }).catch(reject);
        });
    }
}

export function solveMazeSimple(options = {}) {
    MazeSolver.create(new Options(options)).then((solver) => {
        solver.simple();
    });
}

solveMazeSimple({});