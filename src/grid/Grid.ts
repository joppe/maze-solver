import { ICell } from 'app/grid/ICell';
import { IPosition } from 'app/grid/IPosition';
import { IValueFactory } from 'app/grid/IValueFactory';
import { IDictionary } from 'app/object/IDictionary';

export class Grid<T> {
    private readonly _rows: number;
    private readonly _cols: number;
    private readonly _length: number;
    private _cells: IDictionary<ICell<T>> = {};

    get length(): number {
        return this._length;
    }

    get cols(): number {
        return this._cols;
    }

    get rows(): number {
        return this._rows;
    }

    public constructor(rows: number, cols: number, valueFactory: IValueFactory<T> = (): undefined => undefined) {
        this._rows = rows;
        this._cols = cols;
        this._length = rows * cols;

        for (let row: number = 0; row < this._rows; row += 1) {
            for (let col: number = 0; col < this._cols; col += 1) {
                const position: IPosition = {
                    col,
                    row
                };

                this._cells[this.createIndex(position)] = {
                    position,
                    value: valueFactory(position)
                };
            }
        }
    }

    public setCell(position: IPosition, value: T): void {
        const cell: ICell<T> = this.getCell(position);

        if (cell === undefined) {
            throw new Error(`Not existing cell at position row: ${position.row} and col: ${position.col}`);
        }

        cell.value = value;
    }

    public getCell(position: IPosition): ICell<T> | undefined {
        const index: string = this.createIndex(position);

        return this._cells[index];
    }

    public isValidPosition(position: IPosition): boolean {
        const index: string = this.createIndex(position);

        return this._cells[index] !== undefined;
    }

    public * getRow(row: number): IterableIterator<ICell<T>> {
        for (let col: number = 0; col < this._cols; col += 1) {
            yield this.getCell({
                col,
                row
            });
        }
    }

    public * getCol(col: number): IterableIterator<ICell<T>> {
        for (let row: number = 0; row < this._rows; row += 1) {
            yield this.getCell({
                col,
                row
            });
        }
    }

    public * getCells(): IterableIterator<ICell<T>> {
        for (let row: number = 0; row < this._rows; row += 1) {
            for (let col: number = 0; col < this._cols; col += 1) {
                yield this.getCell({
                    col,
                    row
                });
            }
        }
    }

    private createIndex(position: IPosition): string {
        return `${position.row}-${position.col}`;
    }
}
