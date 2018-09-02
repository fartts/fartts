import { swizzledKeys, indicesByKey } from './util/keys';
import { toArray, validateKeys, validateRange, Validates } from './util';

const { get, set } = Reflect;

/**
 * ## getByKey<V extends Vec2 | Vec3 | Vec4>
 *
 * @template V
 * @param {V} target
 * @param {string} prop
 * @returns {number}
 */
function getByKey(target: Float32Array, prop: string): number {
  const i = (indicesByKey.has(prop) && indicesByKey.get(prop)) as number;
  validateRange(i, target.length);
  return target[i];
}

/**
 * ## getSwizzled<V extends Vec2 | Vec3 | Vec4>
 *
 * @template V
 * @param {V} target
 * @param {string} prop
 * @returns {(Component<Vec2 | Vec3 | Vec4> | undefined)}
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
 * ## setByKey<V extends Vec2 | Vec3 | Vec4>
 *
 * @template V
 * @param {V} target
 * @param {string} prop
 * @param {number} value
 */
function setByKey(target: Float32Array, prop: string, value: number): void {
  const j = (indicesByKey.has(prop) && indicesByKey.get(prop)) as number;
  validateRange(j, target.length);
  target[j] = value;
}

/**
 * ## setSwizzled<V extends Vec2 | Vec3 | Vec4>
 *
 * @template V
 * @param {V} target
 * @param {string} prop
 * @param {Component<V>} value
 * @returns {boolean}
 */
function setSwizzled(
  target: Float32Array,
  prop: string,
  value: number | number[] | Float32Array,
): boolean {
  const keys = prop.split('');
  const components = [value].reduce(toArray, []);

  const size = keys.length; // just for consistency with `createVector` below
  validateKeys(size, components.length, Validates.Assignment);

  keys.forEach((k, i) => setByKey(target, k, components[i]));
  return true;
}

/**
 * ## createVector<V extends Vec2 | Vec3 | Vec4>
 *
 * @template V
 * @param {number} size
 * @param {Components<V>} args
 * @returns {V}
 */
function createVector(
  size: number,
  args: Array<number | number[] | Float32Array>,
): Float32Array {
  const components = args.reduce(toArray, []);
  validateKeys(size, components.length, Validates.Construction);

  return new Float32Array(components);
}

/**
 * createHandler<V extends Vec2 | Vec3 | Vec4>
 *
 * @template V
 * @returns {ProxyHandler<V>}
 */
function createHandler(): ProxyHandler<Float32Array> {
  return {
    get(target: Float32Array, prop: PropertyKey) {
      return typeof prop === 'string' && swizzledKeys.has(prop)
        ? getSwizzled(target, prop)
        : get(target, prop);
    },

    set(
      target: Float32Array,
      prop: PropertyKey,
      value: number | number[] | Float32Array,
    ) {
      return typeof prop === 'string' && swizzledKeys.has(prop)
        ? setSwizzled(target, prop, value)
        : set(target, prop, value);
    },
  };
}

/**
 * ## createFactory<V extends Vec2 | Vec3 | Vec4>
 *
 * @template V
 * @param {number} size
 * @returns {Factory<V>}
 */
function createFactory(
  size: number,
): (...args: Array<number | number[] | Float32Array>) => Float32Array {
  const handler = createHandler();

  return (...args: Array<number | number[] | Float32Array>) =>
    new Proxy(createVector(size, args), handler);
}

export const vec2 = createFactory(2);
export const vec3 = createFactory(3);
export const vec4 = createFactory(4);

const factories = [vec2, vec3, vec4];
