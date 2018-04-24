import { IPosition } from 'app/grid/IPosition';
import { CellType } from 'app/maze/CellType';
import { findInPath } from 'app/maze/helper/findInPath';
import { Maze } from 'app/maze/Maze';
import { IRenderer } from 'app/render/IRenderer';

// tslint:disable-next-line quotemark
const NEW_LINE: string = "\n";

export class AsciiRenderer implements IRenderer {
    private readonly _maze: Maze;
    private readonly _element: HTMLElement;

    constructor(matrix: Maze) {
        this._maze = matrix;

        this._element = window.document.createElement('pre');
        this._element.setAttribute('style', 'line-height: 0.6; padding: 5px;');
    }

    render(parent: HTMLElement): void {
        let text: string = '';
        let row: number = 0;

        for (const cell of this._maze.getCells()) {
            if (cell.position.row !== row) {
                text += NEW_LINE;
                row = cell.position.row;
            }

            if (cell.value === CellType.Wall) {
                text += '*';
            } else if (cell.value === CellType.OpenDoor || cell.value === CellType.Room) {
                text += ' ';
            } else {
                text += '+';
            }
        }

        this._element.innerText = text;

        parent.appendChild(this._element);
    }

    plot(path: IPosition[]): void {
        let text: string = '';
        let row: number = 0;

        for (const cell of this._maze.getCells()) {
            const position: IPosition | undefined = findInPath(cell.position, path);

            if (cell.position.row !== row) {
                text += NEW_LINE;
                row = cell.position.row;
            }

            if (position !== undefined || cell.value === CellType.OpenDoor || cell.value === CellType.Room) {
                text += ' ';
            } else if (cell.value === CellType.Wall) {
                text += '*';
            } else {
                text += '+';
            }
        }

        this._element.innerText = text;
    }
}
