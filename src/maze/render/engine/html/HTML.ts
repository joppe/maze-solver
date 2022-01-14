import { Cell } from '../../../grid/cell/Cell';
import { Direction } from '../../../grid/cell/direction';
import type { CellStyle, Engine } from '../Engine.type';
import { element } from './element/element';
import type { ElementConfig } from './element/ElementConfig.type';
import { style } from './style/style';
import type { Styles } from './style/Styles.type';

const DEFAULT_STYLES: Styles = {
  size: 25,
  borderColor: '#000',
  textColor: '#808080',
  backgroundColor: '#fff',
};

export class HTML implements Engine {
  private readonly _styles: Styles;
  private readonly _cells: ElementConfig[] = [];
  private _rows: number | undefined;
  private _columns: number | undefined;

  public constructor(styles: Partial<Styles> = {}) {
    this._styles = {
      ...DEFAULT_STYLES,
      ...styles,
    };
  }

  public renderCell(cell: Cell, content?: string, style?: CellStyle): void {
    const classes = ['cell'];
    const inlineStyles = [];

    if (!cell.linked(cell.getNeighbour(Direction.South))) {
      classes.push('cell--bottom');
    }

    if (!cell.linked(cell.getNeighbour(Direction.East))) {
      classes.push('cell--right');
    }

    if (content) {
      inlineStyles.push(`color: ${style?.color ?? this._styles.textColor}`);
    }

    if (style?.background) {
      inlineStyles.push(`background-color: ${style.background}`);
    }

    this._cells.push([
      'div',
      { class: classes.join(' '), style: inlineStyles.join(';') },
      content ?? '',
    ]);
  }

  public setDimensions(rows: number, columns: number): void {
    this._rows = rows;
    this._columns = columns;
  }

  public output(): HTMLElement {
    if (this._rows === undefined || this._columns === undefined) {
      throw new Error('Cannot output, dimensions not set');
    }

    const styling = style({
      rows: this._rows,
      columns: this._columns,
      styles: this._styles,
    });
    const maze = element(['div', { class: 'maze' }, this._cells]);
    const root = element(['div', { class: 'container' }]);
    const shadow = root.attachShadow({ mode: 'open' });

    shadow.appendChild(styling);
    shadow.appendChild(maze);

    return root;
  }
}
