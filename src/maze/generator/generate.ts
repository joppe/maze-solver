import { shuffle } from 'app/array/shuffle';
import { Vector } from 'app/geometry/Vector';
import { ICell } from 'app/grid/ICell';
import { CellType, isClosedDoor, isUnset } from 'app/maze/CellType';
import { startDirection } from 'app/maze/helper/startDirection';
import { IPossibility } from 'app/maze/IPossibility';
import { Maze } from 'app/maze/Maze';
import { Maybe } from 'app/monad/Maybe';
import { random } from 'app/number/random';

/**
 * Rewrite to function
 */
export function generate(horizontalRooms: number, verticalRooms: number): Maze {
    const maze: Maze = new Maze(
        (horizontalRooms * 2) + 1,
        (verticalRooms * 2) + 1
    );
    const start: Maybe<ICell<CellType>> = maze.getCell({
        col: (random(1, horizontalRooms) * 2) - 1,
        row: 0
    });
    const end: Maybe<ICell<CellType>> = maze.getCell({
        col: (random(1, verticalRooms) * 2) - 1,
        row: maze.height - 1
    });
    const direction: Vector = startDirection(start.value.position, maze.width, maze.height);
    const room: Maybe<ICell<CellType>> = maze.nextCell(start, direction);

    function createPath(currentCell: Maybe<ICell<CellType>>, currentDirection: Vector): void {
        const possibilities: IPossibility[] = shuffle(maze.getPossibilities(currentCell, currentDirection));

        possibilities.forEach((possibility: IPossibility): void => {
            if (
                isClosedDoor(possibility.door) &&
                isUnset(possibility.room)
            ) {
                possibility.door.value.value = CellType.OpenDoor;
                possibility.room.value.value = CellType.Room;

                createPath(possibility.room, possibility.direction);
            }
        });
    }

    start.value.value = CellType.Entrance;
    room.value.value = CellType.Room;
    end.value.value = CellType.Exit;

    createPath(room, direction);

    return maze;
}
