import { shuffle } from '../../../src/array/shuffle';

describe('shuffle', (): void => {
    it('return an array of the same length', (): void => {
        const a: Array<number> = [1, 20, 5, 1243, 4];
        const b: Array<number> = shuffle(a);

        expect(a.length).toBe(b.length);
    });

    it('return an array with the same elements', (): void => {
        const a: Array<number> = [1, 20, 5, 1243, 4];
        const b: Array<number> = shuffle(a);

        a.forEach((n: number): void => {
            expect(b.indexOf(n)).toBeGreaterThan(-1);
        });
    });

    it('return an array with a different ordering', (): void => {
        const a: Array<number> = [1, 20, 5, 1243, 4];
        const aStr: string = a.join(''); // '120512344'
        const tries: number = 10;
        let count: number = tries;
        let same: number = 0;

        while (count > 0) {
            const b: Array<number> = shuffle(a);
            const bStr: string = b.join('');

            if (bStr === aStr) {
                same += 1;
            }

            count -= 1;
        }

        expect(same).toBeLessThan(tries);
    });
});
