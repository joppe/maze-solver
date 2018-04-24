import { Generator } from 'app/maze/generator/Generator';
import { Maze } from 'app/maze/Maze';
import { AsciiRenderer } from 'app/render/AsciiRenderer';
import { CanvasRenderer } from 'app/render/CanvasRenderer';
import { IRenderer } from 'app/render/IRenderer';

const body: HTMLElement = window.document.querySelector('body');
const generator: Generator = new Generator(10, 10);
const maze: Maze = generator.generate();
const a: IRenderer = new AsciiRenderer(maze);
const c: IRenderer = new CanvasRenderer(maze, {
    pathColor: '#f00',
    roomColor: '#fff',
    roomHeight: 30,
    roomWidth: 30,
    speed: 10,
    wallColor: '#000',
    wallHeight: 5,
    wallWidth: 5
});

a.render(body);
c.render(body);
