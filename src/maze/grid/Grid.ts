import { map } from '../../iterator/map/map';
import { range } from '../../iterator/range/range';
import { random } from '../../math/random/random';
import type { Position } from '../Position.type';
import { Cell } from './cell/Cell';
import { indexToPosition } from './index/indexToPosition';
import { positionToIndex } from './index/positionToIndex';
import type { Options } from './Options.type';

export class Grid<T extends Cell = Cell> {
  public readonly rows: number;
  public readonly columns: number;
  protected cells: (T | undefined)[] = [];

  protected constructor(options: Options) {
    this.rows = options.rows;
    this.columns = options.columns;
  }

  public setup() {
    this.cells = this.createCells();

    this.assignNeighbours();
  }

  public get size(): number {
    return this.rows * this.columns;
  }

  public forEachCell(callback: (cell: T) => void) {
    this.cells.forEach((cell: T | undefined) => {
      if (cell === undefined) {
        return;
      }

      callback(cell);
    });
  }

  public getRandomCell(): T {
    const index = random(0, this.size - 1);
    const cell = this.cells[index];

    if (cell === undefined) {
      throw new Error('Random cell is undefined');
    }

    return cell;
  }

  public getCell(position: Position): T | undefined {
    if (this.isValidPosition(position)) {
      return this.cells[positionToIndex(position, this.columns)];
    }

    return undefined;
  }

  public isValidPosition(position: Position): boolean {
    return this.isValidRow(position.row) && this.isValidColumn(position.column);
  }

  protected isValidRow(row: number): boolean {
    return row >= 0 && row < this.rows;
  }

  protected isValidColumn(column: number): boolean {
    return column >= 0 && column < this.columns;
  }

  protected createCells(): (T | undefined)[] {
    return map<number, T>(
      range(0, this.size - 1),
      (index) => new Cell(indexToPosition(index, this.columns)) as T,
    );
  }

  protected assignNeighbours(): void {
    this.forEachCell((cell: T | undefined) => {
      if (cell === undefined) {
        return;
      }

      cell.north = this.getCell({ row: cell.row - 1, column: cell.column });
      cell.east = this.getCell({ row: cell.row, column: cell.column + 1 });
      cell.south = this.getCell({ row: cell.row + 1, column: cell.column });
      cell.west = this.getCell({ row: cell.row, column: cell.column - 1 });
    });
  }

  public static factory(options: Options): Grid {
    const grid = new this(options);

    grid.setup();

    return grid;
  }
}
