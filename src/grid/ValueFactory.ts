import { IPosition } from 'app/grid/IPosition';

export type ValueFactory<T> = (position: IPosition) => T;
