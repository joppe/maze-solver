import { indexToPosition } from './indexToPosition';

describe('indexToPosition', () => {
  it('transform', () => {
    expect(indexToPosition(1, 4)).toEqual({ row: 0, column: 1 });
    expect(indexToPosition(9, 4)).toEqual({ row: 2, column: 1 });
  });
});
