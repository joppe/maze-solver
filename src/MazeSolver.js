import {Options} from './Options.js';
import {MazeImage} from './MazeImage.js';
import {Canvas} from './dom/Canvas.js';
import {Scanner} from './normalize/Scanner.js';
import {Solver} from './Solver.js';
import {Point} from './geometry/Point.js';

/**
 * @class MazeSolver
 */
class MazeSolver {
    /**
     * @param {Object} options
     */
    static solve(options) {
        MazeImage.fetch(options).then((image) => {
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

            scanner = new Scanner(canvas, options);
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
        });
    }
}

MazeSolver.solve(new Options());