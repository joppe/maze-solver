export declare class Vector {
    private _x;
    private _y;
    readonly x: number;
    readonly y: number;
    readonly length: number;
    readonly angle: number;
    constructor(x: number, y: number);
    rotateBy(angle: number): void;
    toString(): string;
}
