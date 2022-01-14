import { filter } from '../../../iterator/filter/filter';
import { random } from '../../../math/random/random';
import { Cell } from '../../grid/cell/Cell';
import { Grid } from '../../grid/Grid';
import { Generator } from '../Generator.type';

export const recursiveBacktracker: Generator = (factory: () => Grid): Grid => {
  const grid = factory();
  const stack: Cell[] = [grid.getRandomCell()];

  while (stack.length > 0) {
    const current = stack[stack.length - 1];
    const unvisitedNeighbours: Cell[] = filter(
      current.neighbours,
      (neighbour) => neighbour.linkCount() === 0,
    );

    if (unvisitedNeighbours.length === 0) {
      stack.pop();
    } else {
      const index = random(0, unvisitedNeighbours.length - 1);
      const neighbour = unvisitedNeighbours[index];

      current.link(neighbour);

      stack.push(neighbour);
    }
  }

  return grid;
};
