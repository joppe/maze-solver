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

    /**
     * @param {Point} position
     * @returns {boolean}
     */
    isWall(position) {
        return true === this.matrix.get(position.x, position.y);
    }

    /**
     * @param {Point} position
     * @returns {boolean}
     */
    isPath(position) {
        return false === this.matrix.get(position.x, position.y);
    }

    /**
     * @returns {Path}
     */
    simple() {
        let angles = [90, 0, -90, -180],
            size = this.matrix.getSize(),
            path = new Path(),
            position = new Point(1, 0),
            direction = new Vector(1, 0),
            wasInside = false,
            guard = 100;

        while (0 < guard) {
            if (false === wasInside || (position.x > 1 && position.x < (size.width - 1) && position.y > 1 && position.y < (size.height - 1))) {
                wasInside = true;
            }

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

        return path;
    }
}