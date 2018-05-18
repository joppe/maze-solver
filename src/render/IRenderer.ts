import { Path } from 'app/maze/Path';

export interface IRenderer {
    render(parent: HTMLElement): void;

    plot(path: Path): Promise<void>;
}
