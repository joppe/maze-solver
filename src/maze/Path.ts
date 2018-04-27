import { ICell } from 'app/grid/ICell';
import { CellType } from 'app/maze/CellType';
import { equalPosition } from 'app/maze/helper/equalPosition';
import { Maybe } from 'app/monad/Maybe';

export class Path {
    private _cells: Maybe<ICell<CellType>>[] = [];

    public get length(): number {
        return this._cells.length;
    }

    public has(cell: Maybe<ICell<CellType>>): boolean {
        return this._cells.find((b: Maybe<ICell<CellType>>): boolean => {
            return equalPosition(cell.value.position, b.value.position);
        }) !== undefined;
    }

    public add(cell: Maybe<ICell<CellType>>): void {
        this._cells.push(cell);
    }

    public * getCells(): IterableIterator<Maybe<ICell<CellType>>> {
        for (const cell of this._cells) {
            yield cell;
        }
    }
}
