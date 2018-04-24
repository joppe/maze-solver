import { ICell } from 'app/grid/ICell';
import { IPosition } from 'app/grid/IPosition';
import { CellType } from 'app/maze/CellType';
import { Maybe } from 'app/monad/Maybe';
export declare class Path {
    private _cells;
    private _current;
    readonly length: number;
    findByPosition(position: IPosition, maxIndex?: number): Maybe<ICell<CellType>>;
    has(cell: Maybe<ICell<CellType>>): boolean;
    add(cell: Maybe<ICell<CellType>>): void;
    get(index: number): Maybe<ICell<CellType>>;
}
