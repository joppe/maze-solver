import { ICell } from 'app/grid/ICell';
import { IPosition } from 'app/grid/IPosition';
import { CellType } from 'app/maze/CellType';
import { containsPosition } from 'app/maze/helper/containsPosition';
import { Maze } from 'app/maze/Maze';
import { Path } from 'app/maze/Path';
import { Maybe } from 'app/monad/Maybe';
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
        const cells: IterableIterator<Maybe<ICell<CellType>>> = path.getCells();
        const positions: IPosition[] = [];

        const draw: Function = (): void => {
            const next: IteratorResult<Maybe<ICell<CellType>>> = cells.next();

            if (next.done) {
                return;
            }

            let text: string = '';
            let row: number = 0;

            positions.push(next.value.value.position);

            for (const cell of this._maze.getCells()) {
                if (cell.position.row !== row) {
                    text += NEW_LINE;
                    row = cell.position.row;
                }

                if (containsPosition(positions, cell.position)) {
                    text += '0';
                } else if (cell.value === CellType.ClosedDoor || cell.value === CellType.Wall) {
                    text += '*';
                } else {
                    text += ' ';
                }
            }

            this._element.innerText = text;

            window.setTimeout(draw, 50);
        };

        draw();
    }
}
