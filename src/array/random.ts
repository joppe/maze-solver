export function random<T>(arr: Array<T>): T {
    const index: number = Math.round((arr.length - 1) * Math.random());

    return arr[index];
}
