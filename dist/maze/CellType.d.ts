import { ICell } from 'app/grid/ICell';
import { Maybe } from 'app/monad/Maybe';
export declare enum CellType {
    UnSet = 0,
    OpenDoor = 1,
    ClosedDoor = 2,
    Wall = 3,
    Entrance = 4,
    Exit = 5,
    Room = 6,
}
export declare function getCellType(cell: Maybe<ICell<CellType>>): Maybe<CellType>;
export declare function isA(cell: Maybe<ICell<CellType>>, type: CellType): boolean;
export declare function isOneOf(cell: Maybe<ICell<CellType>>, types: CellType[]): boolean;
export declare function isUnset(cell: Maybe<ICell<CellType>>): boolean;
export declare function isRoom(cell: Maybe<ICell<CellType>>): boolean;
export declare function isWall(cell: Maybe<ICell<CellType>>): boolean;
export declare function isOpenDoor(cell: Maybe<ICell<CellType>>): boolean;
export declare function isClosedDoor(cell: Maybe<ICell<CellType>>): boolean;
export declare function isDoor(cell: Maybe<ICell<CellType>>): boolean;
export declare function isEntrance(cell: Maybe<ICell<CellType>>): boolean;
export declare function isExit(cell: Maybe<ICell<CellType>>): boolean;
export declare function isWallOrDoor(cell: Maybe<ICell<CellType>>): boolean;
