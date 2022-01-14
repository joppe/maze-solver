import type { Position } from '../../Position.type';

export function positionToIndex(position: Position, columns: number): number {
  return position.column + columns * position.row;
}
