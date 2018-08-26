import { swizzledKeys, indicesByKey } from './util/keys';
import { toArray, validateKeys, validateRange, Validates } from './util';

const { get, set } = Reflect;

/**
 * ## getByKey
 *
 * @param {Vec4} target
 * @param {string} prop
 * @returns {number}
 */
function getByKey(target: Vec4, prop: string): number {
  const i = (indicesByKey.has(prop) && indicesByKey.get(prop)) as number;
  validateRange(i, target.length);
  return target[i];
}

/**
 * ## getSwizzled
 *
 * @param {Vec4} target
 * @param {string} prop
 * @returns {Component}
 */
function getSwizzled(target: Vec4, prop: string): Component {
  if (prop.length === 1) {
    return getByKey(target, prop);
  }

  const factory = factories[prop.length - 2];
  const keys = prop.split('');

  return factory(keys.map(k => getByKey(target, k)));
}

/**
 * ## setByKey
 *
 * @param {Vec4} target
 * @param {string} prop
 * @param {number} value
 */
function setByKey(target: Vec4, prop: string, value: number): void {
  const j = (indicesByKey.has(prop) && indicesByKey.get(prop)) as number;
  validateRange(j, target.length);
  target[j] = value;
}

/**
 * ## setSwizzled
 *
 * @param {Vec4} target
 * @param {string} prop
 * @param {Component} value
 * @returns
 */
function setSwizzled(target: Vec4, prop: string, value: Component) {
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
function createVector(size: number, args: Components): Vec4 {
  const components = args.reduce(toArray, []);
  validateKeys(size, components.length, Validates.Construction);
  return new Float32Array(components) as Vec4;
}

const handler: ProxyHandler<Vec4> = {
  get(target: Vec4, prop: PropertyKey) {
    return typeof prop === 'string' && swizzledKeys.has(prop)
      ? getSwizzled(target, prop)
      : get(target, prop);
  },

  set(target: Vec4, prop: PropertyKey, value: Component) {
    return typeof prop === 'string' && swizzledKeys.has(prop)
      ? setSwizzled(target, prop, value)
      : set(target, prop, value);
  },
};

const factories = new Array(4)
  .fill(true)
  .reduce(
    (acc: Factory[], _, i: number) =>
      i === 0
        ? acc
        : acc.concat(
            (...args: Components) =>
              new Proxy(createVector(i + 1, args), handler),
          ),
    [],
  );

export const [vec2, vec3, vec4] = factories;
