import type { Position } from '../../Position.type';

export function indexToPosition(index: number, columns: number): Position {
  return {
    column: index % columns,
    row: Math.floor(index / columns),
  };
}
