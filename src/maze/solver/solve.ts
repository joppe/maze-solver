import { Vector } from 'app/geometry/Vector';
import { ICell } from 'app/grid/ICell';
import { CellType, isEntrance, isExit, isOpenDoor, isRoom } from 'app/maze/CellType';
import { startDirection } from 'app/maze/helper/startDirection';
import { IPossibility } from 'app/maze/IPossibility';
import { Maze } from 'app/maze/Maze';
import { Path } from 'app/maze/Path';
import { Maybe } from 'app/monad/Maybe';

function findStart(maze: Maze): Maybe<ICell<CellType>> {
    const row: number = 0;

    for (let col: number = 0; col < maze.width; col += 1) {
        const cell: Maybe<ICell<CellType>> = maze.getCell({
            col,
            row
        });

        if (isEntrance(cell)) {
            return cell;
        }
    }
}

export function solve(maze: Maze): Path {
    const path: Path = new Path();
    const start: Maybe<ICell<CellType>> = findStart(maze);
    const direction: Vector = startDirection(start.value.position, maze.width, maze.height);
    const room: Maybe<ICell<CellType>> = maze.nextCell(start, direction);

    function findPath(currentCell: Maybe<ICell<CellType>>, currentDirection: Vector): boolean {
        const possibilities: Array<IPossibility> = maze.getPossibilities(currentCell, currentDirection);

        for (const possibility of possibilities) {
            if (isExit(possibility.door)) {
                if (isRoom(possibility.room)) {
                    path.add(possibility.room);
                    path.mark(1);
                }

                path.add(possibility.door);
                path.mark(1);

                return true;
            }
        }

        for (const possibility of possibilities) {
            if (
                isOpenDoor(possibility.door) &&
                path.has(possibility.door) === false &&
                isRoom(possibility.room) &&
                path.has(possibility.room) === false
            ) {
                path.add(possibility.door);
                path.add(possibility.room);
                path.mark(2);

                if (findPath(possibility.room, possibility.direction)) {
                    return true;
                }

                path.release(2);
            }
        }

        return false;
    }

    path.add(start);
    path.add(room);
    path.mark(2);

    findPath(room, direction);

    return path;
}
