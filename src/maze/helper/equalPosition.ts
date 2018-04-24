import { IPosition } from 'app/grid/IPosition';

export function equalPosition(a: IPosition, b: IPosition): boolean {
    return (
        a.row === b.row &&
        a.col === b.col
    );
}
