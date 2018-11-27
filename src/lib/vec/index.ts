import Vec2 from './2';
import Vec3 from './3';
import Vec4 from './4';

import { createProps } from './props';
import { toArray } from './util';

Object.defineProperties(
  Vec2.prototype,
  // prettier-ignore
  createProps<Vec2>([
    ['x', 'y'],
    ['r', 'g'],
    ['s', 't'],
  ]),
);

Object.defineProperties(
  Vec3.prototype,
  // prettier-ignore
  createProps<Vec3>([
    ['x', 'y', 'z'],
    ['r', 'g', 'b'],
    ['s', 't', 'p'],
  ]),
);

Object.defineProperties(
  Vec4.prototype,
  // prettier-ignore
  createProps<Vec4>([
    ['x', 'y', 'z', 'w'],
    ['r', 'g', 'b', 'a'],
    ['s', 't', 'p', 'q'],
  ]),
);

export const [vec2, vec3, vec4] = [Vec2, Vec3, Vec4].map(
  (Vec, i) => (...args: Array<number | number[] | Float32Array>) => {
    const flat = args.reduce(toArray, []);

    const len = i + 2;
    if (flat.length > 1 && flat.length !== len) {
      throw new Error(
        `${
          flat.length < len ? 'Not enough' : 'Too many'
        } arguments provided for construction of ${Vec.name.toLowerCase()}`,
      );
    }

    const components =
      flat.length <= 1 ? new Array(i + 2).fill(flat[0] || 0) : flat;

    return new Vec(components);
  },
);
