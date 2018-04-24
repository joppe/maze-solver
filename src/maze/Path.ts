import { ICell } from 'app/grid/ICell';
import { IPosition } from 'app/grid/IPosition';
import { CellType } from 'app/maze/CellType';
import { equalPosition } from 'app/maze/helper/equalPosition';
import { Maybe } from 'app/monad/Maybe';

export class Path {
    private _cells: Maybe<ICell<CellType>>[] = [];
    private _current: Maybe<ICell<CellType>>;

    public get length(): number {
        return this._cells.length;
    }

    public findByPosition(position: IPosition, maxIndex?: number): Maybe<ICell<CellType>> {
        const cell: Maybe<ICell<CellType>> | undefined = this._cells.find((b: Maybe<ICell<CellType>>, index: number): boolean => {
            return (maxIndex === undefined || maxIndex >= index) && equalPosition(position, b.value.position);
        });

        if (cell === undefined) {
            return Maybe.none();
        }

        return cell;
    }

    public has(cell: Maybe<ICell<CellType>>): boolean {
        return this._cells.find((b: Maybe<ICell<CellType>>): boolean => {
            return equalPosition(cell.value.position, b.value.position);
        }) !== undefined;
    }

    public add(cell: Maybe<ICell<CellType>>): void {
        this._current = cell;
        this._cells.push(cell);
    }

    public get(index: number): Maybe<ICell<CellType>> {
        return this._cells[index];
    }
}
