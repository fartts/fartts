import { swizzledKeys, indicesByKey } from './util/keys';
import { toArray, validateKeys, validateRange, Validates } from './util';

const { get, set } = Reflect;

/**
 * ## getByKey
 *
 * @param {Vec} target
 * @param {string} prop
 * @returns {number}
 */
function getByKey<V extends Vec2 | Vec3 | Vec4>(
  target: V,
  prop: string,
): number {
  const i = (indicesByKey.has(prop) && indicesByKey.get(prop)) as number;
  validateRange(i, target.length);
  return target[i];
}

/**
 * ## getSwizzled
 *
 * @param {Vec} target
 * @param {string} prop
 * @returns {Component}
 */
function getSwizzled<V extends Vec2 | Vec3 | Vec4>(
  target: V,
  prop: string,
): Component<V> {
  if (prop.length === 1) {
    return getByKey(target, prop);
  }

  let factory;
  switch (prop.length) {
    case 2:
      factory = factories[prop.length - 2] as Factory<Vec2>;
      break;
    case 3:
      factory = factories[prop.length - 2] as Factory<Vec3>;
      break;
    case 4:
      factory = factories[prop.length - 2] as Factory<Vec4>;
      break;
    default:
      throw new Error(`no factory for ${prop.length} keys`);
  }

  const keys = prop.split('');
  return factory(keys.map(k => getByKey(target, k)));
}

/**
 * ## setByKey
 *
 * @param {Vec} target
 * @param {string} prop
 * @param {number} value
 */
function setByKey<V extends Vec2 | Vec3 | Vec4>(
  target: V,
  prop: string,
  value: number,
): void {
  const j = (indicesByKey.has(prop) && indicesByKey.get(prop)) as number;
  validateRange(j, target.length);
  target[j] = value;
}

/**
 * ## setSwizzled
 *
 * @param {Vec} target
 * @param {string} prop
 * @param {Component} value
 * @returns
 */
function setSwizzled<V extends Vec2 | Vec3 | Vec4>(
  target: V,
  prop: string,
  value: Component<V>,
): boolean {
  const keys = prop.split('');
  const components = [value].reduce(toArray, []);

  /**
   * TODO: @mysterycommand - should I need this, if Float32Array.set is working
   * below as expected? maybe for 'not enough arguments' I guess?
   * @see: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray/set
   */
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
 * @returns {Vec4}
 */
function createVector<V extends Vec2 | Vec3 | Vec4>(
  size: number,
  args: Components<V>,
): V {
  const components = args.reduce(toArray, []);
  validateKeys(size, components.length, Validates.Construction);

  return new Float32Array(components) as V;
}

function createHandler<V extends Vec2 | Vec3 | Vec4>(): ProxyHandler<V> {
  return {
    get(target: V, prop: PropertyKey) {
      return typeof prop === 'string' && swizzledKeys.has(prop)
        ? getSwizzled<V>(target, prop)
        : get(target, prop);
    },

    set(target: V, prop: PropertyKey, value: Component<V>) {
      return typeof prop === 'string' && swizzledKeys.has(prop)
        ? setSwizzled<V>(target, prop, value)
        : set(target, prop, value);
    },
  };
}

function createFactory<V extends Vec2 | Vec3 | Vec4>(size: number): Factory<V> {
  const handler = createHandler<V>();

  return (...args: Components<V>) =>
    new Proxy(createVector<V>(size, args), handler);
}

export const vec2 = createFactory<Vec2>(2);
export const vec3 = createFactory<Vec3>(3);
export const vec4 = createFactory<Vec4>(4);

const factories = [vec2, vec3, vec4];
