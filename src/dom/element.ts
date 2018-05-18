import { Maybe } from 'app/monad/Maybe';

export function getElement<T extends HTMLElement>(selector: string): Maybe<T> {
    const element: T | null = document.querySelector(selector);

    return Maybe.FROM_VALUE(element === null ? undefined : element);
}
