import { App } from 'app/App';
import { getElement } from 'app/dom/element';
import { Maybe } from 'app/monad/Maybe';

const app: App = new App();
const horizontalRoomCountElement: Maybe<HTMLElement> = getElement<HTMLElement>('.js-horizontal-room-count');
const horizontalRoomInputElement: Maybe<HTMLInputElement> = getElement<HTMLInputElement>('.js-horizontal-room-input');
const verticalRoomCountElement: Maybe<HTMLElement> = getElement<HTMLElement>('.js-vertical-room-count');
const verticalRoomInputElement: Maybe<HTMLInputElement> = getElement<HTMLInputElement>('.js-vertical-room-input');
const renderTypeSelectElement: Maybe<HTMLSelectElement> = getElement<HTMLSelectElement>('.js-render-type');
const generateElement: Maybe<HTMLButtonElement> = getElement<HTMLButtonElement>('.js-generate');
const solveElement: Maybe<HTMLButtonElement> = getElement<HTMLButtonElement>('.js-solve');
const mazeElement: Maybe<HTMLElement> = getElement<HTMLElement>('.js-maze');

function setButtonState(el: Maybe<HTMLButtonElement>, disabled: boolean): void {
    el.do((button: HTMLButtonElement): void => {
        if (disabled === true) {
            button.setAttribute('disabled', 'disabled');
        } else {
            button.removeAttribute('disabled');
        }
    });
}

horizontalRoomInputElement.do((input: HTMLInputElement): void => {
    input.addEventListener('change', (): void => {
        const value: string = input.value;

        app.horizontalRoomCount = parseInt(value, 10);
        horizontalRoomCountElement.do((count: HTMLElement): void => {
            count.innerText = value;
        });
    });
});

verticalRoomInputElement.do((input: HTMLInputElement): void => {
    input.addEventListener('change', (): void => {
        const value: string = input.value;

        app.verticalRoomCount = parseInt(value, 10);
        verticalRoomCountElement.do((count: HTMLElement): void => {
            count.innerText = value;
        });
    });
});

renderTypeSelectElement.do((select: HTMLSelectElement): void => {
    select.addEventListener('change', (): void => {
        app.renderType = select.value;
    });
});

generateElement.do((button: HTMLButtonElement): void => {
    button.addEventListener('click', (): void => {
        app.create(mazeElement.value);
    });
});

solveElement.do((button: HTMLButtonElement): void => {
    button.addEventListener('click', async (): Promise<void> => {
        setButtonState(generateElement, true);
        setButtonState(solveElement, true);

        await app.solve();

        setButtonState(generateElement, false);
        setButtonState(solveElement, false);
    });
});
