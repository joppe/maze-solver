import {Options} from './Options.js';
import {MazeImage} from './MazeImage.js';
import {Canvas} from './Canvas.js';
import {Scanner} from './Scanner.js';
import {Solver} from './Solver.js';
import {Point} from './Point.js';

class MazeSolver {
    static solve(options) {
        MazeImage.fetch(options).then((image) => {
            let canvas = new Canvas(image.getWidth(), image.getHeight()),
                scanner,
                matrix,
                normalized = new Canvas(image.getWidth(), image.getHeight()),
                solver;

            image.appendTo(document.body);
            canvas.appendTo(document.body);
            normalized.appendTo(document.body);

            canvas.getContext().drawImage(image.getElement(), 0, 0);

            scanner = new Scanner(canvas, options);
            matrix = scanner.scan();

            matrix.iterate((x, y, isWall) => {
                normalized.drawRectangle(new Point(x, y), 1, 1, isWall ? 'black' : 'white');
            });

            solver = new Solver(matrix);
            console.log(solver.simple());
        });
    }
}

MazeSolver.solve(new Options());