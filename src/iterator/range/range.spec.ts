import { range } from './range';

describe('range', () => {
  it('throw an error when the start value is larger than the end value', () => {
    expect(() => {
      range(10, 1);
    }).toThrowError();
  });

  it('create an iterable with a start and end', () => {
    const values = [];
    const r = range(0, 10);

    for (const i of r) {
      values.push(i);
    }

    expect(values).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  });

  it('with the step the differences between consecutive values can be set', () => {
    const values = [];

    for (const i of range(0, 10, 5)) {
      values.push(i);
    }

    expect(values).toEqual([0, 5, 10]);
  });
});
