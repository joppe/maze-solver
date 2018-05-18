import { random } from '../../../src/array/random';

describe('random', (): void => {
    it('return a random element of an array', (): void => {
        const a: Array<number> = [1, 20, 5, 1243, 4];

        for (let i: number = 0; i < 100; i += 1) {
            expect(a.indexOf(random(a))).toBeGreaterThan(-1);
        }
    });
});
