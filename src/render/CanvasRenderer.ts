import { ICell } from 'app/grid/ICell';
import { CellType } from 'app/maze/CellType';
import { Maze } from 'app/maze/Maze';
import { Path } from 'app/maze/Path';
import { Maybe } from 'app/monad/Maybe';
import { IRenderer } from 'app/render/IRenderer';

export interface IOptions {
    pathColor: string;
    roomWidth: number;
    roomHeight: number;
    roomColor: string;
    speed: number;
    wallWidth: number;
    wallHeight: number;
    wallColor: string;
}

export class CanvasRenderer implements IRenderer {
    private readonly _maze: Maze;
    private readonly _canvas: HTMLCanvasElement;
    private readonly _context: CanvasRenderingContext2D;
    private readonly _options: IOptions;

    constructor(maze: Maze, options: IOptions) {
        this._maze = maze;
        this._options = options;

        this._canvas = window.document.createElement('canvas');
        this._canvas.setAttribute('width', String(this.getX(this._maze.width)));
        this._canvas.setAttribute('height', String(this.getY(this._maze.height)));

        this._context = this._canvas.getContext('2d');
    }

    render(parent: HTMLElement): void {
        for (const cell of this._maze.getCells()) {
            const x: number = this.getX(cell.position.col);
            const y: number = this.getY(cell.position.row);
            const width: number = cell.position.col % 2 === 1 ? this._options.roomWidth : this._options.wallWidth;
            const height: number = cell.position.row % 2 === 1 ? this._options.roomHeight : this._options.wallHeight;
            let color: string;

            if (cell.value === CellType.Wall || cell.value === CellType.ClosedDoor) {
                color = this._options.wallColor;
            } else {
                color = this._options.roomColor;
            }

            this.drawRectangle(
                x,
                y,
                width,
                height,
                color
            );
        }

        parent.appendChild(this._canvas);
    }

    plot(path: Path): void {
        let index: number = 0;

        const draw: Function = (): void => {
            if (index >= path.length) {
                return;
            }

            const m: Maybe<ICell<CellType>> = path.get(index);
            const cell: ICell<CellType> = m.value;
            const x: number = this.getX(cell.position.col);
            const y: number = this.getY(cell.position.row);
            const width: number = cell.position.col % 2 === 1 ? this._options.roomWidth : this._options.wallWidth;
            const height: number = cell.position.row % 2 === 1 ? this._options.roomHeight : this._options.wallHeight;
            const color: string = this._options.pathColor;

            this.drawRectangle(
                x,
                y,
                width,
                height,
                color
            );

            index += 1;

            window.setTimeout(draw, this._options.speed);
        };

        draw();
    }

    private getX(col: number): number {
        const wallCount: number = this.getWallCount(col);
        const pathCount: number = this.getPathCount(col);

        return (wallCount * this._options.wallWidth) + (pathCount * this._options.roomWidth);
    }

    private getY(row: number): number {
        const wallCount: number = this.getWallCount(row);
        const pathCount: number = this.getPathCount(row);

        return (wallCount * this._options.wallHeight) + (pathCount * this._options.roomHeight);
    }

    private getWallCount(unit: number): number {
        return Math.ceil(unit / 2);
    }

    private getPathCount(unit: number): number {
        return Math.floor(unit / 2);
    }

    private drawRectangle(x: number, y: number, width: number, height: number, color: string): void {
        this._context.beginPath();
        this._context.rect(x, y, width, height);
        this._context.fillStyle = color;
        this._context.fill();
    }
}
