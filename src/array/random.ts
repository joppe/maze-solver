import {random as randomNumber} from 'app/number/random';

export function random<T>(arr: Array<T>): T {
    return arr[randomNumber(0, arr.length - 1)];
}
