import {Point} from './../geometry/Point.js';
import {Vector} from './../geometry/Vector.js';
import {Path} from './Path.js';

/**
 * @class Solver
 */
export class Solver {
    /**
     * @param {Matrix} matrix
     * @param {Point} start
     * @param {Vector} direction
     */
    constructor(matrix, start, direction) {
        this.matrix = matrix;
        this.start = start;
        this.direction = direction;
    }

    /**
     * @param {Point} position
     * @returns {boolean}
     */
    isWall(position) {
        if (this.matrix.isValid(position.x, position.y)) {
            return this.matrix.get(position.x, position.y).isWall;
        }

        return false;
    }

    /**
     * @param {Point} position
     * @returns {boolean}
     */
    isPath(position) {
        return !this.isWall(position);
    }

    /**
     * @param {Point} position
     * @returns {boolean}
     */
    isInside(position) {
        let size = this.matrix.getSize();

        return (1 < position.x && (size.width - 1) > position.x && 1 < position.y && (size.height - 1) > position.y);
    }

    /**
     * @param {Point} position
     * @returns {boolean}
     */
    isOutside(position) {
        let size = this.matrix.getSize();

        return (0 === position.x || (size.width - 1) === position.x || 0 === position.y || (size.height - 1 === position.y));
    }

    /**
     * @param {Point} position
     * @param {Vector} direction
     * @returns {boolean}
     */
    isJunction(position, direction) {
        let angles = [90, 0, -90],
            supportedAngles = 0;

        angles.forEach((angle) => {
            let tryDirection = direction.rotate(angle),
                tryPosition = position.add(new Point(tryDirection.x, tryDirection.y));

            if (this.isPath(tryPosition)) {
                supportedAngles += 1;
            }
        });

        return 1 < supportedAngles;
    }

    /**
     * @returns {Path}
     */
    simple() {
        let angles = [90, 0, -90, -180],
            path = new Path(),
            position = this.start,
            direction = this.direction,
            wasInside = false;

        while (false === wasInside || (true === wasInside && false === this.isOutside(position))) {
            if (false === wasInside && this.isInside(position)) {
                wasInside = true;
            }

            angles.every((angle) => {
                let ret = true,
                    tryDirection = direction.rotate(angle),
                    tryPosition = position.add(new Point(tryDirection.x, tryDirection.y));

                if (this.isPath(tryPosition)) {
                    direction = tryDirection;
                    position = tryPosition;

                    path.add(this.matrix.get(position.x, position.y));

                    ret = false;
                }

                return ret;
            });
        }

        return path;
    }
}