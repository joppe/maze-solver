import type { Position } from '../../Position.type';
import { Cell } from './Cell';

export class PolarCell extends Cell {
  public readonly theta: number;
  protected _cw: PolarCell | undefined;
  protected _ccw: PolarCell | undefined;
  protected _inward: PolarCell | undefined;
  protected _outward: PolarCell[] = [];

  public constructor(position: Position, theta: number) {
    super(position);

    this.theta = theta;
  }

  public set cw(cell: PolarCell | undefined) {
    if (cell !== undefined) {
      this._cw = cell;
      this.neighbours.push(cell);
    }
  }

  public get cw(): PolarCell | undefined {
    return this._cw;
  }

  public set ccw(cell: PolarCell | undefined) {
    if (cell !== undefined) {
      this._ccw = cell;
      this.neighbours.push(cell);
    }
  }

  public get ccw(): PolarCell | undefined {
    return this._ccw;
  }

  public set inward(cell: PolarCell | undefined) {
    if (cell !== undefined) {
      this._inward = cell;
      this.neighbours.push(cell);
    }
  }

  public get inward(): PolarCell | undefined {
    return this._inward;
  }

  public addOutward(cell: PolarCell | undefined) {
    if (cell !== undefined) {
      this._outward.push(cell);
      this.neighbours.push(cell);
    }
  }

  public get outward(): PolarCell[] {
    return this._outward;
  }
}
