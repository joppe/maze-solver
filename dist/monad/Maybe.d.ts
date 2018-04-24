export declare class Maybe<T> {
    private readonly _value;
    private constructor();
    readonly value: T;
    static some<T>(value: T): Maybe<T>;
    static none<T>(): Maybe<T>;
    static fromValue<T>(value: T | undefined): Maybe<T>;
    map<R>(f: (value: T) => R): Maybe<R>;
    flatMap<R>(f: (value: T) => Maybe<R>): Maybe<R>;
    getOrElse(defaultValue: T): T;
    do(f: (value: T) => void): void;
    hasValue(): boolean;
    isNothing(): boolean;
}
