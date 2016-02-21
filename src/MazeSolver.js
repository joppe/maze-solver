import {Options} from './maze/Options.js';
import {MazeImage} from './maze/MazeImage.js';
import {Canvas} from './dom/Canvas.js';
import {Scanner} from './normalize/Scanner.js';
import {Solver} from './solve/Solver.js';
import {Point} from './geometry/Point.js';
import {Manager as TimerManager} from './timer/Manager.js';

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
                scanner,
                matrix,
                normalized = new Canvas(image.getWidth(), image.getHeight()),
                solution = new Canvas(image.getWidth(), image.getHeight()),
                solver,
                path;

            image.appendTo(document.body);
            canvas.appendTo(document.body);
            normalized.appendTo(document.body);
            solution.appendTo(document.body);

            canvas.drawImage(image.getElement(), new Point(0, 0));

            scanner = new Scanner(canvas.getImageData(new Point(0, 0), canvas.getWidth(), canvas.getHeight()), {
                width: canvas.getWidth(),
                height: canvas.getHeight()
            }, options);
            TimerManager.start('scan');
            matrix = scanner.scan();
            TimerManager.end('scan');

            for (let [col, row, value] of matrix.getIterator()) {
                console.log(col, row, value.isWall);
            }

            // Display timers
            for (let [id, timer] of TimerManager) {
                console.log(id, timer.getDuration());
            }

            /*/
            matrix = scanner.scan();

            matrix.iterate((x, y, cell) => {
                normalized.drawRectangle(new Point(x, y), 1, 1, cell.isWall ? 'black' : 'white');
            });

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