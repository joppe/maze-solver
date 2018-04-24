import { shuffle } from 'app/array/shuffle';
import { Vector } from 'app/geometry/Vector';
import { ICell } from 'app/grid/ICell';
import { CellType, isClosedDoor, isUnset } from 'app/maze/CellType';
import { startDirection } from 'app/maze/helper/startDirection';
import { IPossibility } from 'app/maze/IPossibility';
import { Maze } from 'app/maze/Maze';
import { Maybe } from 'app/monad/Maybe';
import { random } from 'app/number/random';

export class Generator {
    private readonly _horizontalRooms: number;
    private readonly _verticalRooms: number;

    public constructor(horizontalRooms: number, verticalRooms: number) {
        this._horizontalRooms = horizontalRooms;
        this._verticalRooms = verticalRooms;
    }

    public generate(): Maze {
        const maze: Maze = new Maze(
            (this._horizontalRooms * 2) + 1,
            (this._verticalRooms * 2) + 1
        );
        const start: Maybe<ICell<CellType>> = maze.getCell({
            col: (random(1, this._horizontalRooms) * 2) - 1,
            row: 0
        });
        const end: Maybe<ICell<CellType>> = maze.getCell({
            col: (random(1, this._verticalRooms) * 2) - 1,
            row: maze.height - 1
        });
        const direction: Vector = startDirection(start.value.position, maze.width, maze.height);
        const room: Maybe<ICell<CellType>> = maze.nextCell(start, direction);

        start.value.value = CellType.OpenDoor;
        room.value.value = CellType.Room;
        end.value.value = CellType.OpenDoor;

        this.createPath(room, direction, maze);

        return maze;
    }

    private createPath(cell: Maybe<ICell<CellType>>, direction: Vector, maze: Maze): void {
        const possibilities: IPossibility[] = shuffle(maze.possiblePositions(cell, direction));

        possibilities.forEach((possibility: IPossibility): void => {
            if (
                isClosedDoor(possibility.door) &&
                isUnset(possibility.room)
            ) {
                possibility.door.value.value = CellType.OpenDoor;
                possibility.room.value.value = CellType.Room;

                this.createPath(possibility.room, possibility.direction, maze);
            }
        });
    }
}
