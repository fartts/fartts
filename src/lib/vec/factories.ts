import Vector from '@fartts/lib/vec';
import { Components, Factory, Vec2, Vec3, Vec4 } from '@fartts/lib/vec/types';
import {
  toArray,
  validateKeys,
  validateRange,
  Validates,
} from '@fartts/lib/vec/util';
import { swizzledKeys, indicesByKey } from '@fartts/lib/vec/util/keys';

const { get, set } = Reflect;

/**
 * ## getByKey
 *
 * @param {Vector} target
 * @param {string} prop
 * @returns {number}
 */
function getByKey(target: Vector, prop: string): number {
  const i = (indicesByKey.has(prop) && indicesByKey.get(prop)) as number;
  validateRange(i, target.length);
  return target[i];
}

/**
 * ## getSwizzled
 *
 * @param {Vector} target
 * @param {string} prop
 * @returns {(number | Vector)}
 */
function getSwizzled(target: Vector, prop: string): number | Vector {
  if (prop.length === 1) {
    return getByKey(target, prop);
  }

  const keys = prop.split('');
  const factory = getFactory(keys.length);
  return factory(keys.map(k => getByKey(target, k)));
}

/**
 * ## setByKey
 *
 * @param {Vector} target
 * @param {string} prop
 * @param {number} value
 */
function setByKey(target: Vector, prop: string, value: number): void {
  const j = (indicesByKey.has(prop) && indicesByKey.get(prop)) as number;
  validateRange(j, target.length);
  target[j] = value;
}

/**
 * ## setSwizzled
 *
 * @param {Vector} target
 * @param {string} prop
 * @param {(number | Vector)} value
 * @returns {boolean}
 */
function setSwizzled(
  target: Vector,
  prop: string,
  value: number | Vector,
): boolean {
  const keys = prop.split('');
  const components = [value].reduce(toArray, []);

  const size = keys.length; // just for consistency with `createVector` below
  validateKeys(size, components.length, Validates.Assignment);

  keys.forEach((k, i) => setByKey(target, k, components[i]));
  return true;
}

/**
 * ## createVector
 *
 * @param {number} size
 * @param {Components} args
 * @returns {Vector}
 */
function createVector(size: number, args: Components): Vector {
  const components = args.reduce(toArray, []);

  /**
   * maybe enable this to support "forward fill" type construction with a single
   * argument meant to be spread over all components
   *
   * @see: https://en.wikibooks.org/wiki/GLSL_Programming/Vector_and_Matrix_Operations#Constructors
   */
  // if (components.length === 1 && typeof components[0] === 'number') {
  //   components = new Array(size).fill(components[0]);
  // }

  validateKeys(size, components.length, Validates.Construction);
  return new Vector(components);
}

const handler: ProxyHandler<Vector> = {
  /**
   * ### get
   *
   * @param {Vector} target
   * @param {PropertyKey} prop
   * @returns
   */
  get(target: Vector, prop: PropertyKey) {
    return typeof prop === 'string' && swizzledKeys.has(prop)
      ? getSwizzled(target, prop)
      : get(target, prop);
  },

  /**
   * ### set
   *
   * @param {Vector} target
   * @param {PropertyKey} prop
   * @param {(number | Vector)} value
   * @returns
   */
  set(target: Vector, prop: PropertyKey, value: number | Vector) {
    return typeof prop === 'string' && swizzledKeys.has(prop)
      ? setSwizzled(target, prop, value)
      : set(target, prop, value);
  },
};

/**
 * ## createFactory<V extends Vector>
 *
 * @template V
 * @param {number} size
 * @returns {Factory<V>}
 */
function createFactory<V extends Vector>(size: number): Factory<V> {
  return (...args: Components) =>
    new Proxy(createVector(size, args), handler) as V;
}

/**
 * ## getFactory
 *
 * @export
 * @param {number} size
 * @returns {(Factory<Vec2> | Factory<Vec3> | Factory<Vec4>)}
 */
export function getFactory(
  size: number,
): Factory<Vec2> | Factory<Vec3> | Factory<Vec4> {
  return factories[size - 2];
}

const factories: [Factory<Vec2>, Factory<Vec3>, Factory<Vec4>] = [
  createFactory<Vec2>(2),
  createFactory<Vec3>(3),
  createFactory<Vec4>(4),
];

export const [vec2, vec3, vec4] = factories;

/**
 * ## getLeft
 *
 * @export
 * @param {number} size
 * @returns {(Vec2 | Vec3 | Vec4)}
 */
export function getLeft(size: number): Vec2 | Vec3 | Vec4 {
  const factory = getFactory(size);
  const args = new Array(size - 1).fill(0);
  return factory(1, ...args);
}

/**
 * ## getZeros
 *
 * @export
 * @param {number} size
 * @returns {(Vec2 | Vec3 | Vec4)}
 */
export function getZeros(size: number): Vec2 | Vec3 | Vec4 {
  const factory = getFactory(size);
  const args = new Array(size).fill(0);
  return factory(...args);
}
