import { degreesToRadians, radiansToDegrees } from 'app/geometry/angle';

describe('angle', (): void => {
    describe('degreesToRadians', (): void => {
        it('transform degrees to radians', (): void => {
            expect(degreesToRadians(0)).toBe(0);
            expect(degreesToRadians(90)).toBe(Math.PI / 2);
            expect(degreesToRadians(180)).toBe(Math.PI);
        });
    });

    describe('radiansToDegrees', (): void => {
        it('transform radians to degrees', (): void => {
            expect(radiansToDegrees(0)).toBe(0);
            expect(radiansToDegrees(Math.PI / 2)).toBe(90);
            expect(radiansToDegrees(Math.PI)).toBe(180);
        });
    });
});
