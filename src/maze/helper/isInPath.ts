import { IPosition } from 'app/grid/IPosition';
import { findInPath } from 'app/maze/helper/findInPath';

export function isInPath(position: IPosition, path: IPosition[]): boolean {
    return findInPath(position, path) !== undefined;
}
