/**
 * @see https://codewithstyle.info/advanced-functional-programming-in-typescript-maybe-monad/
 */
export class Maybe<T> {
    private readonly value: T | undefined;

    private constructor(value: T | undefined) {
        this.value = value;
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
    public map<R>(f: (wrapped: T) => R): Maybe<R> {
        if (this.value === undefined) {
            return Maybe.none<R>();
        } else {
            return Maybe.some(f(this.value));
        }
    }

    /**
     * Apply a function "f" on the property "value", the returned value from function "f" is a Maybe.
     */
    public flatMap<R>(f: (wrapped: T) => Maybe<R>): Maybe<R> {
        if (this.value === undefined) {
            return Maybe.none<R>();
        } else {
            return f(this.value);
        }
    }

    public getOrElse(defaultValue: T): T {
        return this.value === undefined ? defaultValue : this.value;
    }
}

