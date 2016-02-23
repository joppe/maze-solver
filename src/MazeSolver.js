import {Options} from './maze/Options.js';
import {MazeImage} from './maze/MazeImage.js';
import {Canvas} from './dom/Canvas.js';
import {Scanner} from './normalize/Scanner.js';
import {Matrix} from './normalize/Matrix.js';
import {Solver} from './solve/Solver.js';
import {Point} from './geometry/Point.js';
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
     * @param {Object} options
     */
    static solve(options) {
        TimerManager.start('fetch-image');

        MazeImage.fetch(options).then((image) => {
            TimerManager.end('fetch-image');

            let canvas = new Canvas(image.getWidth(), image.getHeight()),
                normalized = new Canvas(image.getWidth(), image.getHeight()),
                solution = new Canvas(image.getWidth(), image.getHeight()),
                scannerWorker;

            image.appendTo(document.body);
            canvas.appendTo(document.body);
            normalized.appendTo(document.body);
            solution.appendTo(document.body);

            canvas.drawImage(image.getElement(), new Point(0, 0));

            TimerManager.start('scan-worker');
            scannerWorker = new Worker('dist/worker.js');
            scannerWorker.addEventListener('message', (event) => {
                TimerManager.end('scan-worker');

                let raw = event.data.data.matrix,
                    matrix = Matrix.createFromRaw(raw),
                    solveWorker;

                for (let [x, y, cell] of matrix.getIterator()) {
                    normalized.drawRectangle(new Point(x, y), 1, 1, cell.isWall ? 'black' : 'white');
                }

                TimerManager.start('solve-worker');
                solveWorker = new Worker('dist/worker.js');
                solveWorker.addEventListener('message', (event) => {
                    TimerManager.end('solve-worker');

                    if (RESPONSE_TYPE_SOLVED === event.data.type) {
                        let path = Path.createFromRaw(event.data.data.path),
                            normalized = normalize(path);

                        solution.drawImage(image.getElement(), new Point(0, 0));

                        for (let [i, point] of path.getIterator()) {
                            solution.drawRectangle(point.position, point.width, point.height, 'green');
                        }

                        for (let [i, point] of normalized.getIterator()) {
                            solution.drawRectangle(point.position, point.width, point.height, 'red');
                        }
                    } else {
                        console.log('not solved');
                    }

                    for (let [id, timer] of TimerManager) {
                        console.log(id, timer.getDuration());
                    }
                });
                solveWorker.postMessage({
                    file: './solve/Worker.js',
                    className: 'Worker',
                    args: [],
                    message: {
                        type: REQUEST_TYPE_SIMPLE,
                        data: {
                            matrix: raw
                        }
                    }
                })
            }, false);
            scannerWorker.postMessage({
                file: './normalize/Worker.js',
                className: 'Worker',
                args: [],
                message: {
                    type: REQUEST_TYPE_SCAN,
                    data: {
                        imageData: canvas.getImageData(new Point(0, 0), canvas.getWidth(), canvas.getHeight()),
                        canvasSize: {
                            width: canvas.getWidth(),
                            height: canvas.getHeight()
                        },
                        options: options.raw()
                    }
                }
            });
        });
    }
}

MazeSolver.solve(new Options({}));