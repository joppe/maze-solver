import { range } from '../../iterator/range/range';
import { Mask } from '../mask/Mask';
import { Cell } from './cell/Cell';
import { Grid } from './Grid';
import { indexToPosition } from './index/indexToPosition';
import { positionToIndex } from './index/positionToIndex';

export class MaskedGrid extends Grid {
  protected readonly mask: Mask;

  protected constructor(mask: Mask) {
    super({ columns: mask.columns, rows: mask.rows });

    this.mask = mask;
  }

  public get size(): number {
    return this.mask.count;
  }

  protected createCells(): (Cell | undefined)[] {
    const cells: (Cell | undefined)[] = [];

    for (const index of range(0, super.size - 1)) {
      const position = indexToPosition(index, this.columns);

      if (this.mask.getCell(position)) {
        cells.push(new Cell(position));
      } else {
        cells.push(undefined);
      }
    }

    return cells;
  }

  public getRandomCell(): Cell {
    const position = this.mask.randomPosition();
    const cell = this.cells[positionToIndex(position, this.columns)];

    if (cell === undefined) {
      throw new Error('Random cell is undefined');
    }

    return cell;
  }

  public static factory(mask: Mask): Grid {
    const grid = new this(mask);

    grid.setup();

    return grid;
  }
}
