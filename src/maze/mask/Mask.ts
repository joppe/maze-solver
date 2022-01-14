import { random } from '../../math/random/random';
import { indexToPosition } from '../grid/index/indexToPosition';
import { positionToIndex } from '../grid/index/positionToIndex';
import type { Position } from '../Position.type';
import type { Options } from './Options.type';

export class Mask {
  public readonly rows: number;
  public readonly columns: number;
  private cells: number[];

  public constructor(options: Options) {
    this.rows = options.rows;
    this.columns = options.columns;
    this.cells = Array.from(
      { length: this.size },
      (_: unknown, index: number): number => index,
    );
  }

  public get size(): number {
    return this.rows * this.columns;
  }

  public get count(): number {
    return this.cells.length;
  }

  public getCell(position: Position): boolean {
    if (this.isValidPosition(position)) {
      const index = positionToIndex(position, this.columns);

      return this.cells.includes(index);
    }

    return false;
  }

  public setCell(position: Position, value: boolean): void {
    if (this.isValidPosition(position)) {
      const index = positionToIndex(position, this.columns);

      if (value && !this.cells.includes(index)) {
        this.cells.push(index);
      }

      if (!value) {
        this.cells = this.cells.filter((cell) => cell !== index);
      }
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
    const index = this.cells[random(0, this.count - 1)];

    return indexToPosition(index, this.columns);
  }
}
