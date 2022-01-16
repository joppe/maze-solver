import { PolarCell } from '../../../grid/cell/PolarCell';
import { Canvas } from './Canvas';

export class Circle extends Canvas {
  protected size: number | undefined;
  protected center: number | undefined;

  public renderCell(cell: PolarCell): void {
    if (this.center === undefined) {
      throw new Error('Center is undefined');
    }

    if (cell.row === 0) {
      return;
    }

    const innerRadius = cell.row * this._styles.size;
    const outerRadius = (cell.row + 1) * this._styles.size;
    const thetaCCW = cell.column * cell.theta;
    const thetaCW = (cell.column + 1) * cell.theta;
    const topLeft = {
      x: this.center + innerRadius * Math.cos(thetaCCW),
      y: this.center + innerRadius * Math.sin(thetaCCW),
    };
    const bottomLeft = {
      x: this.center + innerRadius * Math.cos(thetaCW),
      y: this.center + innerRadius * Math.sin(thetaCW),
    };
    const bottomRight = {
      x: this.center + outerRadius * Math.cos(thetaCW),
      y: this.center + outerRadius * Math.sin(thetaCW),
    };

    if (!cell.linked(cell.inward)) {
      this.line(topLeft, bottomLeft);
    }

    if (!cell.linked(cell.cw)) {
      this.line(bottomLeft, bottomRight);
    }
  }

  public setDimensions(rows: number, columns: number): void {
    this._rows = rows;
    this._columns = columns;
    this.size = 2 * rows * this._styles.size;
    this.center = this.size / 2;

    const width = `${this.size}px`;
    const height = `${this.size}px`;

    this._canvas.setAttribute('width', width);
    this._canvas.setAttribute('height', height);
  }

  public output(): HTMLElement {
    if (this.size === undefined || this.center === undefined) {
      throw new Error('Center is undefined');
    }

    this._ctx.beginPath();
    this._ctx.strokeStyle = this._styles.borderColor;
    this._ctx.arc(this.center, this.center, this.center, 0, 2 * Math.PI);
    this._ctx.stroke();

    const element = super.output();

    element.style.width = `${this.size}px`;
    element.style.height = `${this.size}px`;

    return element;
  }
}
