import { Distances } from '../distance/Distances';
import { max } from '../distance/max';
import { Cell } from '../grid/cell/Cell';
import { Grid } from '../grid/Grid';
import { Debug } from './Debug';
import type { CellStyle } from './engine/Engine.type';
import type { Engine } from './engine/Engine.type';
import type { Renderer } from './Renderer.type';

export class Colored extends Debug implements Renderer {
  protected readonly _max: number;

  public constructor(grid: Grid, engine: Engine, distances: Distances) {
    super(grid, engine, distances);

    const [, maximum] = max(this._distances);
    this._max = maximum;
  }

  protected renderCell(cell: Cell): void {
    const style: CellStyle = { background: undefined };
    const background = this.backgroundColor(cell);
    const color = this.color(cell);
    const distance = this._distances.hasDistance(cell)
      ? String(this._distances.getDistance(cell))
      : '';

    if (background) {
      style.background = background;
    }

    if (color) {
      style.color = color;
    }

    this._engine.renderCell(cell, distance, style);
  }

  protected backgroundColor(cell: Cell): string | undefined {
    if (!this._distances.hasDistance(cell)) {
      return;
    }

    const distance = this._distances.getDistance(cell);
    const intensity = (this._max - distance) / this._max;
    const dark = Math.round(255 * intensity);
    const bright = 128 + Math.round(127 * intensity);

    return `rgb(${dark},${bright},${dark})`;
  }

  protected color(cell: Cell): string | undefined {
    if (!this._distances.hasDistance(cell)) {
      return;
    }

    const distance = this._distances.getDistance(cell);
    const intensity = (this._max - distance) / this._max;
    const dark = Math.round(255 * intensity);

    return dark < 100 ? 'white' : 'black';
  }
}
