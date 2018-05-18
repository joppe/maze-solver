import { Vector } from '../../../src/geometry/Vector';

describe('Vector', (): void => {
    it('getter for x', (): void => {
        const v: Vector = new Vector(1234, 234);

        expect(v.x).toBe(1234);
    });

    it('getter for y', (): void => {
        const v: Vector = new Vector(1234, 234);

        expect(v.y).toBe(234);
    });

    it('get the length of the vector', (): void => {
        const v: Vector = new Vector(3, 4);

        expect(v.length).toBe(5);
    });

    it('get the angle of the vector', (): void => {
        const v1: Vector = new Vector(1, 0);
        const v2: Vector = new Vector(0, 1);

        expect(v1.angle).toBe(0);
        expect(v2.angle).toBe(Math.PI / 2);
    });

    it('rotate returns a new Vector that is rotated with the given amount of degrees', (): void => {
        const v1: Vector = new Vector(10, 0);
        const v2: Vector = v1.rotate(90);

        expect(v1.angle).toBe(0);
        expect(v1.length).toBe(10);
        expect(v2.angle).toBe(Math.PI / 2);
        expect(v2.length).toBe(10);
    });

    it('toString returns a nice formatted string representation of the instance', (): void => {
        const v: Vector = new Vector(34, 0);

        expect(v.toString()).toBe('Vector {x: 34, y: 0, angle: 0, length: 34');
    });
});
