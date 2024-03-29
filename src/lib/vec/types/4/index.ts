import { Rgba2, Rgba3, Rgba4 } from './rgba';
import { Stpq2, Stpq3, Stpq4 } from './stpq';
import { Xyzw2, Xyzw3, Xyzw4 } from './xyzw';

export type Components4Length1 = 'a' | 'q' | 'w';
export type Components4Length2 = Rgba2 | Stpq2 | Xyzw2;
export type Components4Length3 = Rgba3 | Stpq3 | Xyzw3;
export type Components4Length4 = Rgba4 | Stpq4 | Xyzw4;
