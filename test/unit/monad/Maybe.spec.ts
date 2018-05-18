import { Maybe } from '../../../src/monad/Maybe';

describe('Monad', (): void => {
    describe('some', (): void => {
        it('create a monad that has a value', (): void => {
            expect((): void => {
                const m: Maybe<number> = Maybe.SOME(10);
            }).not.toThrow();
        });

        it('throw an error when no value is provided', (): void => {
            expect((): void => {
                const m: Maybe<number> = Maybe.SOME(undefined);
            }).toThrow();
        });
    });

    describe('none', (): void => {
        it('create a monad that does not contain a value', (): void => {
            expect((): void => {
                const m: Maybe<boolean> = Maybe.NONE();
            }).not.toThrow();
        });
    });

    describe('fromValue', (): void => {
        it('create a monad from a value of nothing', (): void => {
            expect((): void => {
                const m: Maybe<boolean> = Maybe.FROM_VALUE(true);
            }).not.toThrow();
            expect((): void => {
                const m: Maybe<boolean> = Maybe.FROM_VALUE(undefined);
            }).not.toThrow();
        });
    });

    describe('map', (): void => {
        it('apply a function on a monad and wrap the result in a new monad', (): void => {
            const m1: Maybe<string> = Maybe.FROM_VALUE('foo');
            const r1: Maybe<string> = m1.map((str: string): string => {
                return `${str}bar`;
            });
            const m2: Maybe<number> = Maybe.FROM_VALUE(undefined);
            const r2: Maybe<string> = m2.map((age: number): string => {
                return age > 18 ? 'adult' : 'kid';
            });

            expect(r1.getOrElse(undefined)).toBe('foobar');
            expect(r2.getOrElse('do not know')).toBe('do not know');
        });
    });

    describe('flatMap', (): void => {
        it('apply a function on the value of a monad but do not wrap in monad because the function does that', (): void => {
            const m1: Maybe<boolean> = Maybe.SOME(true);
            const r1: Maybe<number> = m1.flatMap((odd: boolean): Maybe<number> => {
                return Maybe.FROM_VALUE(odd ? 1 : 2);
            });

            expect(r1.getOrElse(undefined)).toBe(1);
        });
    });

    describe('getOrElse', (): void => {
        it('get the value from the monad, if it does not contain a value return the default', (): void => {
            const m1: Maybe<boolean> = Maybe.FROM_VALUE(undefined);
            const m2: Maybe<boolean> = Maybe.FROM_VALUE(true);

            expect(m1.getOrElse(false)).toBe(false);
            expect(m2.getOrElse(false)).toBe(true);
        });
    });
});
