import { Grid } from './Grid';

describe('grid', () => {
  it('size', () => {
    const grid = new Grid({ columns: 10, rows: 10 });

    expect(grid.size).toEqual(100);
  });

  it('isValidRow', () => {
    const grid = new Grid({ columns: 10, rows: 10 });

    expect(grid.isValidRow(-1)).toBe(false);
    expect(grid.isValidRow(11)).toBe(false);
    expect(grid.isValidRow(1)).toBe(true);
  });

  it('isValidColumn', () => {
    const grid = new Grid({ columns: 10, rows: 10 });

    expect(grid.isValidColumn(-1)).toBe(false);
    expect(grid.isValidColumn(11)).toBe(false);
    expect(grid.isValidColumn(1)).toBe(true);
  });

  it('isValidPosition', () => {
    const grid = new Grid({ columns: 10, rows: 10 });

    expect(grid.isValidPosition({ row: -1, column: 0 })).toBe(false);
    expect(grid.isValidPosition({ row: 2, column: 12 })).toBe(false);
    expect(grid.isValidPosition({ row: 1, column: 0 })).toBe(true);
  });

  it('forEachCells', () => {
    const grid = new Grid({ columns: 10, rows: 10 });
    const result = [];

    grid.forEachCell((cell) => result.push(cell));

    expect(result.length).toBe(100);
  });

  it('getCell', () => {
    const grid = new Grid({ columns: 10, rows: 10 });
    const cell = grid.getCell({ row: 0, column: 1 });

    expect(grid.getCell({ row: 0, column: 12 })).toBe(undefined);
    expect(cell?.row).toBe(0);
  });

  it('assignNeighbours', () => {
    const grid = new Grid({ columns: 10, rows: 10 });
    const northEast = grid.getCell({ row: 0, column: 0 });
    const middle = grid.getCell({ row: 4, column: 4 });

    expect(Array.from(northEast?.neighbours ?? []).length).toEqual(2);
    expect(Array.from(northEast?.neighbours ?? [])?.[0].row).toEqual(0);
    expect(Array.from(northEast?.neighbours ?? [])?.[0].column).toEqual(1);
    expect(Array.from(northEast?.neighbours ?? [])?.[1].row).toEqual(1);
    expect(Array.from(northEast?.neighbours ?? [])?.[1].column).toEqual(0);
    expect(Array.from(middle?.neighbours ?? []).length).toEqual(4);
  });
});
