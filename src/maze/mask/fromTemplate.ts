import { Mask } from './Mask';

const EMPTY = 'x';

export function fromTemplate(template: string): Mask {
  const lines: string[][] = template
    .split(/\n/)
    .map((line) => line.trim())
    .filter((line) => line !== '')
    .map((line) => line.split(''));

  if (lines.length === 0 || lines[0].length === 0) {
    throw Error('Unusable template, could not create mask');
  }

  const columns = lines[0].length;
  const rows = lines.length;
  const mask = new Mask({ columns, rows });

  lines.forEach((line: string[], row: number): void => {
    line.forEach((mark: string, column: number) => {
      mask.setCell({ column, row }, mark !== EMPTY);
    });
  });

  return mask;
}
