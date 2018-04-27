import { Maze } from 'app/maze/Maze';
import { Path } from 'app/maze/Path';
import { IRenderer } from 'app/render/IRenderer';
export interface IOptions {
    optimizedColor: string;
    pathColor: string;
    roomWidth: number;
    roomHeight: number;
    roomColor: string;
    speed: number;
    wallWidth: number;
    wallHeight: number;
    wallColor: string;
}
export declare class CanvasRenderer implements IRenderer {
    private readonly _maze;
    private readonly _canvas;
    private readonly _context;
    private readonly _options;
    constructor(maze: Maze, options: IOptions);
    render(parent: HTMLElement): void;
    plot(path: Path): void;
    private getX(col);
    private getY(row);
    private getWallCount(unit);
    private getPathCount(unit);
    private drawCell(cell, color);
    private drawRectangle(x, y, width, height, color);
}
