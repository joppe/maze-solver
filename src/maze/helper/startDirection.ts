import { Vector } from 'app/geometry/Vector';
import { IPosition } from 'app/grid/IPosition';

export function startDirection(position: IPosition, cols: number, rows: number): Vector {
    let x: number = 0;
    let y: number = 0;

    if (position.col === 0) {
        x = 1;
    } else if (position.col === cols - 1) {
        x = -1;
    } else if (position.row === 0) {
        y = 1;
    } else if (position.row === rows - 1) {
        y = -1;
    } else {
        throw new Error(`Illegal start position {row: ${position.row}, col: ${position.col}} with grid rows ${rows} and cols ${cols}.`);
    }

    return new Vector(x, y);
}
