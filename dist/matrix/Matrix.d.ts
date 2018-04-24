import { ICell } from 'app/matrix/ICell';
export declare class Matrix<T> {
    private readonly _rows;
    private readonly _cols;
    private readonly _length;
    private _cells;
    readonly length: number;
    readonly cols: number;
    readonly rows: number;
    constructor(rows: number, cols: number, defaultCellValue?: T);
    setCell(row: number, col: number, value: T): void;
    getCell(row: number, col: number): ICell<T>;
    isValidIndex(row: number, col: number): boolean;
    getRow(row: number): IterableIterator<ICell<T>>;
    getCol(col: number): IterableIterator<ICell<T>>;
    getCells(): IterableIterator<ICell<T>>;
    private createIndex(row, col);
}
