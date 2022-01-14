import { map } from '../../iterator/map/map';
import { range } from '../../iterator/range/range';
import { random } from '../../math/random/random';
import type { Position } from '../Position.type';
import { Cell } from './cell/Cell';
import { Direction } from './cell/direction';
import { indexToPosition } from './index/indexToPosition';
import { positionToIndex } from './index/positionToIndex';
import type { Options } from './Options.type';

export class Grid {
  public readonly rows: number;
  public readonly columns: number;
  protected cells: (Cell | undefined)[] = [];

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

  public forEachCell(callback: (cell: Cell) => void) {
    this.cells.forEach((cell: Cell | undefined) => {
      if (cell === undefined) {
        return;
      }

      callback(cell);
    });
  }

  public getRandomCell(): Cell {
    const index = random(0, this.size - 1);
    const cell = this.cells[index];

    if (cell === undefined) {
      throw new Error('Random cell is undefined');
    }

    return cell;
  }

  public getCell(position: Position): Cell | undefined {
    if (this.isValidPosition(position)) {
      return this.cells[positionToIndex(position, this.columns)];
    }

    return undefined;
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

  protected createCells(): (Cell | undefined)[] {
    return map<number, Cell>(
      range(0, this.size - 1),
      (index) => new Cell(indexToPosition(index, this.columns)),
    );
  }

  private assignNeighbours(): void {
    this.forEachCell((cell: Cell | undefined) => {
      if (cell === undefined) {
        return;
      }

      cell.setNeighbour(
        Direction.North,
        this.getCell({ row: cell.row - 1, column: cell.column }),
      );
      cell.setNeighbour(
        Direction.East,
        this.getCell({ row: cell.row, column: cell.column + 1 }),
      );
      cell.setNeighbour(
        Direction.South,
        this.getCell({ row: cell.row + 1, column: cell.column }),
      );
      cell.setNeighbour(
        Direction.West,
        this.getCell({ row: cell.row, column: cell.column - 1 }),
      );
    });
  }

  public static factory(options: Options): Grid {
    const grid = new this(options);

    grid.setup();

    return grid;
  }
}
