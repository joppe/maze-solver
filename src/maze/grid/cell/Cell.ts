import type { Position } from '../../Position.type';
import { Direction } from './direction';

export class Cell {
  public readonly row: number;
  public readonly column: number;
  private _neighbours: Map<Direction, Cell> = new Map();
  private _linked: Map<Cell, boolean> = new Map();

  public constructor(position: Position) {
    this.row = position.row;
    this.column = position.column;
  }

  public get neighbours(): IterableIterator<Cell> {
    return this._neighbours.values();
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

  public setNeighbour(direction: Direction, neighbour: Cell | undefined) {
    if (neighbour === undefined) {
      return;
    }

    this._neighbours.set(direction, neighbour);
  }

  public getNeighbour(direction: Direction): Cell | undefined {
    return this._neighbours.get(direction);
  }
}
