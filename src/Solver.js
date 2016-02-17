import {Point} from './Point.js';
import {Vector} from './Vector.js';

/**
 * @class Solver
 */
export class Solver {
    /**
     * @param {Matrix} matrix
     */
    constructor(matrix) {
        this.matrix = matrix;
    }

    isWall(position) {
        return true === this.matrix.get(position.x, position.y);
    }

    isPath(position) {
        return false === this.matrix.get(position.x, position.y);
    }

    findOpening() {
        let size = this.matrix.getSize(),
            position = new Point(1, 0),
            direction = new Vector(1, 0),
            guard = 10;

        while (0 < guard) {
            direction = direction.rotate(90);
            console.log(`x: ${direction.x}; y: ${direction.y}`, direction.toString());
            guard -= 1;
        }

        //throw 'Cannot find opening';
    }

    simple() {

    }
}