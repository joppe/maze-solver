import { Cell } from '../grid/cell/Cell';
import { Grid } from '../grid/Grid';

export function deadEnds(grid: Grid): number {
  let count = 0;

  grid.forEachCell((cell: Cell): void => {
    if (cell.linkCount() === 1) {
      count += 1;
    }
  });

  return count;
}
