import { calculate } from './maze/distance/calculate';
import { deadEnds } from './maze/generator/deadEnds';
import { huntAntKill } from './maze/generator/huntAndKill/huntAndKill';
import { recursiveBacktracker } from './maze/generator/recursiveBacktracker/recursiveBacktracker';
import { MaskedGrid } from './maze/grid/MaskedGrid';
import { Mask } from './maze/mask/Mask';
import { Colored } from './maze/render/Colored';
import { Canvas } from './maze/render/engine/canvas/Canvas';

function methodHunt(mask: Mask) {
  const grid = huntAntKill(() => {
    const grid = MaskedGrid.factory(mask);

    grid.setup();

    return grid;
  });
  const distances = calculate(grid.getRandomCell());
  const coloredRenderer = new Colored(grid, new Canvas(), distances);

  coloredRenderer.render(document.body);
  console.log('dea-ends', deadEnds(grid));
}

function methodRecursice(mask: Mask) {
  const grid = recursiveBacktracker(() => {
    const grid = MaskedGrid.factory(mask);

    grid.setup();

    return grid;
  });
  const distances = calculate(grid.getRandomCell());
  const coloredRenderer = new Colored(grid, new Canvas(), distances);

  coloredRenderer.render(document.body);
  console.log('dea-ends', deadEnds(grid));
}

const mask = new Mask({ rows: 10, columns: 10 });
mask.setCell({ column: 0, row: 0 }, false);
mask.setCell({ column: 1, row: 0 }, false);
mask.setCell({ column: 2, row: 0 }, false);
mask.setCell({ column: 2, row: 1 }, false);
mask.setCell({ column: 2, row: 2 }, false);

methodHunt(mask);
methodRecursice(mask);
