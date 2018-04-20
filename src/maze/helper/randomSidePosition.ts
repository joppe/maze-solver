import { random as randomArray } from 'app/array/random';
import { IPosition } from 'app/grid/IPosition';
import { random as randomNumber } from 'app/number/random';

export function randomSidePosition(rows: number, cols: number): IPosition {
    const side: string = randomArray(['top', 'right', 'bottom', 'left']);
    let row: number;
    let col: number;

    switch (side) {
        case 'top':
            col = randomNumber(1, cols - 2);
            row = 0;
            break;
        case 'right':
            col = cols - 1;
            row = randomNumber(1, rows - 2);
            break;
        case 'bottom':
            col = randomNumber(1, cols - 2);
            row = rows - 1;
            break;
        case 'left':
            col = 0;
            row = randomNumber(1, rows - 2);
            break;
    }

    return {
        col,
        row
    };
}
