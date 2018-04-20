import { CellType } from 'app/maze/CellType';
import { Grid } from 'app/grid/Grid';
import { IPosition } from 'app/grid/IPosition';
import { IRenderer } from 'app/render/IRenderer';

export class AsciiRenderer implements IRenderer {
    private matrix: Grid<CellType>;

    constructor(matrix: Grid<CellType>) {
        this.matrix = matrix;
    }

    render(parent: HTMLElement): void {
        let text: string = '';
        let row: number = 0;

        for (const cell of this.matrix.getCells()) {
            if (cell.row !== row) {
                // tslint:disable-next-line quotemark
                text += "\n";
                row = cell.row;
            }

            if (cell.value === CellType.Wall) {
                text += '*';
            } else if (cell.value === CellType.OpenDoor || cell.value === CellType.Room) {
                text += ' ';
            } else {
                text += '+';
            }
        }

        parent.innerText = text;
    }

    plot(path: IPosition[]): void {
        // TODO
    }
}
