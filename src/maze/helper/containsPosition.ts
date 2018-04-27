import { IPosition } from 'app/grid/IPosition';
import { equalPosition } from 'app/maze/helper/equalPosition';

export function containsPosition(positions: IPosition[], position: IPosition): boolean {
    return positions.find((part: IPosition): boolean => {
        return equalPosition(part, position);
    }) !== undefined;
}
