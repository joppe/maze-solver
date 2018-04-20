import { IPosition } from 'app/grid/IPosition';

export interface IRenderer {
    render(parent: HTMLElement): void;

    plot(path: IPosition[]): void;
}
