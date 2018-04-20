import { Grid } from 'app/grid/Grid';
import { IPosition } from 'app/grid/IPosition';
import { CellType } from 'app/maze/CellType';
import { IRenderer } from 'app/render/IRenderer';

export interface IOptions {
    pathWidth: number;
    pathHeight: number;
    pathColor: string;
    wallWidth: number;
    wallHeight: number;
    wallColor: string;
}

export class CanvasRenderer implements IRenderer {
    private readonly matrix: Grid<CellType>;
    private readonly canvas: HTMLCanvasElement;
    private readonly context: CanvasRenderingContext2D;
    private readonly options: IOptions;

    constructor(matrix: Grid<CellType>, options: IOptions) {
        this.matrix = matrix;
        this.options = options;

        this.canvas = document.createElement('canvas');
        this.canvas.setAttribute('width', String(this.getX(this.matrix.cols)));
        this.canvas.setAttribute('height', String(this.getY(this.matrix.rows)));

        this.context = this.canvas.getContext('2d');
    }

    render(parent: HTMLElement): void {
        for (const cell of this.matrix.getCells()) {
            const x: number = this.getX(cell.col);
            const y: number = this.getY(cell.row);
            const width: number = cell.col % 2 === 0 ? this.options.wallWidth : this.options.pathWidth;
            const height: number = cell.row % 2 === 0 ? this.options.wallHeight : this.options.pathHeight;
            let color: string;

            if (this.isPath(cell.row, cell.col) || cell.value === CellType.Wall) {
                color = this.options.pathColor;
            } else {
                color = this.options.wallColor;
            }

            this.drawRectangle(
                x,
                y,
                width,
                height,
                color
            );
        }

        parent.appendChild(this.canvas);
    }

    plot(path: IPosition[]): void {
        // TODO
    }

    private isPath(row: number, col: number): boolean {
        return row % 2 === 1 && col % 2 === 1;
    }

    private getX(col: number): number {
        const wallCount: number = this.getWallCount(col);
        const pathCount: number = this.getPathCount(col);

        return (wallCount * this.options.wallWidth) + (pathCount * this.options.pathWidth);
    }

    private getY(row: number): number {
        const wallCount: number = this.getWallCount(row);
        const pathCount: number = this.getPathCount(row);

        return (wallCount * this.options.wallHeight) + (pathCount * this.options.pathHeight);
    }

    private getWallCount(unit: number): number {
        return Math.ceil(unit / 2);
    }

    private getPathCount(unit: number): number {
        return Math.floor(unit / 2);
    }

    private drawRectangle(x: number, y: number, width: number, height: number, color: string): void {
        this.context.beginPath();
        this.context.rect(x, y, width, height);
        this.context.fillStyle = color;
        this.context.fill();
    }
}
