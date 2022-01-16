import { random } from '../../../math/random/random';
import { Grid } from '../../grid/Grid';
import type { Generator } from '../Generator.type';

export const binaryTree: Generator = (factory: () => Grid): Grid => {
  const grid = factory();

  grid.forEachCell((cell) => {
    const neighbours = [];

    if (cell.north) {
      neighbours.push(cell.north);
    }
    if (cell.east) {
      neighbours.push(cell.east);
    }

    if (neighbours.length) {
      const index = random(0, neighbours.length - 1);
      const neighbour = neighbours[index];

      cell.link(neighbour);
    }
  });

  return grid;
};
