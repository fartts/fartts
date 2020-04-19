import Vec2 from './2';
import Vec3 from './3';
import Vec4 from './4';

import { isFinite } from '../core/math';
import { toSwizzledSet, toKeyIndexMap } from './keys';

const Vec = [Vec2, Vec3, Vec4];

function getByKey<V extends Float32Array>(
  target: V,
  key: string,
  map: Map<string, number>,
): number {
  const i = map.get(key) as number;
  return target[i];
}

function getterFor<V extends Float32Array>(
  key: string,
  map: Map<string, number>,
):
  | ((this: V) => number)
  | ((this: V) => Vec2)
  | ((this: V) => Vec3)
  | ((this: V) => Vec4) {
  const { length } = key;

  return length === 1
    ? function get(this: V) {
        return getByKey<V>(this, key, map);
      }
    : function get(this: V) {
        const args = key.split('').map((k) => getByKey<V>(this, k, map));
        return new Vec[length - 2](args);
      };
}

function setByKey<V extends Float32Array>(
  target: V,
  key: string,
  map: Map<string, number>,
  value: number,
): void {
  if (!isFinite(value)) {
    throw new Error(
      `Cannot assign ${typeof value} value "${value}" to a component of ${
        target.constructor.name
      }`,
    );
  }

  const i = map.get(key) as number;
  target[i] = value;
}

function setterFor<V extends Float32Array>(
  key: string,
  map: Map<string, number>,
):
  | ((this: V, value: number) => void)
  | ((this: V, value: ArrayLike<number>) => void) {
  const { length } = key;

  return length === 1
    ? function set(this: V, value: number) {
        setByKey<V>(this, key, map, value);
      }
    : function set(this: V, value: ArrayLike<number>) {
        if (length !== value.length) {
          throw new Error(
            [
              'Dimension mismatch',
              `Cannot assign ${value.length}-component value: ${value} to ${length}-component key ${key}`,
            ].join('\n'),
          );
        }

        key.split('').forEach((k, i) => setByKey<V>(this, k, map, value[i]));
      };
}

export function createProps<V extends Float32Array>(baseKeys: string[][]) {
  const swizzledSet = toSwizzledSet(baseKeys);
  const keyIndexMap = toKeyIndexMap(baseKeys);

  return Array.from(swizzledSet).reduce((acc: PropertyDescriptorMap, key) => {
    acc[key] = {
      configurable: false,
      enumerable: true,
      get: getterFor<V>(key, keyIndexMap),
      set: setterFor<V>(key, keyIndexMap),
    };

    return acc;
  }, {});
}
