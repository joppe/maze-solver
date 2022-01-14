import { Cell } from '../../grid/cell/Cell';

export type CellStyle = {
  color?: string;
  background?: string;
};

export interface Engine {
  renderCell(cell: Cell, content?: string, style?: CellStyle): void;
  setDimensions(rows: number, columns: number): void;
  output(): HTMLElement;
}
