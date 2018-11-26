import './main.css';
import { toSwizzledSet, toKeyIndexMap } from '../lib/vec/keys';
import { vec2 } from '../lib/vector/factories';

class Vector extends Float32Array {
  static get [Symbol.species]() {
    return Float32Array;
  }
}

const baseKeys = [['x', 'y'], ['r', 'g'], ['s', 't']];
const swizzledSet = toSwizzledSet(baseKeys);
const keyIndexMap = toKeyIndexMap(baseKeys);

function getByKey(target: Vector, prop: string): number {
  const i = (keyIndexMap.has(prop) && keyIndexMap.get(prop)) as number;
  return target[i];
}

function setByKey(target: Vector, prop: string, value: number): void {
  const j = (keyIndexMap.has(prop) && keyIndexMap.get(prop)) as number;
  target[j] = value;
}

const propertyDescriptor = Array.from(swizzledSet).reduce(
  (acc: PropertyDescriptorMap, key: string) => {
    acc[key] = {
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
    };

    return acc;
  },
  {},
);

Object.defineProperties(Vector.prototype, propertyDescriptor);

console.log(Vector); // tslint:disable-line no-console
console.log(swizzledSet); // tslint:disable-line no-console
console.log(propertyDescriptor); // tslint:disable-line no-console
console.log(new Vector([0, 1])); // tslint:disable-line no-console
console.log(vec2(0, 1)); // tslint:disable-line no-console
