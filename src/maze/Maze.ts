import { Grid } from 'app/grid/Grid';
import { ICell } from 'app/grid/ICell';
import { IPosition } from 'app/grid/IPosition';
import { CellType } from 'app/maze/CellType';
import { Maybe } from 'app/monad/Maybe';

/**
 * A Maze contains of a grid with doors and rooms.
 * Start and end always with a door.
 * A room has on each four sides a door.
 *
 * +-+-+-+-+
 * | | | | |
 * +-+-+-+-+
 * | | | | |
 * +-+-+-+-+
 * | | | | |
 * +-+-+-+-+
 *
 * The maze will be formed by doors that are closed or open.
 */

export class Maze {
    private readonly _horizontalRooms: number;
    private readonly _verticalRooms: number;
    private readonly _width: number;
    private readonly _height: number;
    private readonly _grid: Grid<CellType>;

    get horizontalRooms(): number {
        return this._horizontalRooms;
    }

    get verticalRooms(): number {
        return this._verticalRooms;
    }

    get width(): number {
        return this._width;
    }

    get height(): number {
        return this._height;
    }

    public constructor(horizontalRooms: number, verticalRooms: number) {
        this._horizontalRooms = horizontalRooms;
        this._verticalRooms = verticalRooms;

        this._width = (horizontalRooms * 2) + 1;
        this._height = (verticalRooms * 2) + 1;

        this._grid = this.createGrid();
    }

    public isValidPathPosition(position: IPosition): boolean {
        return (
            position.row % 2 === 1 || position.col % 2 === 1
        );
    }

    public getCell(position: IPosition): Maybe<ICell<CellType>> {
        return Maybe.fromValue(this._grid.getCell(position));
    }

    public getCells(): IterableIterator<ICell<CellType>> {
        return this._grid.getCells();
    }

    private createGrid(): Grid<CellType> {
        const rows: number = (this._width * 2) + 1;
        const cols: number = (this._height * 2) + 1;

        return new Grid<CellType>(
            rows,
            cols,
            (position: IPosition): CellType => {
                let type: CellType = CellType.Room;

                if (
                    position.row === 0 ||
                    position.row === rows - 1 ||
                    position.col === 0 ||
                    position.col === cols - 1
                ) {
                    type = CellType.Wall;
                } else if (
                    position.row % 2 === 1 ||
                    position.col % 2 === 1
                ) {
                    type = CellType.ClosedDoor;
                }

                return type;
            }
        );
    }
}
