import { CellType } from 'app/maze/CellType';
import { Maze } from 'app/maze/Maze';
import { Path } from 'app/maze/Path';
import { IRenderer } from 'app/render/IRenderer';
import { Maybe } from 'app/monad/Maybe';
import { ICell } from 'app/grid/ICell';

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

            if (cell.value === CellType.ClosedDoor || cell.value === CellType.Wall) {
                text += '*';
            } else {
                text += ' ';
            }
        }

        this._element.innerText = text;

        parent.appendChild(this._element);
    }

    plot(path: Path): void {
        let index: number = 0;

        const draw: Function = (): void => {
            if (index >= path.length) {
                return;
            }

            let text: string = '';
            let row: number = 0;

            for (const cell of this._maze.getCells()) {
                const p: Maybe<ICell<CellType>> = path.findByPosition(cell.position, index);

                if (cell.position.row !== row) {
                    text += NEW_LINE;
                    row = cell.position.row;
                }

                if (p.hasValue()) {
                    text += '0';
                } else if (cell.value === CellType.ClosedDoor || cell.value === CellType.Wall) {
                    text += '*';
                } else {
                    text += ' ';
                }
            }

            this._element.innerText = text;

            index += 1;

            window.setTimeout(draw, 50);
        };

        draw();
    }
}
