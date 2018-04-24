import { ICell } from 'app/grid/ICell';
import { Maybe } from 'app/monad/Maybe';

export enum CellType {
    UnSet,
    OpenDoor,
    ClosedDoor,
    Wall,
    Entrance,
    Exit,
    Room
}

export function getCellType(cell: Maybe<ICell<CellType>>): Maybe<CellType> {
    return cell.map((c: ICell<CellType>): CellType => {
        return c.value;
    });
}

export function isA(cell: Maybe<ICell<CellType>>, type: CellType): boolean {
    const t: Maybe<CellType> = getCellType(cell);

    return t.getOrElse(undefined) === type;
}

export function isOneOf(cell: Maybe<ICell<CellType>>, types: CellType[]): boolean {
    const t: Maybe<CellType> = getCellType(cell);

    return types.indexOf(t.getOrElse(undefined)) !== -1;
}

export function isUnset(cell: Maybe<ICell<CellType>>): boolean {
    return isA(cell, CellType.UnSet);
}

export function isRoom(cell: Maybe<ICell<CellType>>): boolean {
    return isA(cell, CellType.Room);
}

export function isWall(cell: Maybe<ICell<CellType>>): boolean {
    return isA(cell, CellType.Wall);
}

export function isOpenDoor(cell: Maybe<ICell<CellType>>): boolean {
    return isA(cell, CellType.OpenDoor);
}

export function isClosedDoor(cell: Maybe<ICell<CellType>>): boolean {
    return isA(cell, CellType.ClosedDoor);
}

export function isDoor(cell: Maybe<ICell<CellType>>): boolean {
    return isOneOf(cell, [
        CellType.ClosedDoor,
        CellType.OpenDoor
    ]);
}

export function isEntrance(cell: Maybe<ICell<CellType>>): boolean {
    return isA(cell, CellType.Entrance);
}

export function isExit(cell: Maybe<ICell<CellType>>): boolean {
    return isA(cell, CellType.Exit);
}

export function isWallOrDoor(cell: Maybe<ICell<CellType>>): boolean {
    return isOneOf(cell, [
        CellType.ClosedDoor,
        CellType.OpenDoor,
        CellType.Wall,
        CellType.Entrance,
        CellType.Exit
    ]);
}
