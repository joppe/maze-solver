import { IPosition } from 'app/grid/IPosition';

export interface IValueFactory<T> {
    (position: IPosition): T;
}

