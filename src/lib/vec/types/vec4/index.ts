import { Rgba2, Rgba3, Rgba4 } from './vec4/rgba';
import { Stpq2, Stpq3, Stpq4 } from './vec4/stpq';
import { Xyzw2, Xyzw3, Xyzw4 } from './vec4/xyzw';

export type Vec4D1 = 'a' | 'q' | 'w';
export type Vec4D2 = Rgba2 | Stpq2 | Xyzw2;
export type Vec4D3 = Rgba3 | Stpq3 | Xyzw3;
export type Vec4D4 = Rgba4 | Stpq4 | Xyzw4;
