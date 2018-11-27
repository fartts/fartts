import Vec2 from './2';
import Vec3 from './3';
import Vec4 from './4';

import { isFinite } from '../math';
import { toSwizzledSet, toKeyIndexMap } from './keys';

export function createProps<I extends Float32Array>(baseKeys: string[][]) {
  const swizzledSet = toSwizzledSet(baseKeys);
  const keyIndexMap = toKeyIndexMap(baseKeys);

  const Vec = [Vec2, Vec3, Vec4];

  function getByKey(target: I, key: string): number {
    const i = keyIndexMap.get(key) as number;
    return target[i];
  }

  function getterFor(
    key: string,
  ):
    | ((this: I) => number)
    | ((this: I) => Vec2)
    | ((this: I) => Vec3)
    | ((this: I) => Vec4) {
    const { length } = key;

    return length === 1
      ? function get(this: I) {
          return getByKey(this, key);
        }
      : function get(this: I) {
          const args = key.split('').map(k => getByKey(this, k));
          return new Vec[length - 2](args);
        };
  }

  function setByKey(target: I, key: string, value: number): void {
    if (!isFinite(value)) {
      throw new Error(
        `Cannot assign ${typeof value} value "${value}" to a component of ${
          target.constructor.name
        }`,
      );
    }

    const i = keyIndexMap.get(key) as number;
    target[i] = value;
  }

  function setterFor(
    key: string,
  ):
    | ((this: I, value: number) => void)
    | ((this: I, value: ArrayLike<number>) => void) {
    const { length } = key;

    return length === 1
      ? function set(this: I, value: number) {
          setByKey(this, key, value);
        }
      : function set(this: I, value: ArrayLike<number>) {
          if (length !== value.length) {
            throw new Error(
              [
                'Dimension mismatch',
                `Cannot assign ${
                  value.length
                }-component value: ${value} to ${length}-component key ${key}`,
              ].join('\n'),
            );
          }

          key.split('').forEach((k, i) => setByKey(this, k, value[i]));
        };
  }

  return Array.from(swizzledSet).reduce((acc: PropertyDescriptorMap, key) => {
    acc[key] = {
      configurable: false,
      enumerable: true,
      get: getterFor(key),
      set: setterFor(key),
    };

    return acc;
  }, {});
}
