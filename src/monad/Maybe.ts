/**
 * @see https://codewithstyle.info/advanced-functional-programming-in-typescript-maybe-monad/
 */
export class Maybe<T> {
    private readonly _value: T | undefined;

    private constructor(value: T | undefined) {
        this._value = value;
    }

    get value(): T {
        if (this.hasValue()) {
            return this._value;
        }

        throw new Error('There is only "none"');
    }

    public static some<T>(value: T): Maybe<T> {
        if (value === undefined) {
            throw new Error('Provided value must not be undefined');
        }

        return new Maybe(value);
    }

    public static none<T>(): Maybe<T> {
        return new Maybe<T>(undefined);
    }

    public static fromValue<T>(value: T | undefined): Maybe<T> {
        return value !== undefined ? Maybe.some(value) : Maybe.none<T>();
    }

    /**
     * Apply a function "f" on the property "value" and return the returned value wrapped in a new Maybe.
     */
    public map<R>(f: (value: T) => R): Maybe<R> {
        if (this.hasValue()) {
            return Maybe.some(f(this._value));
        } else {
            return Maybe.none<R>();
        }
    }

    /**
     * Apply a function "f" on the property "value", the returned value from function "f" is a Maybe.
     */
    public flatMap<R>(f: (value: T) => Maybe<R>): Maybe<R> {
        if (this.hasValue()) {
            return f(this._value);
        } else {
            return Maybe.none<R>();
        }
    }

    public getOrElse(defaultValue: T): T {
        return this._value === undefined ? defaultValue : this._value;
    }

    public do(f: (value: T) => void): void {
        if (this.hasValue()) {
            f(this._value);
        }
    }

    public hasValue(): boolean {
        return !this.isNothing();
    }

    public isNothing(): boolean {
        return this._value === undefined;
    }
}
