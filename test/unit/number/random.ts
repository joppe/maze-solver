import { random } from 'app/number/random';

describe('random', (): void => {
    it('generates a random number with a min and max value', (): void => {
        const min: number = 10;
        const max: number = 20;

        for (let i: number = 0; i < 100; i += 1) {
            const value: number = random(min, max);

            expect(value).toBeGreaterThanOrEqual(min);
            expect(value).toBeLessThanOrEqual(max);
        }
    });
});
