import { Cell } from '../grid/cell/Cell';
import { calculate } from './calculate';
import { Distances } from './Distances';

export function pathTo(from: Cell, to: Cell): Distances {
  const distances = calculate(from);
  const breadcrumbs = new Distances(from);
  let current = to;

  breadcrumbs.setDistance(current, distances.getDistance(current) as number);

  while (current !== from) {
    for (const neighbour of current.links()) {
      if (distances.getDistance(neighbour) < distances.getDistance(current)) {
        breadcrumbs.setDistance(neighbour, distances.getDistance(neighbour));
        current = neighbour;

        break;
      }
    }
  }

  return breadcrumbs;
}
