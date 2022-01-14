import { range } from '../range/range';
import { map } from './map';

describe('map', () => {
  it('returns an array with mapped values', () => {
    const result = map(range(0, 10), (i) => i * 2);

    expect(result).toEqual([0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20]);
  });
});
