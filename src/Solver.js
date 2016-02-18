import {Point} from './Point.js';
import {Vector} from './Vector.js';
import {Path} from './Path.js';

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

    simple() {
        let angles = [90, 0, -90, -180],
            size = this.matrix.getSize(),
            path = new Path(),
            position = new Point(1, 0),
            direction = new Vector(1, 0),
            guard = (2 * size.width) + (2 * size.height);

        while (0 < guard) {
            angles.every((angle) => {
                let ret = true,
                    tryDirection = direction.rotate(angle),
                    tryPosition = position.add(new Point(tryDirection.x, tryDirection.y));

                if (this.isPath(tryPosition)) {
                    direction = tryDirection;
                    position = tryPosition;

                    path.add(position);

                    ret = false;
                }
                return ret;
            });

            guard -= 1;
        }

        console.log(path);
    }
}