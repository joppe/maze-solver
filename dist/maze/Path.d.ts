import { ICell } from 'app/grid/ICell';
import { CellType } from 'app/maze/CellType';
import { Maybe } from 'app/monad/Maybe';
export declare class Path {
    private _cells;
    private _marks;
    readonly length: number;
    has(cell: Maybe<ICell<CellType>>): boolean;
    add(cell: Maybe<ICell<CellType>>): void;
    getCells(): IterableIterator<Maybe<ICell<CellType>>>;
    mark(count: number): void;
    release(count: number): void;
    getOptimized(): IterableIterator<Maybe<ICell<CellType>>>;
    debug(): void;
}
