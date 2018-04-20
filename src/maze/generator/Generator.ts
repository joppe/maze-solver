import { Vector } from 'app/geometry/Vector';
import { IPosition } from 'app/grid/IPosition';
import { CellType } from 'app/maze/CellType';
import { equalPosition } from 'app/maze/helper/equalPosition';
import { randomSidePosition } from 'app/maze/helper/randomSidePosition';
import { roomToCellPosition } from 'app/maze/helper/roomToCellPosition';
import { startDirection } from 'app/maze/helper/startDirection';
import { Maze } from 'app/maze/Maze';

export class Generator {
    private _maze: Maze;

    public constructor(maze: Maze) {
        this._maze = maze;
    }

    public generate(): void {
        this.reset();

        const start: IPosition = this.randomStart();
        const end: IPosition = this.randomEnd(start);
        const direction: Vector = startDirection(start, this._maze.width, this._maze.height);

    }

    private randomEnd(start: IPosition): IPosition {
        let end: IPosition;

        while (end === undefined || equalPosition(start, end)) {
            const roomPosition: IPosition = randomSidePosition(this._maze.horizontalRooms, this._maze.verticalRooms);

            end = roomToCellPosition(roomPosition);
        }

        return end;
    }

    private randomStart(): IPosition {
        const roomPosition: IPosition = randomSidePosition(this._maze.horizontalRooms, this._maze.verticalRooms);

        return roomToCellPosition(roomPosition);
    }

    private reset(): void {
        for (const cell of this._maze.getCells()) {
            if (cell.value === CellType.OpenDoor) {
                cell.value = CellType.ClosedDoor;
            }
        }
    }
}
