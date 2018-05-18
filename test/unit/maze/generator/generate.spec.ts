import { Maze } from '../../../../src/maze/Maze';
import { startCell, endCell } from '../../../../src/maze/generator/generate';
import { Maybe } from '../../../../src/monad/Maybe';
import { ICell } from '../../../../src/grid/ICell';
import { CellType } from '../../../../src/maze/CellType';

describe('generate', (): void => {
    describe('startCell', (): void => {
        it('Generate a random cell on the top row of the maze', (): void => {
            const cols: number = 10;
            const rows: number = 30;
            const maze: Maze = new Maze(cols, rows);

            for (let i: number = 0; i < 100; i += 1) {
                const start: Maybe<ICell<CellType>> = startCell(maze, cols);
                const c: number = start.value.position.col;
                const r: number = start.value.position.row;

                expect(c).toBeGreaterThanOrEqual(1);
                expect(c).toBeLessThanOrEqual(maze.width - 2);
                expect(r).toBe(0);
            }
        });
    });

    describe('endCell', (): void => {
        it('Generate a random cell on the bottom row of the maze', (): void => {
            const cols: number = 40;
            const rows: number = 10;
            const maze: Maze = new Maze(cols, rows);

            for (let i: number = 0; i < 100; i += 1) {
                const start: Maybe<ICell<CellType>> = endCell(maze, cols);
                const c: number = start.value.position.col;
                const r: number = start.value.position.row;

                expect(c).toBeGreaterThanOrEqual(1);
                expect(c).toBeLessThanOrEqual(maze.width - 2);
                expect(r).toBe(maze.height - 1);
            }
        });
    });
});
