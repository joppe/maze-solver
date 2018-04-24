import { Maze } from 'app/maze/Maze';
export declare class Generator {
    private readonly _horizontalRooms;
    private readonly _verticalRooms;
    constructor(horizontalRooms: number, verticalRooms: number);
    generate(): Maze;
    private createPath(cell, direction, maze);
}
