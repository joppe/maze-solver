import { Grid } from '../grid/Grid';
import type { Options } from './Options.type';

export type Generator = (options: Options) => Grid;
