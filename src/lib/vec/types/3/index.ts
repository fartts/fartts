import { Rgb2, Rgb3, Rgb4 } from './rgb';
import { Stp2, Stp3, Stp4 } from './stp';
import { Xyz2, Xyz3, Xyz4 } from './xyz';

export type Component3Length1 = 'b' | 'p' | 'z';
export type Component3Length2 = Rgb2 | Stp2 | Xyz2;
export type Component3Length3 = Rgb3 | Stp3 | Xyz3;
export type Component3Length4 = Rgb4 | Stp4 | Xyz4;
