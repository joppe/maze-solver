import { Maze } from 'app/maze/Maze';
import { Path } from 'app/maze/Path';
import { IRenderer } from 'app/render/IRenderer';
export declare class AsciiRenderer implements IRenderer {
    private readonly _maze;
    private readonly _element;
    constructor(matrix: Maze);
    render(parent: HTMLElement): void;
    plot(path: Path): void;
}
