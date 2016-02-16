import {Options} from './Options.js';
import {MazeImage} from './MazeImage.js';
import {Canvas} from './Canvas.js';
import {Scanner} from './Scanner.js';

class MazeSolver {
    static solve(options) {
        MazeImage.fetch(options).then((image) => {
            let canvas = new Canvas(image.getWidth(), image.getHeight()),
                scanner = new Scanner(canvas, options);

            image.appendTo(document.body);
            canvas.appendTo(document.body);

            canvas.getContext().drawImage(image.getElement(), 0, 0);

            scanner.scan();
        });
    }
}

MazeSolver.solve(new Options());