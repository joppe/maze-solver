import { shuffle } from 'app/array/shuffle';
import { Vector } from 'app/geometry/Vector';
import { ICell } from 'app/grid/ICell';
import { IPosition } from 'app/grid/IPosition';
import { CellType, isClosedDoor, isUnset } from 'app/maze/CellType';
import { startDirection } from 'app/maze/helper/startDirection';
import { IPossibility } from 'app/maze/IPossibility';
import { Maze } from 'app/maze/Maze';
import { Maybe } from 'app/monad/Maybe';
import { random } from 'app/number/random';

export function randomRoomCol(horizontalRooms: number): number {
    return (random(0, horizontalRooms - 1) * 2) + 1;
}

export function startCell(maze: Maze, horizontalRooms: number): Maybe<ICell<CellType>> {
    return maze.getCell({
        col: randomRoomCol(horizontalRooms),
        row: 0
    });
}

export function endCell(maze: Maze, horizontalRooms: number): Maybe<ICell<CellType>> {
    return maze.getCell({
        col: randomRoomCol(horizontalRooms),
        row: maze.height - 1
    });
}

export function createPath(maze: Maze, currentCell: Maybe<ICell<CellType>>, currentDirection: Vector): void {
    const possibilities: Array<IPossibility> = shuffle(maze.getPossibilities(currentCell, currentDirection));

    possibilities.forEach((possibility: IPossibility): void => {
        if (
            isClosedDoor(possibility.door) &&
            isUnset(possibility.room)
        ) {
            possibility.door.value.value = CellType.OpenDoor;
            possibility.room.value.value = CellType.Room;

            createPath(maze, possibility.room, possibility.direction);
        }
    });
}

export function generate(horizontalSize: number, verticalSize: number): Maze {
    const maze: Maze = new Maze(horizontalSize, verticalSize);

    // This is a cell on the outside of the maze, a wall
    const start: Maybe<ICell<CellType>> = startCell(maze, horizontalSize);
    // This is a cell on the outside of the maze, a wall
    const end: Maybe<ICell<CellType>> = endCell(maze, horizontalSize);

    const direction: Vector = startDirection(start.value.position, maze.width, maze.height);
    const room: Maybe<ICell<CellType>> = maze.nextCell(start, direction);

    start.value.value = CellType.Entrance;
    room.value.value = CellType.Room;
    end.value.value = CellType.Exit;

    createPath(maze, room, direction);

    return maze;
}
