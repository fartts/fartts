import { swizzledKeys, indicesByKey } from './util/keys';
import { toArray, validateKeys, validateRange, Validates } from './util';

const { get, set } = Reflect;

/**
 * ## getByKey
 *
 * @param {Float32Array} target
 * @param {string} prop
 * @returns {number}
 */
function getByKey(target: Float32Array, prop: string): number {
  const i = (indicesByKey.has(prop) && indicesByKey.get(prop)) as number;
  validateRange(i, target.length);
  return target[i];
}

/**
 * ## getSwizzled
 *
 * @param {Float32Array} target
 * @param {string} prop
 * @returns {(number | Float32Array)}
 */
function getSwizzled(
  target: Float32Array,
  prop: string,
): number | Float32Array {
  if (prop.length === 1) {
    return getByKey(target, prop);
  }

  const keys = prop.split('');
  return factories[keys.length - 2](keys.map(k => getByKey(target, k)));
}

/**
 * ## setByKey
 *
 * @param {Float32Array} target
 * @param {string} prop
 * @param {number} value
 */
function setByKey(target: Float32Array, prop: string, value: number): void {
  const j = (indicesByKey.has(prop) && indicesByKey.get(prop)) as number;
  validateRange(j, target.length);
  target[j] = value;
}

/**
 * ## setSwizzled
 *
 * @param {Float32Array} target
 * @param {string} prop
 * @param {(number | Float32Array)} value
 * @returns {boolean}
 */
function setSwizzled(
  target: Float32Array,
  prop: string,
  value: number | Float32Array,
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
 * @returns {Float32Array}
 */
function createVector(size: number, args: Components): Float32Array {
  const components = args.reduce(toArray, []);
  validateKeys(size, components.length, Validates.Construction);
  return new Float32Array(components);
}

const handler: ProxyHandler<Float32Array> = {
  /**
   * ### get
   *
   * @param {Float32Array} target
   * @param {PropertyKey} prop
   * @returns
   */
  get(target: Float32Array, prop: PropertyKey) {
    return typeof prop === 'string' && swizzledKeys.has(prop)
      ? getSwizzled(target, prop)
      : get(target, prop);
  },

  /**
   * ### set
   *
   * @param {Float32Array} target
   * @param {PropertyKey} prop
   * @param {(number | Float32Array)} value
   * @returns
   */
  set(target: Float32Array, prop: PropertyKey, value: number | Float32Array) {
    return typeof prop === 'string' && swizzledKeys.has(prop)
      ? setSwizzled(target, prop, value)
      : set(target, prop, value);
  },
};

/**
 * ## createFactory<V extends Float32Array>
 *
 * @template V
 * @param {number} size
 * @returns {Factory<V>}
 */
function createFactory<V extends Float32Array>(size: number): Factory<V> {
  return (...args: Components) =>
    new Proxy(createVector(size, args), handler) as V;
}

const factories: [Factory<Vec2>, Factory<Vec3>, Factory<Vec4>] = [
  createFactory<Vec2>(2),
  createFactory<Vec3>(3),
  createFactory<Vec4>(4),
];

export const [vec2, vec3, vec4] = factories;
