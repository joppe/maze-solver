import { IPosition } from 'app/grid/IPosition';

export function roomToCellPosition(roomPosition: IPosition): IPosition {
    return {
        col: (roomPosition.col * 2) + 1,
        row: (roomPosition.row * 2) + 1
    };
}
