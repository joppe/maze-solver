import { IPosition } from 'app/grid/IPosition';

export interface ICell<T> {
    value: T;
    position: IPosition;
}
