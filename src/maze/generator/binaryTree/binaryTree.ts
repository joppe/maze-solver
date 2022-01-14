import { random } from '../../../math/random/random';
import { Direction } from '../../grid/cell/direction';
import { Grid } from '../../grid/Grid';
import type { Generator } from '../Generator.type';
import type { Options } from '../Options.type';

export const binaryTree: Generator = (options: Options) => {
  const grid = new Grid(options);

  grid.forEachCell((cell) => {
    const north = cell.getNeighbour(Direction.North);
    const east = cell.getNeighbour(Direction.East);
    const neighbours = [];

    if (north) {
      neighbours.push(north);
    }
    if (east) {
      neighbours.push(east);
    }

    if (neighbours.length) {
      const index = random(0, neighbours.length - 1);
      const neighbour = neighbours[index];

      cell.link(neighbour);
    }
  });

  return grid;
};
