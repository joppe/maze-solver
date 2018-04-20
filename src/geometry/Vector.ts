import { degreesToRadians } from 'app/geometry/angle';

export class Vector {
    private _x: number;
    private _y: number;

    get x(): number {
        return this._x;
    }

    get y(): number {
        return this._y;
    }

    get length():number {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    get angle():number {
        return Math.atan2(this.y, this.x);
    }

    constructor(x: number, y: number) {
        this._x = x;
        this._y = y;
    }

    public rotate(degrees: number): Vector {
        const angle: number = this.angle + degreesToRadians(degrees);
        const length: number = this.length;
        const x: number = this.length * Number(Math.cos(angle).toFixed(10));
        const y: number = this.length * Number(Math.sin(angle).toFixed(10));

        return new Vector(x, y);
    }

    public toString(): string {
        return `Vector {x: ${this.x}, y: ${this.y}, angle: ${this.angle}, length: ${this.length}`;
    }
}
