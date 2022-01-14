import { calculate } from './maze/distance/calculate';
import { huntAntKill } from './maze/generator/huntAndKill/huntAndKill';
import { Colored } from './maze/render/Colored';
import { Canvas } from './maze/render/engine/canvas/Canvas';
import { HTML } from './maze/render/engine/html/HTML';
import { LongestPath } from './maze/render/LongestPath';

const grid = huntAntKill({ rows: 20, columns: 20 });
const distances = calculate(grid.getRandomCell());
const longestPathRenderer = new LongestPath(grid, new HTML(), distances);
const coloredRenderer = new Colored(grid, new Canvas(), distances);

longestPathRenderer.render(document.body);
coloredRenderer.render(document.body);
