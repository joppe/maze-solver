import type { Position } from '../../Position.type';

export class Cell {
  public readonly row: number;
  public readonly column: number;
  public neighbours: Cell[] = [];
  protected _north: Cell | undefined;
  protected _east: Cell | undefined;
  protected _south: Cell | undefined;
  protected _west: Cell | undefined;
  protected _linked: Map<Cell, boolean> = new Map();

  public constructor(position: Position) {
    this.row = position.row;
    this.column = position.column;
  }

  public set north(cell: Cell | undefined) {
    if (cell !== undefined) {
      this._north = cell;
      this.neighbours.push(cell);
    }
  }

  public get north(): Cell | undefined {
    return this._north;
  }

  public set east(cell: Cell | undefined) {
    if (cell !== undefined) {
      this._east = cell;
      this.neighbours.push(cell);
    }
  }

  public get east(): Cell | undefined {
    return this._east;
  }

  public set south(cell: Cell | undefined) {
    if (cell !== undefined) {
      this._south = cell;
      this.neighbours.push(cell);
    }
  }

  public get south(): Cell | undefined {
    return this._south;
  }

  public set west(cell: Cell | undefined) {
    if (cell !== undefined) {
      this._west = cell;
      this.neighbours.push(cell);
    }
  }

  public get west(): Cell | undefined {
    return this._west;
  }

  public links(): IterableIterator<Cell> {
    return this._linked.keys();
  }

  public linkCount(): number {
    return this._linked.size;
  }

  public link(cell: Cell, mirror = true): void {
    this._linked.set(cell, true);

    if (mirror) {
      cell.link(this, false);
    }
  }

  public unlink(cell: Cell, mirror = true): void {
    this._linked.delete(cell);

    if (mirror) {
      cell.unlink(this, mirror);
    }
  }

  public linked(cell: Cell | undefined): boolean {
    if (cell === undefined) {
      return false;
    }

    return this._linked.has(cell);
  }
}
