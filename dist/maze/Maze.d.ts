import { Vector } from 'app/geometry/Vector';
import { ICell } from 'app/grid/ICell';
import { IPosition } from 'app/grid/IPosition';
import { CellType } from 'app/maze/CellType';
import { IPossibility } from 'app/maze/IPossibility';
import { Maybe } from 'app/monad/Maybe';
export declare class Maze {
    private readonly _width;
    private readonly _height;
    private readonly _grid;
    readonly width: number;
    readonly height: number;
    constructor(width: number, height: number);
    getCell(position: IPosition): Maybe<ICell<CellType>>;
    getCells(): IterableIterator<ICell<CellType>>;
    getPossibilities(cell: Maybe<ICell<CellType>>, direction: Vector): IPossibility[];
    nextCell(cell: Maybe<ICell<CellType>>, direction: Vector): Maybe<ICell<CellType>>;
    private createGrid();
}
