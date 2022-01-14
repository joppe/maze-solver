import { Cell } from '../grid/cell/Cell';
import { Distances } from './Distances';

export function max(distances: Distances): [Cell, number] {
  let maxDistance = 0;
  let currentCell = distances.root;

  for (const cell of distances.getCells()) {
    const distance = distances.getDistance(cell);

    if (distance > maxDistance) {
      currentCell = cell;
      maxDistance = distance;
    }
  }

  return [currentCell, maxDistance];
}
