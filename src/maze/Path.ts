import { ICell } from 'app/grid/ICell';
import { CellType } from 'app/maze/CellType';
import { Maybe } from 'app/monad/Maybe';

export class Path {
    private _cells: Maybe<ICell<CellType>>[] = [];

    public has(cell: Maybe<ICell<CellType>>): boolean {
        const a: ICell<CellType> = cell.value;

        return this._cells.find((b: Maybe<ICell<CellType>>): boolean => {
            const c: ICell<CellType> = b.value;

            return (
                a.position.row === c.position.row &&
                a.position.col === c.position.col
            );
        }) !== undefined;
    }

    public add(cell: Maybe<ICell<CellType>>): void {
        this._cells.push(cell);
    }

    public * get(): IterableIterator<Maybe<ICell<CellType>>> {
        for (const cell of this._cells) {
            yield cell;
        }
    }
}
