import { Cell } from '../grid/cell/Cell';

export class Distances {
  private readonly _root: Cell;
  private readonly _cells: Map<Cell, number> = new Map();

  public constructor(root: Cell) {
    this._root = root;

    this._cells.set(this._root, 0);
  }

  public get root(): Cell {
    return this._root;
  }

  public getDistance(cell: Cell): number {
    if (!this.hasDistance(cell)) {
      throw new Error(
        `Cells distance not registered (row: ${cell.row}, column: ${cell.column})`,
      );
    }

    return this._cells.get(cell) as number;
  }

  public hasDistance(cell: Cell): boolean {
    return this._cells.has(cell);
  }

  public setDistance(cell: Cell, distance: number): void {
    this._cells.set(cell, distance);
  }

  public getCells(): IterableIterator<Cell> {
    return this._cells.keys();
  }
}
