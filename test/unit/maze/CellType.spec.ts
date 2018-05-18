import { ICell } from '../../../src/grid/ICell';
import { CellType, getCellType } from '../../../src/maze/CellType';
import { Maybe } from '../../../src/monad/Maybe';

describe('CellType', (): void => {
    describe('getCellType', (): void => {
        it('return a Maybe with CellType as value', (): void => {
            const c: Maybe<ICell<CellType>> = Maybe.FROM_VALUE({
                position: {
                    col: 12,
                    row: 5
                },
                value: CellType.ClosedDoor
            });
            const type: Maybe<CellType> = getCellType(c);

            expect(type.getOrElse(undefined)).toBe(CellType.ClosedDoor);
        });
    });
});
