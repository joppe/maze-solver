import { element } from '../element/element';
import type { Options } from './Options.type';

export function style(options: Options): HTMLElement {
  const { rows, columns, styles } = options;
  const definitions = `
    .maze {
      display: flex;
      flex-wrap: wrap;
      border: 2px solid ${styles.borderColor};
      box-shadow: inset 0 0 0 2px ${styles.borderColor};
      width: ${columns * styles.size}px;
      height: ${rows * styles.size}px;
      background-color: ${styles.backgroundColor};
    }

    .cell {
      box-sizing: border-box;
      display: flex;
      align-items: center;
      justify-content: center;
      width: ${styles.size}px;
      height: ${styles.size}px;
      color: ${styles.textColor};
      font-size: 10px;
    }

    .cell--bottom {
      border-bottom: 1px solid ${styles.borderColor};
    }

    .cell--right {
      border-right: 1px solid ${styles.borderColor};
    }
  `;

  return element(['style', undefined, definitions.replaceAll('\n', '')]);
}
