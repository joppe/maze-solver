import { calculate } from './maze/distance/calculate';
import { deadEnds } from './maze/generator/deadEnds';
import { huntAntKill } from './maze/generator/huntAndKill/huntAndKill';
import { recursiveBacktracker } from './maze/generator/recursiveBacktracker/recursiveBacktracker';
import { MaskedGrid } from './maze/grid/MaskedGrid';
import { PolarGrid } from './maze/grid/PolarGrid';
import { fromTemplate } from './maze/mask/fromTemplate';
import { Mask } from './maze/mask/Mask';
import { Basic } from './maze/render/Basic';
import { Colored } from './maze/render/Colored';
import { Canvas } from './maze/render/engine/canvas/Canvas';
import { Circle } from './maze/render/engine/canvas/Circle';

function methodHunt(mask: Mask) {
  const grid = huntAntKill(() => {
    return MaskedGrid.factory(mask);
  });
  const distances = calculate(grid.getRandomCell());
  const coloredRenderer = new Colored(grid, new Canvas(), distances);

  coloredRenderer.render(document.body);
  console.log('dea-ends', deadEnds(grid));
}

function methodRecursice(mask: Mask) {
  const grid = recursiveBacktracker(() => {
    return MaskedGrid.factory(mask);
  });
  const distances = calculate(grid.getRandomCell());
  const coloredRenderer = new Colored(grid, new Canvas(), distances);

  coloredRenderer.render(document.body);
  console.log('dead-ends', deadEnds(grid));
}

function circle() {
  const grid = recursiveBacktracker(() => {
    return PolarGrid.factory({ rows: 10, columns: 10 });
  });
  const renderer = new Basic(grid, new Circle());

  renderer.render(document.body);
}

const mask = fromTemplate(`
  x........x
  ....xx....
  ...xxxx...
  ....xx....
  x........x
  x........x
  ....xx....
  ...xxxx...
  ....xx....
  x........x
`);

methodHunt(mask);
methodRecursice(mask);
circle();
