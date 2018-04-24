import { IPosition } from 'app/grid/IPosition';
import { equalPosition } from 'app/maze/helper/equalPosition';

export function findInPath(position: IPosition, path: IPosition[]): IPosition | undefined {
    return path.find((p: IPosition): boolean => {
        return equalPosition(p, position);
    });
}
