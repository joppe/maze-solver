import { generate } from 'app/maze/generator/generate';
import { Maze } from 'app/maze/Maze';
import { Path } from 'app/maze/Path';
import { solve } from 'app/maze/solver/solve';
import { AsciiRenderer } from 'app/render/AsciiRenderer';
import { CanvasRenderer } from 'app/render/CanvasRenderer';
import { IRenderer } from 'app/render/IRenderer';

const body: HTMLElement = window.document.querySelector('body');
const maze: Maze = generate(10, 10);
const ascii: IRenderer = new AsciiRenderer(maze);
const canvas: IRenderer = new CanvasRenderer(maze, {
    pathColor: '#f00',
    roomColor: '#fff',
    roomHeight: 30,
    roomWidth: 30,
    speed: 10,
    wallColor: '#000',
    wallHeight: 5,
    wallWidth: 5
});

ascii.render(body);
canvas.render(body);

const path: Path = solve(maze);

ascii.plot(path);
canvas.plot(path);
