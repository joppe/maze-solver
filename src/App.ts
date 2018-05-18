import { generate } from 'app/maze/generator/generate';
import { Maze } from 'app/maze/Maze';
import { Path } from 'app/maze/Path';
import { solve } from 'app/maze/solver/solve';
import { AsciiRenderer } from 'app/render/AsciiRenderer';
import { CanvasRenderer, IOptions } from 'app/render/CanvasRenderer';
import { IRenderer } from 'app/render/IRenderer';

export class App {
    private _maze: Maze;
    private _renderer: IRenderer;
    private _horizontalRoomCount: number = 10;
    private _verticalRoomCount: number = 10;
    private _renderType: string = 'canvas';

    public set horizontalRoomCount(horizontalRoomCount: number) {
        this._horizontalRoomCount = horizontalRoomCount;
    }

    public set verticalRoomCount(verticalRoomCount: number) {
        this._verticalRoomCount = verticalRoomCount;
    }

    public set renderType(renderType: string) {
        this._renderType = renderType;
    }

    public get canvasConfig(): IOptions {
        return {
            optimizedColor: '#0f0',
            pathColor: '#f00',
            roomColor: '#fff',
            roomHeight: 30,
            roomWidth: 30,
            speed: 10,
            wallColor: '#000',
            wallHeight: 5,
            wallWidth: 5
        };
    }

    public isReady(): boolean {
        return this._renderer !== undefined;
    }

    public create(container: HTMLElement): void {
        // tslint:disable-next-line no-inner-html
        container.innerHTML = '';

        this._maze = generate(this._horizontalRoomCount, this._verticalRoomCount);

        if (this._renderType === 'canvas') {
            this._renderer  = new CanvasRenderer(this._maze, this.canvasConfig);
        } else {
            this._renderer  = new AsciiRenderer(this._maze);
        }

        this._renderer.render(container);
    }

    public async solve(): Promise<void> {
        const path: Path = solve(this._maze);

        return this._renderer.plot(path);
    }
}
