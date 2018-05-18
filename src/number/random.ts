export function rand(): number {
    const byteArray: Uint8Array = new Uint8Array(1);

    window.crypto.getRandomValues(byteArray);

    return parseFloat(`0.${byteArray[0].toString()}`);
}

export function random(min: number, max: number): number {
    const diff: number = max - min;

    if (diff <= 0) {
        throw new Error(`Diff between max (${max}) and min (${min}) must be larger then 0 (${diff})`);
    }

    return min + Math.round(rand() * diff);
}
