import { Grid } from '../../../src/grid/Grid';
import { ICell } from '../../../src/grid/ICell';

describe('Grid', (): void => {
    describe('length', (): void => {
        it('is the product of the rows and columns', (): void => {
            const grid: Grid<number> = new Grid<number>(10, 10);

            expect(grid.length).toBe(100);
        });
    });

    describe('cols', (): void => {
        it('getter for the private cols property', (): void => {
            const grid: Grid<string> = new Grid(2, 6);

            expect(grid.cols).toBe(6);
        });
    });

    describe('rows', (): void => {
        it('getter for the private rows property', (): void => {
            const grid: Grid<string> = new Grid(2, 6);

            expect(grid.rows).toBe(2);
        });
    });

    describe('setCell', (): void => {
        it('set the value property of a cell', (): void => {
            const grid: Grid<boolean> = new Grid(4, 4, (): boolean => true);

            grid.setCell({row: 0, col: 1}, true);

            expect((): void => {
                grid.setCell({row: 6, col: 1}, true);
            }).toThrow();
        });
    });

    describe('getCell', (): void => {
        it('get the cell at a given col and row value', (): void => {
            const grid: Grid<boolean> = new Grid(4, 4, (): boolean => false);

            expect(grid.getCell({row: 1, col: 1})).toEqual({
                position: {
                    col: 1,
                    row: 1
                },
                value: false
            });

            expect(grid.getCell({row: 6, col: 2})).toBeUndefined();
        });
    });

    describe('isValidPosition', (): void => {
        it('check if the given position is valid', (): void => {
            const grid: Grid<boolean> = new Grid(14, 41, (): boolean => true);

            expect(grid.isValidPosition({row: 10, col: 4})).toBe(true);
            expect(grid.isValidPosition({row: 100, col: 4})).toBe(false);
        });
    });

    describe('getRow', (): void => {
        it('returns all the cells in a single row', (): void => {
            const grid: Grid<number> = new Grid(4, 6, (): number => 10);
            const cells: IterableIterator<ICell<number>> = grid.getRow(0);
            let count : number = 0;

            for (const cell of cells) {
                expect(cell.position.col).toBe(count);

                count += 1;
            }

            expect(count).toBe(6);
        });
    });

    describe('getCol', (): void => {
        it('returns all the cells in a single column', (): void => {
            const grid: Grid<number> = new Grid(4, 6, (): number => 10);
            const cells: IterableIterator<ICell<number>> = grid.getCol(0);
            let count : number = 0;

            for (const cell of cells) {
                expect(cell.position.row).toBe(count);

                count += 1;
            }

            expect(count).toBe(4);
        });
    });

    describe('getCells', (): void => {
        it('returns all the cells', (): void => {
            const grid: Grid<number> = new Grid(4, 6, (): number => 10);
            const cells: IterableIterator<ICell<number>> = grid.getCells();
            let count : number = 0;

            for (const cell of cells) {
                count += 1;
            }

            expect(count).toBe(24);
        });
    });
});
