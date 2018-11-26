import './main.css';
import { toSwizzled, toIndicesByKey } from '../lib/vec/util/keys';
import { vec2 } from '../lib/vec/factories';

class Vector extends Float32Array {
  static get [Symbol.species]() {
    return Float32Array;
  }
}

const baseKeys = [['x', 'y'], ['r', 'g'], ['s', 't']];
const swizzledKeys = new Set(
  baseKeys.reduce(
    (acc: string[], keys: string[]) => [
      ...acc,
      ...keys.reduceRight(toSwizzled, keys),
    ],
    [],
  ),
);

const indicesByKey = new Map(
  baseKeys.reduce(
    (acc: Array<[string, number]>, keys: string[]) => [
      ...acc,
      ...keys.reduce(toIndicesByKey, []),
    ],
    [],
  ),
);

function getByKey(target: Vector, prop: string): number {
  const i = (indicesByKey.has(prop) && indicesByKey.get(prop)) as number;
  return target[i];
}

function setByKey(target: Vector, prop: string, value: number): void {
  const j = (indicesByKey.has(prop) && indicesByKey.get(prop)) as number;
  target[j] = value;
}

const propertyDescriptor = Array.from(swizzledKeys).reduce(
  (acc: PropertyDescriptorMap, key: string) => ({
    ...acc,
    [key]: {
      get:
        key.length === 1
          ? function(this: Vector) {
              return getByKey(this, key);
            }
          : function(this: Vector) {
              const keys = key.split('');
              return new Vector(keys.map(k => getByKey(this, k)));
            },
      set:
        key.length === 1
          ? function(this: Vector, val: number) {
              setByKey(this, key, val);
            }
          : function(this: Vector, val: Vector) {
              key.split('').forEach((k, i) => setByKey(this, k, val[i]));
            },
    },
  }),
  {},
);

Object.defineProperties(Vector.prototype, propertyDescriptor);

console.log(Vector); // tslint:disable-line no-console
console.log(swizzledKeys); // tslint:disable-line no-console
console.log(propertyDescriptor); // tslint:disable-line no-console
console.log(new Vector([0, 1])); // tslint:disable-line no-console
console.log(vec2(0, 1)); // tslint:disable-line no-console
