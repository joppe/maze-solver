import { random } from '../../math/random/random';
import { indexToPosition } from '../grid/index/indexToPosition';
import { positionToIndex } from '../grid/index/positionToIndex';
import type { Position } from '../Position.type';
import type { Options } from './Options.type';

export class Mask {
  public readonly rows: number;
  public readonly columns: number;
  private readonly cells: boolean[];

  public constructor(options: Options) {
    this.rows = options.rows;
    this.columns = options.columns;
    this.cells = Array.from({ length: this.size }, () => true);
  }

  public get size(): number {
    return this.rows * this.columns;
  }

  public get count(): number {
    return this.cells.reduce((total: number, cell: boolean): number => {
      if (cell) {
        return total + 1;
      }
      return total;
    }, 0);
  }

  public getCell(position: Position): boolean {
    if (this.isValidPosition(position)) {
      return this.cells[positionToIndex(position, this.columns)];
    }

    return false;
  }

  public setCell(position: Position, value: boolean): void {
    if (this.isValidPosition(position)) {
      this.cells[positionToIndex(position, this.columns)] = value;
    }
  }

  public isValidPosition(position: Position): boolean {
    return this.isValidRow(position.row) && this.isValidColumn(position.column);
  }

  public isValidRow(row: number): boolean {
    return row >= 0 && row < this.rows;
  }

  public isValidColumn(column: number): boolean {
    return column >= 0 && column < this.columns;
  }

  public randomPosition(): Position {
    const index = random(0, this.size - 1);

    return indexToPosition(index, this.columns);
  }
}
