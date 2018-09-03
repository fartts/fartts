import Vector from '.';
import { toArray, validateKeys, validateRange, Validates } from './util';
import { swizzledKeys, indicesByKey } from './util/keys';

import { Components, Factory, Vec2, Vec3, Vec4 } from './index.d';

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
  return factories[keys.length - 2](keys.map(k => getByKey(target, k)));
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

export const factories: [Factory<Vec2>, Factory<Vec3>, Factory<Vec4>] = [
  createFactory<Vec2>(2),
  createFactory<Vec3>(3),
  createFactory<Vec4>(4),
];

export const [vec2, vec3, vec4] = factories;
