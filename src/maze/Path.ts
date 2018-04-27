import { ICell } from 'app/grid/ICell';
import { CellType } from 'app/maze/CellType';
import { equalPosition } from 'app/maze/helper/equalPosition';
import { Maybe } from 'app/monad/Maybe';

export class Path {
    private _cells: Maybe<ICell<CellType>>[] = [];
    private _marks: number[] = [];

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

    public mark(count: number): void {
        for (let i: number = count; i > 0; i -= 1) {
            this._marks.push(this.length - i);
        }
    }

    public release(count: number): void {
        for (let i: number = 0; i < count; i += 1) {
            this._marks.pop();
        }
    }

    public * getOptimized(): IterableIterator<Maybe<ICell<CellType>>> {
        for (const mark of this._marks) {
            yield this._cells[mark];
        }
    }

    public debug(): void {
        window.console.log(this._marks);
    }
}
