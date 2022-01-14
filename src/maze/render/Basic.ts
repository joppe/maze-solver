import { Cell } from '../grid/cell/Cell';
import { Grid } from '../grid/Grid';
import type { Engine } from './engine/Engine.type';
import type { Renderer } from './Renderer.type';

export class Basic implements Renderer {
  protected readonly _grid: Grid;
  protected readonly _engine: Engine;

  public constructor(grid: Grid, engine: Engine) {
    this._grid = grid;
    this._engine = engine;
  }

  public render(container: HTMLElement): void {
    this._engine.setDimensions(this._grid.rows, this._grid.columns);

    this._grid.forEachCell((cell: Cell): void => {
      this.renderCell(cell);
    });

    const maze = this._engine.output();

    container.appendChild(maze);
  }

  protected renderCell(cell: Cell): void {
    this._engine.renderCell(cell);
  }
}
