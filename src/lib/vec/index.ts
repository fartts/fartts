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

type AnyVec = Vec2 | Vec3 | Vec4;
type AnyVecType = typeof Vec2 | typeof Vec3 | typeof Vec4;

type Components = Array<number | number[] | Float32Array>;
type Factory<V extends AnyVec> = (...args: Components) => V;

function createFactory<V extends AnyVec>(
  Vec: AnyVecType,
  size: number,
): Factory<V> {
  return (...args: Components): V => {
    const flat = args.reduce(toArray, []);

    if (flat.length > 1 && flat.length !== size) {
      throw new Error(
        `${
          flat.length < size ? 'Not enough' : 'Too many'
        } arguments provided for construction of ${Vec.name.toLowerCase()}`,
      );
    }

    const components =
      flat.length <= 1 ? new Array(size).fill(flat[0] || 0) : flat;

    return new Vec(components) as V;
  };
}

export const [vec2, vec3, vec4] = [
  createFactory<Vec2>(Vec2, 2),
  createFactory<Vec3>(Vec3, 3),
  createFactory<Vec4>(Vec4, 4),
];
