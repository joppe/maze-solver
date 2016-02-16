import {Options} from './Options.js';
import {MazeImage} from './MazeImage.js';
import {Canvas} from './Canvas.js';

class MazeSolver {
    constructor(options) {
        MazeImage.fetch(options).then((image) => {
            let canvas = new Canvas(image.getWidth(), image.getHeight());

            image.appendTo(document.body);
            canvas.appendTo(document.body);

            canvas.getContext().drawImage(image.getElement(), 0, 0);
        });
    }
}

new MazeSolver(new Options());