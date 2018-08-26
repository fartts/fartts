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
function getByKey<Vec extends Float32Array>(target: Vec, prop: string): number {
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
function getSwizzled<Vec extends Float32Array>(
  target: Vec,
  prop: string,
): Component {
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
 * @param {Vec} target
 * @param {string} prop
 * @param {number} value
 */
function setByKey<Vec extends Float32Array>(
  target: Vec,
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
function setSwizzled<Vec extends Float32Array>(
  target: Vec,
  prop: string,
  value: Component,
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
function createVector<Vec extends Float32Array>(
  size: number,
  args: Components,
): Vec {
  const components = args.reduce(toArray, []);
  validateKeys(size, components.length, Validates.Construction);
  return new Float32Array(components) as Vec;
}

function createHandler<Vec extends Float32Array>(): ProxyHandler<Vec> {
  return {
    get(target: Vec, prop: PropertyKey) {
      return typeof prop === 'string' && swizzledKeys.has(prop)
        ? getSwizzled<Vec>(target, prop)
        : get(target, prop);
    },

    set(target: Vec, prop: PropertyKey, value: Component) {
      return typeof prop === 'string' && swizzledKeys.has(prop)
        ? setSwizzled<Vec>(target, prop, value)
        : set(target, prop, value);
    },
  };
}

const factories = new Array(4)
  .fill(true)
  .reduce(
    (acc: Vec4Factory[], _, i: number) =>
      i === 0
        ? acc
        : acc.concat(
            (...args: Components) =>
              new Proxy(createVector<Vec4>(i + 1, args), createHandler<Vec4>()),
          ),
    [],
  );

export const [vec2, vec3, vec4] = factories;
