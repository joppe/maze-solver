import { Vector } from 'app/geometry/Vector';
import { Grid } from 'app/grid/Grid';
import { ICell } from 'app/grid/ICell';
import { IPosition } from 'app/grid/IPosition';
import { CellType, isClosedDoor, isDoor, isRoom, isUnset } from 'app/maze/CellType';
import { IPossibility } from 'app/maze/IPossibility';
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

const ANGLES: Array<number> = [90, 0, -90];

export function sizeToCells(count: number): number {
    return (count * 2) + 1;
}

export class Maze {
    private readonly _width: number;
    private readonly _height: number;
    private readonly _grid: Grid<CellType>;

    get width(): number {
        return this._width;
    }

    get height(): number {
        return this._height;
    }

    public constructor(horizontalSize: number, verticalSize: number) {
        this._width = sizeToCells(horizontalSize);
        this._height = sizeToCells(verticalSize);

        this._grid = this.createGrid();
    }

    public getCell(position: IPosition): Maybe<ICell<CellType>> {
        return Maybe.FROM_VALUE(this._grid.getCell(position));
    }

    public getCells(): IterableIterator<ICell<CellType>> {
        return this._grid.getCells();
    }

    public getPossibilities(cell: Maybe<ICell<CellType>>, direction: Vector): Array<IPossibility> {
        const possibilities: Array<IPossibility> = [];

        ANGLES.forEach((angle: number): void => {
            const nextDirection: Vector = direction.rotate(angle);
            const door: Maybe<ICell<CellType>> = this.nextCell(cell, nextDirection);
            const room: Maybe<ICell<CellType>> = this.nextCell(door, nextDirection);

            possibilities.push({
                direction: nextDirection,
                door,
                room
            });
        });

        return possibilities;
    }

    public nextCell(cell: Maybe<ICell<CellType>>, direction: Vector): Maybe<ICell<CellType>> {
        return cell.flatMap((c: ICell<CellType>): Maybe<ICell<CellType>> => {
            const next: IPosition = {
                col: c.position.col + direction.x,
                row: c.position.row + direction.y
            };

            return this.getCell(next);
        });
    }

    private createGrid(): Grid<CellType> {
        return new Grid<CellType>(
            this.height,
            this.width,
            (position: IPosition): CellType => {
                let type: CellType = CellType.UnSet;

                if (
                    position.row === 0 ||
                    position.row === this.height - 1 ||
                    position.col === 0 ||
                    position.col === this.width - 1
                ) {
                    type = CellType.Wall;
                } else if (
                    position.row % 2 === 0 ||
                    position.col % 2 === 0
                ) {
                    type = CellType.ClosedDoor;
                }

                return type;
            }
        );
    }
}
