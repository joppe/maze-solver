import { ICell } from 'app/grid/ICell';
import { CellType } from 'app/maze/CellType';
import { Maybe } from 'app/monad/Maybe';
import { getCellType } from '../../../src/maze/CellType';

describe('CellType', (): void => {
    describe('getCellType', (): void => {
        it('return a Maybe with CellType as value', (): void => {
            const c: Maybe<ICell<CellType>> = Maybe.fromValue({
                col: 12,
                row: 5,
                value: CellType.ClosedDoor
            });
            const type: Maybe<CellType> = getCellType(c);

            expect(type.getOrElse(undefined)).toBe(CellType.ClosedDoor);
        });
    });
});
