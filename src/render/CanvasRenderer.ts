import { ICell } from 'app/grid/ICell';
import { CellType } from 'app/maze/CellType';
import { Maze } from 'app/maze/Maze';
import { Path } from 'app/maze/Path';
import { Maybe } from 'app/monad/Maybe';
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

    public render(parent: HTMLElement): void {
        for (const cell of this._maze.getCells()) {
            let color: string;

            if (cell.value === CellType.Wall || cell.value === CellType.ClosedDoor) {
                color = this._options.wallColor;
            } else {
                color = this._options.roomColor;
            }

            this.drawCell(cell, color);
        }

        parent.appendChild(this._canvas);
    }

    public async plot(path: Path): Promise<void> {
        //tslint:disable-next-line promise-must-complete
        return new Promise<void>((resolve: Function, reject: Function): void => {
            const pathCells: IterableIterator<Maybe<ICell<CellType>>> = path.getCells();
            const optimizedCells: IterableIterator<Maybe<ICell<CellType>>> = path.getOptimized();

            const drawOptimized: Function = (): void => {
                const next: IteratorResult<Maybe<ICell<CellType>>> = optimizedCells.next();

                if (next.done) {
                    return resolve();
                }

                this.drawCell(next.value.value, this._options.optimizedColor);

                window.setTimeout(drawOptimized, this._options.speed);
            };

            const drawPath: Function = (): void => {
                const next: IteratorResult<Maybe<ICell<CellType>>> = pathCells.next();

                if (next.done) {
                    return drawOptimized();
                }

                this.drawCell(next.value.value, this._options.pathColor);

                window.setTimeout(drawPath, this._options.speed);
            };

            drawPath();
        });
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

    private drawCell(cell: ICell<CellType>, color: string): void {
        const x: number = this.getX(cell.position.col);
        const y: number = this.getY(cell.position.row);
        const width: number = cell.position.col % 2 === 1 ? this._options.roomWidth : this._options.wallWidth;
        const height: number = cell.position.row % 2 === 1 ? this._options.roomHeight : this._options.wallHeight;

        this.drawRectangle(x, y, width, height, color);
    }

    private drawRectangle(x: number, y: number, width: number, height: number, color: string): void {
        this._context.beginPath();
        this._context.rect(x, y, width, height);
        this._context.fillStyle = color;
        this._context.fill();
    }
}
