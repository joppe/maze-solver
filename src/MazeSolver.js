import {Options} from './maze/Options.js';
import {MazeImage} from './maze/MazeImage.js';
import {Canvas} from './dom/Canvas.js';
import {Scanner} from './normalize/Scanner.js';
import {Matrix} from './normalize/Matrix.js';
import {Solver} from './solve/Solver.js';
import {Point} from './geometry/Point.js';
import {Manager as TimerManager} from './timer/Manager.js';
import {REQUEST_TYPE_SCAN} from './normalize/Worker.js';
import {REQUEST_TYPE_SIMPLE} from './solve/Worker.js';

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

                solveWorker = new Worker('dist/worker.js');
                solveWorker.addEventListener('message', (event) => {
                    console.log('solved', event);
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
            /*/
            for (let [col, row, value] of matrix.getIterator()) {
                console.log(col, row, value.isWall);
            }
            /**/

            /*/ Display timers
            for (let [id, timer] of TimerManager) {
                console.log(id, timer.getDuration());
            }
            /**/

            /*/
            solver = new Solver(matrix);
            path = solver.simple();

            solution.drawImage(image.getElement(), new Point(0, 0));
            path.iterate((cell) => {
                solution.drawRectangle(cell.position, cell.width, cell.height, 'green');
            });
            /**/
        });
    }
}

MazeSolver.solve(new Options({
    mazewidth: 5,
    mazehight: 5
}));