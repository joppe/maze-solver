import { Cell } from '../../../grid/cell/Cell';
import { Direction } from '../../../grid/cell/direction';
import type { CellStyle, Engine } from '../Engine.type';
import type { Styles } from '../html/style/Styles.type';
import type { Point } from './Point.type';

const DEFAULT_STYLES: Styles = {
  size: 25,
  borderColor: '#000000',
  textColor: '#808080',
  backgroundColor: '#fff',
};

export class Canvas implements Engine {
  private readonly _styles: Styles;
  private readonly _ctx: CanvasRenderingContext2D;
  private readonly _canvas: HTMLCanvasElement;
  private _rows: number | undefined;
  private _columns: number | undefined;

  public constructor(styles: Partial<Styles> = {}) {
    this._styles = {
      ...DEFAULT_STYLES,
      ...styles,
    };

    this._canvas = document.createElement('canvas');
    this._canvas.style.position = 'relative';
    this._canvas.style.zIndex = '-1';
    this._ctx = this._canvas.getContext('2d') as CanvasRenderingContext2D;
  }

  public renderCell(cell: Cell, content?: string, style?: CellStyle): void {
    const point = this.cellPoint(cell);

    if (style?.background) {
      this.color(point, style.background);
    }

    if (content) {
      this.text(point, content, style?.color ?? this._styles.textColor);
    }

    if (!cell.getNeighbour(Direction.North)) {
      this.topLine(point);
    }

    if (!cell.getNeighbour(Direction.West)) {
      this.leftLine(point);
    }

    if (!cell.linked(cell.getNeighbour(Direction.South))) {
      this.bottomLine(point);
    }

    if (!cell.linked(cell.getNeighbour(Direction.East))) {
      this.rightLine(point);
    }
  }

  public setDimensions(rows: number, columns: number): void {
    this._rows = rows;
    this._columns = columns;

    const width = `${this._styles.size * this._columns}px`;
    const height = `${this._styles.size * this._rows}px`;

    this._canvas.setAttribute('width', width);
    this._canvas.setAttribute('height', height);
  }

  public output(): HTMLElement {
    if (this._rows === undefined || this._columns === undefined) {
      throw new Error('Cannot output, dimensions not set');
    }

    const container = document.createElement('div');

    container.style.width = `${this._styles.size * this._columns}px`;
    container.style.height = `${this._styles.size * this._rows}px`;

    container.appendChild(this._canvas);

    return container;
  }

  private bottomLine(point: Point): void {
    this.line(
      { x: point.x, y: point.y + this._styles.size },
      { x: point.x + this._styles.size, y: point.y + this._styles.size },
    );
  }

  private topLine(point: Point): void {
    this.line(
      { x: point.x, y: point.y },
      { x: point.x + this._styles.size, y: point.y },
    );
  }

  private rightLine(point: Point): void {
    this.line(
      { x: point.x + this._styles.size, y: point.y },
      { x: point.x + this._styles.size, y: point.y + this._styles.size },
    );
  }

  private leftLine(point: Point): void {
    this.line(
      { x: point.x, y: point.y },
      { x: point.x, y: point.y + this._styles.size },
    );
  }

  private cellPoint(cell: Cell): Point {
    return {
      x: cell.column * this._styles.size,
      y: cell.row * this._styles.size,
    };
  }

  private line(from: Point, to: Point): void {
    this._ctx.beginPath();
    this._ctx.strokeStyle = this._styles.borderColor;
    this._ctx.moveTo(from.x, from.y);
    this._ctx.lineTo(to.x, to.y);
    this._ctx.stroke();
  }

  private color(point: Point, background: string): void {
    this._ctx.fillStyle = background;
    this._ctx.fillRect(point.x, point.y, this._styles.size, this._styles.size);
  }

  private text(point: Point, text: string, color: string): void {
    this._ctx.textAlign = 'center';
    this._ctx.fillStyle = color;
    this._ctx.fillText(
      text,
      point.x + this._styles.size / 2,
      point.y + 2 + this._styles.size / 2,
    );
  }
}
