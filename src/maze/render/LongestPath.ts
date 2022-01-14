import { calculate } from '../distance/calculate';
import { Distances } from '../distance/Distances';
import { max } from '../distance/max';
import { pathTo } from '../distance/pathTo';
import { Cell } from '../grid/cell/Cell';
import { Grid } from '../grid/Grid';
import { Debug } from './Debug';
import type { Engine } from './engine/Engine.type';
import type { Renderer } from './Renderer.type';

export class LongestPath extends Debug implements Renderer {
  public constructor(grid: Grid, engine: Engine, distances: Distances) {
    super(grid, engine, distances);

    this._distances = this.getPath();
  }

  protected getPath(): Distances {
    const start = this._grid.getCell({ row: 0, column: 0 }) as Cell;
    const distances = calculate(start);
    const [newStart] = max(distances);
    const newDistances = calculate(newStart);
    const [goal] = max(newDistances);

    return pathTo(newStart, goal);
  }
}
