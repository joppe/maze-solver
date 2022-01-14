import { filter } from '../../../iterator/filter/filter';
import { random } from '../../../math/random/random';
import { Cell } from '../../grid/cell/Cell';
import { Grid } from '../../grid/Grid';
import type { Generator } from '../Generator.type';
import type { Options } from '../Options.type';

export const huntAntKill: Generator = (options: Options) => {
  const grid = new Grid(options);
  let current: Cell | undefined = grid.getRandomCell();

  while (current !== undefined) {
    const unvisitedNeighbours: Cell[] = filter(
      current.neighbours,
      (neighbour) => neighbour.linkCount() === 0,
    );

    if (unvisitedNeighbours.length > 0) {
      const index = random(0, unvisitedNeighbours.length - 1);
      const neighbour = unvisitedNeighbours[index];

      current.link(neighbour);
      current = neighbour;
    } else {
      current = undefined;

      grid.forEachCell((cell) => {
        const visitedNeighbours = filter(
          cell.neighbours,
          (neighbour) => neighbour.linkCount() > 0,
        );

        if (cell.linkCount() === 0 && visitedNeighbours.length > 0) {
          const index = random(0, visitedNeighbours.length - 1);
          const neighbour = visitedNeighbours[index];

          current = cell;
          current.link(neighbour);
        }
      });
    }
  }

  return grid;
};
