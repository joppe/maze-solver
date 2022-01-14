import { Distances } from '../distance/Distances';
import { Cell } from '../grid/cell/Cell';
import { Grid } from '../grid/Grid';
import { Basic } from './Basic';
import type { Engine } from './engine/Engine.type';
import type { Renderer } from './Renderer.type';

export class Debug extends Basic implements Renderer {
  protected _distances: Distances;

  public constructor(grid: Grid, engine: Engine, distances: Distances) {
    super(grid, engine);

    this._distances = distances;
  }

  protected renderCell(cell: Cell): void {
    const distance = this._distances.hasDistance(cell)
      ? String(this._distances.getDistance(cell))
      : '';

    this._engine.renderCell(cell, distance);
  }
}
