import { ICell } from 'app/grid/ICell';
import { IPosition } from 'app/grid/IPosition';
import { IValueFactory } from 'app/grid/IValueFactory';
export declare class Grid<T> {
    private readonly _rows;
    private readonly _cols;
    private readonly _length;
    private _cells;
    readonly length: number;
    readonly cols: number;
    readonly rows: number;
    constructor(rows: number, cols: number, valueFactory?: IValueFactory<T>);
    setCell(position: IPosition, value: T): void;
    getCell(position: IPosition): ICell<T> | undefined;
    isValidPosition(position: IPosition): boolean;
    getRow(row: number): IterableIterator<ICell<T>>;
    getCol(col: number): IterableIterator<ICell<T>>;
    getCells(): IterableIterator<ICell<T>>;
    private createIndex(position);
}
