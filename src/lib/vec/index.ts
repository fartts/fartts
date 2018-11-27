import Vec2 from './2';
import Vec3 from './3';
import Vec4 from './4';

import { createProperties } from './props';
import { slice } from '../util';

Object.defineProperties(
  Vec2.prototype,
  // prettier-ignore
  createProperties<Vec2>([
    ['x', 'y'],
    ['r', 'g'],
    ['s', 't'],
  ]),
);

Object.defineProperties(
  Vec3.prototype,
  // prettier-ignore
  createProperties<Vec3>([
    ['x', 'y', 'z'],
    ['r', 'g', 'b'],
    ['s', 't', 'p'],
  ]),
);

Object.defineProperties(
  Vec4.prototype,
  // prettier-ignore
  createProperties<Vec4>([
    ['x', 'y', 'z', 'w'],
    ['r', 'g', 'b', 'a'],
    ['s', 't', 'p', 'q'],
  ]),
);

export const [vec2, vec3, vec4] = [Vec2, Vec3, Vec4].map(
  (Vec, i) => (...args: Array<number | number[] | Float32Array>) => {
    const flat = args.reduce(
      (acc: number[], arg) =>
        acc.concat(arg instanceof Float32Array ? slice.call(arg) : arg),
      [],
    );

    const length = i + 2;
    if (flat.length > 1 && flat.length !== length) {
      throw new Error(
        `${
          flat.length < length ? 'Not enough' : 'Too many'
        } arguments provided for construction of ${Vec.name.toLowerCase()}`,
      );
    }

    const components =
      flat.length <= 1 ? new Array(i + 2).fill(flat[0] || 0) : flat;

    return new Vec(components);
  },
);
