import { Vector } from 'app/geometry/Vector';
import { ICell } from 'app/grid/ICell';
import { CellType } from 'app/maze/CellType';
import { Maybe } from 'app/monad/Maybe';

export interface IPossibility {
    direction: Vector;
    door: Maybe<ICell<CellType>>;
    room: Maybe<ICell<CellType>>;
}
