import { toKeyIndexMap, toSwizzledSet } from './keys';
import Vec3 from './3';
import Vec4 from './4';

export default class Vec2 extends Float32Array {
  static get [Symbol.species]() {
    return Float32Array;
  }
}

function createProperties<I extends Float32Array>(baseKeys: string[][]) {
  const swizzledSet = toSwizzledSet(baseKeys);
  const keyIndexMap = toKeyIndexMap(baseKeys);

  function getByKey(target: I, key: string): number {
    const i = keyIndexMap.get(key) as number;
    return target[i];
  }

  // function getN<J extends Float32ArrayConstructor>(Ctor: J, key: string) {
  //   return function get(this: I) {
  //     const args = key.split('').map(k => getByKey(this, k));
  //     return new Ctor(args);
  //   };
  // }

  function getterFor(
    key: string,
  ):
    | ((this: I) => number)
    | ((this: I) => Vec2)
    | ((this: I) => Vec3)
    | ((this: I) => Vec4) {
    switch (key.length) {
      case 1:
        return function get(this: I) {
          return getByKey(this, key);
        };
      case 2:
        return function get(this: I) {
          const args = key.split('').map(k => getByKey(this, k));
          return new Vec2(args);
        };
      case 3:
        return function get(this: I) {
          const args = key.split('').map(k => getByKey(this, k));
          return new Vec3(args);
        };
      case 4:
        return function get(this: I) {
          const args = key.split('').map(k => getByKey(this, k));
          return new Vec4(args);
        };
      default:
        throw new Error(`Invalid key ${key} supplied to getterFor.`);
    }
  }

  return Array.from(swizzledSet).reduce((acc: PropertyDescriptorMap, key) => {
    acc[key] = {
      configurable: false,
      enumerable: true,
      get: getterFor(key),
      set(this: Vec2, val) {
        // do nothing
      },
    };

    return acc;
  }, {});
}

const props = createProperties<Vec2>([['x', 'y'], ['r', 'g'], ['s', 't']]);
Object.defineProperties(Vec2.prototype, props);
