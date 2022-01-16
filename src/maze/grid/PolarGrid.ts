import { forEach } from '../../iterator/forEach/forEach';
import { range } from '../../iterator/range/range';
import type { Position } from '../Position.type';
import { PolarCell } from './cell/PolarCell';
import { Grid } from './Grid';
import type { Options } from './Options.type';

export class PolarGrid extends Grid<PolarCell> {
  protected cells: (PolarCell | undefined)[] = [];
  protected positions: Record<string, number> = {};
  protected rowCellCount: number[] = [];

  protected constructor(options: Options) {
    super({ rows: options.rows, columns: 1 });
  }

  public setup() {
    this.cells = this.createCells();
    this.assignNeighbours();
  }

  public get size(): number {
    return this.cells.length;
  }

  public getCell(position: Position): PolarCell | undefined {
    if (this.isValidPosition(position)) {
      /**
       * Normalize the position, this is done because otherwise there will be a horizontal line on the right half
       * of the center. This is because if the cell has no neighbour on the `cw` it will draw a line on the bottom.
       * When the requested column is larger than the last column, return the first column, that is the one that
       * will be rendered next to it.
       */
      const normalizedPosition = {
        row: position.row,
        column: position.column % this.rowCellCount[position.row],
      };
      const index = this.positions[this.positionToKey(normalizedPosition)];

      return this.cells[index];
    }

    return undefined;
  }

  public isValidPosition(position: Position): boolean {
    return position.row >= 0 && position.row <= this.rowCellCount.length;
  }

  protected positionToKey(position: Position): string {
    return `${position.row}-${position.column}`;
  }

  protected createCells(): (PolarCell | undefined)[] {
    const cells: (PolarCell | undefined)[] = [];
    const rowHeight = 1 / this.rows;

    this.rowCellCount = [1];
    this.positions = {};
    this.positions[this.positionToKey({ column: 0, row: 0 })] = cells.length;
    cells.push(new PolarCell({ column: 0, row: 0 }, 1));

    forEach(range(1, this.rows - 1), (row: number): void => {
      const radius = row / this.rows;
      const circumference = 2 * Math.PI * radius;
      const previousount = this.rowCellCount[row - 1];
      const estimatedCellWidth = circumference / previousount;
      const ratio = Math.round(estimatedCellWidth / rowHeight);
      const cellCount = previousount * ratio;
      const theta = (2 * Math.PI) / cellCount;

      forEach(range(0, cellCount - 1), (column: number): void => {
        this.positions[this.positionToKey({ column, row })] = cells.length;
        cells.push(new PolarCell({ column, row }, theta));
      });

      this.rowCellCount.push(cellCount);
    });

    return cells;
  }

  protected assignNeighbours(): void {
    this.forEachCell((cell: PolarCell | undefined) => {
      if (cell === undefined || cell.row === 0) {
        return;
      }

      cell.cw = this.getCell({ row: cell.row, column: cell.column + 1 });
      cell.ccw = this.getCell({ row: cell.row, column: cell.column - 1 });

      const ratio =
        this.rowCellCount[cell.row] / this.rowCellCount[cell.row - 1];
      const parent = this.getCell({
        row: cell.row - 1,
        column: Math.floor(cell.column / ratio),
      }) as PolarCell;

      parent.addOutward(cell);
      cell.inward = parent;
    });
  }

  public static factory(options: Options): Grid {
    const grid = new PolarGrid(options);

    grid.setup();

    return grid;
  }
}
